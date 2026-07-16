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
    
    this.joystickVector = new THREE.Vector2(0, 0);
    
    this.yaw = Math.PI;
    this.pitch = -0.15;
    this.targetYaw = Math.PI;
    this.targetPitch = -0.15;
    
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
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
    
    // Clear and bright overcast sky
    this.scene.background = new THREE.Color(0xdce5ed); 
    this.scene.fog = new THREE.FogExp2(0xdce5ed, 0.003);
    
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(-16, 4.0, 24);
    
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x5a7082, 1.45);
    this.scene.add(this.hemiLight);
    
    this.sunLight = new THREE.DirectionalLight(0xfff5ea, 1.6);
    this.sunLight.position.set(40, 120, 50);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);
    
    // Dry Valley Terrain - BARE ground
    const groundGeo = new THREE.PlaneGeometry(450, 450, 60, 60);
    groundGeo.rotateX(-Math.PI / 2);
    
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const distFromCenter = Math.sqrt(x*x + z*z);
      let h = Math.sin(x * 0.01) * Math.cos(z * 0.01) * 3.8 + Math.sin(x*0.06)*0.6;
      if (distFromCenter > 35) {
        h += (distFromCenter - 35) * 0.28;
      }
      posAttr.setY(i, h);
    }
    groundGeo.computeVertexNormals();
    
    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0x4e493b,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    
    // --- THE WICKED CITY (SCALED UP & PLACED CLOSER) ---
    // Moved closer: x range -14 to -26, z range -6 to 6
    this.cityGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6e6a62, roughness: 0.9, flatShading: true });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d2c1e, roughness: 0.9, flatShading: true });
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xd8c39e, roughness: 0.95, flatShading: true });
    
    // Scaled-up Towers / Huts
    for (let i = 0; i < 3; i++) {
      const tower = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 6.5 + i*1.8, 5), stoneMat);
      body.position.y = (6.5 + i*1.8) / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      
      const roof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 3.0, 5), strawMat);
      roof.position.y = 6.5 + i*1.8 + 1.5;
      tower.add(body, roof);
      
      tower.position.set(-18 - i*6, this.getTerrainHeight(-18 - i*6, -8) - 0.2, -8 + (i%2)*4);
      this.cityGroup.add(tower);
    }
    
    // Tables and stools scaled up
    const table = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 1.4), woodMat);
    table.position.set(-11, 0.45, -2);
    table.castShadow = true;
    this.cityGroup.add(table);
    
    const stool1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5, 5), woodMat);
    stool1.position.set(-11, 0.25, -1.2);
    const stool2 = stool1.clone();
    stool2.position.set(-11, 0.25, -2.8);
    this.cityGroup.add(stool1, stool2);
    
    this.scene.add(this.cityGroup);
    
    // --- NOAH'S FAMILY HOUSE / SHELTER ---
    this.houseGroup = new THREE.Group();
    const houseWall = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.5, 3.5), woodMat);
    houseWall.position.y = 1.25;
    houseWall.castShadow = true;
    houseWall.receiveShadow = true;
    
    const houseRoof = new THREE.Mesh(new THREE.ConeGeometry(2.8, 1.8, 4), strawMat);
    houseRoof.position.y = 2.5 + 0.9;
    houseRoof.rotation.y = Math.PI / 4;
    houseRoof.castShadow = true;
    
    this.houseGroup.add(houseWall, houseRoof);
    this.houseGroup.position.set(18.0, this.getTerrainHeight(18.0, 12.0), 12.0);
    this.scene.add(this.houseGroup);
    
    // --- WICKED CITIZENS (SCALED UP TO MATCH NOAH) ---
    this.wickedGroup = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xcc9c78, roughness: 0.85 });
    
    // 1. Drinking bystander
    this.wickedDrinker = new THREE.Group();
    const wdTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.1, 8), new THREE.MeshStandardMaterial({ color: 0x6b487a }));
    wdTorso.position.y = 0.55;
    const wdHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), skinMat);
    wdHead.position.y = 1.2;
    this.wdArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.8, 6), skinMat);
    this.wdArmR.position.set(0.35, 0.9, 0);
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.2, 4), woodMat);
    cup.position.y = 0.4;
    this.wdArmR.add(cup);
    this.wickedDrinker.add(wdTorso, wdHead, this.wdArmR);
    this.wickedDrinker.position.set(-11, this.getTerrainHeight(-11, -0.2), -0.2);
    this.wickedDrinker.lookAt(-11, this.wickedDrinker.position.y, -2.0);
    this.wickedGroup.add(this.wickedDrinker);
    
    // 2 & 3. Fighting bystanders
    this.wickedFighter1 = new THREE.Group();
    const wf1Torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.1, 8), new THREE.MeshStandardMaterial({ color: 0xa34b4b }));
    wf1Torso.position.y = 0.55;
    const wf1Head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), skinMat);
    wf1Head.position.y = 1.2;
    this.wf1ArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.9, 6), skinMat);
    this.wf1ArmL.position.set(-0.35, 0.9, 0.3);
    this.wf1ArmL.rotation.x = Math.PI / 3.5;
    this.wickedFighter1.add(wf1Torso, wf1Head, this.wf1ArmL);
    this.wickedFighter1.position.set(-9.5, this.getTerrainHeight(-9.5, -4), -4);
    
    this.wickedFighter2 = new THREE.Group();
    const wf2Torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.1, 8), new THREE.MeshStandardMaterial({ color: 0x4ba397 }));
    wf2Torso.position.y = 0.55;
    const wf2Head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), skinMat);
    wf2Head.position.y = 1.2;
    this.wf2ArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.9, 6), skinMat);
    this.wf2ArmR.position.set(0.35, 0.9, 0.3);
    this.wf2ArmR.rotation.x = Math.PI / 3.5;
    this.wickedFighter2.add(wf2Torso, wf2Head, this.wf2ArmR);
    this.wickedFighter2.position.set(-8.5, this.getTerrainHeight(-8.5, -3.8), -3.8);
    
    this.wickedFighter1.lookAt(this.wickedFighter2.position.x, this.wickedFighter1.position.y, this.wickedFighter2.position.z);
    this.wickedFighter2.lookAt(this.wickedFighter1.position.x, this.wickedFighter2.position.y, this.wickedFighter1.position.z);
    
    this.wickedGroup.add(this.wickedFighter1, this.wickedFighter2);
    this.scene.add(this.wickedGroup);
    
    // --- NOAH'S ARK ---
    this.arkGroup = new THREE.Group();
    const arkWoodMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0d, roughness: 0.95, flatShading: true });
    const arkRampMat = new THREE.MeshStandardMaterial({ color: 0x3d2c1e, roughness: 0.9 });
    
    // 1. Finished Hull (Hidden initially)
    const hullWidth = 14;
    const hullHeight = 5.2;
    const hullLength = 32;
    this.arkHull = new THREE.Mesh(new THREE.BoxGeometry(hullWidth, hullHeight, hullLength), arkWoodMat);
    this.arkHull.position.y = hullHeight / 2;
    this.arkHull.castShadow = true;
    this.arkHull.receiveShadow = true;
    this.arkHull.visible = false;
    this.arkGroup.add(this.arkHull);
    
    this.arkRoof = new THREE.Mesh(new THREE.BoxGeometry(hullWidth - 1.2, 1.2, hullLength - 2.5), arkWoodMat);
    this.arkRoof.position.y = hullHeight + 0.6;
    this.arkRoof.visible = false;
    this.arkGroup.add(this.arkRoof);
    
    // Side Door
    this.doorGroup = new THREE.Group();
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.2, 2.8), arkRampMat);
    door.position.y = 1.6;
    door.castShadow = true;
    this.doorGroup.add(door);
    this.doorGroup.position.set(hullWidth / 2 + 0.05, 0.05, 0.0);
    this.doorGroup.rotation.y = -Math.PI / 2.0; // Initialize as open!
    this.doorGroup.visible = false;
    this.arkGroup.add(this.doorGroup);
    
    // Ramp
    this.ramp = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.12, 2.6), arkRampMat);
    this.ramp.position.set(hullWidth / 2 + 2.0, 0.82, 0);
    this.ramp.rotation.z = -0.32;
    this.ramp.receiveShadow = true;
    this.ramp.visible = false;
    this.arkGroup.add(this.ramp);
    
    // 2. Skeleton / Scaffolding State (Visible initially)
    this.arkSkeleton = new THREE.Group();
    
    // Log stacks on the ground
    for (let i = 0; i < 6; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.8, 6), woodMat);
      log.rotation.z = Math.PI / 2;
      log.position.set(-5.0 + (i%3)*1.0, 0.2, -6.0 - Math.floor(i/3)*0.6);
      this.arkSkeleton.add(log);
    }
    
    // Structural Ribs
    for (let r = 0; r < 8; r++) {
      const zOffset = -14.0 + r * 4.0;
      const ribL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5.0, 0.3), woodMat);
      ribL.position.set(-6.5, 2.5, zOffset);
      const ribR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5.0, 0.3), woodMat);
      ribR.position.set(6.5, 2.5, zOffset);
      const ribT = new THREE.Mesh(new THREE.BoxGeometry(13.3, 0.3, 0.3), woodMat);
      ribT.position.set(0, 5.0, zOffset);
      this.arkSkeleton.add(ribL, ribR, ribT);
    }
    
    // Scaffolding poles and ladders
    for (let s = 0; s < 4; s++) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 6.0, 5), woodMat);
      pole.position.set(7.5, 3.0, -10 + s*6);
      this.arkSkeleton.add(pole);
    }
    
    this.arkGroup.add(this.arkSkeleton);
    this.arkGroup.position.set(0.0, this.getTerrainHeight(0, 0) - 0.2, 0.0);
    this.scene.add(this.arkGroup);
    
    // --- 30 PAIRS OF PROCEDURAL ANIMALS ---
    this.animals = new THREE.Group();
    this.pairInstances = [];
    
    for (let p = 0; p < 30; p++) {
      const qz = (p % 2 === 0) ? -1.0 : 1.0;
      const qx = 10.0 + p * 0.95;
      
      const male = this.createProceduralFauna(p, qx, qz);
      const female = this.createProceduralFauna(p, qx + 0.3, qz * -1.0);
      
      male.lookAt(6.5, male.position.y, 0.0);
      female.lookAt(6.5, female.position.y, 0.0);
      
      this.animals.add(male, female);
      this.pairInstances.push(male, female);
    }
    this.animals.visible = false; // Hide animals initially
    this.scene.add(this.animals);
    
    // --- FLOOD WATER PLANE ---
    const waterGeo = new THREE.PlaneGeometry(600, 600);
    waterGeo.rotateX(-Math.PI / 2);
    this.waterMat = new THREE.MeshStandardMaterial({
      color: 0x1d3447,
      transparent: true,
      opacity: 0.85,
      roughness: 0.15,
      metalness: 0.8,
      flatShading: true
    });
    this.waterPlane = new THREE.Mesh(waterGeo, this.waterMat);
    this.waterPlane.position.y = this.waterHeight;
    this.scene.add(this.waterPlane);
    
    // --- CHARACTERS ---
    this.noah = new THREE.Group();
    this.noah.name = 'Noah';
    const noahTunicMat = new THREE.MeshStandardMaterial({ color: 0x485c7a, roughness: 0.9 });
    const beardMat = new THREE.MeshStandardMaterial({ color: 0xeaeaea, roughness: 0.9 });
    
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
    
    // Noah's Hammer tool
    this.hammer = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.35), new THREE.MeshStandardMaterial({ color: 0x5a554e }));
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 4), new THREE.MeshStandardMaterial({ color: 0x5c4033 }));
    handle.position.y = -0.22;
    this.hammer.add(handle);
    this.hammer.position.set(0, -0.45, 0);
    this.noahArmR.add(this.hammer);
    
    this.noah.add(nTorso, nHead, nBeard, this.noahArmL, this.noahArmR, nLegL, nLegR);
    this.noah.position.set(18.0, this.getTerrainHeight(18.0, 10.0), 10.0); // Start at house
    this.noah.lookAt(18, this.noah.position.y, 12);
    this.scene.add(this.noah);
    
    // Wife
    this.wife = new THREE.Group();
    this.wife.name = 'Wife';
    const wifeTunicMat = new THREE.MeshStandardMaterial({ color: 0x8c6b54, roughness: 0.9 });
    const wTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.0, 8), wifeTunicMat);
    wTorso.position.y = 1.0;
    const wHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), skinMat);
    wHead.position.y = 1.62;
    this.wife.add(wTorso, wHead);
    this.wife.position.set(19.5, this.getTerrainHeight(19.5, 9.5), 9.5); // Start next to house
    this.wife.lookAt(18, this.wife.position.y, 12);
    this.scene.add(this.wife);
    
    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    window.addEventListener('keydown', e => this.keys[e.code] = true);
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }
  
  completeArk() {
    this.arkSkeleton.visible = false;
    this.arkHull.visible = true;
    this.arkRoof.visible = true;
    this.doorGroup.visible = true;
    this.doorGroup.rotation.y = -Math.PI / 2.0; // Ensure door is open initially
    this.ramp.visible = true;
    this.animals.visible = true; // Show animals now that the Ark is ready!
    this.hammer.visible = false;
  }
  
  createProceduralFauna(index, x, z) {
    const animalNames = [
      "Lion", "Tiger", "Bear", "Elephant", "Giraffe", "Zebra", "Horse", "Sheep", "Goat", "Cow", 
      "Deer", "Wolf", "Fox", "Rabbit", "Squirrel", "Kangaroo", "Panda", "Koala", "Camel", "Hippo", 
      "Rhino", "Leopard", "Cheetah", "Hyena", "Otter", "Badger", "Monkey", "Gorilla", "Chimpanzee", "Elk",
      "Eagle", "Hawk", "Falcon", "Owl", "Parrot", "Penguin", "Flamingo", "Peacock", "Swan", "Duck", 
      "Goose", "Sparrow", "Robin", "Bluejay", "Cardinal", "Crow", "Raven", "Seagull", "Dove", "Pigeon",
      "Snake", "Lizard", "Turtle", "Frog", "Crocodile", "Alligator", "Chameleon", "Gecko", "Iguana", "Snail"
    ];
    const name = animalNames[index % animalNames.length];
    const grp = new THREE.Group();
    grp.name = name;

    const skinColorTable = [
      0xcc9a41, 0xea761e, 0x5a483a, 0x8a9296, 0xefdeaa, 0x1f1f1f, 0x5a483a, 0xf6f6f6, 0xdfdfdf, 0xc2a68a,
      0x8f6a45, 0x7c858a, 0xa66d3f, 0xc7c5bc, 0xb8860b, 0xa0522d, 0xffffff, 0xc0c0c0, 0xb87333, 0x556b2f,
      0x808080, 0xe0a96d, 0xe3a857, 0x8b5a2b, 0x4a5d4e, 0x3d3d3d, 0x3b2d19, 0x222222, 0x3a3028, 0x6e563a
    ];
    const birdColorTable = [
      0x4682b4, 0x8b0000, 0x2e8b57, 0x556b2f, 0xff8c00, 0xffd700, 0xff69b4, 0x00bfff, 0xffffff, 0xdcdcdc,
      0x708090, 0x483d8b, 0x008080, 0x000080, 0xcd853f, 0x800080, 0xbc8f8f, 0xf5deb3, 0xe6e6fa, 0xfff0f5
    ];

    const skinMat = new THREE.MeshStandardMaterial({ 
      color: index % 60 < 30 ? skinColorTable[index % 30] : (index % 60 < 50 ? birdColorTable[index % 20] : 0x3d5c22), 
      roughness: 0.9, 
      flatShading: true 
    });

    const isMammal = (index % 60) < 30;
    const isBird = (index % 60) >= 30 && (index % 60) < 50;

    if (isMammal) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.28, 0.52), skinMat);
      body.position.y = 0.32;
      body.castShadow = true;
      grp.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), skinMat);
      head.position.set(0, 0.5, 0.22);
      head.castShadow = true;
      grp.add(head);

      for (let xOff of [-0.12, 0.12]) {
        for (let zOff of [-0.18, 0.18]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.2, 0.07), skinMat);
          leg.position.set(xOff, 0.1, zOff);
          leg.castShadow = true;
          grp.add(leg);
        }
      }
    } else if (isBird) {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.12, 5, 5), skinMat);
      body.scale.set(1.3, 1.0, 1.0);
      body.position.y = 0.25;
      body.castShadow = true;
      grp.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.06, 4, 4), skinMat);
      head.position.set(0.12, 0.34, 0);
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.07, 4), new THREE.MeshStandardMaterial({ color: 0xffa500 }));
      beak.position.set(0.16, 0.34, 0);
      beak.rotation.z = -Math.PI / 2;
      grp.add(head, beak);

      const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.08, 0.18), skinMat);
      wingL.position.set(-0.1, 0.27, 0);
      grp.add(wingL);
      const wingR = wingL.clone(); wingR.position.x = 0.1;
      grp.add(wingR);

      const legHeight = 0.06;
      for (let xOff of [-0.04, 0.04]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, legHeight, 4), skinMat);
        leg.position.set(xOff, legHeight / 2, 0);
        grp.add(leg);
      }
    } else {
      const segmentsGroup = new THREE.Group();
      const length = 5;
      for (let s = 0; s < length; s++) {
        const seg = new THREE.Mesh(new THREE.SphereGeometry(0.05 - s * 0.003, 4, 4), skinMat);
        seg.position.set(-s * 0.06, 0.03, Math.sin(s * 0.8) * 0.04);
        seg.castShadow = true;
        segmentsGroup.add(seg);
      }
      grp.add(segmentsGroup);
    }

    grp.position.set(x, this.getTerrainHeight(x, z), z);
    return grp;
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
    // City block collisions
    if (newX < -6.5 && newZ < 2.0) {
      return true; 
    }
    if (Math.abs(newX) < 7.8 && Math.abs(newZ) < 16.8) {
      if (newX > 6.0 && Math.abs(newZ) < 1.6) {
        return false;
      }
      return true;
    }
    return false;
  }
  
  update(time, dt) {
    const elapsed = time;
    
    if (this.wickedDrinker) {
      this.wdArmR.rotation.z = Math.sin(elapsed * 2.5) * 0.4 - 0.25;
    }
    if (this.wickedFighter1 && this.wickedFighter2) {
      const shove = Math.sin(elapsed * 4.0) * 0.3;
      this.wf1ArmL.rotation.x = Math.PI / 3.5 + shove;
      this.wf2ArmR.rotation.x = Math.PI / 3.5 - shove;
    }
    
    if (this.rainActive) {
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
      
      for (let i = 0; i < this.rainLines.length; i++) {
        const line = this.rainLines[i];
        line.position.y -= dt * 26;
        if (line.position.y < this.getTerrainHeight(line.position.x, line.position.z)) {
          line.position.y = 30 + Math.random() * 5;
          line.position.x = (Math.random() - 0.5) * 120 + this.camera.position.x;
          line.position.z = (Math.random() - 0.5) * 120 + this.camera.position.z;
        }
      }
    }
    
    if (this.waterRising) {
      this.waterHeight += dt * 0.95;
      if (this.waterHeight > 16.0) this.waterHeight = 16.0; // Raise cap to fully submerge huts & hills
      this.waterPlane.position.y = this.waterHeight;
      
      const baseHeight = this.getTerrainHeight(0, 0) - 0.2;
      if (this.waterHeight > baseHeight) {
        const bob = Math.sin(elapsed * 1.5) * 0.16;
        const driftX = Math.sin(elapsed * 0.4) * 0.15;
        this.arkGroup.position.y = this.waterHeight + bob;
        this.arkGroup.position.x = driftX;
      }
    }
    
    this.yaw += (this.targetYaw - this.yaw) * 0.1;
    this.pitch += (this.targetPitch - this.pitch) * 0.1;
    
    if (this.movementEnabled && this.noah.visible) {
      const speed = 2.4 * dt;
      
      const camForward = new THREE.Vector3();
      this.camera.getWorldDirection(camForward);
      camForward.y = 0;
      camForward.normalize();
      
      const camRight = new THREE.Vector3();
      camRight.crossVectors(camForward, this.camera.up).normalize();
      
      const move = new THREE.Vector3();
      
      if (this.keys['KeyW']) move.add(camForward);
      if (this.keys['KeyS']) move.sub(camForward);
      if (this.keys['KeyD']) move.add(camRight);
      if (this.keys['KeyA']) move.sub(camRight);
      
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
        this.noah.children[5].rotation.x = swing;
        this.noah.children[6].rotation.x = -swing;
        this.noah.children[3].rotation.x = -swing;
        this.noah.children[4].rotation.x = swing;
      } else {
        this.noah.children[5].rotation.x *= 0.85;
        this.noah.children[6].rotation.x *= 0.85;
        this.noah.children[3].rotation.x *= 0.85;
        this.noah.children[4].rotation.x *= 0.85;
      }
      
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
