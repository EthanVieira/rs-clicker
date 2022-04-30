import { Button } from "./button.js";

export class ModalWindow extends Phaser.Scene {
    x = 80;
    y = 80;
    width = 360;
    height = 240;

    visible = false;

    window;
    elements = [];
    elementEvents = [];
    choice = "None";

    constructor(scene, options) {
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

    create() {
        this.add.image(400, 300, "smithing-interface");
    }

    refresh() {
        this.scene.bringToTop();
    }

    clearElements() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].destroy();
        }
        
        this.elements = [];
        this.elementEvents = [];
    }

    addElements(elements) {
        let offset = 8;
        this.elementEvents = elements.map((obj) => obj);

        for (let i = 0; i < elements.length; i++) {
            
            let elementButton = new Button(this.scene, this.x + offset, this.y + 16, 48, 48);
            elementButton.on("pointerup", () => {
                if (this.visible == true) {
                    this.choice = this.elementEvents[i];
                    this.setVisible(false);
                }
            });

            let elementIcon = this.scene.add.graphics();
            elementIcon.setDepth(3);
            elementIcon.fillStyle(0x22EE22);
            elementIcon.fillRect(this.x + offset, this.y + 16, 48, 48);
            elementIcon.visible = this.visible;

            offset += 56;

            this.elements.push(elementButton);
            this.elements.push(elementIcon);
        }
    }

    setVisible(isVisible = true) {
        this.visible = isVisible;
        this.window.visible = isVisible;
        this.exitIcon.visible = isVisible;

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].visible = isVisible;
        }
    }

    getChoice() {
        return this.choice;
    }
};