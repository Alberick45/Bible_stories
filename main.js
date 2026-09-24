import { CreationScene } from './creation-scene.js';
import { EdenScene } from './eden-scene.js';
import { CainAbelScene } from './cain-abel-scene.js';
import { NoahScene } from './noah-scene.js';
import { BabelScene } from './babel-scene.js';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { ttsEngine } from './tts/TTSEngine.js';

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
let currentSpeed = 1;
let skipCallback = null;
let isCinematicActive = false;

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
const speedToggleBtn = document.getElementById('speed-toggle-btn');
const skipBtn = document.getElementById('skip-btn');

// Hub elements
const hubToggleBtn = document.getElementById('hub-toggle-btn');
const hubPanelEl = document.getElementById('hub-panel');
const closeHubBtn = document.getElementById('close-hub');
const eraButtons = document.querySelectorAll('.era-btn');

// TTS Engine will be dynamically initialized on click of 'Begin Journey'

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
const delay = ms => new Promise(resolve => setTimeout(resolve, ms / currentSpeed));

function showSkipButton(callback) {
  skipCallback = callback;
  isCinematicActive = true;
  if (skipBtn) {
    skipBtn.style.display = 'block';
  }
}

function hideSkipButton() {
  skipCallback = null;
  isCinematicActive = false;
  if (skipBtn) {
    skipBtn.style.display = 'none';
  }
}

const CHAPTER_SCRIPTS = {
  creation: [
    { text: 'In the beginning God created the heaven and the earth.', character: 'Narrator' },
    { text: 'And the earth was without form, and void; and darkness was upon the face of the deep.', character: 'Narrator' },
    { text: 'And God said, "Let there be light."', character: 'God' },
    { text: 'And God saw the light, that it was good: and God divided the light from the darkness.', character: 'Narrator' },
    { text: 'And God said, "Let there be a firmament in the midst of the waters, and let it divide the waters from the waters."', character: 'God' },
    { text: 'And God said, "Let the waters under the heaven be gathered together unto one place, and let the dry land appear:"', character: 'God' },
    { text: 'And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.', character: 'Narrator' },
    { text: 'And God said, "Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven."', character: 'God' },
    { text: 'And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.', character: 'Narrator' },
    { text: 'And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.', character: 'Narrator' },
    { text: 'And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it...', character: 'Narrator' },
    { text: 'And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.', character: 'Narrator' },
    { text: 'Thus the heavens and the earth were finished, and all the host of them.', character: 'Narrator' },
    { text: 'And on the seventh day God ended his work which he had made; and he rested on the seventh day...', character: 'Narrator' },
  ],
  eden: [
    { text: 'And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.', character: 'Narrator' },
    { text: 'And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food...', character: 'Narrator' },
    { text: 'The tree of life also in the midst of the garden, and the tree of knowledge of good and evil.', character: 'Narrator' },
    { text: 'And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.', character: 'Narrator' },
    { text: 'And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat...', character: 'Narrator' },
    { text: 'But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.', character: 'Narrator' },
    { text: 'And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him.', character: 'God' },
    { text: 'And out of the ground the LORD God formed every beast of the field, and every fowl of the air...', character: 'Narrator' },
    { text: 'And brought them unto Adam to see what he would call them...', character: 'Narrator' },
    { text: 'And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field...', character: 'Narrator' },
    { text: 'But for Adam there was not found an help meet for him.', character: 'Narrator' },
    { text: 'And the LORD God caused a deep sleep to fall upon Adam, and he slept...', character: 'Narrator' },
    { text: 'And he took one of his ribs, and closed up the flesh instead thereof...', character: 'Narrator' },
    { text: 'And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man.', character: 'Narrator' },
    { text: 'This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man.', character: 'Adam' },
    { text: 'Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.', character: 'Narrator' },
    { text: 'Walk up to the center Tree of Knowledge to witness the Fall.', character: 'Narrator' },
    { text: 'Now the serpent was more subtil than any beast of the field which the LORD God had made.', character: 'Narrator' },
    { text: 'Yea, hath God said, Ye shall not eat of every tree of the garden?', character: 'Serpent' },
    { text: 'We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.', character: 'Eve' },
    { text: 'Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.', character: 'Serpent' },
    { text: 'And when the woman saw that the tree was good for food, and that it was pleasant to the eyes...', character: 'Narrator' },
    { text: '...she took of the fruit thereof, and did eat...', character: 'Narrator' },
    { text: 'Eat of it, and thine eyes shall be opened.', character: 'Eve' },
    { text: '...and gave also unto her husband with her; and he did eat.', character: 'Narrator' },
    { text: 'And the eyes of them both were opened, and they knew that they were naked.', character: 'Narrator' },
    { text: 'And they heard the voice of the LORD God walking in the garden in the cool of the day.', character: 'Narrator' },
    { text: '...and Adam and his wife hid themselves from the presence of the LORD God amongst the trees of the garden.', character: 'Narrator' },
    { text: 'And the LORD God called unto Adam, and said unto him, "Where art thou?"', character: 'God' },
    { text: 'I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself.', character: 'Adam' },
    { text: 'And he said, "Who told thee that thou wast naked? Hast thou eaten of the tree, whereof I commanded thee that thou shouldest not eat?"', character: 'God' },
    { text: 'The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.', character: 'Adam' },
    { text: 'And the LORD God said unto the woman, "What is this that thou hast done?"', character: 'God' },
    { text: 'The serpent beguiled me, and I did eat.', character: 'Eve' },
    { text: 'And the LORD God said unto the serpent, "Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life..."', character: 'God' },
    { text: 'Unto the woman he said, "I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children..."', character: 'God' },
    { text: 'And unto Adam he said, "Because thou has hearkened unto the voice of thy wife, and has eaten of the tree... cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life..."', character: 'God' },
    { text: 'Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken.', character: 'Narrator' },
    { text: 'So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.', character: 'Narrator' },
  ],
  cainabel: [
    { text: 'And Adam knew Eve his wife; and she conceived, and bare Cain...', character: 'Narrator' },
    { text: 'I have gotten a man from the LORD.', character: 'Eve' },
    { text: 'And she again bare his brother Abel.', character: 'Narrator' },
    { text: 'And Abel was a keeper of sheep, but Cain was a tiller of the ground.', character: 'Narrator' },
    { text: 'And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the LORD.', character: 'Narrator' },
    { text: 'And Abel, he also brought of the firstlings of his flock and of the fat thereof.', character: 'Narrator' },
    { text: 'Walk to the central Altar of Stones to present your offering.', character: 'Narrator' },
    { text: 'And the LORD had respect unto Abel and to his offering...', character: 'Narrator' },
    { text: 'But unto Cain and to his offering he had not respect.', character: 'Narrator' },
    { text: 'And Cain was very wroth, and his countenance fell.', character: 'Narrator' },
    { text: 'And the LORD said unto Cain, "Why art thou wroth? and why is thy countenance fallen?"', character: 'God' },
    { text: '"If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door..."', character: 'God' },
    { text: 'And Cain talked with Abel his brother:', character: 'Narrator' },
    { text: 'And it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.', character: 'Narrator' },
    { text: 'And the LORD said unto Cain, "Where is Abel thy brother?"', character: 'God' },
    { text: "I know not: Am I my brother's keeper?", character: 'Cain' },
    { text: 'And he said, "What hast thou done? the voice of thy brother\'s blood crieth unto me from the ground."', character: 'God' },
    { text: '"And now art thou cursed from the earth, which hath opened her mouth to receive thy brother\'s blood from thy hand;"', character: 'God' },
    { text: '"When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be in the earth."', character: 'God' },
    { text: 'My punishment is greater than I can bear. Behold, thou hast driven me out this day from the face of the earth;', character: 'Cain' },
    { text: 'And the LORD said unto him, "Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold."', character: 'God' },
    { text: 'And the LORD set a mark upon Cain, lest any finding him should kill him.', character: 'Narrator' },
    { text: 'And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.', character: 'Narrator' },
    { text: 'And Adam knew his wife again; and she bare a son, and called his name Seth...', character: 'Narrator' },
    { text: 'For God hath appointed me another seed instead of Abel, whom Cain slew.', character: 'Eve' },
    { text: 'And it came to pass, when men began to multiply on the face of the earth...', character: 'Narrator' },
    { text: 'And GOD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually.', character: 'Narrator' },
    { text: 'The earth also was corrupt before God, and the earth was filled with violence.', character: 'Narrator' },
    { text: 'And it repented the LORD that he had made man on the earth, and it grieved him at his heart.', character: 'Narrator' },
    { text: 'But Noah found grace in the eyes of the LORD.', character: 'Narrator' },
  ],
  noah: [
    { text: 'And God said unto Noah, "The end of all flesh is come before me; for the earth is filled with violence through them..."', character: 'God' },
    { text: '"Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch."', character: 'God' },
    { text: 'And Noah did according unto all that the LORD commanded him.', character: 'Narrator' },
    { text: 'Thus did Noah; according to all that God commanded him, so did he.', character: 'Narrator' },
    { text: 'And the LORD said unto Noah, "Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation."', character: 'God' },
    { text: 'Guide Noah closer to the marching animal pairs to bring them inside.', character: 'Narrator' },
    { text: "And Noah went in, and his sons, and his wife, and his sons' wives with him, into the ark, because of the waters of the flood.", character: 'Narrator' },
    { text: '...and the LORD shut him in.', character: 'Narrator' },
    { text: '...the same day were all the fountains of the great deep broken up, and the windows of heaven were opened.', character: 'Narrator' },
    { text: 'And the rain was upon the earth forty days and forty nights.', character: 'Narrator' },
    { text: 'And the flood was forty days upon the earth; and the waters increased, and bare up the ark...', character: 'Narrator' },
    { text: 'And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters.', character: 'Narrator' },
    { text: 'And God remembered Noah, and every living thing, and all the cattle that was with him in the ark...', character: 'Narrator' },
    { text: 'And the rain from heaven was restrained; And the waters returned from off the earth continually.', character: 'Narrator' },
    { text: 'And the ark rested in the seventh month, on the seventeenth day of the month, upon the mountains of Ararat.', character: 'Narrator' },
    { text: 'Also he sent forth a dove from him, to see if the waters were abated from off the face of the ground;', character: 'Narrator' },
    { text: 'And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off.', character: 'Narrator' },
    { text: "And Noah went forth, and his sons, and his wife, and his sons' wives with him...", character: 'Narrator' },
    { text: 'And Noah builded an altar unto the LORD; and took of every clean beast, and of every clean fowl, and offered burnt offerings on the altar.', character: 'Narrator' },
    { text: 'And God said, "I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth."', character: 'God' },
    { text: '"And the waters shall no more become a flood to destroy all flesh."', character: 'God' },
  ],
  babel: [
    { text: 'And the whole earth was of one language, and of one speech.', character: 'Narrator' },
    { text: 'And they said, "Go to, let us build us a city and a tower, whose top may reach unto heaven..."', character: 'Nimrod' },
    { text: 'And they had brick for stone, and slime had they for morter.', character: 'Narrator' },
    { text: 'And they said, "...and let us make us a name, lest we be scattered abroad upon the face of the whole earth."', character: 'Narrator' },
    { text: 'And the LORD came down to see the city and the tower, which the children of men builded.', character: 'Narrator' },
    { text: '"Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another\'s speech."', character: 'God' },
    { text: 'Δόξα τῷ Θεῷ! (Wait, what did you say?)', character: 'Worker' },
    { text: 'Quid agis? (I cannot understand you!)', character: 'Worker' },
    { text: 'Baga bo pi do! (What is this gibberish?!)', character: 'Worker' },
    { text: 'And there the LORD did confound the language of all the earth...', character: 'Narrator' },
    { text: 'So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.', character: 'Narrator' },
    { text: 'The construction has ceased. Explore the silent ruins of Babel.', character: 'Narrator' },
  ],
};

