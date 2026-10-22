/**
 * StormSoundEngine — High-fidelity procedural audio engine for biblical rain,
 * violent howling wind, thunder strikes, and ocean deluge.
 * Built with Web Audio API for zero-latency, 100% offline, zero CORS/download failure.
 */
class StormSoundEngine {
  constructor() {
    this.audioContext = null;
    this.rainGain = null;
    this.windGain = null;
    this.windFilter = null;
    this.windLFO = null;
    this.rainSource = null;
    this.windSource = null;
    this.isPlaying = false;
    this.thunderTimeout = null;
  }

  getAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
    return this.audioContext;
  }

  createNoiseBuffer(seconds = 3) {
    const ctx = this.getAudioContext();
    if (!ctx) return null;
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Pinkish-brownian noise for natural water and wind texture
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2.0 - 1.0;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.18;
    }
    return buffer;
  }

  startRain(gainVal = 0.32) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (this.rainSource) return; // already active

    const buffer = this.createNoiseBuffer(3);
    if (!buffer) return;

    this.rainSource = ctx.createBufferSource();
    this.rainSource.buffer = buffer;
    this.rainSource.loop = true;

    // Dual filters for rich rushing rain droplet spectrum
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1600;
    bandpass.Q.value = 0.7;

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 450;

    this.rainGain = ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.rainGain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 2.5);

    this.rainSource.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(this.rainGain);
    this.rainGain.connect(ctx.destination);

    this.rainSource.start();
  }

  stopRain(fadeDuration = 2.5) {
    if (!this.rainSource || !this.rainGain || !this.audioContext) return;
    const now = this.audioContext.currentTime;
    this.rainGain.gain.setValueAtTime(this.rainGain.gain.value, now);
    this.rainGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);
    setTimeout(() => {
      if (this.rainSource) {
        try { this.rainSource.stop(); } catch (_) {}
        this.rainSource = null;
      }
    }, fadeDuration * 1000);
  }

  startWind(gainVal = 0.28) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (this.windSource) return;

    const buffer = this.createNoiseBuffer(3);
    if (!buffer) return;

    this.windSource = ctx.createBufferSource();
    this.windSource.buffer = buffer;
    this.windSource.loop = true;

    // Resonant lowpass / bandpass for howling wind
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.value = 280;
    this.windFilter.Q.value = 3.5;

    // LFO to modulate wind howling frequency
    this.windLFO = ctx.createOscillator();
    this.windLFO.frequency.value = 0.22; // slow howling cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180; // swing +- 180Hz
    this.windLFO.connect(lfoGain);
    lfoGain.connect(this.windFilter.frequency);
    this.windLFO.start();

    this.windGain = ctx.createGain();
    this.windGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.windGain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 3.0);

    this.windSource.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(ctx.destination);

    this.windSource.start();
  }

  stopWind(fadeDuration = 3.0) {
    if (!this.windSource || !this.windGain || !this.audioContext) return;
    const now = this.audioContext.currentTime;
    this.windGain.gain.setValueAtTime(this.windGain.gain.value, now);
    this.windGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);
    setTimeout(() => {
      if (this.windSource) {
        try { this.windSource.stop(); } catch (_) {}
        this.windSource = null;
      }
      if (this.windLFO) {
        try { this.windLFO.stop(); } catch (_) {}
        this.windLFO = null;
      }
    }, fadeDuration * 1000);
  }

  playThunder(volume = 0.85) {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Initial lightning crack (high-energy instantaneous sharp blast)
    const crackLen = 0.06;
    const crackBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * crackLen), ctx.sampleRate);
    const crackData = crackBuf.getChannelData(0);
    for (let i = 0; i < crackData.length; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }
    const crackSource = ctx.createBufferSource();
    crackSource.buffer = crackBuf;
    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    crackFilter.frequency.value = 1200;
    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(volume * 0.85, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + crackLen);
    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(ctx.destination);
    crackSource.start(now);

    // 2. Deep rolling thunder rumble (decaying resonant sub-bass roar over 3.5s)
    const rumbleDur = 3.8;
    const rumbleBuf = this.createNoiseBuffer(4);
    if (!rumbleBuf) return;

    const rumbleSource = ctx.createBufferSource();
    rumbleSource.buffer = rumbleBuf;

    const rumbleFilter = ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.setValueAtTime(140, now);
    rumbleFilter.frequency.exponentialRampToValueAtTime(55, now + rumbleDur);
    rumbleFilter.Q.value = 4.0;

    // Sub-bass frequency oscillator reinforcing the heavy physical rumble
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(62, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + rumbleDur);

    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.001, now);
    rumbleGain.gain.linearRampToValueAtTime(volume * 0.95, now + 0.08); // sudden punch
    rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + rumbleDur);

    rumbleSource.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    subOsc.connect(rumbleFilter);
    rumbleGain.connect(ctx.destination);

    rumbleSource.start(now + 0.02);
    subOsc.start(now + 0.02);
    rumbleSource.stop(now + rumbleDur);
    subOsc.stop(now + rumbleDur);
  }

  startStorm(rainGain = 0.32, windGain = 0.28) {
    this.isPlaying = true;
    this.startRain(rainGain);
    this.startWind(windGain);
  }

  stopStorm() {
    this.isPlaying = false;
    this.stopRain(2.5);
    this.stopWind(2.5);
    if (this.thunderTimeout) {
      clearTimeout(this.thunderTimeout);
      this.thunderTimeout = null;
    }
  }
}

export const stormAudio = new StormSoundEngine();
