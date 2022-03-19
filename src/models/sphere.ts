import * as THREE from 'three';
import Container from './container';

export default class Sphere extends THREE.Mesh implements Container {

    payload: number;

    constructor(payload: number, radius: number, color: THREE.ColorRepresentation) {
        const geometry = new THREE.SphereGeometry(radius);
        const material = new THREE.MeshBasicMaterial({ color });
        super(geometry, material)
        this.payload = payload
    }

    setColor(color: THREE.ColorRepresentation): Sphere {
        (this.material as THREE.MeshBasicMaterial).color.set(color);
        return this;
    }
}
