import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  container3D.clientWidth / container3D.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

// Renderer (smaller container now)
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container3D.clientWidth, container3D.clientHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Lights
// Ambient light - base light for everything
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Main directional light (soft sunlight from top right)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

// Fill light from the opposite side (low intensity to soften shadows)
const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-3, 2, 1);
scene.add(fillLight);

// Backlight for rim/highlight
const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
rimLight.position.set(0, 3, -3);
scene.add(rimLight);

// Optional: light from below (like a table reflection)
const bottomBounce = new THREE.DirectionalLight(0xffffff, 0.2);
bottomBounce.position.set(0, -3, 0);
scene.add(bottomBounce);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;

// Load Model
const loader = new GLTFLoader();
loader.load(
  './models/apple_macbook_pro/scene.gltf',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.rotation.y = Math.PI;
    scene.add(model);
  },
  (xhr) => console.log((xhr.loaded / xhr.total * 100) + "% loaded"),
  (error) => console.error("Model loading error:", error)
);

// Resize Handler
window.addEventListener("resize", () => {
  const width = container3D.clientWidth;
  const height = container3D.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
