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

    async clickTarget() {
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        // See if ore is selected
        const selectedIndex = inv.curSelectedItemIndex;
        if (selectedIndex < 0) {
            chat.writeText("Select an ore in your inventory first");
            return;
        }

        const selectedItem = inv.inventory[selectedIndex];
        switch (selectedItem.name) {
            case "Copper Ore":
            case "Tin Ore":
                this.smelt(
                    ["CopperOre", "TinOre"],
                    "BronzeBar",
                    1,
                    "You need at least 1 copper and 1 tin in your inventory."
                );
                break;
            default:
                chat.writeText("The furnace can only be used with an ore selected");
                break;
        }
    }

    // Take ore and turn it into a bar
    async smelt(ores, bar, xp, errorMessage) {
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        const indices = ores.map((ore) => inv.getInventoryIndex(ore));
        const allExist = indices.every((index) => index >= 0);

        // All ingredients are in inventory
        if (allExist) {
            const added = inv.addToInventory(await getItemClass(bar, this.scene), true);

            // Inventory has space, reduce ore counts by 1 and add xp
            if (added) {
                indices.forEach((index) => {
                    const obj = inv.inventory[index];
                    obj.setNumItems(obj.numItems - 1);
                });

                // Log click for stats
                this.scene.stats.updateClickedTargetStat();
                characterData.addSkillXp("smithing", xp);
                this.scene.enemyKilled("bar");
            }
        } else {
            chat.writeText(errorMessage);
        }
    }

    show(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
