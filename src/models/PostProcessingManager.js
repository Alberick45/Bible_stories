import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/**
 * PostProcessingManager — Manages EffectComposer, UnrealBloomPass, and ACESFilmic tone mapping pipeline.
 */
export class PostProcessingManager {
  constructor(renderer, scene, camera, options = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    
    this.composer = null;
    this.bloomPass = null;
    this.enabled = options.enabled !== undefined ? options.enabled : true;

    this.init(options);
  }

  init(options) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.composer = new EffectComposer(this.renderer);
    
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Unreal Bloom Pass setup
    const resolution = new THREE.Vector2(width, height);
    const strength = options.bloomStrength || 0.45;
    const radius = options.bloomRadius || 0.4;
    const threshold = options.bloomThreshold || 0.85;

    this.bloomPass = new UnrealBloomPass(resolution, strength, radius, threshold);
    this.composer.addPass(this.bloomPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);
  }

  setSize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }
  }

  render() {
    if (this.enabled && this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  dispose() {
    if (this.composer) {
      this.composer.passes.forEach(pass => {
        if (pass.dispose) pass.dispose();
      });
    }
  }
}
