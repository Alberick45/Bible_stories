import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTF_ASSETS } from './AssetRegistry.js';

/**
 * CharacterModel — High-fidelity character entity class supporting external GLTF models
 * (e.g., Mixamo, Ready Player Me, Soldier GLBs) and sculpted realistic PBR humanoid figures.
 */
export class CharacterModel {
  constructor(options = {}) {
    this.name = options.name || 'Character';
    this.gender = options.gender || 'male';
    this.skinTone = options.skinTone || 0xdcb896;
    this.clothesColor = options.clothesColor || 0x4a6fa5;
    this.hairColor = options.hairColor || 0x2b1d0c;
    this.gltfUrl = options.gltfUrl || null;
    this.scale = options.scale || 1.0;
    this.forwardOffset = options.forwardOffset !== undefined ? options.forwardOffset : Math.PI;
    
    this.group = new THREE.Group();
    this.group.name = this.name;
    
    this.mixer = null;
    this.actions = {};
    this.activeAction = null;
    this.isLoaded = false;
    this.isProcedural = false;
    
    // Joint references for animated poses & walking cycles
    this.joints = {};
    this.limbs = {};

    this.init();
  }

  async init() {
    const targetUrl = this.gltfUrl || GLTF_ASSETS[this.name.toLowerCase()];

    if (targetUrl) {
      try {
        await this.loadGLTF(targetUrl);
        this.isLoaded = true;
        return;
      } catch (err) {
        console.warn(`[CharacterModel] Failed to load GLTF asset for '\${this.name}' from \${targetUrl}, falling back to sculpted PBR model.`, err);
      }
    }
    
    this.createSculptedHuman();
    this.isLoaded = true;
  }

  loadGLTF(url) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.scale.setScalar(this.scale);
          model.rotation.y = this.forwardOffset;
          model.traverse((o) => {
            if (o.isMesh || o.isSkinnedMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              o.frustumCulled = false;
            }
          });
          this.group.add(model);

