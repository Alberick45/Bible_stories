import * as THREE from 'three';
import { orchestrator } from './scenes/SceneOrchestrator.js';
import { ttsEngine } from './tts/TTSEngine.js';
import { makeCacheKey } from './scenes/SceneData.js';
import { CreationScene } from '../creation-scene.js';
import { EdenScene } from '../eden-scene.js';
import { CainAbelScene } from '../cain-abel-scene.js';
import { NoahScene } from '../noah-scene.js';
import { BabelScene } from '../babel-scene.js';
import { preloadSceneAssets } from './models/index.js';
import gsap from 'gsap';

// Global variables for backward compatibility
window.activeSceneName = 'creation';
window.sceneEngine = null;
window.currentSequenceId = 0;
window.currentSpeed = 1;
window.isCinematicActive = false;

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
const speedToggleBtn = document.getElementById('speed-toggle-btn');
const skipBtn = document.getElementById('skip-btn');

// Hub elements
const hubToggleBtn = document.getElementById('hub-toggle-btn');
const hubPanelEl = document.getElementById('hub-panel');
const closeHubBtn = document.getElementById('close-hub');
const eraButtons = document.querySelectorAll('.era-btn, .era-card');

// Audio states
let audioContext = null;
let windGain = null;
let lowpassFilter = null;
let soundIntervals = [];

// Interactive checks
let interactiveInterval = null;

// Speech bubble target tracking
let bubbleTargetObject = null;

// ==========================================
// Sound & SFX Helpers
// ==========================================

function initWindAudio() {
  if (audioContext) return;
  
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioCtx();
  
  // Create noise source
  const bufferSize = audioContext.sampleRate * 2.0; // 2 seconds
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2.0 - 1.0;
  }
  
  const noise = audioContext.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  
  // Filter for wind frequency
  lowpassFilter = audioContext.createBiquadFilter();
  lowpassFilter.type = 'lowpass';
  lowpassFilter.frequency.value = 350;
  lowpassFilter.Q.value = 1.0;
  
  windGain = audioContext.createGain();
  windGain.gain.value = 0.03;
  
  noise.connect(lowpassFilter);
  lowpassFilter.connect(windGain);
  windGain.connect(audioContext.destination);
  
  noise.start();
}

window.adjustWindIntensity = function(gainVal, freqVal, duration = 3) {
  if (!windGain || !lowpassFilter || !audioContext) return;
  const now = audioContext.currentTime;
  
  windGain.gain.setValueAtTime(windGain.gain.value, now);
  windGain.gain.exponentialRampToValueAtTime(Math.max(0.001, gainVal), now + duration);
  
  lowpassFilter.frequency.setValueAtTime(lowpassFilter.frequency.value, now);
  lowpassFilter.frequency.exponentialRampToValueAtTime(Math.max(50, freqVal), now + duration);
};

function startAmbientSoundLoops() {
  initWindAudio();
  
  const birdInterval = setInterval(() => {
    if (window.enableBirdSounds && audioContext) {
      playSyntheticBirdChirp();
    }
  }, 3500);
  
  const animalInterval = setInterval(() => {
    if (window.enableAnimalSounds && audioContext) {
      playSyntheticAnimalBleat();
    }
  }, 6200);
  
  soundIntervals.push(birdInterval, animalInterval);
}

