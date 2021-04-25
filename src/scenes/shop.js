// TODO: gray out items that are too expensive
import { characterData } from "../cookie-io.js";
import { getItemClass, getGoldStackType } from "../utilities.js";
import { CONSTANTS, FONTS } from "../constants/constants.js";
import { itemManifest } from "../items/item-manifest.js";
import { getAutoclickerClass } from "../auto-clickers/auto-clicker.js";
import { autoclickerManifest } from "../auto-clickers/auto-clicker-manifest.js";
import { ScrollWindow } from "../ui/scroll-window.js";

export class ShopScene extends Phaser.Scene {
    // Scenes
    audio;
    scrollWindow;

    background;
    loadingText;
    exitButton;

    shopIcons = [];
    currentGold = 0;

    weaponsButton;
    weaponsText;
    toolsButton;
    toolsText;
    consumablesButton;
    consumablesText;
    clanButton;
    clanText;

    constructor() {
        super({
            key: CONSTANTS.SCENES.SHOP,
        });
    }

    preload() {
        // Shop Interface
        this.load.image("shop-interface", "src/assets/ui/ShopInterface.png");
        this.load.image("shop-button", "src/assets/ui/buttons/ShopButton.png");
        this.load.image("shop-exit-button", "src/assets/ui/buttons/ShopExitButton.png");
    }

    create() {
        // Run chat scene but hide the bottom buttons after create
        this.scene.run(CONSTANTS.SCENES.CHAT);
        const chatScene = this.scene.get(CONSTANTS.SCENES.CHAT);
        chatScene.events.once("create", () => {
            chatScene.hideButtons();
        });

        // Add background
        this.background = this.add
            .image(0, 0, "shop-interface")
            .setOrigin(0, 0)
            .setDepth(0);
        // Text displayed while loading items
        this.loadingText = this.add
            .text(200, 200, "Loading...", { fill: "white", fontSize: "28px" })
            .setDepth(3);
        this.loadingText.visible = false;

        // Add scrollable window for items
        this.scrollWindow = new ScrollWindow({
            name: "shop",
            x: 0,
            y: 100,
            width: 450,
            height: 214,
            numColumns: 3,
            padding: 35,
        });
        this.scene.add(this.scrollWindow.name, this.scrollWindow, true);

        // Display the shop (weapons displayed by default)
        this.loadShop(CONSTANTS.ITEM_TYPES.WEAPON);

        // Button to exit the shop and return to previous level
        this.exitButton = this.add
            .image(743, 22, "shop-exit-button")
            .setDepth(2)
            .setInteractive()
            .on("pointerup", () => {
                // Pass in the current level to know which level to return to upon exiting the shop.
                this.scene.start(characterData.getCurrentLevel());
                this.scene.remove(this.scrollWindow.name);
                console.log("Going back to", characterData.getCurrentLevel());
            });

        // Buttons to switch between weapons/tools/consumables/clan members (autoclickers)
        this.weaponsButton = this.add
            .image(525, 83, "shop-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerup", () => {
                this.hideAllButtons();
                this.weaponsButton.setAlpha(1);
                this.loadShop(CONSTANTS.ITEM_TYPES.WEAPON);
            });
        this.weaponsText = this.add.text(542, 97, "Weapons", FONTS.SHOP).setDepth(2);
        this.toolsButton = this.add
            .image(525, 167, "shop-button")
            .setDepth(2)
            .setOrigin(0, 0)
            .setInteractive()
            .on("pointerup", () => {
                this.hideAllButtons();
                this.toolsButton.setAlpha(1);
                this.loadShop(CONSTANTS.ITEM_TYPES.TOOL);
            });
        this.toolsText = this.add.text(555, 182, "Tools", FONTS.SHOP).setDepth(2);
        this.consumablesButton = this.add
            .image(525, 248, "shop-button")
            .setDepth(2)
            .setOrigin(0, 0)
            .setInteractive()
            .on("pointerup", () => {
                this.hideAllButtons();
                this.consumablesButton.setAlpha(1);
                this.loadShop(CONSTANTS.ITEM_TYPES.CONSUMABLE);
            });
        this.consumablesText = this.add
            .text(527, 262, "Consumables", FONTS.SHOP)
            .setDepth(2);
        this.clanButton = this.add
            .image(641, 83, "shop-button")
            .setDepth(2)
            .setOrigin(0, 0)
            .setInteractive()
            .on("pointerup", () => {
                this.hideAllButtons();
                this.clanButton.setAlpha(1);
                this.loadShop("CLAN");
            });
        this.clanText = this.add
            .text(659, 86, "    Clan\nMembers", FONTS.SHOP)
            .setDepth(2);

        // Hide all buttons on startup except weapons
        this.hideAllButtons();
        this.weaponsButton.setAlpha(1);

        // Get audio scene and play bgm
        this.audio = this.scene.get(CONSTANTS.SCENES.AUDIO);
        this.audio.playBgm("the-trade-parade");
    }

    loadShop(type) {
        // Loads items into shopItems and displays items on screen
        this.loadItems(type);
    }

    // Load items
    loadItems(itemType) {
        console.log("Loading " + itemType);
        this.loadingText.visible = true;

        // Reset the shop when loading a new type of item
        this.shopIcons.forEach((icon) => {
            icon.destroy();
        });
        this.shopIcons = [];

        this.displayItems(itemType);
    }

    // Display the loaded images in the shop
    async displayItems(itemType) {
        if (itemType == "CLAN") {
            for (const clickerName in autoclickerManifest) {
                const clicker = await getAutoclickerClass(clickerName, this.scrollWindow);
                clicker.createText(true);
                clicker.setVisible(false);
                this.shopIcons.push(clicker);
            }
        } else {
            // Load all items in that category
            for (const item in itemManifest) {
                if (itemManifest[item].type == itemType) {
                    const newItem = await getItemClass(item, this.scrollWindow);

                    // Create sprite
                    newItem.createShopSprite(20, 100);
                    newItem.setVisible(false);
                    this.shopIcons.push(newItem);
                }
            }
        }

        // Attach to the scroll window
        this.scrollWindow.clearObjects();
        this.scrollWindow.addObjects(this.shopIcons);
        this.scrollWindow.refresh();
        this.loadingText.visible = false;
    }

    hideAllButtons() {
        this.weaponsButton.setAlpha(0.1);
        this.toolsButton.setAlpha(0.1);
        this.consumablesButton.setAlpha(0.1);
        this.clanButton.setAlpha(0.1);
    }
}
