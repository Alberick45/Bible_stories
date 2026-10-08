import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

export const HF_BASE_URL = 'https://huggingface.co/alby365/bible-game-assets/resolve/main';

export const CHARACTERS = {
  // Main Narrative Characters (Loaded locally via public/ & HF fallback)
  adam: '/models/characters/male/adam_black.fbx',
  adam_black: '/models/characters/male/adam_black.fbx',
  adam_white: '/models/characters/male/adam_white.fbx',
  eve: '/models/characters/female/eve_white.fbx',
  eve_white: '/models/characters/female/eve_white.fbx',
  cain: '/models/characters/male/man1.fbx',
  abel: '/models/characters/male/man2.fbx',
  noah: '/models/characters/male/old_guy1.fbx',
  old_guy: '/models/characters/male/old_guy1.fbx',
  old_guy1: '/models/characters/male/old_guy1.fbx',
  builder: '/models/characters/male/man1.fbx',
  soldier: '/models/characters/male/swordsman.fbx',
  swordsman: '/models/characters/male/swordsman.fbx',
  swordwoman: '/models/characters/female/swordwoman.fbx',
  cherub: '/models/characters/male/swordsman.fbx',
  angel: '/models/characters/male/swordsman.fbx',

  // Male Character Pool (Local core & HF remote fallback)
  aj: '/models/characters/male/Aj.fbx',
  alex: `${HF_BASE_URL}/male/alex.fbx`,
  brute: `${HF_BASE_URL}/male/Brute.fbx`,
  bryce: `${HF_BASE_URL}/male/bryce.fbx`,
  castle_guard1: '/models/characters/male/castle_guard_01.fbx',
  castle_guard2: '/models/characters/male/Castle Guard 02.fbx',
  copzombie: `${HF_BASE_URL}/male/copzombie_l_actisdato.fbx`,
  david: `${HF_BASE_URL}/male/david.fbx`,
  dreyar: '/models/characters/male/Dreyar By M.Aure.fbx',
  ely: '/models/characters/male/Ely By K.Atienza.fbx',
  exo_gray: `${HF_BASE_URL}/male/Exo%20Gray.fbx`,
  exo_red: `${HF_BASE_URL}/male/exo_red.fbx`,
  james: `${HF_BASE_URL}/male/james.fbx`,
  joe: `${HF_BASE_URL}/male/joe.fbx`,
  josh: `${HF_BASE_URL}/male/josh.fbx`,
  kid1: '/models/characters/male/kid1.fbx',
  knight1: `${HF_BASE_URL}/male/knight1.fbx`,
  lewis: `${HF_BASE_URL}/male/lewis.fbx`,
  man1: '/models/characters/male/man1.fbx',
  man2: '/models/characters/male/man2.fbx',
  ortiz: `${HF_BASE_URL}/male/ortiz.fbx`,
  paladin: '/models/characters/male/Paladin J Nordstrom.fbx',
  peasant_man: '/models/characters/male/Peasant Man.fbx',
  pete: `${HF_BASE_URL}/male/pete.fbx`,
  shannon: `${HF_BASE_URL}/male/shannon.fbx`,
  steve: `${HF_BASE_URL}/male/steve.fbx`,
  swat: '/models/characters/male/Swat.fbx',
  swat2: `${HF_BASE_URL}/male/swat2.fbx`,
  random_guy2: `${HF_BASE_URL}/male/random_guy2.fbx`,
  random_guy3: `${HF_BASE_URL}/male/random%20guy3.fbx`,
  adam2: `${HF_BASE_URL}/male/adam2.fbx`,

  // Female Character Pool (Local core & HF remote fallback)
  akai: '/models/characters/female/akai_e_espiritu.fbx',
  amy: `${HF_BASE_URL}/female/amy.fbx`,
  arissa: '/models/characters/female/Arissa.fbx',
  astra: `${HF_BASE_URL}/female/astra.fbx`,
  elizabeth: `${HF_BASE_URL}/female/elizabeth.fbx`,
  erika: `${HF_BASE_URL}/female/Erika%20Archer.fbx`,
  girlscout: `${HF_BASE_URL}/female/Girlscout%20T%20Masuyama.fbx`,
  jackie: `${HF_BASE_URL}/female/jackie.fbx`,
  jennifer: `${HF_BASE_URL}/female/jennife.fbx`,
  jody: `${HF_BASE_URL}/female/jody.fbx`,
  kachujin: `${HF_BASE_URL}/female/Kachujin%20G%20Rosales.fbx`,
  kate: `${HF_BASE_URL}/female/kate.fbx`,
  lola: '/models/characters/female/Lola B Styperek.fbx',
  louise: `${HF_BASE_URL}/female/louise.fbx`,
  martha: `${HF_BASE_URL}/female/martha.fbx`,
  medea: '/models/characters/female/Medea By M. Arrebola.fbx',
  megan: '/models/characters/female/megan_black.fbx',
  megan_black: '/models/characters/female/megan_black.fbx',
  pirate_female: '/models/characters/female/Pirate By P. Konstantinov.fbx',
  roth: `${HF_BASE_URL}/female/roth.fbx`,
  sophie: `${HF_BASE_URL}/female/sophie.fbx`,
  suzie: `${HF_BASE_URL}/female/suzie.fbx`
};

