import { CONSTANTS, FONTS } from "../constants/constants.js";

export class Inventory {
    scene;
    menu;
    playerItems = []; // Text save data
    inventory = []; // Images
    curSelectedItemIndex = -1;

    constructor(scene, inventory) {
        this.scene = scene;
        this.playerItems = inventory;

        // Update and show inventory on startup
        for (let index = 0; index < this.playerItems.length; index++) {
            this.addToInventory(this.playerItems[index]);
        }
    }

    async addToInventory(item) {
        let index = await this.checkForEmptySlot();

        // Add items
        if (item != "" && this.inventory.length < 28) {
            // Repopulate on startup
            if (this.playerItems.length > this.inventory.length) {
                index = this.inventory.length;
            }
            // Add items into first empty slot
            else if (index >= 0) {
                this.playerItems[index] = item;
            }
            // Add new item to end
            else if (this.playerItems.length == this.inventory.length) {
                this.playerItems.push(item);
                index = this.inventory.length;
            }

            // Add item images
            let column = index % 4;
            let row = Math.floor(index / 4);
            let x = 570 + column * 45;
            let y = 225 + row * 35;

            let itemImage = this.scene.add
                .image(x, y, item)
                .setDepth(3)
                .setScale(0.2)
                .setInteractive()
                .on("pointerdown", pointer => {
                    if (pointer.rightButtonDown()) {
                        this.createRightClickMenu(x, y, item, index);
                    }
                    else {
                        this.useItem(index);
                    }
                });

            // Hide if inventory is not selected
            if (this.scene.currentPanel != CONSTANTS.PANEL.INVENTORY) {
                itemImage.visible = false;
            }

            this.inventory[index] = itemImage;
        }
        // Add blank
        else if (item == "") {
            this.inventory.push({});
        } else {
            console.log("Inventory is full");
        }
    }

    async checkForEmptySlot() {
        for (let index = 0; index < this.playerItems.length; index++) {
            if (this.playerItems[index] == "") {
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
        let useText = this.scene.add.text(x - 48, y - 30, "Use", FONTS.OPTIONS_MENU);
        let useItem = this.scene.add.text(x + 10, y - 30, item, FONTS.ITEM_NAME);
        let dropText = this.scene.add.text(x - 48, y - 15, "Drop", FONTS.OPTIONS_MENU);
        let dropItem = this.scene.add.text(x + 10, y - 15, item, FONTS.ITEM_NAME);
        let examineText = this.scene.add.text(x - 48, y, "Examine", FONTS.OPTIONS_MENU);
        let examineItem = this.scene.add.text(x + 10, y, item, FONTS.ITEM_NAME);
        let cancelText = this.scene.add
            .text(x - 48, y + 15, "Cancel", FONTS.OPTIONS_MENU)
            .setInteractive()
            .on("pointerdown", () => {
                console.log("cancel");
                this.menu.destroy();
            });

        // Group option text and item name
        // Containers put handler for events on text and item name together
        let useContainer = this.scene.add
            .container(0, 0, [useText, useItem])
            .setInteractive(
                new Phaser.Geom.Rectangle(useText.x, useText.y, menuBox.width - 20, 12),
                Phaser.Geom.Rectangle.Contains
            )
            .on("pointerdown", () => {
                this.useItem(index);
                this.menu.destroy();
            });
        let dropContainer = this.scene.add
            .container(0, 0, [dropText, dropItem])
            .setInteractive(
                new Phaser.Geom.Rectangle(dropText.x, dropText.y, menuBox.width - 20, 12),
                Phaser.Geom.Rectangle.Contains
            )
            .on("pointerdown", () => {
                console.log("drop");
                this.dropItem(index, item);
                this.menu.destroy();
            });
        let examineContainer = this.scene.add
            .container(0, 0, [examineText, examineItem])
            .setInteractive(
                new Phaser.Geom.Rectangle(
                    examineText.x,
                    examineText.y,
                    menuBox.width - 20,
                    12
                ),
                Phaser.Geom.Rectangle.Contains
            )
            .on("pointerdown", () => {
                console.log("examine", item);
                this.menu.destroy();
            });

        // Group objects together
        this.menu = this.scene.add
            .container(0, 0, [
                menuBox,
                useContainer,
                dropContainer,
                examineContainer,
                cancelText
            ])
            .setDepth(5);
    }

    dropItem(index, item) {
        // Remove item
        this.playerItems[index] = "";
        this.inventory[index].destroy();
        this.inventory[index] = {};
    }

    useItem(index) {
        // Same item clicked twice, reset
        if (index == this.curSelectedItemIndex) {
            this.inventory[index].setAlpha(1);
            this.curSelectedItemIndex = -1;
        }
        // Reset previously used item
        else {
            // Use this ugly method to see if obj is empty
            if (this.curSelectedItemIndex >= 0 && Object.keys(this.inventory[this.curSelectedItemIndex]).length) {
                this.inventory[this.curSelectedItemIndex].setAlpha(1);
            }

            // Set new item as semi-transparent
            this.inventory[index].setAlpha(.5);
            this.curSelectedItemIndex = index;
        }
    }

    showInventory(isVisible) {
        if (isVisible) {
            this.scene.currentPanel = CONSTANTS.PANEL.INVENTORY;
        }
        this.inventory.forEach(item => {
            item.visible = isVisible;
        });
    }
}
