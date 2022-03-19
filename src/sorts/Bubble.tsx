import React from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import Cube from '../models/cube';
import { generateColor } from '../utils/color';
import { camera, renderer } from '../utils/render';
import { sort } from './algo';

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const nums = 7;
const colors = generateColor("#659157", "#A1C084", nums);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

const cubes: Cube[] = [];

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

for (let i = 0; i < nums; i++) {
    const size = getRandomInt(6) + 1;
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

const duration = 1;

function wait(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const handleClick = async () => {
    const steps = sort(cubes);
    for (let i = 0; i < steps.length; i++) {
        const { a, b, exchange, finished } = steps[i];
        (a as any).material.opacity = 0.80;
        (b as any).material.opacity = 0.80;
        if (exchange) {
            const { x, y, z } = a.position;
            gsap.to(a.position, { x: b.position.x, y: b.position.y, z: b.position.z, duration, ease: "back" });
            gsap.to(b.position, { x, y, z, duration, ease: "back" });
        }
        await wait(duration);
        (a as any).material.opacity = 1;
        (b as any).material.opacity = 1;

        if (finished) {
            if (finished === a) {
                (a as any).setColor("red");
            }
            if (finished === b) {
                (b as any).setColor("red");
            }
        }
    }
};

function Bubble({ setScene }: Params) {
    React.useEffect(() => { setScene(scene) }, [setScene]);
    return <>
        <button style={{ position: 'fixed', top: 50 }} onClick={handleClick}>sort</button>
    </>;
}

export default Bubble;
