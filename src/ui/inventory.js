import { CONSTANTS, FONTS } from "../constants/constants.js";
import { getItemClass } from "../utilities.js";
import { characterData } from "../cookie-io.js";

export class Inventory {
    scene;
    menu;
    inventory = []; // Images
    curSelectedItemIndex = -1;

    constructor(scene) {
        this.scene = scene;

        // Update and show inventory on startup
        this.refreshInventory();
    }

    // Load inventory on startup
    async refreshInventory() {
        let playerItems = characterData.getInventory();
        for (let index = 0; index < playerItems.length; index++) {
            let item = playerItems[index];
            if (Object.keys(item).length) {
                // Create item from name
                let itemObj = await getItemClass(item.item, this.scene);
                itemObj.setNumItems(item.count);
                this.addToInventoryAtIndex(itemObj, index);
            }
        }
    }

    // Add to specific index
    addToInventoryAtIndex(item, index, createSprite = true) {
        // Add to saved data
        characterData.setInventory(index, {
            item: item.constructor.name,
            count: item.numItems,
        });

        // Add item images
        const column = index % 4;
        const row = Math.floor(index / 4);
        const x = 570 + column * 45;
        const y = 225 + row * 35;

        // Draw sprite or move it if it already exists
        if (createSprite) {
            item.createSprite(x, y, index);
        } else {
            item.move(x, y, index);
        }

        // Hide if inventory is not selected
        let showItem = this.scene.currentPanel == CONSTANTS.PANEL.INVENTORY;
        item.setVisible(showItem);

        // Add object to the scene
        this.inventory[index] = item;
    }

    // Add to first available slot
    addToInventory(item, createSprite = true) {
        let playerItems = characterData.getInventory();

        // Check all slots to see if the item can stack
        for (let index = 0; index < playerItems.length; index++) {
            const itemExists = Object.keys(playerItems[index]).length;

            // Check if it can stack with other items
            if (
                itemExists &&
                item.stackable &&
                playerItems[index].item == item.constructor.name
            ) {
                let curItem = this.inventory[index];

                // Update the item in the game
                curItem.setNumItems(curItem.numItems + item.numItems);

                // Delete old item
                item.destroy();

                return true;
            }
        }

        // Search for empty slot
        for (let index = 0; index < playerItems.length; index++) {
            const itemExists = Object.keys(playerItems[index]).length;

            // Check if slot is empty
            if (!itemExists) {
                this.addToInventoryAtIndex(item, index, createSprite);
                return true;
            }
        }

        // Add to end
        if (playerItems.length < 28) {
            this.addToInventoryAtIndex(item, playerItems.length, createSprite);
            return true;
        } else {
            console.log("Inventory is full");
            return false;
        }
    }

    selectItem(index) {
        let item1 = this.inventory[this.curSelectedItemIndex];

        // Unselect item
        if (index == this.curSelectedItemIndex) {
            this.curSelectedItemIndex = -1;
        }
        // Select item
        else if (this.curSelectedItemIndex < 0 || !Object.keys(item1).length) {
            this.curSelectedItemIndex = index;
        }
        // Combine items
        else {
            let item2 = this.inventory[index];

            // Attempt to craft
            if (item1.canCraft) {
                item1.craft(item2);
            } else if (item2.canCraft) {
                item2.craft(item1);
            }
            this.curSelectedItemIndex = -1;
            item1.setHighlight(false);
            item2.setHighlight(false);
        }
    }

    showInventory(isVisible) {
        if (isVisible) {
            this.scene.currentPanel = CONSTANTS.PANEL.INVENTORY;
        }
        this.inventory.forEach((item) => {
            if (Object.keys(item).length) {
                item.setVisible(isVisible);
            }
        });
    }

    destroy() {
        this.inventory.forEach((item) => {
            if (Object.keys(item).length) {
                item.destroy(false);
            }
        });
    }
}
