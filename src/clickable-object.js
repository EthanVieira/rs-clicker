import { CONSTANTS, FONTS, SCREEN } from "./constants/constants.js";

export class ClickableObject {
    // Basic info
    examineText = "";

    // Objects
    scene;
    chat;

    // Right click actions
    actions = [{ text: "Examine", func: "examine" }];

    // Right click menu half-dimensions in pixels
    RCM_HALF_WIDTH = 163 / 2;
    RCM_HALF_HEIGHTS = [53 / 2, 68 / 2, 82 / 2, 97 / 2]; // 2-5 options including cancel

    examine(isShop) {
        console.log(this.examineText);
        // Get chat scene
        if (this.chat == undefined) {
            this.chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        }
        this.chat.showObjectInfo(true, this, isShop);
    }

    createRightClickMenu(x, y, actions) {
        let menu = this.scene.add.container(0, 0).setDepth(5);

        let numActions = actions.length; // not including cancel
        let halfHeight = this.RCM_HALF_HEIGHTS[numActions - 1];

        y += halfHeight;

        // Ensure the menu doesn't go off screen
        if (x + this.RCM_HALF_WIDTH > SCREEN.WIDTH) {
            x = SCREEN.WIDTH - this.RCM_HALF_WIDTH;
        } else if (x - this.RCM_HALF_WIDTH < 0) {
            x = this.RCM_HALF_WIDTH;
        }

        if (y + 2 * halfHeight > SCREEN.HEIGHT) {
            y = SCREEN.HEIGHT - 2 * halfHeight;
        } else if (y < 0) {
            y = 0;
        }
        let menuBox = this.scene.add
            .image(x, y, "right-click-menu-" + (numActions + 1).toString())
            .setDepth(6)
            .setInteractive()
            .on("pointerout", (pointer) => {
                if (
                    pointer.worldX > x + this.RCM_HALF_WIDTH ||
                    pointer.worldY > y + halfHeight ||
                    pointer.worldX < x - this.RCM_HALF_WIDTH ||
                    pointer.worldY < y - 10 // buffer
                ) {
                    menu.destroy();
                }
            })
            .on("pointerdown", () => {
                menu.destroy();
            });

        // Add text options
        // Have to use two separate texts per option for different colors
        menu.add(menuBox);
        let optionsY = 20 + (y - menuBox.height / 2);

        // Generate dynamic list of actions (wield, bury, etc.)
        actions.forEach((action) => {
            let itemText = this.scene.add.text(
                x - 20,
                optionsY,
                this.name,
                FONTS.ITEM_NAME
            );
            let actionText = this.scene.add
                .text(x - 78, optionsY, action.text, FONTS.OPTIONS_MENU)
                .setInteractive()
                .setDepth(6)
                .on("pointerdown", () => {
                    this[action.func]();
                    menu.destroy();
                });

            menu.add(actionText);
            menu.add(itemText);
            optionsY += 15;
        });

        let cancelText = this.scene.add
            .text(x - 78, optionsY, "Cancel", FONTS.OPTIONS_MENU)
            .setInteractive()
            .setDepth(6)
            .on("pointerdown", () => {
                menu.destroy();
            });
        menu.add(cancelText);
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
