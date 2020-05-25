export class Button extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, width, height, options = false) {
        super(scene);
        let shape = new Phaser.Geom.Rectangle(x, y, width, height);

        // Debug, depth
        if (options) {
            if (options.debug != undefined && options.debug) {
                this.lineStyle(2, 0xeb4034);
                this.strokeRectShape(shape);
            }
            if (options.depth != undefined) {
                this.setDepth(options.depth);
            }
        }

        this.setInteractive(shape, Phaser.Geom.Rectangle.Contains);
        scene.add.existing(this);
    }
}
