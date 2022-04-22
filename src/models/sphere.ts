import * as THREE from 'three';
import Container from './container';

export default class Sphere extends THREE.Mesh implements Container {

    payload: number;

    constructor(payload: number, radius: number, color: THREE.ColorRepresentation) {
        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        // emissive: "#7eac1b", metalness: 1, roughness: 0.5
        const material = new THREE.MeshStandardMaterial({ color: "#7eac1b", emissive: "#304a4b", roughness: 0.6, metalness: 0.4 });
        super(geometry, material)
        this.payload = payload
    }

    setColor(color: THREE.ColorRepresentation): Sphere {
        (this.material as THREE.MeshBasicMaterial).color.set(color);
        return this;
    }
}