function playSyntheticBirdChirp() {
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  osc.type = 'sine';
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  const now = audioContext.currentTime;
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(2600, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.015, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  
  osc.start(now);
  osc.stop(now + 0.16);
}

function playSyntheticAnimalBleat() {
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  osc.type = 'sawtooth';
  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  const now = audioContext.currentTime;
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.linearRampToValueAtTime(180, now + 0.35);
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.012, now + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  
  osc.start(now);
  osc.stop(now + 0.45);
}

function destroyActiveScene() {
  soundIntervals.forEach(id => clearInterval(id));
  soundIntervals = [];
  clearInterval(interactiveInterval);

  window.enableBirdSounds = false;
  window.enableAnimalSounds = false;
  bubbleTargetObject = null;
  if (speechBubbleEl) speechBubbleEl.style.display = 'none';
  if (narrationEl) narrationEl.classList.remove('show');
  if (hintEl) hintEl.classList.remove('show');
  if (movementHintEl) movementHintEl.classList.remove('show');
  if (scriptureLabelEl) scriptureLabelEl.classList.remove('show');

  if (window.sceneEngine) {
    window.removeEventListener('resize', window.sceneEngine.onWindowResize);
    window.sceneEngine.scene.traverse(node => {
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
    if (window.sceneEngine.renderer) {
      window.sceneEngine.renderer.dispose();
      canvasWrap.innerHTML = '';
    }
    window.sceneEngine = null;
  }
}

function loadScriptureScroll(title, contentHTML) {
  scrollTitleEl.innerHTML = title;
  scrollContentEl.innerHTML = contentHTML;
}

// ==========================================
// Scene Orchestration & Gameplay Sync
// ==========================================

async function loadScene(sceneName) {
  window.currentSequenceId++;
  const thisSeqId = window.currentSequenceId;

  // Fade screen to black
  veilEl.style.transition = 'background 0.4s ease';
  veilEl.style.background = '#000000';

  if (window.showCameraToast) {
    const sceneTitles = {
      creation: 'Creation',
      eden: 'Garden of Eden',
      cainabel: 'Cain & Abel',
      noah: 'Noah\'s Ark',
      babel: 'Tower of Babel'
    };
    window.showCameraToast(`Entering ${sceneTitles[sceneName] || sceneName}...`);
  }

  // Preload assets for this target scene while veil is dark
  try {
    await preloadSceneAssets(sceneName);
  } catch (e) {
    console.warn('[loadScene] Preload warning:', e);
  }

  if (thisSeqId !== window.currentSequenceId) return;

  destroyActiveScene();
  window.activeSceneName = sceneName;

  // Highlight timeline hub
  eraButtons.forEach(btn => {
    if (btn.getAttribute('data-scene') === sceneName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Populate scripture scroll content
  setupScriptureContent(sceneName);

  // Setup rendering tick loop
  let lastTime = 0;
  function tick(timestamp) {
    if (thisSeqId !== window.currentSequenceId || !window.sceneEngine) return;
    const elapsed = timestamp * 0.001;
    const dt = elapsed - lastTime;
    lastTime = elapsed;
    
    // Project speech bubbles above character models
    if (bubbleTargetObject && window.sceneEngine) {
      const tempV = new THREE.Vector3();
      bubbleTargetObject.getWorldPosition(tempV);
      tempV.y += (bubbleTargetObject === window.sceneEngine.serpentHead) ? 0.45 : 1.85;
      tempV.project(window.sceneEngine.camera);
      
      const pxX = (tempV.x * 0.5 + 0.5) * window.innerWidth;
      let pxY = (tempV.y * -0.5 + 0.5) * window.innerHeight;
      if (pxY < 80) pxY = 80;
      
      speechBubbleEl.style.left = `${pxX}px`;
      speechBubbleEl.style.top = `${pxY}px`;
    }
    
    window.sceneEngine.update(elapsed, dt);
    requestAnimationFrame(tick);
  }

  // Instantiation
  if (sceneName === 'creation') {
    window.sceneEngine = new CreationScene(canvasWrap);
  } else if (sceneName === 'eden') {
    window.sceneEngine = new EdenScene(canvasWrap);
  } else if (sceneName === 'cainabel') {
    window.sceneEngine = new CainAbelScene(canvasWrap);
  } else if (sceneName === 'noah') {
    window.sceneEngine = new NoahScene(canvasWrap);
  } else if (sceneName === 'babel') {
    window.sceneEngine = new BabelScene(canvasWrap);
  }

  if (window.sceneEngine) {
    window.sceneEngine.update(0, 0.016);
    requestAnimationFrame(tick);

    // Boot orchestrator for this chapter
    orchestrator.startChapter(sceneName);
  }

  setTimeout(() => {
    if (thisSeqId !== window.currentSequenceId) return;
    veilEl.style.transition = 'background 1.0s ease';
    veilEl.style.background = 'rgba(0,0,0,0)';
  }, 100);
}

// Proximity monitor loops for interactive gameplay checkpoints
function setupInteractiveGameplay(scene) {
  clearInterval(interactiveInterval);
  window.isCinematicActive = false;
  
  if (skipBtn) skipBtn.style.display = 'none';

  if (scene.chapterId === 'creation') {
    window.sceneEngine.unlockControls();
    movementHintEl.classList.add('show');
    scriptureLabelEl.classList.add('show');
  } 
  else if (scene.chapterId === 'eden') {
    window.sceneEngine.unlockControls();
    movementHintEl.classList.add('show');
    scriptureLabelEl.classList.add('show');

    interactiveInterval = setInterval(() => {
      if (!window.sceneEngine || !window.sceneEngine.adam) return;
      const adamPos = window.sceneEngine.adam.position;
      const distanceToTree = Math.sqrt(adamPos.x * adamPos.x + adamPos.z * adamPos.z);
      if (distanceToTree < 3.2) {
        clearInterval(interactiveInterval);
        movementHintEl.classList.remove('show');
        orchestrator.next(); // Go to next narrative line (The Fall)
      }
    }, 150);
  } 
  else if (scene.chapterId === 'cainabel') {
    window.sceneEngine.unlockControls();
    movementHintEl.classList.add('show');
    scriptureLabelEl.classList.add('show');

    interactiveInterval = setInterval(() => {
      if (!window.sceneEngine || !window.sceneEngine.cain) return;
      const cPos = window.sceneEngine.cain.position;
      const dist = Math.sqrt((cPos.x + 2.8) * (cPos.x + 2.8) + cPos.z * cPos.z);
      if (dist < 3.0) {
        clearInterval(interactiveInterval);
        movementHintEl.classList.remove('show');
        orchestrator.next();
      }
    }, 150);
  } 
  else if (scene.chapterId === 'noah') {
    window.sceneEngine.unlockControls();
    movementHintEl.classList.add('show');
    scriptureLabelEl.classList.add('show');

    interactiveInterval = setInterval(() => {
      if (!window.sceneEngine) return;
      // Wait until all animals are herded into the Ark
      if (window.sceneEngine.animalPairs && window.sceneEngine.animalPairs.every(p => p.herded)) {
        clearInterval(interactiveInterval);
        movementHintEl.classList.remove('show');
        orchestrator.next();
      }
    }, 150);
  } 
  else if (scene.chapterId === 'babel') {
    window.sceneEngine.unlockControls();
    movementHintEl.classList.add('show');
    scriptureLabelEl.classList.add('show');
  }
}

// Render current narrative subtitles and speech bubble positions
function handleSceneChange(scene) {
  if (scene.type === 'interactive') {
    if (narrationEl) narrationEl.classList.remove('show');
    if (speechBubbleEl) speechBubbleEl.style.display = 'none';
    if (hintEl) hintEl.classList.remove('show');
    bubbleTargetObject = null;
    
    // Display interactive instruction in top tutorial box
    showInstructionBanner(scene.instruction);
    return;
  }

  // Narrative scene
  hideInstructionBanner();
  
  window.isCinematicActive = true;
  if (hintEl) {
    hintEl.classList.add('show');
  }

  if (skipBtn) {
    skipBtn.textContent = 'Skip Intro';
    skipBtn.style.display = 'block';
  }

  const isNarrator = (scene.character.toLowerCase() === 'narrator' || scene.character.toLowerCase() === 'god');
  
  if (isNarrator) {
    if (speechBubbleEl) speechBubbleEl.style.display = 'none';
    bubbleTargetObject = null;

    if (narrationEl) {
      narrationEl.innerHTML = scene.text;
      narrationEl.classList.add('show');
    }
  } else {
    if (narrationEl) narrationEl.classList.remove('show');

    if (speechBubbleEl) {
      speechBubbleEl.innerHTML = `<strong>${scene.character}</strong><br>${scene.text}`;
      speechBubbleEl.style.display = 'block';
    }

    // Set bubble targets
    const charName = scene.character.toLowerCase();
    if (charName === 'serpent') {
      bubbleTargetObject = window.sceneEngine.serpentHead;
    } else if (charName === 'eve') {
      bubbleTargetObject = window.sceneEngine.eve;
    } else if (charName === 'adam') {
      bubbleTargetObject = window.sceneEngine.adam;
    } else if (charName === 'noah') {
      bubbleTargetObject = window.sceneEngine.noah;
    } else if (charName === 'nimrod' || charName === 'builder') {
      bubbleTargetObject = window.sceneEngine.builder;
    } else if (charName === 'worker') {
      bubbleTargetObject = window.sceneEngine.workers ? window.sceneEngine.workers[0] : null;
    }
  }
}

function showInstructionBanner(text) {
  const instructionBanner = document.getElementById('instruction-banner') || createInstructionBanner();
  instructionBanner.innerHTML = text;
  instructionBanner.classList.add('show');
}

function hideInstructionBanner() {
  const instructionBanner = document.getElementById('instruction-banner');
  if (instructionBanner) {
    instructionBanner.classList.remove('show');
  }
}

function createInstructionBanner() {
  const div = document.createElement('div');
  div.id = 'instruction-banner';
  div.className = 'instruction-banner';
  document.body.appendChild(div);
  return div;
}

const SCRIPTURE_TEXTS = {
  creation: {
    title: `Genesis 1:1 &ndash; 2:7 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    content: `
      <p><span class="verse-num">1:1</span>In the beginning God created the heaven and the earth.</p>
      <p><span class="verse-num">1:2</span>And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.</p>
      <p><span class="verse-num">1:3</span>And God said, Let there be light: and there was light.</p>
      <p><span class="verse-num">1:4</span>And God saw the light, that it was good: and God divided the light from the darkness.</p>
      <p><span class="verse-num">1:9-13</span>And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so. And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.</p>
      <p><span class="verse-num">1:26-27</span>And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air... So God created man in his own image, in the image of God created he him; male and female created he them.</p>
      <p><span class="verse-num">2:7</span>And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.</p>
    `
  },
  eden: {
    title: `Genesis 2:8 &ndash; 3:24 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    content: `
      <p><span class="verse-num">2:8-9</span>And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed. And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil.</p>
      <p><span class="verse-num">2:15-17</span>And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it. And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat: But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.</p>
      <p><span class="verse-num">2:19-22</span>And out of the ground the LORD God formed every beast of the field, and every fowl of the air; and brought them unto Adam to see what he would call them... And the LORD God caused a deep sleep to fall upon Adam... and he took one of his ribs, and closed up the flesh instead thereof; And the rib, which the LORD God had taken from man, made he a woman.</p>
      <p><span class="verse-num">3:1-6</span>Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?... And when the woman saw that the tree was good for food, and that it was pleasant to the eyes... she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.</p>
      <p><span class="verse-num">3:23-24</span>Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken. So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.</p>
    `
  },
  cainabel: {
    title: `Genesis 4:1 &ndash; 16 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    content: `
      <p><span class="verse-num">4:1-2</span>And Adam knew Eve his wife; and she conceived, and bare Cain... And she again bare his brother Abel. And Abel was a keeper of sheep, but Cain was a tiller of the ground.</p>
      <p><span class="verse-num">4:3-5</span>And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD. And Abel, he also brought of the firstlings of his flock and of the fat thereof. And the LORD had respect unto Abel and to his offering: But unto Cain and to his offering he had not respect. And Cain was very wroth, and his countenance fell.</p>
      <p><span class="verse-num">4:8-10</span>And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him. And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper? And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground.</p>
      <p><span class="verse-num">4:15-16</span>And the LORD set a mark upon Cain, lest any finding him should kill him. And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.</p>
    `
  },
  noah: {
    title: `Genesis 6:5 &ndash; 9:17 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    content: `
      <p><span class="verse-num">6:5-8</span>And God saw that the wickedness of man was great in the earth... But Noah found grace in the eyes of the LORD.</p>
      <p><span class="verse-num">6:14-19</span>Make thee an ark of gopher wood... And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female.</p>
      <p><span class="verse-num">7:11-12</span>In the six hundredth year of Noah's life... were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights.</p>
      <p><span class="verse-num">8:10-11</span>And he stayed yet other seven days; and again he sent forth the dove out of the ark; And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off: so Noah knew that the waters were abated from off the earth.</p>
      <p><span class="verse-num">9:12-13</span>And God said, This is the token of the covenant which I make between me and you... I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.</p>
    `
  },
  babel: {
    title: `Genesis 11:1 &ndash; 9 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    content: `
      <p><span class="verse-num">11:1-4</span>And the whole earth was of one language, and of one speech... And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.</p>
      <p><span class="verse-num">11:5-7</span>And the LORD came down to see the city and the tower, which the children of men builded. And the LORD said, Behold, the people is one, and they have all one language... Go to, let us go down, and there confound their language, that they may not understand one another's speech.</p>
      <p><span class="verse-num">11:8-9</span>So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city. Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth.</p>
    `
  }
};

function setupScriptureContent(sceneName) {
  const scripture = SCRIPTURE_TEXTS[sceneName] || SCRIPTURE_TEXTS.creation;
  loadScriptureScroll(scripture.title, scripture.content);
}

// ==========================================
// DOM Initialization Hooks
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile virtual stick
  initTouchControls();
  
  // Custom instruction banner setup
  createInstructionBanner();

  // Camera Toast Notification System
  let cameraToastTimeout = null;
  window.showCameraToast = function(text) {
    let toastEl = document.getElementById('camera-toast');
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'camera-toast';
      toastEl.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(18,24,38,0.9);color:#e2d4b7;border:1px solid rgba(212,175,55,0.5);padding:8px 22px;border-radius:20px;font-family:"Cinzel",serif;font-size:13px;letter-spacing:1px;z-index:9999;pointer-events:none;transition:opacity 0.3s ease;box-shadow:0 4px 15px rgba(0,0,0,0.5);text-transform:uppercase;';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = text;
    toastEl.style.opacity = '1';
    clearTimeout(cameraToastTimeout);
    cameraToastTimeout = setTimeout(() => {
      toastEl.style.opacity = '0';
    }, 2200);
  };

  // Non-blocking interrupt listeners (Space, Enter, Click on narration or hint) & Camera toggle (V)
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      if (orchestrator.isPlaying) {
        e.preventDefault();
        orchestrator.interrupt();
      }
    } else if (e.code === 'KeyV' && !e.repeat) {
      if (window.sceneEngine && typeof window.sceneEngine.toggleCameraMode === 'function') {
        window.sceneEngine.toggleCameraMode();
      }
    } else if (e.code === 'KeyT' && !e.repeat) {
      triggerActivePlayerAnimation('talking');
    } else if (e.code === 'KeyP' && !e.repeat) {
      triggerActivePlayerAnimation('pray');
    } else if (e.code === 'KeyJ' && !e.repeat) {
      triggerActivePlayerAnimation('jump');
    } else if (e.code === 'KeyK' && !e.repeat) {
      triggerActivePlayerAnimation('kicking');
    } else if (e.code === 'KeyR' && !e.repeat) {
      triggerActivePlayerAnimation('angry');
    } else if (e.code === 'KeyL' && !e.repeat) {
      triggerActivePlayerAnimation('male_laying');
    }
  });

  // Action bar buttons click handler
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const actionName = btn.getAttribute('data-action');
      if (actionName) {
        triggerActivePlayerAnimation(actionName);
      }
    });
  });

  function triggerActivePlayerAnimation(animName) {
    if (!window.sceneEngine) return;
    if (typeof window.sceneEngine.triggerPlayerAction === 'function') {
      window.sceneEngine.triggerPlayerAction(animName);
    } else {
      const char = window.sceneEngine.adamCharacter || window.sceneEngine.eveCharacter || window.sceneEngine.cainCharacter || window.sceneEngine.noahCharacter || window.sceneEngine.builderCharacter;
      if (char && char.playAnimation) {
        const isLooping = (animName === 'talking' || animName === 'pray' || animName === 'praying');
        char.playAnimation(animName, { loop: isLooping, clampWhenFinished: !isLooping, force: true });
      }
    }
  }

  if (hintEl) {
    hintEl.addEventListener('click', (e) => {
      e.stopPropagation();
      orchestrator.interrupt();
    });
  }

  if (narrationEl) {
    narrationEl.addEventListener('click', (e) => {
      e.stopPropagation();
      orchestrator.interrupt();
    });
  }

  // Speed controls
  if (speedToggleBtn) {
    speedToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.currentSpeed = window.currentSpeed === 1 ? 2 : 1;
      speedToggleBtn.textContent = `Speed: ${window.currentSpeed}x`;
      
      // Update global timeline rate (voices stay at 1x rate natively)
      gsap.globalTimeline.timeScale(window.currentSpeed);
    });
  }

  // Skip buttons
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      orchestrator.skip();
    });
  }

  // Timeline Hub
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

  // Book opening & progress loading triggers
  const beginBtn = document.getElementById('begin-btn');
  const bookContainer = document.getElementById('book-container');
  const bookCover = document.getElementById('book-cover');
  const loadingText = document.getElementById('loading-text');
  const crossGoldFill = document.querySelector('.cross-gold-fill');

  function updateCrossProgress(p) {
    const clipBottom = document.getElementById('clip-bottom');
    const clipCenter = document.getElementById('clip-center');
    const clipLeftArm = document.getElementById('clip-left-arm');
    const clipRightArm = document.getElementById('clip-right-arm');
    const clipTop = document.getElementById('clip-top');
    
    if (!clipBottom) return;
    
    clipBottom.setAttribute('height', '0');
    clipCenter.setAttribute('height', '0');
    clipLeftArm.setAttribute('width', '0');
    clipLeftArm.setAttribute('x', '44');
    clipRightArm.setAttribute('width', '0');
    clipTop.setAttribute('height', '0');
    clipTop.setAttribute('y', '44');

    if (p <= 50) {
      const pct = p / 50;
      const h = pct * 84;
      clipBottom.setAttribute('y', (140 - h).toString());
      clipBottom.setAttribute('height', h.toString());
    } else {
      clipBottom.setAttribute('y', '56');
      clipBottom.setAttribute('height', '84');
      
      if (p <= 55) {
        const pct = (p - 50) / 5;
        const h = pct * 12;
        clipCenter.setAttribute('y', (56 - h).toString());
        clipCenter.setAttribute('height', h.toString());
      } else {
        clipCenter.setAttribute('y', '44');
        clipCenter.setAttribute('height', '12');
        
        if (p <= 85) {
          const pct = (p - 55) / 30;
          const w = pct * 34;
          clipLeftArm.setAttribute('x', (44 - w).toString());
          clipLeftArm.setAttribute('width', w.toString());
          clipRightArm.setAttribute('width', w.toString());
        } else {
          clipLeftArm.setAttribute('x', '10');
          clipLeftArm.setAttribute('width', '34');
          clipRightArm.setAttribute('width', '34');
          
          const pct = (p - 85) / 15;
          const h = pct * 34;
          clipTop.setAttribute('y', (44 - h).toString());
          clipTop.setAttribute('height', h.toString());
        }
      }
    }
  }

  const loadingPhrases = [
    { threshold: 0, text: "Opening the Scriptures..." },
    { threshold: 15, text: "Preparing the World..." },
    { threshold: 30, text: "Illuminating the Pages..." },
    { threshold: 45, text: "Loading Sacred Music..." },
    { threshold: 60, text: "Preparing Characters..." },
    { threshold: 75, text: "Bringing History to Life..." },
    { threshold: 90, text: "Preparing Your Journey..." }
  ];

  const handleBegin = () => {
    // 1. Start Orchestrator initialization
    orchestrator.onLoadingProgress = (percent, label) => {
      updateCrossProgress(percent);
      loadingText.textContent = label;
    };

    orchestrator.onSceneChanged = (scene) => {
      handleSceneChange(scene);
    };

    orchestrator.onInteractiveStart = (scene) => {
      setupInteractiveGameplay(scene);
    };

    let orchestratorReady = false;
    let modelsReady = false;

    // Start background loading and pre-generation immediately
    orchestrator.init()
      .then(() => orchestrator.prepareFirstScene('creation'))
      .then(() => {
        orchestratorReady = true;
      })
      .catch(err => {
        console.error('[Boot] Orchestrator init error:', err);
        orchestratorReady = true; // Proceed anyway in fallback mode
      });

    // Start 3D model & animation preloading for initial scene
    preloadSceneAssets('creation', (ratio, loaded, total) => {
      console.log(`[Boot] Preloaded 3D assets: ${loaded}/${total}`);
    })
      .then(() => {
        modelsReady = true;
      })
      .catch(err => {
        console.error('[Boot] Model preloader error:', err);
        modelsReady = true; // Proceed anyway with sculpted fallbacks
      });

    // Run book opening animation immediately
    setTimeout(() => {
      startAmbientSoundLoops();
      playProceduralLeatherCreak();
      setTimeout(playProceduralPageRustle, 120);

      const wrapper = document.querySelector('.book-wrapper');
      if (wrapper) wrapper.style.transform = 'translateZ(180px) translateX(-25%)';

      setTimeout(() => {
        if (bookCover) bookCover.style.transform = 'rotateY(-115deg)';
        if (bookContainer) bookContainer.classList.add('book-opened');
      }, 250);

      setTimeout(() => {
        if (wrapper) wrapper.style.transform = 'translateZ(420px) translateX(-25%)';
      }, 1200);

      // Start progress bar animation on the loader screen inside the book
      setTimeout(() => {
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.floor(Math.random() * 6) + 3;

          if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            updateCrossProgress(100);
            loadingText.textContent = "Illuminated";

            // Final completion sequence and zoom into 3D canvas
            setTimeout(() => {
              if (crossGoldFill) crossGoldFill.classList.add('glow-active');
              
              setTimeout(() => {
                if (wrapper) {
                  wrapper.style.transition = 'transform 2.5s cubic-bezier(0.25, 1, 0.3, 1)';
                  wrapper.style.transform = 'translateZ(1800px) translateX(-350px)';
                }
                if (bookContainer) {
                  bookContainer.style.transition = 'opacity 2.2s cubic-bezier(0.25, 1, 0.3, 1), visibility 2.2s';
                  bookContainer.style.opacity = '0';
                  setTimeout(() => { bookContainer.style.visibility = 'hidden'; }, 2200);
                }

                // Load first scene
                loadScene('creation');
              }, 1200);
            }, 1000);
          } else {
            // Hold progress at 90% if audio or 3D models are not yet fully ready
            if (progress >= 90 && (!orchestratorReady || !modelsReady)) {
              progress = 90;
              if (!modelsReady) {
                loadingText.textContent = "Loading Sacred Characters & World...";
              } else {
                loadingText.textContent = "Awakening Divine Voices...";
              }
              updateCrossProgress(90);
              return;
            }

            // Update cross clip segments
            updateCrossProgress(progress);
            
            // Set thematic loading phrases
            let activePhrase = loadingPhrases[0].text;
            for (let i = 0; i < loadingPhrases.length; i++) {
              if (progress >= loadingPhrases[i].threshold) {
                activePhrase = loadingPhrases[i].text;
              }
            }
            loadingText.textContent = activePhrase;
          }
        }, 120);
      }, 1900);

    }, 200);
  };

  beginBtn.addEventListener('click', handleBegin);
  beginBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleBegin();
  });
});

// Mobile virtual joystick helpers
function initTouchControls() {
  const joystickZone = document.getElementById('joystick-zone');
  const joystickBase = document.getElementById('joystick-base');
  const joystickKnob = document.getElementById('joystick-knob');
  
  if (!joystickZone || !joystickBase || !joystickKnob) return;
  
  let joystickActive = false;
  let joystickStartPos = { x: 0, y: 0 };

  const handleStart = (clientX, clientY) => {
    const rect = joystickBase.getBoundingClientRect();
    joystickStartPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    joystickActive = true;
  };

  const handleMove = (clientX, clientY) => {
    if (!joystickActive || !window.sceneEngine) return;
    const dx = clientX - joystickStartPos.x;
    const dy = clientY - joystickStartPos.y;
    const dist = Math.hypot(dx, dy);
    const maxRadius = 35;
    
    let moveX = dx;
    let moveY = dy;
    
    if (dist > maxRadius) {
      moveX = (dx / dist) * maxRadius;
      moveY = (dy / dist) * maxRadius;
    }
    
    joystickKnob.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    if (window.sceneEngine.joystickVector) {
      window.sceneEngine.joystickVector.x = moveX / maxRadius;
      window.sceneEngine.joystickVector.y = -moveY / maxRadius;
    }
  };

  const handleEnd = () => {
    joystickActive = false;
    joystickKnob.style.transform = 'translate(0px, 0px)';
    if (window.sceneEngine && window.sceneEngine.joystickVector) {
      window.sceneEngine.joystickVector.set(0, 0);
    }
  };

  // Touch Events
  joystickZone.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  joystickZone.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  joystickZone.addEventListener('touchend', (e) => {
    e.preventDefault();
    handleEnd();
  }, { passive: false });

  // Pointer Events for mobile browsers / hybrid devices
  joystickZone.addEventListener('pointerdown', (e) => {
    joystickZone.setPointerCapture(e.pointerId);
    handleStart(e.clientX, e.clientY);
  });

  joystickZone.addEventListener('pointermove', (e) => {
    handleMove(e.clientX, e.clientY);
  });

  joystickZone.addEventListener('pointerup', (e) => {
    try { joystickZone.releasePointerCapture(e.pointerId); } catch (_) {}
    handleEnd();
  });

  joystickZone.addEventListener('pointercancel', (e) => {
    handleEnd();
  });
}

// Particle dust background drifts
function initAmbientDust() {
  const canvas = document.getElementById('ambient-dust');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  window.addEventListener('resize', () => {
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
  });
  
  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.6 + 0.4,
    speedX: (Math.random() - 0.5) * 0.15,
    speedY: (Math.random() - 0.25) * 0.25 - 0.05,
    alpha: Math.random() * 0.45 + 0.1,
    fadeSpeed: Math.random() * 0.006 + 0.002,
    direction: Math.random() > 0.5 ? 1 : -1
  }));
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += p.fadeSpeed * p.direction;
      
      if (p.alpha > 0.6) {
        p.direction = -1;
      } else if (p.alpha < 0.1) {
        p.direction = 1;
      }
      
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235, 218, 172, ${p.alpha})`;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

function playProceduralLeatherCreak() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const sampleRate = audioContext.sampleRate;
  
  const bufferSize = sampleRate * 0.9;
  const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.04 * white) / 1.04;
    const pitchMod = Math.sin(i * 0.005);
    data[i] = lastOut * (0.85 + 0.15 * pitchMod);
  }
  
  const noiseNode = audioContext.createBufferSource();
  noiseNode.buffer = buffer;
  const filter = audioContext.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 5.0;
  const gainNode = audioContext.createGain();
  
  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  filter.frequency.setValueAtTime(65, now);
  filter.frequency.exponentialRampToValueAtTime(260, now + 0.35);
  filter.frequency.linearRampToValueAtTime(110, now + 0.85);
  
  gainNode.gain.setValueAtTime(0.0, now);
  gainNode.gain.linearRampToValueAtTime(0.08, now + 0.15);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
  
  noiseNode.start(now);
  noiseNode.stop(now + 0.9);
}

function playProceduralPageRustle() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const sampleRate = audioContext.sampleRate;
  
  const bufferSize = sampleRate * 1.3;
  const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noiseNode = audioContext.createBufferSource();
  noiseNode.buffer = buffer;
  const filter = audioContext.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 1.8;
  const gainNode = audioContext.createGain();
  
  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  filter.frequency.setValueAtTime(2800, now);
  filter.frequency.exponentialRampToValueAtTime(7000, now + 0.45);
  filter.frequency.exponentialRampToValueAtTime(3200, now + 1.25);
  
  gainNode.gain.setValueAtTime(0.0, now);
  gainNode.gain.linearRampToValueAtTime(0.024, now + 0.2);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
  
  noiseNode.start(now);
  noiseNode.stop(now + 1.3);
}

window.swapCharacterSkin = async function(charName, skinKey) {
  if (!window.sceneEngine) return;
  const lowerName = charName.toLowerCase();
  let targetModel = null;

  if (lowerName === 'adam' && window.sceneEngine.adamCharacter) {
    targetModel = window.sceneEngine.adamCharacter;
  } else if (lowerName === 'eve' && window.sceneEngine.eveCharacter) {
    targetModel = window.sceneEngine.eveCharacter;
  } else if (lowerName === 'cain' && window.sceneEngine.cainCharacter) {
    targetModel = window.sceneEngine.cainCharacter;
  } else if (lowerName === 'abel' && window.sceneEngine.abelCharacter) {
    targetModel = window.sceneEngine.abelCharacter;
  } else if (lowerName === 'noah' && window.sceneEngine.noahCharacter) {
    targetModel = window.sceneEngine.noahCharacter;
  } else if (lowerName === 'builder' && window.sceneEngine.builderCharacter) {
    targetModel = window.sceneEngine.builderCharacter;
  }

  if (targetModel) {
    await targetModel.swapSkin(skinKey);
    console.log(`[SkinSwap] Swapped '${charName}' to '${skinKey}'`);
  } else {
    console.warn(`[SkinSwap] Character '${charName}' not found in active scene.`);
  }
};

function initActionBarListeners() {
  const actionBtns = document.querySelectorAll('.action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const animName = btn.getAttribute('data-action');
      if (window.sceneEngine && window.sceneEngine.triggerPlayerAction) {
        window.sceneEngine.triggerPlayerAction(animName);
      } else if (window.sceneEngine) {
        const char = window.sceneEngine.adamCharacter || window.sceneEngine.cainCharacter || window.sceneEngine.noahCharacter || window.sceneEngine.builderCharacter;
        if (char && char.playAnimation) {
          char.playAnimation(animName, { loop: false, clampWhenFinished: true });
        }
      }
    });
  });
}

window.addEventListener('load', () => {
  initAmbientDust();
  initTouchControls();
  initActionBarListeners();
});
