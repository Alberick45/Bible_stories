import { TTSCache } from './TTSCache.js';

export class TTSEngine {
  constructor() {
    this.worker = null;
    this.audioCtx = null;
    this.activeEngine = 'worker'; // 'worker' | 'webspeech'
    this.initPromise = null;
    this.isInitialized = false;
    
    // Web Speech API fallback state
    this.currentUtterance = null;
    this.onEndCallback = null;
  }

  async initialize() {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    this.initPromise = new Promise(async (resolve) => {
      const hasWebGPU = !!navigator.gpu;
      
      if (!hasWebGPU) {
        console.warn('[TTS] WebGPU not supported. Falling back to Web Speech API.');
        this.activeEngine = 'webspeech';
        this.isInitialized = true;
        resolve();
        return;
      }

      const workerTimeout = setTimeout(() => {
        console.warn('[TTS] Worker initialization timed out after 8s. Falling back to Web Speech API.');
        if (this.worker) {
          try {
            this.worker.terminate();
          } catch (e) {}
          this.worker = null;
        }
        this.activeEngine = 'webspeech';
        this.isInitialized = true;
        resolve();
      }, 8000);

      try {
        this.worker = new Worker(new URL('./TTSWorker.js', import.meta.url), { type: 'module' });
        
        this.worker.postMessage({ type: 'INIT' });

        this.worker.onmessage = (e) => {
          if (e.data.type === 'INIT_DONE') {
            clearTimeout(workerTimeout);
            this.activeEngine = 'worker';
            this.isInitialized = true;
            resolve();
          } else if (e.data.type === 'INIT_FAILED') {
            clearTimeout(workerTimeout);
            console.warn('[TTS] Worker initialization failed. Falling back to Web Speech API.', e.data.error);
            this.activeEngine = 'webspeech';
            this.isInitialized = true;
            resolve();
          }
        };

        this.worker.onerror = (err) => {
          clearTimeout(workerTimeout);
          console.warn('[TTS] Worker error during init. Falling back to Web Speech API.', err);
          this.activeEngine = 'webspeech';
          this.isInitialized = true;
          resolve();
        };
      } catch (err) {
        clearTimeout(workerTimeout);
        console.warn('[TTS] Failed to create Worker. Falling back to Web Speech API.', err);
        this.activeEngine = 'webspeech';
        this.isInitialized = true;
        resolve();
      }
    });

    return this.initPromise;
  }

  speakWebSpeech(text, voiceId, onEnd) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;
    this.onEndCallback = onEnd;

    const voices = window.speechSynthesis.getVoices();
    let matchVoice = null;
    if (voiceId.includes('bella')) {
      matchVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha'));
    } else {
      matchVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david'));
    }
    if (matchVoice) utterance.voice = matchVoice;
    
    utterance.rate = 1.0;

    utterance.onend = () => {
      this.currentUtterance = null;
      if (this.onEndCallback) this.onEndCallback();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (this.onEndCallback) this.onEndCallback();
    };

    // Use 100ms delay to prevent Chrome Speech Synthesis queue corruption
    setTimeout(() => {
      if (this.currentUtterance === utterance) {
        window.speechSynthesis.speak(utterance);
      }
    }, 100);
  }

  stop() {
    window.speechSynthesis.cancel();
    this.currentUtterance = null;
  }
}

export const ttsEngine = new TTSEngine();
