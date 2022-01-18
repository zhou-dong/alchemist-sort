import React from 'react';
import * as THREE from 'three';
import Cube from '../models/cube';

import { render } from '../utils/render';

// color along with size

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// };
// animate();

function Bubble() {

    const scene = new THREE.Scene();

    const size = 5;

    for (let i = 0; i < size; i++) {
        const cube = new Cube()
            .setColor('green')
            .setWidth(1)
            .setHeight((i + 1) * 1)
            ;

        cube.position.setX(i - 5 + 1 * i);
        scene.add(cube);
    }

    render(scene);

    return (<div></div>);
}

export default Bubble;
