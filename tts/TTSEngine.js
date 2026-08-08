// ============================================
// TTSEngine.js — Replaces window.speechSynthesis
// Supports: Kokoro → Piper → Web Speech API fallback
// Uses dynamic imports to avoid bundler resolution issues
//
// KEY FIX v2 (this version):
//   Console timing revealed the real 37-48s bug: Kokoro's WebGPU
//   inference is NOT actually parallel — it's one GPU command
//   stream. Firing off preload() for several lines/chapters at once
//   (e.g. "preload first lines of all 5 chapters") queues a pile of
//   generate() calls that all contend for that single stream. A
//   speak() call that isn't preloaded gets stuck behind that
//   background work and can take 20-50s to start.
//
//   Fix: ALL generation now goes through a single-concurrency
//   GenerationQueue with two priority tiers. speak() enqueues as
//   'high' and always jumps ahead of any pending 'low' (preload)
//   jobs — it can't interrupt a job that's already running, but it
//   never waits behind background prefetch work that hasn't started
//   yet. preload() enqueues as 'low' and quietly fills in the gaps.
//
// KEY FIX v1 (previous version):
//   speak() used to generate ALL chunks of a line sequentially
//   before playing ANY of them — that's the original "takes time to
//   speak" delay. Fixed by pipelining: chunk[0] generates and plays
//   immediately, chunk[1] generates in the background while chunk[0]
//   plays, etc.
// ============================================

// Single-concurrency job queue with 2 priority levels. Kokoro/Piper's
// underlying inference is effectively serial, so running requests
// "in parallel" at the JS level just creates contention — this makes
// that serialization explicit and lets urgent (speak) requests cut
// ahead of background (preload) ones that haven't started yet.
class GenerationQueue {
  constructor() {
    this._queue = [];
    this._running = false;
  }

  // priority: 'high' (speak — needed right now) or 'low' (preload — background)
  add(fn, priority = 'low', label = '') {
    return new Promise((resolve, reject) => {
      const job = { fn, resolve, reject, priority, label };
      if (priority === 'high') {
        let i = 0;
        while (i < this._queue.length && this._queue[i].priority === 'high') i++;
        this._queue.splice(i, 0, job);
        if (this._queue.length > 1) {
          console.log(`%c[TTS][QUEUE] "${label}" jumped ahead of ${this._queue.length - 1} queued job(s)`, 'color:#ff8800');
        }
      } else {
        this._queue.push(job);
      }
      this._process();
    });
  }

  async _process() {
    if (this._running) return;
    this._running = true;
    while (this._queue.length) {
      const job = this._queue.shift();
      const t0 = performance.now();
      try {
        const result = await job.fn();
        console.log(`[TTS][QUEUE] "${job.label}" (${job.priority}) took ${(performance.now() - t0).toFixed(0)}ms, ${this._queue.length} still queued`);
        job.resolve(result);
      } catch (e) {
        job.reject(e);
      }
    }
    this._running = false;
  }
}

// Character voice configurations
const CHARACTER_CONFIG = {
  narrator: {
    kokoroVoice: 'af_heart',      // warm, neutral narrator
    piperVoice: 'en_US-libritts_r-medium',
    rate: 0.95,
    pitch: 1.0,
  },
  god: {
    kokoroVoice: 'am_echo',       // deeper, resonant
    piperVoice: 'en_US-ryan-high',
    rate: 0.82,
    pitch: 0.70,
  },
  eve: {
    kokoroVoice: 'af_bella',      // female voice
    piperVoice: 'en_US-lessac-medium',
    rate: 0.95,
    pitch: 1.15,
  },
  serpent: {
    kokoroVoice: 'am_michael',    // male, lower/rougher pitch
    piperVoice: 'en_US-libritts_r-medium',
    rate: 0.78,
    pitch: 0.55,
  },
  cain: {
    kokoroVoice: 'am_michael',
    piperVoice: 'en_US-libritts_r-medium',
    rate: 0.92,
    pitch: 0.95,
  },
  abel: {
    kokoroVoice: 'am_onyx',
    piperVoice: 'en_US-lessac-medium',
    rate: 0.92,
    pitch: 0.95,
  },
  noah: {
    kokoroVoice: 'am_michael',
    piperVoice: 'en_US-libritts_r-medium',
    rate: 0.92,
    pitch: 0.95,
  },
  nimrod: {
    kokoroVoice: 'am_michael',
    piperVoice: 'en_US-libritts_r-medium',
    rate: 0.92,
    pitch: 0.95,
  },
  builder: {
    kokoroVoice: 'am_michael',
    piperVoice: 'en_US-libritts_r-medium',
    rate: 0.92,
    pitch: 0.95,
  },
  worker: {
    kokoroVoice: 'am_michael',
    piperVoice: 'en_US-libritts_r-medium',
    rate: 0.92,
    pitch: 0.95,
  }
};

