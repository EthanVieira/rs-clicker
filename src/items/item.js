import { ClickableObject } from "../clickable-object.js";
import { OBJECT_TYPES, CONSTANTS } from "../constants/constants.js";
import { itemManifest } from "./item-manifest.js";
import { getItemClass, getItemText, getGoldStackType } from "../utilities.js";
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
    sprite = null;
    numItemsText;
    scene;

    // Others
    scale = 1;
    displayHeight = 0;
    cost = 0;
    actions = [
        { text: "Use", func: "use" },
        { text: "Sell X", func: "promptSellX" },
        { text: "Sell All", func: "sellAll" },
        { text: "Examine", func: "examine" },
    ];

    isVisible = false;

    createSprite(x, y, index = -1) {
        this.x = x;
        this.y = y;
        this.index = index;

        if (this.sprite != null) {
            this.sprite.destroy();
            this.numItemsText.destroy();
        }

        const spritePath =
            this.name == "Coin"
                ? getGoldStackType(this.numItems) + "-stack"
                : itemManifest[this.constructor.name].imageName;

        this.sprite = this.scene.add
            .image(x, y, spritePath)
            .setScale(this.scale)
            .setDepth(4)
            .setInteractive()
            .on("pointerdown", (pointer) => {
                // Need to make sure left button isn't down to fix a bug where left clicking
                // immediately after would trigger this twice and on the second time the
                // right button would still be considered down, creating two menus
                if (pointer.rightButtonDown() && !pointer.leftButtonDown()) {
                    this.createRightClickMenu(pointer.x, pointer.y, this.actions);
                } else {
                    this.leftClick();
                }
            });
        this.displayHeight = this.sprite.displayHeight;

        // Add text in top left for stackable items
        const [visualNum, fillColor] = getItemText(this.numItems);
        this.numItemsText = this.scene.add
            .text(x - 15, y - 18, visualNum, {
                font: "12px runescape",
                fill: fillColor,
            })
            .setDepth(5);

        const isVisible = this.numItems <= 1 ? false : this.isVisible;
        this.numItemsText.visible = isVisible;
        this.sprite.visible = isVisible;
    }

    // Need offset for where scroll window is placed as coordinates are relative
    createShopSprite(offsetX, offsetY) {
        const shopActions = [{ text: "Buy", func: "buy" }];

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
        const dashboard = this.scene.scene.get(CONSTANTS.SCENES.DASHBOARD);
        if (dashboard.inventory.getGold() >= this.cost) {
            console.log("Buying", this.name);
            this.scene.scene.get(CONSTANTS.SCENES.AUDIO).playSfx("purchase");

            // Create new non-shop item
            const boughtItem = await getItemClass(this.constructor.name, dashboard);
            if (dashboard.inventory.addToInventory(boughtItem)) {
                dashboard.inventory.addGold(-1 * this.cost);
            }
        } else {
            console.log("not enough mulah", dashboard.inventory.getGold(), this.cost);
        }
    }

    // Toggle highlighting on use
    highlightItem() {
        this.setHighlight(!this.selected);

        // Un-highlight prev item
        this.scene.inventory.selectItem(this.index);
    }

    setHighlight(isSelected) {
        this.selected = isSelected;
        if (isSelected) {
            this.sprite.setAlpha(0.5);
        } else {
            this.sprite.setAlpha(1);
        }
    }

    sellAll() {
        this.sellX(this.numItems);
    }

    sellX(x) {
        const dashboard = this.scene.scene.get(CONSTANTS.SCENES.DASHBOARD);
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        const numSold = Math.min(this.numItems, x);
        const sellAmount = Math.round(this.cost / 2) * numSold;
        chat.writeText(
            "Selling " + numSold + " " + this.name + " for " + sellAmount + " gold."
        );

        if (dashboard.inventory.getInventoryIndex(this.constructor.name) >= 0) {
            dashboard.inventory.addGold(sellAmount);
            this.setNumItems(this.numItems - numSold);
        } else {
            console.log("Error, attempting to sell nonexistent item.");
        }
    }

    promptSellX() {
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        chat.prompt("Enter Amount:", this);
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
                // Set format/color based on the amount
                const [visualNum, fillColor] = getItemText(num);

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

    setVisible(isVisible = true) {
        this.isVisible = isVisible;
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
            characterData.setInventory(this.index, null);
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
