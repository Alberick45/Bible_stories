import { buildTimeline } from '../animation/AnimationBuilder.js';

export class SceneSync {
  constructor() {
    this.audioCtx = null;
    this.currentSource = null;
    this.currentScene = null;
    this.onDone = null;
    this.rafId = null;
  }

  setAudioContext(ctx) {
    this.audioCtx = ctx;
  }

  play(scene, sceneEngine, onDone, isWebSpeechFallback = false, fallbackSpeakFn = null) {
    this.currentScene = scene;
    this.onDone = onDone;

    if (isWebSpeechFallback && fallbackSpeakFn) {
      // Estimated duration based on words
      const wordsCount = scene.text ? scene.text.split(/\s+/).length : 5;
      const estimatedDurationSec = Math.max(2.0, wordsCount / 3.0);
      scene.durationMs = estimatedDurationSec * 1000;

      scene.animationTimeline = buildTimeline(scene, estimatedDurationSec, sceneEngine);
      if (scene.animationTimeline) {
        scene.animationTimeline.play();
      }

      fallbackSpeakFn(scene.text, scene.voice, () => {
        const cb = this.onDone;
        this.stop();
        if (cb) cb();
      });
      return;
    }

    if (!scene.audioBuffer) {
      console.warn('[Sync] No audio buffer found for scene', scene.id);
      const cb = this.onDone;
      this.stop();
      if (cb) cb();
      return;
    }

    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const durationSec = scene.durationMs / 1000;
    scene.animationTimeline = buildTimeline(scene, durationSec, sceneEngine);
    if (scene.animationTimeline) {
      scene.animationTimeline.pause(); // Control timing strictly via elapsed currentTime
    }

    this.currentSource = this.audioCtx.createBufferSource();
    this.currentSource.buffer = scene.audioBuffer;
    this.currentSource.connect(this.audioCtx.destination);

    const startTime = this.audioCtx.currentTime;
    this.currentSource.start(startTime);

    const tick = () => {
      if (!this.currentSource) return;

      const elapsed = this.audioCtx.currentTime - startTime;
      
      if (scene.animationTimeline) {
        scene.animationTimeline.seek(elapsed);
      }

      if (elapsed < durationSec) {
        this.rafId = requestAnimationFrame(tick);
      }
    };
    this.rafId = requestAnimationFrame(tick);

    this.currentSource.onended = () => {
      const cb = this.onDone;
      this.stop();
      if (cb) cb();
    };
  }

  stop() {
    this.onDone = null; // Clear to prevent double invocation on speech cancel

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {}
      this.currentSource = null;
    }
    if (this.currentScene && this.currentScene.animationTimeline) {
      this.currentScene.animationTimeline.kill();
      this.currentScene.animationTimeline = null;
    }
    this.currentScene = null;

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}
