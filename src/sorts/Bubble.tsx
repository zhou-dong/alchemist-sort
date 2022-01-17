import React from 'react';
import * as THREE from 'three';

class Cube extends THREE.Mesh {

    constructor() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial();
        super(geometry, material)
    }

    color(color: THREE.ColorRepresentation): Cube {
        (this.material as THREE.MeshBasicMaterial).color.set(color);
        return this;
    }

    width(width: number): Cube {
        this.scale.setX(width);
        return this;
    }

    height(height: number): Cube {
        this.scale.setY(height);
        return this;
    }

    depth(depth: number): Cube {
        this.scale.setZ(depth);
        return this;
    }
}

// color along with size
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const cube = new Cube().color('red');

scene.add(cube);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('purple', 0.1);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', onWindowResize, false);

function Bubble() {

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref && ref.current) {
            ref.current.appendChild(renderer.domElement);
        }
    }, [ref]);

    return (
        <>
            <div ref={ref}></div>
        </>
    );
}

export default Bubble;
