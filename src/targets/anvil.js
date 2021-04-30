import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { Button } from "../ui/button.js";
import { getItemClass } from "../utilities.js";

export class Anvil extends ClickableObject {
    name = "Anvil";
    varName = "bronzeDagger"; // Use # bronze daggers forged as quest
    examineText = "Used for fashioning metal items.";
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

        // Add invisible button for anvil
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

        // See if bar is selected
        const selectedIndex = inv.curSelectedItemIndex;
        if (selectedIndex < 0) {
            chat.writeText("Select a bar in your inventory first.");
            return;
        }

        
        const hasHammer = inv.inventory.includes("Hammer")

        if (hasHammer === true) {
            chat.writeText("You need a hammer to smith!");
            return;
        }

        const selectedItem = inv.inventory[selectedIndex];
        switch (selectedItem.name) {
            case "Bronze Bar":
                this.smith("BronzeDagger");
            default:
                chat.writeText("The anvil can only be used with the bar selected");
                break;
        }
    }

    // Take ore and turn it into a bar
    async smith(weaponName) {
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        const bronzeDagger = await getItemClass(weaponName, this.scene.dashboard);

        const indices = bar.ores.map((bar) => inv.getInventoryIndex(bar));
        const allExist = indices.every((index) => index >= 0);

        // All ingredients are in inventory
        if (allExist) {
            const added = inv.addToInventory(bronzeDagger, true);

            // Inventory has space, reduce ore counts by 1
            if (added) {
                indices.forEach((index) => {
                    const obj = inv.inventory[index];
                    obj.setNumItems(obj.numItems - 1);
                });

                // Log click for stats
                this.scene.stats.updateClickedTargetStat();
                characterData.addSkillXp("smithing", bronzeDagger.xp);
                this.scene.enemyKilled("bronzeDagger");

                // Show smith animation
                this.scene.clickAnimation();
            }
        } else {
            chat.writeText(bronzeDagger.smeltingErrorMessage);
        }
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