          if (gltf.animations && gltf.animations.length > 0) {
            console.log(`[CharacterModel] Loaded GLTF asset '${this.name}' with ${gltf.animations.length} clips:`, gltf.animations.map(a => a.name));
            this.mixer = new THREE.AnimationMixer(model);
            for (const clip of gltf.animations) {
              this.actions[clip.name] = this.mixer.clipAction(clip);
            }
            this.playAnimation('Idle');
          }
          resolve(gltf);
        },
        undefined,
        (err) => reject(err)
      );
    });
  }

  createSculptedHuman() {
    this.isProcedural = true;

    // 1. Soft Physical Skin Material with Subsurface Sheen & Warmth
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

    // Base Group Scaling
    const bodyGroup = new THREE.Group();
    bodyGroup.scale.setScalar(this.scale);
    this.group.add(bodyGroup);

    // Root Hip Joint (Height ~ 0.95m from ground)
    const hipJoint = new THREE.Group();
    hipJoint.position.y = 0.95;
    bodyGroup.add(hipJoint);
    this.joints.hip = hipJoint;

    // Pelvis Mesh
    const pelvisGeo = new THREE.CylinderGeometry(0.16, 0.13, 0.18, 12);
    const pelvis = new THREE.Mesh(pelvisGeo, clothesMat);
    pelvis.castShadow = true;
    hipJoint.add(pelvis);

    // Torso / Chest Joint (Lathe Revolved Curve for Natural Muscle Taper)
    const chestJoint = new THREE.Group();
    chestJoint.position.set(0, 0.09, 0);
    hipJoint.add(chestJoint);
    this.joints.chest = chestJoint;

    const torsoPoints = [
      new THREE.Vector2(0.14, 0.0),
      new THREE.Vector2(0.12, 0.20), // Waist taper
      new THREE.Vector2(0.19, 0.48), // Ribcage expansion
      new THREE.Vector2(0.22, 0.62)  // Shoulder width
    ];
    const torsoGeo = new THREE.LatheGeometry(torsoPoints, 16);
    const torsoMesh = new THREE.Mesh(torsoGeo, clothesMat);
    torsoMesh.castShadow = true;
    chestJoint.add(torsoMesh);

    // Belt Accent
    const beltGeo = new THREE.TorusGeometry(0.145, 0.02, 8, 16);
    beltGeo.rotateX(Math.PI / 2);
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x3d2612, roughness: 0.7 });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.y = 0.12;
    chestJoint.add(belt);

    // Neck & Head Joint
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

    // Sculpted Head Mesh (Egg-shaped with jaw definition)
    const headGeo = new THREE.SphereGeometry(0.14, 18, 18);
    headGeo.scale(0.95, 1.22, 1.05);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.y = 0.14;
    headMesh.castShadow = true;
    headJoint.add(headMesh);

    // Facial Features (Eyes, Eyebrows, Nose Bridge)
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), eyeWhiteMat);
    eyeL.position.set(-0.048, 0.155, 0.12);
    const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 8), eyePupilMat);
    pupilL.position.set(0, 0, 0.015);
    eyeL.add(pupilL);

    const eyeR = eyeL.clone();
    eyeR.position.x = 0.048;
    headJoint.add(eyeL, eyeR);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.018, 0.05, 4);
    noseGeo.rotateX(-0.3);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, 0.135, 0.142);
    headJoint.add(nose);

    // Hair Strands (Over top of head)
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

    // Arms Setup (Shoulder Pivot -> Upper Arm -> Elbow Pivot -> Lower Arm -> Hand)
    ['Left', 'Right'].forEach(side => {
      const isLeft = side === 'Left';
      const sign = isLeft ? 1 : -1;

      const shoulder = new THREE.Group();
      shoulder.position.set(sign * 0.23, 0.58, 0);
      chestJoint.add(shoulder);
      this.joints[`shoulder\${side}`] = shoulder;

      // Tapered Bicep / Upper Arm
      const upperArmGeo = new THREE.CylinderGeometry(0.055, 0.042, 0.28, 10);
      upperArmGeo.translate(0, -0.14, 0);
      const upperArm = new THREE.Mesh(upperArmGeo, skinMat);
      upperArm.castShadow = true;
      shoulder.add(upperArm);
      this.limbs[`upperArm\${side}`] = upperArm;

      const elbow = new THREE.Group();
      elbow.position.set(0, -0.28, 0);
      upperArm.add(elbow);
      this.joints[`elbow\${side}`] = elbow;

      // Tapered Forearm
      const lowerArmGeo = new THREE.CylinderGeometry(0.042, 0.03, 0.26, 10);
      lowerArmGeo.translate(0, -0.13, 0);
      const lowerArm = new THREE.Mesh(lowerArmGeo, skinMat);
      lowerArm.castShadow = true;
      elbow.add(lowerArm);

      // Hand Mesh
      const handGeo = new THREE.SphereGeometry(0.038, 8, 8);
      handGeo.scale(0.8, 1.2, 0.6);
      const hand = new THREE.Mesh(handGeo, skinMat);
      hand.position.set(0, -0.27, 0);
      elbow.add(hand);
    });

    // Legs Setup (Hip Pivot -> Upper Leg -> Knee Pivot -> Lower Leg -> Foot)
    ['Left', 'Right'].forEach(side => {
      const isLeft = side === 'Left';
      const sign = isLeft ? 1 : -1;

      const legPivot = new THREE.Group();
      legPivot.position.set(sign * 0.11, -0.05, 0);
      hipJoint.add(legPivot);
      this.joints[`hip\${side}`] = legPivot;

      // Tapered Thigh
      const upperLegGeo = new THREE.CylinderGeometry(0.08, 0.058, 0.44, 10);
      upperLegGeo.translate(0, -0.22, 0);
      const upperLeg = new THREE.Mesh(upperLegGeo, clothesMat);
      upperLeg.castShadow = true;
      legPivot.add(upperLeg);
      this.limbs[`upperLeg\${side}`] = upperLeg;

      const knee = new THREE.Group();
      knee.position.set(0, -0.44, 0);
      upperLeg.add(knee);
      this.joints[`knee\${side}`] = knee;

      // Tapered Calf
      const lowerLegGeo = new THREE.CylinderGeometry(0.058, 0.04, 0.42, 10);
      lowerLegGeo.translate(0, -0.21, 0);
      const lowerLeg = new THREE.Mesh(lowerLegGeo, skinMat);
      lowerLeg.castShadow = true;
      knee.add(lowerLeg);

      // Foot Mesh
      const footGeo = new THREE.BoxGeometry(0.07, 0.05, 0.16);
      footGeo.translate(0, -0.025, 0.04);
      const foot = new THREE.Mesh(footGeo, skinMat);
      foot.position.set(0, -0.42, 0);
      knee.add(foot);
    });
  }

  findAction(name) {
    if (!this.actions || Object.keys(this.actions).length === 0) return null;
    if (this.actions[name]) return this.actions[name];

    const lowerName = name.toLowerCase();
    const aliases = {
      walk: ['walk', 'walking', 'walkcycle', 'run', 'running', 'mixamo.com'],
      idle: ['idle', 'standing', 'stand', 'take 001', 'default'],
      run: ['run', 'running', 'sprint', 'walk', 'walking']
    };

    const targets = aliases[lowerName] || [lowerName];

    for (const key of Object.keys(this.actions)) {
      const keyLower = key.toLowerCase();
      for (const target of targets) {
        if (keyLower.includes(target) || target.includes(keyLower)) {
          return this.actions[key];
        }
      }
    }

    return this.actions[Object.keys(this.actions)[0]] || null;
  }

  playAnimation(name, fade = 0.25) {
    if (!this.mixer) return;
    const next = this.findAction(name);
    if (!next || next === this.activeAction) return;

    next.reset().fadeIn(fade).play();
    if (this.activeAction) this.activeAction.fadeOut(fade);
    this.activeAction = next;
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

      if (this.mixer) {
        this.playAnimation('Walk');
      }
      return false; // Still walking
    } else {
      if (this.mixer) {
        this.playAnimation('Idle');
      }
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
      // Breathing & Gentle Body Sway
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

  dispose() {
    if (this.mixer) this.mixer.stopAllAction();
    this.group.traverse((node) => {
      if (node.isMesh) {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) node.material.forEach(m => m.dispose());
          else node.material.dispose();
        }
      }
    });
    this.group.clear();
  }
}
