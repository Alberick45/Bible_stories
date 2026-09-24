import * as THREE from 'three';

/**
 * GrassField — Ultra-dense Grassworks-style instanced grass system with thin curved blades,
 * vertex color ambient shading (shadowed base -> sunlit tip), wind sway physics, and flower blossoms.
 */
export class GrassField {
  constructor(options = {}) {
    this.count = options.count || 180000;
    this.flowerCount = options.flowerCount || 2500;
    this.radius = options.radius || 150;
    this.bladeWidth = options.bladeWidth || 0.042;
    this.bladeHeight = options.bladeHeight || 1.25;
    this.heightAt = options.heightAt || ((x, z) => 0);
    
    this.timeUniform = { value: 0 };
    this.group = new THREE.Group();
    this.grassMesh = null;
    this.flowerMesh = null;
    
    this.init();
  }

  init() {
    // 1. Thin Organic Curved Blade Geometry (3 Segments for Natural Curvature)
    const bladeGeo = new THREE.PlaneGeometry(this.bladeWidth, this.bladeHeight, 2, 5);
    bladeGeo.translate(0, this.bladeHeight / 2, 0);

    // Add Per-Vertex Colors (Dark Base for AO -> Bright Yellow-Green Tip)
    const pos = bladeGeo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const normalizedY = y / this.bladeHeight;
      
      // Exponential tip taper
      const factor = (1.0 - Math.pow(normalizedY, 1.5) * 0.88);
      pos.setX(i, pos.getX(i) * factor);
      
      // Smooth outward curve (Grassworks curvature)
      pos.setZ(i, Math.pow(normalizedY, 1.8) * 0.18);

      // Base: dark deep green (0.12, 0.25, 0.08) -> Tip: vibrant sunlit green (0.48, 0.76, 0.22)
      colors[i * 3]     = THREE.MathUtils.lerp(0.12, 0.48, normalizedY);
      colors[i * 3 + 1] = THREE.MathUtils.lerp(0.25, 0.76, normalizedY);
      colors[i * 3 + 2] = THREE.MathUtils.lerp(0.08, 0.22, normalizedY);
    }
    bladeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    bladeGeo.computeVertexNormals();

    const timeU = this.timeUniform;
    const grassMat = new THREE.MeshStandardMaterial({
      roughness: 0.55,
      metalness: 0.05,
      vertexColors: true,
      side: THREE.DoubleSide
    });

    grassMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = timeU;
      shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vec4 gwp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float gsway = sin(uTime * 2.2 + gwp.x * 0.35 + gwp.z * 0.28) * 0.38 * position.y;
        transformed.x += gsway;
        transformed.z += gsway * 0.65;
        `
      );
    };

    this.grassMesh = new THREE.InstancedMesh(bladeGeo, grassMat, this.count);
    // CRITICAL: Disable frustum culling so Three.js never hides the grass field when looking around!
    this.grassMesh.frustumCulled = false;

    const dummy = new THREE.Object3D();
    const col = new THREE.Color();

    for (let i = 0; i < this.count; i++) {
      const r = Math.sqrt(Math.random()) * this.radius;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = this.heightAt(x, z);

      dummy.position.set(x, y, z);
      // Random yaw rotation + slight lean tilt for natural organic clump look
      dummy.rotation.set(
        (Math.random() - 0.5) * 0.25,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.25
      );
      dummy.scale.set(
        0.75 + Math.random() * 0.75,
        0.75 + Math.random() * 0.75,
        0.75 + Math.random() * 0.75
      );
      dummy.updateMatrix();
      
      this.grassMesh.setMatrixAt(i, dummy.matrix);

      // Subtle per-instance color variation multiplier
      const varFactor = 0.85 + Math.random() * 0.3;
      col.setRGB(varFactor, varFactor, varFactor);
      this.grassMesh.setColorAt(i, col);
    }

    this.grassMesh.receiveShadow = true;
    this.grassMesh.instanceMatrix.needsUpdate = true;
    if (this.grassMesh.instanceColor) this.grassMesh.instanceColor.needsUpdate = true;
    this.group.add(this.grassMesh);

    // 2. Organic Flower Blossoms (White & Golden Field Flowers)
    const flowerGeo = new THREE.DodecahedronGeometry(0.065, 0);
    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      emissive: 0x443300,
      emissiveIntensity: 0.25
    });

    this.flowerMesh = new THREE.InstancedMesh(flowerGeo, flowerMat, this.flowerCount);
    this.flowerMesh.frustumCulled = false;

    const flowerCol = new THREE.Color();
    const flowerPalette = [0xffffff, 0xffeb7a, 0xffd166, 0xffa07a];

    for (let i = 0; i < this.flowerCount; i++) {
      const r = Math.sqrt(Math.random()) * (this.radius * 0.88);
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = this.heightAt(x, z) + 0.4 + Math.random() * 0.4;

      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.scale.setScalar(0.6 + Math.random() * 0.7);
      dummy.updateMatrix();
      this.flowerMesh.setMatrixAt(i, dummy.matrix);

      flowerCol.setHex(flowerPalette[Math.floor(Math.random() * flowerPalette.length)]);
      this.flowerMesh.setColorAt(i, flowerCol);
    }

    this.flowerMesh.receiveShadow = true;
    this.flowerMesh.instanceMatrix.needsUpdate = true;
    if (this.flowerMesh.instanceColor) this.flowerMesh.instanceColor.needsUpdate = true;
    this.group.add(this.flowerMesh);
  }

  addTo(scene) {
    scene.add(this.group);
  }

  removeFrom(scene) {
    scene.remove(this.group);
  }

  update(time) {
    this.timeUniform.value = time;
    if (this.flowerMesh) {
      this.flowerMesh.rotation.y = Math.sin(time * 0.5) * 0.02;
    }
  }

  dispose() {
    if (this.grassMesh) {
      this.grassMesh.geometry.dispose();
      this.grassMesh.material.dispose();
    }
    if (this.flowerMesh) {
      this.flowerMesh.geometry.dispose();
      this.flowerMesh.material.dispose();
    }
    this.group.clear();
  }
}
