import React from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { generateColor } from '../../utils/color';
import { sort } from './algo';
import Container from '../../models/container';
import { Avatar, Button, ButtonGroup, IconButton } from '@mui/material';
import Cube from '../../models/cube';
import { RefreshOutlined } from '@mui/icons-material';

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const colors = generateColor("#FF5733", "#ADC323", 6);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

const cubes: Cube[] = [];

function registeGrid() {
    const gridHelper = new THREE.GridHelper(200, 100, "lightgray", "lightgray");
    gridHelper.position.y = -50;
    scene.add(gridHelper);
}

registeGrid();

// color: THREE.ColorRepresentation
const material = new THREE.MeshStandardMaterial({ color: "#1BCE4B", emissive: "#304a4b", roughness: 0.6, metalness: 0.4 });

for (let i = 2; i < 8; i++) {
    const size = 8 - i // getRandomInt(6) + 1;
    const cube = new Cube(size, material, 1, size, 0.4);
    cube.position.setX(i - 9 + 1 * i);
    cube.position.setY(size / 2 - 5);
    cubes.push(cube);
    scene.add(cube);
}

const duration = 1;

const ease = "back";

const steps = sort(cubes);

const updateNext = (index: number) => {
    const next = index + 1;
    const firstStep = steps[next];
    (firstStep.a as any).material.opacity = 0.60;
    (firstStep.b as any).material.opacity = 0.60;
}

updateNext(-1);

const onComplete = (obj: any, index: number, finished?: Container) => {

    obj.material.opacity = 1;

    if (index < steps.length - 1) {
        updateNext(index);
    } else {
        if (index === steps.length - 1) {
            const last = steps[index];
            (last.a as any).setColor("lightgray");
            (last.b as any).setColor("lightgray");
        }
    }

    if (finished && finished === obj) {
        obj.setColor("lightgray");
    }

};

const onStart = (obj: any) => {
    obj.material.opacity = 0.80;
};

const light = new THREE.PointLight("#3f7861");
light.position.set(150, 100, 100);
scene.add(light)

function Bubble({ setScene }: Params) {
    React.useEffect(() => { setScene(scene) }, [setScene]);

    const [index, setIndex] = React.useState<number>(0);
    const [btnDisabled, setBtnDisabled] = React.useState<boolean>(false);

    const handleSwap = () => {

        if (index >= steps.length) {
            return;
        }

        const { a, b, exchange, finished } = steps[index];
        if (exchange) {
            setBtnDisabled(true);
            const temp = a.position.clone();
            gsap.to(a.position, {
                x: b.position.x, duration, ease,
                onStart: () => onStart(a),
                onComplete: () => onComplete(a, index, finished),
            });
            gsap.to(b.position, {
                x: temp.x, duration, ease,
                onStart: () => onStart(b),
                onComplete: () => onComplete(b, index, finished),
            });
            if (index < steps.length - 1) {
                setTimeout(() => setBtnDisabled(false), duration * 1000);
            }
            setIndex(index => index + 1);
        } else {
            bounce();
        }
    };

    const handleNext = () => {
        if (index >= steps.length) {
            return;
        }

        const { a, b, exchange, finished } = steps[index];
        if (!exchange) {
            setBtnDisabled(true);
            gsap.to((a as any).material, {
                opacity: 1, duration,
                onStart: () => onStart(a),
                onComplete: () => onComplete(a, index, finished),
            });
            gsap.to((b as any).material, {
                opacity: 1, duration,
                onStart: () => onStart(b),
                onComplete: () => onComplete(b, index, finished),
            });
            if (index < steps.length - 1) {
                setTimeout(() => setBtnDisabled(false), duration * 1000);
            }
            setIndex(index => index + 1);
        } else {
            bounce();
        }
    };

    const btnRef = React.useRef<HTMLDivElement>(null);

    const bounce = () => {
        if (btnRef.current) {
            bounceBtn(btnRef.current);
        }
    }

    const bounceBtn = (btn: HTMLDivElement) => {
        const base: gsap.TweenVars = { duration: 0.04, yoyo: true, repeat: 4 };
        const onStart = () => setBtnDisabled(true);
        const onComplete = () => setBtnDisabled(false);

        gsap.timeline()
            .to(btn, { ...base, x: "+=10", onStart })
            .to(btn, { ...base, x: "-=10", onComplete })
    }

    const handleRefresh = () => {
        console.log("refresh");
    }

    return (
        <div style={{ width: "100%", position: 'fixed', top: 150 }}>
            <Avatar sx={{
                width: 50,
                height: 50,
                bgcolor: "green",
                position: "absolute",
                top: 100,
                right: 100

            }}>
                {index}
            </Avatar>
            <IconButton
                size="large"
                style={{
                    position: "absolute",
                    top: 160,
                    right: 100
                }}
                onClick={handleRefresh}
            >
                <RefreshOutlined></RefreshOutlined>
            </IconButton>
            <ButtonGroup
                size="medium"
                variant="contained"
                disabled={btnDisabled}
                ref={btnRef}
            >
                <Button onClick={handleSwap}>SWAP</Button>
                <Button onClick={handleNext}>NEXT</Button>
            </ButtonGroup>
        </div>
    );
}

export default Bubble;
