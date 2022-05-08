import gsap from 'gsap';

const baseVars: gsap.TweenVars = { duration: 0.04, yoyo: true, repeat: 4 };

interface Props {
    div: HTMLDivElement;
    onStart?: () => any;
    onComplete?: () => any;
}

export default function ({ div, onStart, onComplete }: Props) {

    gsap.timeline()
        .to(div, { ...baseVars, x: "+=10", onStart })
        .to(div, { ...baseVars, x: "-=10", onComplete })
}
