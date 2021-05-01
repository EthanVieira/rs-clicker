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
        const showItem = this.scene.currentPanel === CONSTANTS.PANEL.INVENTORY;
        item.setVisible(showItem);

        // Add object to the scene
        this.inventory[index] = item;
    }

    getInventoryIndex(itemName) {
        return characterData
            .getInventory()
            .findIndex((item) => item && item.item === itemName);
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

    // Add to first available slot
    addToInventory(item, createSprite = true) {
        // Check if it can stack with other items
        let i = this.getInventoryIndex(item.constructor.name);
        if (i >= 0 && item.stackable) {
            const curItem = this.inventory[i];

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
        const playerItems = characterData.getInventory();
        i = playerItems.findIndex((item) => !item);

        // Found a slot
        if (i >= 0) {
            this.addToInventoryAtIndex(item, i, createSprite);
            return true;
        }
        // Add to end
        else if (playerItems.length < 28) {
            this.addToInventoryAtIndex(item, playerItems.length, createSprite);
            return true;
        }
        // No slot available
        else {
            console.log("Inventory is full");
            return false;
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
