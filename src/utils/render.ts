import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('purple', 0.1);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.5;
controls.minDistance = 10;
controls.maxDistance = 100;
controls.update();
// controls.addEventListener('change', () => render(scene));

function render(scene: THREE.Scene) {
    renderer.render(scene, camera);
}

export { renderer, render };
