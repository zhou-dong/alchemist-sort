import * as THREE from 'three';

export default class Cube extends THREE.Mesh {

    constructor() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial();
        super(geometry, material)
    }

    setColor(color: THREE.ColorRepresentation): Cube {
        (this.material as THREE.MeshBasicMaterial).color.set(color);
        return this;
    }

    setWidth(width: number): Cube {
        this.scale.setX(width);
        return this;
    }

    setHeight(height: number): Cube {
        this.scale.setY(height);
        return this;
    }

    setDepth(depth: number): Cube {
        this.scale.setZ(depth);
        return this;
    }

}
