import { scenes } from './SceneData.js';
import { SceneSync } from './SceneSync.js';
import { ttsEngine } from '../tts/TTSEngine.js';
import { TTSCache } from '../tts/TTSCache.js';

export class SceneOrchestrator {
  constructor() {
    this.scenes = new Map(scenes.map(s => [s.id, { ...s }]));
    this.currentId = 1;
    this.sync = new SceneSync();
    this.isWaitingForCurrent = false;
    this.isPlaying = false;
    
    // Callbacks
    this.onSceneReady = null;       // (sceneId) => {}
    this.onInteractiveStart = null;  // (scene) => {}
    this.onSceneChanged = null;     // (scene) => {}
    this.onLoadingProgress = null;   // (percent, label) => {}
  }

  async init() {
    if (this.onLoadingProgress) this.onLoadingProgress(10, 'Initializing audio engine...');
    await ttsEngine.initialize();
    
    this.sync.setAudioContext(ttsEngine.audioCtx);

    if (this.onLoadingProgress) this.onLoadingProgress(30, 'Scanning audio cache...');
    await this.hydrateCacheStatus();

    if (ttsEngine.activeEngine === 'worker' && ttsEngine.worker) {
      if (this.onLoadingProgress) this.onLoadingProgress(50, 'Configuring background pipeline...');
      
      // Hook up worker message listener
      ttsEngine.worker.addEventListener('message', (e) => this.handleWorkerMessage(e.data));

      // Send the scene list to worker so it knows what it can generate
      const workerScenes = {};
      for (const [id, s] of this.scenes.entries()) {
        if (s.type === 'narrative') {
          workerScenes[id] = {
            id: s.id,
            text: s.text,
            voice: s.voice,
            speed: s.speed,
            cacheKey: s.cacheKey,
            status: s.status
          };
        }
      }
      this.postWorkerMessage({ type: 'SET_SCENE_LIST', scenes: workerScenes });
    }

    if (this.onLoadingProgress) this.onLoadingProgress(100, 'Ready');
  }

  postWorkerMessage(msg) {
    if (ttsEngine.activeEngine === 'worker' && ttsEngine.worker) {
      try {
        ttsEngine.worker.postMessage(msg);
      } catch (err) {
        console.warn('[Orchestrator] Failed to post worker message:', err);
      }
    }
  }

  async prepareFirstScene(chapterId) {
    if (this.onLoadingProgress) this.onLoadingProgress(70, 'Pre-generating narration...');
    const chapterScenes = [...this.scenes.values()]
      .filter(s => s.chapterId === chapterId && s.type === 'narrative');
    if (chapterScenes.length === 0) {
      if (this.onLoadingProgress) this.onLoadingProgress(100, 'Ready');
      return;
    }

    // Pre-generate up to the first 3 scenes to establish a playback buffer
    const pregenerateCount = Math.min(3, chapterScenes.length);
    const targets = chapterScenes.slice(0, pregenerateCount);

    if (ttsEngine.activeEngine === 'worker' && ttsEngine.worker) {
      for (let i = 0; i < targets.length; i++) {
        const targetScene = targets[i];
        if (targetScene.status !== 'ready') {
          if (this.onLoadingProgress) {
            this.onLoadingProgress(70 + Math.floor((i / targets.length) * 25), `Pre-generating voice ${i + 1} of ${targets.length}...`);
          }
          this.postWorkerMessage({ type: 'GENERATE', sceneId: targetScene.id });
          
          await new Promise(resolve => {
            const timeout = setTimeout(() => {
              clearInterval(check);
              resolve();
            }, 3000);
            const check = setInterval(() => {
              if (targetScene.status === 'ready' || ttsEngine.activeEngine !== 'worker' || !ttsEngine.worker) {
                clearTimeout(timeout);
                clearInterval(check);
                resolve();
              }
            }, 80);
          });
        }
      }
    }

    if (this.onLoadingProgress) this.onLoadingProgress(100, 'Illuminated');
  }

  async hydrateCacheStatus() {
    try {
      const keys = await TTSCache.getAllKeys();
      for (const scene of this.scenes.values()) {
        if (scene.type === 'narrative' && keys.includes(scene.cacheKey)) {
          scene.status = 'ready';
        }
      }
    } catch (e) {
      console.warn('[Orchestrator] Failed to hydrate cache status:', e);
    }
  }

  handleWorkerMessage(msg) {
    if (msg.type === 'READY') {
      const scene = this.scenes.get(msg.sceneId);
      if (scene) {
        scene.status = 'ready';
        scene.durationMs = msg.durationMs;

        if (this.onSceneReady) this.onSceneReady(msg.sceneId);

        // If orchestrator was waiting on this scene, trigger play
        if (msg.sceneId === this.currentId && this.isWaitingForCurrent) {
          this.isWaitingForCurrent = false;
          this.playCurrent();
        }
      }
    }

    if (msg.type === 'ERROR') {
      console.warn('[Orchestrator] Worker reported error for scene', msg.sceneId, msg.error);
      const scene = this.scenes.get(msg.sceneId);
      if (scene) {
        scene.status = 'idle'; // Reset so queue can retry
      }
      // If waiting on this scene, try fallback immediately
      if (msg.sceneId === this.currentId && this.isWaitingForCurrent) {
        this.isWaitingForCurrent = false;
        this.playCurrentFallback();
      }
    }
  }

  // --- Controls ---

