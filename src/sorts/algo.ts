import { Action } from "../models/action";
import Container from "../models/container"
import { Step } from "../models/step"

const exchange = (arrays: Container[], a: number, b: number): void => {
    const temp = arrays[a];
    arrays[a] = arrays[b];
    arrays[b] = temp;
}

export const sort = (arrays: Container[]): Step[] => {
    const steps: Step[] = [];

    for (let i = arrays.length - 1; i >= 0; i--) {
        for (let y = 0; y < i; y++) {
            const a = arrays[y];
            const b = arrays[y + 1];
            if (a.payload > b.payload) {
                const step: Step = { a, b, action: Action.Switch, exchange: true };
                steps.push(step);
                exchange(arrays, y, y + 1);
            } else {
                const step: Step = { a, b, action: Action.None, exchange: false };
                steps.push(step);
            }
        }
    }

    return steps;
}
