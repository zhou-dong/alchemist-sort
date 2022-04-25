import React from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { generateColor } from '../../utils/color';
import { sort } from './algo';
import Container from '../../models/container';
import { Avatar, Button, ButtonGroup } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { pink } from '@mui/material/colors';
import Cube from '../../models/cube';

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

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

for (let i = 2; i < 8; i++) {
    const size = 8 - i // getRandomInt(6) + 1;
    const cube = new Cube(size, "#1BCE4B", 1, size, 0.4);
    cube.position.setX(i - 9 + 1 * i);
    cube.position.setY(size / 2 - 3);
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
    const [showAlert, setShowAlert] = React.useState<boolean>(false);

    const handleSwap = () => {
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
            setIndex(index => index + 1);
            setTimeout(() => setBtnDisabled(false), duration * 1000);
        } else {
            handleShowAlert();
        }
    };

    const handleNext = () => {
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

            setIndex(index => index + 1);
            setTimeout(() => setBtnDisabled(false), duration * 1000);
        } else {
            handleShowAlert();
        }
    };

    const alertRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {

    }, [alertRef, showAlert])

    const handleShowAlert = () => {

        console.log("fa bu hui", alertRef);


        if (alertRef && alertRef.current) {
            console.log("show");

            gsap.to(alertRef.current, {
                x: 500,
                duration,
                ease: "power3.out",
                onStart: () => {

                    setShowAlert(true)
                },
                onComplete: () => setShowAlert(false)
            })
        }


    }

    return (
        <div style={{ width: "100%", position: 'fixed', top: 150 }}>
            <Avatar sx={{ width: 50, height: 50, bgcolor: "green" }}>{index}</Avatar>
            {
                <Avatar sx={{ bgcolor: pink[500] }} ref={alertRef}>
                    <PriorityHighIcon />
                </Avatar>
            }
            <ButtonGroup size="large" variant="contained" disabled={btnDisabled} color="success">
                <Button onClick={handleSwap}>SWAP</Button>
                <Button onClick={handleNext}>NEXT</Button>
            </ButtonGroup>
        </div>
    );
}

export default Bubble;
