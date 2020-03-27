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
        this.playerItems.forEach(item => {
            // Add blanks
            if (!Object.keys(item).length) {
                this.addToInventory({});
            }
            // Add items
            else {
                let itemObj = getItemClass(item.name, item.material, this.scene);
                this.addToInventory(itemObj);
            }
        });
    }

    async addToInventory(item) {
        let index = await this.checkForEmptySlot();

        // Add items
        if (Object.keys(item).length && (this.inventory.length < 28 || index >= 0)) {
            // Repopulate on startup
            if (this.playerItems.length > this.inventory.length) {
                index = this.inventory.length;
            }
            // Add items into first empty slot
            else if (index >= 0) {
                this.playerItems[index] = {
                    name: item.item, 
                    material: item.material
                };
            }
            // Add new item to end
            else if (this.playerItems.length == this.inventory.length) {
                this.playerItems.push({
                    name: item.item, 
                    material: item.material
                }); 
                index = this.inventory.length;
            }

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

            this.inventory[index] = item;
        } else if (this.inventory.length < 28) {
            this.inventory.push({});
        } else {
            console.log("Inventory is full");
        }
    }

    async checkForEmptySlot() {
        for (let index = 0; index < this.playerItems.length; index++) {
            if (!Object.keys(this.playerItems[index]).length) {
                return index;
            }
        }
        return -1;
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
        // Have to use two separate texts per option for different clors
        let options = [menuBox];
        let optionsY = y -45;

        // Generate dynamic list of actions (use, wield, bury, etc.)
        item.actions.forEach(action => {
            optionsY += 15;
            let itemText = this.scene.add.text(x + 10, optionsY, item.name, FONTS.ITEM_NAME);
            let actionText = this.scene.add.text(x - 48, optionsY, action, FONTS.OPTIONS_MENU)
                .setInteractive()
                .setDepth(5)
                .on("pointerdown", () => {
                    item[action]();
                    this.menu.destroy();
                });

            options.push(actionText);
            options.push(itemText);
        });

        // All items have drop, examine, cancel
        let dropItem = this.scene.add.text(x + 10, optionsY + 15, item.name, FONTS.ITEM_NAME);
        let dropText = this.scene.add.text(x - 48, optionsY + 15, "Drop", FONTS.OPTIONS_MENU)
            .setInteractive()
            .on("pointerdown", () => {
                    item.drop();
                    this.menu.destroy();
                });
        options.push(dropItem);
        options.push(dropText);
            
        let examineItem = this.scene.add.text(x + 10, optionsY + 30, item.name, FONTS.ITEM_NAME);
        let examineText = this.scene.add.text(x - 48, optionsY + 30, "Examine", FONTS.OPTIONS_MENU)
            .setInteractive()
            .on("pointerdown", () => {
                item.examine();
                this.menu.destroy();
            });
        options.push(examineItem);
        options.push(examineText);

        let cancelText = this.scene.add
            .text(x - 48, optionsY + 45, "Cancel", FONTS.OPTIONS_MENU)
            .setInteractive()
            .on("pointerdown", () => {
                console.log("cancel");
                this.menu.destroy();
            });
        options.push(cancelText);

        // Group objects together
        this.menu = this.scene.add
            .container(0, 0, options)
            .setDepth(5);
    }

    highlightItem(index) {
        if (index == this.curSelectedItemIndex) {
            this.curSelectedItemIndex = -1;
        }
        else {
            // Use this ugly method to see if obj is empty
            if (this.curSelectedItemIndex >= 0 && Object.keys(this.inventory[this.curSelectedItemIndex]).length) {
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
