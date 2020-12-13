export class TextRow extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        scene.add.existing(this);
    }

    get displayHeight() {
        return this.getBounds().height;
    }
}
