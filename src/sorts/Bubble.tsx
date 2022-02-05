import React from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import Cube from '../models/cube';
import { generateColor } from '../utils/color';

import { camera, renderer } from '../utils/render';

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const size = 5;
const colors = generateColor("#9FE2BF", "#40E0D0", size);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

const cubes: Cube[] = [];

for (let i = 0; i < size; i++) {
    const cube = new Cube()
        .setColor(colors[i])
        .setWidth(1)
        .setHeight((i + 1) * 1);
    cube.position.setX(i - 5 + 1 * i);
    cubes[i] = cube;
    scene.add(cube);
}

const controls = new DragControls(scene.children, camera, renderer.domElement);

let startPosition: THREE.Vector3 | null = null;
let collidedCube: Cube | null = null;

controls.addEventListener("drag", function (event) {

    collidedCube = null;
    cubes.map(cube => {
        if (cube !== event.object) {
            (cube.material as any).opacity = 1;
        }
    });

    const current: Cube = event.object;
    const others = cubes.filter(cube => cube != event.object);

    others.map(other => {
        if (current.isCollison(other)) {
            (other.material as any).opacity = 0.4;
            collidedCube = (other as any);
        }
    });

});

controls.addEventListener('dragstart', function (event) {
    startPosition = new THREE.Vector3(event.object.x, event.object.y, event.object.z);
    event.object.material.opacity = 0.80;
});

controls.addEventListener('dragend', function (event) {
    cubes.map(cube => (cube.material as any).opacity = 1);
    const current: Cube = event.object as Cube;

    if (startPosition) {
        if (collidedCube) {
            current.position.set(collidedCube.x, collidedCube.y, collidedCube.z);
            collidedCube.position.set(startPosition.x, startPosition.y, startPosition.z);
        } else {
            const { x, y, z } = startPosition;
            current.position.set(x, y, z);
        }
    }

    startPosition = null;
});

function Bubble({ setScene }: Params) {
    React.useEffect(() => { setScene(scene) }, [setScene])
    return <></>;
}

export default Bubble;
