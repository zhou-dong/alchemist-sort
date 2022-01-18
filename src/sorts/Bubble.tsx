import React from 'react';
import * as THREE from 'three';
import Cube from '../models/cube';
import { generateColor } from '../utils/color';

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const size = 5;
const colors = generateColor("#9FE2BF", "#40E0D0", size);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

for (let i = 0; i < size; i++) {
    const cube = new Cube()
        .setColor(colors[i])
        .setWidth(1)
        .setHeight((i + 1) * 1);
    cube.position.setX(i - 5 + 1 * i);
    scene.add(cube);
}

function Bubble({ setScene }: Params) {

    React.useEffect(() => {
        setScene(scene);
    }, [setScene])

    return (<div></div>);
}

export default Bubble;
