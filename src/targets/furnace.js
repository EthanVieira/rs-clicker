import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { Button } from "../ui/button.js";
import { getItemClass } from "../utilities.js";

export class Furnace extends ClickableObject {
    name = "Furnace";
    varName = "bar"; // Use # bars forged as quest
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
        const width = 230;
        const height = 150;
        const x = cameraWidth / 2 - width;
        const y = cameraHeight / 2 - height;

        // Add invisible button for furnace
        this.sprite = new Button(scene, x, y, width, height);
        this.sprite.on("pointerdown", (pointer) => {
            if (pointer.rightButtonReleased() && !pointer.leftButtonDown()) {
                this.createRightClickMenu(pointer.x, pointer.y, this.actions);
            } else {
                this.clickTarget();
            }
        });
    }

    async clickTarget() {
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        // See if ore is selected
        const selectedIndex = inv.curSelectedItemIndex;
        if (selectedIndex < 0) {
            chat.writeText("Select an ore in your inventory first.");
            return;
        }

        const selectedItem = inv.inventory[selectedIndex];
        switch (selectedItem.name) {
            case "Copper Ore":
            case "Tin Ore":
                this.smelt("BronzeBar");
                break;
            default:
                chat.writeText("The furnace can only be used with an ore selected.");
                break;
        }
    }

    // Take ore and turn it into a bar
    async smelt(barName) {
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        const bar = await getItemClass(barName, this.scene);

        const indices = bar.ores.map((ore) => inv.getInventoryIndex(ore));
        const allExist = indices.every((index) => index >= 0);

        // All ingredients are in inventory
        if (allExist) {
            const added = inv.addToInventory(bar, true);

            // Inventory has space, reduce ore counts by 1
            if (added) {
                indices.forEach((index) => {
                    const obj = inv.inventory[index];
                    obj.setNumItems(obj.numItems - 1);
                });

                // Log click for stats
                this.scene.stats.updateClickedTargetStat();
                characterData.addSkillXp("smithing", bar.xp);
                this.scene.enemyKilled("bar");

                // Show smelt animation
                this.scene.clickAnimation();
            }
        } else {
            chat.writeText(bar.smeltingErrorMessage);
        }
    }

    show(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
