import * as THREE from 'three';
import { gsap } from 'gsap';

export class CreationScene {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.clock = new THREE.Clock();
    this.movementEnabled = false;
    this.keys = {};
    
    // Third person camera follow variables
    this.yaw = Math.PI; // Camera horizontal rotation
    this.pitch = -0.15; // Camera vertical tilt
    this.targetYaw = Math.PI;
    this.targetPitch = -0.15;
    
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    this.init();
  }
  
  createProceduralFlora(index, x, z) {
    const plantNames = [
      "Oak", "Pine", "Maple", "Birch", "Willow", "Cedar", "Redwood", "Cypress", "Spruce", "Fir", 
      "Elm", "Ash", "Beech", "Walnut", "Chestnut", "Poplar", "Magnolia", "Dogwood", "Cherry", "Apple", 
      "Fig", "Olive", "Palm", "Banana", "Eucalyptus", "Bamboo", "Acacia", "Baobab", "Banyan", "Joshua",
      "Rose", "Lily", "Tulip", "Daisy", "Sunflower", "Orchid", "Lavender", "Fern", "Moss", "Ivy",
      "Dandelion", "Violet", "Jasmine", "Hibiscus", "Lotus", "Marigold", "Clover", "Bamboo Grass", "Cactus", "Aloe",
      "Sage", "Mint", "Basil", "Oregano", "Thyme", "Wheat", "Barley", "Rice", "Cotton", "Flax"
    ];
    const name = plantNames[index % plantNames.length];
    const grp = new THREE.Group();
    grp.name = name;

    const leavesColors = [0x2e5c1e, 0x3d702b, 0x487d35, 0x568a41, 0x224c16, 0x356324, 0x1d3c0f, 0x2a501a, 0x416d2b, 0x4f7f36, 0x446830, 0x4a7e37];
    const flowerColors = [0xff4500, 0xffd700, 0xda70d6, 0xba55d3, 0xff69b4, 0xff1493, 0x00bfff, 0x4169e1, 0x32cd32, 0xffa500];

    const isTree = (index % plantNames.length) < 30;
    const isFlower = (index % plantNames.length) >= 30 && (index % plantNames.length) < 48;
    const isDesert = (index % plantNames.length) === 48 || (index % plantNames.length) === 49;
    const isHerbOrCrop = (index % plantNames.length) >= 50;

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x4d3926, roughness: 0.9, flatShading: true });

    if (isTree) {
      // Trunk
      const th = 1.6 + (index % 5) * 0.4;
      const tr = 0.12 + (index % 4) * 0.04;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(tr*0.8, tr, th, 5), woodMat);
      trunk.position.y = th / 2;
      trunk.castShadow = true;
      grp.add(trunk);

      // Leaves
      const leafyMat = new THREE.MeshStandardMaterial({ 
        color: leavesColors[index % leavesColors.length], 
        roughness: 0.9, 
        flatShading: true 
      });
      const lh = 1.2 + (index % 3) * 0.5;
      let leavesMesh;
      if (index % 3 === 0) {
        leavesMesh = new THREE.Mesh(new THREE.ConeGeometry(lh * 0.9, lh * 2.2, 5), leafyMat);
        leavesMesh.position.y = th + lh * 0.8;
      } else if (index % 3 === 1) {
        leavesMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(lh, 1), leafyMat);
        leavesMesh.position.y = th + lh * 0.7;
      } else {
        leavesMesh = new THREE.Mesh(new THREE.BoxGeometry(lh * 1.5, lh * 1.5, lh * 1.5), leafyMat);
        leavesMesh.position.y = th + lh * 0.75;
      }
      leavesMesh.castShadow = true;
      grp.add(leavesMesh);

      // Fruits
      if (index % 2 === 1) {
        const fruitColor = (index % 3 === 0) ? 0xdd2200 : 0xddb400;
        const fruitMat = new THREE.MeshStandardMaterial({ color: fruitColor, roughness: 0.4 });
        for (let f = 0; f < 3; f++) {
          const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.08, 4, 4), fruitMat);
          fruit.position.set(
            (Math.random() - 0.5) * lh * 0.8,
            th + lh * 0.4 + Math.random() * lh * 0.4,
            (Math.random() - 0.5) * lh * 0.8
          );
          grp.add(fruit);
        }
      }
      grp.userData = { originalScale: 1.0 };
    } else if (isFlower) {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 4), new THREE.MeshStandardMaterial({ color: 0x3d7a22 }));
      stem.position.y = 0.25;
      grp.add(stem);

      const petalMat = new THREE.MeshStandardMaterial({ color: flowerColors[index % flowerColors.length], roughness: 0.7, flatShading: true });
      const petals = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), petalMat);
      petals.position.y = 0.55;
      petals.castShadow = true;
      grp.add(petals);
      grp.userData = { originalScale: 0.8 + (index % 3) * 0.2 };
    } else if (isDesert) {
      const cMat = new THREE.MeshStandardMaterial({ color: 0x3d702b, roughness: 0.8, flatShading: true });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.9, 5), cMat);
      body.position.y = 0.45;
      body.castShadow = true;
      grp.add(body);
      for (let side = -1; side <= 1; side += 2) {
        if (index % 2 === 0 && side === 1) continue;
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 4), cMat);
        arm.position.set(side * 0.16, 0.6, 0);
        arm.rotation.z = side * 0.5;
        grp.add(arm);
      }
      grp.userData = { originalScale: 0.9 + (index % 4) * 0.15 };
    } else {
      const cropMat = new THREE.MeshStandardMaterial({ color: 0x8f8c35, roughness: 0.9, flatShading: true });
      for (let j = 0; j < 3; j++) {
        const stalk = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.7, 0.05), cropMat);
        stalk.position.set((j - 1) * 0.1, 0.35, 0);
        stalk.rotation.z = (j - 1) * 0.15;
        stalk.castShadow = true;
        grp.add(stalk);
      }
      grp.userData = { originalScale: 0.8 + (index % 3) * 0.2 };
    }

    grp.position.set(x, this.getTerrainHeight(x, z), z);
    return grp;
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
    const isCreeping = (index % 60) >= 50;

    if (isMammal) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.8), skinMat);
      body.position.y = 0.5;
      body.castShadow = true;
      grp.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), skinMat);
      head.position.set(0, 0.8, 0.35);
      head.castShadow = true;
      grp.add(head);

      for (let xOff of [-0.18, 0.18]) {
        for (let zOff of [-0.28, 0.28]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.1), skinMat);
          leg.position.set(xOff, 0.16, zOff);
          leg.castShadow = true;
          grp.add(leg);
        }
      }
    } else if (isBird) {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 5, 5), skinMat);
      body.scale.set(1.4, 1.0, 1.0);
      body.position.y = 0.42;
      body.castShadow = true;
      grp.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.08, 4, 4), skinMat);
      head.position.set(0.18, 0.54, 0);
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.1, 4), new THREE.MeshStandardMaterial({ color: 0xffa500 }));
      beak.position.set(0.24, 0.54, 0);
      beak.rotation.z = -Math.PI / 2;
      grp.add(head, beak);

      const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.3), skinMat);
      wingL.position.set(-0.16, 0.44, 0);
      wingL.rotation.y = 0.25;
      grp.add(wingL);
      const wingR = wingL.clone(); wingR.position.x = 0.16; wingR.rotation.y = -0.25;
      grp.add(wingR);

      const legHeight = (index % 2 === 1) ? 0.38 : 0.08;
      for (let xOff of [-0.06, 0.06]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, legHeight, 4), skinMat);
        leg.position.set(xOff, legHeight / 2, 0);
        grp.add(leg);
      }
      body.position.y = legHeight + 0.1;
      head.position.y = legHeight + 0.22;
      beak.position.y = legHeight + 0.22;
      wingL.position.y = legHeight + 0.12;
      wingR.position.y = legHeight + 0.12;
    } else {
      const segmentsGroup = new THREE.Group();
      const length = 5 + (index % 4);
      for (let s = 0; s < length; s++) {
        const seg = new THREE.Mesh(new THREE.SphereGeometry(0.08 - s * 0.005, 4, 4), skinMat);
        seg.position.set(-s * 0.09, 0.06, Math.sin(s * 0.8) * 0.06);
        seg.castShadow = true;
        segmentsGroup.add(seg);
      }
      grp.add(segmentsGroup);
    }

    grp.position.set(x, this.getTerrainHeight(x, z), z);
    grp.userData = { wanderAngle: Math.random() * Math.PI * 2, speed: 0.2 + (index % 3) * 0.1 };
    return grp;
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
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.005);
    
    // 3. Camera
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(0, 1.6, 8); // Start positioned back looking at Adam
    
    // 4. Lights
    this.hemiLight = new THREE.HemisphereLight(0x1a1a2a, 0x000000, 0.0);
    this.scene.add(this.hemiLight);
    
    this.sunLight = new THREE.DirectionalLight(0xfff1d0, 0.0);
    this.sunLight.position.set(120, 180, 220); // Positioned forward
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);
    
    // 5. Sky Sphere
    const skyGeo = new THREE.SphereGeometry(950, 32, 32);
    this.skyMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide, fog: false });
    this.sky = new THREE.Mesh(skyGeo, this.skyMat);
    this.scene.add(this.sky);
    
    // 6. Terrain / Ground
    const groundGeo = new THREE.PlaneGeometry(450, 450, 80, 80);
    groundGeo.rotateX(-Math.PI / 2);
    
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const h = Math.sin(x * 0.015) * Math.cos(z * 0.015) * 6.5 + 
                Math.sin(x * 0.05 + z * 0.03) * 1.8 +
                Math.cos(x * 0.1) * Math.sin(z * 0.08) * 0.5;
      posAttr.setY(i, h);
    }
    groundGeo.computeVertexNormals();
    
    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0x223616,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.position.y = -60; // Hidden initially
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    
    // 7. Water Plane
    this.waterMat = new THREE.MeshStandardMaterial({
      color: 0x0c314a,
      roughness: 0.1,
      metalness: 0.15,
      transparent: true,
      opacity: 0.0,
      flatShading: true
    });
    this.waterGeo = new THREE.PlaneGeometry(500, 500, 60, 60);
    this.waterGeo.rotateX(-Math.PI / 2);
    this.water = new THREE.Mesh(this.waterGeo, this.waterMat);
    this.water.position.y = -1.2;
    this.water.receiveShadow = true;
    this.scene.add(this.water);
    
    // 8. Sun / Moon Discs
    this.sunDisc = new THREE.Mesh(
      new THREE.SphereGeometry(25, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff3d1, fog: false })
    );
    this.sunDisc.visible = false;
    this.scene.add(this.sunDisc);
    
    this.moonDisc = new THREE.Mesh(
      new THREE.SphereGeometry(16, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xd6e2f0, fog: false })
    );
    this.moonDisc.visible = false;
    this.scene.add(this.moonDisc);
    
    // 9. Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = Math.abs(r * Math.cos(phi));
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    this.starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.0,
      sizeAttenuation: true
    });
    this.stars = new THREE.Points(starGeo, this.starsMat);
    this.scene.add(this.stars);
    
    // 10. Vegetation / Diverse Trees (Pine, Apple/Fruit, Tall Palm)
    this.treeGroup = new THREE.Group();
    this.treeGroup.visible = false;
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 18 + Math.random() * 90;
      const tx = Math.cos(angle) * radius;
      const tz = Math.sin(angle) * radius;
      
      const tree = this.createProceduralFlora(i % 30, tx, tz); // First 30 are trees
      tree.userData = { originalScale: tree.scale.x || 1.0 };
      this.treeGroup.add(tree);
    }
    this.scene.add(this.treeGroup);

    // Grass & Shrubs Group (Day 3)
    this.foliageGroup = new THREE.Group();
    this.foliageGroup.visible = false;
    
    // Add simple grass blades
    const grassColor = 0x385c28;
    for (let i = 0; i < 120; i++) {
      const grassClump = new THREE.Group();
      const bladeMat = new THREE.MeshStandardMaterial({ color: grassColor, roughness: 0.9, flatShading: true });
      for (let j = 0; j < 3; j++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.02), bladeMat);
        blade.rotation.y = (j * Math.PI) / 3;
        blade.rotation.x = 0.15 - Math.random() * 0.3;
        blade.position.y = 0.22;
        grassClump.add(blade);
      }
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + Math.random() * 100;
      const gx = Math.cos(angle) * radius;
      const gz = Math.sin(angle) * radius;
      const gy = this.getTerrainHeight(gx, gz);
      grassClump.position.set(gx, gy, gz);
      const gs = 0.7 + Math.random() * 0.8;
      grassClump.scale.set(gs, gs, gs);
      grassClump.userData = { originalScale: gs, type: 'grass' };
      this.foliageGroup.add(grassClump);
    }
    
    // Add flowers, desert, crops (indices 30 to 59)
    for (let i = 30; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 95;
      const sx = Math.cos(angle) * radius;
      const sz = Math.sin(angle) * radius;
      
      const plant = this.createProceduralFlora(i, sx, sz);
      const scale = plant.userData.originalScale || 1.0;
      plant.scale.set(scale, scale, scale);
      plant.userData = { originalScale: scale, type: 'shrub' };
      this.foliageGroup.add(plant);
    }
    this.scene.add(this.foliageGroup);

    // 10b. Fishes / Sea Creatures
    this.fishGroup = new THREE.Group();
    this.fishGroup.visible = false;
    const fishColors = [0xff5b00, 0xff003c, 0xffb700];
    for (let i = 0; i < 35; i++) {
      const fish = new THREE.Group();
      const bodyColor = fishColors[Math.floor(Math.random() * fishColors.length)];
      
      const fishMat = new THREE.MeshStandardMaterial({
        color: bodyColor,
        emissive: bodyColor,
        emissiveIntensity: 0.95,
        roughness: 0.3,
        flatShading: true
      });
      
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 4), fishMat);
      body.rotation.x = Math.PI / 2;
      fish.add(body);
      
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.15), fishMat);
      tail.position.z = -0.3;
      fish.add(tail);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 84;
      const fx = Math.cos(angle) * radius;
      const fz = Math.sin(angle) * radius;
      const fy = -1.45 - Math.random() * 0.4;
      
      fish.position.set(fx, fy, fz);
      const fs = 0.8 + Math.random() * 0.8;
      fish.scale.setScalar(fs);
      
      fish.userData = {
        angle: Math.random() * Math.PI * 2,
        radius: radius,
        speed: 0.15 + Math.random() * 0.15,
        depth: fy,
        wiggleSpeed: 5 + Math.random() * 3,
        tail: tail,
        phaseOffset: Math.random() * Math.PI * 2
      };
      this.fishGroup.add(fish);
    }
    this.scene.add(this.fishGroup);
    
    // 11. Birds
    this.birdGroup = new THREE.Group();
    this.birdGroup.visible = false;
    const birdColors = [0x111111, 0x222222, 0x333333];
    for (let i = 0; i < 35; i++) {
      const birdGeo = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        0.0, 0.0, 0.3,
        -0.4, 0.0, -0.1,
        0.0, 0.0, -0.1,
        0.0, 0.0, -0.1,
        0.4, 0.0, -0.1,
        0.0, 0.0, 0.3
      ]);
      birdGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      birdGeo.computeVertexNormals();
      
      const birdMat = new THREE.MeshStandardMaterial({
        color: birdColors[Math.floor(Math.random() * birdColors.length)],
        side: THREE.DoubleSide,
        roughness: 0.8
      });
      const birdMesh = new THREE.Mesh(birdGeo, birdMat);
      birdMesh.castShadow = true;
      
      const birdHolder = new THREE.Group();
      birdHolder.add(birdMesh);
      
      const offset = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 120;
      const height = 8 + Math.random() * 15;
      const speed = 0.12 + Math.random() * 0.1;
      
      birdHolder.userData = { 
        offset, 
        radius, 
        height, 
        speed, 
        mesh: birdMesh,
        yawOffset: Math.random() * Math.PI * 2
      };
      this.birdGroup.add(birdHolder);
    }
    this.scene.add(this.birdGroup);
    
    // 12. Animals (Day 6)
    this.animalGroup = new THREE.Group();
    this.animalGroup.visible = false;
    
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 110;
      const ax = Math.cos(angle) * radius;
      const az = Math.sin(angle) * radius;
      const ay = this.getTerrainHeight(ax, az);
      
      const animal = this.createProceduralFauna(i, ax, az);
      animal.lookAt(0, ay, 0);
      this.animalGroup.add(animal);
    }
    this.scene.add(this.animalGroup);
    
    // 13. Adam (Day 6) - Parent container for player character mesh
    this.adam = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xcc9c78, roughness: 0.8, flatShading: true });
    
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.1, 8), skinMat);
    torso.position.y = 1.05;
    torso.castShadow = true;
    
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), skinMat);
    head.position.y = 1.72;
    head.castShadow = true;
    
    const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.9, 6), skinMat);
    armL.position.set(-0.35, 1.1, 0);
    armL.castShadow = true;
    
    const armR = armL.clone();
    armR.position.x = 0.35;
    
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.95, 6), skinMat);
    legL.position.set(-0.13, 0.48, 0);
    legL.castShadow = true;
    
    const legR = legL.clone();
    legR.position.x = 0.13;
    
    this.adam.add(torso, head, armL, armR, legL, legR);
    this.adam.position.set(0, this.getTerrainHeight(0, 4), 4);
    this.adam.rotation.y = Math.PI;
    this.adam.visible = false;
    this.scene.add(this.adam);
    
    // 14. Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Bind mouse dragging look control
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Keyboard controls
    window.addEventListener('keydown', e => this.keys[e.code] = true);
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }
  
  getTerrainHeight(x, z) {
    const h = Math.sin(x * 0.015) * Math.cos(z * 0.015) * 6.5 + 
              Math.sin(x * 0.05 + z * 0.03) * 1.8 +
              Math.cos(x * 0.1) * Math.sin(z * 0.08) * 0.5;
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
  
  // Transition functions for each Day
  async transitionDayOne() {
    gsap.to(this.hemiLight, { intensity: 0.65, duration: 3.5, ease: 'power2.out' });
    gsap.to(this.skyMat.color, {
      r: 43/255, g: 58/255, b: 82/255,
      duration: 4.0, ease: 'power2.out'
    });
    this.scene.fog.color.set(0x2b3a52);
  }
  
  async transitionDayTwo() {
    gsap.to(this.skyMat.color, {
      r: 68/255, g: 102/255, b: 135/255,
      duration: 3.5, ease: 'power2.out'
    });
    this.scene.fog.color.set(0x446687);
  }
  
  async transitionDayThree() {
    gsap.to(this.ground.position, { y: 0, duration: 4.5, ease: 'power2.out' });
    gsap.to(this.waterMat, { opacity: 0.52, duration: 4.0, ease: 'power2.out' });
    
    this.treeGroup.visible = true;
    this.treeGroup.children.forEach(tree => {
      tree.scale.set(0, 0, 0);
      const originalScale = tree.userData.originalScale;
      const tx = tree.position.x;
      const tz = tree.position.z;
      tree.position.y = this.getTerrainHeight(tx, tz) + 40;
      
      gsap.to(tree.position, {
        y: this.getTerrainHeight(tx, tz) - this.ground.position.y,
        duration: 4.5,
        ease: 'power2.out'
      });
      
      gsap.to(tree.scale, {
        x: originalScale,
        y: originalScale,
        z: originalScale,
        duration: 2.5 + Math.random() * 2,
        delay: 1.0 + Math.random() * 1.5,
        ease: 'elastic.out(1, 0.75)'
      });
    });

    this.foliageGroup.visible = true;
    this.foliageGroup.children.forEach(foliage => {
      foliage.scale.set(0, 0, 0);
      const originalScale = foliage.userData.originalScale;
      const fx = foliage.position.x;
      const fz = foliage.position.z;
      foliage.position.y = this.getTerrainHeight(fx, fz) + 40;
      
      gsap.to(foliage.position, {
        y: this.getTerrainHeight(fx, fz) - this.ground.position.y,
        duration: 4.5,
        ease: 'power2.out'
      });
      
      gsap.to(foliage.scale, {
        x: originalScale,
        y: originalScale,
        z: originalScale,
        duration: 2.0 + Math.random() * 1.5,
        delay: 0.5 + Math.random() * 1.8,
        ease: 'power2.out'
      });
    });
  }
  
  async transitionDayFour() {
    this.sunDisc.visible = true;
    this.moonDisc.visible = true;
    
    this.sunDisc.position.set(120, 180, 220);
    this.moonDisc.position.set(-140, 120, 260);
    
    gsap.to(this.sunLight, { intensity: 1.3, duration: 4.0, ease: 'power2.out' });
    gsap.to(this.starsMat, { opacity: 0.85, duration: 3.5, ease: 'power2.inOut' });
    
    gsap.to(this.skyMat.color, {
      r: 96/255, g: 125/255, b: 158/255,
      duration: 4.0, ease: 'power2.out'
    });
    this.scene.fog.color.set(0x607d9e);
  }
  
  async transitionDayFive() {
    this.birdGroup.visible = true;
    this.birdGroup.children.forEach(birdHolder => {
      birdHolder.scale.set(0, 0, 0);
      gsap.to(birdHolder.scale, {
        x: 1.0, y: 1.0, z: 1.0,
        duration: 2.0,
        ease: 'back.out(1.7)'
      });
    });

    this.fishGroup.visible = true;
    this.fishGroup.children.forEach(fish => {
      fish.scale.set(0, 0, 0);
      const targetScale = fish.scale.x === 0 ? 0.7 + Math.random() * 0.7 : fish.scale.x;
      gsap.to(fish.scale, {
        x: targetScale, y: targetScale, z: targetScale,
        duration: 2.5,
        ease: 'power2.out',
        delay: Math.random() * 1.5
      });
    });
  }
  
  async transitionDaySix() {
    this.animalGroup.visible = true;
    this.animalGroup.children.forEach(animal => {
      animal.scale.set(0, 0, 0);
      gsap.to(animal.scale, {
        x: 1.0, y: 1.0, z: 1.0,
        duration: 2.2,
        ease: 'back.out(1.5)',
        delay: Math.random() * 1.2
      });
    });
  }
  
  async formAdam() {
    this.adam.visible = true;
    this.adam.position.y = this.getTerrainHeight(0, 4) - 2.0;
    
    // Zoom/focus camera looking towards Adam
    gsap.to(this.camera.position, {
      x: 0,
      y: this.getTerrainHeight(0, 4) + 1.2,
      z: 7.5,
      duration: 6.0,
      ease: 'power1.inOut'
    });
    
    gsap.to(this.adam.position, {
      y: this.getTerrainHeight(0, 4),
      duration: 7.0,
      ease: 'power2.out'
    });
  }
  
  unlockControls() {
    this.movementEnabled = true;
    this.targetYaw = Math.PI;
    this.targetPitch = -0.15;
  }
  
  update(time, dt) {
    const elapsed = time;
    
    // Wave animation on water vertices
    if (this.water.visible) {
      const waterPos = this.waterGeo.attributes.position;
      for (let i = 0; i < waterPos.count; i++) {
        const x = waterPos.getX(i);
        const z = waterPos.getZ(i);
        const wave = Math.sin(x * 0.05 + elapsed * 1.2) * Math.cos(z * 0.05 + elapsed * 1.0) * 0.2 +
                     Math.sin(x * 0.12 - elapsed * 1.8) * 0.08;
        waterPos.setY(i, wave);
      }
      this.waterGeo.computeVertexNormals();
      waterPos.needsUpdate = true;
    }

    // Fish swim update
    if (this.fishGroup.visible) {
      this.fishGroup.children.forEach(fish => {
        const data = fish.userData;
        
        data.angle += dt * data.speed * (1.0 + Math.sin(elapsed * 0.8 + data.phaseOffset) * 0.2);
        
        const dynamicRadius = data.radius + Math.sin(elapsed * 0.5 + data.phaseOffset) * 1.5;
        const fx = Math.cos(data.angle) * dynamicRadius;
        const fz = Math.sin(data.angle) * dynamicRadius;
        
        fish.position.x = fx;
        fish.position.z = fz;
        fish.position.y = data.depth + Math.sin(elapsed * 1.5 + data.phaseOffset) * 0.15;
        
        fish.lookAt(
          Math.cos(data.angle + 0.05) * dynamicRadius,
          fish.position.y,
          Math.sin(data.angle + 0.05) * dynamicRadius
        );
        
        if (data.tail) {
          data.tail.rotation.y = Math.sin(elapsed * data.wiggleSpeed) * 0.35;
        }
      });
    }
    
    // Birds flying loops
    if (this.birdGroup.visible) {
      this.birdGroup.children.forEach(birdHolder => {
        const data = birdHolder.userData;
        const currentAngle = elapsed * data.speed + data.offset;
        
        const waveRadius = data.radius + Math.cos(elapsed * 0.3 + data.yawOffset) * 4.0;
        const waveHeight = data.height + Math.sin(elapsed * 0.8 + data.offset) * 0.8;
        
        birdHolder.position.set(
          Math.cos(currentAngle) * waveRadius,
          waveHeight,
          Math.sin(currentAngle) * waveRadius
        );
        
        birdHolder.lookAt(
          Math.cos(currentAngle + 0.05) * waveRadius,
          waveHeight + Math.sin((elapsed + 0.05) * 0.8 + data.offset) * 0.05,
          Math.sin(currentAngle + 0.05) * waveRadius
        );
        
        const wingMesh = data.mesh;
        const wingPos = wingMesh.geometry.attributes.position;
        const flap = Math.sin(elapsed * 8.0 + data.offset) * 0.16;
        
        wingPos.setY(1, flap);
        wingPos.setY(4, flap);
        wingPos.needsUpdate = true;
      });
    }

    // Wander animation for land animals
    if (this.animalGroup.visible) {
      this.animalGroup.children.forEach(animal => {
        const speed = animal.userData.speed || 0.35;
        
        if (Math.random() < 0.015) {
          animal.userData.wanderAngle += (Math.random() - 0.5) * 2.0;
        }
        
        const dtMove = dt * speed;
        const dx = Math.sin(animal.userData.wanderAngle) * dtMove;
        const dz = Math.cos(animal.userData.wanderAngle) * dtMove;
        
        const newX = animal.position.x + dx;
        const newZ = animal.position.z + dz;
        
        const dist = Math.sqrt(newX * newX + newZ * newZ);
        if (dist > 5 && dist < 190) {
          animal.position.x = newX;
          animal.position.z = newZ;
          animal.position.y = this.getTerrainHeight(newX, newZ);
          animal.lookAt(newX + dx * 10, animal.position.y, newZ + dz * 10);
        } else {
          animal.userData.wanderAngle += Math.PI;
        }
      });
    }
    
    // Smooth camera follow yaw and pitch interpolation
    this.yaw += (this.targetYaw - this.yaw) * 0.1;
    this.pitch += (this.targetPitch - this.pitch) * 0.1;
    
    // WASD movement processing (Third person follow mechanics)
    if (this.movementEnabled) {
      const speed = 2.4 * dt; // Decreased speed for natural character walking control
      
      // Calculate horizontal camera vectors
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
      
      if (move.lengthSq() > 0) {
        move.normalize().multiplyScalar(speed);
        this.adam.position.add(move);
        
        // Lock Adam to terrain height
        this.adam.position.y = this.getTerrainHeight(this.adam.position.x, this.adam.position.z);
        
        // Rotate Adam to face movement direction (adding Math.PI to turn him around correctly)
        const targetAngle = Math.atan2(move.x, move.z);
        this.adam.rotation.y = targetAngle;
        
        // Limb walk animation swings
        const swing = Math.sin(elapsed * 9.0) * 0.42;
        this.adam.children[4].rotation.x = swing;  // Left Leg
        this.adam.children[5].rotation.x = -swing; // Right Leg
        this.adam.children[2].rotation.x = -swing; // Left Arm
        this.adam.children[3].rotation.x = swing;  // Right Arm
      } else {
        // Return limbs smoothly to standing position
        this.adam.children[4].rotation.x *= 0.85;
        this.adam.children[5].rotation.x *= 0.85;
        this.adam.children[2].rotation.x *= 0.85;
        this.adam.children[3].rotation.x *= 0.85;
      }
      
      // Spring arm camera calculation (maintain distance of 4.5 units behind Adam)
      const springArmDist = 4.5;
      const camOffset = new THREE.Vector3(
        Math.sin(this.yaw) * Math.cos(this.pitch) * springArmDist,
        Math.sin(this.pitch) * springArmDist + 1.4, // look-down offset
        Math.cos(this.yaw) * Math.cos(this.pitch) * springArmDist
      );
      
      const targetCamPos = this.adam.position.clone().add(camOffset);
      this.camera.position.lerp(targetCamPos, 0.12);
      
      // Point camera at Adam's torso/chest area
      const lookTarget = new THREE.Vector3(this.adam.position.x, this.adam.position.y + 1.2, this.adam.position.z);
      this.camera.lookAt(lookTarget);
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}
