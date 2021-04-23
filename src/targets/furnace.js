import { ClickableObject } from "../clickable-object.js";
import { Button } from "../ui/button.js";

export class Furnace extends ClickableObject {
    name = "Furnace";
    examineText = "A red hot furnace.";
    actions = [
        { text: "Forge", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(scene) {
        super();

        this.scene = scene;
        const cameraWidth = scene.cameras.main.width;
        const cameraHeight = scene.cameras.main.height;
        const x = cameraWidth / 2 - 230;
        const y = cameraHeight / 2 - 150;
        const width = 230;
        const height = 150;

        // Add invisible button for furnace
        this.sprite = new Button(scene, x, y, width, height);
        this.sprite.on("pointerdown", (pointer) => {
            if (pointer.rightButtonDown()) {
                this.createRightClickMenu(pointer.x, pointer.y, this.actions);
            } else {
                this.clickTarget();
            }
        });
    }

    clickTarget() {}

    show(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
