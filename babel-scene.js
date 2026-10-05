import * as THREE from 'three';
import { gsap } from 'gsap';
import { GrassField, TreeGroup, CharacterModel, PostProcessingManager } from './src/models/index.js';

export class BabelScene {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.clock = new THREE.Clock();
    this.movementEnabled = false;
    this.keys = {};
    this.joystickVector = new THREE.Vector2(0, 0);
    
    // Camera follow variables
    this.yaw = Math.PI * 0.75;
    this.pitch = 0.28;
    this.targetYaw = Math.PI * 0.75;
    this.targetPitch = 0.28;
    
    // Camera mode ('thirdPerson' or 'firstPerson')
    this.cameraMode = 'thirdPerson';
    
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    // Tower growth tracking
    this.currentTier = 0;
    this.towerTiers = [];
    this.brickPiles = [];
    this.scaffolding = [];
    this.workers = [];
    
    this.init();
  }
  
  init() {
    // 1. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);
    
    // 2. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xded1bd); // Sandy dusty sky
    this.scene.fog = new THREE.FogExp2(0xded1bd, 0.005);
    
    // 3. Camera
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(-18, 4.0, 18);
    
    // 4. Lights
    this.hemiLight = new THREE.HemisphereLight(0xfff5ea, 0x5a554a, 1.2);
    this.scene.add(this.hemiLight);
    
    this.sunLight = new THREE.DirectionalLight(0xffecd2, 1.45);
    this.sunLight.position.set(60, 120, 40);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);
    
    // 5. Sandy Clay Plain Terrain (Shinar)
    const groundGeo = new THREE.PlaneGeometry(450, 450, 60, 60);
    groundGeo.rotateX(-Math.PI / 2);
    
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      // Flat central basin for the city, rising slightly at edges
      const distFromCenter = Math.sqrt(x*x + z*z);
      let h = Math.sin(x * 0.015) * Math.cos(z * 0.015) * 2.8;
      if (distFromCenter > 25) {
        h += (distFromCenter - 25) * 0.16;
      }
      posAttr.setY(i, h);
    }
    groundGeo.computeVertexNormals();
    
    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0xc4b295,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    
    // 6. Tower of Babel (Central Procedural Structure)
    this.towerGroup = new THREE.Group();
    this.towerGroup.position.set(0, this.getTerrainHeight(0, 0), 0);
    this.scene.add(this.towerGroup);
    
    const brickColorMat = new THREE.MeshStandardMaterial({ color: 0x8a6a55, roughness: 0.9, flatShading: true }); // Baked clay bricks
    const darkBrickMat = new THREE.MeshStandardMaterial({ color: 0x705543, roughness: 0.9, flatShading: true });
    
    // Design 4 concentric stacked tiers
    const tierConfig = [
      { rBase: 8.0, rTop: 7.2, h: 2.2, segments: 16 },
      { rBase: 6.6, rTop: 5.8, h: 2.2, segments: 14 },
      { rBase: 5.2, rTop: 4.5, h: 2.2, segments: 12 },
      { rBase: 3.9, rTop: 3.2, h: 2.2, segments: 10 }
    ];
    
    let currentY = 0;
    tierConfig.forEach((cfg, idx) => {
      const tierG = new THREE.Group();
      tierG.position.y = currentY;
      
      // Core cylinder
      const core = new THREE.Mesh(new THREE.CylinderGeometry(cfg.rTop, cfg.rBase, cfg.h, cfg.segments), brickColorMat);
      core.position.y = cfg.h / 2;
      core.castShadow = true;
      core.receiveShadow = true;
      tierG.add(core);
      
      // Spiral ramp simulation (stacked decorative step box panels spiraling up)
      for (let s = 0; s < 18; s++) {
        const angle = (s / 18) * Math.PI * 2;
        const radius = cfg.rBase - (s / 18) * (cfg.rBase - cfg.rTop);
        const rampY = (s / 18) * cfg.h;
        
        const rampStep = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 1.4), darkBrickMat);
        rampStep.position.set(Math.sin(angle) * radius, rampY + 0.1, Math.cos(angle) * radius);
        rampStep.rotation.y = angle;
        rampStep.castShadow = true;
        rampStep.receiveShadow = true;
        tierG.add(rampStep);
      }
      
      // Scale down initially so we can animate growth
      tierG.scale.set(0.01, 0.01, 0.01);
      tierG.visible = false;
      
      this.towerGroup.add(tierG);
      this.towerTiers.push(tierG);
      currentY += cfg.h;
    });
    
    // 7. Builder/Construction Site Details (Scaffolding, Brick piles)
    this.constructionDetails = new THREE.Group();
    this.scene.add(this.constructionDetails);
    
    // Create random piles of bricks
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
    for (let p = 0; p < 8; p++) {
      const ang = (p / 8) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 11.5 + Math.random() * 3;
      const px = Math.sin(ang) * dist;
      const pz = Math.cos(ang) * dist;
      const py = this.getTerrainHeight(px, pz);
      
      const pile = new THREE.Group();
      pile.position.set(px, py, pz);
      
      for (let b = 0; b < 6; b++) {
        const brick = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.25), darkBrickMat);
        brick.position.set(
          (Math.random() - 0.5) * 0.6,
          0.1 + b * 0.15,
          (Math.random() - 0.5) * 0.6
        );
        brick.rotation.y = Math.random() * Math.PI;
        brick.castShadow = true;
        pile.add(brick);
      }
      this.constructionDetails.add(pile);
      this.brickPiles.push(pile);
      
      // Add wood scaffolding poles
      if (p % 2 === 0) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.5, 4), woodMat);
        pole.position.set(px - 0.8, py + 2.25, pz + 0.8);
        pole.castShadow = true;
        this.constructionDetails.add(pole);
      }
    }
    
    // 8. Interactive Playable Builder (Nimrod)
    this.builderCharacter = new CharacterModel({
      name: 'Nimrod',
      character: 'builder',
      gender: 'male',
      skinTone: 0xe0a890,
      clothesColor: 0xb8860b
    });
    this.builder = this.builderCharacter.group;
    this.builder.position.set(-11, this.getTerrainHeight(-11, 11), 11);
    this.builder.lookAt(0, this.builder.position.y, 0);
    this.scene.add(this.builder);
    
    // 9. Workers/Builders Group (CharacterModels)
    this.workersGroup = new THREE.Group();
    this.scene.add(this.workersGroup);
    this.workers = [];
    this.workerCharacters = [];
    
    const availableWorkerKeys = ['man1', 'man2', 'megan', 'adam_black', 'adam_white', 'eve_white'];
    const workerColors = [0x556b2f, 0x8b4513, 0xcd853f, 0x5f9ea0, 0x708090, 0x8b7e66];
    
    for (let w = 0; w < 6; w++) {
      const charKey = availableWorkerKeys[w % availableWorkerKeys.length];
      const workerChar = new CharacterModel({
        name: `Worker_${w + 1}`,
        character: charKey,
        clothesColor: workerColors[w]
      });
      const worker = workerChar.group;
      this.workerCharacters.push(workerChar);
      
      // Add a carrying brick
      const carryBrick = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 0.28), darkBrickMat);
      carryBrick.position.set(0, 1.1, 0.4);
      carryBrick.name = 'brick';
      worker.add(carryBrick);
      
      const ang = (w / 6) * Math.PI * 2 + 0.4;
      const rx = Math.sin(ang) * 9.5;
      const rz = Math.cos(ang) * 9.5;
      
      worker.position.set(rx, this.getTerrainHeight(rx, rz), rz);
      worker.lookAt(0, worker.position.y, 0);
      
      worker.userData = {
        wanderAngle: ang + Math.PI / 2,
        speed: 0.8 + Math.random() * 0.5,
        isActive: true
      };
      
      this.workersGroup.add(worker);
      this.workers.push(worker);
    }
    
    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    window.addEventListener('keydown', e => {
      this.keys[e.code] = true;
      if (e.code === 'KeyV' && !e.repeat) {
        this.toggleCameraMode();
      }
    });
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }
  
  toggleCameraMode() {
    this.cameraMode = (this.cameraMode === 'firstPerson') ? 'thirdPerson' : 'firstPerson';
    if (window.showCameraToast) {
      window.showCameraToast(
        this.cameraMode === 'firstPerson'
          ? 'First Person View (Human\'s POV)'
          : 'Third Person View (Full View)'
      );
    }
  }
  
  getTerrainHeight(x, z) {
    const distFromCenter = Math.sqrt(x*x + z*z);
    let h = Math.sin(x * 0.015) * Math.cos(z * 0.015) * 2.8;
    if (distFromCenter > 25) {
      h += (distFromCenter - 25) * 0.16;
    }
    return h + this.ground.position.y;
  }
  
  checkCollision(newX, newZ) {
    // Collision against Tower core base
    const dist = Math.sqrt(newX * newX + newZ * newZ);
    if (dist < 8.2 && this.currentTier > 0) return true;
    return false;
  }
  
  onWindowResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
  
  onMouseDown(e) {
    if (!this.movementEnabled) return;
    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }
  
  onMouseUp() {
    this.isDragging = false;
  }
  
  onMouseMove(e) {
    if (!this.isDragging || !this.movementEnabled) return;
    const deltaX = e.clientX - this.lastMouseX;
    const deltaY = e.clientY - this.lastMouseY;
    
    this.targetYaw -= deltaX * 0.0025;
    this.targetPitch -= deltaY * 0.0025;
    this.targetPitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, this.targetPitch));
    
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }
  
  // Custom timeline events called from main sequence scheduler
  growTowerTier(tierIndex) {
    if (tierIndex < 0 || tierIndex >= this.towerTiers.length) return;
    this.currentTier = tierIndex + 1;
    const tierG = this.towerTiers[tierIndex];
    tierG.visible = true;
    
    // Scale up and spin into existence
    gsap.to(tierG.scale, {
      x: 1.0,
      y: 1.0,
      z: 1.0,
      duration: 2.2,
      ease: 'elastic.out(1, 0.75)'
    });
    
    gsap.to(tierG.rotation, {
      y: Math.PI * 2,
      duration: 2.2
    });
  }
  
  confoundLanguages() {
    this.workers.forEach((w, idx) => {
      // Confused hand animations
      gsap.to(w.children[2].rotation, { x: -Math.PI * 0.9, y: (idx % 2 === 0 ? 0.3 : -0.3), duration: 0.5, repeat: -1, yoyo: true });
      gsap.to(w.children[3].rotation, { x: -Math.PI * 0.9, y: (idx % 2 === 0 ? -0.3 : 0.3), duration: 0.5, repeat: -1, yoyo: true });
    });
  }
  
  scatterWorkers() {
    this.workers.forEach((w, idx) => {
      w.userData.isActive = false;
      
      // Find the carried brick and drop it
      const brick = w.getObjectByName('brick');
      if (brick) {
        // Detach and drop
        w.remove(brick);
        this.scene.add(brick);
        // Set position to where the hand was
        const worldPos = new THREE.Vector3();
        brick.getWorldPosition(worldPos);
        brick.position.copy(worldPos);
        
        gsap.to(brick.position, {
          y: this.getTerrainHeight(brick.position.x, brick.position.z) + 0.1,
          duration: 0.6,
          ease: 'bounce.out'
        });
      }
      
      // Make worker arms flail around in panic
      gsap.to(w.children[2].rotation, { x: -Math.PI, duration: 0.3, repeat: -1, yoyo: true });
      gsap.to(w.children[3].rotation, { x: -Math.PI, duration: 0.3, repeat: -1, yoyo: true });
      
      // Scatter workers in outward directions
      const escapeAngle = (idx / this.workers.length) * Math.PI * 2 + Math.random() * 0.4;
      const targetX = w.position.x + Math.sin(escapeAngle) * 55;
      const targetZ = w.position.z + Math.cos(escapeAngle) * 55;
      
      w.lookAt(targetX, w.position.y, targetZ);
      
      gsap.to(w.position, {
        x: targetX,
        z: targetZ,
        duration: 5.5,
        ease: 'power1.in',
        onUpdate: () => {
          w.position.y = this.getTerrainHeight(w.position.x, w.position.z);
        },
        onComplete: () => {
          w.visible = false;
        }
      });
    });
  }
  
  unlockControls() {
    this.movementEnabled = true;
    this.targetYaw = Math.PI * 0.75;
    this.targetPitch = -0.18;
  }
  
  growTowerTierImmediate(tierIndex) {
    if (tierIndex < 0 || tierIndex >= this.towerTiers.length) return;
    this.currentTier = tierIndex + 1;
    const tierG = this.towerTiers[tierIndex];
    tierG.visible = true;
    gsap.killTweensOf(tierG.scale);
    gsap.killTweensOf(tierG.rotation);
    tierG.scale.set(1.0, 1.0, 1.0);
    tierG.rotation.y = Math.PI * 2;
  }
  
  confoundLanguagesImmediate() {
    this.workers.forEach((w, idx) => {
      gsap.killTweensOf(w.children[2].rotation);
      gsap.killTweensOf(w.children[3].rotation);
      w.children[2].rotation.set(-Math.PI * 0.9, (idx % 2 === 0 ? 0.3 : -0.3), 0);
      w.children[3].rotation.set(-Math.PI * 0.9, (idx % 2 === 0 ? -0.3 : 0.3), 0);
    });
  }
  
  scatterWorkersImmediate() {
    this.workers.forEach((w, idx) => {
      w.userData.isActive = false;
      gsap.killTweensOf(w.children[2].rotation);
      gsap.killTweensOf(w.children[3].rotation);
      gsap.killTweensOf(w.position);
      
      const brick = w.getObjectByName('brick');
      if (brick) {
        w.remove(brick);
      }
      w.visible = false;
    });
  }
  
  destroy() {
    this.renderer.domElement.remove();
    this.renderer.dispose();
    
    // Remove listeners
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    window.removeEventListener('mouseup', this.onMouseUp.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }
  
  update(elapsed, dt) {
    if (this.builderCharacter) this.builderCharacter.update(dt, elapsed);
    if (this.workerCharacters) this.workerCharacters.forEach(c => c.update(dt, elapsed));
    
    // 1. Worker slight pacing/patrolling behavior if still active
    this.workers.forEach(w => {
      if (w.userData.isActive && w.visible) {
        const speed = w.userData.speed;
        const dx = Math.sin(w.userData.wanderAngle) * speed * dt;
        const dz = Math.cos(w.userData.wanderAngle) * speed * dt;
        
        w.position.x += dx;
        w.position.z += dz;
        w.position.y = this.getTerrainHeight(w.position.x, w.position.z);
        w.lookAt(w.position.x + dx * 10, w.position.y, w.position.z + dz * 10);
        
        w.position.y += Math.abs(Math.sin(elapsed * 4.5)) * 0.12;
        
        const dist = Math.sqrt(w.position.x * w.position.x + w.position.z * w.position.z);
        if (dist < 8.8) {
          // Steer away from the center (tower base)
          w.userData.wanderAngle = Math.atan2(w.position.x, w.position.z) + (Math.random() - 0.5) * 1.0;
        } else if (dist > 14.5) {
          // Steer back towards the center
          w.userData.wanderAngle = Math.atan2(-w.position.x, -w.position.z) + (Math.random() - 0.5) * 1.0;
        }
      }
    });
    
    // 2. Playable Builder controls
    this.yaw += (this.targetYaw - this.yaw) * 0.1;
    this.pitch += (this.targetPitch - this.pitch) * 0.1;
    
    if (this.movementEnabled && this.builder.visible) {
      const isRunning = !!(this.keys['ShiftLeft'] || this.keys['ShiftRight'] || this.keys['Shift']);
      const speed = (isRunning ? 5.2 : 2.5) * dt;
      
      const camForward = new THREE.Vector3();
      this.camera.getWorldDirection(camForward);
      camForward.y = 0;
      camForward.normalize();
      
      const camRight = new THREE.Vector3();
      camRight.crossVectors(camForward, this.camera.up).normalize();
      
      const move = new THREE.Vector3();
      
      if (this.keys['KeyW'] || this.keys['ArrowUp']) move.add(camForward);
      if (this.keys['KeyS'] || this.keys['ArrowDown']) move.sub(camForward);
      if (this.keys['KeyD'] || this.keys['ArrowRight']) move.add(camRight);
      if (this.keys['KeyA'] || this.keys['ArrowLeft']) move.sub(camRight);
      
      if (this.joystickVector && this.joystickVector.lengthSq() > 0) {
        const joyForward = camForward.clone().multiplyScalar(this.joystickVector.y);
        const joyRight = camRight.clone().multiplyScalar(this.joystickVector.x);
        move.add(joyForward).add(joyRight);
      }
      
      if (move.lengthSq() > 0) {
        move.normalize().multiplyScalar(speed);
        
        const newX = this.builder.position.x + move.x;
        const newZ = this.builder.position.z + move.z;
        
        if (!this.checkCollision(newX, newZ)) {
          this.builder.position.x = newX;
          this.builder.position.z = newZ;
          this.builder.position.y = this.getTerrainHeight(newX, newZ);
        }
        
        const targetAngle = Math.atan2(move.x, move.z);
        this.builder.rotation.y = targetAngle;
        
        if (this.builderCharacter) {
          if (this.builderCharacter.mixer) {
            this.builderCharacter.playAnimation(isRunning ? 'run' : 'walk', { force: true });
          } else if (this.builderCharacter.joints) {
            const swing = Math.sin(elapsed * (isRunning ? 14.0 : 9.0)) * 0.42;
            if (this.builderCharacter.joints.hipLeft) this.builderCharacter.joints.hipLeft.rotation.x = swing;
            if (this.builderCharacter.joints.hipRight) this.builderCharacter.joints.hipRight.rotation.x = -swing;
          }
        } else if (this.builder.children && this.builder.children.length > 5) {
          const swing = Math.sin(elapsed * 9.0) * 0.42;
          this.builder.children[4].rotation.x = swing;
          this.builder.children[5].rotation.x = -swing;
          this.builder.children[2].rotation.x = -swing;
          this.builder.children[3].rotation.x = swing;
        }
      } else {
        if (this.builderCharacter) {
          if (this.builderCharacter.mixer) {
            this.builderCharacter.playAnimation('Idle');
          } else if (this.builderCharacter.joints) {
            if (this.builderCharacter.joints.hipLeft) this.builderCharacter.joints.hipLeft.rotation.x *= 0.85;
            if (this.builderCharacter.joints.hipRight) this.builderCharacter.joints.hipRight.rotation.x *= 0.85;
          }
        } else if (this.builder.children && this.builder.children.length > 5) {
          this.builder.children[4].rotation.x *= 0.85;
          this.builder.children[5].rotation.x *= 0.85;
          this.builder.children[2].rotation.x *= 0.85;
          this.builder.children[3].rotation.x *= 0.85;
        }
      }
      
      if (this.cameraMode === 'firstPerson') {
        this.builder.visible = false;
        const eyePos = new THREE.Vector3(this.builder.position.x, this.builder.position.y + 1.65, this.builder.position.z);
        this.camera.position.lerp(eyePos, 0.25);
        
        const forwardDir = new THREE.Vector3(
          -Math.sin(this.yaw) * Math.cos(this.pitch),
          -Math.sin(this.pitch),
          -Math.cos(this.yaw) * Math.cos(this.pitch)
        );
        const lookTarget = eyePos.clone().add(forwardDir.multiplyScalar(10.0));
        this.camera.lookAt(lookTarget);
      } else {
        this.builder.visible = true;
        const springArmDist = 6.2;
        const camOffset = new THREE.Vector3(
          Math.sin(this.yaw) * Math.cos(this.pitch) * springArmDist,
          Math.sin(this.pitch) * springArmDist + 2.2, // Elevated height to stay clear of grass
          Math.cos(this.yaw) * Math.cos(this.pitch) * springArmDist
        );
        
        const targetCamPos = this.builder.position.clone().add(camOffset);
        this.camera.position.lerp(targetCamPos, 0.15);
        
        const lookTarget = new THREE.Vector3(this.builder.position.x, this.builder.position.y + 1.4, this.builder.position.z);
        this.camera.lookAt(lookTarget);
      }
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}
