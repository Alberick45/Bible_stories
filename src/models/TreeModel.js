import * as THREE from 'three';

/**
 * TreeGroup — Instanced organic trees (trunks + foliage canopies) with PBR materials and heightmap alignment.
 */
export class TreeGroup {
  constructor(options = {}) {
    this.count = options.count || 80;
    this.blobsPerTree = options.blobsPerTree || 3;
    this.radius = options.radius || 150;
    this.minDistFromCenter = options.minDistFromCenter || 10;
    this.heightAt = options.heightAt || ((x, z) => 0);
    this.barkColor = options.barkColor || 0x6e5138;
    this.leafColor = options.leafColor || 0x3d7a2e;

    this.trunks = null;
    this.blobs = null;
    this.group = new THREE.Group();

    this.init();
  }

  init() {
    // Trunk geometry
    const trunkGeo = new THREE.CylinderGeometry(0.22, 0.45, 3.4, 7);
    trunkGeo.translate(0, 1.7, 0);

    // Organic deformed canopy geometry
    const blobGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const pAttr = blobGeo.attributes.position;
    for (let i = 0; i < pAttr.count; i++) {
      const s = 1 + (Math.random() - 0.5) * 0.35;
      pAttr.setXYZ(i, pAttr.getX(i) * s, pAttr.getY(i) * s * 0.85, pAttr.getZ(i) * s);
    }
    blobGeo.computeVertexNormals();

    const barkMat = new THREE.MeshStandardMaterial({
      color: this.barkColor,
      roughness: 0.95,
      metalness: 0.05
    });

    const leafMat = new THREE.MeshStandardMaterial({
      color: this.leafColor,
      roughness: 0.88,
      metalness: 0.02
    });

    this.trunks = new THREE.InstancedMesh(trunkGeo, barkMat, this.count);
    this.blobs = new THREE.InstancedMesh(blobGeo, leafMat, this.count * this.blobsPerTree);

    this.trunks.castShadow = this.trunks.receiveShadow = true;
    this.blobs.castShadow = this.blobs.receiveShadow = true;

    // Disable frustum culling so instanced trees are always visible when looking around
    this.trunks.frustumCulled = false;
    this.blobs.frustumCulled = false;

    const dummy = new THREE.Object3D();
    let bi = 0;
    let createdCount = 0;
    let attempts = 0;

    while (createdCount < this.count && attempts++ < 5000) {
      const x = (Math.random() - 0.5) * this.radius * 2;
      const z = (Math.random() - 0.5) * this.radius * 2;
      const dist = Math.hypot(x, z);
      if (dist < this.minDistFromCenter) continue;

      const s = 0.85 + Math.random() * 1.35;
      const y = this.heightAt(x, z);

      // Set Trunk
      dummy.rotation.set((Math.random() - 0.5) * 0.12, Math.random() * Math.PI, (Math.random() - 0.5) * 0.12);
      dummy.scale.setScalar(s);
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      this.trunks.setMatrixAt(createdCount, dummy.matrix);

      // Set Canopy Blobs
      for (let b = 0; b < this.blobsPerTree; b++) {
        dummy.position.set(
          x + (Math.random() - 0.5) * 2.2 * s,
          y + (3.4 + Math.random() * 1.3) * s,
          z + (Math.random() - 0.5) * 2.2 * s
        );
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        dummy.scale.setScalar(s * (0.75 + Math.random() * 0.65));
        dummy.updateMatrix();
        this.blobs.setMatrixAt(bi++, dummy.matrix);
      }

      createdCount++;
    }

    this.trunks.instanceMatrix.needsUpdate = true;
    this.blobs.instanceMatrix.needsUpdate = true;

    this.group.add(this.trunks);
    this.group.add(this.blobs);
  }

  addTo(scene) {
    scene.add(this.group);
  }

  removeFrom(scene) {
    scene.remove(this.group);
  }

  update(dt, elapsed) {
    if (this.blobs) {
      this.blobs.rotation.y = Math.sin(elapsed * 0.4) * 0.015;
    }
  }

  dispose() {
    if (this.trunks) {
      this.trunks.geometry.dispose();
      this.trunks.material.dispose();
    }
    if (this.blobs) {
      this.blobs.geometry.dispose();
      this.blobs.material.dispose();
    }
    this.group.clear();
  }
}
