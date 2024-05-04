import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { getItemClass } from "../utilities.js";
import { Button } from "../ui/button.js";

export class SawmillOperator extends ClickableObject {
    name = "Sawmill Operator";
    examineText = "He changes the shape of wood.";
    varName = "plank";
    actions = [
        { text: "Buy planks", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    validMaterialsToCostMap = { Logs: 100 };

    constructor(scene) {
        super();
        this.scene = scene;

        const cameraWidth = scene.cameras.main.width;
        const cameraHeight = scene.cameras.main.height;
        const width = 230;
        const height = 230;
        const x = cameraWidth / 2 - width;
        const y = cameraHeight / 2 - 100;

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
        const inv = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        // See if logs are selected
        const selectedIndex = inv.curSelectedItemIndex;
        const selectedItem = inv.inventory[selectedIndex];

        if (
            selectedIndex < 0 ||
            !selectedItem ||
            !this.validMaterialsToCostMap.hasOwnProperty(selectedItem.name)
        ) {
            chat.writeText("Select some logs in your inventory first.");
            return;
        }

        // check if player has enough gp to cover conversion cost
        const cost = this.validMaterialsToCostMap[selectedItem.name];
        if (inv.getGold() < cost) {
            chat.writeText("You need " + cost + " gold to convert the selected logs.");
            return;
        }

        const plankName = selectedItem.type + "Plank";

        const plank = await getItemClass(plankName, this.scene.dashboard);
        const added = inv.addToInventory(plank, true);

        if (added) {
            selectedItem.setNumItems(selectedItem.numItems - 1);

            inv.addGold(-1 * cost);

            // Log click for stats
            this.scene.stats.updateClickedTargetStat();
            this.scene.enemyKilled("plank");

            this.scene.scene.get(CONSTANTS.SCENES.ANIMATION).purchaseAnimation(cost);
        } else {
            chat.writeText(
                "You do not have room in your inventory to create this plank."
            );
        }
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
    }
}
