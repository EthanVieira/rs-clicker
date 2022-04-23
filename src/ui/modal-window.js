import { Button } from "./button.js";

export class ModalWindow extends Phaser.Scene {
    x = 80;
    y = 80;
    width = 360;
    height = 240;

    visible = false;

    window

    constructor(scene) {
        super();
        this.scene = scene;
        this.window = scene.add.graphics();
        this.window.setDepth(3);
        this.window.fillStyle(0x000000); // Border (black)
        this.window.fillRect(this.x, this.y, this.width + 4, this.height + 4);
        this.window.visible = this.visible;

        this.exitButton = new Button(this.scene, this.x + this.width - 16, this.y, 16, 16);
        this.exitButton.on("pointerup", () => {
            if (this.visible == true) {
                this.setVisible(false);
            }
        });

        this.exitIcon = scene.add.graphics();
        this.exitIcon.setDepth(3);
        this.exitIcon.fillStyle(0xFFFFFF);
        this.exitIcon.fillRect(this.x + this.width - 16, this.y, 16, 16);
        this.exitIcon.visible = this.visible;
    }

    preload() {
        
    }

    create() {
        this.add.image(400, 300, "smithing-interface");
    }

    refresh() {
        this.scene.bringToTop();
    }

    setVisible(isVisible = true) {
        this.visible = isVisible;
        this.window.visible = isVisible;
        this.exitIcon.visible = isVisible;
    }
};