export const ANIMATIONS = {
  idle: '/animation/movements/Idle.fbx',
  walk: '/animation/movements/Unarmed Walk Forward.fbx',
  run: '/animation/movements/Running.fbx',
  pray: '/animation/movements/Praying.fbx',
  praying: '/animation/movements/Praying.fbx',
  talking: '/animation/movements/Talking.fbx',
  male_laying: '/animation/movements/Male Laying Pose.fbx',
  female_laying: '/animation/movements/Female Laying Pose.fbx',
  standing_up: '/animation/movements/Standing Up.fbx',
  angry: '/animation/movements/Angry.fbx',
  angry_gesture: '/animation/movements/Angry Gesture.fbx',
  dying: '/animation/movements/Dying.fbx',
  death_from_right: '/animation/movements/Death From Right.fbx',
  waving: '/animation/movements/Waving Gesture.fbx',
  hook_punch: '/animation/movements/Hook Punch.fbx',
  kicking: '/animation/movements/Kicking.fbx',
  jump: '/animation/movements/Jump.fbx',
  sword_idle: '/animation/movements/Standing Block Start.fbx',
  sword: '/animation/movements/Standing Block Start.fbx',
  standing_block: '/animation/movements/Standing Block Start.fbx'
};

export const GLTF_ASSETS = {
  // Animals & props
  horse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Horse.glb',
  flamingo: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Flamingo.glb',
  stork: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Stork.glb',
  parrot: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Parrot.glb',
  fox: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Fox/glTF-Binary/Fox.glb',
  duck: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb'
};

const gltfLoader = new GLTFLoader();
const fbxLoader = new FBXLoader();

const modelCache = new Map();     // url -> { scene, animations }
const clipCache = new Map();      // key/url -> AnimationClip
const pendingLoads = new Map();   // url -> Promise
const pendingClips = new Map();   // key/url -> Promise

export const SCENE_ASSETS = {
  creation: {
    characters: ['adam_black'],
    animations: ['idle', 'walk', 'run'],
    gltf: ['horse', 'flamingo', 'stork', 'parrot', 'fox', 'duck']
  },
  eden: {
    characters: ['adam_black', 'eve_white', 'swordsman'],
    animations: ['idle', 'walk', 'run', 'talking', 'pray', 'female_laying'],
    gltf: []
  },
  cainabel: {
    characters: ['old_guy1', 'eve_white', 'man1', 'man2', 'swordsman'],
    animations: ['idle', 'walk', 'run', 'talking', 'pray', 'hook_punch', 'dying'],
    gltf: []
  },
  noah: {
    characters: ['old_guy1', 'man1', 'man2', 'megan_black'],
    animations: ['idle', 'walk', 'run', 'talking', 'pray'],
    gltf: ['horse', 'flamingo', 'stork', 'parrot', 'fox', 'duck']
  },
  babel: {
    characters: ['man1', 'man2', 'peasant_man', 'swordsman'],
    animations: ['idle', 'walk', 'run', 'talking', 'pray'],
    gltf: []
  }
};

const CACHE_NAME = 'hf-3d-model-cache-v1';