class TTSEngine {
  constructor() {
    this.kokoro = null;
    this.piperSession = null;
    this.audioContext = null;
    this.currentAudio = null;
    this.currentSource = null;
    this.isSpeaking = false;
    this.onboundaryCallback = null;
    this.onendCallback = null;
    this.onstartCallback = null;

    this.enginePriority = ['kokoro', 'piper', 'webspeech'];
    this.activeEngine = null;
    this.initPromise = null;

    this.isInitialized = false;
    this.isInitializing = false;
    this.modelCache = null;
    this.preloadCache = new Map();

    this.KokoroTTS = null;
    this.TtsSession = null;
    this.piperSessions = {};

    this.wordTimers = [];

    // All chunk generation funnels through here — see GenerationQueue above.
    this._genQueue = new GenerationQueue();

    // ---- DEBUG TIMING ----
    // Call ttsEngine.markTextShown() at the exact moment your UI displays
    // a line's text. Every subsequent [TTS][TIMING] log will report elapsed
    // time since that mark, so you can see exactly how long the gap between
    // "text on screen" and "audio actually audible" really is, and which
    // stage (init / generation / playback) is eating the time.
    this._textShownAt = null;
  }

  markTextShown(label = '') {
    this._textShownAt = performance.now();
    console.log(`%c[TTS][TIMING] ⏱ text shown${label ? ` (${label})` : ''} — clock started`, 'color:#4ea3ff');
  }

