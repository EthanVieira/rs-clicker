import { CONSTANTS } from "../../constants/constants.js";
import { calcLevel, getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";
import Coin from "../../items/currencies/coin.js";

export class Inventory {
    scene;
    menu;
    button;
    inventory = []; // Images
    curSelectedItemIndex = -1;

    dragging = false;

    ITEM_WIDTH = 45;
    ITEM_HEIGHT = 37;
    INVENT_START_X = 570;
    INVENT_START_Y = 226;
    ITEM_AMOUNT_X_OFFSET = 15;
    ITEM_AMOUNT_Y_OFFSET = 18;
    NUM_COLS = 4;
    NUM_ROWS = 7;

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

                this.setVisible();
                this.button.setAlpha(0.1);
            });

        // Update and show inventory on startup
        this.refreshInventory();

        // Show by default
        this.setVisible();
    }

    // Load inventory on startup
    async refreshInventory() {
        characterData.getInventory().forEach(async (item, i) => {
            if (item) {
                // Create item from name
                const itemObj = await getItemClass(item.item, this.scene);
                itemObj.setNumItems(item.count);
                this.addToInventoryAtIndex(itemObj, i);
            }
        });
    }

    // Add to specific index
    addToInventoryAtIndex(item, index, createSprite = true) {
        // Add item images
        const column = index % this.NUM_COLS;
        const row = Math.floor(index / this.NUM_COLS);
        const x = this.INVENT_START_X + column * this.ITEM_WIDTH;
        const y = this.INVENT_START_Y + row * this.ITEM_HEIGHT;

        // Draw sprite or move it if it already exists
        if (createSprite) {
            item.createSprite(x, y, index);
        } else {
            item.move(x, y, index);
        }

        item.sprite.on("drag", (pointer, dragX, dragY) => {
            if (this.scene.currentPanel != CONSTANTS.PANEL.INVENTORY) {
                return;
            }

            if (this.curSelectedItemIndex != -1) {
                const selectedItem = this.inventory[this.curSelectedItemIndex];
                selectedItem.setHighlight(false);
                this.curSelectedItemIndex = -1;
            }

            item.sprite.setPosition(dragX, dragY);
            item.numItemsText.setPosition(
                dragX - this.ITEM_AMOUNT_X_OFFSET,
                dragY - this.ITEM_AMOUNT_Y_OFFSET
            );
            // bring it to the front of other items in invent
            item.sprite.setDepth(5);
            this.dragging = true;
        });

        item.sprite.on("pointerup", (pointer) => {
            if (this.scene.currentPanel != CONSTANTS.PANEL.INVENTORY) {
                return;
            }

            // dragend event is heard before pointerup
            // don't allow left click if dragging
            if (this.dragging) {
                this.dragging = false;
                this.setItemAtIndex(item, item.index);
                return;
            }

            item.leftClick();
        });

        item.sprite.on("dragend", (pointer) => {
            if (this.scene.currentPanel != CONSTANTS.PANEL.INVENTORY) {
                return;
            }

            const newX = pointer.x;
            const newY = pointer.y;
            const oldIndex = item.index;

            const modifiedInventStartX = this.INVENT_START_X - 20;
            const modifiedInventStartY = this.INVENT_START_Y - 20;
            const inventEndX = modifiedInventStartX + this.ITEM_WIDTH * this.NUM_COLS;
            const inventEndY = modifiedInventStartY + this.ITEM_HEIGHT * this.NUM_ROWS;

            if (
                newX >= modifiedInventStartX &&
                newX <= inventEndX &&
                newY >= modifiedInventStartY &&
                newY <= inventEndY
            ) {
                // find closest index and snap to it
                let newCol = Math.floor((newX - modifiedInventStartX) / this.ITEM_WIDTH);
                let newRow = Math.floor((newY - modifiedInventStartY) / this.ITEM_HEIGHT);
                const newIndex = newCol + newRow * this.NUM_COLS;

                if (newIndex == oldIndex) {
                    // snap back to original position
                    this.setItemAtIndex(item, oldIndex);
                } else {
                    // swap items if one exists at newIndex
                    if (this.inventory.length > newIndex) {
                        let tempItem = this.inventory[newIndex];
                        this.setItemAtIndex(item, newIndex);
                        this.setItemAtIndex(tempItem, oldIndex);
                    } else if (newIndex < CONSTANTS.LIMITS.MAX_INVENTORY_SPACE) {
                        this.setItemAtIndex(item, newIndex);
                        this.setItemAtIndex(null, oldIndex);
                    }
                }
            } else {
                // snap back to original position
                this.setItemAtIndex(item, oldIndex);
            }

            item.sprite.setDepth(4);
        });

        this.setItemAtIndex(item, item.index);
    }

    setItemAtIndex(item, index) {
        if (item != null) {
            const col = index % this.NUM_COLS;
            const row = Math.floor(index / this.NUM_COLS);
            const x = this.INVENT_START_X + col * this.ITEM_WIDTH;
            const y = this.INVENT_START_Y + row * this.ITEM_HEIGHT;
            item.sprite.setPosition(x, y);
            item.numItemsText.setPosition(
                x - this.ITEM_AMOUNT_X_OFFSET,
                y - this.ITEM_AMOUNT_Y_OFFSET
            );
            item.index = index;

            // Add to saved data
            characterData.setInventory(index, {
                item: item.constructor.name,
                count: item.numItems,
            });

            // Hide if inventory is not selected
            item.setVisible(this.scene.currentPanel === CONSTANTS.PANEL.INVENTORY);
        } else {
            characterData.setInventory(index, null);
        }

        this.inventory[index] = item;
    }

    getInventoryIndex(itemName) {
        return characterData.getInventory().findIndex((item) => item.item === itemName);
    }

    // Returns first instance of an item in inventory
    // that contains the given keyword in its name.
    // The first skill included in skillsRequired will
    // be used for sorting inventory items that match the keyword.
    getKeywordInInventory(keyword, mustBeUsable = false, skillsRequired = []) {
        if (mustBeUsable) {
            // Filter items that match keyword and are useable
            const playerItems = this.inventory.filter((item) => {
                if (item && item.requiredLevels) {
                    const matchesKey = item.item.includes(keyword);
                    const canUseItem = skillsRequired.every(
                        (skill) =>
                            calcLevel(characterData.getSkillXp(skill)) >=
                            item.requiredLevels[skill]
                    );

                    return matchesKey && canUseItem;
                } else {
                    return false;
                }
            });

            // Get strongest item
            playerItems.sort(
                (a, b) =>
                    b.requiredLevels[skillsRequired[0]] -
                    a.requiredLevels[skillsRequired[0]]
            );

            if (playerItems.length > 0) {
                return playerItems[0].index;
            } else {
                return -1;
            }
        } else {
            return characterData
                .getInventory()
                .findIndex((item) => item.item.includes(keyword));
        }
    }

    getNumItems(item) {
        const i = this.getInventoryIndex(item.constructor.name);
        return i >= 0 ? this.inventory[i].numItems : 0;
    }

    // Add to first available slot
    addToInventory(item, createSprite = true) {
        // Check if it can stack with other items
        let i = this.getInventoryIndex(item.constructor.name);
        if (i >= 0 && item.stackable) {
            const curItem = this.inventory[i];

            // Update the item in the game
            curItem.setNumItems(
                Math.min(
                    curItem.numItems + item.numItems,
                    CONSTANTS.LIMITS.MAX_ITEM_STACK
                )
            );

            // Delete old item
            item.destroy();

            return true;
        }

        // Search for empty slot
        const playerItems = characterData.getInventory();
        i = playerItems.findIndex((item) => !item);

        // Found a slot
        if (i >= 0) {
            this.addToInventoryAtIndex(item, i, createSprite);
            return true;
        }
        // Add to end
        else if (playerItems.length < CONSTANTS.LIMITS.MAX_INVENTORY_SPACE) {
            this.addToInventoryAtIndex(item, playerItems.length, createSprite);
            return true;
        }
        // No slot available
        else {
            console.log("Inventory is full");
            return false;
        }
    }

    addNToInventory(item, amount) {
        if (item.stackable) {
            item.numItems = Math.min(amount, CONSTANTS.LIMITS.MAX_ITEM_STACK);
            this.addToInventory(item);
        } else {
            //TODO: I think we should have every item be stackable, but leaving this for now
            for (let i = 0; i < min(amount, CONSTANTS.LIMITS.MAX_INVENTORY_SPACE); i++) {
                this.addToInventory(item);
            }
        }
    }

    addGold(amount) {
        const gold = new Coin(this.scene);
        gold.numItems = amount;
        this.addToInventory(gold);
        this.stats.updateTotalEarnedGold(amount);
    }

    getGold() {
        const i = characterData
            .getInventory()
            .findIndex((item) => item && item.item == Coin.name);
        if (i >= 0) {
            return this.inventory[i].numItems;
        } else {
            return 0;
        }
    }

    selectItem(index) {
        const item1 = this.inventory[this.curSelectedItemIndex];

        // Unselect item
        if (index == this.curSelectedItemIndex) {
            this.curSelectedItemIndex = -1;
        }
        // Select item
        else if (this.curSelectedItemIndex < 0 || !item1) {
            this.curSelectedItemIndex = index;
        }
        // Combine items
        else {
            const item2 = this.inventory[index];

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

    setVisible(isVisible = true) {
        if (isVisible) {
            this.scene.currentPanel = CONSTANTS.PANEL.INVENTORY;
            this.button.setAlpha(0.1); // Unselected inventory icon
        } else {
            this.button.setAlpha(1); // Unselected inventory icon
        }

        this.inventory.forEach((item) => {
            if (item) {
                item.setVisible(isVisible);
            }
        });
    }

    destroy() {
        this.inventory.forEach((item) => {
            if (item) {
                item.destroy(false);
            }
        });
        this.inventory = [];
    }
}
