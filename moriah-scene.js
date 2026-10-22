import * as THREE from 'three';
import gsap from 'gsap';
import { CharacterModel } from './src/models/CharacterModel.js';

export class MoriahScene {
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
    this.scene.background = new THREE.Color(0xb5c6d8); // Dramatic mountain morning sky
    this.scene.fog = new THREE.FogExp2(0xb5c6d8, 0.005);

    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(0, 4.5, 18);

    // Sunlight on Mount Moriah
    this.hemiLight = new THREE.HemisphereLight(0xfff4e0, 0x6e7884, 1.25);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff0d0, 1.6);
    this.sunLight.position.set(40, 90, 30);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);

    // 1. Rugged Mount Moriah Summit Terrain
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
      color: 0x6b6355,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    // 2. Mountain Summit Altar with stacked firewood
    this.altarGroup = new THREE.Group();
    this.scene.add(this.altarGroup);

    const altarX = 0.0;
    const altarZ = -4.0;
    const altarY = this.getTerrainHeight(altarX, altarZ);
    this.altarGroup.position.set(altarX, altarY, altarZ);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a5448, roughness: 0.92, flatShading: true });
    for (let s = 0; s < 6; s++) {
      const stone = new THREE.Mesh(new THREE.BoxGeometry(2.0 - s * 0.2, 0.4, 1.5 - s * 0.15), stoneMat);
      stone.position.y = s * 0.38 + 0.2;
      stone.rotation.y = s * 0.25;
      stone.castShadow = true;
      this.altarGroup.add(stone);
    }

    // Firewood arranged upon the altar
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d2716, roughness: 0.9 });
    for (let w = 0; w < 6; w++) {
      const wood = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.4, 5), woodMat);
      wood.position.set((w % 3 - 1) * 0.35, 2.45 + Math.floor(w / 3) * 0.15, 0);
      wood.rotation.z = Math.PI / 2;
      this.altarGroup.add(wood);
    }

    // 3. Celestial Ray of Divine Light from Heaven
    const rayGeo = new THREE.CylinderGeometry(0.8, 4.5, 35, 16, 1, true);
    this.celestialRay = new THREE.Mesh(
      rayGeo,
      new THREE.MeshBasicMaterial({ color: 0xfff3c4, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
    );
    this.celestialRay.position.set(altarX, altarY + 17.5, altarZ);
    this.scene.add(this.celestialRay);

    // 4. Thicket with Ram caught by its horns
    this.thicketGroup = new THREE.Group();
    const thicketX = 7.5;
    const thicketZ = -3.5;
    const thicketY = this.getTerrainHeight(thicketX, thicketZ);
    this.thicketGroup.position.set(thicketX, thicketY, thicketZ);

    const shrubMat = new THREE.MeshStandardMaterial({ color: 0x4a4a2b, roughness: 0.9 });
    for (let b = 0; b < 5; b++) {
      const bush = new THREE.Mesh(new THREE.SphereGeometry(0.8 + Math.random() * 0.4, 6, 5), shrubMat);
      bush.position.set((Math.random() - 0.5) * 1.5, 0.6 + Math.random() * 0.4, (Math.random() - 0.5) * 1.5);
      this.thicketGroup.add(bush);
    }

    // Ram model (fleece body, head, curved horns)
    const ramMat = new THREE.MeshStandardMaterial({ color: 0xd9d3c5, roughness: 0.9 });
    const hornMat = new THREE.MeshStandardMaterial({ color: 0x3d352b, roughness: 0.6 });
    const ramBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.65, 1.2), ramMat);
    ramBody.position.y = 0.7;

    const ramHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.5), ramMat);
    ramHead.position.set(0, 1.1, 0.6);

    const hornL = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 6, 8, Math.PI * 1.4), hornMat);
    hornL.position.set(-0.25, 1.2, 0.55);
    hornL.rotation.y = -Math.PI / 4;
    const hornR = hornL.clone();
    hornR.position.x = 0.25;
    hornR.rotation.y = Math.PI / 4;

    this.thicketGroup.add(ramBody, ramHead, hornL, hornR);
    this.scene.add(this.thicketGroup);

    // 5. Patriarch Abraham and Isaac
    this.abrahamCharacter = new CharacterModel({
      name: 'Abraham',
      character: 'man1',
      clothesColor: 0x4a3b2c
    });
    this.abraham = this.abrahamCharacter.group;
    this.abraham.position.set(-2.0, this.getTerrainHeight(-2.0, 3.0), 3.0);
    this.abraham.lookAt(altarX, this.abraham.position.y, altarZ);
    this.scene.add(this.abraham);
    this.player = this.abraham;

    this.isaacCharacter = new CharacterModel({
      name: 'Isaac',
      character: 'man2',
      clothesColor: 0x8a7050
    });
    this.isaac = this.isaacCharacter.group;
    this.isaac.scale.set(0.85, 0.85, 0.85); // Young Isaac
    this.isaac.position.set(1.5, this.getTerrainHeight(1.5, 1.0), 1.0);
    this.isaac.lookAt(altarX, this.isaac.position.y, altarZ);
    this.scene.add(this.isaac);

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
      window.showCameraToast(this.cameraMode === 'firstPerson' ? 'First Person (Abraham POV)' : 'Third Person (Full View)');
    }
  }

  getTerrainHeight(x, z) {
    const distFromCenter = Math.sqrt(x * x + z * z);
    let h = Math.sin(x * 0.02) * Math.cos(z * 0.02) * 3.0;
    // Summit plateau
    if (distFromCenter < 24) {
      h += (24 - distFromCenter) * 0.35;
    }
    return h + (this.ground ? this.ground.position.y : 0);
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

  animateAngelVoice() {
    // Divine Ray shines down upon the altar
    gsap.to(this.celestialRay.material, { opacity: 0.75, duration: 1.5, ease: 'power2.out' });
    gsap.to(this.camera.position, {
      x: 0, y: 6.2, z: 9.5, duration: 3.5, ease: 'power2.inOut',
      onUpdate: () => {
        this.camera.lookAt(0, 2.2, -4.0);
      }
    });
  }

  animateRamReveal() {
    // Camera pans to the thicket
    gsap.to(this.camera.position, {
      x: 4.5, y: 3.8, z: 2.0, duration: 4.0, ease: 'power2.inOut',
      onUpdate: () => {
        this.camera.lookAt(7.5, 1.2, -3.5);
      }
    });
  }

  update(elapsed, dt) {
    if (this.abrahamCharacter) this.abrahamCharacter.update(dt, elapsed);
    if (this.isaacCharacter) this.isaacCharacter.update(dt, elapsed);

    // Divine ray subtle pulse
    if (this.celestialRay && this.celestialRay.material.opacity > 0) {
      this.celestialRay.rotation.y = elapsed * 0.2;
    }

    // Player Movement
    if (this.movementEnabled && this.abraham) {
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

        const newX = this.abraham.position.x + moveDir.x * speed;
        const newZ = this.abraham.position.z + moveDir.z * speed;
        this.abraham.position.x = newX;
        this.abraham.position.z = newZ;
        this.abraham.position.y = this.getTerrainHeight(newX, newZ);

        const targetRot = Math.atan2(moveDir.x, moveDir.z);
        this.abraham.rotation.y = targetRot;

        if (this.abrahamCharacter && this.abrahamCharacter.playAnimation) {
          this.abrahamCharacter.playAnimation('walk');
        }
      } else {
        if (this.abrahamCharacter && this.abrahamCharacter.playAnimation) {
          this.abrahamCharacter.playAnimation('idle');
        }
      }

      // Camera follow
      if (this.cameraMode === 'firstPerson') {
        this.abraham.visible = false;
        const eyePos = new THREE.Vector3(this.abraham.position.x, this.abraham.position.y + 1.65, this.abraham.position.z);
        this.camera.position.lerp(eyePos, 0.25);
        const forwardDir = new THREE.Vector3(-Math.sin(this.yaw), -Math.sin(this.pitch), -Math.cos(this.yaw));
        this.camera.lookAt(eyePos.clone().add(forwardDir.multiplyScalar(10.0)));
      } else {
        this.abraham.visible = true;
        const dist = 6.2 / Math.sqrt(this.zoomLevel);
        const camOffset = new THREE.Vector3(
          Math.sin(this.yaw) * Math.cos(this.pitch) * dist,
          Math.sin(this.pitch) * dist + 2.0,
          Math.cos(this.yaw) * Math.cos(this.pitch) * dist
        );
        this.camera.position.lerp(this.abraham.position.clone().add(camOffset), 0.15);
        this.camera.lookAt(new THREE.Vector3(this.abraham.position.x, this.abraham.position.y + 1.3, this.abraham.position.z));
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.renderer.domElement.remove();
    this.renderer.dispose();
  }
}
