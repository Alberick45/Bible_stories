import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * GLTF_ASSETS — Map of official Three.js & Khronos GLTF sample models for humans, animals, and flora.
 */
export const GLTF_ASSETS = {
  // Humans
  adam: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb',
  eve: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Xbot.glb',
  cain: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb',
  abel: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMan/glTF-Binary/CesiumMan.glb',
  noah: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMan/glTF-Binary/CesiumMan.glb',
  builder: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Soldier.glb',

  // Animals
  horse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Horse.glb',
  flamingo: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Flamingo.glb',
  stork: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Stork.glb',
  parrot: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Parrot.glb',
  fox: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Fox/glTF-Binary/Fox.glb',
  duck: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb'
};

const loader = new GLTFLoader();
const modelCache = new Map();

/**
 * loadGLTFModel — Loads a GLTF model by asset key or URL, setting up shadows and animation mixers.
 */
export function loadGLTFModel(assetKeyOrUrl, options = {}) {
  const url = GLTF_ASSETS[assetKeyOrUrl] || assetKeyOrUrl;
  const targetGroup = options.targetGroup || new THREE.Group();
  const scale = options.scale || 1.0;

  return new Promise((resolve, reject) => {
    if (modelCache.has(url)) {
      const cached = modelCache.get(url).clone(true);
      cached.scale.setScalar(scale);
      targetGroup.add(cached);
      resolve({ scene: cached, mixer: null });
      return;
    }

    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(scale);
        model.traverse((o) => {
          if (o.isMesh || o.isSkinnedMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.frustumCulled = false;
          }
        });
        targetGroup.add(model);
        modelCache.set(url, model.clone(true));

        let mixer = null;
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        resolve({ scene: model, mixer, animations: gltf.animations });
      },
      undefined,
      (err) => {
        console.warn(`[AssetRegistry] Failed to load GLTF asset '\${assetKeyOrUrl}' from \${url}`, err);
        reject(err);
      }
    );
  });
}
