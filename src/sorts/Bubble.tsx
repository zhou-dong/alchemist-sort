import React from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import Cube from '../models/cube';
import { generateColor } from '../utils/color';
import { camera, renderer } from '../utils/render';
import { sort } from './algo';

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const nums = 5;
const colors = generateColor("#659157", "#A1C084", nums);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

const cubes: Cube[] = [];

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

for (let i = 0; i < nums; i++) {
    const size = getRandomInt(6);
    const cube = new Cube(size).setColor(colors[i]).setWidth(1).setHeight(size);
    cube.position.setX(i - 4 + 1 * i);
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
            collidedCube = other as Cube;
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

    function handleClick() {
        const steps = sort(cubes);
        for (let i = 0; i < steps.length; i++) {

        }
        console.log("hello world", steps);
    }

    React.useEffect(() => { setScene(scene) }, [setScene]);
    return <>
        <button style={{ position: 'fixed', top: 50 }} onClick={handleClick}>sort</button>
    </>;
}

export default Bubble;
