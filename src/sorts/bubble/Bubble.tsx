import React from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { generateColor } from '../../utils/color';
import { sort } from './algo';
import Container from '../../models/container';
import { IconButton } from '@mui/material';
import Cube from '../../models/cube';
import { RefreshOutlined } from '@mui/icons-material';
import { createStyles, makeStyles } from '@mui/styles';
import Steps from "../../components/Steps";
import bounce from "../../utils/bounce";
import SwapOrNext from "../../components/SwapOrNext";

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const colors = generateColor("#FF5733", "#ADC323", 6);
const scene = new THREE.Scene(); //React.useMemo(() => new THREE.Scene(), []);

const cubes: Cube[] = [];

// color: THREE.ColorRepresentation
// const material = new THREE.MeshStandardMaterial({ color: "grey", emissive: "grey", roughness: 0.1, metalness: 1.4 });
const material = new THREE.MeshStandardMaterial({ color: "grey" });

for (let i = 2; i < 8; i++) {
    const size = 8 - i // getRandomInt(6) + 1;
    const cube = new Cube(size, material, 1, size, 0.4);
    cube.position.setX(i - 9 + 1 * i);
    cube.position.setY(size / 2 - 2.2);
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
// scene.add(light);

const useStyles = makeStyles(() => createStyles({
    btns: {
        textAlign: "center",
        position: "fixed",
        bottom: 200,
        width: "100%"
    },
    refresh: {
        position: "fixed",
        bottom: 80,
        right: 40,
        border: "2px solid lightgrey",
    }
}));

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
            bounceBtns();
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
            bounceBtns();
        }
    };

    const btnRef = React.useRef<HTMLDivElement>(null);

    const bounceBtns = () => {
        if (btnRef.current) {
            bounce({
                div: btnRef.current,
                onStart: () => setBtnDisabled(true),
                onComplete: () => setBtnDisabled(false)
            });
        }
    }

    const handleRefresh = () => {
        setIndex(0);
    }

    const classes = useStyles();

    const refresh = (
        <IconButton
            size="large"
            className={classes.refresh}
            onClick={handleRefresh}
        >
            <RefreshOutlined />
        </IconButton>
    );

    const btns = (
        <div className={classes.btns}>
            <div ref={btnRef}>
                <SwapOrNext
                    disabled={btnDisabled}
                    handleNext={handleNext}
                    handleSwap={handleSwap}
                />
            </div>
        </div>
    );

    return (
        <>
            <Steps steps={index} />
            {refresh}
            {btns}
        </>
    );
}

export default Bubble;
