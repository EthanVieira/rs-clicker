import { ModalWindow } from "../modal-window.js"
import { Button } from "../button.js";

export class SmithingModalWindow extends ModalWindow {
    x = 80;
    y = 80;
    width = 360;
    height = 240;

    visible = false;

    window;
    elements = [];
    elementEvents = [];
    choice = "None";

    leftOffset = 8;
    topOffset = 16;

    horizontalPadding = 8;
    verticalPadding = 8;

    iconWidth = 48;
    iconHeight = 48;
    maxIconsPerRow = 4;

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
            if (this.visible) {
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
        for (let element of this.elements) {
            element.destroy();
        }
        
        this.elements = [];
    }

    addElements(elements) {
        let offset = 8;

        let positionX = this.x + this.leftOffset + this.horizontalPadding;
        let positionY = this.y + this.topOffset + this.verticalPadding;

        for (let element of elements) {
            
            let elementButton = new Button(this.scene, positionX, positionY, this.iconWidth, this.iconHeight);
            elementButton.on("pointerup", () => {
                if (this.visible) {
                    this.choice = element;
                    this.setVisible(false);
                }
            });

            let elementIcon = this.scene.add.graphics();
            elementIcon.setDepth(3);
            elementIcon.fillStyle(0x22EE22);
            elementIcon.fillRect(positionX, positionY, this.iconWidth, this.iconHeight);
            elementIcon.visible = this.visible;

            this.elements.push(elementButton);
            this.elements.push(elementIcon);

            positionX += this.iconWidth + this.horizontalPadding;
        }
    }

    setVisible(isVisible = true) {
        this.visible = isVisible;
        this.window.visible = isVisible;
        this.exitIcon.visible = isVisible;

        for (let element of this.elements) {
            element.visible = isVisible;
        }
    }

    getChoice() {
        return this.choice;
    }
};