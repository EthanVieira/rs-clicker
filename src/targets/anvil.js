import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { calcLevel } from "../utilities.js";
import { Button } from "../ui/button.js";
import { getItemClass } from "../utilities.js";
import { SmithingModalWindow } from "../ui/modals/smithing-modal-window.js";

export class Anvil extends ClickableObject {
    name = "Anvil";
    examineText = "Used for fashioning metal items.";
    actions = [
        { text: "Forge", func: "clickTarget" },
        { text: "Choose", func: "selectRecipe" },
        { text: "Examine", func: "examine" },
    ];

    isStaticTarget = true;

    validMaterials = new Set();
    modalWindow;

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
            if (
                pointer.rightButtonDown() &&
                !pointer.leftButtonDown() &&
                !this.modalWindow.visible
            ) {
                this.createRightClickMenu(pointer.x, pointer.y, this.actions);
            } else {
                this.clickTarget();
            }
        });

        //Create modal window
        this.modalWindow = new SmithingModalWindow(this.scene);
        this.validMaterials.add("Bronze Bar");
        this.validMaterials.add("Iron Bar");
    }

    async clickTarget() {
        if (this.modalWindow.visible) {
            return;
        }

        const currentRecipe = this.modalWindow.getChoice();

        if (currentRecipe != "None") {
            this.smith(currentRecipe);
        } else {
            this.selectRecipe();
        }
    }

    hasMaterials() {
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        // See if bar is selected
        const selectedIndex = inv.curSelectedItemIndex;
        const selectedItem = inv.inventory[selectedIndex];

        if (
            selectedIndex < 0 ||
            !selectedItem ||
            !this.validMaterials.has(selectedItem.name)
        ) {
            chat.writeText("Select a bar in your inventory first.");
            return false;
        }

        const hasHammer = inv.getInventoryIndex("Hammer");

        if (hasHammer < 0) {
            chat.writeText("You need a hammer to work the metal with.");
            return false;
        }

        return true;
    }

    selectRecipe(itemName) {
        if (!this.hasMaterials()) {
            return;
        }

        const inv = this.scene.dashboard.inventory;
        const selectedIndex = inv.curSelectedItemIndex;

        const selectedItem = inv.inventory[selectedIndex];
        const smithingExp = characterData.getSkills().smithing;
        const smithingLevel = calcLevel(smithingExp);

        this.modalWindow.setChoices(
            selectedItem.name,
            selectedItem.numItems,
            smithingLevel
        );
        this.modalWindow.setVisible(true);
    }

    // Take bar and turn it into a smithable item
    async smith(itemName) {
        if (!this.hasMaterials()) {
            return;
        }

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
                characterData.addSkillXp({ smithing: item.xp });
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
