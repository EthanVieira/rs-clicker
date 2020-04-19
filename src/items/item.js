import { itemManifest } from "./item-manifest.js";
import { FONTS } from "../constants/constants.js";

export async function getItemClass(itemName, type, scene) {
    //console.log(itemName, type);
    let path = itemManifest[type + itemName].classPath;
    //console.log(path);
    let itemClass = await import(path);

    return new itemClass.default(scene);
}

export class Item {
    // Text data
    name = "";
    item = "";
    type = "";
    examineText = "";

    // Inventory location
    index = -1;
    x = 0;
    y = 0;
    selected = false;

    // Objects
    sprite;
    menu;
    scene;

    // Others
    scale = 1;
    cost = 0;
    actions = [
        { text: "Use", func: "use" },
        { text: "Drop", func: "drop" },
        { text: "Examine", func: "examine" }
    ];

    createSprite(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.index = index;

        this.sprite = this.scene.add
            .image(x, y, itemManifest[this.type + this.item].imageName)
            .setScale(this.scale)
            .setDepth(4)
            .setInteractive()
            .on("pointerdown", pointer => {
                if (pointer.rightButtonDown()) {
                    this.createRightClickMenu();
                } else {
                    this.leftClick();
                }
            });
    }

    // Toggle highlighting on use
    highlightItem() {
        if (this.selected) {
            this.sprite.setAlpha(1);
        } else {
            this.sprite.setAlpha(0.5);
        }
        this.selected = !this.selected;

        // Un-highlight prev item
        this.scene.inventory.obj.highlightItem(this.index);
    }

    drop() {
        console.log("Drop", this.name);
        this.destroy();
    }

    examine() {
        console.log(this.examineText);
    }

    createRightClickMenu() {
        let menuBox = this.scene.add
            .image(this.x, this.y, "right-click-menu")
            .setDepth(4)
            .setInteractive()
            .on("pointerout", pointer => {
                // Check to ensure it doesn't trigger when hovering over text options
                if (
                    pointer.worldX > this.x + menuBox.width / 2 ||
                    pointer.worldY > this.y + menuBox.height / 2 ||
                    pointer.worldX < this.x - menuBox.width / 2 ||
                    pointer.worldY < this.y - menuBox.height / 2
                ) {
                    this.menu.destroy();
                }
            });

        // Add text options
        // Have to use two separate texts per option for different colors
        let options = [menuBox];
        let optionsY = this.y - 45;

        // Generate dynamic list of actions (wield, bury, etc.)
        this.actions.forEach(action => {
            optionsY += 15;
            let itemText = this.scene.add.text(
                this.x + 10,
                optionsY,
                this.name,
                FONTS.ITEM_NAME
            );
            let actionText = this.scene.add
                .text(this.x - 48, optionsY, action.text, FONTS.OPTIONS_MENU)
                .setInteractive()
                .setDepth(5)
                .on("pointerdown", () => {
                    this[action.func]();
                    this.menu.destroy();
                });

            options.push(actionText);
            options.push(itemText);
        });

        let cancelText = this.scene.add
            .text(this.x - 48, optionsY + 15, "Cancel", FONTS.OPTIONS_MENU)
            .setInteractive()
            .on("pointerdown", () => {
                console.log("cancel");
                this.menu.destroy();
            });
        options.push(cancelText);

        // Group objects together
        this.menu = this.scene.add.container(0, 0, options).setDepth(5);
    }

    move(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.index = index;
    }

    show(isVisible) {
        this.sprite.visible = isVisible;
    }

    destroy() {
        this.scene.characterData.inventory[this.index] = "";
        this.sprite.destroy();
        this.name = "";
    }
}
