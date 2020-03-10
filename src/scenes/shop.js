// TODO: Display items over the blank interface, along with their cost
// TODO: Each item needs to be a clickable image, and clicking adds the item to player inventory.
// TODO: Load images that are available to the player (based on levels)
// TODO: Show price of each item below the item, and gray out items that are too expensive

import { CONSTANTS } from "../constants/constants.js";
import { MATERIALS } from "../constants/materials.js";
import { ITEMS } from "../constants/items.js";
import { Item } from "../item.js";

export class ShopScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.SHOP
        });
    }

    init(data) {
        // Carry along character data
        this.characterData = data[0];
        this.currentLevel = data[1];
        this.shopItems = [];
        this.shopIcons = [];
        this.displayIndex = 0;
        this.itemBought = false;
    }

    preload() {
        // Shop Interface Images
        let buttons = ["WEAPONS", "TOOLS", "CONSUMABLES"];
        for (let i = 0; i < buttons.length; i++) {
            this.load.image(
                "shop-" + buttons[i],
                "src/assets/ui/ShopInterface" + buttons[i] + ".png"
            );
        }

        // Cash Stack Images
        let stacks = ["5", "25", "100", "250", "1k", "10k"];
        for (let i = 0; i < stacks.length; i++) {
            this.load.image(
                stacks[i],
                "src/assets/coin-stacks/" + stacks[i] + "-stack.png"
            );
        }
    }

    create() {
        // Text displayed while loading items
        this.loadingText = this.add
            .text(200, 200, "Loading...", { fill: "white", fontSize: "28px" })
            .setDepth(3);
        this.loadingText.visible = false;

        // Display the shop (weapons displayed by default)
        this.loadShop("WEAPONS");

        // Button to exit the shop and return to previous level
        this.exitButton = this.add
            .text(568, 15, "exit")
            .setDepth(-1)
            .setInteractive();
        this.exitButton.on("pointerup", () => {
            // Pass in the current level to know which level to return to upon exiting the shop.
            this.scene.start(this.currentLevel, this.characterData);
            console.log("Going back to", this.currentLevel);
        });

        // Buttons to switch between weapons, tools, and consumables
        this.weaponsButton = this.add
            .text(485, 90, "XXXX", { fontSize: "40px" })
            .setDepth(-1)
            .setInteractive();
        this.weaponsButton.on("pointerup", () => {
            this.loadShop("WEAPONS");
        });
        this.toolsButton = this.add
            .text(485, 170, "XXXX", { fontSize: "40px" })
            .setDepth(-1)
            .setInteractive();
        this.toolsButton.on("pointerup", () => {
            this.loadShop("TOOLS");
        });
        this.consumablesButton = this.add
            .text(485, 250, "XXXX", { fontSize: "40px" })
            .setDepth(-1)
            .setInteractive();
        this.consumablesButton.on("pointerup", () => {
            this.loadShop("CONSUMABLES");
        });

        // TODO: Remove
        // This is a hack to get around image loading getting hung on the second loading attempt.
        this.loadCount = 0;
    }

    // TODO: Update the shop to display current gold and which items you can afford
    // update(){
    //     if(this.itemBought) {
    //         updateGold();
    //         updateShop();
    //     }
    // }

    loadShop(type) {
        // Loads the correct background image (changes which button is selected)
        this.add
            .image(0, 0, "shop-" + type)
            .setOrigin(0, 0)
            .setDepth(0);

        // Displays cash stack
        this.displayGold(this.characterData.gold);

        // Loads items into shopItems, dynamically loads images for the items, and displays items on screen
        this.loadItems(type, this.characterData.skills);
    }

    // Outputs the gold text in RS format: 1m = 1000k, 10m = green text, 1b = 1000m
    displayGold(gold) {
        // Pick gold image based on # of coins
        let stack = "";
        switch (true) {
            case gold < 25:
                stack = "5";
                break;
            case gold < 100:
                stack = "25";
                break;
            case gold < 250:
                stack = "100";
                break;
            case gold < 1000:
                stack = "250";
                break;
            case gold < 10000:
                stack = "1k";
                break;
            default:
                stack = "10k";
                break;
        }
        let goldImage = this.add.image(48, 346, stack).setInteractive();
        goldImage.scale = 1.3;

        // Pick text color and style based on # of coins
        let color = "white";
        let goldText = this.characterData.gold;
        if (gold > 99999 && gold < 10000000) {
            goldText = gold / 1000 + "k";
        } else if (gold > 10000000) {
            goldText = gold / 1000000 + "M";
            fill = "#06c663";
        }
        this.add.text(33, 320, goldText, {
            fontFamily: '"runescape_uf"',
            fill: color,
            stroke: "#000000",
            strokeThickness: 2
        });
    }

    // Load items based on the character's levels
    loadItems(itemType, characterSkills) {
        console.log("Loading " + itemType);
        this.loadingText.visible = true;

        // Reset the shop when loading a new type of item
        (this.shopItems = []), (this.shopIcons = []), (this.displayIndex = 0);

        let imageX = {},
            imageY = {};
        switch (itemType) {
            // Weapons organized with attack on row 1, ranged on row 2, magic on row 3
            case "WEAPONS":
                imageX = { attack: 100, ranged: 100, magic: 100 };
                imageY = { attack: 100, ranged: 200, magic: 300 };
                this.loadCount++;
                break;
            // Tools organized with all tools on one row
            case "TOOLS":
                imageX = { woodcutting: 100, mining: 200 };
                imageY = { woodcutting: 100, mining: 100 };
                break;
            // Consumables organized by food on row 1, potions on row 2
            // TODO: This organization scheme will need to be changed in the future
            case "CONSUMABLES":
                imageX = { health: 100, herblore: 100 };
                imageY = { health: 100, herblore: 200 };
                break;
            default:
                console.log("Cannot Load Shop -- Invalid Item Type");
        }

        // Load each item object in the shopItems array
        for (let item in ITEMS[itemType]) {
            let itemData = ITEMS[itemType][item];
            let requiredSkill = itemData.skill;
            let requiredLevel = characterSkills[requiredSkill];
            // Load the current item with the best possible material (e.g. dragon dagger)
            let bestMat = this.getBestMat(requiredLevel, itemData.material);
            // Determine the corect (x,y) coordinate for the image to be displayed in the shop
            let x = imageX[requiredSkill];
            let y = imageY[requiredSkill];
            // Increment the x location for the next item of this type
            imageX[requiredSkill] += 100;
            this.shopItems.push(new Item(bestMat, itemData, x, y));
        }
        this.displayItems();
    }

    // Display the loaded images in the shop
    displayItems() {
        console.log("Done Loading Images");

        this.loadingText.visible = false;
        // Create icons for all of the loaded images
        for (let i = 0; i < this.shopItems.length; i++) {
            let item = this.shopItems[i];
            console.log("Displaying Item: ", item.name);
            let tempIcon = this.add
                .image(item.x, item.y, item.name)
                .setInteractive();
            tempIcon.scale = 0.25;
            tempIcon.on("pointerup", () => {
                this.buyItem(this.shopItems[i]);
            });
            tempIcon.on("pointerover", () => {
                this.displayToolTip(this.shopItems[i]);
            });
            this.shopIcons.push(tempIcon);
        }
    }

    // TODO: Buy an item from the shop (add item to inventory / subtract from available gold)
    buyItem(item) {
        console.log("Buying Item:", item.name);
    }

    // TODO: Display the tooltip text for an item (item name / stats) when hovering over it
    displayToolTip(item) {
        console.log("Hovering Over Item: ", item.name);
    }

    // // TODO:
    // updateGold() {
    //     // If an item was bought, update the available gold and re-set the "itemBought" flag
    // }

    // // TODO:
    // updateShop() {
    //     // Check if an item was bought?
    // }

    //====== Helper Functions ======

    // Determine the best material type available for a character given their levels (e.g. 5 attack = steel weapons)
    getBestMat(reqLevel, matType) {
        let bestMat = "No Mat";
        // Looping over values of this material type (e.g. SMITHINGMAT: Bronze, Iron, Steel, ...)
        for (let mat in MATERIALS[matType]) {
            // No dict.values() in Javascript, so this is a workaround.
            let matData = MATERIALS[matType][mat];
            bestMat = matData;
            if (matData.level >= reqLevel) break;
            
        }
        return bestMat;
    }
}
