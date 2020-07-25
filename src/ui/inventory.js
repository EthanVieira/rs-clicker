import { CONSTANTS, FONTS } from "../constants/constants.js";
import { getItemClass } from "../utilities.js";

export class Inventory {
    scene;
    menu;
    playerItems = []; // Pointer to cookies, store item name/type/count
    inventory = []; // Images
    curSelectedItemIndex = -1;

    constructor(scene, inventory) {
        this.scene = scene;
        this.playerItems = inventory;

        // Update and show inventory on startup
        this.refreshInventory();
    }

    // Load inventory on startup
    async refreshInventory() {
        for (let index = 0; index < this.playerItems.length; index++) {
            let item = this.playerItems[index];
            if (Object.keys(item).length) {
                // Create item from name
                let itemObj = await getItemClass(item.item, item.type, this.scene);
                itemObj.setNumItems(item.count);
                this.addToInventoryAtIndex(itemObj, index);
            }
        }
    }

    // Add to specific index
    addToInventoryAtIndex(item, index, createSprite = true) {
        // Add to saved data
        this.playerItems[index] = {
            item: item.item,
            type: item.type,
            count: item.numItems,
        };

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
        // Check all slots to see if the item can stack
        for (let index = 0; index < this.playerItems.length; index++) {
            const itemExists = Object.keys(this.playerItems[index]).length;

            // Check if it can stack with other items
            if (
                itemExists &&
                item.stackable &&
                this.playerItems[index].item == item.item &&
                this.playerItems[index].type == item.type
            ) {
                let curItem = this.inventory[index];

                // Update the item in the game
                curItem.setNumItems(curItem.numItems + item.numItems);

                // Update it in the cookies
                this.playerItems[index].count += item.numItems;

                return true;
            }
        }

        // Search for empty slot
        for (let index = 0; index < this.playerItems.length; index++) {
            const itemExists = Object.keys(this.playerItems[index]).length;

            // Check if slot is empty
            if (!itemExists) {
                this.addToInventoryAtIndex(item, index, createSprite);
                return true;
            }
        }

        // Add to end
        if (this.playerItems.length < 28) {
            this.addToInventoryAtIndex(item, this.playerItems.length, createSprite);
            return true;
        } else {
            console.log("Inventory is full");
            return false;
        }
    }

    highlightItem(index) {
        if (index == this.curSelectedItemIndex) {
            this.curSelectedItemIndex = -1;
        } else {
            // Use this ugly method to see if obj is empty
            if (
                this.curSelectedItemIndex >= 0 &&
                Object.keys(this.inventory[this.curSelectedItemIndex]).length
            ) {
                this.inventory[this.curSelectedItemIndex].highlightItem();
            }
            this.curSelectedItemIndex = index;
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
