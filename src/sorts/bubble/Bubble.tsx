import React from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import Sphere from '../../models/sphere';
import { generateColor } from '../../utils/color';
import { sort } from './algo';
import Container from '../../models/container';
import { Button, ButtonGroup } from '@mui/material';

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const colors = generateColor("#659157", "#A1C084", 6);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

const spheres: Sphere[] = [];

function registeGrid() {
    const gridHelper = new THREE.GridHelper(2000, 100, "white", "white");
    gridHelper.position.y = - 150;
    scene.add(gridHelper);
}

registeGrid();

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

for (let i = 0; i < 6; i++) {
    const size = getRandomInt(6) + 1;
    const sphere = new Sphere(size, size / 4, colors[i]);
    sphere.position.setX(i - 8 + 1 * i);
    spheres.push(sphere);
    scene.add(sphere);
}

const duration = 1;

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

const steps = sort(spheres);

function Bubble({ setScene }: Params) {
    React.useEffect(() => { setScene(scene) }, [setScene]);

    const [index, setIndex] = React.useState<number>(0);
    const [btnDisabled, setBtnDisabled] = React.useState<boolean>(false);

    const handleSwap = () => {
        const { a, b, exchange, finished } = steps[index];
        if (exchange) {
            setBtnDisabled(true);
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
            setIndex(index => index + 1);
            setTimeout(() => setBtnDisabled(false), duration * 1000);
        }
    };

    const handleNext = () => {
        const { a, b, exchange, finished } = steps[index];
        if (!exchange) {
            setBtnDisabled(true);
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

            setIndex(index => index + 1);
            setTimeout(() => setBtnDisabled(false), duration * 1000);
        } else {
            console.error("should next", index);
        }
    };

    return <>
        <ButtonGroup style={{ position: 'fixed', top: 150 }} >
            <Button onClick={handleSwap} disabled={btnDisabled}>SWAP</Button>
            <Button onClick={handleNext} disabled={btnDisabled}>NEXT</Button>
        </ButtonGroup>
    </>;
}

export default Bubble;
