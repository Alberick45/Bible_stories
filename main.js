import { CreationScene } from './creation-scene.js';
import { EdenScene } from './eden-scene.js';
import { CainAbelScene } from './cain-abel-scene.js';
import { NoahScene } from './noah-scene.js';
import { gsap } from 'gsap';
import * as THREE from 'three';

let activeSceneName = 'creation'; // 'creation' or 'eden'
let sceneEngine = null;
let audioContext = null;
let windGain = null;
let lowpassFilter = null;
let isWaitingClick = false;
let advanceCallback = null;

let enableBirdSounds = false;
let enableAnimalSounds = false;
let soundIntervals = [];

// Sequence synchronization to abort older loops on scene swap
let currentSequenceId = 0;

// Speech bubble target tracking
let bubbleTargetObject = null;

// DOM Elements
const canvasWrap = document.getElementById('canvas-wrap');
const narrationEl = document.getElementById('narration');
const hintEl = document.getElementById('continue-hint');
const dayLabelEl = document.getElementById('day-label');
const veilEl = document.getElementById('veil');
const movementHintEl = document.getElementById('movement-hint');
const scriptureLabelEl = document.getElementById('scripture-label');
const scrollPanelEl = document.getElementById('scroll-panel');
const closeScrollBtn = document.getElementById('close-scroll');
const scrollTitleEl = document.getElementById('scroll-title');
const scrollContentEl = document.getElementById('scroll-content');
const speechBubbleEl = document.getElementById('speech-bubble');

// Hub elements
const hubToggleBtn = document.getElementById('hub-toggle-btn');
const hubPanelEl = document.getElementById('hub-panel');
const closeHubBtn = document.getElementById('close-hub');
const eraButtons = document.querySelectorAll('.era-btn');

// Load voices once window is ready
let voices = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
  };
}

// --- 1. Audio Engine ---
function initWindAudio() {
  if (audioContext) return;
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const bufferSize = 2 * audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    
    const noiseNode = audioContext.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;
    
    lowpassFilter = audioContext.createBiquadFilter();
    lowpassFilter.type = 'lowpass';
    lowpassFilter.frequency.value = 350;
    
    windGain = audioContext.createGain();
    windGain.gain.value = 0.0;
    
    noiseNode.connect(lowpassFilter);
    lowpassFilter.connect(windGain);
    windGain.connect(audioContext.destination);
    
    noiseNode.start(0);
    
    const now = audioContext.currentTime;
    windGain.gain.setValueAtTime(0.0, now);
    windGain.gain.linearRampToValueAtTime(0.04, now + 3.0);
  } catch (e) {
    console.warn("Audio Context could not be initialized:", e);
  }
}

function adjustWindIntensity(volume, frequency, durationSec) {
  if (!windGain || !audioContext) return;
  const time = audioContext.currentTime;
  
  windGain.gain.cancelScheduledValues(time);
  if (lowpassFilter) {
    lowpassFilter.frequency.cancelScheduledValues(time);
  }
  
  windGain.gain.setValueAtTime(windGain.gain.value, time);
  if (lowpassFilter) {
    lowpassFilter.frequency.setValueAtTime(lowpassFilter.frequency.value, time);
  }
  
  windGain.gain.linearRampToValueAtTime(volume, time + durationSec);
  if (lowpassFilter) {
    lowpassFilter.frequency.linearRampToValueAtTime(frequency, time + durationSec);
  }
}

function playProceduralBirdChirp() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.type = 'sine';
  const now = audioContext.currentTime;
  const startFreq = 1600 + Math.random() * 600;
  const endFreq = 2600 + Math.random() * 600;
  const duration = 0.08 + Math.random() * 0.08;
  
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
  
  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(0.012, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

function playProceduralLionRoar() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  
  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(75, now);
  osc1.frequency.linearRampToValueAtTime(32, now + 1.2);
  
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(40, now);
  osc2.frequency.linearRampToValueAtTime(22, now + 1.2);
  
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(140, now);
  filter.frequency.linearRampToValueAtTime(80, now + 1.2);
  filter.Q.value = 3.5;
  
  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  
  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(0.022, now + 0.25);
  for (let i = 0; i < 1.2; i += 0.07) {
    gain.gain.setValueAtTime(0.018 + Math.random() * 0.012, now + i);
  }
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);
  
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 1.4);
  osc2.stop(now + 1.4);
}

function playProceduralSheepBleat() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  
  osc.type = 'sawtooth';
  const startFreq = 170 + Math.random() * 30;
  osc.frequency.setValueAtTime(startFreq, now);
  
  const modOsc = audioContext.createOscillator();
  const modGain = audioContext.createGain();
  modOsc.frequency.value = 17;
  modGain.gain.value = 14;
  
  modOsc.connect(modGain);
  modGain.connect(osc.frequency);
  
  filter.type = 'bandpass';
  filter.frequency.value = 900;
  filter.Q.value = 2.0;
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  
  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(0.014, now + 0.12);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
  
  modOsc.start(now);
  osc.start(now);
  modOsc.stop(now + 0.6);
  osc.stop(now + 0.6);
}

function playProceduralSquirrelChirp() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(3200 + Math.random() * 300, now);
  osc.frequency.exponentialRampToValueAtTime(3800, now + 0.04);
  
  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(0.007, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  
  osc.start(now);
  osc.stop(now + 0.05);
}

// Sound loop scheduler
function startAmbientSoundLoops() {
  clearAllIntervals();
  
  const triggerBirdChirp = () => {
    if (enableBirdSounds) {
      playProceduralBirdChirp();
      if (Math.random() > 0.4) {
        setTimeout(playProceduralBirdChirp, 140);
      }
    }
    const nextInterval = 4000 + Math.random() * 7000;
    soundIntervals.push(setTimeout(triggerBirdChirp, nextInterval));
  };
  
  const triggerAnimalCall = () => {
    if (enableAnimalSounds) {
      const roll = Math.random();
      if (roll < 0.45) {
        playProceduralSheepBleat();
      } else if (roll < 0.75) {
        playProceduralSquirrelChirp();
        setTimeout(playProceduralSquirrelChirp, 120);
      } else {
        playProceduralLionRoar();
      }
    }
    const nextInterval = 9000 + Math.random() * 11000;
    soundIntervals.push(setTimeout(triggerAnimalCall, nextInterval));
  };
  
  triggerBirdChirp();
  triggerAnimalCall();
}

function clearAllIntervals() {
  soundIntervals.forEach(id => clearTimeout(id));
  soundIntervals = [];
}

// --- 2. Narrative Sequencing Helpers ---
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function speakText(text, characterName) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  
  const cleanText = text.replace(/["“”]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }
  
  let matchVoice = null;
  if (characterName === 'Eve') {
    matchVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('hazel'));
    utterance.pitch = 1.15;
    utterance.rate = 0.95;
  } else if (characterName === 'Serpent') {
    matchVoice = voices.find(v => v.name.toLowerCase().includes('google uk english male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male'));
    utterance.pitch = 0.55;
    utterance.rate = 0.78;
  } else if (characterName === 'God') {
    matchVoice = voices.find(v => v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('google uk english male'));
    utterance.pitch = 0.70;
    utterance.rate = 0.82;
  } else {
    matchVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david'));
    utterance.pitch = 0.95;
    utterance.rate = 0.92;
  }
  
  if (matchVoice) {
    utterance.voice = matchVoice;
  }
  window.speechSynthesis.speak(utterance);
}

