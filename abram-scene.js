import * as THREE from 'three';
import gsap from 'gsap';
import { CharacterModel } from './src/models/CharacterModel.js';

export class AbramScene {
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
    this.pitch = 0.15;
    this.targetYaw = 0.0;
    this.targetPitch = 0.15;
    this.movementEnabled = false;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.keys = {};
    
    this.starWaypoints = [];
    this.visitedWaypoints = new Set();
    
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
    this.scene.background = new THREE.Color(0x060914); // Deep twilight night sky
    this.scene.fog = new THREE.FogExp2(0x060914, 0.006);

    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(0, 3.8, 16);

    // Starlight & Ambient Lighting
    this.hemiLight = new THREE.HemisphereLight(0x2a3d5e, 0x12151e, 0.85);
    this.scene.add(this.hemiLight);

    this.moonLight = new THREE.DirectionalLight(0xa5c2eb, 1.25);
    this.moonLight.position.set(30, 80, -40);
    this.moonLight.castShadow = true;
    this.moonLight.shadow.mapSize.width = 1024;
    this.moonLight.shadow.mapSize.height = 1024;
    this.scene.add(this.moonLight);

    // 1. Canaan Hills Terrain
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
      color: 0x2e352b,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    // 2. Starry Celestial Canopy (3,500 Twinkling Stars)
    const starCount = 3500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 240 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 2.05); // Above horizon dome

      starPositions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi) + 5;
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const tone = 0.85 + Math.random() * 0.15;
      starColors[i * 3 + 0] = tone;
      starColors[i * 3 + 1] = tone * 0.98;
      starColors[i * 3 + 2] = tone * 1.08;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    this.starPoints = new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.92
    }));
    this.scene.add(this.starPoints);

    // 3. Abram's Nomad Encampment (Goatskin Tent, Campfire, Altar)
    this.campGroup = new THREE.Group();
    this.scene.add(this.campGroup);

    // Large Bedouin Goatskin Tent
    const tentMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.92 });
    const tentRoofGeo = new THREE.ConeGeometry(5.2, 3.2, 5);
    const tentRoof = new THREE.Mesh(tentRoofGeo, tentMat);
    tentRoof.position.set(-6.5, this.getTerrainHeight(-6.5, -4.0) + 1.6, -4.0);
    tentRoof.scale.set(1.4, 0.9, 1.8);
    tentRoof.castShadow = true;
    this.campGroup.add(tentRoof);

    // Campfire with flickering warm glow
    const fireX = 0;
    const fireZ = 2;
    const fireY = this.getTerrainHeight(fireX, fireZ);
    this.fireLight = new THREE.PointLight(0xff7722, 2.5, 18);
    this.fireLight.position.set(fireX, fireY + 0.6, fireZ);
    this.campGroup.add(this.fireLight);

    const logMat = new THREE.MeshStandardMaterial({ color: 0x22130c, roughness: 0.9 });
    for (let l = 0; l < 4; l++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 5), logMat);
      log.position.set(fireX, fireY + 0.1, fireZ);
      log.rotation.set(0.3, (l * Math.PI) / 2, 0.3);
      this.campGroup.add(log);
    }

    // Sacred Stone Altar at Bethel
    const altarX = 8.0;
    const altarZ = -2.0;
    const altarY = this.getTerrainHeight(altarX, altarZ);
    this.altar = new THREE.Group();
    this.altar.position.set(altarX, altarY, altarZ);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6e685f, roughness: 0.95, flatShading: true });
    for (let s = 0; s < 5; s++) {
      const stone = new THREE.Mesh(new THREE.BoxGeometry(1.6 - s * 0.22, 0.35, 1.3 - s * 0.18), stoneMat);
      stone.position.y = s * 0.32 + 0.18;
      stone.rotation.y = (s * 0.3);
      stone.castShadow = true;
      this.altar.add(stone);
    }
    this.campGroup.add(this.altar);

    // 4. Palm Trees & Landscape Vegetation
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3525, roughness: 0.9 });
    const frondMat = new THREE.MeshStandardMaterial({ color: 0x2d4427, roughness: 0.8 });
    const treePositions = [
      [-14, 6], [-12, -10], [14, 8], [16, -8]
    ];
    treePositions.forEach(([tx, tz]) => {
      const ty = this.getTerrainHeight(tx, tz);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 5.5, 6), trunkMat);
      trunk.position.set(tx, ty + 2.75, tz);
      trunk.castShadow = true;

      const crown = new THREE.Mesh(new THREE.ConeGeometry(2.4, 1.6, 6), frondMat);
      crown.position.set(tx, ty + 5.8, tz);
      crown.castShadow = true;

      this.scene.add(trunk, crown);
    });

    // 5. Playable Patriarch: Abram (Abraham)
    this.abramCharacter = new CharacterModel({
      name: 'Abram',
      character: 'man1',
      clothesColor: 0x5a4a3a
    });
    this.abram = this.abramCharacter.group;
    this.abram.position.set(0, this.getTerrainHeight(0, 8.0), 8.0);
    this.abram.lookAt(0, this.abram.position.y, 0);
    this.scene.add(this.abram);
    this.player = this.abram;

    // 6. 3 Glowing Star Promise Waypoints
    const waypointConfigs = [
      { x: -10.0, z: 6.0, text: 'Promise 1: "I will make of thee a great nation, and I will bless thee."' },
      { x: 10.0,  z: 6.0, text: 'Promise 2: "Unto thy seed will I give this land forever."' },
      { x: 0.0,   z: -8.0, text: 'Promise 3: "Look toward heaven, and tell the stars: So shall thy seed be!"' }
    ];

    waypointConfigs.forEach((wc, idx) => {
      const wy = this.getTerrainHeight(wc.x, wc.z);
      const wpGroup = new THREE.Group();
      wpGroup.position.set(wc.x, wy, wc.z);

      // Luminous celestial pillar
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.45, 4.5, 12, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xffe899, transparent: true, opacity: 0.55 })
      );
      beam.position.y = 2.25;

      const starCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.35),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      starCore.position.y = 3.6;

      wpGroup.add(beam, starCore);
      wpGroup.userData = { id: idx + 1, promiseText: wc.text };
      this.scene.add(wpGroup);
      this.starWaypoints.push(wpGroup);
    });

    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.renderer.domElement.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    this.renderer.domElement.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    this.renderer.domElement.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    this.renderer.domElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    window.addEventListener('keydown', e => {
      this.keys[e.code] = true;
      if (e.code === 'KeyV' && !e.repeat) this.toggleCameraMode();
      else if ((e.code === 'Equal' || e.code === 'NumpadAdd') && !e.repeat) this.zoomIn();
      else if ((e.code === 'Minus' || e.code === 'NumpadSubtract') && !e.repeat) this.zoomOut();
      else if (e.code === 'Digit0' && !e.repeat) this.resetZoom();
    });
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }

  unlockControls() {
    this.movementEnabled = true;
    if (this.keys) this.keys = {};
  }

  setZoom(level) {
    this.zoomLevel = Math.max(0.5, Math.min(2.5, level));
    if (this.camera) {
      this.camera.fov = this.baseFov / this.zoomLevel;
      this.camera.updateProjectionMatrix();
    }
    if (window.updateZoomUI) window.updateZoomUI(this.zoomLevel);
  }

  zoomIn(delta = 0.15) { this.setZoom(this.zoomLevel + delta); }
  zoomOut(delta = 0.15) { this.setZoom(this.zoomLevel - delta); }
  resetZoom() { this.setZoom(1.0); }

  onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    this.setZoom(this.zoomLevel + delta);
  }

  onTouchStart(e) {
    if (e.touches && e.touches.length === 2) {
      this.touchPinchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }

  onTouchMove(e) {
    if (e.touches && e.touches.length === 2 && this.touchPinchDist) {
      e.preventDefault();
      const currentDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const ratio = currentDist / this.touchPinchDist;
      if (Math.abs(ratio - 1.0) > 0.03) {
        this.setZoom(this.zoomLevel * ratio);
        this.touchPinchDist = currentDist;
      }
    }
  }

  onTouchEnd() { this.touchPinchDist = null; }

  toggleCameraMode() {
    this.cameraMode = (this.cameraMode === 'firstPerson') ? 'thirdPerson' : 'firstPerson';
    if (window.showCameraToast) {
      window.showCameraToast(this.cameraMode === 'firstPerson' ? 'First Person (Abram POV)' : 'Third Person (Full View)');
    }
  }

  getTerrainHeight(x, z) {
    return Math.sin(x * 0.02) * Math.cos(z * 0.02) * 2.2 + Math.sin(x * 0.06) * 0.4 + (this.ground ? this.ground.position.y : 0);
  }

  unlockControls() {
    this.movementEnabled = true;
    this.targetYaw = 0.0;
    this.targetPitch = 0.15;
  }

  onMouseDown(e) {
    if (!this.movementEnabled) return;
    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }

  onMouseUp() { this.isDragging = false; }

  onMouseMove(e) {
    if (!this.isDragging || !this.movementEnabled) return;
    const deltaX = e.clientX - this.lastMouseX;
    const deltaY = e.clientY - this.lastMouseY;
    this.targetYaw -= deltaX * 0.0035;
    this.targetPitch -= deltaY * 0.0025;
    this.targetPitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, this.targetPitch));
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
  }

  onWindowResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animateCovenantStars() {
    // Camera tilts up to frame the celestial canopy
    gsap.to(this.camera.position, {
      x: 0, y: 7.5, z: 12.0, duration: 6.0, ease: 'power2.inOut',
      onUpdate: () => {
        this.camera.lookAt(0, 24.0, -10.0);
      }
    });
  }

  update(elapsed, dt) {
    // Twinkling starlight
    if (this.starPoints) {
      this.starPoints.rotation.y = elapsed * 0.008;
    }

    // Campfire flickering light
    if (this.fireLight) {
      this.fireLight.intensity = 2.2 + Math.sin(elapsed * 12.0) * 0.45;
    }

    // Floating star waypoints rotation
    this.starWaypoints.forEach((wp, idx) => {
      wp.children[1].rotation.y = elapsed * 2.5 + idx;
      wp.children[1].rotation.x = Math.sin(elapsed * 2.0 + idx) * 0.3;
    });

    if (this.abramCharacter) this.abramCharacter.update(dt, elapsed);

    // Player Movement
    if (this.movementEnabled && this.abram) {
      this.yaw += (this.targetYaw - this.yaw) * 0.12;
      this.pitch += (this.targetPitch - this.pitch) * 0.12;

      let moveX = 0;
      let moveZ = 0;
      if (this.keys['KeyW'] || this.keys['ArrowUp']) moveZ -= 1;
      if (this.keys['KeyS'] || this.keys['ArrowDown']) moveZ += 1;
      if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveX -= 1;
      if (this.keys['KeyD'] || this.keys['ArrowRight']) moveX += 1;

      if (window.joystickVector && (window.joystickVector.x !== 0 || window.joystickVector.y !== 0)) {
        moveX = window.joystickVector.x;
        moveZ = window.joystickVector.y;
      }

      const speed = 4.8 * dt;
      if (moveX !== 0 || moveZ !== 0) {
        const camForward = new THREE.Vector3();
        this.camera.getWorldDirection(camForward);
        camForward.y = 0;
        camForward.normalize();

        const camRight = new THREE.Vector3();
        camRight.crossVectors(camForward, this.camera.up).normalize();

        const moveDir = new THREE.Vector3();
        moveDir.addScaledVector(camRight, moveX);
        moveDir.addScaledVector(camForward, -moveZ);
        moveDir.normalize();

        const newX = this.abram.position.x + moveDir.x * speed;
        const newZ = this.abram.position.z + moveDir.z * speed;
        this.abram.position.x = newX;
        this.abram.position.z = newZ;
        this.abram.position.y = this.getTerrainHeight(newX, newZ);

        const targetRot = Math.atan2(moveDir.x, moveDir.z);
        this.abram.rotation.y = targetRot;

        if (this.abramCharacter && this.abramCharacter.playAnimation) {
          this.abramCharacter.playAnimation('walk');
        }
      } else {
        if (this.abramCharacter && this.abramCharacter.playAnimation) {
          this.abramCharacter.playAnimation('idle');
        }
      }

      // Camera follow
      if (this.cameraMode === 'firstPerson') {
        this.abram.visible = false;
        const eyePos = new THREE.Vector3(this.abram.position.x, this.abram.position.y + 1.65, this.abram.position.z);
        this.camera.position.lerp(eyePos, 0.25);
        const forwardDir = new THREE.Vector3(-Math.sin(this.yaw), -Math.sin(this.pitch), -Math.cos(this.yaw));
        this.camera.lookAt(eyePos.clone().add(forwardDir.multiplyScalar(10.0)));
      } else {
        this.abram.visible = true;
        const dist = 6.0 / Math.sqrt(this.zoomLevel);
        const camOffset = new THREE.Vector3(
          Math.sin(this.yaw) * Math.cos(this.pitch) * dist,
          Math.sin(this.pitch) * dist + 2.0,
          Math.cos(this.yaw) * Math.cos(this.pitch) * dist
        );
        this.camera.position.lerp(this.abram.position.clone().add(camOffset), 0.15);
        this.camera.lookAt(new THREE.Vector3(this.abram.position.x, this.abram.position.y + 1.3, this.abram.position.z));
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.renderer.domElement.remove();
    this.renderer.dispose();
  }
}
