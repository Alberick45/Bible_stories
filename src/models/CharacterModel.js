import * as THREE from 'three';
import { loadModelAsset, loadAnimationClip, CHARACTERS, canonicalBoneName } from './AssetRegistry.js';

/**
 * CharacterModel — High-fidelity character entity supporting FBX (Mixamo) & GLTF models,
 * skin swapping, Mixamo animation clip loading & crossfading, and procedural fallback.
 */
export class CharacterModel {
  constructor(options = {}) {
    this.name = options.name || 'Character';
    this.characterKey = options.character || options.gltfUrl || this.name.toLowerCase();
    this.gender = options.gender || 'male';
    this.skinTone = options.skinTone || 0xdcb896;
    this.clothesColor = options.clothesColor || 0x4a6fa5;
    this.hairColor = options.hairColor || 0x2b1d0c;
    this.scale = options.scale !== undefined ? options.scale : 1.0;
    this.fbxScale = options.fbxScale !== undefined ? options.fbxScale : 0.01;
    this.forwardOffset = options.forwardOffset !== undefined ? options.forwardOffset : 0;
    this.animationSource = options.animationSource || 'library'; // 'library' or 'embedded'
    
    this.group = new THREE.Group();
    this.group.name = this.name;
    this.group.scale.setScalar(this.scale);
    
    this.currentMesh = null;
    this.mixer = null;
    this.actions = {};
    this.clips = {};
    this.activeAction = null;
    this.activeActionName = null;
    this.isLoaded = false;
    this.isProcedural = false;
    this.isOneShotPlaying = false;
    
    // Joint references for animated poses & joint tracking
    this.joints = {};
    this.limbs = {};

    this.init();
  }

  async init() {
    try {
      const assetData = await loadModelAsset(this.characterKey, { fbxScale: this.fbxScale });
      this.attachMesh(assetData.scene);

      if (this.animationSource === 'embedded' && assetData.animations && assetData.animations.length > 0) {
        // Animal or model with embedded clips
        for (const clip of assetData.animations) {
          const action = this.mixer.clipAction(clip);
          this.actions[clip.name.toLowerCase()] = action;
          this.clips[clip.name.toLowerCase()] = clip;
        }
        this.playAnimation('idle');
      } else {
        // Humanoid character with Mixamo clip library
        this.bindJoints(this.currentMesh);
        
        // Pre-load default core animations lazily
        await Promise.allSettled([
          this.loadAnimation('idle'),
          this.loadAnimation('walk'),
          this.loadAnimation('run')
        ]);
        
        this.playAnimation('idle');
      }

      this.isLoaded = true;
      return;
    } catch (err) {
      console.warn(`[CharacterModel] Failed to load model asset for '${this.name}' (${this.characterKey}), falling back to sculpted PBR model.`, err);
    }

    this.createSculptedHuman();
    this.isLoaded = true;
  }

  attachMesh(mesh) {
    this.currentMesh = mesh;
    if (this.currentMesh) {
      this.currentMesh.traverse((node) => {
        if (node.isBone) node.name = canonicalBoneName(node.name);
      });
      const bones = [];
      this.currentMesh.traverse(n => { if (n.isBone) bones.push(n.name); });
      console.log(`[${this.name}] bones:`, bones.length, bones.slice(0, 6));
    }
    this.currentMesh.rotation.y = this.forwardOffset;
    this.group.add(this.currentMesh);
    this.mixer = new THREE.AnimationMixer(this.currentMesh);
  }

  bindJoints(mesh) {
    if (!mesh) return;
    mesh.traverse((o) => {
      if (o.name) {
        const nameLower = o.name.toLowerCase();
        if (nameLower.includes('leftarm') || nameLower.includes('leftshoulder') || nameLower.includes('arm_l')) {
          this.joints.shoulderLeft = o;
        } else if (nameLower.includes('rightarm') || nameLower.includes('rightshoulder') || nameLower.includes('arm_r')) {
          this.joints.shoulderRight = o;
        } else if (nameLower.includes('leftleg') || nameLower.includes('leftupleg') || nameLower.includes('leg_l')) {
          this.joints.hipLeft = o;
        } else if (nameLower.includes('rightleg') || nameLower.includes('rightupleg') || nameLower.includes('leg_r')) {
          this.joints.hipRight = o;
        } else if (nameLower.includes('head')) {
          this.joints.head = o;
        } else if (nameLower.includes('hip') || nameLower.includes('pelvis')) {
          this.joints.hip = o;
        }
      }
    });

    // Fallback proxies so character joint references are never undefined
    ['shoulderLeft', 'shoulderRight', 'hipLeft', 'hipRight', 'head', 'hip'].forEach(key => {
      if (!this.joints[key]) {
        const proxy = new THREE.Group();
        this.group.add(proxy);
        this.joints[key] = proxy;
      }
    });
  }

