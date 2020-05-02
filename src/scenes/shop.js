// TODO: gray out items that are too expensive
import { calcLevel } from "../utilities.js";
import { CONSTANTS } from "../constants/constants.js";
import { Item, getItemClass } from "../items/item.js";
import { itemManifest } from "../items/item-manifest.js";
import { ScrollWindow } from "../ui/scroll-window.js";

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
        this.currentGold = this.characterData.gold;
    }

    preload() {
        // Shop Interface Images
        let buttons = ["Weapons", "Tools", "Consumables"];
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
                "src/assets/coin-stacks/" + stacks[i] + "-Stack.png"
            );
        }
    }

    create() {
        // Text displayed while loading items
        this.loadingText = this.add
            .text(200, 200, "Loading...", { fill: "white", fontSize: "28px" })
            .setDepth(3);
        this.loadingText.visible = false;

        // Add scrollable window for items
        this.scrollWindow = new ScrollWindow("shop");
        this.scene.add("scroll-window", this.scrollWindow, true, this.characterData);

        // Display the shop (weapons displayed by default)
        this.loadShop("Weapons");

        // Button to exit the shop and return to previous level
        this.exitButton = this.add
            .text(568, 15, "exit")
            .setDepth(-1)
            .setInteractive();
        this.exitButton.on("pointerup", () => {
            // Pass in the current level to know which level to return to upon exiting the shop.
            this.scene.start(this.currentLevel, this.characterData);
            this.scene.remove(this.scrollWindow.name);
            console.log("Going back to", this.currentLevel);
        });

        // Buttons to switch between weapons, tools, and consumables
        this.weaponsButton = this.add
            .text(485, 90, "XXXX", { fontSize: "40px" })
            .setDepth(-1)
            .setInteractive();
        this.weaponsButton.on("pointerup", () => {
            this.loadShop("Weapons");
        });
        this.toolsButton = this.add
            .text(485, 170, "XXXX", { fontSize: "40px" })
            .setDepth(-1)
            .setInteractive();
        this.toolsButton.on("pointerup", () => {
            this.loadShop("Tools");
        });
        this.consumablesButton = this.add
            .text(485, 250, "XXXX", { fontSize: "40px" })
            .setDepth(-1)
            .setInteractive();
        this.consumablesButton.on("pointerup", () => {
            this.loadShop("Consumables");
        });

        // Get audio scene
        this.audio = this.scene.get(CONSTANTS.SCENES.AUDIO);
        this.audio.playBgm("the-trade-parade");
    }

    // Update the shop to display current gold
    update(){
        if(this.currentGold != this.characterData.gold) {
            // Play buy sfx
            this.audio.playSfx("purchase");

            // Remove old gold info and re-add new
            this.goldText.destroy();
            this.goldImage.destroy();
            this.displayGold(this.characterData.gold);
            this.currentGold = this.characterData.gold;
        }
    }

    loadShop(type) {
        // Loads the correct background image (changes which button is selected)
        this.add
            .image(0, 0, "shop-" + type)
            .setOrigin(0, 0)
            .setDepth(0);

        // Displays cash stack
        this.displayGold(this.characterData.gold);

        // Loads items into shopItems and displays items on screen
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
        this.goldImage = this.add.image(48, 76, stack).setInteractive();
        this.goldImage.scale = 1.3;

        // Pick text color and style based on # of coins
        let color = "white";
        let goldText = this.characterData.gold;
        if (gold > 99999 && gold < 10000000) {
            goldText = gold / 1000 + "k";
        } else if (gold > 10000000) {
            goldText = gold / 1000000 + "M";
            fill = "#06c663";
        }
        this.goldText = this.add.text(35, 50, goldText, {
            fontFamily: "runescape",
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
        this.shopIcons.forEach(icon => {
            icon.destroy();
        });
        (this.shopItems = []), (this.shopIcons = []), (this.displayIndex = 0);

        this.displayItems();
    }

    // Display the loaded images in the shop
    async displayItems() {
        // Scroll window offsets from the main window, used to position right-click menu
        let scrollX = 20,
            scrollY = 100;

        // Load all items
        for (let item in itemManifest) {
            // Get item class
            let path = itemManifest[item].classPath;
            let itemClass = await import("/src/items/" + path);
            let newItem = new itemClass.default(this.scrollWindow);

            // Create sprite
            newItem.createShopSprite(scrollX, scrollY);
            newItem.setVisible(false);
            this.shopIcons.push(newItem);
        }

        // Attach to the correct columns in the scroll window
        this.scrollWindow.addObjects(scrollX, scrollY, 400, 3, this.shopIcons);
        this.loadingText.visible = false;
    }
}
