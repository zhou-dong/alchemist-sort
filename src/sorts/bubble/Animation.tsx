import React from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { sort } from './algo';
import { generateColor } from '../../utils/color';
import { Button } from '@mui/material';
import { Step } from '../../models/step';
import Container from '../../models/container';
import Steps from '../../components/Steps';

class Item extends THREE.Mesh implements Container {
    payload: number;

    constructor(payload: number, material: THREE.Material, radius: number, height: number) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
        super(geometry, material)
        this.payload = payload;
    }
}

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const colors = generateColor("#9fffcb", "#7ae582", 6);
const scene = new THREE.Scene();

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const createItems = (): Item[] => {
    const items: Item[] = [];

    for (let i = 0; i < 6; i++) {
        const material = new THREE.MeshBasicMaterial({ color: colors[i] });
        let height = 6 - i;
        const cube = new Item(height, material, 1, height);
        cube.position.setX(i - 9 + 2 * i);
        cube.position.setY(height / 2 - 2.2);
        cube.position.setZ(-6);
        items.push(cube);
    }

    return items;
}

const duration = 1;
const ease = "power1";

function waitSeconds(seconds: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(1), seconds * 1000);
    });
}

const Animation = ({ setScene }: Params) => {

    const [items, setItems] = React.useState<Item[]>(
        createItems()
    );

    const [index, setIndex] = React.useState<number>(0);

    React.useEffect(() => { setScene(scene) }, [setScene]);

    React.useEffect(() => {
        items.forEach(item => {
            scene.add(item);
        })
    }, [items]);

    const run = async (step: Step): Promise<void> => {
        const { a, b, exchange } = step;
        const temp = a.position.clone();

        if (exchange) {
            gsap.to(a.position, { x: b.position.x, duration, ease, });
            gsap.to(b.position, { x: temp.x, duration, ease, });
        }

        await waitSeconds(duration);
        return;
    }

    const play = async () => {
        const steps = sort(items);
        for (let i = 0; i < steps.length; i++) {
            setIndex(i + 1);
            await run(steps[i]);
        }
    }

    const refresh = () => {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        setItems(() => createItems());
    }

    return (
        <>
            <Steps steps={index} />
            <Button sx={{ position: "fixed", bottom: "10px" }} onClick={() => {
                play();
            }}>
                play
            </Button>
            <Button sx={{ position: "fixed", bottom: "10px", left: "50px" }} onClick={() => {
                refresh();
            }}>
                refresh
            </Button>
        </>

    );
}

export default Animation;
