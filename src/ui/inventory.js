import { CONSTANTS, FONTS } from "../constants/constants.js";
import { getItemClass } from "../items/item.js";

export class Inventory {
    scene;
    menu;
    playerItems = []; // Pointer to cookies, store item name/material
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
                let itemObj = await getItemClass(item.name, item.material, this.scene);
                this.addToInventoryAtIndex(itemObj, index);
            }
        }
    }

    // Add to specific index
    addToInventoryAtIndex(item, index) {
        // Add to saved data
        this.playerItems[index] = {
            name: item.item,
            material: item.material
        };

        // Add item images
        let column = index % 4;
        let row = Math.floor(index / 4);
        let x = 570 + column * 45;
        let y = 225 + row * 35;
        item.addToInventory(x, y, index);

        // Hide if inventory is not selected
        if (this.scene.currentPanel != CONSTANTS.PANEL.INVENTORY) {
            item.show(false);
        }

        // Add object to the scene
        this.inventory[index] = item;
    }

    // Add to first available slot
    addToInventory(item) {
        // Search for empty slot
        for (let index = 0; index < this.playerItems.length; index++) {
            // Check if object exists
            if (!Object.keys(this.playerItems[index]).length) {
                this.addToInventoryAtIndex(item, index);
                return;
            }
        }
        // Add to end
        if (this.playerItems.length < 28) {
            this.addToInventoryAtIndex(item, this.playerItems.length);
        } else {
            console.log("Inventory is full");
        }
    }

    createRightClickMenu(x, y, item, index) {
        let menuBox = this.scene.add
            .image(x, y, "right-click-menu")
            .setDepth(4)
            .setInteractive()
            .on("pointerout", pointer => {
                // Check to ensure it doesn't trigger when hovering over text options
                if (
                    pointer.worldX > x + menuBox.width / 2 ||
                    pointer.worldY > y + menuBox.height / 2 ||
                    pointer.worldX < x - menuBox.width / 2 ||
                    pointer.worldY < y - menuBox.height / 2
                ) {
                    this.menu.destroy();
                }
            });

        // Add text options
        // Have to use two separate texts per option for different colors
        let options = [menuBox];
        let optionsY = y - 45;

        // Generate dynamic list of actions (wield, bury, etc.)
        item.actions.forEach(action => {
            optionsY += 15;
            let itemText = this.scene.add.text(
                x + 10,
                optionsY,
                item.name,
                FONTS.ITEM_NAME
            );
            let actionText = this.scene.add
                .text(x - 48, optionsY, action.text, FONTS.OPTIONS_MENU)
                .setInteractive()
                .setDepth(5)
                .on("pointerdown", () => {
                    item[action.func]();
                    this.menu.destroy();
                });

            options.push(actionText);
            options.push(itemText);
        });

        let cancelText = this.scene.add
            .text(x - 48, optionsY + 15, "Cancel", FONTS.OPTIONS_MENU)
            .setInteractive()
            .on("pointerdown", () => {
                console.log("cancel");
                this.menu.destroy();
            });
        options.push(cancelText);

        // Group objects together
        this.menu = this.scene.add.container(0, 0, options).setDepth(5);
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
        this.inventory.forEach(item => {
            if (Object.keys(item).length) {
                item.show(isVisible);
            }
        });
    }
}
