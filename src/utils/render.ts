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

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true
// controls.rotateSpeed = 0.5;
// controls.minDistance = 10;
// controls.maxDistance = 100;
// controls.update();

function render(scene: THREE.Scene) {
    renderer.render(scene, camera);
}

const mouse = new THREE.Vector2(1, 1);

function onMouseDown(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousedown', onMouseDown, false);

const raycaster = new THREE.Raycaster();

function refreshRaycaster() {
    raycaster.setFromCamera(mouse, camera);
}

function clearIntersection() {
    mouse.x = Number.MAX_VALUE;
    mouse.y = Number.MAX_VALUE;
}

export { camera, clearIntersection, raycaster, renderer, render, refreshRaycaster };