function showTextLine(text, holdBeforeHintMs = 2800, ttsCharacter = 'Narrator') {
  return new Promise(resolve => {
    speakText(text, ttsCharacter);
    
    narrationEl.textContent = text;
    narrationEl.classList.remove('show');
    hintEl.classList.remove('show');
    
    void narrationEl.offsetWidth;
    narrationEl.classList.add('show');
    
    setTimeout(() => {
      hintEl.classList.add('show');
      isWaitingClick = true;
      advanceCallback = () => {
        isWaitingClick = false;
        hintEl.classList.remove('show');
        narrationEl.classList.remove('show');
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        setTimeout(resolve, 850);
      };
    }, holdBeforeHintMs);
  });
}

function showSpeechBubble(characterName, text, holdBeforeHintMs = 2600) {
  return new Promise(resolve => {
    if (!text || !sceneEngine) {
      speechBubbleEl.style.display = 'none';
      bubbleTargetObject = null;
      resolve();
      return;
    }
    
    speakText(text, characterName);
    
    speechBubbleEl.innerHTML = `<strong>${characterName}</strong><br/>${text}`;
    speechBubbleEl.style.display = 'block';
    
    if (characterName === 'Serpent') {
      bubbleTargetObject = sceneEngine.serpentHead;
    } else if (characterName === 'Eve') {
      bubbleTargetObject = sceneEngine.eve;
    } else if (characterName === 'Adam') {
      bubbleTargetObject = sceneEngine.adam;
    } else {
      bubbleTargetObject = null;
    }
    
    hintEl.classList.add('show');
    isWaitingClick = true;
    advanceCallback = () => {
      isWaitingClick = false;
      hintEl.classList.remove('show');
      speechBubbleEl.style.display = 'none';
      bubbleTargetObject = null;
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setTimeout(resolve, 600);
    };
  });
}

function clearNarration() {
  narrationEl.classList.remove('show');
  hintEl.classList.remove('show');
}

function handleAdvance() {
  initWindAudio();
  if (isWaitingClick && advanceCallback) {
    advanceCallback();
  }
}

window.addEventListener('click', handleAdvance);
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    handleAdvance();
  }
});

async function displayDayLabel(label) {
  dayLabelEl.textContent = label;
  dayLabelEl.classList.add('show');
  await delay(2500);
  dayLabelEl.classList.remove('show');
  await delay(600);
}

// --- 3. Scene Cleanups & Switches ---
function destroyActiveScene() {
  clearAllIntervals();
  enableBirdSounds = false;
  enableAnimalSounds = false;
  isWaitingClick = false;
  advanceCallback = null;
  bubbleTargetObject = null;
  
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  
  if (speechBubbleEl) {
    speechBubbleEl.style.display = 'none';
  }
  
  movementHintEl.classList.remove('show');
  scriptureLabelEl.classList.remove('show');
  
  if (sceneEngine) {
    window.removeEventListener('resize', sceneEngine.onWindowResize);
    
    sceneEngine.scene.traverse(node => {
      if (node.isMesh) {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(m => m.dispose());
          } else {
            node.material.dispose();
          }
        }
      }
    });
    
    if (sceneEngine.renderer) {
      sceneEngine.renderer.dispose();
      canvasWrap.innerHTML = '';
    }
    sceneEngine = null;
  }
}

function loadScriptureScroll(title, contentHTML) {
  scrollTitleEl.innerHTML = title;
  scrollContentEl.innerHTML = contentHTML;
}

// --- 4. Scene Pipelines ---

