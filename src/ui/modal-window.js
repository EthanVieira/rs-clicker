import { Button } from "./button.js";

export class ModalWindow extends Phaser.Scene {
    x = 0;
    y = 0;

    visible = false;
    window;

    choice = "None";

    constructor(scene) {
        super();
        this.scene = scene;
    }

    refresh() {
        this.scene.bringToTop();
    }

    setVisible(isVisible = true) {
        this.visible = isVisible;
        this.window.visible = isVisible;
    }

    getChoice() {
        return this.choice;
    }

    getSpriteName(name) {
        let result = name.toLowerCase();
        result = result.replaceAll(" ", "-");
        return result;
    }
}
