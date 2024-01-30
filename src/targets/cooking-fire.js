import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { calcLevel, getItemClass } from "../utilities.js";
import { Button } from "../ui/button.js";

export class CookingFire extends ClickableObject {
    name = "Cooking Fire";
    examineText = "Hot!";
    actions = [
        { text: "Cook", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    validRawMaterials = new Set(["Raw Shrimps", "Raw Anchovies"]);
    validCookedMaterials = new Set(["Shrimps", "Anchovies"]);

    constructor(scene) {
        super();
        this.scene = scene;

        const cameraWidth = scene.cameras.main.width;
        const cameraHeight = scene.cameras.main.height;
        const width = 230;
        const height = 150;
        const x = cameraWidth / 2 - width;
        const y = cameraHeight / 2;

        // Add invisible button for cooking fire
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

        // See if raw food is selected
        const selectedIndex = inv.curSelectedItemIndex;
        const selectedItem = inv.inventory[selectedIndex];

        if (
            selectedIndex < 0 ||
            !selectedItem ||
            (!this.validRawMaterials.has(selectedItem.name) &&
                !this.validCookedMaterials.has(selectedItem.name))
        ) {
            chat.writeText("Select an item to be cooked in your inventory first.");
            return;
        }

        let foodName = selectedItem.name;
        let cooked = false;

        if (this.validRawMaterials.has(selectedItem.name)) {
            const reqLevel = selectedItem.cookingLvl;
            const currentLevel = calcLevel(characterData.getSkillXp("cooking"));

            if (currentLevel < reqLevel) {
                chat.writeText(
                    "You do not have the required cooking level to cook this item."
                );
                return;
            }

            // calculate cook/burn rate
            // start at 50% success rate and uniformly increase
            // until the level where it can no longer be burned
            const initialRate = 0.5;

            const increasePerLevel = initialRate / (selectedItem.burnLvlLimit - reqLevel);

            const rate = Math.min(
                1,
                initialRate + increasePerLevel * (currentLevel - reqLevel)
            );

            cooked = rate >= Math.random();

            foodName = cooked
                ? foodName.replace("Raw ", "")
                : foodName.replace("Raw ", "Burnt");
        } else {
            foodName = "Burnt" + foodName;
        }

        const food = await getItemClass(foodName, this.scene.dashboard);
        const added = inv.addToInventory(food, true);

        if (added) {
            selectedItem.setNumItems(selectedItem.numItems - 1);

            // Log click for stats
            this.scene.stats.updateClickedTargetStat();
            if (cooked) {
                characterData.addSkillXp({ cooking: selectedItem.cookingXp });
                this.scene.enemyKilled(foodName.toLowerCase());
            }

            // Reuse furnace hands for animation
            this.scene.scene.get(CONSTANTS.SCENES.ANIMATION).clickAnimation({
                imageName: "furnace-hands",
                startX: 450,
                startY: 400,
                scale: 0.7,
                curve: 0,
                alpha: 1,
                flipx: false,
            });
        } else {
            chat.writeText("You do not have room in your inventory to cook this item.");
        }
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