// CREATION SEQUENCE
async function executeCreationSequence(seqId) {
  const stepText = async (txt, hold, ttsName) => {
    if (seqId !== currentSequenceId) return false;
    await showTextLine(txt, hold, ttsName);
    return seqId === currentSequenceId;
  };
  
  const stepDelay = async (ms) => {
    if (seqId !== currentSequenceId) return false;
    await delay(ms);
    return seqId === currentSequenceId;
  };

  scriptureLabelEl.classList.remove('show');
  loadScriptureScroll(
    `Genesis 1:1 &ndash; 2:7 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    `
      <p><span class="verse-num">1</span>In the beginning God created the heaven and the earth.</p>
      <p><span class="verse-num">2</span>And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.</p>
      <p><span class="verse-num">3</span>And God said, Let there be light: and there was light.</p>
      <p><span class="verse-num">4</span>And God saw the light, that it was good: and God divided the light from the darkness.</p>
      <p><span class="verse-num">6&ndash;8</span>And God said, Let there be a firmament in the midst of the waters&hellip; And God called the firmament Heaven.</p>
      <p><span class="verse-num">9&ndash;13</span>And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear&hellip; and the earth brought forth grass, and herb yielding seed, and the fruit tree yielding fruit.</p>
      <p><span class="verse-num">14&ndash;19</span>And God said, Let there be lights in the firmament of the heaven&hellip; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.</p>
      <p><span class="verse-num">20&ndash;23</span>And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth&hellip;</p>
      <p><span class="verse-num">24&ndash;25</span>And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.</p>
      <p><span class="verse-num">26&ndash;27</span>And God said, Let us make man in our image, after our likeness&hellip; So God created man in his own image, in the image of God created he him; male and female created he them.</p>
      <p><span class="verse-num">2:7</span>And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.</p>
    `
  );
  
  if (!await stepDelay(1500)) return;
  
  if (!await stepText('In the beginning, God created the heavens and the earth.', 3400, 'Narrator')) return;
  if (!await stepText('The earth was without form, and void; and darkness was upon the face of the deep.', 3800, 'Narrator')) return;
  
  clearNarration();
  if (!await stepDelay(2800)) return;
  
  if (!await stepText('And God said, "Let there be light."', 2200, 'God')) return;
  
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 0.1s ease';
  veilEl.style.background = '#fff9eb';
  if (!await stepDelay(120)) return;
  veilEl.style.transition = 'background 3.5s cubic-bezier(0.25, 1, 0.5, 1)';
  veilEl.style.background = 'rgba(0,0,0,0)';
  
  if (seqId !== currentSequenceId) return;
  await sceneEngine.transitionDayOne();
  adjustWindIntensity(0.06, 450, 3);
  if (!await stepDelay(2000)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day One');
  if (!await stepText('And God saw the light, that it was good: and God divided the light from the darkness.', 3200, 'Narrator')) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Two');
  if (!await stepText('And God said, "Let there be a firmament in the midst of the waters." And God called the firmament Heaven.', 3400, 'God')) return;
  await sceneEngine.transitionDayTwo();
  if (!await stepDelay(1500)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Three');
  if (!await stepText('And God said, "Let the dry land appear." And the earth brought forth grass, and the fruit tree yielding fruit.', 3600, 'God')) return;
  await sceneEngine.transitionDayThree();
  adjustWindIntensity(0.02, 180, 5.0);
  if (!await stepDelay(3200)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Four');
  if (!await stepText('And God made two great lights, the greater light to rule the day, and the lesser to rule the night: he made the stars also.', 3600, 'Narrator')) return;
  await sceneEngine.transitionDayFour();
  if (!await stepDelay(2000)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Five');
  if (!await stepText('And God said, "Let the waters bring forth abundantly," and let birds fly above the earth.', 3400, 'God')) return;
  await sceneEngine.transitionDayFive();
  enableBirdSounds = true;
  if (!await stepDelay(2200)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Six');
  if (!await stepText('And God made the beasts of the earth after their kind. And it was so.', 3000, 'Narrator')) return;
  await sceneEngine.transitionDaySix();
  enableAnimalSounds = true;
  if (!await stepDelay(2000)) return;
  
  if (!await stepText('Then the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.', 4500, 'Narrator')) return;
  
  if (seqId !== currentSequenceId) return;
  await sceneEngine.formAdam();
  if (!await stepDelay(6500)) return;
  
  clearNarration();
  if (!await stepDelay(1800)) return;
  
  if (seqId !== currentSequenceId) return;
  sceneEngine.unlockControls();
  movementHintEl.classList.add('show');
  scriptureLabelEl.classList.add('show');
}

// EDEN & THE FALL SEQUENCE
async function executeEdenSequence(seqId) {
  const stepText = async (txt, hold, ttsName = 'Narrator') => {
    if (seqId !== currentSequenceId) return false;
    await showTextLine(txt, hold, ttsName);
    return seqId === currentSequenceId;
  };
  
  const stepDelay = async (ms) => {
    if (seqId !== currentSequenceId) return false;
    await delay(ms);
    return seqId === currentSequenceId;
  };

  const stepSpeech = async (char, txt, hold) => {
    if (seqId !== currentSequenceId) return false;
    await showSpeechBubble(char, txt, hold);
    return seqId === currentSequenceId;
  };

  scriptureLabelEl.classList.remove('show');
  loadScriptureScroll(
    `Genesis 3:1 &ndash; 24 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    `
      <p><span class="verse-num">1</span>Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?</p>
      <p><span class="verse-num">2&ndash;3</span>And the woman said unto the serpent, We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.</p>
      <p><span class="verse-num">4&ndash;5</span>And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.</p>
      <p><span class="verse-num">6</span>And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.</p>
      <p><span class="verse-num">7</span>And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons.</p>
      <p><span class="verse-num">8&ndash;19</span>And they heard the voice of the LORD God walking in the garden in the cool of the day... unto Adam he said, Because thou hearkened unto the voice of thy wife, and hast eaten of the tree... cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life...</p>
      <p><span class="verse-num">23&ndash;24</span>Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken. So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.</p>
    `
  );
  
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  
  if (!await stepText('And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.', 3400, 'Narrator')) return;
  if (!await stepText('And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food...', 3600, 'Narrator')) return;
  if (!await stepText('The tree of life also in the midst of the garden, and the tree of knowledge of good and evil.', 3600, 'Narrator')) return;
  
  clearNarration();
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('The Garden');
  
  if (seqId !== currentSequenceId) return;
  sceneEngine.unlockControls();
  movementHintEl.classList.add('show');
  enableBirdSounds = true;
  enableAnimalSounds = true;
  
  if (!await stepText('Walk up to the center Tree of Knowledge to witness the Fall.', 4000, 'Narrator')) return;
  clearNarration();
  
  // Proximity monitor loop
  let proximityCheck = true;
  while (proximityCheck) {
    if (!await stepDelay(150)) return;
    if (seqId !== currentSequenceId) return;
    if (sceneEngine && sceneEngine.adam) {
      const adamPos = sceneEngine.adam.position;
      const distanceToTree = Math.sqrt(adamPos.x * adamPos.x + adamPos.z * adamPos.z);
      if (distanceToTree < 3.2) {
        proximityCheck = false;
      }
    } else {
      proximityCheck = false;
    }
  }
  
  if (seqId !== currentSequenceId) return;
  sceneEngine.movementEnabled = false;
  movementHintEl.classList.remove('show');
  
  // Pivot Eve and Adam to face the tree and serpent
  sceneEngine.eve.position.set(1.2, sceneEngine.getTerrainHeight(1.2, 1.4), 1.4);
  sceneEngine.eve.lookAt(0, sceneEngine.eve.position.y, 0);
  
  sceneEngine.adam.position.set(-1.2, sceneEngine.getTerrainHeight(-1.2, 1.4), 1.4);
  sceneEngine.adam.lookAt(0, sceneEngine.adam.position.y, 0);
  
  // Cinematic wide shot: move camera further back and down to keep bodies, hands, serpent, and fruits fully in frame
  const camPos = sceneEngine.camera.position;
  gsap.to(camPos, {
    x: 0,
    y: 2.2, 
    z: 6.8, 
    duration: 3.5,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(0, 1.6, 0.5); 
      }
    }
  });
  if (!await stepDelay(3700)) return;
  
  if (!await stepText('Now the serpent was more subtil than any beast of the field which the LORD God had made.', 3600, 'Narrator')) return;
  
  // Dialog using speech bubbles above characters heads
  if (!await stepSpeech('Serpent', 'Yea, hath God said, Ye shall not eat of every tree of the garden?', 4200)) return;
  if (!await stepSpeech('Eve', 'We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.', 5800)) return;
  if (!await stepSpeech('Serpent', 'Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.', 6200)) return;
  
  if (!await stepText('The woman saw that the tree was good for food, and that it was pleasant to the eyes...', 3800, 'Narrator')) return;
  
  if (seqId !== currentSequenceId) return;
  // 1. Eve reaches out her right arm and a fruit drops to her hand
  gsap.to(sceneEngine.eveArmR.rotation, { x: -Math.PI / 2.2, duration: 1.2 });
  const fruit = sceneEngine.forbiddenFruits.children[0];
  if (fruit) {
    gsap.to(fruit.position, {
      x: 1.2, 
      y: 0.95,
      z: 1.5, 
      duration: 1.8,
      ease: 'bounce.out'
    });
  }
  if (!await stepDelay(2000)) return;
  
  if (!await stepText('She took of the fruit thereof, and did eat...', 3200, 'Narrator')) return;
  
  // Eve brings hand to head to simulate eating, then resets
  gsap.to(sceneEngine.eveArmR.rotation, { x: -Math.PI / 1.5, duration: 0.8 });
  if (!await stepDelay(900)) return;
  gsap.to(sceneEngine.eveArmR.rotation, { x: 0, duration: 0.6 });
  if (!await stepDelay(700)) return;
  
  if (seqId !== currentSequenceId) return;
  // 2. Eve walks over to Adam to offer the fruit
  const swingInterval = setInterval(() => {
    if (sceneEngine && seqId === currentSequenceId) {
      const swing = Math.sin(performance.now() * 0.01) * 0.45;
      sceneEngine.eve.children[5].rotation.x = swing;
      sceneEngine.eve.children[6].rotation.x = -swing;
    } else {
      clearInterval(swingInterval);
    }
  }, 30);
  
  gsap.to(sceneEngine.eve.position, {
    x: -0.4,
    z: 1.4,
    duration: 2.0,
    onComplete: () => {
      clearInterval(swingInterval);
      if (sceneEngine) {
        sceneEngine.eve.children[5].rotation.x = 0;
        sceneEngine.eve.children[6].rotation.x = 0;
      }
    }
  });
  
  if (fruit) {
    gsap.to(fruit.position, {
      x: -0.8,
      y: 0.95,
      z: 1.4,
      duration: 2.0
    });
  }
  
  sceneEngine.eve.lookAt(-1.2, sceneEngine.eve.position.y, 1.4);
  if (!await stepDelay(2200)) return;
  
  if (!await stepSpeech('Eve', 'Eat of it, and thine eyes shall be opened.', 3500)) return;
  
  if (!await stepText('...and gave also unto her husband with her; and he did eat.', 3800, 'Narrator')) return;
  
  if (seqId !== currentSequenceId) return;
  // 3. Adam reaches out arm, takes the fruit
  gsap.to(sceneEngine.adamArmR.rotation, { x: -Math.PI / 2.2, duration: 1.0 });
  if (fruit) {
    gsap.to(fruit.position, { x: -1.2, y: 0.95, z: 1.4, duration: 0.8 });
  }
  if (!await stepDelay(1100)) return;
  
  // Adam brings hand to mouth to eat
  gsap.to(sceneEngine.adamArmR.rotation, { x: -Math.PI / 1.5, duration: 0.8 });
  if (fruit) {
    gsap.to(fruit.position, { x: -1.2, y: 1.6, z: 1.3, duration: 0.6 });
    gsap.to(fruit.scale, { x: 0, y: 0, z: 0, duration: 0.6, delay: 0.2 });
  }
  if (!await stepDelay(1000)) return;
  
  // Reset arms
  gsap.to(sceneEngine.adamArmR.rotation, { x: 0, duration: 0.8 });
  gsap.to(sceneEngine.eveArmR.rotation, { x: 0, duration: 0.8 });
  if (!await stepDelay(800)) return;
  
  if (seqId !== currentSequenceId) return;
  // Flash of warning red
  veilEl.style.transition = 'background 0.15s ease';
  veilEl.style.background = '#300808';
  if (!await stepDelay(200)) return;
  veilEl.style.transition = 'background 4.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  
  if (seqId !== currentSequenceId) return;
  sceneEngine.triggerTheFall();
  adjustWindIntensity(0.08, 480, 5.0);
  if (!await stepDelay(2500)) return;
  
  if (!await stepText('And the eyes of them both were opened, and they knew that they were naked.', 3600, 'Narrator')) return;
  
  // Animate Adam and Eve crossing arms in shame / covering themselves
  if (seqId !== currentSequenceId) return;
  sceneEngine.coverThemselves();
  if (!await stepDelay(2000)) return;
  
  if (!await stepText('And they heard the voice of the LORD God walking in the garden in the cool of the day.', 3800, 'Narrator')) return;
  
  // Turn on the sweeping divine presence light representing God's voice
  if (seqId !== currentSequenceId) return;
  gsap.to(sceneEngine.presenceLight, { intensity: 5.5, duration: 2.0 });
  
  // Animate Adam and Eve running in fear to hide behind the nearby trees
  const runInterval = setInterval(() => {
    if (sceneEngine && seqId === currentSequenceId) {
      const swing = Math.sin(performance.now() * 0.015) * 0.45;
      sceneEngine.eve.children[5].rotation.x = swing;
      sceneEngine.eve.children[6].rotation.x = -swing;
      sceneEngine.adam.children[5].rotation.x = swing;
      sceneEngine.adam.children[6].rotation.x = -swing;
    } else {
      clearInterval(runInterval);
    }
  }, 30);
  
  gsap.to(sceneEngine.adam.position, { x: 9.0, z: -8.0, duration: 2.5 });
  gsap.to(sceneEngine.eve.position, { x: 10.5, z: -7.5, duration: 2.5 });
  
  // Pivot camera to look at the trees where they are hiding
  gsap.to(camPos, {
    x: 8.0,
    y: 2.0,
    z: -4.5,
    duration: 3.0,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(9.8, 1.4, -8.0);
      }
    },
    onComplete: () => {
      clearInterval(runInterval);
      if (sceneEngine) {
        sceneEngine.eve.children[5].rotation.x = 0;
        sceneEngine.eve.children[6].rotation.x = 0;
        sceneEngine.adam.children[5].rotation.x = 0;
        sceneEngine.adam.children[6].rotation.x = 0;
      }
    }
  });
  if (!await stepDelay(3200)) return;
  
  if (!await stepText('...and Adam and his wife hid themselves from the presence of the LORD God amongst the trees.', 3800, 'Narrator')) return;
  
  // --- QUESTIONING DIALOGUE SEGMENT ---
  if (!await stepText('And the LORD God called unto Adam, and said unto him, "Where art thou?"', 4200, 'God')) return;
  
  if (!await stepSpeech('Adam', 'I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself.', 5200)) return;
  
  if (!await stepText('And the LORD God said, "Who told thee that thou wast naked? Hast thou eaten of the tree whereof I commanded thee?"', 5500, 'God')) return;
  
  if (!await stepSpeech('Adam', 'The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.', 4800)) return;
  
  if (!await stepText('And the LORD God said unto the woman, "What is this that thou hast done?"', 4200, 'God')) return;
  
  if (!await stepSpeech('Eve', 'The serpent beguiled me, and I did eat.', 4400)) return;
  
  // --- PUNISHMENT ORDER: SERPENT FIRST, THEN EVE, THEN ADAM ---
  if (!await stepText('And the LORD God said unto the serpent, "Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life..."', 6800, 'God')) return;
  
  if (!await stepText('Unto the woman God said, "I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children..."', 5200, 'God')) return;
  
  if (!await stepText('And unto Adam he said, "Because thou hast hearkened unto the voice of thy wife, and hast eaten of the tree... cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life..."', 5800, 'God')) return;
  
  if (!await stepText('Therefore the LORD God sent him forth from the garden of Eden, to till the ground.', 3800, 'Narrator')) return;
  
  // Enable East Gate Cherubims & Flaming Sword
  if (seqId !== currentSequenceId) return;
  sceneEngine.eastGateGroup.visible = true;
  
  // Pan camera to show Cherubims guarding the gate
  gsap.to(camPos, {
    x: 18.0,
    y: 2.2,
    z: 4.5,
    duration: 3.5,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(22.0, 1.5, 0.0);
      }
    }
  });
  if (!await stepDelay(3800)) return;
  
  // Animate Adam and Eve turning around and slowly walking past the Cherubims out of the garden
  if (seqId !== currentSequenceId) return;
  sceneEngine.eve.lookAt(22.0, sceneEngine.eve.position.y, 0);
  sceneEngine.adam.lookAt(22.0, sceneEngine.adam.position.y, 0);
  
  const walkAwayInterval = setInterval(() => {
    if (sceneEngine && seqId === currentSequenceId) {
      const swing = Math.sin(performance.now() * 0.01) * 0.45;
      sceneEngine.eve.children[5].rotation.x = swing;
      sceneEngine.eve.children[6].rotation.x = -swing;
      sceneEngine.adam.children[5].rotation.x = swing;
      sceneEngine.adam.children[6].rotation.x = -swing;
    } else {
      clearInterval(walkAwayInterval);
    }
  }, 30);
  
  gsap.to(sceneEngine.eve.position, { x: 26.0, z: 0.5, duration: 6.0 });
  gsap.to(sceneEngine.adam.position, { x: 25.0, z: -0.5, duration: 6.0 });
  
  // Fade screen to black as they walk past
  veilEl.style.transition = 'background 5.0s ease';
  veilEl.style.background = '#000000';
  
  if (!await stepDelay(5500)) {
    clearInterval(walkAwayInterval);
    return;
  }
  clearInterval(walkAwayInterval);
  
  if (!await stepText('So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.', 6500, 'Narrator')) return;
  
  clearNarration();
  if (seqId !== currentSequenceId) return;
  scriptureLabelEl.classList.add('show');
}

