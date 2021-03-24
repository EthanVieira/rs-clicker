import { ClickableObject } from "../clickable-object.js";
import { OBJECT_TYPES, CONSTANTS } from "../constants/constants.js";
import { itemManifest } from "./item-manifest.js";
import { getItemClass } from "../utilities.js";
import { characterData } from "../cookie-io.js";

export class Item extends ClickableObject {
    // Text data
    name = "";
    item = "";
    type = "";
    examineText = "";
    objectType = OBJECT_TYPES.ITEM;

    // Inventory location
    index = -1;
    x = 0;
    y = 0;
    selected = false;
    stackable = true;
    numItems = 1;

    // Objects
    sprite;
    numItemsText;
    scene;

    // Others
    scale = 1;
    displayHeight = 0;
    cost = 0;
    actions = [
        { text: "Use", func: "use" },
        { text: "Sell", func: "sell" },
        { text: "Examine", func: "examine" },
    ];

    createSprite(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.index = index;

        this.sprite = this.scene.add
            .image(x, y, itemManifest[this.constructor.name].imageName)
            .setScale(this.scale)
            .setDepth(4)
            .setInteractive()
            .on("pointerdown", (pointer) => {
                if (pointer.rightButtonDown()) {
                    this.createRightClickMenu(pointer.x, pointer.y, this.actions);
                } else {
                    this.leftClick();
                }
            });
        this.displayHeight = this.sprite.displayHeight;

        // Add text in top left for stackable items
        this.numItemsText = this.scene.add
            .text(x - 15, y - 15, this.numItems, {
                font: "10px runescape",
                fill: "orange",
            })
            .setDepth(5);

        // Hide unless item is stacked
        if (this.numItems <= 1) {
            this.numItemsText.visible = false;
        }
    }

    // Need offset for where scroll window is placed as coordinates are relative
    createShopSprite(offsetX, offsetY) {
        let shopActions = [{ text: "Buy", func: "buy" }];

        this.sprite = this.scene.add
            .image(0, 0, itemManifest[this.constructor.name].imageName + "-model")
            .setScale(this.scale / 2)
            .setDepth(4)
            .setInteractive()
            .setOrigin(0, 0)
            .on("pointerover", () => {
                this.examine(true);
            })
            .on("pointerout", () => {
                if (this.chat != undefined) {
                    this.chat.showObjectInfo(false);
                }
            })
            .on("pointerdown", (pointer) => {
                this.createRightClickMenu(
                    pointer.x - offsetX,
                    pointer.y - offsetY,
                    shopActions
                );
            });
        this.displayHeight = this.sprite.displayHeight;
    }

    async buy() {
        if (characterData.getGold() >= this.cost) {
            console.log("Buying", this.name);
            let dashboard = this.scene.scene.get(CONSTANTS.SCENES.DASHBOARD);

            // Create new non-shop item
            let boughtItem = await getItemClass(this.constructor.name, dashboard);
            if (dashboard.inventory.obj.addToInventory(boughtItem)) {
                characterData.addGold(-1 * this.cost);
            }
        } else {
            console.log("not enough mulah", characterData.getGold(), this.cost);
        }
    }

    // Toggle highlighting on use
    highlightItem() {
        this.setHighlight(!this.selected);

        // Un-highlight prev item
        this.scene.inventory.obj.selectItem(this.index);
    }

    setHighlight(isSelected) {
        this.selected = isSelected;
        if (isSelected) {
            this.sprite.setAlpha(0.5);
        } else {
            this.sprite.setAlpha(1);
        }
    }

    sell() {
        console.log("Sell", this.name);
        charcterData.addGold(1 * this.cost);
        this.destroy();
    }

    move(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.index = index;
    }

    setNumItems(num) {
        if (num <= 0) {
            this.destroy();
        } else {
            this.numItems = num;

            // Update saved data
            characterData.setInventory(this.index, {
                item: this.constructor.name,
                count: this.numItems,
            });

            // Update text
            if (this.numItemsText != undefined) {
                let visualNum = "0";
                let fillColor = "";

                // Set format/color based on the amount
                switch (true) {
                    case num < 99999:
                        visualNum = num;
                        fillColor = "orange";
                        break;
                    case num < 9999999:
                        visualNum = (num / 1000).toFixed(1) + "k";
                        fillColor = "white";
                        break;
                    default:
                        visualNum = (num / 1000000).toFixed(1) + "m";
                        fillColor = "green";
                        break;
                }

                // Can't change text while in different scene (like the shop)
                if (this.scene.scene.isActive()) {
                    this.numItemsText.text = visualNum;
                    this.numItemsText.setFill(fillColor);
                }

                // Make visible if item is also visible
                if (num <= 1) {
                    this.numItemsText.visible = false;
                } else if (this.sprite.visible) {
                    this.numItemsText.visible = true;
                }
            }
        }
    }

    setVisible(isVisible) {
        if (this.sprite != undefined && this.sprite != null) {
            this.sprite.visible = isVisible;
        }

        // Show/hide if stacked
        if (this.numItems > 1) {
            this.numItemsText.visible = isVisible;
        }
    }

    // When clearing objects between scenes we don't want to delete cookies
    destroy(deleteCookies = true) {
        // Remove from inventory
        if (deleteCookies && this.index >= 0) {
            characterData.setInventory(this.index, "");
        }

        // Destroy objects
        if (this.sprite != undefined && this.sprite != null) {
            this.sprite.destroy();
        }
        if (this.numItemsText != undefined && this.numItemsText != null) {
            this.numItemsText.destroy();
        }
        this.name = "";
    }
}
