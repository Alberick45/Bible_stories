import { buildTimeline } from '../animation/AnimationBuilder.js';

export class SceneSync {
  constructor() {
    this.audioCtx = null;
    this.currentSource = null;
    this.currentScene = null;
    this.onDone = null;
    this.rafId = null;
    this.safetyTimer = null;
  }

  setAudioContext(ctx) {
    this.audioCtx = ctx;
  }

  play(scene, sceneEngine, onDone, isWebSpeechFallback = false, fallbackSpeakFn = null) {
    this.currentScene = scene;
    this.onDone = onDone;

    const speed = window.currentSpeed || 1;

    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }

    if (isWebSpeechFallback && fallbackSpeakFn) {
      // Estimated duration based on words scaled by speed
      const wordsCount = scene.text ? scene.text.split(/\s+/).length : 5;
      const estimatedDurationSec = Math.max(2.0, (wordsCount / 2.8) / speed);
      scene.durationMs = estimatedDurationSec * 1000;

      scene.animationTimeline = buildTimeline(scene, estimatedDurationSec, sceneEngine);
      if (scene.animationTimeline) {
        scene.animationTimeline.timeScale(speed);
        scene.animationTimeline.play();
      }

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        if (this.safetyTimer) {
          clearTimeout(this.safetyTimer);
          this.safetyTimer = null;
        }
        const cb = this.onDone;
        this.stop();
        if (cb) cb();
      };

      // Safety timeout: guarantees advancement even if mobile speech synthesis onend never fires!
      this.safetyTimer = setTimeout(finish, (estimatedDurationSec + 1.2) * 1000);

      fallbackSpeakFn(scene.text, scene.voice, () => {
        finish();
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
    this.currentSource.playbackRate.value = speed;
    this.currentSource.connect(this.audioCtx.destination);

    this.startTime = this.audioCtx.currentTime;
    this.currentSource.start(this.startTime);

    const tick = () => {
      if (!this.currentSource) return;

      const rawElapsed = this.audioCtx.currentTime - this.startTime;
      const effectiveRate = (this.currentSource && this.currentSource.playbackRate) ? this.currentSource.playbackRate.value : 1;
      const elapsed = rawElapsed * effectiveRate;
      
      if (scene.animationTimeline) {
        scene.animationTimeline.seek(elapsed);
      }

      if (elapsed < durationSec) {
        this.rafId = requestAnimationFrame(tick);
      }
    };
    this.rafId = requestAnimationFrame(tick);

    let audioEnded = false;
    const finishAudio = () => {
      if (audioEnded) return;
      audioEnded = true;
      if (this.safetyTimer) {
        clearTimeout(this.safetyTimer);
        this.safetyTimer = null;
      }
      const cb = this.onDone;
      this.stop();
      if (cb) cb();
    };

    // Safety timeout for buffer audio playback
    this.safetyTimer = setTimeout(finishAudio, (durationSec / speed + 1.2) * 1000);

    this.currentSource.onended = () => {
      finishAudio();
    };
  }

  setPlaybackRate(speed) {
    if (this.currentSource && this.currentSource.playbackRate && this.audioCtx) {
      try {
        this.currentSource.playbackRate.setValueAtTime(speed, this.audioCtx.currentTime);
      } catch (_) {
        this.currentSource.playbackRate.value = speed;
      }
    }
    if (this.currentScene && this.currentScene.animationTimeline) {
      this.currentScene.animationTimeline.timeScale(speed);
    }
  }

  stop() {
    this.onDone = null; // Clear to prevent double invocation on speech cancel

    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
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