// CAIN & ABEL SEQUENCE (Genesis 4)
async function executeCainAbelSequence(seqId) {
  const stepText = async (txt, hold, ttsName = 'Narrator') => {
    if (seqId !== currentSequenceId) return false;
    await showTextLine(txt, hold, ttsName);
    return seqId === currentSequenceId;
  };
  
  const stepDelay = async (ms) => {
    if (seqId !== currentSequenceId) return false;
    await delay(ms);
    return seqId === currentSequenceId;
  };

  const stepSpeech = async (char, txt, hold) => {
    if (seqId !== currentSequenceId) return false;
    await showSpeechBubble(char, txt, hold);
    return seqId === currentSequenceId;
  };

  scriptureLabelEl.classList.remove('show');
  loadScriptureScroll(
    `Genesis 4:1 &ndash; 6:8 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    `
      <p><span class="verse-num">1</span>And Adam knew Eve his wife; and she conceived, and bare Cain, and said, I have gotten a man from the LORD.</p>
      <p><span class="verse-num">2</span>And she again bare his brother Abel. And Abel was a keeper of sheep, but Cain was a tiller of the ground.</p>
      <p><span class="verse-num">3</span>And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD.</p>
      <p><span class="verse-num">4</span>And Abel, he also brought of the firstlings of his flock and of the fat thereof. And the LORD had respect unto Abel and to his offering:</p>
      <p><span class="verse-num">5</span>But unto Cain and to his offering he had not respect. And Cain was very wroth, and his countenance fell.</p>
      <p><span class="verse-num">6&ndash;7</span>And the LORD said unto Cain, Why art thou wroth? and why is thy countenance fallen? If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door...</p>
      <p><span class="verse-num">8</span>And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.</p>
      <p><span class="verse-num">9</span>And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper?</p>
      <p><span class="verse-num">10&ndash;12</span>And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground. And now art thou cursed from the earth... When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be...</p>
      <p><span class="verse-num">13&ndash;14</span>And Cain said unto the LORD, My punishment is greater than I can bear... every one that findeth me shall slay me.</p>
      <p><span class="verse-num">15&ndash;16</span>And the LORD said unto him, Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold. And the LORD set a mark upon Cain... And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.</p>
      <p><span class="verse-num">25</span>And Adam knew his wife again; and she bare a son, and called his name Seth: For God, said she, hath appointed me another seed instead of Abel, whom Cain slew.</p>
      <p><span class="verse-num">6:5&ndash;8</span>And GOD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually... And it repented the LORD that he had made man on the earth... But Noah found grace in the eyes of the LORD.</p>
    `
  );

  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';

  // Gen 4:1 - Birth of Cain
  const camPos = sceneEngine.camera.position;
  camPos.set(-11, 2.5, 14);
  sceneEngine.camera.lookAt(-16.0, 1.3, 11.5);
  
  if (!await stepText('And Adam knew Eve his wife; and she conceived, and bare Cain...', 3800, 'Narrator')) return;
  if (!await stepSpeech('Eve', 'I have gotten a man from the LORD.', 3200)) return;

  // Gen 4:2 - Birth of Abel & Growing Up
  if (!await stepText('And she again bare his brother Abel.', 3400, 'Narrator')) return;
  if (!await stepText('And the brothers grew; Abel became a keeper of sheep, but Cain was a tiller of the ground.', 4200, 'Narrator')) return;

  // Transition to manhood (hide babies, show grown Cain & Abel)
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 0.5s ease';
  veilEl.style.background = '#ffffff';
  if (!await stepDelay(550)) return;
  
  // Hide infants and crib
  sceneEngine.crib.visible = false;
  // Show full grown models
  sceneEngine.cain.visible = true;
  sceneEngine.abel.visible = true;
  
  // Position them at their domains
  sceneEngine.cain.position.set(-12, sceneEngine.getTerrainHeight(-12, -2), -2);
  sceneEngine.cain.lookAt(-2.8, sceneEngine.cain.position.y, 0.0);
  sceneEngine.abel.position.set(14, sceneEngine.getTerrainHeight(14, 6), 6);
  sceneEngine.abel.lookAt(2.8, sceneEngine.abel.position.y, 0.0);
  
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  if (!await stepDelay(1000)) return;

  // Gen 4:3-4 - Offerings
  if (!await stepText('And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD.', 4200, 'Narrator')) return;
  if (!await stepText('And Abel, he also brought of the firstlings of his flock and of the fat thereof.', 4200, 'Narrator')) return;

  // Player controls Cain to walk to altar
  if (seqId !== currentSequenceId) return;
  sceneEngine.unlockControls();
  movementHintEl.classList.add('show');
  
  if (!await stepText('Walk to the central Altar of Stones to present your offering.', 4200, 'Narrator')) return;
  clearNarration();

  // Wait for Cain to approach his altar
  let proximityCheck = true;
  while (proximityCheck) {
    if (!await stepDelay(150)) return;
    if (seqId !== currentSequenceId) return;
    if (sceneEngine && sceneEngine.cain) {
      const cPos = sceneEngine.cain.position;
      const dist = Math.sqrt((cPos.x + 2.8) * (cPos.x + 2.8) + cPos.z * cPos.z);
      if (dist < 3.0) {
        proximityCheck = false;
      }
    } else {
      proximityCheck = false;
    }
  }

  // Lock movement controls for cinematic
  if (seqId !== currentSequenceId) return;
  sceneEngine.movementEnabled = false;
  movementHintEl.classList.remove('show');

  // Place Cain and Abel precisely at their altars facing inwards (aligning Y with terrain)
  const cainTargetY = sceneEngine.getTerrainHeight(-2.8, 2.2);
  const abelTargetY = sceneEngine.getTerrainHeight(2.8, 2.2);
  
  gsap.to(sceneEngine.cain.position, { x: -2.8, y: cainTargetY, z: 2.2, duration: 1.0 });
  sceneEngine.cain.lookAt(-2.8, cainTargetY, 0);
  
  gsap.to(sceneEngine.abel.position, { x: 2.8, y: abelTargetY, z: 2.2, duration: 1.0 });
  sceneEngine.abel.lookAt(2.8, abelTargetY, 0);

  // Position camera for sacrifice wide shot
  gsap.to(camPos, {
    x: 0,
    y: 2.4,
    z: 5.8,
    duration: 2.0,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(0, 1.2, 0);
      }
    }
  });
  if (!await stepDelay(2200)) return;

  // Present offerings
  gsap.to(sceneEngine.cainArmR.rotation, { x: -Math.PI / 2.2, duration: 0.8 });
  gsap.to(sceneEngine.abelArmR.rotation, { x: -Math.PI / 2.2, duration: 0.8 });
  if (!await stepDelay(1000)) return;

  // Gen 4:4-5 - Divine reaction
  if (seqId !== currentSequenceId) return;
  // Activate Abel's golden light pillar and Cain's dark smoke
  sceneEngine.altarLightActive = true;
  gsap.to(sceneEngine.abelLightPillar.material, { opacity: 0.85, duration: 1.8 });
  
  sceneEngine.altarSmokeActive = true;
  if (!await stepDelay(1200)) return;

  if (!await stepText('And the LORD had respect unto Abel and to his offering...', 3800, 'Narrator')) return;
  if (!await stepText('But unto Cain and to his offering he had not respect.', 3800, 'Narrator')) return;

  // Cain becomes wroth
  if (seqId !== currentSequenceId) return;
  gsap.to(sceneEngine.cainArmL.rotation, { z: 0.5, duration: 1.0 });
  gsap.to(sceneEngine.cainArmR.rotation, { z: -0.5, duration: 1.0 });
  if (!await stepText('And Cain was very wroth, and his countenance fell.', 3600, 'Narrator')) return;

  // God's warning
  if (!await stepText('And the LORD said unto Cain, "Why art thou wroth? and why is thy countenance fallen?"', 4200, 'God')) return;
  if (!await stepText('"If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door..."', 5200, 'God')) return;

  // Gen 4:8 - The Murder
  if (seqId !== currentSequenceId) return;
  // Reset arms
  gsap.to(sceneEngine.cainArmL.rotation, { z: 0, duration: 0.8 });
  gsap.to(sceneEngine.cainArmR.rotation, { z: 0, duration: 0.8 });
  
  sceneEngine.cain.lookAt(sceneEngine.abel.position.x, sceneEngine.cain.position.y, sceneEngine.abel.position.z);
  if (!await stepSpeech('Cain', 'Let us go into the field.', 3200)) return;

  // Walk into the field at (0, y, -12)
  if (seqId !== currentSequenceId) return;
  const walkInterval = setInterval(() => {
    if (sceneEngine && seqId === currentSequenceId) {
      const swing = Math.sin(performance.now() * 0.012) * 0.45;
      sceneEngine.cain.children[5].rotation.x = swing;
      sceneEngine.cain.children[6].rotation.x = -swing;
      sceneEngine.abel.children[5].rotation.x = swing;
      sceneEngine.abel.children[6].rotation.x = -swing;
    } else {
      clearInterval(walkInterval);
    }
  }, 30);

  gsap.to(sceneEngine.cain.position, { x: -0.6, z: -12.0, duration: 3.5 });
  gsap.to(sceneEngine.abel.position, { x: 0.6, z: -12.0, duration: 3.5 });

  // Camera follows them to the tilled fields
  gsap.to(camPos, {
    x: 0,
    y: 2.2,
    z: -7.5,
    duration: 3.5,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(0, 1.4, -12.0);
      }
    },
    onComplete: () => {
      clearInterval(walkInterval);
      if (sceneEngine) {
        sceneEngine.cain.children[5].rotation.x = 0;
        sceneEngine.cain.children[6].rotation.x = 0;
        sceneEngine.abel.children[5].rotation.x = 0;
        sceneEngine.abel.children[6].rotation.x = 0;
      }
    }
  });

  if (!await stepDelay(3800)) return;

  // Cain rises up against Abel
  if (seqId !== currentSequenceId) return;
  sceneEngine.cain.lookAt(sceneEngine.abel.position.x, sceneEngine.cain.position.y, sceneEngine.abel.position.z);
  gsap.to(sceneEngine.cainArmR.rotation, { x: -Math.PI / 1.1, duration: 0.7 });
  if (!await stepDelay(900)) return;

  // Strike Abel down
  gsap.to(sceneEngine.cainArmR.rotation, { x: -Math.PI / 3.0, duration: 0.2, ease: 'power2.in' });
  if (seqId !== currentSequenceId) return;
  
  // Strike flash
  veilEl.style.transition = 'background 0.05s ease';
  veilEl.style.background = '#4a0808';
  
  gsap.to(sceneEngine.abel.rotation, { x: Math.PI / 2, duration: 0.5 });
  gsap.to(sceneEngine.abel.position, { y: sceneEngine.getTerrainHeight(0.6, -12.0) + 0.1, duration: 0.5 });
  
  if (!await stepDelay(100)) return;
  veilEl.style.transition = 'background 2.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  if (!await stepDelay(600)) return;

  if (!await stepText('And it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.', 4500, 'Narrator')) return;

  // Reset Cain's arm
  gsap.to(sceneEngine.cainArmR.rotation, { x: 0, duration: 0.8 });

  // Gen 4:9 - Questioning
  if (!await stepText('And the LORD said unto Cain, "Where is Abel thy brother?"', 4200, 'God')) return;
  if (!await stepSpeech('Cain', 'I know not: Am I my brother\'s keeper?', 3600)) return;

  // Gen 4:10-12 - Curses
  if (!await stepText('And God said, "What hast thou done? the voice of thy brother\'s blood crieth unto me from the ground."', 5200, 'God')) return;
  if (!await stepText('"And now art thou cursed from the earth, which hath opened her mouth to receive thy brother\'s blood..."', 5200, 'God')) return;
  if (!await stepText('"When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be..."', 5600, 'God')) return;

  // Gen 4:13-14 - Cain's grief
  if (seqId !== currentSequenceId) return;
  gsap.to(sceneEngine.cain.position, { y: sceneEngine.getTerrainHeight(-0.6, -12.0) - 0.45, duration: 1.0 }); // Cain falls to knees
  if (!await stepSpeech('Cain', 'My punishment is greater than I can bear. Behold, thou hast driven me out this day...', 5200)) return;

  // Gen 4:15-16 - Setting the Mark
  if (!await stepText('And the LORD said, "Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold."', 4500, 'God')) return;

  if (seqId !== currentSequenceId) return;
  // Fade in the warning mark above Cain's head
  gsap.to(sceneEngine.cainMark.material, { opacity: 0.9, duration: 1.5 });
  if (!await stepText('And the LORD set a mark upon Cain, lest any finding him should kill him.', 3800, 'Narrator')) return;

  // Cain stands and wanders away East of Eden
  if (seqId !== currentSequenceId) return;
  gsap.to(sceneEngine.cain.position, { y: sceneEngine.getTerrainHeight(-0.6, -12.0), duration: 0.8 }); // stand up
  if (!await stepDelay(900)) return;
  
  sceneEngine.cain.lookAt(20, sceneEngine.cain.position.y, -30);
  
  const walkAwayInterval = setInterval(() => {
    if (sceneEngine && seqId === currentSequenceId) {
      const swing = Math.sin(performance.now() * 0.01) * 0.45;
      sceneEngine.cain.children[5].rotation.x = swing;
      sceneEngine.cain.children[6].rotation.x = -swing;
    } else {
      clearInterval(walkAwayInterval);
    }
  }, 30);

  gsap.to(sceneEngine.cain.position, { x: 20, z: -30, duration: 6.0 });
  
  veilEl.style.transition = 'background 5.0s ease';
  veilEl.style.background = '#000000';

  if (!await stepDelay(5500)) {
    clearInterval(walkAwayInterval);
    return;
  }
  clearInterval(walkAwayInterval);

  if (!await stepText('And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.', 6200, 'Narrator')) return;

  clearNarration();
  if (seqId !== currentSequenceId) return;

  // --- Transition to Birth of Seth (Gen 4:25) ---
  // Hide Cain & Abel, make Seth visible
  sceneEngine.cain.visible = false;
  sceneEngine.abel.visible = false;
  sceneEngine.seth.visible = true;

  // Reset Adam & Eve posture/rotation
  sceneEngine.adam.position.set(-14.5, sceneEngine.getTerrainHeight(-14.5, 10.0), 10.0);
  sceneEngine.adam.lookAt(-15.0, sceneEngine.adam.position.y, 11.5);
  sceneEngine.eve.position.set(-15.5, sceneEngine.getTerrainHeight(-15.5, 10.0), 10.0);
  sceneEngine.eve.lookAt(-15.0, sceneEngine.eve.position.y, 11.5);

  // Position camera on the family shelter
  camPos.set(-11, 2.5, 14);
  sceneEngine.camera.lookAt(-15.0, 1.3, 11.5);

  // Fade back in
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  if (!await stepDelay(1800)) return;

  if (!await stepText('And Adam knew his wife again; and she bare a son, and called his name Seth...', 4200, 'Narrator')) return;
  if (!await stepSpeech('Eve', 'For God hath appointed me another seed instead of Abel, whom Cain slew.', 4200)) return;

  // --- Transition to Wickedness of Man (Gen 6:1-6) ---
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = '#000000';
  if (!await stepDelay(1600)) return;

  // Hide family shelter characters, show wicked carousing bystanders
  sceneEngine.adam.visible = false;
  sceneEngine.eve.visible = false;
  sceneEngine.seth.visible = false;
  sceneEngine.shelterGroup.visible = false;
  sceneEngine.wickedPeople.visible = true;

  // Move camera to tilled fields where the wicked are
  camPos.set(-5.0, 2.0, -6.5);
  sceneEngine.camera.lookAt(-5.0, 1.3, -11.0);

  // Fade in
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  if (!await stepDelay(1800)) return;

  if (!await stepText('And it came to pass, as men multiplied on the face of the earth...', 3600, 'Narrator')) return;

  // Camera pans slightly as they carouse
  gsap.to(camPos, {
    x: -3.0,
    duration: 5.0,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(-4.5, 1.3, -11.0);
      }
    }
  });

  if (!await stepText('GOD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually.', 5200, 'Narrator')) return;
  
  if (!await stepText('And the earth was corrupt before God, and filled with violence.', 4200, 'Narrator')) return;

  // God's voice expressing grief
  if (!await stepText('"It repenteth me that I have made man on the earth, and it grieveth me at my heart."', 5200, 'God')) return;

  // Fade to black
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 3.5s ease';
  veilEl.style.background = '#000000';
  if (!await stepDelay(3800)) return;

  if (!await stepText('But Noah found grace in the eyes of the LORD.', 4500, 'Narrator')) return;

  clearNarration();
  if (seqId !== currentSequenceId) return;
  scriptureLabelEl.classList.add('show');
}

// NOAH'S ARK SEQUENCE (Genesis 6-9)
async function executeNoahSequence(seqId) {
  const stepText = async (txt, hold, ttsName = 'Narrator') => {
    if (seqId !== currentSequenceId) return false;
    await showTextLine(txt, hold, ttsName);
    return seqId === currentSequenceId;
  };
  
  const stepDelay = async (ms) => {
    if (seqId !== currentSequenceId) return false;
    await delay(ms);
    return seqId === currentSequenceId;
  };

  const stepSpeech = async (char, txt, hold) => {
    if (seqId !== currentSequenceId) return false;
    await showSpeechBubble(char, txt, hold);
    return seqId === currentSequenceId;
  };

  scriptureLabelEl.classList.remove('show');
  loadScriptureScroll(
    `Genesis 6:13 &ndash; 9:13 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    `
      <p><span class="verse-num">6:13&ndash;14</span>And God said unto Noah, The end of all flesh is come before me... Make thee an ark of gopher wood; rooms shalt thou make in the ark...</p>
      <p><span class="verse-num">7:1</span>And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation.</p>
      <p><span class="verse-num">7:2&ndash;3</span>Of every clean beast thou shalt take to thee by sevens, the male and his female... of fowls also of the air by sevens...</p>
      <p><span class="verse-num">7:7</span>And Noah went in, and his sons, and his wife, and his sons' wives with him, into the ark, because of the waters of the flood.</p>
      <p><span class="verse-num">7:11&ndash;12</span>...the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights.</p>
      <p><span class="verse-num">7:17&ndash;18</span>And the flood was forty days upon the earth... and the waters increased, and bare up the ark, and it was lift up above the earth.</p>
      <p><span class="verse-num">8:1&ndash;3</span>And God remembered Noah, and every living thing... and the rain from heaven was restrained; And the waters returned from off the earth...</p>
      <p><span class="verse-num">9:13</span>I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.</p>
    `
  );

  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';

  // Gen 6:13-14 - God's Command
  const camPos = sceneEngine.camera.position;
  camPos.set(-10, 3.5, 18);
  sceneEngine.camera.lookAt(0, 2.0, 0);

  if (!await stepText('And God said unto Noah, "The end of all flesh is come before me; for the earth is filled with violence through them..."', 4800, 'God')) return;
  if (!await stepText('"Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch."', 5200, 'God')) return;

  if (!await stepSpeech('Noah', 'I will build it according to all that the LORD has commanded me.', 3600)) return;

  // Gen 7:1-7 - Interactive Gathering
  if (seqId !== currentSequenceId) return;
  sceneEngine.unlockControls();
  movementHintEl.classList.add('show');

  if (!await stepText('Guide Noah to the animal pairs near the Ark entrance.', 4200, 'Narrator')) return;
  clearNarration();

  // Wait for Noah to approach the animal queue at (22, 0.0)
  let proximityCheck = true;
  while (proximityCheck) {
    if (!await stepDelay(150)) return;
    if (seqId !== currentSequenceId) return;
    if (sceneEngine && sceneEngine.noah) {
      const nPos = sceneEngine.noah.position;
      const dist = Math.sqrt((nPos.x - 13.5) * (nPos.x - 13.5) + nPos.z * nPos.z);
      if (dist < 4.2) {
        proximityCheck = false;
      }
    } else {
      proximityCheck = false;
    }
  }

  // Lock controls for cinematic boarding
  if (seqId !== currentSequenceId) return;
  sceneEngine.movementEnabled = false;
  movementHintEl.classList.remove('show');

  if (!await stepText('And Noah went in, and his wife with him, and the beasts after their kind into the ark.', 4200, 'Narrator')) return;

  // Position camera for boarding wide shot
  gsap.to(camPos, {
    x: 12.0,
    y: 4.0,
    z: 11.5,
    duration: 2.2,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(5.5, 2.2, 0.0);
      }
    }
  });

  // Animate Animals entering the Ark
  if (seqId !== currentSequenceId) return;
  for (let i = 0; i < sceneEngine.pairInstances.length; i++) {
    const animal = sceneEngine.pairInstances[i];
    gsap.to(animal.position, {
      x: 6.2,
      z: 0.0,
      duration: 1.2,
      delay: i * 0.25,
      ease: 'power1.inOut',
      onComplete: () => {
        animal.visible = false;
      }
    });
  }
  if (!await stepDelay(3000)) return;

  // Noah and Wife walk inside
  gsap.to(sceneEngine.noah.position, { x: 7.2, z: 0.0, duration: 1.2 });
  gsap.to(sceneEngine.wife.position, { x: 7.2, z: 0.0, duration: 1.2 });
  if (!await stepDelay(1400)) return;

  sceneEngine.noah.visible = false;
  sceneEngine.wife.visible = false;

  // Close the Ark Door
  gsap.to(sceneEngine.doorGroup.rotation, { y: -Math.PI / 2.0, duration: 1.5 });
  if (!await stepDelay(1000)) return;
  sceneEngine.ramp.visible = false;
  if (!await stepDelay(600)) return;

  // Gen 7:11-12 - The Rain Begins
  sceneEngine.rainActive = true;
  adjustWindIntensity(0.12, 100, 10.0); // Procedural storm wind
  gsap.to(sceneEngine.sunLight, { intensity: 0.1, duration: 3.0 });
  gsap.to(sceneEngine.hemiLight, { intensity: 0.15, duration: 3.0 });

  if (!await stepText('...the same day were all the fountains of the great deep broken up, and the windows of heaven were opened.', 4500, 'Narrator')) return;
  if (!await stepText('And the rain was upon the earth forty days and forty nights.', 4200, 'Narrator')) return;

  // Gen 7:17-18 - The Flood & Floating
  sceneEngine.waterRising = true;

  // Pull camera out to wide flooded view
  gsap.to(camPos, {
    x: -30.0,
    y: 22.0,
    z: 42.0,
    duration: 8.0,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(sceneEngine.ark.position);
      }
    }
  });

  if (!await stepText('And the flood was forty days upon the earth; and the waters increased, and bare up the ark...', 4500, 'Narrator')) return;
  if (!await stepText('And it was lift up above the earth, and the ark went upon the face of the waters.', 4500, 'Narrator')) return;

  // Wait for water to reach peak height
  let waterCheck = true;
  while (waterCheck) {
    if (!await stepDelay(150)) return;
    if (seqId !== currentSequenceId) return;
    if (sceneEngine && sceneEngine.waterHeight >= 4.5) {
      waterCheck = false;
    }
  }

  // Fade out to Ararat Epilogue
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 3.0s ease';
  veilEl.style.background = '#000000';
  if (!await stepDelay(3200)) return;

  // Disable rain/rising water
  sceneEngine.rainActive = false;
  sceneEngine.waterRising = false;

  if (!await stepText('And God remembered Noah, and every living thing, and all the cattle that was with him in the ark...', 4500, 'Narrator')) return;
  if (!await stepText('And the rain from heaven was restrained; And the waters returned from off the earth continually.', 4500, 'Narrator')) return;

  // Rainbow Covenant (Gen 9:13)
  if (!await stepText('And God said, "I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth."', 5200, 'God')) return;

  clearNarration();
  if (seqId !== currentSequenceId) return;
  scriptureLabelEl.classList.add('show');
}