  _since(label) {
    const ms = this._textShownAt == null ? null : performance.now() - this._textShownAt;
    const suffix = ms == null ? '(markTextShown() was never called)' : `+${ms.toFixed(0)}ms since text shown`;
    console.log(`%c[TTS][TIMING] ${label} — ${suffix}`, 'color:#4ea3ff');
    return ms;
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  async initialize(preferredEngine = 'auto') {
    if (this.isInitialized) {
      this._since('initialize() called but already initialized — instant no-op ✅');
      return;
    }

    if (this.isInitializing) {
      this._since('initialize() called while already initializing — reusing in-flight promise');
      return this.initPromise;
    }

    // If you see this log fire MORE THAN ONCE per app session, that's almost
    // certainly your 37s bug: something is creating a fresh TTSEngine
    // instance (or otherwise losing this.isInitialized/modelCache) instead
    // of reusing the exported singleton, so the full model download + voice
    // warmup + shader compile is happening again from scratch.
    console.log('%c[TTS][TIMING] 🚨 initialize() STARTING FROM SCRATCH — full model load/warmup incoming', 'color:orange;font-weight:bold');
    this._since('initialize() start');
    const _initT0 = performance.now();

    this.isInitializing = true;

    this.initPromise = (async () => {
      if (preferredEngine === 'auto') {
        if (await this._checkWebGPU()) {
          try {
            await this._initKokoro();
            this.activeEngine = 'kokoro';
            console.log('[TTS] Kokoro WebGPU initialized');
            return;
          } catch (e) {
            console.warn('[TTS] Kokoro initialization failed, trying Piper:', e);
          }
        }

        try {
          await this._initPiper();
          this.activeEngine = 'piper';
          console.log('[TTS] Piper WASM initialized');
          return;
        } catch (e) {
          console.warn('[TTS] Piper initialization failed, using Web Speech:', e);
        }

        this.activeEngine = 'webspeech';
        console.log('[TTS] Web Speech API fallback selected');
      } else {
        await this._initEngine(preferredEngine);
      }
    })()
      .then(() => {
        this.isInitialized = true;
        this.isInitializing = false;
        const totalMs = performance.now() - _initT0;
        console.log(`%c[TTS][TIMING] ✅ initialize() finished in ${totalMs.toFixed(0)}ms — engine: ${this.activeEngine}`, 'color:orange;font-weight:bold');
        this._since('initialize() fully resolved');
      })
      .catch(err => {
        this.isInitializing = false;
        console.log(`%c[TTS][TIMING] ❌ initialize() FAILED after ${(performance.now() - _initT0).toFixed(0)}ms`, 'color:red');
        throw err;
      });

    return this.initPromise;
  }

  async _checkWebGPU() {
    if (!navigator.gpu) return false;
    try {
      const adapter = await navigator.gpu.requestAdapter();
      return !!adapter;
    } catch {
      return false;
    }
  }

  async _initKokoro() {
    if (this.modelCache) {
      console.log('[TTS][TIMING] _initKokoro: modelCache hit, skipping reload');
      this.kokoro = this.modelCache;
      return;
    }

    let t = performance.now();
    const mod = await import('kokoro-js');
    this.KokoroTTS = mod.KokoroTTS;
    console.log(`[TTS][TIMING] _initKokoro: import('kokoro-js') took ${(performance.now() - t).toFixed(0)}ms`);

    t = performance.now();
    this.kokoro = await this.KokoroTTS.from_pretrained(
      'onnx-community/Kokoro-82M-v1.0-ONNX',
      {
        dtype: 'q4',
        device: 'webgpu',
        cache_dir: 'biblical-tts-cache'
      }
    );
    console.log(`%c[TTS][TIMING] _initKokoro: model download/load took ${(performance.now() - t).toFixed(0)}ms`, 'color:orange');

    this.modelCache = this.kokoro;

    // Pre-warm voices in parallel during the loading screen.
    // NOTE: a single space (" ") can behave oddly with some phonemizers —
    // a short real word is safer and still cheap.
    const voicesToWarm = ['af_heart', 'am_echo', 'af_bella', 'am_michael', 'am_onyx'];
    console.log('[TTS] Pre-warming Kokoro voices:', voicesToWarm);
    let tw = performance.now();
    try {
      await Promise.all(voicesToWarm.map(voice =>
        this.kokoro.generate('Amen.', { voice }).catch(err =>
          console.warn(`[TTS] Failed to pre-warm Kokoro voice ${voice}:`, err))
      ));
      console.log(`%c[TTS][TIMING] _initKokoro: voice pre-warm (5 voices, parallel) took ${(performance.now() - tw).toFixed(0)}ms`, 'color:orange');
    } catch (e) {
      console.warn('[TTS] Error pre-warming Kokoro voices:', e);
    }

    // Compile WebGPU shaders via warmup inference of a real phrase
    console.log('[TTS] Warming up WebGPU shaders...');
    tw = performance.now();
    try {
      await this.kokoro.generate('In the beginning.', { voice: 'af_heart', speed: 1.0 });
      console.log(`%c[TTS][TIMING] _initKokoro: shader warmup inference took ${(performance.now() - tw).toFixed(0)}ms`, 'color:orange');
    } catch (e) {
      console.warn('[TTS] WebGPU shader warmup failed:', e);
    }
  }

  async _initPiper() {
    const mod = await import('@realtimex/piper-tts-web');
    this.TtsSession = mod.TtsSession;
    this.piperSessions = {};

    const voicesToWarm = [
      'en_US-libritts_r-medium',
      'en_US-ryan-high',
      'en_US-lessac-medium'
    ];

    console.log('[TTS] Pre-warming Piper voices:', voicesToWarm);

    await Promise.all(voicesToWarm.map(async voiceId => {
      const session = await this.TtsSession.create({ voiceId });
      this.piperSessions[voiceId] = session;
      console.log(`[TTS] Piper voice warmed: ${voiceId}`);
    }));

    this.piperSession = this.piperSessions['en_US-libritts_r-medium'];
  }

  async _initEngine(engine) {
    try {
      if (engine === 'kokoro') {
        await this._initKokoro();
        this.activeEngine = 'kokoro';
      } else if (engine === 'piper') {
        await this._initPiper();
        this.activeEngine = 'piper';
      } else {
        this.activeEngine = 'webspeech';
      }
      console.log(`[TTS] Explicitly initialized: ${engine}`);
    } catch (e) {
      console.error(`[TTS] Failed to explicitly initialize ${engine}. Falling back to Web Speech.`, e);
      this.activeEngine = 'webspeech';
    }
  }

  // ============================================
  // CHUNK GENERATION (single source of truth,
  // used by both preload() and speak())
  // ============================================

  // priority: 'high' for anything the user needs to hear right now (speak()),
  // 'low' for background prefetch (preload()). See GenerationQueue.
  _generateChunkBlob(chunkTextStr, config, priority = 'low') {
    const label = `${priority === 'high' ? '▶ speak' : '… preload'}: "${chunkTextStr.slice(0, 24)}"`;

    return this._genQueue.add(async () => {
      if (this.activeEngine === 'kokoro') {
        const audio = await this.kokoro.generate(chunkTextStr, {
          voice: config.kokoroVoice,
          speed: config.rate,
        });
        return audio.toBlob();
      }

      if (this.activeEngine === 'piper') {
        if (!this.TtsSession) {
          const mod = await import('@realtimex/piper-tts-web');
          this.TtsSession = mod.TtsSession;
        }
        let session = this.piperSessions[config.piperVoice];
        if (!session) {
          session = await this.TtsSession.create({ voiceId: config.piperVoice });
          this.piperSessions[config.piperVoice] = session;
        }
        return await session.predict(chunkTextStr);
      }

      return null; // webspeech has no blob concept
    }, priority, label);
  }

  // ============================================
  // PRELOAD — now generates chunks IN PARALLEL
  // ============================================

  async preload(text, character = 'narrator') {
    if (!text || text.trim().length === 0) return;

    if (this.initPromise) {
      await this.initPromise;
    } else {
      await this.initialize('auto');
    }

    if (this.activeEngine === 'webspeech') return;

    const chunks = chunkText(text);
    if (chunks.length === 0) return;

    const key = `${character}:${text}`;
    if (this.preloadCache.has(key)) return;

    const config = CHARACTER_CONFIG[character] || CHARACTER_CONFIG.narrator;

    try {
      console.log(`[TTS] Preloading ${chunks.length} chunks (parallel) for: "${text.slice(0, 30)}..."`);

      const preloadedChunks = await Promise.all(
        chunks.map(c => this._generateChunkBlob(c, config, 'low').catch(err => {
          console.warn('[TTS] Chunk preload failed:', err);
          return null;
        }))
      );

      if (preloadedChunks.every(b => b)) {
        this.preloadCache.set(key, preloadedChunks);
        console.log(`[TTS] Cached preloaded audio for: "${text.slice(0, 30)}..."`);
      } else {
        console.warn('[TTS] Preload incomplete — one or more chunks failed to generate, not caching');
      }
    } catch (e) {
      console.warn('[TTS] Preload failed:', e);
    }
  }

  isReady(text, character = 'narrator') {
    return this.preloadCache.has(`${character}:${text}`);
  }

  clearPreloadCache() {
    this.preloadCache.clear();
    console.log('[TTS] Preload cache cleared');
  }

  // ============================================
  // SPEAK — pipelined generation + playback
  // ============================================

  async speak(text, character = 'narrator') {
    if (!text || text.trim().length === 0) return;

    this._since(`speak() called for "${text.slice(0, 30)}..."`);

    this.stop();

    if (this.initPromise && !this.isInitialized) {
      console.log('[TTS][TIMING] speak() is BLOCKED waiting on initPromise (engine not ready yet)...');
    }
    if (this.initPromise) {
      await this.initPromise;
    } else {
      await this.initialize('auto');
    }
    this._since('speak(): engine ready, past init gate');

    const config = CHARACTER_CONFIG[character] || CHARACTER_CONFIG.narrator;

    if (this.activeEngine === 'webspeech') {
      if (this.onstartCallback) this.onstartCallback();
      this.isSpeaking = true;
      await this._speakWebSpeech(text, character);
      return;
    }

    const chunks = chunkText(text);
    if (chunks.length === 0) return;

    const key = `${character}:${text}`;
    const cachedBlobs = this.preloadCache.get(key);

    if (cachedBlobs) {
      this.preloadCache.delete(key); // consume it
      this._since('speak(): using PRELOADED cache — should be near-instant from here');
      await this._playChunksPipeline(chunks, config, cachedBlobs);
      return;
    }

    this._since('speak(): NOT preloaded — generating chunk[0] now (this is your latency source if init was already ready)');
    try {
      await this._playChunksPipeline(chunks, config, null);
    } catch (error) {
      console.error('[TTS] Speak error:', error);
      this.isSpeaking = false;
      if (this.onendCallback) this.onendCallback();
    }
  }

  // Plays chunks back-to-back. If `blobs` is given (fully preloaded), each
  // chunk plays instantly. Otherwise chunks are generated just-in-time, but
  // — critically — generation of chunk[i+1] starts the moment chunk[i] begins
  // playing, so synthesis latency overlaps with playback instead of stacking
  // up silently before the line starts.
  _playChunksPipeline(chunks, config, blobs) {
    return new Promise((resolve) => {
      this.isSpeaking = true;
      if (this.onstartCallback) this.onstartCallback();

      let index = 0;
      const _firstChunkT0 = performance.now();
      let pendingBlob = blobs
        ? Promise.resolve(blobs[0])
        : this._generateChunkBlob(chunks[0], config, 'high').then(b => {
          console.log(`%c[TTS][TIMING] chunk[0] generated in ${(performance.now() - _firstChunkT0).toFixed(0)}ms`, 'color:#4ea3ff');
          return b;
        });

      const playNext = async () => {
        if (index >= chunks.length) {
          this.isSpeaking = false;
          if (this.onendCallback) this.onendCallback();
          resolve();
          return;
        }

        let blob;
        try {
          blob = await pendingBlob;
        } catch (e) {
          console.warn('[TTS] Chunk generation failed:', e);
          blob = null;
        }

        // Kick off the NEXT chunk's generation now, in parallel with
        // this chunk's playback below.
        const nextIndex = index + 1;
        if (nextIndex < chunks.length) {
          pendingBlob = blobs
            ? Promise.resolve(blobs[nextIndex])
            : this._generateChunkBlob(chunks[nextIndex], config, 'high');
        }

        if (!blob) {
          index++;
          playNext();
          return;
        }

        const chunkText_ = chunks[index];
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        this.currentAudio = audio;

        if (index === 0) {
          // 'playing' fires when audio is ACTUALLY audible — this is the
          // real number to compare against the moment text appeared.
          audio.addEventListener('playing', () => {
            this._since('🔊 FIRST AUDIO ACTUALLY AUDIBLE (playing event)');
          }, { once: true });
        }

        this._scheduleWordCallbacks(chunkText_, audio);

        const advance = () => {
          URL.revokeObjectURL(url);
          this.currentAudio = null;
          index++;
          playNext();
        };

        audio.onended = advance;
        audio.onerror = (e) => {
          console.warn('[TTS] Chunk playback error:', e);
          advance();
        };

        try {
          await audio.play();
        } catch (err) {
          console.warn('[TTS] Failed to play chunk:', err);
          advance();
        }
      };

      playNext();
    });
  }

  // ============================================
  // WEB SPEECH FALLBACK
  // ============================================

  _speakWebSpeech(text, characterKey) {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);

      let matchVoice = null;
      const voices = window.speechSynthesis.getVoices();

      if (characterKey === 'eve') {
        matchVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('hazel'));
      } else if (characterKey === 'serpent') {
        matchVoice = voices.find(v => v.name.toLowerCase().includes('google uk english male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male'));
      } else if (characterKey === 'god') {
        matchVoice = voices.find(v => v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('google uk english male'));
      } else {
        matchVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david'));
      }