  /**
   * Dynamically swap character mesh/skin while retaining position, rotation, scale, and active animation.
   */
  async swapSkin(newUrlOrKey) {
    this.characterKey = newUrlOrKey;

    try {
      const assetData = await loadModelAsset(newUrlOrKey, { fbxScale: this.fbxScale });
      
      // Save current active action name
      const prevActionName = this.activeActionName || 'idle';

      // 1. Remove and dispose old mesh
      if (this.currentMesh) {
        this.group.remove(this.currentMesh);
        this.disposeMeshNode(this.currentMesh);
        this.currentMesh = null;
      }

      // 2. Stop old mixer
      if (this.mixer) {
        this.mixer.stopAllAction();
        this.mixer.uncacheRoot(this.mixer.getRoot());
        this.mixer = null;
      }

      this.actions = {};

      // 3. Attach new mesh
      this.attachMesh(assetData.scene);
      this.bindJoints(this.currentMesh);

      // 4. Re-bind all existing cached clips to the new mixer
      for (const [key, clip] of Object.entries(this.clips)) {
        if (clip) {
          this.actions[key] = this.mixer.clipAction(clip);
        }
      }

      // 5. Resume animation
      this.playAnimation(prevActionName);
      console.log(`[CharacterModel] Swapped skin for '${this.name}' to '${newUrlOrKey}'`);
    } catch (err) {
      console.error(`[CharacterModel] Failed to swap skin to '${newUrlOrKey}':`, err);
    }
  }

  /**
   * Lazy load an animation clip from the animation registry.
   */
  async loadAnimation(keyOrUrl) {
    const key = keyOrUrl.toLowerCase();
    if (this.actions[key]) return this.actions[key];

    try {
      const clip = await loadAnimationClip(keyOrUrl);
      this.clips[key] = clip;
      if (this.mixer) {
        const action = this.mixer.clipAction(clip);
        this.actions[key] = action;
        return action;
      }
    } catch (err) {
      console.warn(`[CharacterModel] Could not load animation '${keyOrUrl}':`, err);
    }
    return null;
  }

  findAction(name) {
    if (!this.actions || Object.keys(this.actions).length === 0) return null;
    const lowerName = name.toLowerCase();
    if (this.actions[lowerName]) return this.actions[lowerName];

    const aliases = {
      walk: ['walk', 'unarmed walk forward', 'standard walk', 'walking', 'walkcycle'],
      idle: ['idle', 'standing', 'stand', 'default'],
      run: ['run', 'running', 'sprint'],
      pray: ['pray', 'praying'],
      talking: ['talking', 'talk', 'speech'],
      talk: ['talking', 'talk', 'speech'],
      lay: ['female laying pose', 'male laying pose', 'female_laying', 'male_laying', 'laying', 'lay'],
      die: ['dying', 'death from right', 'death_from_right', 'death'],
      jump: ['jump', 'jumping'],
      wave: ['waving gesture', 'waving', 'wave'],
      waving: ['waving gesture', 'waving', 'wave'],
      punch: ['hook punch', 'hook_punch', 'punch'],
      hook_punch: ['hook punch', 'hook_punch', 'punch'],
      kick: ['kicking', 'kick'],
      kicking: ['kicking', 'kick'],
      angry: ['angry', 'angry gesture', 'angry_gesture'],
      standing_up: ['standing up', 'standing_up', 'standup', 'stand up']
    };

    const targets = aliases[lowerName] || [lowerName];

    for (const key of Object.keys(this.actions)) {
      for (const target of targets) {
        if (key.includes(target) || target.includes(key)) {
          return this.actions[key];
        }
      }
    }

    return null;
  }

