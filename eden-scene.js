import * as THREE from 'three';
import { gsap } from 'gsap';

export class EdenScene {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.clock = new THREE.Clock();
    this.movementEnabled = false;
    this.keys = {};
    
    this.yaw = Math.PI;
    this.pitch = -0.15;
    this.targetYaw = Math.PI;
    this.targetPitch = -0.15;
    
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    this.isFallen = false;
    this.fruitInHand = null;
    
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
    
    this.scene.background = new THREE.Color(0xdce6f0);
    this.scene.fog = new THREE.FogExp2(0xdce6f0, 0.005);
    
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(0, 1.6, 12);
    
    this.hemiLight = new THREE.HemisphereLight(0xfff5e6, 0x3d4f30, 0.95);
    this.scene.add(this.hemiLight);
    
    this.sunLight = new THREE.DirectionalLight(0xffeed6, 1.45);
    this.sunLight.position.set(80, 120, 100);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);
    
    // Divine presence light
    this.presenceLight = new THREE.SpotLight(0xfff3a0, 0.0, 35, Math.PI / 7, 0.5, 1.0);
    this.presenceLight.position.set(0, 18, -10);
    this.presenceLight.castShadow = true;
    this.scene.add(this.presenceLight);
    this.scene.add(this.presenceLight.target);
    
    // Terrain / Ground
    const groundGeo = new THREE.PlaneGeometry(450, 450, 80, 80);
    groundGeo.rotateX(-Math.PI / 2);
    
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const h = Math.sin(x * 0.012) * Math.cos(z * 0.012) * 5.0 + 
                Math.sin(x * 0.06 + z * 0.04) * 1.2;
      posAttr.setY(i, h);
    }
    groundGeo.computeVertexNormals();
    
    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0x3a5f25,
      roughness: 0.85,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    
    // Four Rivers of Eden
    this.waterMat = new THREE.MeshStandardMaterial({
      color: 0x125166,
      roughness: 0.08,
      metalness: 0.1,
      transparent: true,
      opacity: 0.72,
      flatShading: true
    });
    
    this.riversGroup = new THREE.Group();
    for (let r = 0; r < 4; r++) {
      const riverGeo = new THREE.PlaneGeometry(12, 220);
      riverGeo.rotateX(-Math.PI / 2);
      const river = new THREE.Mesh(riverGeo, this.waterMat);
      river.rotation.y = (r * Math.PI) / 2;
      river.position.set(0, -1.45, 0);
      this.riversGroup.add(river);
    }
    this.scene.add(this.riversGroup);
    
    // Foliage Group
    this.foliageGroup = new THREE.Group();
    const flowerColors = [0xff5b5b, 0xffd23f, 0x3b82f6, 0xec4899];
    
    for (let i = 0; i < 200; i++) {
      const grass = new THREE.Group();
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x4f7d32, roughness: 0.9, flatShading: true });
      for (let j = 0; j < 3; j++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.02), bladeMat);
        blade.rotation.y = (j * Math.PI) / 3;
        blade.rotation.x = 0.15 - Math.random() * 0.3;
        blade.position.y = 0.22;
        grass.add(blade);
      }
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 95;
      const gx = Math.cos(angle) * radius;
      const gz = Math.sin(angle) * radius;
      const gy = this.getTerrainHeight(gx, gz);
      grass.position.set(gx, gy, gz);
      grass.scale.setScalar(0.8 + Math.random() * 0.6);
      this.foliageGroup.add(grass);
    }
    
    for (let i = 0; i < 110; i++) {
      const flower = new THREE.Group();
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4), new THREE.MeshStandardMaterial({ color: 0x4f7d32 }));
      stem.position.y = 0.2;
      flower.add(stem);
      
      const headColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.08, 4, 4), new THREE.MeshStandardMaterial({ color: headColor, flatShading: true }));
      head.position.y = 0.42;
      flower.add(head);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 80;
      const fx = Math.cos(angle) * radius;
      const fz = Math.sin(angle) * radius;
      const fy = this.getTerrainHeight(fx, fz);
      flower.position.set(fx, fy, fz);
      flower.scale.setScalar(0.8 + Math.random() * 0.6);
      this.foliageGroup.add(flower);
    }
    this.scene.add(this.foliageGroup);
    
    // Diverse Eden Trees
    this.treeGroup = new THREE.Group();
    const treeColors = [0x2f4f1e, 0x3b6424, 0x487a2d];
    for (let i = 0; i < 60; i++) {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.22, 2.2, 5),
        new THREE.MeshStandardMaterial({ color: 0x4e3624, roughness: 0.9 })
      );
      trunk.position.y = 1.1;
      trunk.castShadow = true;
      tree.add(trunk);
      
      const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 6, 6),
        new THREE.MeshStandardMaterial({ color: treeColors[Math.floor(Math.random() * treeColors.length)], roughness: 0.9, flatShading: true })
      );
      leaves.position.y = 2.4;
      leaves.castShadow = true;
      tree.add(leaves);
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 18 + Math.random() * 95;
      const tx = Math.cos(angle) * radius;
      const tz = Math.sin(angle) * radius;
      const ty = this.getTerrainHeight(tx, tz);
      tree.position.set(tx, ty, tz);
      tree.scale.setScalar(0.8 + Math.random() * 0.9);
      this.treeGroup.add(tree);
    }
    
    // --- Specific Hiding Spot Tree Cluster ---
    // Spawn hiding foliage specifically at (10, y, -10)
    const hidingSpotGroup = new THREE.Group();
    hidingSpotGroup.position.set(10, this.getTerrainHeight(10, -10), -10);
    
    for (let j = 0; j < 3; j++) {
      const hTree = new THREE.Group();
      const hTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 2.8, 6), new THREE.MeshStandardMaterial({ color: 0x4e3624 }));
      hTrunk.position.y = 1.4;
      hTrunk.castShadow = true;
      
      const hLeaves = new THREE.Mesh(new THREE.SphereGeometry(1.6, 6, 6), new THREE.MeshStandardMaterial({ color: 0x224018, flatShading: true }));
      hLeaves.position.y = 3.2;
      hLeaves.castShadow = true;
      
      hTree.add(hTrunk, hLeaves);
      const angleOffset = (j * Math.PI * 2) / 3;
      hTree.position.set(Math.cos(angleOffset) * 1.5, 0, Math.sin(angleOffset) * 1.5);
      hidingSpotGroup.add(hTree);
    }
    
    // Add thick hiding shrubs around the trunk bases
    for (let j = 0; j < 5; j++) {
      const hShrub = new THREE.Mesh(new THREE.SphereGeometry(0.85, 4, 4), new THREE.MeshStandardMaterial({ color: 0x1d3a14, flatShading: true }));
      hShrub.castShadow = true;
      const angleOffset = (j * Math.PI * 2) / 5;
      hShrub.position.set(Math.cos(angleOffset) * 2.2, 0.45, Math.sin(angleOffset) * 2.2);
      hidingSpotGroup.add(hShrub);
    }
    this.treeGroup.add(hidingSpotGroup);
    this.scene.add(this.treeGroup);
    
    // --- Central Tree of Knowledge ---
    this.centerTree = new THREE.Group();
    
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x2b1509, roughness: 0.95, flatShading: true });
    for (let j = 0; j < 3; j++) {
      const tSegment = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, 4.8, 5), trunkMat);
      tSegment.castShadow = true;
      tSegment.receiveShadow = true;
      const offsetAng = (j * Math.PI * 2) / 3;
      tSegment.position.set(Math.cos(offsetAng) * 0.22, 2.4, Math.sin(offsetAng) * 0.22);
      tSegment.rotation.y = offsetAng;
      tSegment.rotation.z = 0.08;
      this.centerTree.add(tSegment);
    }
    
    this.cLeavesMat = new THREE.MeshStandardMaterial({ color: 0x16361d, roughness: 0.85, flatShading: true });
    this.cLeavesGoldMat = new THREE.MeshStandardMaterial({ color: 0x3d3810, roughness: 0.8, flatShading: true });
    
    const foliageBase = new THREE.Mesh(new THREE.SphereGeometry(2.8, 8, 8), this.cLeavesMat);
    foliageBase.position.y = 5.2; // bottom starts at 2.4
    foliageBase.castShadow = true;
    this.centerTree.add(foliageBase);
    
    const foliageGoldTop = new THREE.Mesh(new THREE.SphereGeometry(1.6, 7, 7), this.cLeavesGoldMat);
    foliageGoldTop.position.set(0, 6.8, 0);
    foliageGoldTop.castShadow = true;
    this.centerTree.add(foliageGoldTop);
    
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x112b17, roughness: 0.9 });
    for (let j = 0; j < 8; j++) {
      const vine = new THREE.Mesh(new THREE.ConeGeometry(0.15, 1.8, 4), vineMat);
      const vAng = (j * Math.PI * 2) / 8;
      vine.position.set(Math.cos(vAng) * 2.2, 3.8, Math.sin(vAng) * 2.2);
      this.centerTree.add(vine);
    }
    
    this.forbiddenFruits = new THREE.Group();
    const fruitColors = [0xff3c00, 0x8a2be2];
    for (let i = 0; i < 9; i++) {
      const col = fruitColors[i % 2];
      const fruitMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.95,
        roughness: 0.3
      });
      const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), fruitMat);
      const angle = (i * Math.PI * 2) / 9;
      fruit.position.set(
        Math.cos(angle) * 1.8,
        4.4 + Math.random() * 0.8,
        Math.sin(angle) * 1.8
      );
      this.forbiddenFruits.add(fruit);
    }
    this.centerTree.add(this.forbiddenFruits);
    this.centerTree.position.set(0, this.getTerrainHeight(0, 0), 0);
    this.scene.add(this.centerTree);
    
    // --- Serpent (Wound below the canopy line for complete visibility) ---
    this.serpent = new THREE.Group();
    const serpentColors = [0x117a23, 0x111111, 0xffe600];
    const totalSegs = 28; // Tighter length to keep head below y=2.4 canopy line
    for (let i = 0; i < totalSegs; i++) {
      const scaleFactor = 1.0 - (i / totalSegs) * 0.65;
      const segment = new THREE.Mesh(
        new THREE.SphereGeometry(0.15 * scaleFactor, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: serpentColors[i % 3], 
          roughness: 0.25,
          flatShading: true
        })
      );
      const ang = i * 0.45;
      const segY = 0.5 + i * 0.05; // Head sits at 0.5 + 1.4 = 1.9 (below 2.4 foliage line)
      segment.position.set(Math.cos(ang) * 0.42, segY, Math.sin(ang) * 0.42);
      segment.castShadow = true;
      this.serpent.add(segment);
    }
    
    this.serpentHead = new THREE.Group();
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.32), new THREE.MeshStandardMaterial({ color: 0x0f521c, roughness: 0.3 }));
    const eyes = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    eyes.position.set(0.09, 0.04, 0.1);
    const eyeR = eyes.clone(); eyeR.position.x = -0.09;
    
    const tongueStem = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.01, 0.18), new THREE.MeshBasicMaterial({ color: 0xff1111 }));
    tongueStem.position.set(0, -0.04, 0.22);
    
    const tongueLeft = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.08), new THREE.MeshBasicMaterial({ color: 0xff1111 }));
    tongueLeft.position.set(-0.02, -0.04, 0.3);
    tongueLeft.rotation.y = 0.4;
    
    const tongueRight = tongueLeft.clone();
    tongueRight.position.x = 0.02;
    tongueRight.rotation.y = -0.4;
    
    this.serpentHead.add(skull, eyes, eyeR, tongueStem, tongueLeft, tongueRight);
    
    const headAngle = totalSegs * 0.45;
    this.serpentHead.position.set(Math.cos(headAngle) * 0.44, 0.5 + totalSegs * 0.05, Math.sin(headAngle) * 0.44);
    this.serpentHead.lookAt(-7.0, 0.5 + totalSegs * 0.05, 9.0);
    this.serpent.add(this.serpentHead);
    this.serpent.position.copy(this.centerTree.position);
    this.scene.add(this.serpent);
    
    // --- EAST GATE CHERUBIMS & FLAMING SWORD ---
    this.eastGateGroup = new THREE.Group();
    this.eastGateGroup.position.set(22, this.getTerrainHeight(22, 0), 0);
    this.eastGateGroup.visible = false; // Hidden until the driving out sequence
    
    const goldArmorMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xffb700,
      emissiveIntensity: 0.15
    });
    
    for (let c = 0; c < 2; c++) {
      const cherubim = new THREE.Group();
      // Body
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 1.8, 8), goldArmorMat);
      body.position.y = 0.9;
      body.castShadow = true;
      
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), goldArmorMat);
      head.position.y = 1.95;
      
      // Large golden wings
      const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.6, 0.65), goldArmorMat);
      wingL.position.set(-0.4, 1.3, -0.2);
      wingL.rotation.y = 0.3;
      wingL.rotation.z = -0.25;
      
      const wingR = wingL.clone();
      wingR.position.x = 0.4;
      wingR.rotation.y = -0.3;
      wingR.rotation.z = 0.25;
      
      cherubim.add(body, head, wingL, wingR);
      cherubim.position.set(0, 0, c === 0 ? -2.8 : 2.8);
      cherubim.lookAt(0, 0, 0); // Looking inwards towards the path
      this.eastGateGroup.add(cherubim);
    }
    
    // Hovering Flaming Sword
    this.flamingSword = new THREE.Group();
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 0.24), new THREE.MeshStandardMaterial({
      color: 0xff3300,
      emissive: 0xff2200,
      emissiveIntensity: 3.0
    }));
    blade.position.y = 0.8;
    blade.castShadow = true;
    
    const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.12), goldArmorMat);
    hilt.position.y = 0.1;
    this.flamingSword.add(blade, hilt);
    this.flamingSword.position.set(0, 1.5, 0);
    this.eastGateGroup.add(this.flamingSword);
    
    this.scene.add(this.eastGateGroup);
    
    // Eve (NPC Companion)
    this.eve = new THREE.Group();
    this.eve.name = 'Eve';
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xebb494, roughness: 0.85 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0xe6c875, roughness: 0.9 });
    
    const eTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.0, 8), skinMat);
    eTorso.position.y = 1.0;
    eTorso.castShadow = true;
    
    const eHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), skinMat);
    eHead.position.y = 1.62;
    eHead.castShadow = true;
    
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.6, 0.24), hairMat);
    hair.position.set(0, 1.5, -0.06);
    
    this.eveArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.85), skinMat);
    this.eveArmL.position.set(-0.3, 1.0, 0);
    this.eveArmL.castShadow = true;
    
    this.eveArmR = this.eveArmL.clone();
    this.eveArmR.position.x = 0.3;
    
    const eLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6), skinMat);
    eLegL.position.set(-0.1, 0.45, 0);
    eLegL.castShadow = true;
    const eLegR = eLegL.clone(); eLegR.position.x = 0.1;
    
    this.eve.add(eTorso, eHead, hair, this.eveArmL, this.eveArmR, eLegL, eLegR);
    this.eve.position.set(-7.0, this.getTerrainHeight(-7.0, 9.0), 9.0);
    this.eve.lookAt(0, this.eve.position.y, 0);
    this.scene.add(this.eve);
    
    // Adam (Player)
    this.adam = new THREE.Group();
    this.adam.name = 'Adam';
    const skinMatAdam = new THREE.MeshStandardMaterial({ color: 0xcc9c78, roughness: 0.8, flatShading: true });
    const hairMatAdam = new THREE.MeshStandardMaterial({ color: 0x422f25, roughness: 0.9 });
    
    const aTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.1, 8), skinMatAdam);
    aTorso.position.y = 1.05;
    aTorso.castShadow = true;
    
    const aHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), skinMatAdam);
    aHead.position.y = 1.72;
    aHead.castShadow = true;
    
    const aHair = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 0.26), hairMatAdam);
    aHair.position.set(0, 1.84, 0);
    
    this.adamArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.9, 6), skinMatAdam);
    this.adamArmL.position.set(-0.35, 1.1, 0);
    this.adamArmL.castShadow = true;
    
    this.adamArmR = this.adamArmL.clone();
    this.adamArmR.position.x = 0.35;
    
    const aLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.95, 6), skinMatAdam);
    aLegL.position.set(-0.12, 0.48, 0);
    aLegL.castShadow = true;
    const aLegR = aLegL.clone(); aLegR.position.x = 0.12;
    
    this.adam.add(aTorso, aHead, aHair, this.adamArmL, this.adamArmR, aLegL, aLegR);
    this.adam.position.set(-9.0, this.getTerrainHeight(-9.0, 9.0), 9.0);
    this.adam.lookAt(0, this.adam.position.y, 0);
    this.scene.add(this.adam);
    
    // Animals
    this.animalGroup = new THREE.Group();
    for (let i = 0; i < 30; i++) {
      const typeRoll = i % 3;
      const animal = new THREE.Group();
      
      if (typeRoll === 0) {
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.48, 5, 5), new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.9 }));
        body.scale.set(1.3, 1.0, 1.0);
        body.position.y = 0.65;
        animal.add(body);
        
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 5, 5), new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
        head.position.set(0, 0.9, 0.55);
        animal.add(head);
        
        animal.userData = { type: 'sheep', wanderAngle: Math.random() * Math.PI * 2, speed: 0.22 };
      } else if (typeRoll === 1) {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 1.2), new THREE.MeshStandardMaterial({ color: 0xcaa066, roughness: 0.8 }));
        body.position.y = 0.65;
        animal.add(body);
        
        const mane = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x4a2e1d }));
        mane.position.set(0, 0.95, 0.45);
        mane.rotation.x = Math.PI/3;
        animal.add(mane);
        
        animal.userData = { type: 'lion', wanderAngle: Math.random() * Math.PI * 2, speed: 0.38 };
      } else {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.32), new THREE.MeshStandardMaterial({ color: 0x8f5831 }));
        body.position.y = 0.12;
        animal.add(body);
        
        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.12), new THREE.MeshStandardMaterial({ color: 0x8f5831 }));
        tail.position.set(0, 0.22, -0.16);
        tail.rotation.x = -0.4;
        animal.add(tail);
        
        animal.userData = { type: 'squirrel', wanderAngle: Math.random() * Math.PI * 2, speed: 0.55 };
      }
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 110;
      const ax = Math.cos(angle) * radius;
      const az = Math.sin(angle) * radius;
      const ay = this.getTerrainHeight(ax, az);
      
      animal.position.set(ax, ay, az);
      animal.lookAt(0, ay, 0);
      animal.scale.setScalar(0.85 + Math.random() * 0.3);
      this.animalGroup.add(animal);
    }
    this.scene.add(this.animalGroup);
    
    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    window.addEventListener('keydown', e => this.keys[e.code] = true);
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }
  
  getTerrainHeight(x, z) {
    const h = Math.sin(x * 0.012) * Math.cos(z * 0.012) * 5.0 + 
              Math.sin(x * 0.06 + z * 0.04) * 1.2;
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
  
  coverThemselves() {
    gsap.to(this.eveArmL.rotation, { z: 0.65, x: -0.3, duration: 1.5 });
    gsap.to(this.eveArmR.rotation, { z: -0.65, x: -0.3, duration: 1.5 });
    
    gsap.to(this.adamArmL.rotation, { z: 0.65, x: -0.3, duration: 1.5 });
    gsap.to(this.adamArmR.rotation, { z: -0.65, x: -0.3, duration: 1.5 });
  }
  
  triggerTheFall() {
    this.isFallen = true;
    
    gsap.to(this.scene.background, { r: 0.1, g: 0.09, b: 0.14, duration: 6.0, ease: 'power2.inOut' });
    gsap.to(this.scene.fog.color, { r: 0.1, g: 0.09, b: 0.14, duration: 6.0, ease: 'power2.inOut' });
    gsap.to(this.scene.fog, { density: 0.012, duration: 6.0, ease: 'power2.inOut' });
    
    gsap.to(this.hemiLight, { intensity: 0.25, duration: 5.5, ease: 'power2.out' });
    gsap.to(this.sunLight, { intensity: 0.15, duration: 5.5, ease: 'power2.out' });
    
    gsap.to(this.groundMat.color, { r: 92/255, g: 79/255, b: 64/255, duration: 5.5 });
    
    this.riversGroup.children.forEach(river => {
      gsap.to(river.material.color, { r: 24/255, g: 26/255, b: 31/255, duration: 5.0 });
    });
    
    this.foliageGroup.children.forEach(fol => {
      gsap.to(fol.scale, { x: 0.1, y: 0.01, z: 0.1, duration: 4.0, ease: 'power2.in' });
    });
    
    this.treeGroup.children.forEach(tree => {
      const leavesMesh = tree.children[1];
      if (leavesMesh && leavesMesh.material) {
        gsap.to(leavesMesh.material.color, { r: 85/255, g: 68/255, b: 51/255, duration: 5.0 });
      }
    });
    
    gsap.to(this.cLeavesMat.color, { r: 56/255, g: 39/255, b: 24/255, duration: 5.0 });
    gsap.to(this.cLeavesGoldMat.color, { r: 40/255, g: 32/255, b: 20/255, duration: 5.0 });
    
    this.forbiddenFruits.children.forEach(fruit => {
      gsap.to(fruit.material, { emissiveIntensity: 0.0, duration: 3.5 });
      gsap.to(fruit.material.color, { r: 0.15, g: 0.05, b: 0.1, duration: 4.0 });
    });
    
    this.animalGroup.children.forEach(animal => {
      animal.userData.speed *= 2.6;
      const angle = Math.atan2(animal.position.z, animal.position.x);
      animal.userData.wanderAngle = angle + (Math.random() - 0.5) * 0.5;
    });
  }
  
  unlockControls() {
    this.movementEnabled = true;
    this.targetYaw = Math.PI;
    this.targetPitch = -0.15;
  }
  
  update(time, dt) {
    const elapsed = time;
    
    // Wave animation on rivers
    this.riversGroup.children.forEach(river => {
      const riverPos = river.geometry.attributes.position;
      for (let i = 0; i < riverPos.count; i++) {
        const x = riverPos.getX(i);
        const z = riverPos.getZ(i);
        const wave = Math.sin(x * 0.04 + elapsed * 0.8) * Math.cos(z * 0.04 + elapsed * 0.7) * 0.18;
        riverPos.setY(i, wave);
      }
      river.geometry.computeVertexNormals();
      riverPos.needsUpdate = true;
    });
    
    // Pulse Knowledge fruits
    if (this.forbiddenFruits && !this.isFallen) {
      this.forbiddenFruits.children.forEach((fruit, idx) => {
        const scaleVal = 1.0 + Math.sin(elapsed * 2.5 + idx) * 0.12;
        fruit.scale.setScalar(scaleVal);
        fruit.material.emissiveIntensity = 0.85 + Math.sin(elapsed * 2.5 + idx) * 0.15;
      });
    }
    
    // Slither serpent
    if (this.serpent && !this.isFallen) {
      const totalSegs = 28;
      this.serpent.children.forEach((seg, idx) => {
        if (idx < totalSegs) {
          const ang = idx * 0.45 + Math.sin(elapsed * 2.0 - idx * 0.15) * 0.08;
          seg.position.x = Math.cos(ang) * 0.42;
          seg.position.z = Math.sin(ang) * 0.42;
        }
      });
      const headAngle = totalSegs * 0.45 + Math.sin(elapsed * 2.0 - totalSegs * 0.15) * 0.05;
      this.serpentHead.position.set(Math.cos(headAngle) * 0.44, 0.5 + totalSegs * 0.05, Math.sin(headAngle) * 0.44);
    }
    
    // Animal wanders
    if (this.animalGroup.visible) {
      this.animalGroup.children.forEach(animal => {
        const speed = animal.userData.speed;
        
        if (!this.isFallen && Math.random() < 0.015) {
          animal.userData.wanderAngle += (Math.random() - 0.5) * 2.0;
        }
        
        const dtMove = dt * speed;
        const dx = Math.sin(animal.userData.wanderAngle) * dtMove;
        const dz = Math.cos(animal.userData.wanderAngle) * dtMove;
        
        const newX = animal.position.x + dx;
        const newZ = animal.position.z + dz;
        
        const dist = Math.sqrt(newX * newX + newZ * newZ);
        if (dist > 3 && dist < 210) {
          animal.position.x = newX;
          animal.position.z = newZ;
          animal.position.y = this.getTerrainHeight(newX, newZ);
          animal.lookAt(newX + dx * 10, animal.position.y, newZ + dz * 10);
        } else {
          animal.userData.wanderAngle += Math.PI;
        }
      });
    }
    
    // --- Companion Eve Follow System ---
    if (this.movementEnabled && !this.isFallen && this.adam) {
      const distToAdam = this.eve.position.distanceTo(this.adam.position);
      
      if (distToAdam > 2.8) {
        this.eve.lookAt(this.adam.position.x, this.eve.position.y, this.adam.position.z);
        
        const walkSpeed = 1.6 * dt;
        const dir = new THREE.Vector3().subVectors(this.adam.position, this.eve.position);
        dir.y = 0;
        dir.normalize().multiplyScalar(walkSpeed);
        
        this.eve.position.add(dir);
        this.eve.position.y = this.getTerrainHeight(this.eve.position.x, this.eve.position.z);
        
        const swing = Math.sin(elapsed * 8.5) * 0.4;
        this.eve.children[5].rotation.x = swing;
        this.eve.children[6].rotation.x = -swing;
      } else {
        this.eve.lookAt(this.adam.position.x, this.eve.position.y, this.adam.position.z);
        this.eve.children[5].rotation.x *= 0.85;
        this.eve.children[6].rotation.x *= 0.85;
      }
    }
    
    // Move the divine presence light target
    if (this.presenceLight && this.presenceLight.intensity > 0) {
      this.presenceLight.target.position.x = Math.sin(elapsed * 1.5) * 4.5;
      this.presenceLight.target.position.z = Math.cos(elapsed * 1.5) * 4.5;
    }
    
    // Rotate Flaming Sword
    if (this.eastGateGroup.visible && this.flamingSword) {
      this.flamingSword.rotation.y += dt * 4.5; // rapid spin
      this.flamingSword.position.y = 1.5 + Math.sin(elapsed * 3.5) * 0.15; // float bobbing
    }
    
    // Smooth camera rotation
    this.yaw += (this.targetYaw - this.yaw) * 0.1;
    this.pitch += (this.targetPitch - this.pitch) * 0.1;
    
    // WASD movement processing
    if (this.movementEnabled) {
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
      
      if (move.lengthSq() > 0) {
        move.normalize().multiplyScalar(speed);
        this.adam.position.add(move);
        
        this.adam.position.y = this.getTerrainHeight(this.adam.position.x, this.adam.position.z);
        
        const targetAngle = Math.atan2(move.x, move.z);
        this.adam.rotation.y = targetAngle;
        
        const swing = Math.sin(elapsed * 9.0) * 0.42;
        this.adam.children[5].rotation.x = swing;
        this.adam.children[6].rotation.x = -swing;
        this.adam.children[3].rotation.x = -swing;
        this.adam.children[4].rotation.x = swing;
      } else {
        this.adam.children[5].rotation.x *= 0.85;
        this.adam.children[6].rotation.x *= 0.85;
        this.adam.children[3].rotation.x *= 0.85;
        this.adam.children[4].rotation.x *= 0.85;
      }
      
      // Spring arm camera
      const springArmDist = 5.0;
      const camOffset = new THREE.Vector3(
        Math.sin(this.yaw) * Math.cos(this.pitch) * springArmDist,
        Math.sin(this.pitch) * springArmDist + 1.4,
        Math.cos(this.yaw) * Math.cos(this.pitch) * springArmDist
      );
      
      const targetCamPos = this.adam.position.clone().add(camOffset);
      this.camera.position.lerp(targetCamPos, 0.12);
      
      const lookTarget = new THREE.Vector3(this.adam.position.x, this.adam.position.y + 1.2, this.adam.position.z);
      this.camera.lookAt(lookTarget);
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}
