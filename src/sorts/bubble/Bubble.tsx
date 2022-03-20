import React from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import Cube from '../../models/cube';
import Sphere from '../../models/sphere';
import { generateColor } from '../../utils/color';
import { camera, renderer } from '../../utils/render';
import { sort } from './algo';
import Container from '../../models/container';
import { Button } from '@mui/material';

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const colors = generateColor("#659157", "#A1C084", 6);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

const cubes: Cube[] = [];
const spheres: Sphere[] = [];

function registeGrid() {
    const gridHelper = new THREE.GridHelper(2000, 100, "white", "white");
    gridHelper.position.y = - 150;
    scene.add(gridHelper);
}

registeGrid();

// const light = new THREE.PointLight(0xff0000, 1, 100);
// light.position.set(50, 50, 50);
// scene.add(light);

// const nums: number[] = [9, 8, 7, 6, 5, 4, 3, 2, 1];

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

for (let i = 0; i < 6; i++) {
    const size = getRandomInt(6) + 1;
    // const cube = new Cube(size).setColor(colors[i]).setWidth(1).setHeight(size);
    // cube.position.setX(i - 6 + 1 * i);
    // cubes[i] = cube;
    // scene.add(cube);

    // const num = nums[i];
    const sphere = new Sphere(size, size / 4, colors[i]);
    sphere.position.setX(i - 8 + 1 * i);
    spheres.push(sphere);
    scene.add(sphere);
}

const controls = new DragControls(scene.children, camera, renderer.domElement);

let startPosition: THREE.Vector3 | null = null;
let collidedCube: Cube | null = null;

controls.addEventListener("drag", function (event) {

    collidedCube = null;
    cubes.forEach(cube => {
        if (cube !== event.object) {
            (cube.material as any).opacity = 1;
        }
    });

    const current: Cube = event.object;
    const others = cubes.filter(cube => cube !== event.object);

    others.forEach(other => {
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

const ease = "back";

const onComplete = (obj: any, finished?: Container) => {
    obj.material.opacity = 1;
    if (finished && finished === obj) {
        obj.setColor("lightgray");
    }
};
const onStart = (obj: any) => {
    obj.material.opacity = 0.80;
};

const handleClick = async () => {

    const steps = sort(spheres);
    for (let i = 0; i < steps.length; i++) {
        const { a, b, exchange, finished } = steps[i];
        if (exchange) {
            const temp = a.position.clone();
            gsap.to(a.position, {
                x: b.position.x, y: b.position.y, z: b.position.z, duration, ease,
                onComplete: () => onComplete(a, finished),
                onStart: () => onStart(a),
            });
            gsap.to(b.position, {
                x: temp.x, y: temp.y, z: temp.z, duration, ease,
                onComplete: () => onComplete(b, finished),
                onStart: () => onStart(b),
            });
        } else {
            gsap.to((a as any).material, {
                opacity: 1, duration,
                onComplete: () => onComplete(a, finished),
                onStart: () => onStart(a),
            });
            gsap.to((b as any).material, {
                opacity: 1, duration,
                onComplete: () => onComplete(b, finished),
                onStart: () => onStart(b),
            });
        }

        await wait(duration);
    }
    await wait(duration);
    spheres[0].setColor("lightgray");
};

function Bubble({ setScene }: Params) {
    React.useEffect(() => { setScene(scene) }, [setScene]);
    return <>
        <Button variant='contained' style={{ position: 'fixed', top: 50 }} onClick={handleClick}> sort</Button>
    </>;
}

export default Bubble;
