import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { Button } from "../ui/button.js";
import { getItemClass } from "../utilities.js";
import { ModalWindow } from "../ui/modal-window.js";

export class Anvil extends ClickableObject {
    name = "Anvil";
    varName = "bronzeDagger"; // Use # bronze daggers forged as quest
    examineText = "Used for fashioning metal items.";
    actions = [
        { text: "Forge", func: "clickTarget" },
        { text: "Select Recipe", func: "selectRecipe" },
        { text: "Examine", func: "examine" },
    ];

    constructor(scene) {
        super();
        this.scene = scene;

        const cameraWidth = scene.cameras.main.width;
        const cameraHeight = scene.cameras.main.height;
        const width = 220;
        const height = 180;
        const x = cameraWidth / 2 - width + 20;
        const y = cameraHeight / 2 - height + 60;

        // Add invisible button for anvil
        this.sprite = new Button(scene, x, y, width, height);
        this.sprite.on("pointerdown", (pointer) => {
            if (pointer.rightButtonDown() && !pointer.leftButtonDown()) {
                this.createRightClickMenu(pointer.x, pointer.y, this.actions);
            } else {
                this.clickTarget();
            }
        });

        //Create modal window
        this.mWindow = new ModalWindow(this.scene);
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

        const hasHammer = inv.getInventoryIndex("Hammer");

        if (hasHammer < 0) {
            chat.writeText("You need a hammer to work the metal with.");
            return;
        }

        const selectedItem = inv.inventory[selectedIndex];

        switch (selectedItem.name) {
            case "Bronze Bar":
                this.smith("BronzeDagger");
                break;
            default:
                chat.writeText("The anvil can only be used with the bar selected");
                break;
        }
    }

    async selectRecipe() {
        this.mWindow.setVisible(true);
    }

    // Take bar and turn it into a smithable item
    async smith(itemName) {
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        const item = await getItemClass(itemName, this.scene.dashboard);

        const indices = item.bars.map((bar) => ({
            value: inv.getInventoryIndex(bar.name),
            count: bar.count,
        }));
        const allExist = indices.every(
            (index) =>
                index.value >= 0 && inv.inventory[index.value].numItems >= index.count
        );

        // All ingredients are in inventory
        if (allExist) {
            const added = inv.addToInventory(item, true);

            // Inventory has space, reduce bar count by the required amount
            if (added) {
                indices.forEach((index) => {
                    const obj = inv.inventory[index.value];
                    obj.setNumItems(obj.numItems - index.count);
                });

                // Log click for stats
                this.scene.stats.updateClickedTargetStat();
                characterData.addSkillXp("smithing", item.xp);
                this.scene.enemyKilled(item.questName);

                // Show smith animation
                this.scene.scene.get(CONSTANTS.SCENES.ANIMATION).clickAnimation({
                    imageName: "hammer-hand",
                    startX: 100,
                    startY: 100,
                    scale: 0.8,
                    curve: 0,
                    alpha: 1,
                    flipx: false,
                });
            }
        } else {
            chat.writeText(item.smithingErrorMessage);
        }
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
