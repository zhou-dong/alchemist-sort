import * as THREE from 'three';

export default class Cube extends THREE.Mesh {

    constructor() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial();
        super(geometry, material)
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

    isCollison(other: Cube): boolean {
        return this.x + this.width >= other.x && this.x <= other.x + other.width &&
            this.y + (this.height / 2) >= other.y - (other.height / 2) && this.y - (this.height / 2) <= other.y + (other.height / 2) &&
            this.z + this.depth >= other.z && this.z <= other.z + other.depth
    }
}
