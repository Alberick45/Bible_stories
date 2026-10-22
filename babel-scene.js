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
    
    // Zoom control
    this.zoomLevel = 1.0;
    this.baseFov = 55;
    this.touchPinchDist = null;

    // Camera mode ('thirdPerson' or 'firstPerson')
    this.cameraMode = 'thirdPerson';
    
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    // Tower growth tracking
    this.currentTier = 1;
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
    
    // 6. Tower of Babel (Monumental 27m Multi-Tiered Mesopotamian Ziggurat)
    this.towerGroup = new THREE.Group();
    this.towerGroup.position.set(0, this.getTerrainHeight(0, 0), 0);
    this.scene.add(this.towerGroup);
    
    const brickColorMat = new THREE.MeshStandardMaterial({ color: 0x9e6a4b, roughness: 0.88, flatShading: true }); // Baked clay brick
    const darkBrickMat = new THREE.MeshStandardMaterial({ color: 0x6e4530, roughness: 0.9, flatShading: true }); // Sun-dried foundation brick
    const bitumenMat = new THREE.MeshStandardMaterial({ color: 0x181515, roughness: 0.35, metalness: 0.1 }); // Bitumen mortar
    const timberMat = new THREE.MeshStandardMaterial({ color: 0x543b22, roughness: 0.85 }); // Scaffolding timber
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0x9a8868, roughness: 0.9 }); // Hemp rope
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x3a3835, roughness: 0.6, metalness: 0.4 }); // Tools
    
    // 5 Monumental Tiers reaching 27 meters into the sky
    const tierConfig = [
      { rBase: 16.0, rTop: 14.2, h: 6.2, segments: 16 }, // Tier 0: Foundation with portal
      { rBase: 12.8, rTop: 11.2, h: 5.6, segments: 16 }, // Tier 1: Second terrace
      { rBase: 10.0, rTop: 8.6,  h: 5.4, segments: 14 }, // Tier 2: Third terrace
      { rBase: 7.6,  rTop: 6.2,  h: 5.0, segments: 12 }, // Tier 3: Fourth terrace
      { rBase: 5.2,  rTop: 3.8,  h: 4.8, segments: 10 }  // Tier 4: Celestial summit
    ];
    
    let currentY = 0;
    tierConfig.forEach((cfg, idx) => {
      const tierG = new THREE.Group();
      tierG.position.y = currentY;
      
      // Core ziggurat polygon
      const core = new THREE.Mesh(new THREE.CylinderGeometry(cfg.rTop, cfg.rBase, cfg.h, cfg.segments), brickColorMat);
      core.position.y = cfg.h / 2;
      core.castShadow = true;
      core.receiveShadow = true;
      tierG.add(core);
      
      // Outer perimeter buttresses (Ziggurat stepped pilasters)
      for (let b = 0; b < cfg.segments; b++) {
        const bAngle = (b / cfg.segments) * Math.PI * 2;
        const bRadius = (cfg.rBase + cfg.rTop) / 2 + 0.15;
        const buttress = new THREE.Mesh(new THREE.BoxGeometry(0.85, cfg.h, 0.7), darkBrickMat);
        buttress.position.set(Math.sin(bAngle) * bRadius, cfg.h / 2, Math.cos(bAngle) * bRadius);
        buttress.rotation.y = bAngle;
        buttress.castShadow = true;
        tierG.add(buttress);
      }
      
      // Perimeter parapet / battlement rim
      const parapet = new THREE.Mesh(new THREE.CylinderGeometry(cfg.rTop + 0.25, cfg.rTop + 0.35, 0.7, cfg.segments, 1, true), darkBrickMat);
      parapet.position.y = cfg.h + 0.35;
      tierG.add(parapet);
      
      // Spiral ascending ramp simulation wrapping around each terrace
      const steps = 24;
      for (let s = 0; s < steps; s++) {
        const angle = (s / steps) * Math.PI * 2;
        const radius = cfg.rBase - (s / steps) * (cfg.rBase - cfg.rTop) + 0.6;
        const rampY = (s / steps) * cfg.h;
        
        const rampStep = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 1.8), darkBrickMat);
        rampStep.position.set(Math.sin(angle) * radius, rampY + 0.15, Math.cos(angle) * radius);
        rampStep.rotation.y = angle;
        rampStep.castShadow = true;
        rampStep.receiveShadow = true;
        tierG.add(rampStep);
      }
      
      // Tier 0 grand arched gateway portal at south entrance
      if (idx === 0) {
        const portalGroup = new THREE.Group();
        portalGroup.position.set(0, 0, cfg.rBase + 0.2);
        
        const postL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.6, 1.4), darkBrickMat);
        postL.position.set(-1.8, 2.3, 0);
        const postR = postL.clone();
        postR.position.x = 1.8;
        
        const archTop = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.2, 1.6), darkBrickMat);
        archTop.position.set(0, 5.0, 0);
        
        const portalDepth = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.0, 1.2), new THREE.MeshBasicMaterial({ color: 0x110c08 }));
        portalDepth.position.set(0, 2.0, -0.4);
        
        portalGroup.add(postL, postR, archTop, portalDepth);
        tierG.add(portalGroup);
      }
      
      // Tier 4 summit: Wooden hoisting crane with cross-beam and hanging pallet of bricks
      if (idx === 4) {
        const craneG = new THREE.Group();
        craneG.position.set(1.5, cfg.h, 0);
        
        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 6.0, 6), timberMat);
        mast.position.y = 3.0;
        
        const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 5.5, 6), timberMat);
        boom.position.set(1.6, 5.2, 0);
        boom.rotation.z = Math.PI / 3;
        
        const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3.8, 4), ropeMat);
        rope.position.set(3.2, 3.2, 0);
        
        const pallet = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.15, 1.4), timberMat);
        pallet.position.set(3.2, 1.2, 0);
        
        for (let pb = 0; pb < 4; pb++) {
          const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.3), brickColorMat);
          b.position.set((pb % 2 - 0.5) * 0.55, 0.18, (Math.floor(pb / 2) - 0.5) * 0.55);
          pallet.add(b);
        }
        
        craneG.add(mast, boom, rope, pallet);
        tierG.add(craneG);
      }
      
      // Foundation tier 0 visible from start; upper tiers available
      if (idx === 0) {
        tierG.scale.set(1.0, 1.0, 1.0);
        tierG.visible = true;
      } else {
        tierG.scale.set(1.0, 1.0, 1.0);
        tierG.visible = true; // All tiers fully visible in their glory!
      }
      
      this.towerGroup.add(tierG);
      this.towerTiers.push(tierG);
      currentY += cfg.h;
    });
    
    // 7. Active Construction Site (Scaffolding Towers, Bitumen Pits, Kilns, Tool Racks)
    this.constructionDetails = new THREE.Group();
    this.scene.add(this.constructionDetails);
    this.brickPiles = [];
    
    // A. Two Bitumen / Pitch Mixing Pits with steaming dark pitch and wooden oars
    const pitOffsets = [
      { x: -16.5, z: 12.0 },
      { x: 16.5, z: 12.0 }
    ];
    pitOffsets.forEach((po, pidx) => {
      const pitG = new THREE.Group();
      const py = this.getTerrainHeight(po.x, po.z);
      pitG.position.set(po.x, py, po.z);
      
      // Stone circular basin
      const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 0.7, 16), darkBrickMat);
      basin.position.y = 0.35;
      basin.castShadow = true;
      
      // Boiling bitumen slime
      const slime = new THREE.Mesh(new THREE.CylinderGeometry(2.35, 2.35, 0.1, 16), bitumenMat);
      slime.position.y = 0.55;
      
      // Stirring oar
      const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 6), timberMat);
      oar.position.set(0.6, 1.4, 0.4);
      oar.rotation.z = 0.45;
      
      // Mortar bucket nearby
      const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.32, 0.6, 8), timberMat);
      bucket.position.set(-2.2, 0.3, 1.2);
      
      pitG.add(basin, slime, oar, bucket);
      this.constructionDetails.add(pitG);
    });
    
    // B. Timber Scaffolding Towers with ladders hugging the Ziggurat
    const scaffoldOffsets = [
      { x: -18.5, z: 0.0, h: 14.0 },
      { x: 18.5, z: 0.0, h: 14.0 },
      { x: 0.0, z: -18.5, h: 16.0 },
      { x: -12.5, z: -12.5, h: 12.0 }
    ];
    scaffoldOffsets.forEach(sc => {
      const scG = new THREE.Group();
      const scY = this.getTerrainHeight(sc.x, sc.z);
      scG.position.set(sc.x, scY, sc.z);
      
      // 4 upright timber posts
      for (let cx = -1; cx <= 1; cx += 2) {
        for (let cz = -1; cz <= 1; cz += 2) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, sc.h, 6), timberMat);
          post.position.set(cx * 1.4, sc.h / 2, cz * 1.4);
          post.castShadow = true;
          scG.add(post);
        }
      }
      
      // Horizontal platforms and cross braces at levels
      const levels = Math.floor(sc.h / 3.8);
      for (let l = 1; l <= levels; l++) {
        const plat = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.18, 3.2), timberMat);
        plat.position.y = l * 3.8;
        plat.castShadow = true;
        scG.add(plat);
        
        // Add a stack of bricks on the platform
        const platBrick = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.4), brickColorMat);
        platBrick.position.set(0.6, l * 3.8 + 0.2, 0.4);
        scG.add(platBrick);
      }
      
      // Climbing ladder
      const ladder = new THREE.Mesh(new THREE.BoxGeometry(0.6, sc.h, 0.1), timberMat);
      ladder.position.set(0, sc.h / 2, 1.45);
      scG.add(ladder);
      
      this.constructionDetails.add(scG);
    });
    
    // C. Masonry Workbenches with chisels, mallets, and trowels
    const benchOffsets = [
      { x: -10.5, z: 18.0, ang: 0.2 },
      { x: 10.5, z: 18.0, ang: -0.2 }
    ];
    benchOffsets.forEach(bo => {
      const bG = new THREE.Group();
      const by = this.getTerrainHeight(bo.x, bo.z);
      bG.position.set(bo.x, by, bo.z);
      bG.rotation.y = bo.ang;
      
      // Timber bench top & 4 legs
      const top = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 1.2), timberMat);
      top.position.y = 0.9;
      top.castShadow = true;
      bG.add(top);
      
      for (let lx = -1; lx <= 1; lx += 2) {
        for (let lz = -1; lz <= 1; lz += 2) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6), timberMat);
          leg.position.set(lx * 0.95, 0.45, lz * 0.45);
          bG.add(leg);
        }
      }
      
      // Tools on bench: Masonry Trowel
      const trowelBlade = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.02, 0.2), ironMat);
      trowelBlade.position.set(-0.5, 1.01, 0.1);
      const trowelHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.25, 6), timberMat);
      trowelHandle.position.set(-0.7, 1.05, 0.1);
      trowelHandle.rotation.z = Math.PI / 2;
      bG.add(trowelBlade, trowelHandle);
      
      // Wooden Mallet
      const malletHead = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.35, 8), timberMat);
      malletHead.position.set(0.3, 1.05, -0.1);
      malletHead.rotation.x = Math.PI / 2;
      const malletHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45, 6), timberMat);
      malletHandle.position.set(0.3, 1.05, 0.15);
      bG.add(malletHead, malletHandle);
      
      // Iron Chisel
      const chisel = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.4), ironMat);
      chisel.position.set(0.7, 1.01, 0.1);
      bG.add(chisel);
      
      this.constructionDetails.add(bG);
    });
    
    // D. Domed Brickmaker Kilns with red hot glow
    const kilnOffsets = [
      { x: -22.0, z: 8.0 },
      { x: 22.0, z: 8.0 }
    ];
    kilnOffsets.forEach(ko => {
      const kG = new THREE.Group();
      const ky = this.getTerrainHeight(ko.x, ko.z);
      kG.position.set(ko.x, ky, ko.z);
      
      // Domed brick kiln
      const dome = new THREE.Mesh(new THREE.SphereGeometry(2.4, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2), darkBrickMat);
      dome.position.y = 0.0;
      dome.castShadow = true;
      
      // Chimney
      const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 2.2, 8), darkBrickMat);
      chimney.position.set(0, 2.6, 0);
      
      // Kiln glowing furnace door
      const furnaceGlow = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.4), new THREE.MeshStandardMaterial({
        color: 0xff3b00,
        emissive: 0xff4400,
        emissiveIntensity: 1.8,
        roughness: 0.3
      }));
      furnaceGlow.position.set(0, 0.7, 2.3);
      
      kG.add(dome, chimney, furnaceGlow);
      this.constructionDetails.add(kG);
    });
    
    // E. Pallets and Pyramids of Baked Red Clay Bricks
    for (let p = 0; p < 10; p++) {
      const ang = (p / 10) * Math.PI * 2 + 0.25;
      const dist = 19.0 + (p % 3) * 2.5;
      const px = Math.sin(ang) * dist;
      const pz = Math.cos(ang) * dist;
      const py = this.getTerrainHeight(px, pz);
      
      const pile = new THREE.Group();
      pile.position.set(px, py, pz);
      
      // Wooden pallet base
      const palletBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 1.6), timberMat);
      palletBase.position.y = 0.06;
      pile.add(palletBase);
      
      // Stacked bricks (stepped pyramid)
      for (let layer = 0; layer < 4; layer++) {
        const countInLayer = 4 - layer;
        for (let bx = 0; bx < countInLayer; bx++) {
          for (let bz = 0; bz < countInLayer; bz++) {
            const brick = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.32), brickColorMat);
            brick.position.set(
              (bx - countInLayer / 2 + 0.5) * 0.48,
              0.12 + layer * 0.23 + 0.11,
              (bz - countInLayer / 2 + 0.5) * 0.34
            );
            brick.castShadow = true;
            pile.add(brick);
          }
        }
      }
      this.constructionDetails.add(pile);
      this.brickPiles.push(pile);
    }
    
    // 8. Interactive Playable Character (Nimrod, King & Master Builder)
    this.builderCharacter = new CharacterModel({
      name: 'Nimrod',
      character: 'builder',
      gender: 'male',
      skinTone: 0xe0a890,
      clothesColor: 0xb8860b
    });
    this.builder = this.builderCharacter.group;
    // Position Nimrod right in front of the grand portal facing the Tower of Babel
    this.builder.position.set(0, this.getTerrainHeight(0, 22.0), 22.0);
    this.builder.lookAt(0, this.builder.position.y, 0);
    this.scene.add(this.builder);
    this.player = this.builder; // Guaranteed alias so window.sceneEngine.player is ALWAYS defined!
    
    // 9. Builders of Shinar (6 Active Workers with tools and bilingual roles)
    this.workersGroup = new THREE.Group();
    this.scene.add(this.workersGroup);
    this.workers = [];
    this.workerCharacters = [];
    
    const workerConfigs = [
      {
        name: 'Mortar Mixer',
        pos: [-14.0, 11.5],
        charKey: 'man1',
        color: 0x556b2f,
        english: 'The bitumen slime is boiling hot! Keep stirring!',
        confounded: 'Δόξα τῷ Θεῷ! (Wait, what did you say?!)',
        lang: 'Greek'
      },
      {
        name: 'Chief Mason',
        pos: [14.0, 11.5],
        charKey: 'man2',
        color: 0x8b4513,
        english: 'Lay the burnt bricks true! We build for eternity!',
        confounded: 'Quid agis? (I cannot understand you!)',
        lang: 'Latin'
      },
      {
        name: 'Brick Carrier',
        pos: [-6.5, 17.5],
        charKey: 'adam_black',
        color: 0xcd853f,
        english: 'More baked clay bricks for the fourth terrace!',
        confounded: 'Baga bo pi do! (What is this gibberish?!)',
        lang: 'Shinar'
      },
      {
        name: 'Surveyor',
        pos: [6.5, 17.5],
        charKey: 'adam_white',
        color: 0x5f9ea0,
        english: 'Check the plumb line! The tower must reach the sky!',
        confounded: 'Baruch Hashem! (Speak plainly!)',
        lang: 'Hebrew'
      },
      {
        name: 'Stonecutter',
        pos: [-18.5, -3.5],
        charKey: 'megan',
        color: 0x708090,
        english: 'Cut the corners square! Make our name famous!',
        confounded: 'Nǐ hǎo! (Where are the bricks?!)',
        lang: 'Ancient East'
      },
      {
        name: 'Hoist Operator',
        pos: [18.5, -3.5],
        charKey: 'eve_white',
        color: 0x8b7e66,
        english: 'Heave on the rope! Lift the bricks to the summit!',
        confounded: 'Shlama! (The mortar is drying!)',
        lang: 'Aramaic'
      }
    ];
    
    workerConfigs.forEach((wc, w) => {
      const workerChar = new CharacterModel({
        name: wc.name,
        character: wc.charKey,
        clothesColor: wc.color
      });
      const worker = workerChar.group;
      this.workerCharacters.push(workerChar);
      
      // Add worker's carrying brick and tool
      const carryBrick = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.32), brickColorMat);
      carryBrick.position.set(0, 1.1, 0.4);
      carryBrick.name = 'brick';
      worker.add(carryBrick);
      
      const rx = wc.pos[0];
      const rz = wc.pos[1];
      worker.position.set(rx, this.getTerrainHeight(rx, rz), rz);
      worker.lookAt(0, worker.position.y, 0); // Face the Tower
      
      worker.userData = {
        name: wc.name,
        englishPhrase: wc.english,
        confoundedPhrase: wc.confounded,
        lang: wc.lang,
        phrase: wc.english, // Initial language is English!
        hasInteracted: false,
        isActive: true,
        builderId: w + 1
      };
      
      this.workersGroup.add(worker);
      this.workers.push(worker);
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
      if (e.code === 'KeyV' && !e.repeat) {
        this.toggleCameraMode();
      } else if ((e.code === 'Equal' || e.code === 'NumpadAdd') && !e.repeat) {
        this.zoomIn();
      } else if ((e.code === 'Minus' || e.code === 'NumpadSubtract') && !e.repeat) {
        this.zoomOut();
      } else if (e.code === 'Digit0' && !e.repeat) {
        this.resetZoom();
      }
    });
    window.addEventListener('keyup', e => this.keys[e.code] = false);
  }
  
  setZoom(level) {
    this.zoomLevel = Math.max(0.5, Math.min(2.5, level));
    if (this.camera) {
      this.camera.fov = this.baseFov / this.zoomLevel;
      this.camera.updateProjectionMatrix();
    }
    if (window.updateZoomUI) {
      window.updateZoomUI(this.zoomLevel);
    }
  }

  zoomIn(delta = 0.15) {
    this.setZoom(this.zoomLevel + delta);
  }

  zoomOut(delta = 0.15) {
    this.setZoom(this.zoomLevel - delta);
  }

  resetZoom() {
    this.setZoom(1.0);
  }

  onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    this.setZoom(this.zoomLevel + delta);
  }

  onTouchStart(e) {
    if (e.touches && e.touches.length === 2) {
      this.touchPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }

  onTouchMove(e) {
    if (e.touches && e.touches.length === 2 && this.touchPinchDist) {
      e.preventDefault();
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / this.touchPinchDist;
      if (Math.abs(ratio - 1.0) > 0.03) {
        this.setZoom(this.zoomLevel * ratio);
        this.touchPinchDist = currentDist;
      }
    }
  }

  onTouchEnd() {
    this.touchPinchDist = null;
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
      w.visible = true;
      
      // Find the carried brick and drop it
      const brick = w.getObjectByName('brick');
      if (brick) {
        w.remove(brick);
        this.scene.add(brick);
        const worldPos = new THREE.Vector3();
        brick.getWorldPosition(worldPos);
        brick.position.copy(worldPos);
        
        gsap.to(brick.position, {
          y: this.getTerrainHeight(brick.position.x, brick.position.z) + 0.1,
          duration: 0.6,
          ease: 'bounce.out'
        });
      }
      
      // Make worker arms flail around in confusion
      if (w.children[2] && w.children[3]) {
        gsap.to(w.children[2].rotation, { x: -Math.PI * 0.85, duration: 0.4, repeat: -1, yoyo: true });
        gsap.to(w.children[3].rotation, { x: -Math.PI * 0.85, duration: 0.4, repeat: -1, yoyo: true });
      }
      
      // Scatter workers to distinct stations around the foundation (radius 10-14m)
      const escapeAngle = (idx / this.workers.length) * Math.PI * 2 + 0.35;
      const targetDist = 10.5 + (idx % 2) * 3.5;
      const targetX = Math.sin(escapeAngle) * targetDist;
      const targetZ = Math.cos(escapeAngle) * targetDist;
      
      w.lookAt(targetX, w.position.y, targetZ);
      
      gsap.to(w.position, {
        x: targetX,
        z: targetZ,
        duration: 3.2,
        ease: 'power1.out',
        onUpdate: () => {
          w.position.y = this.getTerrainHeight(w.position.x, w.position.z);
        },
        onComplete: () => {
          w.visible = true;
          w.lookAt(0, w.position.y, 0); // Face the unfinished tower in bewilderment
        }
      });
    });
  }
  
  unlockControls() {
    this.movementEnabled = true;
    this.targetYaw = Math.PI * 0.75;
    this.targetPitch = -0.18;
  }
  
  prepareInteractiveBabel() {
    // Ensure all 5 tiers of the Tower of Babel are fully scaled and visible
    if (this.towerTiers) {
      this.towerTiers.forEach(tg => {
        tg.visible = true;
        tg.scale.set(1.0, 1.0, 1.0);
      });
    }

    const builderTongues = [
      { lang: 'Greek', phrase: 'Δόξα τῷ Θεῷ! (What did you say?!)' },
      { lang: 'Latin', phrase: 'Quid agis? (I cannot understand you!)' },
      { lang: 'Shinar', phrase: 'Baga bo pi do! (What is this gibberish?!)' },
      { lang: 'Hebrew', phrase: 'Baruch Hashem! (Speak plainly!)' },
      { lang: 'Ancient East', phrase: 'Nǐ hǎo! (Where are the bricks?!)' },
      { lang: 'Aramaic', phrase: 'Shlama! (The mortar is drying!)' }
    ];

    // Station all 6 builders around the foundation at distinct stations with bewildered gestures
    this.workers.forEach((w, idx) => {
      w.visible = true;
      const tongue = builderTongues[idx % builderTongues.length];
      w.userData.lang = tongue.lang;
      w.userData.phrase = tongue.phrase;
      w.userData.hasInteracted = false;
      w.userData.builderId = idx + 1;

      // Position workers around the front apron and terraces
      const ang = ((idx - 2.5) / 6) * (Math.PI * 0.7); // Fan in front arc
      const radius = 17.5 + (idx % 2) * 2.5;
      const bx = Math.sin(ang) * radius;
      const bz = Math.cos(ang) * radius;
      w.position.set(bx, this.getTerrainHeight(bx, bz), bz);
      w.lookAt(0, w.position.y, 0);

      const char = this.workerCharacters ? this.workerCharacters[idx] : null;
      if (char && char.playAnimation) {
        char.playAnimation('talking');
      } else if (w.children[2] && w.children[3]) {
        gsap.to(w.children[2].rotation, { x: -Math.PI * 0.7, duration: 0.5, repeat: -1, yoyo: true });
        gsap.to(w.children[3].rotation, { x: -Math.PI * 0.7, duration: 0.5, repeat: -1, yoyo: true, delay: 0.2 });
      }
    });

    // Position player Nimrod in front of foundation facing the builders and the colossal Tower
    if (!this.player && this.builder) this.player = this.builder;
    if (this.player) {
      this.player.position.set(0, this.getTerrainHeight(0, 23.5), 23.5);
      this.player.lookAt(0, this.player.position.y, 0);
    }
    if (this.builderCharacter && this.builderCharacter.playAnimation) {
      this.builderCharacter.playAnimation('idle');
    }

    this.yaw = 0;
    this.pitch = 0.12;
    this.targetYaw = 0;
    this.targetPitch = 0.12;

    this.unlockControls();
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
      w.visible = true;
      gsap.killTweensOf(w.children[2].rotation);
      gsap.killTweensOf(w.children[3].rotation);
      w.children[2].rotation.set(-Math.PI * 0.9, (idx % 2 === 0 ? 0.3 : -0.3), 0);
      w.children[3].rotation.set(-Math.PI * 0.9, (idx % 2 === 0 ? -0.3 : 0.3), 0);
    });
  }
  
  scatterWorkersImmediate() {
    this.workers.forEach((w, idx) => {
      w.userData.isActive = false;
      w.visible = true;
      gsap.killTweensOf(w.children[2].rotation);
      gsap.killTweensOf(w.children[3].rotation);
      gsap.killTweensOf(w.position);
      
      const escapeAngle = (idx / this.workers.length) * Math.PI * 2 + 0.35;
      const targetDist = 10.5 + (idx % 2) * 3.5;
      w.position.x = Math.sin(escapeAngle) * targetDist;
      w.position.z = Math.cos(escapeAngle) * targetDist;
      w.position.y = this.getTerrainHeight(w.position.x, w.position.z);
      w.lookAt(0, w.position.y, 0);
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
