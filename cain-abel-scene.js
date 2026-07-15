import * as THREE from 'three';
import { gsap } from 'gsap';

export class CainAbelScene {
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
    
    // Sacrifice visual variables
    this.altarLightActive = false;
    this.altarSmokeActive = false;
    this.smokeParticles = [];
    
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
    
    this.scene.background = new THREE.Color(0xdbe3d5);
    this.scene.fog = new THREE.FogExp2(0xdbe3d5, 0.006);
    
    this.camera = new THREE.PerspectiveCamera(55, this.width / this.height, 0.1, 2000);
    this.camera.position.set(-9, 2.0, 15);
    
    this.hemiLight = new THREE.HemisphereLight(0xfff2e0, 0x4d5f40, 0.95);
    this.scene.add(this.hemiLight);
    
    this.sunLight = new THREE.DirectionalLight(0xffecd2, 1.3);
    this.sunLight.position.set(70, 110, 80);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.scene.add(this.sunLight);
    
    // Terrain / Ground
    const groundGeo = new THREE.PlaneGeometry(400, 400, 60, 60);
    groundGeo.rotateX(-Math.PI / 2);
    
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const h = Math.sin(x * 0.015) * Math.cos(z * 0.015) * 4.2 + 
                Math.sin(x * 0.07 + z * 0.05) * 0.95;
      posAttr.setY(i, h);
    }
    groundGeo.computeVertexNormals();
    
    this.groundMat = new THREE.MeshStandardMaterial({
      color: 0x496c34,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: true
    });
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    
    // Tilled Soil Patches (Cain's Farming Domain - left side)
    this.soilGroup = new THREE.Group();
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x4a2a16, roughness: 0.95, flatShading: true });
    
    for (let j = 0; j < 4; j++) {
      const tilledPatch = new THREE.Mesh(new THREE.PlaneGeometry(8, 12), soilMat);
      tilledPatch.rotateX(-Math.PI / 2);
      const px = -12 - j * 3;
      const pz = -6 + j * 4;
      tilledPatch.position.set(px, this.getTerrainHeight(px, pz) + 0.02, pz);
      tilledPatch.receiveShadow = true;
      this.soilGroup.add(tilledPatch);
      
      // Add small tilled furrow lines
      for (let k = -4; k <= 4; k += 2) {
        const furrow = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 11.5), soilMat);
        furrow.position.set(k, 0.04, 0);
        tilledPatch.add(furrow);
      }
    }
    this.scene.add(this.soilGroup);
    
    // Abel's sheep pasture / fencing (right side)
    const fenceMat = new THREE.MeshStandardMaterial({ color: 0x5a483a, roughness: 0.9 });
    this.fencesGroup = new THREE.Group();
    const fencePositions = [
      { x: 12, z: 6, rot: 0.3 },
      { x: 18, z: 12, rot: -0.4 },
      { x: 24, z: 8, rot: 0.7 },
      { x: 15, z: -2, rot: -0.1 },
      { x: 22, z: -8, rot: 0.5 }
    ];
    fencePositions.forEach(pos => {
      const fencePost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), fenceMat);
      fencePost.position.set(pos.x, this.getTerrainHeight(pos.x, pos.z) + 0.6, pos.z);
      fencePost.rotation.y = pos.rot;
      fencePost.castShadow = true;
      
      const rail = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.1, 0.05), fenceMat);
      rail.position.set(1.5, 0.2, 0);
      fencePost.add(rail);
      
      const rail2 = rail.clone();
      rail2.position.y = -0.3;
      fencePost.add(rail2);
      
      this.fencesGroup.add(fencePost);
    });
    this.scene.add(this.fencesGroup);
    
    // Altars of Sacrifice (Center area)
    this.altarGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6e6e6e, roughness: 0.9, flatShading: true });
    
    const buildAltar = (x, z) => {
      const altar = new THREE.Group();
      // Stack rocks
      for (let i = 0; i < 9; i++) {
        const rock = new THREE.Mesh(
          new THREE.BoxGeometry(0.6 + Math.random()*0.2, 0.4, 0.6 + Math.random()*0.2),
          stoneMat
        );
        const ang = (i * Math.PI * 2) / 6;
        rock.position.set(
          Math.cos(ang) * 0.45 + (Math.random() - 0.5) * 0.1,
          0.2 + Math.floor(i / 3) * 0.38,
          Math.sin(ang) * 0.45 + (Math.random() - 0.5) * 0.1
        );
        rock.rotation.set(Math.random()*0.2, Math.random()*3, Math.random()*0.2);
        rock.castShadow = true;
        altar.add(rock);
      }
      // Top flat stone
      const topStone = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 1.5), stoneMat);
      topStone.position.y = 1.25;
      topStone.castShadow = true;
      altar.add(topStone);
      
      const ay = this.getTerrainHeight(x, z);
      altar.position.set(x, ay, z);
      return altar;
    };
    
    this.cainAltar = buildAltar(-2.8, 0.0);
    this.abelAltar = buildAltar(2.8, 0.0);
    this.altarGroup.add(this.cainAltar, this.abelAltar);
    this.scene.add(this.altarGroup);
    
    // Add offerings to Altars
    // Abel's lamb offering
    const sheepWoolMat = new THREE.MeshStandardMaterial({ color: 0xf6f6f6, roughness: 0.9 });
    const lamb = new THREE.Group();
    const lambBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 5, 5), sheepWoolMat);
    lambBody.scale.set(1.4, 1.0, 1.0);
    const lambHead = new THREE.Mesh(new THREE.SphereGeometry(0.08, 4, 4), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    lambHead.position.set(0.18, 0.1, 0);
    lamb.add(lambBody, lambHead);
    lamb.position.set(0, 1.45, 0);
    lamb.rotation.z = 0.2; // lying down
    this.abelAltar.add(lamb);
    
    // Cain's tilled fruits/grain offering
    const cainOfferings = new THREE.Group();
    const fruitBasket = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.24, 0.2, 8), fenceMat);
    fruitBasket.position.y = 1.38;
    cainOfferings.add(fruitBasket);
    
    const fruitColors = [0xdd3300, 0xddb400, 0x33aa11];
    for (let f = 0; f < 6; f++) {
      const fMesh = new THREE.Mesh(new THREE.SphereGeometry(0.07, 4, 4), new THREE.MeshStandardMaterial({ color: fruitColors[f % 3], roughness: 0.4 }));
      fMesh.position.set((Math.random() - 0.5) * 0.25, 1.5, (Math.random() - 0.5) * 0.25);
      cainOfferings.add(fMesh);
    }
    this.cainAltar.add(cainOfferings);
    
    // Abel's Golden Acceptance Light Pillar (scale 0 initially)
    this.abelLightPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.9, 35, 12, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xffd880,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide
      })
    );
    this.abelLightPillar.position.set(0, 17.5, 0);
    this.abelAltar.add(this.abelLightPillar);
    
    // Post-Eden rustic shelter (Crib and shelter background)
    this.shelterGroup = new THREE.Group();
    const sx = -16.0;
    const sz = 12.0;
    const sy = this.getTerrainHeight(sx, sz);
    this.shelterGroup.position.set(sx, sy, sz);
    
    // Modest wooden hay shelter
    const wallL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.5, 3.5), fenceMat);
    wallL.position.set(-2.2, 1.25, 0);
    const wallR = wallL.clone(); wallR.position.x = 2.2;
    
    const roof = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.15, 4.2), new THREE.MeshStandardMaterial({ color: 0x8a7051, roughness: 0.95 }));
    roof.position.set(0, 2.5, 0);
    roof.rotation.z = 0.06;
    
    // Infant Crib
    this.crib = new THREE.Group();
    const cribBox = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 0.75), fenceMat);
    cribBox.position.set(0, 0.25, 0);
    this.crib.add(cribBox);
    
    // Infant Baby Meshes (Peach swaddled cylinders)
    const babyCainMat = new THREE.MeshStandardMaterial({ color: 0xffe4e1, roughness: 0.6 });
    
    this.babyCainMesh = new THREE.Group();
    const bBodyCain = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.45, 6), babyCainMat);
    bBodyCain.rotation.z = Math.PI / 2;
    const bHeadCain = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshStandardMaterial({ color: 0xebb494 }));
    bHeadCain.position.set(-0.25, 0, 0);
    this.babyCainMesh.add(bBodyCain, bHeadCain);
    this.babyCainMesh.position.set(-0.2, 0.52, 0);
    this.crib.add(this.babyCainMesh);
    
    this.babyAbelMesh = new THREE.Group();
    const bBodyAbel = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.45, 6), babyCainMat);
    bBodyAbel.rotation.z = Math.PI / 2;
    const bHeadAbel = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshStandardMaterial({ color: 0xebb494 }));
    bHeadAbel.position.set(-0.25, 0, 0);
    this.babyAbelMesh.add(bBodyAbel, bHeadAbel);
    this.babyAbelMesh.position.set(0.2, 0.52, 0);
    this.crib.add(this.babyAbelMesh);
    
    this.shelterGroup.add(wallL, wallR, roof, this.crib);
    this.scene.add(this.shelterGroup);
    
    // Cherubims on the path to Eden (Genesis 3 gate in the background)
    this.edenGate = new THREE.Group();
    this.edenGate.position.set(-30, this.getTerrainHeight(-30, -35), -35);
    
    const goldArmorMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.1, emissive: 0xffb700, emissiveIntensity: 0.12 });
    for (let c = 0; c < 2; c++) {
      const cherub = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 2.0, 6), goldArmorMat);
      body.position.y = 1.0;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6), goldArmorMat);
      head.position.y = 2.1;
      const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.8, 0.65), goldArmorMat);
      wingL.position.set(-0.45, 1.4, -0.2);
      wingL.rotation.y = 0.3; wingL.rotation.z = -0.2;
      const wingR = wingL.clone(); wingR.position.x = 0.45; wingR.rotation.y = -0.3; wingR.rotation.z = 0.2;
      
      cherub.add(body, head, wingL, wingR);
      cherub.position.set(c === 0 ? -3.0 : 3.0, 0, 0);
      cherub.lookAt(0, 0, 10);
      this.edenGate.add(cherub);
    }
    
    // Spinning glowing sword of fire blocking Eden path
    this.flamingSword = new THREE.Group();
    const swordBlade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 0.24), new THREE.MeshStandardMaterial({ color: 0xff3b00, emissive: 0xff2200, emissiveIntensity: 3.5 }));
    swordBlade.position.y = 0.9;
    const swordHilt = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.12), goldArmorMat);
    swordHilt.position.y = 0.1;
    this.flamingSword.add(swordBlade, swordHilt);
    this.flamingSword.position.set(0, 1.6, 0);
    this.edenGate.add(this.flamingSword);
    
    this.scene.add(this.edenGate);
    
    // --- Characters ---
    this.adam = new THREE.Group();
    this.adam.name = 'Adam';
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xcc9c78, roughness: 0.85 });
    const hairMatAdam = new THREE.MeshStandardMaterial({ color: 0x422f25, roughness: 0.9 });
    
    const aTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.1, 8), skinMat);
    aTorso.position.y = 1.05;
    const aHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), skinMat);
    aHead.position.y = 1.72;
    const aHair = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 0.26), hairMatAdam);
    aHair.position.set(0, 1.84, 0);
    
    this.adamArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.9, 6), skinMat);
    this.adamArmL.position.set(-0.35, 1.1, 0);
    this.adamArmR = this.adamArmL.clone(); this.adamArmR.position.x = 0.35;
    
    const aLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.95, 6), skinMat);
    aLegL.position.set(-0.12, 0.48, 0);
    const aLegR = aLegL.clone(); aLegR.position.x = 0.12;
    
    this.adam.add(aTorso, aHead, aHair, this.adamArmL, this.adamArmR, aLegL, aLegR);
    this.adam.position.set(-14.5, this.getTerrainHeight(-14.5, 10.0), 10.0);
    this.adam.lookAt(-16, this.adam.position.y, 12);
    this.scene.add(this.adam);
    
    // Eve
    this.eve = new THREE.Group();
    this.eve.name = 'Eve';
    const hairMatEve = new THREE.MeshStandardMaterial({ color: 0xe6c875, roughness: 0.9 });
    
    const eTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.0, 8), skinMat);
    eTorso.position.y = 1.0;
    const eHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), skinMat);
    eHead.position.y = 1.62;
    const eHair = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.6, 0.24), hairMatEve);
    eHair.position.set(0, 1.5, -0.06);
    
    this.eveArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.85), skinMat);
    this.eveArmL.position.set(-0.3, 1.0, 0);
    this.eveArmR = this.eveArmL.clone(); this.eveArmR.position.x = 0.3;
    
    const eLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6), skinMat);
    eLegL.position.set(-0.1, 0.45, 0);
    const eLegR = eLegL.clone(); eLegR.position.x = 0.1;
    
    this.eve.add(eTorso, eHead, eHair, this.eveArmL, this.eveArmR, eLegL, eLegR);
    this.eve.position.set(-15.5, this.getTerrainHeight(-15.5, 10.0), 10.0);
    this.eve.lookAt(-16, this.eve.position.y, 12);
    this.scene.add(this.eve);
    
    // Cain
    this.cain = new THREE.Group();
    this.cain.name = 'Cain';
    this.cain.visible = false; // Hidden at start during infant prologue
    const cainTunicMat = new THREE.MeshStandardMaterial({ color: 0x6e4e37, roughness: 0.9 });
    
    const cTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.05, 8), cainTunicMat);
    cTorso.position.y = 1.05;
    const cHead = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 10), skinMat);
    cHead.position.y = 1.7;
    const cHair = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.26), hairMatAdam);
    cHair.position.set(0, 1.8, 0);
    
    this.cainArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.85), skinMat);
    this.cainArmL.position.set(-0.32, 1.05, 0);
    
    this.cainArmR = this.cainArmL.clone();
    this.cainArmR.position.x = 0.32;
    
    // Cain's farming hoe / weapon tool
    this.weaponGroup = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6), fenceMat);
    handle.rotation.z = Math.PI / 2;
    const bladePart = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.06), stoneMat);
    bladePart.position.set(-0.7, 0.1, 0);
    this.weaponGroup.add(handle, bladePart);
    this.weaponGroup.position.set(0.2, -0.4, 0.25);
    this.weaponGroup.rotation.y = -0.3;
    this.cainArmR.add(this.weaponGroup);
    
    const cLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.9, 6), skinMat);
    cLegL.position.set(-0.1, 0.45, 0);
    const cLegR = cLegL.clone(); cLegR.position.x = 0.1;
    
    this.cain.add(cTorso, cHead, cHair, this.cainArmL, this.cainArmR, cLegL, cLegR);
    this.cain.position.set(-13, this.getTerrainHeight(-13, 8), 8);
    this.cain.lookAt(0, this.cain.position.y, 0);
    this.scene.add(this.cain);
    
    // Abel
    this.abel = new THREE.Group();
    this.abel.name = 'Abel';
    this.abel.visible = false; // Hidden at start
    const abelTunicMat = new THREE.MeshStandardMaterial({ color: 0xcdcfc4, roughness: 0.95 });
    
    const abTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.0, 8), abelTunicMat);
    abTorso.position.y = 1.0;
    const abHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), skinMat);
    abHead.position.y = 1.62;
    const abHair = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.24), hairMatEve);
    abHair.position.set(0, 1.65, 0);
    
    this.abelArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.85), skinMat);
    this.abelArmL.position.set(-0.3, 1.0, 0);
    
    this.abelArmR = this.abelArmL.clone();
    this.abelArmR.position.x = 0.3;
    
    // Abel's shepherd staff
    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1.5, 6), fenceMat);
    staff.position.set(0.18, -0.2, 0.2);
    staff.rotation.x = 0.1;
    this.abelArmR.add(staff);
    
    const abLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6), skinMat);
    abLegL.position.set(-0.1, 0.45, 0);
    const abLegR = abLegL.clone(); abLegR.position.x = 0.1;
    
    this.abel.add(abTorso, abHead, abHair, this.abelArmL, this.abelArmR, abLegL, abLegR);
    this.abel.position.set(-11, this.getTerrainHeight(-11, 7.5), 7.5);
    this.abel.lookAt(0, this.abel.position.y, 0);
    this.scene.add(this.abel);
    
    // Glowing warning Mark of Cain (floating red circle target)
    this.cainMark = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.35, 8),
      new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0 })
    );
    this.cainMark.rotation.x = Math.PI / 2;
    this.cainMark.position.y = 2.15;
    this.cain.add(this.cainMark);
    
    // Seth (child mesh)
    this.seth = new THREE.Group();
    this.seth.name = 'Seth';
    this.seth.visible = false;
    this.seth.scale.setScalar(0.55); // Child size
    
    const sTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.0, 8), new THREE.MeshStandardMaterial({ color: 0x8a9c7d, roughness: 0.9 }));
    sTorso.position.y = 0.5;
    const sHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), skinMat);
    sHead.position.y = 1.12;
    const sLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 6), skinMat);
    sLegL.position.set(-0.1, 0.25, 0);
    const sLegR = sLegL.clone(); sLegR.position.x = 0.1;
    this.seth.add(sTorso, sHead, sLegL, sLegR);
    this.seth.position.set(-15.0, this.getTerrainHeight(-15.0, 11.5), 11.5);
    this.seth.lookAt(-16, this.seth.position.y, 12);
    this.scene.add(this.seth);
    
    // Wicked Bystanders (for Genesis 6 transition)
    this.wickedPeople = new THREE.Group();
    this.wickedPeople.visible = false;
    
    const wickedColors = [0x544033, 0x483a3c, 0x2f3e46];
    
    // Wicked Person 1 (Drinking)
    this.wicked1 = new THREE.Group();
    const w1Torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.0, 8), new THREE.MeshStandardMaterial({ color: wickedColors[0], roughness: 0.9 }));
    w1Torso.position.y = 1.0;
    const w1Head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 10), skinMat);
    w1Head.position.y = 1.62;
    this.w1ArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.8), skinMat);
    this.w1ArmR.position.set(0.3, 1.2, 0);
    this.w1ArmR.rotation.x = -Math.PI / 2.5; // Raised arm
    
    // Wooden Cup
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.18, 6), fenceMat);
    cup.position.set(0, -0.4, 0);
    this.w1ArmR.add(cup);
    
    this.wicked1.add(w1Torso, w1Head, this.w1ArmR);
    this.wicked1.position.set(-8.0, this.getTerrainHeight(-8.0, -10.0), -10.0);
    this.wicked1.lookAt(-5.0, this.wicked1.position.y, -10.0);
    
    // Wicked Person 2 & 3 (Fighting/Shoving)
    this.wicked2 = new THREE.Group();
    const w2Torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.0, 8), new THREE.MeshStandardMaterial({ color: wickedColors[1], roughness: 0.9 }));
    w2Torso.position.y = 1.0;
    const w2Head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 10), skinMat);
    w2Head.position.y = 1.62;
    this.w2ArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.8), skinMat);
    this.w2ArmR.position.set(0.3, 1.1, 0);
    this.w2ArmR.rotation.x = -Math.PI / 2.0; // Pointing forward (shoving)
    this.wicked2.add(w2Torso, w2Head, this.w2ArmR);
    this.wicked2.position.set(-4.0, this.getTerrainHeight(-4.0, -11.0), -11.0);
    this.wicked2.lookAt(-2.5, this.wicked2.position.y, -11.0);
    
    this.wicked3 = new THREE.Group();
    const w3Torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.0, 8), new THREE.MeshStandardMaterial({ color: wickedColors[2], roughness: 0.9 }));
    w3Torso.position.y = 1.0;
    const w3Head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 10), skinMat);
    w3Head.position.y = 1.62;
    this.w3ArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.8), skinMat);
    this.w3ArmR.position.set(-0.3, 1.1, 0);
    this.w3ArmR.rotation.x = -Math.PI / 2.0; // Pointing forward (shoving back)
    this.wicked3.add(w3Torso, w3Head, this.w3ArmR);
    this.wicked3.position.set(-2.5, this.getTerrainHeight(-2.5, -11.0), -11.0);
    this.wicked3.lookAt(-4.0, this.wicked3.position.y, -11.0);
    
    this.wickedPeople.add(this.wicked1, this.wicked2, this.wicked3);
    this.scene.add(this.wickedPeople);
    
    // Pasture Sheep AI wandering in fence area
    this.sheepGroup = new THREE.Group();
    for (let s = 0; s < 7; s++) {
      const sheep = new THREE.Group();
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.36, 5, 5), sheepWoolMat);
      body.scale.set(1.3, 1.0, 1.0);
      body.position.y = 0.48;
      
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 5, 5), new THREE.MeshStandardMaterial({ color: 0x1f1f1f }));
      head.position.set(0.4, 0.65, 0);
      
      sheep.add(body, head);
      const sx = 14 + Math.random() * 8;
      const sz = 2 + Math.random() * 8;
      sheep.position.set(sx, this.getTerrainHeight(sx, sz), sz);
      sheep.userData = { wanderAngle: Math.random() * Math.PI * 2, speed: 0.15 + Math.random()*0.1 };
      
      this.sheepGroup.add(sheep);
    }
    this.scene.add(this.sheepGroup);
    
    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    window.addEventListener('keydown', e => this.keys[e.code] = true);
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }
  
  getTerrainHeight(x, z) {
    const h = Math.sin(x * 0.015) * Math.cos(z * 0.015) * 4.2 + 
              Math.sin(x * 0.07 + z * 0.05) * 0.95;
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
    // 1. Altars
    const cainAltarDist = Math.sqrt((newX + 2.8) * (newX + 2.8) + newZ * newZ);
    if (cainAltarDist < 1.35) return true;
    const abelAltarDist = Math.sqrt((newX - 2.8) * (newX - 2.8) + newZ * newZ);
    if (abelAltarDist < 1.35) return true;
    
    // 2. Shelter
    const shelterDist = Math.sqrt((newX + 16.0) * (newX + 16.0) + (newZ - 12.0) * (newZ - 12.0));
    if (shelterDist < 2.8) return true;
    
    // 3. Fences
    const fencePositions = [
      { x: 12, z: 6 },
      { x: 18, z: 12 },
      { x: 24, z: 8 },
      { x: 15, z: -2 },
      { x: 22, z: -8 }
    ];
    for (const f of fencePositions) {
      const d = Math.sqrt((newX - f.x) * (newX - f.x) + (newZ - f.z) * (newZ - f.z));
      if (d < 1.25) return true;
    }
    return false;
  }
  
  update(time, dt) {
    const elapsed = time;
    
    // Rotate the flaming sword block in background
    if (this.flamingSword) {
      this.flamingSword.rotation.y += dt * 4.2;
      this.flamingSword.position.y = 1.6 + Math.sin(elapsed * 3.5) * 0.12;
    }
    
    // Animate Wicked People drinking/fighting
    if (this.wickedPeople && this.wickedPeople.visible) {
      this.w1ArmR.rotation.x = -Math.PI / 2.4 + Math.sin(elapsed * 2.8) * 0.22;
      this.w2ArmR.rotation.x = -Math.PI / 2.0 + Math.sin(elapsed * 4.5) * 0.35;
      this.w3ArmR.rotation.x = -Math.PI / 2.0 - Math.sin(elapsed * 4.5) * 0.35;
    }
    
    // Sheep wanders
    this.sheepGroup.children.forEach(sheep => {
      const speed = sheep.userData.speed;
      if (Math.random() < 0.02) {
        sheep.userData.wanderAngle += (Math.random() - 0.5) * 2.5;
      }
      const dx = Math.sin(sheep.userData.wanderAngle) * speed * dt;
      const dz = Math.cos(sheep.userData.wanderAngle) * speed * dt;
      const newX = sheep.position.x + dx;
      const newZ = sheep.position.z + dz;
      
      // Keep inside pasture range
      if (newX > 11 && newX < 26 && newZ > -10 && newZ < 14) {
        sheep.position.set(newX, this.getTerrainHeight(newX, newZ), newZ);
        sheep.lookAt(newX + dx * 10, sheep.position.y, newZ + dz * 10);
      } else {
        sheep.userData.wanderAngle += Math.PI;
      }
    });
    
    // Animate Abel's Golden Pillar
    if (this.altarLightActive && this.abelLightPillar) {
      this.abelLightPillar.rotation.y += dt * 0.5;
    }
    
    // Animate Cain's altar dark smoke particles
    if (this.altarSmokeActive) {
      if (Math.random() < 0.25) {
        // Spawn smoke ball
        const smoke = new THREE.Mesh(
          new THREE.SphereGeometry(0.18 + Math.random()*0.1, 4, 4),
          new THREE.MeshBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.65 })
        );
        smoke.position.set(
          -2.8 + (Math.random() - 0.5) * 0.4,
          this.getTerrainHeight(-2.8, 0) + 1.45,
          (Math.random() - 0.5) * 0.4
        );
        this.scene.add(smoke);
        this.smokeParticles.push({
          mesh: smoke,
          vx: -0.8 - Math.random() * 0.8, // drift sideways
          vy: 0.8 + Math.random() * 0.8,
          age: 0,
          maxAge: 2.2
        });
      }
    }
    
    // Update and prune smoke particles
    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const p = this.smokeParticles[i];
      p.age += dt;
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.scale.setScalar(1.0 + p.age * 1.5);
      p.mesh.material.opacity = 0.65 * (1.0 - (p.age / p.maxAge));
      
      if (p.age >= p.maxAge) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.smokeParticles.splice(i, 1);
      }
    }
    
    // Spin floating mark of Cain
    if (this.cainMark && this.cainMark.material.opacity > 0) {
      this.cainMark.rotation.z += dt * 2.8;
      this.cainMark.position.y = 2.15 + Math.sin(elapsed * 4.0) * 0.08;
    }
    
    // Smooth camera rotation
    this.yaw += (this.targetYaw - this.yaw) * 0.1;
    this.pitch += (this.targetPitch - this.pitch) * 0.1;
    
    // Player controls (WASD controls Cain when active)
    if (this.movementEnabled && this.cain.visible) {
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
        
        const newX = this.cain.position.x + move.x;
        const newZ = this.cain.position.z + move.z;
        
        if (!this.checkCollision(newX, newZ)) {
          this.cain.position.x = newX;
          this.cain.position.z = newZ;
          this.cain.position.y = this.getTerrainHeight(this.cain.position.x, this.cain.position.z);
        }
        
        const targetAngle = Math.atan2(move.x, move.z);
        this.cain.rotation.y = targetAngle;
        
        const swing = Math.sin(elapsed * 9.0) * 0.42;
        this.cain.children[5].rotation.x = swing; // Left Leg
        this.cain.children[6].rotation.x = -swing; // Right Leg
        this.cain.children[3].rotation.x = -swing; // Left Arm
      } else {
        this.cain.children[5].rotation.x *= 0.85;
        this.cain.children[6].rotation.x *= 0.85;
        this.cain.children[3].rotation.x *= 0.85;
      }
      
      // Spring arm camera focus on Cain
      const springArmDist = 6.2;
      const camOffset = new THREE.Vector3(
        Math.sin(this.yaw) * Math.cos(this.pitch) * springArmDist,
        Math.sin(this.pitch) * springArmDist + 1.6,
        Math.cos(this.yaw) * Math.cos(this.pitch) * springArmDist
      );
      
      const targetCamPos = this.cain.position.clone().add(camOffset);
      this.camera.position.lerp(targetCamPos, 0.12);
      
      const lookTarget = new THREE.Vector3(this.cain.position.x, this.cain.position.y + 1.2, this.cain.position.z);
      this.camera.lookAt(lookTarget);
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}
