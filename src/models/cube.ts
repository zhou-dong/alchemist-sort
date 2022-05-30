import * as THREE from 'three';
import Container from './container';

export default class Cube extends THREE.Mesh implements Container {

    payload: number;

    constructor(payload: number, material: THREE.Material, width: number, height: number, depth: number) {
        // const geometry = new THREE.BoxGeometry(width, height, depth);
        const geometry = new THREE.CylinderGeometry(width, width, height, 32);
        super(geometry, material)
        this.payload = payload;
    }

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    get z(): number {
        return this.position.z;
    }

    get width(): number {
        return this.scale.x;
    }

    get height(): number {
        return this.scale.y;
    }

    get depth(): number {
        return this.scale.z;
    }

    setColor(color: THREE.ColorRepresentation): Cube {
        (this.material as THREE.MeshStandardMaterial).color.set(color);
        return this;
    }

    isCollison(other: Cube): boolean {
        return this.x + this.width >= other.x && this.x <= other.x + other.width &&
            this.y + (this.height / 2) >= other.y - (other.height / 2) && this.y - (this.height / 2) <= other.y + (other.height / 2) &&
            this.z + this.depth >= other.z && this.z <= other.z + other.depth
    }
}
