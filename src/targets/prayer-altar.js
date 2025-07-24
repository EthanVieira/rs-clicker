import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { Button } from "../ui/button.js";

export class PrayerAltar extends ClickableObject {
    name = "Altar";
    examineText = "Shrine to the glory of Saradomin.";
    actions = [
        { text: "Pray-at", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    isStaticTarget = true;

    constructor(scene) {
        super();
        this.scene = scene;

        const cameraWidth = scene.cameras.main.width;
        const cameraHeight = scene.cameras.main.height;
        const width = 230;
        const height = 130;
        const x = cameraWidth / 2 - width;
        const y = cameraHeight / 2;

        // Add invisible button for sawmill operator
        this.sprite = new Button(this.scene, x, y, width, height);
        this.sprite.on("pointerdown", (pointer) => {
            if (pointer.rightButtonDown() && !pointer.leftButtonDown()) {
                this.createRightClickMenu(pointer.x, pointer.y, this.actions);
            } else {
                this.clickTarget();
            }
        });
    }

    async clickTarget() {
        const prayerLvl = characterData.getLevel("prayer");
        const prayerPanel = this.scene.dashboard.prayer;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        if (characterData.getPrayerPoints() < prayerLvl) {
            characterData.setPrayerPoints(prayerLvl);
            prayerPanel.updatePrayerText();
            this.scene.scene.get(CONSTANTS.SCENES.AUDIO).playSfx("restore-prayer");
        } else {
            chat.writeText("You already have full Prayer points.");
        }
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
