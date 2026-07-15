import * as THREE from 'three';
import { gsap } from 'gsap';

export class NoahScene {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.clock = new THREE.Clock();
    this.movementEnabled = false;
    this.keys = {};
    
    // Joystick vector for mobile controls
    this.joystickVector = new THREE.Vector2(0, 0);
    
    this.yaw = Math.PI;
    this.pitch = -0.15;
    this.targetYaw = Math.PI;
    this.targetPitch = -0.15;
    
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    // Flood and Rain triggers
    this.rainActive = false;
    this.waterRising = false;
    this.waterHeight = -6.0;
    this.rainLines = [];
    
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
    
    this.scene.background = new THREE.Color(0xcfd5db); // Overcast grey sky
    this.scene.fog = new THREE.FogExp2(0xcfd5db, 0.007);
    
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(-10, 3.5, 18);
    
    this.hemiLight = new THREE.HemisphereLight(0xe0e8f0, 0x3d4f5c, 0.8);
    this.scene.add(this.hemiLight);
    
    this.sunLight = new THREE.DirectionalLight(0xdbe3eb, 0.95);
    this.sunLight.position.set(40, 100, 50);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);
    
    // Dry Valley Terrain
    const groundGeo = new THREE.PlaneGeometry(450, 450, 60, 60);
    groundGeo.rotateX(-Math.PI / 2);
    
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      // Create a large basin at the center
      const distFromCenter = Math.sqrt(x*x + z*z);
      let h = Math.sin(x * 0.01) * Math.cos(z * 0.01) * 3.8 + Math.sin(x*0.06)*0.6;
      if (distFromCenter > 35) {
        h += (distFromCenter - 35) * 0.28; // Rising valley walls
      }
      posAttr.setY(i, h);
    }
    groundGeo.computeVertexNormals();
    
    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0x5c5a4d, // Dry, rocky earth
      roughness: 0.95,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    
    // Add sparse dry trees/shrubs
    const dryWoodMat = new THREE.MeshStandardMaterial({ color: 0x42382f, roughness: 0.9 });
    const dryLeafMat = new THREE.MeshStandardMaterial({ color: 0x5a5745, roughness: 0.9, flatShading: true });
    
    for (let j = 0; j < 14; j++) {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 2.2, 5), dryWoodMat);
      trunk.position.y = 1.1;
      trunk.castShadow = true;
      
      const leaves = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 1), dryLeafMat);
      leaves.position.y = 2.2;
      leaves.castShadow = true;
      
      tree.add(trunk, leaves);
      const tx = (Math.random() - 0.5) * 80 + (j % 2 === 0 ? 32 : -32);
      const tz = (Math.random() - 0.5) * 80 + (j % 2 === 0 ? -32 : 32);
      tree.position.set(tx, this.getTerrainHeight(tx, tz), tz);
      this.scene.add(tree);
    }
    
    // --- The Ark Model (Massive wooden structure) ---
    this.ark = new THREE.Group();
    const arkWoodMat = new THREE.MeshStandardMaterial({ color: 0x2e1d0f, roughness: 0.95, flatShading: true });
    const arkRampMat = new THREE.MeshStandardMaterial({ color: 0x422f20, roughness: 0.9 });
    
    // Lower hull structure (massive box)
    const hullWidth = 14;
    const hullHeight = 5.2;
    const hullLength = 32;
    const hull = new THREE.Mesh(new THREE.BoxGeometry(hullWidth, hullHeight, hullLength), arkWoodMat);
    hull.position.y = hullHeight / 2;
    hull.castShadow = true;
    hull.receiveShadow = true;
    this.ark.add(hull);
    
    // pitched roof deck
    const roof = new THREE.Mesh(new THREE.BoxGeometry(hullWidth - 1.2, 1.2, hullLength - 2.5), arkWoodMat);
    roof.position.y = hullHeight + 0.6;
    this.ark.add(roof);
    
    // Ark Side Door (Pivot on the bottom edge)
    this.doorGroup = new THREE.Group();
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.2, 2.8), arkRampMat);
    door.position.y = 1.6;
    door.castShadow = true;
    this.doorGroup.add(door);
    // Position the door pivot on the right side hull
    this.doorGroup.position.set(hullWidth / 2 + 0.05, 0.05, 0.0);
    this.ark.add(this.doorGroup);
    
    // Ramp (Fitted when door is open)
    this.ramp = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.12, 2.6), arkRampMat);
    this.ramp.position.set(hullWidth / 2 + 2.0, 0.82, 0);
    this.ramp.rotation.z = -0.32;
    this.ramp.receiveShadow = true;
    this.ark.add(this.ramp);
    
    // Position the Ark in the center basin
    this.ark.position.set(0.0, this.getTerrainHeight(0, 0) - 0.2, 0.0);
    this.scene.add(this.ark);
    
    // --- Animal Pairs Marching to the Ark ---
    this.animals = new THREE.Group();
    const woolMat = new THREE.MeshStandardMaterial({ color: 0xefede0, roughness: 0.9 });
    const deerMat = new THREE.MeshStandardMaterial({ color: 0x7a5a3a, roughness: 0.95 });
    
    const buildSheep = () => {
      const sh = new THREE.Group();
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.24, 5, 5), woolMat);
      body.scale.set(1.3, 1.0, 1.0);
      body.position.y = 0.32;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 4, 4), new THREE.MeshStandardMaterial({ color: 0x1f1f1f }));
      head.position.set(0.28, 0.42, 0);
      sh.add(body, head);
      return sh;
    };
    
    const buildDeer = () => {
      const dr = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.72, 6), deerMat);
      body.rotation.z = Math.PI / 2;
      body.position.y = 0.55;
      
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.5, 5), deerMat);
      neck.position.set(0.3, 0.85, 0);
      neck.rotation.z = -0.4;
      
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 4, 4), deerMat);
      head.position.set(0.42, 1.1, 0);
      
      dr.add(body, neck, head);
      return dr;
    };
    
    // Spawn Pairs along a queue line leading to the ramp
    const pairOffsets = [
      { x: 10.0, z: -1.2, type: 'sheep' },
      { x: 10.0, z: 1.2, type: 'sheep' },
      { x: 13.5, z: -0.9, type: 'deer' },
      { x: 13.5, z: 0.9, type: 'deer' },
      { x: 17.0, z: -1.0, type: 'sheep' },
      { x: 17.0, z: 1.0, type: 'sheep' }
    ];
    
    this.pairInstances = [];
    pairOffsets.forEach(offset => {
      const model = offset.type === 'sheep' ? buildSheep() : buildDeer();
      model.position.set(offset.x, this.getTerrainHeight(offset.x, offset.z), offset.z);
      model.lookAt(6.5, model.position.y, 0.0); // Facing the ramp
      this.animals.add(model);
      this.pairInstances.push(model);
    });
    
    this.scene.add(this.animals);
    
    // --- Transparent rising water plane ---
    const waterGeo = new THREE.PlaneGeometry(600, 600);
    waterGeo.rotateX(-Math.PI / 2);
    this.waterMat = new THREE.MeshStandardMaterial({
      color: 0x213d52,
      transparent: true,
      opacity: 0.85,
      roughness: 0.15,
      metalness: 0.8,
      flatShading: true
    });
    this.waterPlane = new THREE.Mesh(waterGeo, this.waterMat);
    this.waterPlane.position.y = this.waterHeight;
    this.scene.add(this.waterPlane);
    
    // --- Characters ---
    this.noah = new THREE.Group();
    this.noah.name = 'Noah';
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xcc9c78, roughness: 0.85 });
    const beardMat = new THREE.MeshStandardMaterial({ color: 0xeaeaea, roughness: 0.9 });
    const noahTunicMat = new THREE.MeshStandardMaterial({ color: 0x485c7a, roughness: 0.9 });
    
    const nTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.1, 8), noahTunicMat);
    nTorso.position.y = 1.05;
    const nHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), skinMat);
    nHead.position.y = 1.72;
    const nBeard = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.24), beardMat);
    nBeard.position.set(0.1, 1.55, 0);
    
    this.noahArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.9, 6), skinMat);
    this.noahArmL.position.set(-0.35, 1.1, 0);
    this.noahArmR = this.noahArmL.clone(); this.noahArmR.position.x = 0.35;
    
    const nLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.95, 6), skinMat);
    nLegL.position.set(-0.12, 0.48, 0);
    const nLegR = nLegL.clone(); nLegR.position.x = 0.12;
    
    this.noah.add(nTorso, nHead, nBeard, this.noahArmL, this.noahArmR, nLegL, nLegR);
    // Place Noah in front of the animal queue
    this.noah.position.set(22, this.getTerrainHeight(22, 0.0), 0.0);
    this.noah.lookAt(12, this.noah.position.y, 0.0);
    this.scene.add(this.noah);
    
    // Noah's Wife
    this.wife = new THREE.Group();
    this.wife.name = 'Wife';
    const wifeTunicMat = new THREE.MeshStandardMaterial({ color: 0x8c6b54, roughness: 0.9 });
    
    const wTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.0, 8), wifeTunicMat);
    wTorso.position.y = 1.0;
    const wHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), skinMat);
    wHead.position.y = 1.62;
    const wHair = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.4, 0.22), new THREE.MeshStandardMaterial({ color: 0x3d312a }));
    wHair.position.set(0, 1.5, -0.06);
    
    this.wife.add(wTorso, wHead, wHair);
    this.wife.position.set(7.5, this.getTerrainHeight(7.5, -3.2), -3.2);
    this.wife.lookAt(7.5, this.wife.position.y, 0.0);
    this.scene.add(this.wife);
    
    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    window.addEventListener('keydown', e => this.keys[e.code] = true);
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }
  
  getTerrainHeight(x, z) {
    const distFromCenter = Math.sqrt(x*x + z*z);
    let h = Math.sin(x * 0.01) * Math.cos(z * 0.01) * 3.8 + Math.sin(x*0.06)*0.6;
    if (distFromCenter > 35) {
      h += (distFromCenter - 35) * 0.28;
    }
    return h + this.ground.position.y;
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
  
  unlockControls() {
    this.movementEnabled = true;
    this.targetYaw = Math.PI;
    this.targetPitch = -0.15;
  }
  
  checkCollision(newX, newZ) {
    // Prevent entering massive Ark hull bounding box
    if (Math.abs(newX) < 7.8 && Math.abs(newZ) < 16.8) {
      // Allow entering if using the ramp area (between x = 6.5 and 10, z = -1.5 and 1.5)
      if (newX > 6.0 && Math.abs(newZ) < 1.6) {
        return false;
      }
      return true;
    }
    return false;
  }
  
  update(time, dt) {
    const elapsed = time;
    
    // Handle Rain lines animation
    if (this.rainActive) {
      // Spawn new rain lines
      if (this.rainLines.length < 180) {
        const rainGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, -1.2, 0)
        ]);
        const rainMat = new THREE.LineBasicMaterial({ color: 0x6b8094, opacity: 0.6, transparent: true });
        const rainLine = new THREE.Line(rainGeo, rainMat);
        
        const rx = (Math.random() - 0.5) * 120 + this.camera.position.x;
        const rz = (Math.random() - 0.5) * 120 + this.camera.position.z;
        rainLine.position.set(rx, 30 + Math.random() * 10, rz);
        this.scene.add(rainLine);
        this.rainLines.push(rainLine);
      }
      
      // Update rain lines positions
      for (let i = this.rainLines.length - 1; i >= 0; i--) {
        const line = this.rainLines[i];
        line.position.y -= dt * 26; // Rain speed
        // Reset or prune
        if (line.position.y < this.getTerrainHeight(line.position.x, line.position.z)) {
          line.position.y = 30 + Math.random() * 5;
          line.position.x = (Math.random() - 0.5) * 120 + this.camera.position.x;
          line.position.z = (Math.random() - 0.5) * 120 + this.camera.position.z;
        }
      }
    }
    
    // Handle rising flood water
    if (this.waterRising) {
      this.waterHeight += dt * 0.95; // Rise speed
      if (this.waterHeight > 4.6) this.waterHeight = 4.6;
      this.waterPlane.position.y = this.waterHeight;
      
      // Bob the Ark if the water level rises past the base height
      const baseHeight = this.getTerrainHeight(0, 0) - 0.2;
      if (this.waterHeight > baseHeight) {
        const bob = Math.sin(elapsed * 1.5) * 0.16;
        const driftX = Math.sin(elapsed * 0.4) * 0.15;
        this.ark.position.y = this.waterHeight + bob;
        this.ark.position.x = driftX;
      }
    }
    
    // Smooth camera rotation
    this.yaw += (this.targetYaw - this.yaw) * 0.1;
    this.pitch += (this.targetPitch - this.pitch) * 0.1;
    
    // Player controls (Noah movement)
    if (this.movementEnabled && this.noah.visible) {
      const speed = 2.4 * dt;
      
      const camForward = new THREE.Vector3();
      this.camera.getWorldDirection(camForward);
      camForward.y = 0;
      camForward.normalize();
      
      const camRight = new THREE.Vector3();
      camRight.crossVectors(camForward, this.camera.up).normalize();
      
      const move = new THREE.Vector3();
      
      // Keyboard input
      if (this.keys['KeyW']) move.add(camForward);
      if (this.keys['KeyS']) move.sub(camForward);
      if (this.keys['KeyD']) move.add(camRight);
      if (this.keys['KeyA']) move.sub(camRight);
      
      // Mobile Joystick input override
      if (this.joystickVector.lengthSq() > 0) {
        const joyForward = camForward.clone().multiplyScalar(this.joystickVector.y);
        const joyRight = camRight.clone().multiplyScalar(this.joystickVector.x);
        move.add(joyForward).add(joyRight);
      }
      
      if (move.lengthSq() > 0) {
        move.normalize().multiplyScalar(speed);
        
        const newX = this.noah.position.x + move.x;
        const newZ = this.noah.position.z + move.z;
        
        if (!this.checkCollision(newX, newZ)) {
          this.noah.position.x = newX;
          this.noah.position.z = newZ;
          this.noah.position.y = this.getTerrainHeight(this.noah.position.x, this.noah.position.z);
        }
        
        const targetAngle = Math.atan2(move.x, move.z);
        this.noah.rotation.y = targetAngle;
        
        const swing = Math.sin(elapsed * 9.0) * 0.42;
        this.noah.children[5].rotation.x = swing; // Left Leg
        this.noah.children[6].rotation.x = -swing; // Right Leg
        this.noah.children[3].rotation.x = -swing; // Left arm
        this.noah.children[4].rotation.x = swing; // Right arm
      } else {
        this.noah.children[5].rotation.x *= 0.85;
        this.noah.children[6].rotation.x *= 0.85;
        this.noah.children[3].rotation.x *= 0.85;
        this.noah.children[4].rotation.x *= 0.85;
      }
      
      // Spring arm camera following Noah
      const springArmDist = 6.8;
      const camOffset = new THREE.Vector3(
        Math.sin(this.yaw) * Math.cos(this.pitch) * springArmDist,
        Math.sin(this.pitch) * springArmDist + 1.8,
        Math.cos(this.yaw) * Math.cos(this.pitch) * springArmDist
      );
      
      const targetCamPos = this.noah.position.clone().add(camOffset);
      this.camera.position.lerp(targetCamPos, 0.12);
      
      const lookTarget = new THREE.Vector3(this.noah.position.x, this.noah.position.y + 1.2, this.noah.position.z);
      this.camera.lookAt(lookTarget);
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}