      const config = CHARACTER_CONFIG[characterKey] || CHARACTER_CONFIG.narrator;

      if (matchVoice) {
        utterance.voice = matchVoice;
      }
      utterance.pitch = config.pitch;
      utterance.rate = config.rate;

      utterance.onboundary = (event) => {
        if (this.onboundaryCallback) this.onboundaryCallback(event);
      };

      utterance.onstart = () => {
        resolve();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (this.onendCallback) this.onendCallback();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        reject(e);
      };

      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    });
  }

  // ============================================
  // WORD-BY-WORD SYNC (heuristic for AI voices)
  // ============================================

  _scheduleWordCallbacks(text, audio) {
    this.wordTimers.forEach(t => clearTimeout(t));
    this.wordTimers = [];

    const runScheduling = (duration) => {
      const words = text.split(/\s+/);
      const msPerWord = (duration * 1000) / words.length;
      let currentIdx = 0;

      words.forEach((word, index) => {
        const charIndex = text.indexOf(word, currentIdx);
        currentIdx = charIndex + word.length;

        const timer = setTimeout(() => {
          if (this.onboundaryCallback) {
            this.onboundaryCallback({
              name: 'word',
              charIndex: charIndex,
              charLength: word.length,
              elapsedTime: (index * msPerWord) / 1000,
            });
          }
        }, index * msPerWord);
        this.wordTimers.push(timer);
      });
    };

    if (audio.duration) {
      runScheduling(audio.duration);
    } else {
      audio.onloadedmetadata = () => {
        runScheduling(audio.duration);
      };
    }
  }

  // ============================================
  // CONTROLS
  // ============================================

  stop() {
    window.speechSynthesis.cancel();

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    this.wordTimers.forEach(t => clearTimeout(t));
    this.wordTimers = [];
    this.isSpeaking = false;
  }

  pause() {
    if (this.currentAudio) this.currentAudio.pause();
    if (window.speechSynthesis.paused === false) window.speechSynthesis.pause();
  }

  resume() {
    if (this.currentAudio) this.currentAudio.play();
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  }

  // ============================================
  // EVENT HANDLERS (match speechSynthesis API)
  // ============================================

  set onboundary(fn) { this.onboundaryCallback = fn; }
  set onend(fn) { this.onendCallback = fn; }
  set onstart(fn) { this.onstartCallback = fn; }

  get speaking() { return this.isSpeaking; }
}

