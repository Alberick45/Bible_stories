import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

export const CHARACTERS = {
  adam: '/src/models/characters/adam_black.fbx',
  adam_black: '/src/models/characters/adam_black.fbx',
  adam_white: '/src/models/characters/adam_white.fbx',
  eve: '/src/models/characters/eve_white.fbx',
  eve_white: '/src/models/characters/eve_white.fbx',
  megan: '/src/models/characters/megan_black.fbx',
  megan_black: '/src/models/characters/megan_black.fbx',
  cain: '/src/models/characters/man1.fbx',
  abel: '/src/models/characters/man2.fbx',
  man1: '/src/models/characters/man1.fbx',
  man2: '/src/models/characters/man2.fbx',
  noah: '/src/models/characters/adam_white.fbx',
  builder: '/src/models/characters/man1.fbx',
  soldier: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb',
  swordsman: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb',
  cherub: '/src/models/characters/adam_white.fbx',
  angel: '/src/models/characters/adam_white.fbx'
};

export const ANIMATIONS = {
  idle: '/src/animation/movements/Idle.fbx',
  walk: '/src/animation/movements/Unarmed Walk Forward.fbx',
  run: '/src/animation/movements/Running.fbx',
  pray: '/src/animation/movements/Praying.fbx',
  praying: '/src/animation/movements/Praying.fbx',
  talking: '/src/animation/movements/Talking.fbx',
  male_laying: '/src/animation/movements/Male Laying Pose.fbx',
  female_laying: '/src/animation/movements/Female Laying Pose.fbx',
  standing_up: '/src/animation/movements/Standing Up.fbx',
  angry: '/src/animation/movements/Angry.fbx',
  angry_gesture: '/src/animation/movements/Angry Gesture.fbx',
  dying: '/src/animation/movements/Dying.fbx',
  death_from_right: '/src/animation/movements/Death From Right.fbx',
  waving: '/src/animation/movements/Waving Gesture.fbx',
  hook_punch: '/src/animation/movements/Hook Punch.fbx',
  kicking: '/src/animation/movements/Kicking.fbx',
  jump: '/src/animation/movements/Jump.fbx',
  sword_idle: '/src/animation/movements/Standing Block Start.fbx',
  sword: '/src/animation/movements/Standing Block Start.fbx',
  standing_block: '/src/animation/movements/Standing Block Start.fbx'
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

/**
 * Loads a character or prop model by URL or registry key.
 * Detects .fbx vs .glb/.gltf extension, applies fbxScale, and caches/clones using SkeletonUtils.clone().
 */
export async function loadModelAsset(keyOrUrl, options = {}) {
  const url = CHARACTERS[keyOrUrl.toLowerCase()] || GLTF_ASSETS[keyOrUrl.toLowerCase()] || keyOrUrl;
  const isFbx = url.toLowerCase().endsWith('.fbx');
  const fbxScale = options.fbxScale !== undefined ? options.fbxScale : 0.01;

  if (modelCache.has(url)) {
    const cachedData = modelCache.get(url);
    const clonedScene = SkeletonUtils.clone(cachedData.scene);
    return {
      scene: clonedScene,
      animations: cachedData.animations ? cachedData.animations.map(a => a.clone()) : [],
      isFbx
    };
  }

  if (isFbx) {
    return new Promise((resolve, reject) => {
      fbxLoader.load(
        url,
        (fbx) => {
          fbx.scale.setScalar(fbxScale);
          fbx.traverse((o) => {
            if (o.isMesh || o.isSkinnedMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              o.frustumCulled = false;
            }
          });
          modelCache.set(url, { scene: fbx, animations: fbx.animations || [] });
          const clonedScene = SkeletonUtils.clone(fbx);
          resolve({
            scene: clonedScene,
            animations: fbx.animations ? fbx.animations.map(a => a.clone()) : [],
            isFbx: true
          });
        },
        undefined,
        (err) => {
          console.warn(`[AssetRegistry] Failed to load FBX model '${keyOrUrl}' from '${url}':`, err);
          reject(err);
        }
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      gltfLoader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.traverse((o) => {
            if (o.isMesh || o.isSkinnedMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              o.frustumCulled = false;
            }
          });
          modelCache.set(url, { scene: model, animations: gltf.animations || [] });
          const clonedScene = SkeletonUtils.clone(model);
          resolve({
            scene: clonedScene,
            animations: gltf.animations ? gltf.animations.map(a => a.clone()) : [],
            isFbx: false
          });
        },
        undefined,
        (err) => {
          console.warn(`[AssetRegistry] Failed to load GLTF model '${keyOrUrl}' from '${url}':`, err);
          reject(err);
        }
      );
    });
  }
}

export const loadGLTFModel = loadModelAsset;

export function canonicalBoneName(name) {
  // "Hips", "mixamorig1:Hips", "mixamorig1Hips", "mixamorig:Hips" -> "mixamorigHips"
  return 'mixamorig' + name.replace(/^mixamorig\d*[:_]?/i, '');
}

/**
 * Loads an animation clip (FBX Mixamo clip) by key or URL.
 * Renames clip to key, caches clip so it's never re-fetched twice.
 */
export async function loadAnimationClip(keyOrUrl) {
  const key = keyOrUrl.toLowerCase();
  const url = ANIMATIONS[key] || keyOrUrl;

  if (clipCache.has(key)) {
    return clipCache.get(key).clone();
  }
  if (clipCache.has(url)) {
    return clipCache.get(url).clone();
  }

  return new Promise((resolve, reject) => {
    fbxLoader.load(
      url,
      (fbx) => {
        if (fbx.animations && fbx.animations.length > 0) {
          const clip = fbx.animations[0];
          clip.name = key; // Mixamo names every clip "mixamo.com", rename to key

          // Sanitize tracks so track targets match model bone names
          if (clip.tracks) {
            clip.tracks.forEach((track) => {
              const dotIdx = track.name.lastIndexOf('.');
              if (dotIdx !== -1) {
                let nodeName = track.name.substring(0, dotIdx);
                const propName = track.name.substring(dotIdx);

                // Strip path prefixes like "Armature/" or "root/"
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
          resolve(clip.clone());
        } else {
          reject(new Error(`[AssetRegistry] No animations found in FBX file '${url}'`));
        }
      },
      undefined,
      (err) => {
        console.warn(`[AssetRegistry] Failed to load animation '${keyOrUrl}' from '${url}':`, err);
        reject(err);
      }
    );
  });
}
