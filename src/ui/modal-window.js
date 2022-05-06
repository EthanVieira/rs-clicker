import { Button } from "./button.js";

export class ModalWindow extends Phaser.Scene {
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    visible = false;

    window;
    choice = "None";

    leftOffset = 8;
    topOffset = 16;


    constructor(scene) {
        super();
        this.scene = scene;
    }

    setVisible(isVisible = true) {
        this.visible = isVisible;
        this.window.visible = isVisible;
    }

    getChoice() {
        return this.choice;
    }
};