// Word caps raised from the original 12/8 to 18/16. Console testing showed
// each generate() call costs a ~3s FIXED overhead almost regardless of
// text length ("Hi." took 3131ms) — so more, smaller chunks directly means
// more 3s taxes stacked up. 18 words stays comfortably under the ~20-word
// threshold where Kokoro's pitch glitching originally showed up, while
// cutting most verses down to 1-2 chunks instead of 3-4.
function chunkText(text, maxWords = 18, hardSplitAt = 16) {
  const clean = text.trim();
  if (clean.length === 0) return [];

  const clauses = clean.split(/(?<=[;:,])\s+|(?<=\.)\s+(?=[A-Z])/);
  const chunks = [];

  for (const clause of clauses) {
    const trimmed = clause.trim();
    if (!trimmed) continue;

    const words = trimmed.split(/\s+/);
    if (words.length <= maxWords) {
      chunks.push(trimmed);
    } else {
      const subClauses = trimmed.split(/(?<=,)\s+/);
      for (const sub of subClauses) {
        const subTrimmed = sub.trim();
        const subWords = subTrimmed.split(/\s+/);
        if (subWords.length <= maxWords) {
          chunks.push(subTrimmed);
        } else {
          for (let i = 0; i < subWords.length; i += hardSplitAt) {
            const chunkPart = subWords.slice(i, i + hardSplitAt).join(' ');
            if (chunkPart.trim()) {
              chunks.push(chunkPart.trim());
            }
          }
        }
      }
    }
  }
  return chunks.filter(c => c.length > 0);
}

// Singleton instance
export const ttsEngine = new TTSEngine();

// DEBUG: lets you poke at it from devtools console, e.g.
//   window.__tts.isInitialized
//   window.__tts.activeEngine
//   window.__tts.preloadCache
// If you ever see window.__tts !== the instance your app is actually using,
// that itself proves something is creating a second TTSEngine instance.
if (typeof window !== 'undefined') {
  window.__tts = ttsEngine;
}

export default TTSEngine;