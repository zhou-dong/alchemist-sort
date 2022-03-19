import { Action } from "./action";
import Container from "./container"

export type Step = {
    a: Container;
    b: Container;
    action: Action;
    exchange: boolean;
}
