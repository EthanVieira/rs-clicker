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

    validMaterials = new Set(["Copper Ore", "Tin Ore"]);

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

        // See if ore is selected
        const selectedIndex = inv.curSelectedItemIndex;
        const selectedItem = inv.inventory[selectedIndex];

        if (
            selectedIndex < 0 ||
            !selectedItem ||
            !this.validMaterials.has(selectedItem.name)
        ) {
            chat.writeText("Select an ore in your inventory first.");
            return;
        }

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
        const bar = await getItemClass(barName, this.scene.dashboard);

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
                characterData.addSkillXp({ smithing: bar.xp });
                this.scene.enemyKilled("bar");

                // Show smelt animation
                this.scene.scene.get(CONSTANTS.SCENES.ANIMATION).clickAnimation({
                    imageName: "furnace-hands",
                    startX: 450,
                    startY: 400,
                    scale: 0.7,
                    curve: 0,
                    alpha: 1,
                    flipx: false,
                });
            }
        } else {
            chat.writeText(bar.smeltingErrorMessage);
        }
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
