import { ClickableObject } from "../../clickable-object.js";
import { CONSTANTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";
import { getItemClass, aOrAn } from "../../utilities.js";
import { Button } from "../../ui/button.js";

export class RunecraftingAltar extends ClickableObject {
    name = "Altar";
    examineText = "A mysterious power emanates from this shrine.";
    actions = [
        { text: "Craft-rune", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    isStaticTarget = true;

    requiredLevel = 1;
    needsPureEssence = false;
    numRunesPerEssenceLvlThreshold = 100;
    altarType = "";
    runecraftingXp = 0;

    validEssence = new Set(["Rune Essence", "Pure Essence"]);

    constructor(data) {
        super();
        this.scene = data.scene;
        this.name = data.name;
        this.questName = data.questName;
        this.altarType = data.altarType;
        this.needsPureEssence = data.needsPureEssence;
        this.numRunesPerEssenceLvlThreshold = data.numRunesPerEssenceLvlThreshold;
        this.requiredLevel = data.requiredLevel;
        this.runecraftingXp = data.runecraftingXp;

        const cameraWidth = this.scene.cameras.main.width;
        const cameraHeight = this.scene.cameras.main.height;
        const width = 230;
        const height = 230;
        const x = cameraWidth / 2 - width;
        const y = cameraHeight / 2;

        // Add invisible button for altar
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

        // check for talisman
        const talismanName = this.altarType + "Talisman";

        if (inv.getInventoryIndex(talismanName) < 0) {
            chat.writeText(
                "You must have " +
                    aOrAn(this.altarType) +
                    " " +
                    this.altarType +
                    " Talisman in your inventory to use this altar."
            );
            return;
        }

        // See if essence is selected
        const selectedIndex = inv.curSelectedItemIndex;
        const selectedItem = inv.inventory[selectedIndex];

        if (
            selectedIndex < 0 ||
            !selectedItem ||
            !this.validEssence.has(selectedItem.name)
        ) {
            chat.writeText("Select essence to be crafted in your inventory first.");
            return;
        }

        const currentLevel = characterData.getLevel("runecrafting");

        if (currentLevel < this.requiredLevel) {
            chat.writeText(
                "You do not have the required runecrafting level to use the altar."
            );
            return;
        }

        const essenceType = selectedItem.name;

        if (this.needsPureEssence && essenceType == "Rune Essence") {
            chat.writeText("This altar requires pure essence.");
            return;
        }

        const numRunesPerEssence =
            1 + Math.floor(currentLevel / this.numRunesPerEssenceLvlThreshold);
        const runeName = this.altarType + "Rune";

        const rune = await getItemClass(runeName, this.scene.dashboard);
        const added = inv.addNToInventory(rune, numRunesPerEssence);

        if (added) {
            selectedItem.setNumItems(selectedItem.numItems - 1);

            // Log click for stats
            this.scene.stats.updateClickedTargetStat();
            characterData.addSkillXp({ runecrafting: this.runecraftingXp });
            this.scene.enemyKilled(this.questName);

            this.scene.scene.get(CONSTANTS.SCENES.ANIMATION).clickAnimation({
                imageName: this.altarType.toLowerCase() + "-talisman-model",
                startX: 450,
                startY: 400,
                scale: 0.4,
                curve: 0,
                alpha: 1,
                flipx: false,
            });
        } else {
            chat.writeText("You do not have room in your inventory to craft this rune.");
        }
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