  /**
   * Play an animation clip with optional crossfading and playback options.
   * Options: { fade: 0.25, loop: true/false, clampWhenFinished: boolean, timeScale: number, force: boolean }
   */
  async playAnimation(name, options = {}) {
    if (this.isDead && !options.resurrect) {
      return; // Dead characters stay dead in their clamped pose
    }

    const lowerName = name.toLowerCase();
    if (lowerName === 'dying' || lowerName === 'die') {
      this.isDead = true;
      options.loop = false;
      options.clampWhenFinished = true;
    }

    let action = this.findAction(lowerName);

    // If clip not loaded yet, attempt lazy loading from ANIMATIONS registry
    if (!action && this.animationSource !== 'embedded') {
      action = await this.loadAnimation(lowerName);
    }

    if (!action) return;

    const fade = options.fade !== undefined ? options.fade : 0.25;
    const loop = options.loop !== undefined ? options.loop : true;
    const clamp = options.clampWhenFinished !== undefined ? options.clampWhenFinished : false;
    const timeScale = options.timeScale !== undefined ? options.timeScale : 1.0;
    const force = options.force || false;

    // 1. Guard against restarting the exact same looping animation if already running
    if (this.activeActionName === lowerName && this.activeAction === action && action.isRunning() && loop) {
      return;
    }

    // 2. Guard: Prevent frame-by-frame movement/idle ticks from interrupting one-shot actions or active emotes
    if (!force) {
      if (this.isOneShotPlaying && this.activeAction && this.activeAction.isRunning()) {
        return; // wait for current one-shot action (jump, kick, punch, wave, etc.) to complete
      }
      if ((lowerName === 'idle' || lowerName === 'walk') && (this.activeActionName === 'talking' || this.activeActionName === 'pray' || this.activeActionName === 'praying' || this.activeActionName === 'angry')) {
        if (this.activeAction && this.activeAction.isRunning()) {
          return; // stay in talking/praying/angry emote while standing still
        }
      }
    }

    this.isOneShotPlaying = !loop;

    action.reset();
    action.timeScale = timeScale;

    if (!loop) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = clamp;

      // Auto-return to idle when one-shot animation finishes (unless clamped or dead)
      if (this.mixer) {
        const onFinished = (e) => {
          if (e.action === action) {
            this.mixer.removeEventListener('finished', onFinished);
            if (!clamp && !this.isDead && lowerName !== 'dying' && lowerName !== 'die') {
              this.isOneShotPlaying = false;
              this.playAnimation('idle', { force: true });
            }
          }
        };
        this.mixer.addEventListener('finished', onFinished);
      }
    } else {
      action.setLoop(THREE.LoopRepeat, Infinity);
    }

    action.fadeIn(fade).play();

    if (this.activeAction && this.activeAction !== action) {
      this.activeAction.fadeOut(fade);
    }