// --- 5. Scene Swap Loader ---
function loadScene(sceneName) {
  currentSequenceId++;
  const thisSeqId = currentSequenceId;

  destroyActiveScene();
  activeSceneName = sceneName;
  
  eraButtons.forEach(btn => {
    if (btn.getAttribute('data-scene') === sceneName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  veilEl.style.transition = 'none';
  veilEl.style.background = '#000000';
  
  void veilEl.offsetWidth;
  
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';

  let lastTime = 0;
  function tick(timestamp) {
    if (thisSeqId !== currentSequenceId || !sceneEngine) return;
    const elapsed = timestamp * 0.001;
    const dt = elapsed - lastTime;
    lastTime = elapsed;
    
    // Project and position speech bubble in 2D screen coordinates
    if (bubbleTargetObject && sceneEngine) {
      const tempV = new THREE.Vector3();
      bubbleTargetObject.getWorldPosition(tempV);
      
      if (bubbleTargetObject === sceneEngine.serpentHead) {
        tempV.y += 0.45;
      } else {
        tempV.y += 1.85;
      }
      
      tempV.project(sceneEngine.camera);
      
      const pxX = (tempV.x * 0.5 + 0.5) * window.innerWidth;
      let pxY = (tempV.y * -0.5 + 0.5) * window.innerHeight;
      
      if (pxY < 80) pxY = 80;
      
      speechBubbleEl.style.left = `${pxX}px`;
      speechBubbleEl.style.top = `${pxY}px`;
    }
    
    sceneEngine.update(elapsed, dt);
    requestAnimationFrame(tick);
  }
  
  if (sceneName === 'creation') {
    sceneEngine = new CreationScene(canvasWrap);
    requestAnimationFrame(tick);
    executeCreationSequence(thisSeqId);
  } else if (sceneName === 'eden') {
    sceneEngine = new EdenScene(canvasWrap);
    requestAnimationFrame(tick);
    executeEdenSequence(thisSeqId);
  } else if (sceneName === 'cainabel') {
    sceneEngine = new CainAbelScene(canvasWrap);
    requestAnimationFrame(tick);
    executeCainAbelSequence(thisSeqId);
  } else if (sceneName === 'noah') {
    sceneEngine = new NoahScene(canvasWrap);
    requestAnimationFrame(tick);
    executeNoahSequence(thisSeqId);
  }
}

// Mobile Virtual Joystick Touch Helper
function initTouchControls() {
  const joystickZone = document.getElementById('joystick-zone');
  const joystickBase = document.getElementById('joystick-base');
  const joystickKnob = document.getElementById('joystick-knob');
  
  if (!joystickZone) return;
  
  let joystickActive = false;
  let joystickStartPos = { x: 0, y: 0 };
  
  joystickZone.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = joystickBase.getBoundingClientRect();
    joystickStartPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    joystickActive = true;
  });
  
  joystickZone.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!joystickActive || !sceneEngine) return;
    const touch = e.touches[0];
    const dx = touch.clientX - joystickStartPos.x;
    const dy = touch.clientY - joystickStartPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 35;
    
    let moveX = dx;
    let moveY = dy;
    
    if (dist > maxRadius) {
      moveX = (dx / dist) * maxRadius;
      moveY = (dy / dist) * maxRadius;
    }
    
    joystickKnob.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    if (sceneEngine.joystickVector) {
      sceneEngine.joystickVector.x = moveX / maxRadius;
      sceneEngine.joystickVector.y = -moveY / maxRadius; // Invert Y for forwardWebGL
    }
  });
  
  joystickZone.addEventListener('touchend', (e) => {
    e.preventDefault();
    joystickActive = false;
    joystickKnob.style.transform = 'translate(0px, 0px)';
    if (sceneEngine && sceneEngine.joystickVector) {
      sceneEngine.joystickVector.set(0, 0);
    }
  });
  
  // Right-screen swipe look controls
  let swipeStart = { x: 0, y: 0 };
  let isSwiping = false;
  
  window.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    if (touch.clientX > window.innerWidth / 2) {
      swipeStart = { x: touch.clientX, y: touch.clientY };
      isSwiping = true;
    }
  }, { passive: true });
  
  window.addEventListener('touchmove', (e) => {
    if (!isSwiping || !sceneEngine || !sceneEngine.movementEnabled) return;
    const touch = e.touches[0];
    const dx = touch.clientX - swipeStart.x;
    const dy = touch.clientY - swipeStart.y;
    
    sceneEngine.targetYaw -= dx * 0.007;
    sceneEngine.targetPitch -= dy * 0.007;
    sceneEngine.targetPitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, sceneEngine.targetPitch));
    
    swipeStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  
  window.addEventListener('touchend', () => {
    isSwiping = false;
  }, { passive: true });
}