function preloadNextLine(currentCleanText) {
  const script = CHAPTER_SCRIPTS[activeSceneName];
  if (!script) return;
  
  const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');
  const targetNorm = norm(currentCleanText);
  const idx = script.findIndex(line => norm(line.text) === targetNorm);
  
  if (idx !== -1 && idx < script.length - 1) {
    const nextLine = script[idx + 1];
    const characterKey = nextLine.character.toLowerCase();
    ttsEngine.preload(nextLine.text.replace(/["“”]/g, ''), characterKey);
  }
}

function speakText(text, characterName) {
  const cleanText = text.replace(/["“”]/g, '');
  
  let characterKey = 'narrator';
  if (characterName) {
    const lowerName = characterName.toLowerCase();
    if (lowerName === 'god') characterKey = 'god';
    else if (lowerName === 'eve') characterKey = 'eve';
    else if (lowerName === 'serpent') characterKey = 'serpent';
    else if (lowerName === 'cain') characterKey = 'cain';
    else if (lowerName === 'abel') characterKey = 'abel';
    else if (lowerName === 'noah') characterKey = 'noah';
    else if (lowerName === 'nimrod') characterKey = 'nimrod';
    else if (lowerName === 'builder') characterKey = 'builder';
    else if (lowerName === 'worker') characterKey = 'worker';
  }
  
  preloadNextLine(cleanText);
  
  return ttsEngine.speak(cleanText, characterKey);
}

function showTextLine(text, holdBeforeHintMs = 2800, ttsCharacter = 'Narrator') {
  return new Promise(resolve => {
    narrationEl.textContent = text;
    narrationEl.classList.remove('show');
    hintEl.classList.remove('show');
    
    void narrationEl.offsetWidth;
    narrationEl.classList.add('show');
    
    Promise.resolve(speakText(text, ttsCharacter)).then(() => {
      setTimeout(() => {
        hintEl.classList.add('show');
        isWaitingClick = true;
        advanceCallback = () => {
          isWaitingClick = false;
          hintEl.classList.remove('show');
          narrationEl.classList.remove('show');
          ttsEngine.stop();
          setTimeout(resolve, 850 / currentSpeed);
        };
      }, holdBeforeHintMs / currentSpeed);
    });
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
    
    speechBubbleEl.innerHTML = `<strong>${characterName}</strong><br/>${text}`;
    speechBubbleEl.style.display = 'block';
    
    if (characterName === 'Serpent') {
      bubbleTargetObject = sceneEngine.serpentHead;
    } else if (characterName === 'Eve') {
      bubbleTargetObject = sceneEngine.eve;
    } else if (characterName === 'Adam') {
      bubbleTargetObject = sceneEngine.adam;
    } else if (characterName === 'Noah') {
      bubbleTargetObject = sceneEngine.noah;
    } else if (characterName === 'Nimrod' || characterName === 'Builder') {
      bubbleTargetObject = sceneEngine.builder;
    } else if (characterName === 'Worker') {
      bubbleTargetObject = sceneEngine.workers ? sceneEngine.workers[0] : null;
    } else {
      bubbleTargetObject = null;
    }
    
    Promise.resolve(speakText(text, characterName)).then(() => {
      hintEl.classList.add('show');
      isWaitingClick = true;
      advanceCallback = () => {
        isWaitingClick = false;
        hintEl.classList.remove('show');
        speechBubbleEl.style.display = 'none';
        bubbleTargetObject = null;
        ttsEngine.stop();
        setTimeout(resolve, 600 / currentSpeed);
      };
    });
  });
}

function clearNarration() {
  narrationEl.classList.remove('show');
  hintEl.classList.remove('show');
}

function showInstruction(text, ttsCharacter = 'Narrator') {
  narrationEl.textContent = text;
  narrationEl.classList.remove('show');
  hintEl.classList.remove('show');
  
  void narrationEl.offsetWidth;
  narrationEl.classList.add('show');
  
  speakText(text, ttsCharacter);
}

function clearInstruction() {
  narrationEl.classList.remove('show');
  hintEl.classList.remove('show');
  ttsEngine.stop();
  isWaitingClick = false;
  advanceCallback = null;
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
  hideSkipButton();
  
  ttsEngine.stop();
  
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

  showSkipButton(() => {
    skipCreationSequence();
  }, 'Skip Intro');

  scriptureLabelEl.classList.remove('show');
  loadScriptureScroll(
    `Genesis 1:1 &ndash; 2:7 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    `
      <p><span class="verse-num">1</span>In the beginning God created the heaven and the earth.</p>
      <p><span class="verse-num">2</span>And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.</p>
      <p><span class="verse-num">3</span>And God said, Let there be light: and there was light.</p>
      <p><span class="verse-num">4</span>And God saw the light, that it was good: and God divided the light from the darkness.</p>
      <p><span class="verse-num">6&ndash;8</span>And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters. And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so. And God called the firmament Heaven. And the evening and the morning were the second day.</p>
      <p><span class="verse-num">9&ndash;13</span>And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so. And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good. And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so. And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good. And the evening and the morning were the third day.</p>
      <p><span class="verse-num">14&ndash;19</span>And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years: And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so. And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also. And God set them in the firmament of the heaven to give light upon the earth, And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good. And the evening and the morning were the fourth day.</p>
      <p><span class="verse-num">20&ndash;23</span>And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven. And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good. And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth. And the evening and the morning were the fifth day.</p>
      <p><span class="verse-num">24&ndash;25</span>And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so. And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.</p>
      <p><span class="verse-num">26&ndash;27</span>And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth. So God created man in his own image, in the image of God created he him; male and female created he them.</p>
      <p><span class="verse-num">28&ndash;31</span>And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth. And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat. And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so. And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.</p>
      <p><span class="verse-num">2:1&ndash;7</span>Thus the heavens and the earth were finished, and all the host of them. And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made. And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made. These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens, And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground. But there went up a mist from the earth, and watered the whole face of the ground. And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.</p>
    `
  );
  
  if (!await stepDelay(1500)) return;
  
  if (!await stepText('In the beginning God created the heaven and the earth.', 3400, 'Narrator')) return;
  if (!await stepText('And the earth was without form, and void; and darkness was upon the face of the deep.', 3800, 'Narrator')) return;
  
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
  if (!await stepText('And God said, "Let there be a firmament in the midst of the waters, and let it divide the waters from the waters."', 3400, 'God')) return;
  await sceneEngine.transitionDayTwo();
  if (!await stepDelay(1500)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Three');
  if (!await stepText('And God said, "Let the waters under the heaven be gathered together unto one place, and let the dry land appear:"', 3600, 'God')) return;
  await sceneEngine.transitionDayThree();
  adjustWindIntensity(0.02, 180, 5.0);
  if (!await stepDelay(3200)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Four');
  if (!await stepText('And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.', 4200, 'Narrator')) return;
  await sceneEngine.transitionDayFour();
  if (!await stepDelay(2000)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Five');
  if (!await stepText('And God said, "Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven."', 4200, 'God')) return;
  await sceneEngine.transitionDayFive();
  enableBirdSounds = true;
  if (!await stepDelay(2200)) return;
  
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('Day Six');
  if (!await stepText('And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.', 4500, 'Narrator')) return;
  await sceneEngine.transitionDaySix();
  enableAnimalSounds = true;
  if (!await stepDelay(2000)) return;
  
  if (!await stepText('And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.', 4500, 'Narrator')) return;
  
  if (seqId !== currentSequenceId) return;
  await sceneEngine.formAdam();
  if (!await stepDelay(6500)) return;
  
  if (!await stepText('And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it...', 4500, 'Narrator')) return;
  if (!await stepText('And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.', 4500, 'Narrator')) return;
  
  if (!await stepText('Thus the heavens and the earth were finished, and all the host of them.', 4000, 'Narrator')) return;
  if (!await stepText('And on the seventh day God ended his work which he had made; and he rested on the seventh day...', 4000, 'Narrator')) return;
  
  clearNarration();
  if (!await stepDelay(1800)) return;
  
  if (seqId !== currentSequenceId) return;
  hideSkipButton();
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
    `Genesis 2:1 &ndash; 3:24 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    `
      <p><span class="verse-num">2:1&ndash;7</span>Thus the heavens and the earth were finished, and all the host of them. And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made. And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made. These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens, And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground. But there went up a mist from the earth, and watered the whole face of the ground. And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.</p>
      <p><span class="verse-num">8&ndash;14</span>And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed. And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil. And a river went out of Eden to water the garden; and from thence it was parted, and became into four heads. The name of the first is Pison: that is it which compasseth the whole land of Havilah, where there is gold; And the gold of that land is good: there is bdellium and the onyx stone. And the name of the second river is Gihon: the same is it that compasseth the whole land of Ethiopia. And the name of the third river is Hiddekel: that is it which goeth toward the east of Assyria. And the fourth river is Euphrates.</p>
      <p><span class="verse-num">15&ndash;17</span>And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it. And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat: But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.</p>
      <p><span class="verse-num">18&ndash;20</span>And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him. And out of the ground the LORD God formed every beast of the field, and every fowl of the air; and brought them unto Adam to see what he would call them: and whatsoever Adam called every living creature, that was the name thereof. And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field; but for Adam there was not found an help meet for him.</p>
      <p><span class="verse-num">21&ndash;25</span>And the LORD God caused a deep sleep to fall upon Adam, and he slept: and he took one of his ribs, and closed up the flesh instead thereof; And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man. And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man. Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh. And they were both naked, the man and his wife, and were not ashamed.</p>
      <p><span class="verse-num">3:1</span>Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?</p>
      <p><span class="verse-num">2&ndash;3</span>And the woman said unto the serpent, We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.</p>
      <p><span class="verse-num">4&ndash;5</span>And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.</p>
      <p><span class="verse-num">6</span>And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.</p>
      <p><span class="verse-num">7</span>And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons.</p>
      <p><span class="verse-num">8&ndash;19</span>And they heard the voice of the LORD God walking in the garden in the cool of the day: and Adam and his wife hid themselves from the presence of the LORD God amongst the trees of the garden. And the LORD God called unto Adam, and said unto him, Where art thou? And he said, I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself. And he said, Who told thee that thou wast naked? Hast thou eaten of the tree, whereof I commanded thee that thou shouldest not eat? And the man said, The woman whom thou gavest to be with me, she gave me of the tree, and I did eat. And the LORD God said unto the woman, What is this that thou hast done? And the woman said, The serpent beguiled me, and I did eat. And the LORD God said unto the serpent, Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life: And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel. Unto the woman he said, I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children; and thy desire shall be to thy husband, and he shall rule over thee. And unto Adam he said, Because thou hast hearkened unto the voice of thy wife, and hast eaten of the tree, of which I commanded thee, saying, Thou shalt not eat of it: cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life; Thorns also and thistles shall it bring forth to thee; and thou shalt eat the herb of the field; In the sweat of thy face shalt thou eat bread, till thou return unto the ground; for out of it wast thou taken: for dust thou art, and unto dust shalt thou return.</p>
      <p><span class="verse-num">23&ndash;24</span>Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken. So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.</p>
    `
  );
  
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  
  if (!await stepText('And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.', 4000, 'Narrator')) return;
  if (!await stepText('And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food...', 3600, 'Narrator')) return;
  if (!await stepText('The tree of life also in the midst of the garden, and the tree of knowledge of good and evil.', 3600, 'Narrator')) return;
  
  if (!await stepText('And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.', 4000, 'Narrator')) return;
  if (!await stepText('And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat...', 4500, 'Narrator')) return;
  if (!await stepText('But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.', 5500, 'Narrator')) return;
  
  if (!await stepText('And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him.', 4500, 'God')) return;
  
  if (seqId !== currentSequenceId) return;
  const namingPromise = sceneEngine.animateNamingAnimals();
  if (!await stepText('And out of the ground the LORD God formed every beast of the field, and every fowl of the air...', 4500, 'Narrator')) return;
  if (!await stepText('And brought them unto Adam to see what he would call them...', 4000, 'Narrator')) return;
  await namingPromise;
  
  if (!await stepText('And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field...', 4500, 'Narrator')) return;
  if (!await stepText('But for Adam there was not found an help meet for him.', 4000, 'Narrator')) return;

  if (seqId !== currentSequenceId) return;
  const sleepPromise = sceneEngine.animateDeepSleep();
  if (!await stepText('And the LORD God caused a deep sleep to fall upon Adam, and he slept...', 4500, 'Narrator')) return;
  await sleepPromise;
  
  if (seqId !== currentSequenceId) return;
  const eveCreationPromise = sceneEngine.animateCreationOfEve();
  if (!await stepText('And he took one of his ribs, and closed up the flesh instead thereof...', 4500, 'Narrator')) return;
  if (!await stepText('And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man.', 4500, 'Narrator')) return;
  await eveCreationPromise;

  if (!await stepSpeech('Adam', 'This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man.', 5500)) return;
  if (!await stepText('Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.', 5000, 'Narrator')) return;
  
  clearNarration();
  if (seqId !== currentSequenceId) return;
  await displayDayLabel('The Garden');
  
  if (seqId !== currentSequenceId) return;
  sceneEngine.unlockControls();
  movementHintEl.classList.add('show');
  enableBirdSounds = true;
  enableAnimalSounds = true;
  
  if (seqId !== currentSequenceId) return;
  showInstruction('Walk up to the center Tree of Knowledge to witness the Fall.', 'Narrator');
  
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
  
  clearInstruction();
  
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
  
  if (!await stepText('And when the woman saw that the tree was good for food, and that it was pleasant to the eyes...', 3800, 'Narrator')) return;
  
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
  
  if (!await stepText('...she took of the fruit thereof, and did eat...', 3200, 'Narrator')) return;
  
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
  
  gsap.to(sceneEngine.adam.position, {
    x: 9.0,
    z: -8.0,
    duration: 2.5,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.adam.position.y = sceneEngine.getTerrainHeight(sceneEngine.adam.position.x, sceneEngine.adam.position.z);
      }
    }
  });
  gsap.to(sceneEngine.eve.position, {
    x: 10.5,
    z: -7.5,
    duration: 2.5,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.eve.position.y = sceneEngine.getTerrainHeight(sceneEngine.eve.position.x, sceneEngine.eve.position.z);
      }
    }
  });
  
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
  
  if (!await stepText('...and Adam and his wife hid themselves from the presence of the LORD God amongst the trees of the garden.', 3800, 'Narrator')) return;
  
  // --- QUESTIONING DIALOGUE SEGMENT ---
  if (!await stepText('And the LORD God called unto Adam, and said unto him, "Where art thou?"', 4200, 'God')) return;
  
  if (!await stepSpeech('Adam', 'I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself.', 5200)) return;
  
  if (!await stepText('And he said, "Who told thee that thou wast naked? Hast thou eaten of the tree, whereof I commanded thee that thou shouldest not eat?"', 5500, 'God')) return;
  
  if (!await stepSpeech('Adam', 'The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.', 4800)) return;
  
  if (!await stepText('And the LORD God said unto the woman, "What is this that thou hast done?"', 4200, 'God')) return;
  
  if (!await stepSpeech('Eve', 'The serpent beguiled me, and I did eat.', 4400)) return;
  
  // --- PUNISHMENT ORDER: SERPENT FIRST, THEN EVE, THEN ADAM ---
  if (!await stepText('And the LORD God said unto the serpent, "Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life..."', 6800, 'God')) return;
  
  if (!await stepText('Unto the woman he said, "I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children..."', 5200, 'God')) return;
  
  if (!await stepText('And unto Adam he said, "Because thou hast hearkened unto the voice of thy wife, and hast eaten of the tree... cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life..."', 5800, 'God')) return;
  
  if (!await stepText('Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken.', 3800, 'Narrator')) return;
  
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
  
  gsap.to(sceneEngine.eve.position, {
    x: 26.0,
    z: 0.5,
    duration: 6.0,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.eve.position.y = sceneEngine.getTerrainHeight(sceneEngine.eve.position.x, sceneEngine.eve.position.z);
      }
    }
  });
  gsap.to(sceneEngine.adam.position, {
    x: 25.0,
    z: -0.5,
    duration: 6.0,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.adam.position.y = sceneEngine.getTerrainHeight(sceneEngine.adam.position.x, sceneEngine.adam.position.z);
      }
    }
  });
  
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
      <p><span class="verse-num">6&ndash;7</span>And the LORD said unto Cain, Why art thou wroth? and why is thy countenance fallen? If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door. And unto thee shall be his desire, and thou shalt rule over him.</p>
      <p><span class="verse-num">8</span>And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.</p>
      <p><span class="verse-num">9</span>And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper?</p>
      <p><span class="verse-num">10&ndash;12</span>And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground. And now art thou cursed from the earth, which hath opened her mouth to receive thy brother's blood from thy hand; When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be in the earth.</p>
      <p><span class="verse-num">13&ndash;14</span>And Cain said unto the LORD, My punishment is greater than I can bear. Behold, thou hast driven me out this day from the face of the earth; and from thy face shall I be hid; and I shall be a fugitive and a vagabond in the earth; and it shall come to pass, that every one that findeth me shall slay me.</p>
      <p><span class="verse-num">15&ndash;16</span>And the LORD said unto him, Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold. And the LORD set a mark upon Cain, lest any finding him should kill him. And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.</p>
      <p><span class="verse-num">25</span>And Adam knew his wife again; and she bare a son, and called his name Seth: For God, said she, hath appointed me another seed instead of Abel, whom Cain slew.</p>
      <p><span class="verse-num">6:5&ndash;8</span>And GOD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually. And it repented the LORD that he had made man on the earth, and it grieved him at his heart. And the LORD said, I will destroy man whom I have created from the face of the earth; both man, and beast, and the creeping thing, and the fowls of the air; for it repenteth me that I have made them. But Noah found grace in the eyes of the LORD.</p>
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
  if (!await stepText('And Abel was a keeper of sheep, but Cain was a tiller of the ground.', 4200, 'Narrator')) return;

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
  
  if (seqId !== currentSequenceId) return;
  showInstruction('Walk to the central Altar of Stones to present your offering.', 'Narrator');

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

  clearInstruction();

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
  if (!await stepText('And Cain talked with Abel his brother:', 3200, 'Narrator')) return;

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

  gsap.to(sceneEngine.cain.position, {
    x: -0.6,
    z: -12.0,
    duration: 3.5,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.cain.position.y = sceneEngine.getTerrainHeight(sceneEngine.cain.position.x, sceneEngine.cain.position.z);
      }
    }
  });
  gsap.to(sceneEngine.abel.position, {
    x: 0.6,
    z: -12.0,
    duration: 3.5,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.abel.position.y = sceneEngine.getTerrainHeight(sceneEngine.abel.position.x, sceneEngine.abel.position.z);
      }
    }
  });

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
  if (!await stepText('And he said, "What hast thou done? the voice of thy brother\'s blood crieth unto me from the ground."', 5200, 'God')) return;
  if (!await stepText('"And now art thou cursed from the earth, which hath opened her mouth to receive thy brother\'s blood from thy hand;"', 5200, 'God')) return;
  if (!await stepText('"When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be in the earth."', 5600, 'God')) return;

  // Gen 4:13-14 - Cain's grief
  if (seqId !== currentSequenceId) return;
  gsap.to(sceneEngine.cain.position, { y: sceneEngine.getTerrainHeight(-0.6, -12.0) - 0.45, duration: 1.0 }); // Cain falls to knees
  if (!await stepSpeech('Cain', 'My punishment is greater than I can bear. Behold, thou hast driven me out this day from the face of the earth;', 5200)) return;

  // Gen 4:15-16 - Setting the Mark
  if (!await stepText('And the LORD said unto him, "Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold."', 4500, 'God')) return;

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

  gsap.to(sceneEngine.cain.position, {
    x: 20,
    z: -30,
    duration: 6.0,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.cain.position.y = sceneEngine.getTerrainHeight(sceneEngine.cain.position.x, sceneEngine.cain.position.z);
      }
    }
  });
  
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

  if (!await stepText('And it came to pass, when men began to multiply on the face of the earth...', 3600, 'Narrator')) return;

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

  if (!await stepText('And GOD saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually.', 5200, 'Narrator')) return;
  
  if (!await stepText('The earth also was corrupt before God, and the earth was filled with violence.', 4200, 'Narrator')) return;

  // God's voice expressing grief
  if (!await stepText('And it repented the LORD that he had made man on the earth, and it grieved him at his heart.', 5200, 'Narrator')) return;

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
      <p><span class="verse-num">6:13&ndash;14</span>And God said unto Noah, The end of all flesh is come before me; for the earth is filled with violence through them; and, behold, I will destroy them with the earth. Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch.</p>
      <p><span class="verse-num">7:1</span>And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation.</p>
      <p><span class="verse-num">7:2&ndash;3</span>Of every clean beast thou shalt take to thee by sevens, the male and his female: and of beasts that are not clean by two, the male and his female. Of fowls also of the air by sevens, the male and the female; to keep seed alive upon the face of all the earth.</p>
      <p><span class="verse-num">7:7</span>And Noah went in, and his sons, and his wife, and his sons' wives with him, into the ark, because of the waters of the flood.</p>
      <p><span class="verse-num">7:11&ndash;12</span>In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights.</p>
      <p><span class="verse-num">7:17&ndash;18</span>And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters.</p>
      <p><span class="verse-num">8:1&ndash;3</span>And God remembered Noah, and every living thing, and all the cattle that was with him in the ark: and God made a wind to pass over the earth, and the waters asswaged; The fountains also of the deep and the windows of heaven were stopped, and the rain from heaven was restrained; And the waters returned from off the earth continually: and after the end of the hundred and fifty days the waters were abated.</p>
      <p><span class="verse-num">9:13</span>I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.</p>
    `
  );

  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';

  // Gen 6:13-14 - God's Command starting at family home
  const camPos = sceneEngine.camera.position;
  camPos.set(16, 2.8, 4.0);
  sceneEngine.camera.lookAt(18.0, 1.2, 11.0);

  if (!await stepText('And God said unto Noah, "The end of all flesh is come before me; for the earth is filled with violence through them..."', 5200, 'God')) return;
  if (!await stepText('"Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch."', 5600, 'God')) return;

  if (!await stepText('And Noah did according unto all that the LORD commanded him.', 4000, 'Narrator')) return;

  // Visual Timelapse Building Phase
  if (seqId !== currentSequenceId) return;
  // Noah runs to the building site
  gsap.to(sceneEngine.noah.position, {
    x: 7.2,
    z: 6.0,
    duration: 1.5,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.noah.position.y = sceneEngine.getTerrainHeight(sceneEngine.noah.position.x, sceneEngine.noah.position.z);
      }
    }
  });
  gsap.to(sceneEngine.noah.rotation, { y: -Math.PI / 2, duration: 1.5 });
  
  // Camera pans to show construction
  gsap.to(camPos, {
    x: -8.0,
    y: 3.5,
    z: 14.0,
    duration: 2.0,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(0.0, 2.5, 0.0);
      }
    }
  });
  if (!await stepDelay(1800)) return;

  if (!await stepText('Thus did Noah; according to all that God commanded him, so did he.', 4500, 'Narrator')) return;

  // Hammer swing loop animation
  const swingTimeline = gsap.timeline({ repeat: 8 });
  swingTimeline.to(sceneEngine.noahArmR.rotation, { x: -Math.PI / 2.2, duration: 0.22, ease: 'power1.in' })
               .to(sceneEngine.noahArmR.rotation, { x: 0, duration: 0.18, ease: 'power1.out' });
  
  if (!await stepDelay(3000)) {
    swingTimeline.kill();
    return;
  }
  swingTimeline.kill();

  // Complete the Ark structure (timelapse complete)
  if (seqId !== currentSequenceId) return;
  sceneEngine.completeArk();

  // God calls Noah to enter
  if (!await stepText('And the LORD said unto Noah, "Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation."', 5600, 'God')) return;

  // Move Noah back to start position to guide animals
  gsap.to(sceneEngine.noah.position, {
    x: 13.5,
    z: 4.0,
    duration: 1.5,
    onUpdate: () => {
      if (sceneEngine) {
        sceneEngine.noah.position.y = sceneEngine.getTerrainHeight(sceneEngine.noah.position.x, sceneEngine.noah.position.z);
      }
    }
  });
  gsap.to(sceneEngine.noah.rotation, { y: Math.PI, duration: 1.5 });
  if (!await stepDelay(1600)) return;

  // Gen 7:1-7 - Interactive Gathering
  if (seqId !== currentSequenceId) return;
  sceneEngine.unlockControls();
  movementHintEl.classList.add('show');

  if (seqId !== currentSequenceId) return;
  showInstruction('Guide Noah closer to the marching animal pairs to bring them inside.', 'Narrator');

  // Wait for Noah to approach the animal queue at (10.0, z)
  let proximityCheck = true;
  while (proximityCheck) {
    if (!await stepDelay(150)) return;
    if (seqId !== currentSequenceId) return;
    if (sceneEngine && sceneEngine.noah) {
      const nPos = sceneEngine.noah.position;
      const dist = Math.sqrt((nPos.x - 10.0) * (nPos.x - 10.0) + nPos.z * nPos.z);
      if (dist < 4.8) {
        proximityCheck = false;
      }
    } else {
      proximityCheck = false;
    }
  }

  clearInstruction();

  // Lock controls for cinematic boarding
  if (seqId !== currentSequenceId) return;
  sceneEngine.movementEnabled = false;
  movementHintEl.classList.remove('show');

  if (!await stepText('And Noah went in, and his sons, and his wife, and his sons\' wives with him, into the ark, because of the waters of the flood.', 4800, 'Narrator')) return;

  // Position camera for boarding wide shot
  gsap.to(camPos, {
    x: 14.5,
    y: 5.0,
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
      duration: 1.6,
      delay: i * 0.09, // Keep queue tight and quick
      ease: 'power1.inOut',
      onUpdate: () => {
        if (sceneEngine) {
          animal.position.y = sceneEngine.getTerrainHeight(animal.position.x, animal.position.z);
        }
      },
      onComplete: () => {
        animal.visible = false;
      }
    });
  }
  // Wait for animal queue to enter
  if (!await stepDelay(4500)) return;

  // Noah, Wife, Sons & their Wives (all 8 family members) walk inside in order
  if (seqId !== currentSequenceId) return;
  sceneEngine.familyGroup.children.forEach((member, index) => {
    gsap.to(member.position, {
      x: 7.2,
      z: 0.0,
      duration: 1.8,
      delay: index * 0.28,
      onUpdate: () => {
        if (sceneEngine) {
          member.position.y = sceneEngine.getTerrainHeight(member.position.x, member.position.z);
        }
      },
      onComplete: () => {
        member.visible = false;
      }
    });
  });
  if (!await stepDelay(4200)) return;

  // Close the Ark Door (closing to 0.0) only after EVERYONE is inside
  gsap.to(sceneEngine.doorGroup.rotation, { y: 0.0, duration: 1.8 });
  if (!await stepDelay(1200)) return;

  // Golden Divine Glow effect when closing
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 0.3s ease';
  veilEl.style.background = 'rgba(255, 220, 150, 0.65)'; // Golden flash
  if (!await stepDelay(300)) return;
  veilEl.style.background = 'rgba(0,0,0,0)';
  
  if (!await stepText('...and the LORD shut him in.', 4500, 'Narrator')) return;

  sceneEngine.ramp.visible = false;
  if (!await stepDelay(600)) return;

  // Gen 7:11-12 - The Rain Begins
  sceneEngine.rainActive = true;
  adjustWindIntensity(0.12, 100, 10.0); // Procedural storm wind
  gsap.to(sceneEngine.sunLight, { intensity: 0.1, duration: 3.0 });
  gsap.to(sceneEngine.hemiLight, { intensity: 0.15, duration: 3.0 });

  if (!await stepText('...the same day were all the fountains of the great deep broken up, and the windows of heaven were opened.', 4500, 'Narrator')) return;
  if (!await stepText('And the rain was upon the earth forty days and forty nights.', 4200, 'Narrator')) return;

  // Gen 7:17-18 - The Flood & Floating with Day/Time Ticker
  sceneEngine.waterRising = true;
  
  const dayCounterEl = document.getElementById('day-counter');
  dayCounterEl.classList.add('show');

  // Pull camera out to wide flooded view
  gsap.to(camPos, {
    x: -42.0,
    y: 32.0,
    z: 52.0,
    duration: 10.0,
    onUpdate: () => {
      if (sceneEngine && sceneEngine.camera) {
        sceneEngine.camera.lookAt(sceneEngine.arkGroup.position);
      }
    }
  });

  const dayObj = { val: 1 };
  gsap.to(dayObj, {
    val: 150,
    duration: 9.0,
    ease: 'none',
    onUpdate: () => {
      const currentVal = Math.floor(dayObj.val);
      if (currentVal < 40) {
        dayCounterEl.textContent = `Day ${currentVal} (Rain)`;
      } else if (currentVal < 80) {
        dayCounterEl.textContent = `Week ${Math.floor(currentVal / 7)}`;
      } else {
        dayCounterEl.textContent = `Month ${Math.floor(currentVal / 30)}`;
      }
    }
  });

  if (!await stepText('And the flood was forty days upon the earth; and the waters increased, and bare up the ark...', 4500, 'Narrator')) return;
  if (!await stepText('And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters.', 4500, 'Narrator')) return;

  // Wait for water to reach peak height
  let waterCheck = true;
  while (waterCheck) {
    if (!await stepDelay(150)) return;
    if (seqId !== currentSequenceId) return;
    if (sceneEngine && sceneEngine.waterHeight >= 15.5) {
      waterCheck = false;
    }
  }

  // Fade out to Ararat Epilogue
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 3.0s ease';
  veilEl.style.background = '#000000';
  if (!await stepDelay(3200)) return;

  // Disable rain/rising water and hide day counter
  sceneEngine.rainActive = false;
  sceneEngine.waterRising = false;
  dayCounterEl.classList.remove('show');

  // Reposition Ark at Ararat peak and submerge terrain
  const peakHeight = sceneEngine.getTerrainHeight(-45, -35);
  sceneEngine.arkGroup.position.set(-45, peakHeight - 0.1, -35);
  sceneEngine.arkGroup.rotation.set(0, Math.PI / 4, 0);
  sceneEngine.waterPlane.position.y = peakHeight - 1.5; // Only Ararat peak stays above water
  
  // Position camera to view Mount Ararat peak landing
  camPos.set(-36, peakHeight + 3.2, -22);
  sceneEngine.camera.lookAt(-45, peakHeight + 1.5, -35);

  // Fade back in
  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 2.0s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';
  if (!await stepDelay(2200)) return;

  if (!await stepText('And God remembered Noah, and every living thing, and all the cattle that was with him in the ark...', 4500, 'Narrator')) return;
  if (!await stepText('And the rain from heaven was restrained; And the waters returned from off the earth continually.', 4500, 'Narrator')) return;
  if (!await stepText('And the ark rested in the seventh month, on the seventeenth day of the month, upon the mountains of Ararat.', 4800, 'Narrator')) return;

  // Dove flight sequence
  if (seqId !== currentSequenceId) return;
  sceneEngine.dove.visible = true;
  sceneEngine.dove.position.set(-45, peakHeight + 4.8, -35);
  
  // Animate Dove flying in circles and returning
  gsap.to(sceneEngine.dove.position, {
    x: -33,
    y: peakHeight + 6.5,
    z: -27,
    duration: 3.5,
    ease: 'power1.out'
  });
  
  if (!await stepText('Also he sent forth a dove from him, to see if the waters were abated from off the face of the ground;', 4800, 'Narrator')) return;
  if (!await stepText('And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off.', 4800, 'Narrator')) return;
  
  // Hide dove after returning
  sceneEngine.dove.visible = false;

  // Noah and family exit onto dry ground near the Altar
  if (seqId !== currentSequenceId) return;
  sceneEngine.familyGroup.children.forEach((member, index) => {
    member.visible = true;
    member.position.set(-38 + (index % 3) * 0.8, peakHeight, -31 - Math.floor(index / 3) * 0.8);
    member.lookAt(-35, peakHeight, -30); // Face altar
  });
  
  // Reveal stone Altar and burn offerings
  sceneEngine.altar.visible = true;
  // Animate altar fire glow pulse
  gsap.to(sceneEngine.altarFire.scale, { x: 1.3, y: 1.3, z: 1.3, repeat: -1, yoyo: true, duration: 0.6 });

  if (!await stepText('And Noah went forth, and his sons, and his wife, and his sons\' wives with him...', 4600, 'Narrator')) return;
  if (!await stepText('And Noah builded an altar unto the LORD; and took of every clean beast, and of every clean fowl, and offered burnt offerings on the altar.', 5400, 'Narrator')) return;

  // Rainbow Covenant (Gen 9:13)
  if (seqId !== currentSequenceId) return;
  sceneEngine.rainbow.visible = true;
  gsap.from(sceneEngine.rainbow.scale, { x: 0, y: 0, z: 0, duration: 3.0, ease: 'back.out(1.5)' });

  if (!await stepText('And God said, "I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth."', 5600, 'God')) return;
  if (!await stepText('"And the waters shall no more become a flood to destroy all flesh."', 4800, 'God')) return;

  clearNarration();
  if (seqId !== currentSequenceId) return;
  scriptureLabelEl.classList.add('show');
}

async function executeBabelSequence(seqId) {
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

  showSkipButton(() => {
    skipBabelSequence();
  }, 'Skip Intro');

  scriptureLabelEl.classList.remove('show');
  loadScriptureScroll(
    `Genesis 11:1 &ndash; 9 <span style="font-weight:400;opacity:.6">(KJV)</span>`,
    `
      <p><span class="verse-num">1</span>And the whole earth was of one language, and of one speech.</p>
      <p><span class="verse-num">2</span>And it came to pass, as they journeyed from the east, that they found a plain in the land of Shinar; and they dwelt there.</p>
      <p><span class="verse-num">3</span>And they said one to another, Go to, let us make brick, and burn them thoroughly. And they had brick for stone, and slime had they for morter.</p>
      <p><span class="verse-num">4</span>And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.</p>
      <p><span class="verse-num">5</span>And the LORD came down to see the city and the tower, which the children of men builded.</p>
      <p><span class="verse-num">6</span>And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do.</p>
      <p><span class="verse-num">7</span>Go to, let us go down, and there confound their language, that they may not understand one another's speech.</p>
      <p><span class="verse-num">8</span>So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.</p>
      <p><span class="verse-num">9</span>Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth...</p>
    `
  );

  if (seqId !== currentSequenceId) return;
  veilEl.style.transition = 'background 1.5s ease';
  veilEl.style.background = 'rgba(0,0,0,0)';

  // Camera looking at the construction plain in Shinar
  const camPos = sceneEngine.camera.position;
  camPos.set(-18, 3.2, 18);
  sceneEngine.camera.lookAt(0.0, 1.0, 0.0);

  if (!await stepText('And the whole earth was of one language, and of one speech.', 4500, 'Narrator')) return;
  if (!await stepText('And they said, "Go to, let us build us a city and a tower, whose top may reach unto heaven..."', 5200, 'Nimrod')) return;

  // 1. TIMELAPSE: Tower building
  // Grow Tier 1
  if (seqId !== currentSequenceId) return;
  sceneEngine.growTowerTier(0);
  gsap.to(camPos, { x: -14, y: 5.0, z: 20, duration: 2.2, onUpdate: () => { sceneEngine.camera.lookAt(0, 1.0, 0); } });
  if (!await stepText('And they had brick for stone, and slime had they for morter.', 4000, 'Narrator')) return;

  // Grow Tier 2
  if (seqId !== currentSequenceId) return;
  sceneEngine.growTowerTier(1);
  gsap.to(camPos, { x: -10, y: 7.0, z: 18, duration: 2.2, onUpdate: () => { sceneEngine.camera.lookAt(0, 2.5, 0); } });
  if (!await stepDelay(1500)) return;

  // Grow Tier 3 & 4
  if (seqId !== currentSequenceId) return;
  sceneEngine.growTowerTier(2);
  sceneEngine.growTowerTier(3);
  gsap.to(camPos, { x: -6, y: 9.5, z: 12, duration: 2.5, onUpdate: () => { sceneEngine.camera.lookAt(0, 4.0, 0); } });
  if (!await stepText('And they said, "...and let us make us a name, lest we be scattered abroad upon the face of the whole earth."', 5500, 'Narrator')) return;

  // 2. DIVINE INTERVENTION: The Lord descends
  if (seqId !== currentSequenceId) return;
  // Dynamic sky flash and lighting change
  gsap.to(sceneEngine.scene.background, { r: 1.0, g: 0.95, b: 0.85, duration: 0.8, yoyo: true, repeat: 1 });
  gsap.to(sceneEngine.scene.fog.color, { r: 1.0, g: 0.95, b: 0.85, duration: 0.8, yoyo: true, repeat: 1 });
  
  if (!await stepText('And the LORD came down to see the city and the tower, which the children of men builded.', 5200, 'Narrator')) return;
  if (!await stepText('"Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another\'s speech."', 10500, 'God')) return;

  // 3. CONFUSION: Confounding the languages
  if (seqId !== currentSequenceId) return;
  sceneEngine.confoundLanguages();
  
  // Show speech bubbles in different confounded languages above workers
  const workerList = sceneEngine.workers;
  const gibberish = [
    "Δόξα τῷ Θεῷ! (What?)",
    "Quid agis, frater? (Huh?)",
    "Ragnarok bork bork! (Eh?)",
    "Lorem ipsum dolor! (What?)",
    "Baga bo pi do! (Gibberish?)",
    "Ay caramba skibidi! (What?)"
  ];
  
  // Animate camera zooming in to workers
  gsap.to(camPos, {
    x: -12.0,
    y: 2.8,
    z: 12.0,
    duration: 2.0,
    onUpdate: () => {
      if (sceneEngine) sceneEngine.camera.lookAt(workerList[0].position.x, 1.2, workerList[0].position.z);
    }
  });
  if (!await stepDelay(2000)) return;

  if (seqId !== currentSequenceId) return;
  // Trigger speech bubbles sequentially as they realize their languages are confounded
  if (!await stepSpeech('Worker', 'Δόξα τῷ Θεῷ! (Wait, what did you say?)', 3500)) return;
  if (!await stepSpeech('Worker', 'Quid agis? (I cannot understand you!)', 3500)) return;
  if (!await stepSpeech('Worker', 'Baga bo pi do! (What is this gibberish?!)', 3500)) return;
  
  if (!await stepText('And there the LORD did confound the language of all the earth...', 4500, 'Narrator')) return;

  // 4. SCATTERING: Workers panic and flee
  if (seqId !== currentSequenceId) return;
  sceneEngine.scatterWorkers();
  
  // Pan camera up to show workers scattering away
  gsap.to(camPos, {
    x: 0,
    y: 14.0,
    z: 22.0,
    duration: 4.5,
    onUpdate: () => {
      if (sceneEngine) sceneEngine.camera.lookAt(0, 4.0, 0);
    }
  });
  if (!await stepText('So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.', 6200, 'Narrator')) return;

  // 5. PLAYABLE EXPLORATION
  if (seqId !== currentSequenceId) return;
  clearNarration();
  
  // Position camera behind builder player
  const bPos = sceneEngine.builder.position;
  camPos.set(bPos.x - 4, bPos.y + 2, bPos.z + 4);
  sceneEngine.camera.lookAt(bPos);
  
  hideSkipButton();
  sceneEngine.unlockControls();
  movementHintEl.classList.add('show');
  
  if (!await stepText('The construction has ceased. Explore the silent ruins of Babel.', 5000, 'Narrator')) return;
  clearNarration();
  
  if (seqId !== currentSequenceId) return;
  scriptureLabelEl.classList.add('show');
}

async function skipBabelSequence() {
  currentSequenceId++;
  const seqId = currentSequenceId;
  hideSkipButton();
  ttsEngine.stop();
  clearNarration();
  clearInstruction();
  
  if (sceneEngine && activeSceneName === 'babel') {
    veilEl.style.transition = 'background 0.8s ease';
    veilEl.style.background = 'rgba(0,0,0,0)';
    
    gsap.killTweensOf(sceneEngine.camera.position);
    if (sceneEngine.scene && sceneEngine.scene.background) {
      gsap.killTweensOf(sceneEngine.scene.background);
      sceneEngine.scene.background.setHex(0xded1bd);
    }
    if (sceneEngine.scene && sceneEngine.scene.fog && sceneEngine.scene.fog.color) {
      gsap.killTweensOf(sceneEngine.scene.fog.color);
      sceneEngine.scene.fog.color.setHex(0xded1bd);
    }
    
    // Grow tower immediately
    for (let i = 0; i < 4; i++) {
      sceneEngine.growTowerTierImmediate(i);
    }
    
    // Confound and scatter workers immediately
    sceneEngine.confoundLanguagesImmediate();
    sceneEngine.scatterWorkersImmediate();
    
    // Position camera
    const bPos = sceneEngine.builder.position;
    sceneEngine.camera.position.set(bPos.x - 4, bPos.y + 2, bPos.z + 4);
    sceneEngine.camera.lookAt(bPos);
    
    // Unlock controls
    sceneEngine.unlockControls();
    movementHintEl.classList.add('show');
    
    await showTextLine('The construction has ceased. Explore the silent ruins of Babel.', 5000, 'Narrator');
    if (seqId === currentSequenceId) {
      clearNarration();
      scriptureLabelEl.classList.add('show');
    }
  }
}

function skipCreationSequence() {
  currentSequenceId++;
  const seqId = currentSequenceId;
  hideSkipButton();
  ttsEngine.stop();
  clearNarration();
  clearInstruction();
  
  if (sceneEngine && activeSceneName === 'creation') {
    veilEl.style.transition = 'background 0.8s ease';
    veilEl.style.background = 'rgba(0,0,0,0)';
    
    gsap.killTweensOf(sceneEngine.camera.position);
    gsap.killTweensOf(sceneEngine.hemiLight);
    gsap.killTweensOf(sceneEngine.sunLight);
    gsap.killTweensOf(sceneEngine.skyMat.color);
    gsap.killTweensOf(sceneEngine.starsMat);
    gsap.killTweensOf(sceneEngine.ground.position);
    gsap.killTweensOf(sceneEngine.waterMat);
    
    sceneEngine.transitionDayOneImmediate();
    sceneEngine.transitionDayTwoImmediate();
    sceneEngine.transitionDayThreeImmediate();
    sceneEngine.transitionDayFourImmediate();
    sceneEngine.transitionDayFiveImmediate();
    sceneEngine.transitionDaySixImmediate();
    sceneEngine.formAdamImmediate();
    
    adjustWindIntensity(0.02, 180, 0.1);
    enableBirdSounds = true;
    enableAnimalSounds = true;
    
    // Position camera
    sceneEngine.camera.position.set(0, sceneEngine.getTerrainHeight(0, 4) + 1.2, 7.5);
    sceneEngine.camera.lookAt(0, sceneEngine.getTerrainHeight(0, 4), 4);
    
    sceneEngine.unlockControls();
    movementHintEl.classList.add('show');
    scriptureLabelEl.classList.add('show');
  }
}

function skipCurrentScene() {
  if (activeSceneName === 'babel') {
    skipBabelSequence();
  } else if (activeSceneName === 'creation') {
    skipCreationSequence();
  } else {
    handleAdvance();
  }
}

// --- 5. Scene Swap Loader ---
function loadScene(sceneName) {
  currentSequenceId++;
  const thisSeqId = currentSequenceId;

  // 1. Fade the veil overlay to black to hide transition artifacts
  veilEl.style.transition = 'background 0.4s ease';
  veilEl.style.background = '#000000';

  // 2. Perform scene swap after the fade-out completes
  setTimeout(() => {
    if (thisSeqId !== currentSequenceId) return;

    destroyActiveScene();
    
    // Preload the first line of the new chapter if not already in cache
    activeSceneName = sceneName;
    
    const script = CHAPTER_SCRIPTS[sceneName];
    if (script && script.length > 0) {
      const firstLine = script[0];
      const charKey = firstLine.character.toLowerCase();
      const cleanFirstText = firstLine.text.replace(/["“”]/g, '');
      ttsEngine.preload(cleanFirstText, charKey);
    }
    
    eraButtons.forEach(btn => {
      if (btn.getAttribute('data-scene') === sceneName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

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
    
    // Instantiate scene engine based on name
    if (sceneName === 'creation') {
      sceneEngine = new CreationScene(canvasWrap);
    } else if (sceneName === 'eden') {
      sceneEngine = new EdenScene(canvasWrap);
    } else if (sceneName === 'cainabel') {
      sceneEngine = new CainAbelScene(canvasWrap);
    } else if (sceneName === 'noah') {
      sceneEngine = new NoahScene(canvasWrap);
    } else if (sceneName === 'babel') {
      sceneEngine = new BabelScene(canvasWrap);
    }

    if (sceneEngine) {
      // Force immediate GPU upload/compilation of shaders & geometries
      sceneEngine.update(0, 0.016);
      
      // Start loop and sequences
      requestAnimationFrame(tick);
      if (sceneName === 'creation') {
        executeCreationSequence(thisSeqId);
      } else if (sceneName === 'eden') {
        executeEdenSequence(thisSeqId);
      } else if (sceneName === 'cainabel') {
        executeCainAbelSequence(thisSeqId);
      } else if (sceneName === 'noah') {
        executeNoahSequence(thisSeqId);
      } else if (sceneName === 'babel') {
        executeBabelSequence(thisSeqId);
      }
    }

    // 3. Fade the veil back to transparent smoothly
    setTimeout(() => {
      if (thisSeqId !== currentSequenceId) return;
      veilEl.style.transition = 'background 1.0s ease';
      veilEl.style.background = 'rgba(0,0,0,0)';
    }, 100);

  }, 400);
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

// --- 6. Procedural SFX & Ambient Dust ---

function playProceduralLeatherCreak() {
  if (!audioContext) initWindAudio();
  if (!audioContext) return;
  
  const now = audioContext.currentTime;
  const sampleRate = audioContext.sampleRate;
  
  // Synthesize low-frequency creaking friction noise
  const bufferSize = sampleRate * 0.9;
  const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.04 * white) / 1.04;
    
    // Add periodic friction crackles
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
  
  // Sweep filter to simulate stretching leather
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
  
  // High frequency whispering paper rustles
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
  
  // Subtle dust particles drifting
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

// --- 7. DOM Initialization Hooks ---
document.addEventListener('DOMContentLoaded', () => {
  initTouchControls();
  initAmbientDust();

  if (speedToggleBtn) {
    speedToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSpeed = currentSpeed === 1 ? 2 : 1;
      speedToggleBtn.textContent = `Speed: ${currentSpeed}x`;
      ttsEngine.setSpeedMultiplier(currentSpeed);
      gsap.globalTimeline.timeScale(currentSpeed);
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (skipCallback) {
        skipCallback();
      }
    });
  }

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
  const bookContainer = document.getElementById('book-container');
  const bookCover = document.getElementById('book-cover');
  const parchmentPage = document.getElementById('parchment-page');
  const loadingText = document.getElementById('loading-text');

  // Cross loading segments
  const clipBottom = document.getElementById('clip-bottom');
  const clipCenter = document.getElementById('clip-center');
  const clipLeftArm = document.getElementById('clip-left-arm');
  const clipRightArm = document.getElementById('clip-right-arm');
  const clipTop = document.getElementById('clip-top');
  const crossGoldFill = document.querySelector('.cross-gold-fill');

  function updateCrossProgress(p) {
    if (!clipBottom) return;
    
    // Clear styles/attributes
    clipBottom.setAttribute('height', '0');
    clipCenter.setAttribute('height', '0');
    clipLeftArm.setAttribute('width', '0');
    clipLeftArm.setAttribute('x', '44');
    clipRightArm.setAttribute('width', '0');
    clipTop.setAttribute('height', '0');
    clipTop.setAttribute('y', '44');

    if (p <= 50) {
      // Bottom fills (y: 140 down to 56, total height 84)
      const pct = p / 50;
      const h = pct * 84;
      clipBottom.setAttribute('y', (140 - h).toString());
      clipBottom.setAttribute('height', h.toString());
    } else {
      clipBottom.setAttribute('y', '56');
      clipBottom.setAttribute('height', '84');
      
      if (p <= 55) {
        // Center fills (y: 56 down to 44, total height 12)
        const pct = (p - 50) / 5;
        const h = pct * 12;
        clipCenter.setAttribute('y', (56 - h).toString());
        clipCenter.setAttribute('height', h.toString());
      } else {
        clipCenter.setAttribute('y', '44');
        clipCenter.setAttribute('height', '12');
        
        if (p <= 85) {
          // Horizontal arms expand (x: 44 to 10 & 56 to 90, total width 34)
          const pct = (p - 55) / 30;
          const w = pct * 34;
          clipLeftArm.setAttribute('x', (44 - w).toString());
          clipLeftArm.setAttribute('width', w.toString());
          clipRightArm.setAttribute('width', w.toString());
        } else {
          clipLeftArm.setAttribute('x', '10');
          clipLeftArm.setAttribute('width', '34');
          clipRightArm.setAttribute('width', '34');
          
          // Top fills (y: 44 down to 10, total height 34)
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

  let ttsInitialized = false;
  const handleBegin = () => {
    // Initialize TTS Engine in the background
    ttsEngine.initialize('auto')
      .then(async () => {
        // Preload the first lines of all 5 chapters in parallel
        const firstLines = [
          { text: CHAPTER_SCRIPTS.creation[0].text, char: 'narrator' },
          { text: CHAPTER_SCRIPTS.eden[0].text, char: 'narrator' },
          { text: CHAPTER_SCRIPTS.cainabel[0].text, char: 'narrator' },
          { text: CHAPTER_SCRIPTS.noah[0].text, char: 'god' },
          { text: CHAPTER_SCRIPTS.babel[0].text, char: 'narrator' }
        ];
        
        try {
          await Promise.all(firstLines.map(line => 
            ttsEngine.preload(line.text.replace(/["“”]/g, ''), line.char)
          ));
          console.log('[TTS] Preloaded first lines for all 5 chapters successfully');
        } catch (e) {
          console.warn('[TTS] Failed to preload first lines during startup:', e);
        }
        
        ttsInitialized = true;
      })
      .catch(err => {
        console.error('[TTS] Initialization error, using fallback:', err);
        ttsInitialized = true; // allow progress to proceed anyway
      });

    // 150-250ms physical pause before cover opens
    setTimeout(() => {
      // Initialize Audio context on user gesture
      initWindAudio();
      
      // Play procedural friction creak and parchment whisper
      playProceduralLeatherCreak();
      setTimeout(playProceduralPageRustle, 120);

      // Camera begins leaning over the manuscript
      const wrapper = document.querySelector('.book-wrapper');
      if (wrapper) {
        wrapper.style.transform = 'translateZ(180px) translateX(-25%)';
      }

      // Rotate book cover after small camera delay
      setTimeout(() => {
        if (bookCover) {
          bookCover.style.transform = 'rotateY(-115deg)';
        }
        const container = document.getElementById('book-container');
        if (container) {
          container.classList.add('book-opened');
        }
      }, 250);

      // Transition wrapper focus to the parchment page
      setTimeout(() => {
        if (wrapper) {
          wrapper.style.transform = 'translateZ(420px) translateX(-25%)';
        }
      }, 1200);

      // Begin loading process
      setTimeout(() => {
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.floor(Math.random() * 8) + 3;
          
          // Preload creation scene WebGL elements
          if (progress >= 70 && !window.creationScenePreloaded) {
            window.creationScenePreloaded = true;
            
            setTimeout(() => {
              currentSequenceId++;
              const thisSeqId = currentSequenceId;
              destroyActiveScene();
              activeSceneName = 'creation';
              
              sceneEngine = new CreationScene(canvasWrap);
              sceneEngine.update(0, 0.016);
              
              window.preloadedSeqId = thisSeqId;
            }, 50);
          }

          if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            updateCrossProgress(100);
            loadingText.textContent = "Illuminated";

            // Final completion sequence
            setTimeout(() => {
              // Shimmer shimmers and glow activates
              if (crossGoldFill) {
                crossGoldFill.classList.add('glow-active');
              }
              // Softly start wind audio
              startAmbientSoundLoops();
              
              // Portal transition zoom into parchment to reveal the Three.js canvas
              setTimeout(() => {
                if (wrapper) {
                  wrapper.style.transition = 'transform 2.5s cubic-bezier(0.25, 1, 0.3, 1)';
                  wrapper.style.transform = 'translateZ(1800px) translateX(-350px)';
                }
                if (bookContainer) {
                  bookContainer.style.transition = 'opacity 2.2s cubic-bezier(0.25, 1, 0.3, 1), visibility 2.2s';
                  bookContainer.style.opacity = '0';
                  setTimeout(() => {
                    bookContainer.style.visibility = 'hidden';
                  }, 2200);
                }

                if (window.preloadedSeqId) {
                  let lastTime = 0;
                  function tick(timestamp) {
                    if (window.preloadedSeqId !== currentSequenceId || !sceneEngine) return;
                    const elapsed = timestamp * 0.001;
                    const dt = elapsed - lastTime;
                    lastTime = elapsed;
                    
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
                  
                  eraButtons.forEach(btn => {
                    if (btn.getAttribute('data-scene') === 'creation') {
                      btn.classList.add('active');
                    } else {
                      btn.classList.remove('active');
                    }
                  });
                  
                  veilEl.style.transition = 'none';
                  veilEl.style.background = '#000000';
                  void veilEl.offsetWidth;
                  
                  veilEl.style.transition = 'background 1.8s ease';
                  veilEl.style.background = 'rgba(0,0,0,0)';
                  
                  requestAnimationFrame(tick);
                  executeCreationSequence(window.preloadedSeqId);
                } else {
                  loadScene('creation');
                }
              }, 1200);
            }, 1000);
          } else {
            // Hold progress at 90% if TTS has not completed initializing
            if (progress >= 90 && !ttsInitialized) {
              progress = 90;
              loadingText.textContent = "Awakening Divine Voices...";
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