async function fetchArrayBufferWithRetries(url, keyOrUrl, onProgress, timeoutMs, maxRetries = 2) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    attempt++;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      const contentLength = response.headers.get('content-length');
      const sizeMB = contentLength ? (parseInt(contentLength, 10) / (1024 * 1024)).toFixed(2) + ' MB' : 'unknown size';
      console.log(`[AssetRegistry] 🌐 [HF CDN RESPONSE] '${keyOrUrl}' HTTP ${response.status} (${response.statusText || 'OK'}) | Content-Length: ${sizeMB}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      // Save to browser Cache API if HTTP URL and Cache API is available
      if (typeof window !== 'undefined' && 'caches' in window && url.startsWith('http')) {
        try {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(url, response.clone());
          console.log(`[AssetRegistry] 💾 [PERSISTENT CACHE SAVED] Saved '${keyOrUrl}' to browser Cache API storage.`);
        } catch (cErr) {
          console.warn('[AssetRegistry] Could not store in Cache API:', cErr);
        }
      }

      const reader = response.body ? response.body.getReader() : null;
      if (reader && contentLength) {
        const total = parseInt(contentLength, 10);
        let loaded = 0;
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.length;
          if (onProgress) onProgress(loaded / total);
        }
        const combined = new Uint8Array(loaded);
        let offset = 0;
        for (const chunk of chunks) {
          combined.set(chunk, offset);
          offset += chunk.length;
        }
        return combined.buffer;
      } else {
        return await response.arrayBuffer();
      }
    } catch (err) {
      clearTimeout(timer);
      console.warn(`[AssetRegistry] ⚠️ Attempt ${attempt}/${maxRetries + 1} failed for '${keyOrUrl}' (${url}):`, err.message || err);
      if (attempt > maxRetries) throw err;
      await new Promise(r => setTimeout(r, attempt * 1000));
    }
  }
}

async function executeModelLoad(url, keyOrUrl, isFbx, fbxScale, onProgress, timeoutMs) {
  let arrayBuffer = null;

  // 1. Check browser Cache API first
  if (typeof window !== 'undefined' && 'caches' in window && url.startsWith('http')) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        const contentLength = cachedResponse.headers.get('content-length');
        const sizeMB = contentLength ? (parseInt(contentLength, 10) / (1024 * 1024)).toFixed(2) + ' MB' : 'cached size';
        console.log(`[AssetRegistry] 💾 [PERSISTENT CACHE HIT] Loaded '${keyOrUrl}' from browser Cache API storage (${sizeMB}).`);
        arrayBuffer = await cachedResponse.arrayBuffer();
      }
    } catch (cErr) {
      console.warn('[AssetRegistry] Cache match warning:', cErr);
    }
  }

  // 2. Fetch network if not in persistent Cache API
  if (!arrayBuffer) {
    arrayBuffer = await fetchArrayBufferWithRetries(url, keyOrUrl, onProgress, timeoutMs);
  }

  // 3. Parse ArrayBuffer with Three.js FBXLoader / GLTFLoader
  return new Promise((resolve, reject) => {
    try {
      if (isFbx) {
        const scene = fbxLoader.parse(arrayBuffer, '');
        scene.scale.setScalar(fbxScale);
        const animations = scene.animations || [];
        scene.traverse((o) => {
          if (o.isMesh || o.isSkinnedMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.frustumCulled = false;
          }
        });
        const data = { scene, animations };
        modelCache.set(url, data);
        pendingLoads.delete(url);

        const clonedScene = SkeletonUtils.clone(scene);
        resolve({
          scene: clonedScene,
          animations: animations ? animations.map(a => a.clone()) : [],
          isFbx: true
        });
      } else {
        gltfLoader.parse(
          arrayBuffer,
          '',
          (gltf) => {
            const scene = gltf.scene;
            const animations = gltf.animations || [];
            scene.traverse((o) => {
              if (o.isMesh || o.isSkinnedMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.frustumCulled = false;
              }
            });
            const data = { scene, animations };
            modelCache.set(url, data);
            pendingLoads.delete(url);

            const clonedScene = SkeletonUtils.clone(scene);
            resolve({
              scene: clonedScene,
              animations: animations ? animations.map(a => a.clone()) : [],
              isFbx: false
            });
          },
          (err) => {
            pendingLoads.delete(url);
            reject(err);
          }
        );
      }
    } catch (parseErr) {
      pendingLoads.delete(url);
      reject(parseErr);
    }
  });
}

/**
 * Loads a character or prop model by URL or registry key.
 * 1. Tries Hugging Face CDN (alby365/bible-game-assets) first for remote models.
 * 2. Uses browser Cache API persistent storage so models are downloaded only once.
 * 3. Configurable timeout (default 120,000ms / 2 mins) with retry backoff.
 */
export async function loadModelAsset(keyOrUrl, options = {}) {
  const targetKey = keyOrUrl.toLowerCase();
  let localUrl = CHARACTERS[targetKey] || GLTF_ASSETS[targetKey] || keyOrUrl;
  let primaryUrl = localUrl;
  let fallbackUrl = null;

  if (localUrl.startsWith('/models/characters/')) {
    const relPath = localUrl.replace('/models/characters/', '');
    primaryUrl = `${HF_BASE_URL}/${relPath}`; // Try Hugging Face first
    // Only fall back to local file if it's not a remote HF asset that isn't in git
    fallbackUrl = localUrl;
  } else if (localUrl.startsWith(HF_BASE_URL)) {
    primaryUrl = localUrl;
  }

  const isFbx = primaryUrl.toLowerCase().endsWith('.fbx');
  const fbxScale = options.fbxScale !== undefined ? options.fbxScale : 0.01;
  const onProgress = options.onProgress;
  const timeoutMs = options.timeoutMs !== undefined ? options.timeoutMs : 120000;

  if (modelCache.has(primaryUrl)) {
    const cachedData = modelCache.get(primaryUrl);
    console.log(`[AssetRegistry] ⚡ [RAM CACHE - ORIGINAL CDN] Loaded cached model '${keyOrUrl}' (${primaryUrl})`);
    return {
      scene: SkeletonUtils.clone(cachedData.scene),
      animations: cachedData.animations ? cachedData.animations.map(a => a.clone()) : [],
      isFbx
    };
  }

  if (pendingLoads.has(primaryUrl)) {
    const cachedData = await pendingLoads.get(primaryUrl);
    return {
      scene: SkeletonUtils.clone(cachedData.scene),
      animations: cachedData.animations ? cachedData.animations.map(a => a.clone()) : [],
      isFbx
    };
  }

  try {
    const isRemote = primaryUrl.startsWith('http');
    console.log(`[AssetRegistry] ${isRemote ? '🌐 [ORIGINAL CDN FETCH]' : '📁 [LOCAL STATIC FETCH]'}: '${keyOrUrl}' -> ${primaryUrl}`);
    const loadPromise = executeModelLoad(primaryUrl, keyOrUrl, isFbx, fbxScale, onProgress, timeoutMs);
    pendingLoads.set(primaryUrl, loadPromise);
    const result = await loadPromise;
    console.log(`[AssetRegistry] ✅ [${isRemote ? 'ORIGINAL CDN SUCCESS' : 'LOCAL STATIC SUCCESS'}] Loaded '${keyOrUrl}'`);
    return result;
  } catch (err) {
    if (fallbackUrl && !primaryUrl.startsWith('http')) {
      console.warn(`[AssetRegistry] ⚠️ [FETCH FAILED] Retrying with local static asset: ${fallbackUrl}`, err);
      try {
        const fallbackPromise = executeModelLoad(fallbackUrl, keyOrUrl, isFbx, fbxScale, onProgress, timeoutMs);
        pendingLoads.set(primaryUrl, fallbackPromise);
        const res = await fallbackPromise;
        console.log(`[AssetRegistry] 📁 [LOCAL FALLBACK SUCCESS] Successfully loaded '${keyOrUrl}' from local static asset: ${fallbackUrl}`);
        return res;
      } catch (fallbackErr) {
        console.error(`[AssetRegistry] ❌ [LOCAL FALLBACK FAILED] Local fallback also failed for '${keyOrUrl}':`, fallbackErr);
        throw fallbackErr;
      }
    }
    throw err;
  }
}

export const loadGLTFModel = loadModelAsset;

export function canonicalBoneName(name) {
  // "Hips", "mixamorig1:Hips", "mixamorig1Hips", "mixamorig:Hips" -> "mixamorigHips"
  return 'mixamorig' + name.replace(/^mixamorig\d*[:_]?/i, '');
}

async function executeClipLoad(key, url, timeoutMs) {
  return new Promise((resolve, reject) => {
    let hasTimedOut = false;
    const timer = setTimeout(() => {
      hasTimedOut = true;
      pendingClips.delete(key);
      pendingClips.delete(url);
      reject(new Error(`[AssetRegistry] Timeout (${timeoutMs}ms) loading animation '${key}'`));
    }, timeoutMs);

    fbxLoader.load(
      url,
      (fbx) => {
        if (hasTimedOut) return;
        clearTimeout(timer);

        if (fbx.animations && fbx.animations.length > 0) {
          const clip = fbx.animations[0];
          clip.name = key;

          if (clip.tracks) {
            clip.tracks.forEach((track) => {
              const dotIdx = track.name.lastIndexOf('.');
              if (dotIdx !== -1) {
                let nodeName = track.name.substring(0, dotIdx);
                const propName = track.name.substring(dotIdx);

                const slashIdx = nodeName.lastIndexOf('/');
                if (slashIdx !== -1) {
                  nodeName = nodeName.substring(slashIdx + 1);
                }

                nodeName = canonicalBoneName(nodeName);
                track.name = nodeName + propName;
              }
            });
          }

          clipCache.set(key, clip);
          clipCache.set(url, clip);
          pendingClips.delete(key);
          pendingClips.delete(url);
          resolve(clip.clone());
        } else {
          pendingClips.delete(key);
          pendingClips.delete(url);
          reject(new Error(`[AssetRegistry] No animations found in FBX file '${url}'`));
        }
      },
      undefined,
      (err) => {
        if (hasTimedOut) return;
        clearTimeout(timer);
        pendingClips.delete(key);
        pendingClips.delete(url);
        console.warn(`[AssetRegistry] Failed to load animation '${key}' from '${url}':`, err);
        reject(err);
      }
    );
  });
}

/**
 * Loads an animation clip (FBX Mixamo clip) by key or URL.
 * Movement animations are sourced directly from local static files (/animation/movements/...) in Git.
 */
export async function loadAnimationClip(keyOrUrl, options = {}) {
  const key = keyOrUrl.toLowerCase();
  // Always source movement animations locally from committed static assets in git
  let primaryUrl = ANIMATIONS[key] || keyOrUrl;

  const timeoutMs = options.timeoutMs !== undefined ? options.timeoutMs : 30000;

  if (clipCache.has(key)) {
    console.log(`[AssetRegistry] ⚡ [CACHE - ANIMATION] '${key}'`);
    return clipCache.get(key).clone();
  }
  if (clipCache.has(primaryUrl)) return clipCache.get(primaryUrl).clone();

  if (pendingClips.has(key)) {
    const clip = await pendingClips.get(key);
    return clip.clone();
  }

  try {
    console.log(`[AssetRegistry] 📁 [LOCAL ANIMATION FETCH]: '${key}' -> ${primaryUrl}`);
    const loadPromise = executeClipLoad(key, primaryUrl, timeoutMs);
    pendingClips.set(key, loadPromise);
    pendingClips.set(primaryUrl, loadPromise);
    const clip = await loadPromise;
    console.log(`[AssetRegistry] ✅ [LOCAL ANIMATION SUCCESS] Loaded animation '${key}'`);
    return clip;
  } catch (err) {
    console.error(`[AssetRegistry] ❌ [ANIMATION FAILED] Animation '${key}' failed to load from ${primaryUrl}:`, err);
    throw err;
  }
}

/**
 * Preloads all 3D assets & animations for a target scene, reporting progress.
 */
export async function preloadSceneAssets(sceneName, onProgress) {
  const assets = SCENE_ASSETS[sceneName] || SCENE_ASSETS.creation;
  const totalItems = assets.characters.length + assets.animations.length + (assets.gltf ? assets.gltf.length : 0);
  if (totalItems === 0) return;

  let loadedItems = 0;

  const notify = () => {
    loadedItems++;
    if (onProgress) {
      onProgress(loadedItems / totalItems, loadedItems, totalItems);
    }
  };

  const tasks = [];

  for (const charKey of assets.characters) {
    tasks.push(
      loadModelAsset(charKey)
        .then(() => notify())
        .catch(err => {
          console.warn(`[AssetPreloader] Preload character '${charKey}' skipped:`, err);
          notify();
        })
    );
  }

  for (const animKey of assets.animations) {
    tasks.push(
      loadAnimationClip(animKey)
        .then(() => notify())
        .catch(err => {
          console.warn(`[AssetPreloader] Preload animation '${animKey}' skipped:`, err);
          notify();
        })
    );
  }

  if (assets.gltf) {
    for (const gltfKey of assets.gltf) {
      tasks.push(
        loadModelAsset(gltfKey)
          .then(() => notify())
          .catch(err => {
            console.warn(`[AssetPreloader] Preload GLTF '${gltfKey}' skipped:`, err);
            notify();
          })
      );
    }
  }

  await Promise.allSettled(tasks);
}