// --- 6. DOM Initialization Hooks ---
document.addEventListener('DOMContentLoaded', () => {
  initTouchControls();

  hubToggleBtn.addEventListener('click', () => {
    hubPanelEl.classList.add('show');
  });
  
  closeHubBtn.addEventListener('click', () => {
    hubPanelEl.classList.remove('show');
  });
  
  eraButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const targetScene = btn.getAttribute('data-scene');
      if (targetScene && !btn.classList.contains('disabled')) {
        hubPanelEl.classList.remove('show');
        loadScene(targetScene);
      }
    });
  });
  
  closeScrollBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    scrollPanelEl.classList.remove('show');
  });
  
  scriptureLabelEl.addEventListener('click', () => {
    scrollPanelEl.classList.add('show');
  });
  
  const beginBtn = document.getElementById('begin-btn');
  const titleScreen = document.getElementById('title-screen');
  const loadingScreen = document.getElementById('loading-screen');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const loadingText = document.getElementById('loading-text');

  beginBtn.addEventListener('click', () => {
    // Hide Title Screen
    titleScreen.style.opacity = 0;
    setTimeout(() => {
      titleScreen.style.visibility = 'hidden';
    }, 1000);

    // Show Loading Screen
    loadingScreen.classList.add('show');

    // Simulate Asset Loading with Progress Bar
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);

        setTimeout(() => {
          loadingScreen.classList.remove('show');
          startAmbientSoundLoops();
          loadScene('creation');
        }, 500);
      }
      progressBarFill.style.width = `${progress}%`;
      loadingText.textContent = `Loading Assets... ${progress}%`;
    }, 100);
  });
});
