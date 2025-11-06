// Vanilla Three.js cube (placeholder for Mesh Studios logo cube)
// Kept lightweight and isolated to the modularization experiment.

import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.js';

function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  return renderer;
}

function createScene() {
  const scene = new THREE.Scene();
  return scene;
}

function createCamera(container) {
  const aspect = container.clientWidth / Math.max(1, container.clientHeight);
  const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
  camera.position.set(2.2, 1.8, 3.2);
  return camera;
}

function addLights(scene) {
  const amb = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(3, 4, 2);
  scene.add(dir);
}

function createLogoCube() {
  // Simple box as a stand-in; face colors mimic a sober palette we can refine.
  const geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
  const colors = [
    0x111111, 0x222222, 0x444444, 0x666666, 0x888888, 0x222222,
  ];
  const mats = colors.map(c => new THREE.MeshStandardMaterial({ color: c, metalness: 0.1, roughness: 0.6 }));
  const mesh = new THREE.Mesh(geo, mats);
  mesh.rotation.set(THREE.MathUtils.degToRad(-20), THREE.MathUtils.degToRad(35), 0);
  return mesh;
}

function fitRenderer(renderer, camera, container) {
  const width = container.clientWidth;
  const height = Math.max(1, container.clientHeight);
  if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
    renderer.setSize(width, height, false);
  }
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

export function mountLogoCube(target = '#logo-cube') {
  const container = typeof target === 'string' ? document.querySelector(target) : target;
  if (!container) return () => {};

  const scene = createScene();
  const camera = createCamera(container);
  const renderer = createRenderer(container);
  addLights(scene);

  const cube = createLogoCube();
  scene.add(cube);

  let raf = null;
  const clock = new THREE.Clock();

  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    // Subtle rotation and float
    cube.rotation.y += 0.01;
    cube.rotation.x = -0.35 + Math.sin(t * 0.6) * 0.05;
    cube.position.y = Math.sin(t * 0.8) * 0.06;

    renderer.render(scene, camera);
  }

  function onResize() {
    fitRenderer(renderer, camera, container);
  }

  window.addEventListener('resize', onResize);
  onResize();
  animate();

  // Expose a disposer for safety
  const dispose = () => {
    try { cancelAnimationFrame(raf); } catch {}
    window.removeEventListener('resize', onResize);
    renderer.dispose?.();
    renderer.domElement?.remove?.();
    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach(m => m && m.dispose && m.dispose());
      }
    });
  };

  // Store on container for potential reuse
  container.__disposeLogoCube = dispose;
  return dispose;
}

// Auto-mount if the default container exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#logo-cube')) mountLogoCube('#logo-cube');
  });
} else {
  if (document.querySelector('#logo-cube')) mountLogoCube('#logo-cube');
}

