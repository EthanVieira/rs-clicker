import { CONSTANTS, FONTS } from "./constants/constants.js";

export class ClickableObject {
    // Basic info
    examineText = "";

    // Objects
    menu;
    scene;
    chat;

    // Right click actions
    actions = [{ text: "Examine", func: "examine" }];

    examine(isShop) {
        console.log(this.examineText);
        // Get chat scene
        if (this.chat == undefined) {
            this.chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        }
        this.chat.showObjectInfo(true, this, isShop);
    }

    createRightClickMenu(x, y, actions) {
        let menuBox = this.scene.add
            .image(x, y, "right-click-menu")
            .setDepth(4)
            .setInteractive()
            .on("pointerout", (pointer) => {
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

        // Get chat scene
        if (this.chat == undefined) {
            this.chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        }

        // Show stats menu until right click menu is destroyed
        menuBox.on("destroy", () => {
            this.chat.showObjectInfo(false);
        });

        // Add text options
        // Have to use two separate texts per option for different colors
        let options = [menuBox];
        let optionsY = y - 45;

        // Generate dynamic list of actions (wield, bury, etc.)
        actions.forEach((action) => {
            optionsY += 15;
            let itemText = this.scene.add.text(
                x - 20,
                optionsY,
                this.name,
                FONTS.ITEM_NAME
            );
            let actionText = this.scene.add
                .text(x - 78, optionsY, action.text, FONTS.OPTIONS_MENU)
                .setInteractive()
                .setDepth(5)
                .on("pointerdown", () => {
                    this[action.func]();

                    // Keep menu up when examining
                    if (action.text != "Examine") {
                        this.menu.destroy();
                    }
                });

            options.push(actionText);
            options.push(itemText);
        });

        let cancelText = this.scene.add
            .text(x - 78, optionsY + 15, "Cancel", FONTS.OPTIONS_MENU)
            .setInteractive()
            .on("pointerdown", () => {
                console.log("cancel");
                this.menu.destroy();
            });
        options.push(cancelText);

        // Group objects together
        this.menu = this.scene.add.container(0, 0, options).setDepth(5);
    }

    // Implement getters/setters so it can match the Phaser game object class
    setX(x) {
        this.x = x;
        if (this.sprite != undefined && this.sprite != null) {
            this.sprite.x = x;
        }
    }

    setY(y) {
        this.y = y;
        if (this.sprite != undefined && this.sprite != null) {
            this.sprite.y = y;
        }
    }

    setVisible(isVisible) {
        if (this.sprite != undefined && this.sprite != null) {
            this.sprite.visible = isVisible;
        }
    }
}