  async startChapter(chapterId) {
    this.sync.stop();
    this.isWaitingForCurrent = false;
    this.isPlaying = false;

    const chapterScenes = [...this.scenes.values()]
      .filter(s => s.chapterId === chapterId && s.type === 'narrative');
    if (chapterScenes.length === 0) return;

    this.currentId = chapterScenes[0].id;

    // Pre-generate the first 3 scenes of the new chapter to avoid playback hiccups
    const pregenerateCount = Math.min(3, chapterScenes.length);
    const targets = chapterScenes.slice(0, pregenerateCount);

    if (ttsEngine.activeEngine === 'worker' && ttsEngine.worker) {
      const instructionBanner = document.getElementById('instruction-banner');
      if (instructionBanner) {
        instructionBanner.innerHTML = "Awakening Divine Voices...";
        instructionBanner.classList.add('show');
      }

      for (const targetScene of targets) {
        if (targetScene.status !== 'ready') {
          this.postWorkerMessage({ type: 'GENERATE', sceneId: targetScene.id });
          
          await new Promise(resolve => {
            const timeout = setTimeout(() => {
              clearInterval(check);
              resolve();
            }, 3000);
            const check = setInterval(() => {
              if (targetScene.status === 'ready' || ttsEngine.activeEngine !== 'worker' || !ttsEngine.worker) {
                clearTimeout(timeout);
                clearInterval(check);
                resolve();
              }
            }, 80);
          });
        }
      }

      if (instructionBanner) {
        instructionBanner.classList.remove('show');
      }
    }

    // Reprioritize worker queue around current position
    this.postWorkerMessage({ type: 'REPRIORITIZE', currentSceneId: this.currentId });

    this.playCurrent();
  }

  async playCurrent() {
    const scene = this.scenes.get(this.currentId);
    if (!scene) return;

    this.isPlaying = true;
    if (this.onSceneChanged) this.onSceneChanged(scene);

    if (scene.type === 'interactive') {
      // Pause automatic narration play and let player take control
      this.isPlaying = false;
      if (this.onInteractiveStart) this.onInteractiveStart(scene);
      return;
    }

    // Narrative scene
    if (ttsEngine.activeEngine === 'webspeech' || !ttsEngine.worker) {
      this.playCurrentFallback();
      return;
    }

    // Worker mode
    if (scene.status !== 'ready') {
      console.log('[Orchestrator] Scene not ready, waiting for worker...', scene.id);
      this.isWaitingForCurrent = true;
      return;
    }

    try {
      scene.status = 'playing';
      
      // Load raw Wav ArrayBuffer from IndexedDB
      const cached = await TTSCache.get(scene.cacheKey);
      if (!cached) {
        throw new Error('Cached audio not found in IndexedDB');
      }

      // Decode ArrayBuffer on main thread
      scene.audioBuffer = await ttsEngine.audioCtx.decodeAudioData(cached.buffer.slice(0));
      scene.durationMs = cached.durationMs;

      // Play via Sync engine
      this.sync.play(scene, window.sceneEngine, () => this.onSceneDone(), false, null);
    } catch (e) {
      console.warn('[Orchestrator] Failed to play from worker cache, falling back to Web Speech.', e);
      this.playCurrentFallback();
    }
  }

  playCurrentFallback() {
    const scene = this.scenes.get(this.currentId);
    scene.status = 'playing';
    
    this.sync.play(
      scene,
      window.sceneEngine,
      () => this.onSceneDone(),
      true,
      (text, voice, callback) => ttsEngine.speakWebSpeech(text, voice, callback)
    );
  }

  onSceneDone() {
    const scene = this.scenes.get(this.currentId);
    if (scene) scene.status = 'done';
    this.isPlaying = false;

    // Advance
    const nextId = this.currentId + 1;
    const next = this.scenes.get(nextId);

    if (!next || next.chapterId !== scene.chapterId) {
      console.log('[Orchestrator] Reached end of chapter', scene.chapterId);
      return;
    }

    this.currentId = nextId;

    // Shift prefetch priorities around new ID
    this.postWorkerMessage({ type: 'REPRIORITIZE', currentSceneId: this.currentId });

    this.playCurrent();
  }

  jumpTo(sceneId) {
    this.sync.stop();
    this.isWaitingForCurrent = false;
    this.isPlaying = false;
    this.currentId = sceneId;

    this.postWorkerMessage({ type: 'REPRIORITIZE', currentSceneId: sceneId });

    this.playCurrent();
  }

  next() {
    // Halts active speech/sync and advances to the next scene in the chapter
    this.sync.stop();
    ttsEngine.stop();
    this.onSceneDone();
  }

  interrupt() {
    console.log('[Orchestrator] Interrupt requested by user input.');
    const scene = this.scenes.get(this.currentId);
    if (scene && scene.type === 'interactive') return;
    if (this.isPlaying) {
      this.sync.stop();
      ttsEngine.stop();
      this.onSceneDone();
    }
  }

  skip() {
    // General cinematic skip: skip all narrative items up to the next interactive or end state
    this.sync.stop();
    ttsEngine.stop();

    const scene = this.scenes.get(this.currentId);
    if (!scene) return;

    // Find the next interactive scene or the end of the chapter
    let nextId = this.currentId;
    while (true) {
      nextId++;
      const next = this.scenes.get(nextId);
      if (!next || next.chapterId !== scene.chapterId) {
        // Reached end of chapter
        this.currentId = nextId - 1;
        break;
      }
      if (next.type === 'interactive') {
        this.currentId = nextId;
        break;
      }
    }

    this.playCurrent();
  }
}

export const orchestrator = new SceneOrchestrator();
