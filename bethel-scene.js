import * as THREE from 'three';
import gsap from 'gsap';
import { CharacterModel } from './src/models/CharacterModel.js';

export class BethelScene {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Zoom & camera controls
    this.zoomLevel = 1.0;
    this.baseFov = 55;
    this.touchPinchDist = null;
    this.cameraMode = 'thirdPerson';
    this.yaw = 0.0;
    this.pitch = 0.18;
    this.targetYaw = 0.0;
    this.targetPitch = 0.18;
    this.movementEnabled = false;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.keys = {};

    this.init();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050813); // Deep sacred nocturnal blue
    this.scene.fog = new THREE.FogExp2(0x050813, 0.005);

    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(0, 4.0, 18);

    // Starlight & Celestial Glow
    this.hemiLight = new THREE.HemisphereLight(0x283b5e, 0x0c101b, 0.85);
    this.scene.add(this.hemiLight);

    this.moonLight = new THREE.DirectionalLight(0xbdd8ff, 1.1);
    this.moonLight.position.set(25, 70, -35);
    this.moonLight.castShadow = true;
    this.moonLight.shadow.mapSize.width = 1024;
    this.moonLight.shadow.mapSize.height = 1024;
    this.scene.add(this.moonLight);

    // 1. Rocky Wilderness Terrain (Luz / Bethel)
    const groundGeo = new THREE.PlaneGeometry(450, 450, 60, 60);
    groundGeo.rotateX(-Math.PI / 2);
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      posAttr.setY(i, this.getTerrainHeight(x, z));
    }
    groundGeo.computeVertexNormals();

    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0x272b22,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    // 2. Starry Celestial Vault (3,000 twinkling stars)
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 240 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 2.05);

      starPositions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi) + 5;
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const t = 0.8 + Math.random() * 0.2;
      starColors[i * 3 + 0] = t;
      starColors[i * 3 + 1] = t * 0.95;
      starColors[i * 3 + 2] = t * 1.1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    this.starPoints = new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    }));
    this.scene.add(this.starPoints);

    // 3. Scattered Desert Stones & Rocks of Bethel
    const rockGeo = new THREE.DodecahedronGeometry(1, 1);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x484239, roughness: 0.92, flatShading: true });
    for (let r = 0; r < 36; r++) {
      const rock = new THREE.Mesh(rockGeo, rockMat);
      const rx = (Math.random() - 0.5) * 80;
      const rz = (Math.random() - 0.5) * 80;
      if (Math.abs(rx) < 6 && Math.abs(rz) < 6) continue;
      const ry = this.getTerrainHeight(rx, rz);
      const scale = 0.4 + Math.random() * 0.9;
      rock.scale.set(scale * (0.8 + Math.random() * 0.4), scale * 0.6, scale);
      rock.position.set(rx, ry + scale * 0.3, rz);
      rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      rock.castShadow = true;
      this.scene.add(rock);
    }

    // 4. Sacred Stone Pillow & Pillar
    this.stonePillarGroup = new THREE.Group();
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x8a7f6e,
      roughness: 0.85,
      flatShading: true
    });
    // The pillow stone where Jacob rested his head
    this.pillowStone = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 1.0), pillarMat);
    this.pillowStone.position.set(0, 0.22, 0);
    this.pillowStone.castShadow = true;
    this.stonePillarGroup.add(this.pillowStone);

    // Upright Bethel monument stone
    this.standingPillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.6, 0.6), pillarMat);
    this.standingPillar.position.set(-1.8, 1.3, 0.2);
    this.standingPillar.castShadow = true;
    this.stonePillarGroup.add(this.standingPillar);

    const pillarX = 0;
    const pillarZ = -4.0;
    const pillarY = this.getTerrainHeight(pillarX, pillarZ);
    this.stonePillarGroup.position.set(pillarX, pillarY, pillarZ);
    this.scene.add(this.stonePillarGroup);

    // Sacred pillar oil glow
    const holyPillarGlow = new THREE.PointLight(0xffdf88, 1.4, 15);
    holyPillarGlow.position.set(0, 2.5, 0);
    this.stonePillarGroup.add(holyPillarGlow);

    // 5. THE CELESTIAL LADDER OF ANGELS (Genesis 28:12)
    // A radiant golden stairway ascending from earth into open heavens
    this.ladderGroup = new THREE.Group();
    this.scene.add(this.ladderGroup);
    this.ladderGroup.position.set(0, pillarY + 0.3, pillarZ - 1.5);

    // Golden ethereal stair treads
    const stepCount = 28;
    const stepMat = new THREE.MeshStandardMaterial({
      color: 0xffe699,
      emissive: 0xd4a017,
      emissiveIntensity: 0.65,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2
    });

    const railMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xb8860b,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85
    });

    for (let s = 0; s < stepCount; s++) {
      const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.18, 0.8), stepMat);
      stepMesh.position.set(0, s * 1.8, -s * 1.6);
      this.ladderGroup.add(stepMesh);
    }

    // Two radiant side rails
    const railHeight = stepCount * 2.45;
    const leftRail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, railHeight, 8), railMat);
    leftRail.position.set(-1.85, (stepCount * 1.8) / 2, -(stepCount * 1.6) / 2);
    leftRail.rotation.x = Math.atan2(stepCount * 1.6, stepCount * 1.8);
    this.ladderGroup.add(leftRail);

    const rightRail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, railHeight, 8), railMat);
    rightRail.position.set(1.85, (stepCount * 1.8) / 2, -(stepCount * 1.6) / 2);
    rightRail.rotation.x = Math.atan2(stepCount * 1.6, stepCount * 1.8);
    this.ladderGroup.add(rightRail);

    // Heavenly portal glow at the summit
    this.heavenGlow = new THREE.PointLight(0xfff6c4, 4.5, 90);
    this.heavenGlow.position.set(0, stepCount * 1.8 + 4, -stepCount * 1.6 - 5);
    this.ladderGroup.add(this.heavenGlow);

    // Heavenly portal ring
    const portalGeo = new THREE.TorusGeometry(8, 0.35, 16, 64);
    const portalMat = new THREE.MeshBasicMaterial({
      color: 0xfff0aa,
      transparent: true,
      opacity: 0.85
    });
    this.portalRing = new THREE.Mesh(portalGeo, portalMat);
    this.portalRing.position.set(0, stepCount * 1.8 + 5, -stepCount * 1.6 - 6);
    this.portalRing.rotation.x = 0.3;
    this.ladderGroup.add(this.portalRing);

    // 6. Ascending & Descending Angel Light Particles
    const angelCount = 64;
    this.angelParticles = [];
    const angelMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    const angelGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffe277,
      transparent: true,
      opacity: 0.45
    });
    const sphereGeo = new THREE.SphereGeometry(0.32, 12, 12);
    const glowGeo = new THREE.SphereGeometry(0.75, 12, 12);

    for (let a = 0; a < angelCount; a++) {
      const angelMesh = new THREE.Group();
      const core = new THREE.Mesh(sphereGeo, angelMat);
      const aura = new THREE.Mesh(glowGeo, angelGlowMat);
      angelMesh.add(core);
      angelMesh.add(aura);

      const progress = Math.random();
      const speed = (0.0012 + Math.random() * 0.0018) * (Math.random() > 0.5 ? 1 : -1);
      const lateral = (Math.random() - 0.5) * 2.8;

      angelMesh.userData = {
        progress,
        speed,
        lateral,
        maxSteps: stepCount
      };

      this.ladderGroup.add(angelMesh);
      this.angelParticles.push(angelMesh);
    }

    // 7. Interactive Waypoint Indicator at Bethel
    const ringGeo = new THREE.RingGeometry(1.6, 2.2, 32);
    ringGeo.rotateX(-Math.PI / 2);
    this.targetMarker = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, transparent: true, opacity: 0.75 })
    );
    this.targetMarker.position.set(pillarX, pillarY + 0.12, pillarZ + 3.0);
    this.scene.add(this.targetMarker);

    // 8. Initialize Jacob CharacterModel
    this.initJacob();

    // Event listeners & controls
    this.setupControls();
    this.setupZoomEvents();
  }

  unlockControls() {
    this.movementEnabled = true;
    if (this.keys) this.keys = {};
  }

  getTerrainHeight(x, z) {
    const d = Math.sqrt(x * x + z * z);
    const rolling = Math.sin(x * 0.04) * Math.cos(z * 0.04) * 2.8;
    const ridge = Math.cos(x * 0.02 + z * 0.03) * 3.5;
    const basin = Math.exp(-d * 0.035) * -1.8;
    return rolling + ridge + basin;
  }

  initJacob() {
    this.jacobCharacter = new CharacterModel({
      name: 'Jacob',
      character: 'man1',
      clothesColor: 0x3d5a80
    });
    this.jacob = this.jacobCharacter.group;
    const startX = 0;
    const startZ = 7.0;
    const startY = this.getTerrainHeight(startX, startZ);
    this.jacob.position.set(startX, startY, startZ);
    this.jacob.lookAt(0, startY, 0);
    this.scene.add(this.jacob);
    this.player = this.jacob;
    this.characterLoaded = true;
  }

  setupControls() {
    this.onKeyDown = (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    this.onKeyUp = (e) => {
      this.keys[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    // Mouse look drag
    this.onMouseDown = (e) => {
      if (e.target.closest('#hud-panel, #hub-panel, #scroll-panel, #action-bar, #joystick-zone')) return;
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    };
    this.onMouseMove = (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;

      this.targetYaw -= dx * 0.005;
      this.targetPitch = Math.max(-0.25, Math.min(0.75, this.targetPitch + dy * 0.004));
    };
    this.onMouseUp = () => {
      this.isDragging = false;
    };
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    this.onResize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    };
    window.addEventListener('resize', this.onResize);
  }

  setupZoomEvents() {
    this.onWheel = (e) => {
      if (e.target.closest('#scroll-panel, #hub-panel')) return;
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0015;
      this.setZoom(this.zoomLevel + zoomDelta);
    };
    window.addEventListener('wheel', this.onWheel, { passive: false });

    // Touch pinch zoom
    this.onTouchStart = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.touchPinchDist = Math.hypot(dx, dy);
      }
    };
    this.onTouchMove = (e) => {
      if (e.touches.length === 2 && this.touchPinchDist !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const diff = dist - this.touchPinchDist;
        this.touchPinchDist = dist;
        this.setZoom(this.zoomLevel + diff * 0.006);
      }
    };
    this.onTouchEnd = (e) => {
      if (e.touches.length < 2) {
        this.touchPinchDist = null;
      }
    };
    window.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchEnd, { passive: true });
  }

  setZoom(level) {
    this.zoomLevel = Math.max(0.5, Math.min(2.0, level));
    const targetFov = this.baseFov / this.zoomLevel;
    this.camera.fov = targetFov;
    this.camera.updateProjectionMatrix();

    if (window.updateZoomUI) {
      window.updateZoomUI(this.zoomLevel);
    }
  }

  update(elapsed, dt) {
    const delta = Math.min(dt || 0.016, 0.1);

    if (this.jacobCharacter) {
      this.jacobCharacter.update(delta, elapsed);
    }

    // Portal rotation and heavenly glow pulsation
    if (this.portalRing) {
      this.portalRing.rotation.z += delta * 0.25;
    }
    if (this.heavenGlow) {
      this.heavenGlow.intensity = 4.0 + Math.sin(elapsed * 2.5) * 1.2;
    }

    // Animate Ascending and Descending Angels
    if (this.angelParticles && this.angelParticles.length > 0) {
      for (const angel of this.angelParticles) {
        angel.userData.progress += angel.userData.speed;
        if (angel.userData.progress > 1.0) angel.userData.progress = 0.0;
        if (angel.userData.progress < 0.0) angel.userData.progress = 1.0;

        const p = angel.userData.progress;
        const stepIdx = p * angel.userData.maxSteps;
        const y = stepIdx * 1.8 + Math.sin(elapsed * 3 + p * 10) * 0.35;
        const z = -stepIdx * 1.6;
        const x = angel.userData.lateral + Math.cos(elapsed * 2 + p * 8) * 0.2;

        angel.position.set(x, y, z);
      }
    }

    // Animate target marker pulse
    if (this.targetMarker) {
      this.targetMarker.rotation.z += delta * 0.6;
      const s = 1.0 + Math.sin(elapsed * 3.0) * 0.08;
      this.targetMarker.scale.set(s, s, s);
    }

    // Smooth camera yaw/pitch
    this.yaw += (this.targetYaw - this.yaw) * 0.1;
    this.pitch += (this.targetPitch - this.pitch) * 0.1;

    // Movement & Character controls
    if (this.movementEnabled && this.jacob) {
      let moveX = 0;
      let moveZ = 0;

      if (this.keys['w'] || this.keys['arrowup']) moveZ -= 1;
      if (this.keys['s'] || this.keys['arrowdown']) moveZ += 1;
      if (this.keys['a'] || this.keys['arrowleft']) moveX -= 1;
      if (this.keys['d'] || this.keys['arrowright']) moveX += 1;

      if (window.joystickVector && (window.joystickVector.x !== 0 || window.joystickVector.y !== 0)) {
        moveX = window.joystickVector.x;
        moveZ = -window.joystickVector.y;
      }

      const len = Math.hypot(moveX, moveZ);
      if (len > 0.05) {
        const normX = moveX / Math.max(1, len);
        const normZ = moveZ / Math.max(1, len);

        const cosY = Math.cos(this.yaw);
        const sinY = Math.sin(this.yaw);
        const worldDirX = normX * cosY - normZ * sinY;
        const worldDirZ = normX * sinY + normZ * cosY;

        const speed = 4.2 * delta;
        this.jacob.position.x += worldDirX * speed;
        this.jacob.position.z += worldDirZ * speed;
        this.jacob.position.y = this.getTerrainHeight(this.jacob.position.x, this.jacob.position.z);

        const targetRot = Math.atan2(worldDirX, worldDirZ);
        let diff = targetRot - this.jacob.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.jacob.rotation.y += diff * 0.18;

        if (this.jacobCharacter && this.characterLoaded) {
          this.jacobCharacter.playAnimation('walk');
        }
      } else {
        if (this.jacobCharacter && this.characterLoaded) {
          this.jacobCharacter.playAnimation('idle');
        }
      }
    }

    // Camera follow player
    if (this.jacob) {
      const pPos = this.jacob.position;
      const dist = 7.5;
      const camX = pPos.x + Math.sin(this.yaw) * dist * Math.cos(this.pitch);
      const camZ = pPos.z + Math.cos(this.yaw) * dist * Math.cos(this.pitch);
      const camY = pPos.y + 1.8 + Math.sin(this.pitch) * dist;

      this.camera.position.set(camX, Math.max(camY, this.getTerrainHeight(camX, camZ) + 1.2), camZ);
      this.camera.lookAt(pPos.x, pPos.y + 1.6, pPos.z);
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
