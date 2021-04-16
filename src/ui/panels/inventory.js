import { CONSTANTS, FONTS } from "../../constants/constants.js";
import { getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";
import Coin from "../../items/currencies/coin.js";

export class Inventory {
    scene;
    menu;
    button;
    inventory = []; // Images
    curSelectedItemIndex = -1;

    constructor(scene) {
        this.scene = scene;
        this.stats = this.scene.scene.get(CONSTANTS.SCENES.STATS);

        // Create inventory button
        this.button = scene.add
            .image(626, 168, "inventory-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .setAlpha(0.1)
            .on("pointerdown", () => {
                this.scene.hideAllMenus();

                this.show(true);
                this.button.setAlpha(0.1);
            });

        // Update and show inventory on startup
        this.refreshInventory();

        // Show by default
        this.show();
    }

    // Load inventory on startup
    async refreshInventory() {
        let playerItems = characterData.getInventory();
        for (let i = 0; i < playerItems.length; i++) {
            let item = playerItems[i];
            if (Object.keys(item).length) {
                // Create item from name
                let itemObj = await getItemClass(item.item, this.scene);
                itemObj.setNumItems(item.count);
                this.addToInventoryAtIndex(itemObj, i);
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

    getInventoryIndex(itemName) {
        let playerItems = characterData.getInventory();
        for (let i = 0; i < playerItems.length; i++) {
            if (Object.keys(playerItems[i]).length && playerItems[i].item == itemName) {
                return i;
            }
        }

        return -1;
    }

    // Add to first available slot
    addToInventory(item, createSprite = true) {
        let playerItems = characterData.getInventory();

        // Check if it can stack with other items
        let i = this.getInventoryIndex(item.constructor.name);
        if (i >= 0 && item.stackable) {
            let curItem = this.inventory[i];

            // Update the item in the game
            curItem.setNumItems(curItem.numItems + item.numItems);
            if (curItem.constructor.name == "Coin") {
                const column = i % 4;
                const row = Math.floor(i / 4);
                const x = 570 + column * 45;
                const y = 225 + row * 35;
                curItem.createSprite(x, y, i);
            }

            // Delete old item
            item.destroy();

            return true;
        }

        // Search for empty slot
        for (let i = 0; i < playerItems.length; i++) {
            const itemExists = Object.keys(playerItems[i]).length;

            // Check if slot is empty
            if (!itemExists) {
                this.addToInventoryAtIndex(item, i, createSprite);
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

    addGold(amount) {
        let gold = new Coin(this.scene);
        gold.numItems = amount;
        this.addToInventory(gold);
        this.stats.updateTotalEarnedGold(amount);
    }

    getGold() {
        let playerItems = characterData.getInventory();
        for (let i = 0; i < playerItems.length; i++) {
            const itemExists = Object.keys(playerItems[i]).length;

            if (itemExists && playerItems[i].item == Coin.name) {
                return this.inventory[i].numItems;
            }
        }

        return 0;
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

    show(isVisible = true) {
        if (isVisible) {
            this.scene.currentPanel = CONSTANTS.PANEL.INVENTORY;
            this.button.setAlpha(0.1); // Unselected inventory icon
        } else {
            this.button.setAlpha(1); // Unselected inventory icon
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