    this.activeAction = action;
    this.activeActionName = lowerName;
  }

  // Animation Helper Methods
  jump(options = {}) {
    return this.playAnimation('jump', { loop: false, ...options });
  }

  talk(options = {}) {
    return this.playAnimation('talking', { loop: true, ...options });
  }

  pray(options = {}) {
    return this.playAnimation('pray', { loop: true, ...options });
  }

  run(options = {}) {
    return this.playAnimation('run', { loop: true, ...options });
  }

  idle(options = {}) {
    return this.playAnimation('idle', { loop: true, ...options });
  }

  wave(options = {}) {
    return this.playAnimation('waving', { loop: false, ...options });
  }

  punch(options = {}) {
    return this.playAnimation('hook_punch', { loop: false, ...options });
  }

  kick(options = {}) {
    return this.playAnimation('kicking', { loop: false, ...options });
  }

  die(options = {}) {
    return this.playAnimation('dying', { loop: false, clampWhenFinished: true, ...options });
  }

  layDown(options = {}) {
    const key = this.gender === 'female' ? 'female_laying' : 'male_laying';
    return this.playAnimation(key, { loop: false, clampWhenFinished: true, ...options });
  }

  standUp(options = {}) {
    return this.playAnimation('standing_up', { loop: false, ...options });
  }

  beAngry(options = {}) {
    return this.playAnimation('angry', { loop: false, ...options });
  }

  walkTo(targetX, targetZ, speed = 3.2, dt = 0.016) {
    const currentPos = this.group.position;
    const dx = targetX - currentPos.x;
    const dz = targetZ - currentPos.z;
    const dist = Math.hypot(dx, dz);

    if (dist > 0.12) {
      const moveDist = Math.min(dist, speed * dt);
      const angle = Math.atan2(dx, dz);
      this.group.rotation.y = angle;
      this.group.position.x += Math.sin(angle) * moveDist;
      this.group.position.z += Math.cos(angle) * moveDist;

      this.playAnimation('walk');
      return false; // Still walking
    } else {
      this.playAnimation('idle');
      return true; // Reached target
    }
  }

  lookAt(targetX, targetZ) {
    const dx = targetX - this.group.position.x;
    const dz = targetZ - this.group.position.z;
    this.group.rotation.y = Math.atan2(dx, dz);
  }

  addTo(scene) {
    scene.add(this.group);
  }

  removeFrom(scene) {
    scene.remove(this.group);
  }

  update(dt, elapsed) {
    const safeDt = (typeof dt === 'number' && dt > 0 && dt < 0.5) ? dt : 0.016;
    if (this.mixer) {
      this.mixer.update(safeDt);
    } else if (this.isProcedural && this.joints.hip) {
      // Procedural sway
      const breath = Math.sin(elapsed * 2.2) * 0.015;
      this.joints.hip.position.y = 0.95 + breath;

      if (this.joints.head) {
        this.joints.head.rotation.y = Math.sin(elapsed * 0.7) * 0.08;
      }
      if (this.joints.shoulderLeft && this.joints.shoulderRight) {
        this.joints.shoulderLeft.rotation.z = Math.sin(elapsed * 1.4) * 0.03;
        this.joints.shoulderRight.rotation.z = -Math.sin(elapsed * 1.4) * 0.03;
      }
    }
  }

  createSculptedHuman() {
    this.isProcedural = true;

    const skinMat = new THREE.MeshPhysicalMaterial({
      color: this.skinTone,
      roughness: 0.45,
      metalness: 0.02,
      sheen: 0.65,
      sheenRoughness: 0.25,
      sheenColor: new THREE.Color(0xffd5b8),
      clearcoat: 0.1,
      clearcoatRoughness: 0.4
    });

    const clothesMat = new THREE.MeshStandardMaterial({
      color: this.clothesColor,
      roughness: 0.85,
      metalness: 0.05
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: this.hairColor,
      roughness: 0.95
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x1a120b });

    const bodyGroup = new THREE.Group();
    this.group.add(bodyGroup);

    const hipJoint = new THREE.Group();
    hipJoint.position.y = 0.95;
    bodyGroup.add(hipJoint);
    this.joints.hip = hipJoint;

    const pelvisGeo = new THREE.CylinderGeometry(0.16, 0.13, 0.18, 12);
    const pelvis = new THREE.Mesh(pelvisGeo, clothesMat);
    pelvis.castShadow = true;
    hipJoint.add(pelvis);

    const chestJoint = new THREE.Group();
    chestJoint.position.set(0, 0.09, 0);
    hipJoint.add(chestJoint);
    this.joints.chest = chestJoint;

    const torsoPoints = [
      new THREE.Vector2(0.14, 0.0),
      new THREE.Vector2(0.12, 0.20),
      new THREE.Vector2(0.19, 0.48),
      new THREE.Vector2(0.22, 0.62)
    ];
    const torsoGeo = new THREE.LatheGeometry(torsoPoints, 16);
    const torsoMesh = new THREE.Mesh(torsoGeo, clothesMat);
    torsoMesh.castShadow = true;
    chestJoint.add(torsoMesh);

    const beltGeo = new THREE.TorusGeometry(0.145, 0.02, 8, 16);
    beltGeo.rotateX(Math.PI / 2);
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x3d2612, roughness: 0.7 });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.y = 0.12;
    chestJoint.add(belt);

    const neckJoint = new THREE.Group();
    neckJoint.position.set(0, 0.62, 0);
    chestJoint.add(neckJoint);
    this.joints.neck = neckJoint;

    const neckGeo = new THREE.CylinderGeometry(0.065, 0.08, 0.14, 10);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = 0.07;
    neckMesh.castShadow = true;
    neckJoint.add(neckMesh);

    const headJoint = new THREE.Group();
    headJoint.position.set(0, 0.14, 0);
    neckJoint.add(headJoint);
    this.joints.head = headJoint;

    const headGeo = new THREE.SphereGeometry(0.14, 18, 18);
    headGeo.scale(0.95, 1.22, 1.05);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.y = 0.14;
    headMesh.castShadow = true;
    headJoint.add(headMesh);

    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), eyeWhiteMat);
    eyeL.position.set(-0.048, 0.155, 0.12);
    const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 8), eyePupilMat);
    pupilL.position.set(0, 0, 0.015);
    eyeL.add(pupilL);

    const eyeR = eyeL.clone();
    eyeR.position.x = 0.048;
    headJoint.add(eyeL, eyeR);

    const noseGeo = new THREE.ConeGeometry(0.018, 0.05, 4);
    noseGeo.rotateX(-0.3);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, 0.135, 0.142);
    headJoint.add(nose);

    const hairGroup = new THREE.Group();
    const strandCount = this.gender === 'female' ? 36 : 28;
    for (let i = 0; i < strandCount; i++) {
      const hLen = this.gender === 'female' ? 0.35 : 0.14;
      const strandGeo = new THREE.CylinderGeometry(0.014, 0.004, hLen, 5);
      strandGeo.rotateX(Math.PI / 3.8);
      const strand = new THREE.Mesh(strandGeo, hairMat);
      const angle = (i / strandCount) * Math.PI * 2;
      strand.position.set(Math.cos(angle) * 0.12, 0.22 + Math.random() * 0.03, Math.sin(angle) * 0.12);
      strand.rotation.y = angle;
      hairGroup.add(strand);
    }
    headJoint.add(hairGroup);

    ['Left', 'Right'].forEach(side => {
      const isLeft = side === 'Left';
      const sign = isLeft ? 1 : -1;

      const shoulder = new THREE.Group();
      shoulder.position.set(sign * 0.23, 0.58, 0);
      chestJoint.add(shoulder);
      this.joints[`shoulder${side}`] = shoulder;

      const upperArmGeo = new THREE.CylinderGeometry(0.055, 0.042, 0.28, 10);
      upperArmGeo.translate(0, -0.14, 0);
      const upperArm = new THREE.Mesh(upperArmGeo, skinMat);
      upperArm.castShadow = true;
      shoulder.add(upperArm);
      this.limbs[`upperArm${side}`] = upperArm;

      const elbow = new THREE.Group();
      elbow.position.set(0, -0.28, 0);
      upperArm.add(elbow);
      this.joints[`elbow${side}`] = elbow;

      const lowerArmGeo = new THREE.CylinderGeometry(0.042, 0.03, 0.26, 10);
      lowerArmGeo.translate(0, -0.13, 0);
      const lowerArm = new THREE.Mesh(lowerArmGeo, skinMat);
      lowerArm.castShadow = true;
      elbow.add(lowerArm);

      const handGeo = new THREE.SphereGeometry(0.038, 8, 8);
      handGeo.scale(0.8, 1.2, 0.6);
      const hand = new THREE.Mesh(handGeo, skinMat);
      hand.position.set(0, -0.27, 0);
      elbow.add(hand);
    });

    ['Left', 'Right'].forEach(side => {
      const isLeft = side === 'Left';
      const sign = isLeft ? 1 : -1;

      const legPivot = new THREE.Group();
      legPivot.position.set(sign * 0.11, -0.05, 0);
      hipJoint.add(legPivot);
      this.joints[`hip${side}`] = legPivot;

      const upperLegGeo = new THREE.CylinderGeometry(0.08, 0.058, 0.44, 10);
      upperLegGeo.translate(0, -0.22, 0);
      const upperLeg = new THREE.Mesh(upperLegGeo, clothesMat);
      upperLeg.castShadow = true;
      legPivot.add(upperLeg);
      this.limbs[`upperLeg${side}`] = upperLeg;

      const knee = new THREE.Group();
      knee.position.set(0, -0.44, 0);
      upperLeg.add(knee);
      this.joints[`knee${side}`] = knee;

      const lowerLegGeo = new THREE.CylinderGeometry(0.058, 0.04, 0.42, 10);
      lowerLegGeo.translate(0, -0.21, 0);
      const lowerLeg = new THREE.Mesh(lowerLegGeo, skinMat);
      lowerLeg.castShadow = true;
      knee.add(lowerLeg);

      const footGeo = new THREE.BoxGeometry(0.07, 0.05, 0.16);
      footGeo.translate(0, -0.025, 0.04);
      const foot = new THREE.Mesh(footGeo, skinMat);
      foot.position.set(0, -0.42, 0);
      knee.add(foot);
    });
  }

  disposeMeshNode(node) {
    if (!node) return;
    node.traverse((child) => {
      if (child.isMesh || child.isSkinnedMesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          } else {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      }
    });
  }

  dispose() {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.mixer.getRoot());
      this.mixer = null;
    }
    this.disposeMeshNode(this.group);
    this.group.clear();
  }
}
