import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { calcLevel } from "../utilities.js";
import { Button } from "../ui/button.js";

export class TableSpace extends ClickableObject {
    name = "Table Space";
    examineText = "You can build a table here.";
    actions = [
        { text: "Build", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    validMaterials = new Set(["Plank"]);

    constructor(scene) {
        super();
        this.scene = scene;

        const cameraWidth = scene.cameras.main.width;
        const cameraHeight = scene.cameras.main.height;
        const width = 230;
        const height = 230;
        const x = cameraWidth / 2 - width;
        const y = cameraHeight / 2 - 100;

        // Add invisible button for table space
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
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        // See if planks are selected
        const selectedIndex = inv.curSelectedItemIndex;
        const selectedItem = inv.inventory[selectedIndex];

        if (
            selectedIndex < 0 ||
            !selectedItem ||
            !this.validMaterials.has(selectedItem.name)
        ) {
            chat.writeText("Select some planks in your inventory first.");
            return;
        }

        if (inv.getInventoryIndex("Hammer") < 0) {
            chat.writeText("You need a hammer to build a table.");
            return;
        }

        const reqLevel = selectedItem.constructionLevel;
        const currentLevel = calcLevel(characterData.getSkillXp("construction"));

        if (currentLevel < reqLevel) {
            chat.writeText(
                "You do not have the required construction level to build with this plank."
            );
            return;
        }

        selectedItem.setNumItems(selectedItem.numItems - 1);

        // Log click for stats
        this.scene.stats.updateClickedTargetStat();
        characterData.addSkillXp({ construction: selectedItem.constructionXp });
        this.scene.enemyKilled(selectedItem.type.toLowerCase() + "Table");

        this.scene.scene.get(CONSTANTS.SCENES.ANIMATION).clickAnimation({
            imageName: "hammer-hand",
            startX: 100,
            startY: 100,
            scale: 0.7,
            curve: 0,
            alpha: 1,
            flipx: false,
        });
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
