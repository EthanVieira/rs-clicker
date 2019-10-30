// TODO: Display items over the blank interface, along with their cost
// TODO: Each item needs to be a clickable image, and clicking adds the item to player inventory.
// TODO: Load images that are available to the player (based on levels)
// TODO: Show price of each item below the item, and gray out items that are too expensive

import { CONSTANTS } from "../constants.js";

export class Shop extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.SHOP
        })
    }

    init(data) {
        // Carry along character data
        this.characterData = data[0];
        this.currentLevel = data[1];
        this.itemBought = false;
    }

    preload(){
        // Background
        this.load.image('shop', 'source/assets/shopInterface.png');
    }

    create(){
        // Background
        this.shop = this.add.image(0, 0, 'shop').setOrigin(0,0).setDepth(0).setInteractive();

        // Available Gold
        // TODO: Move this to line up with the gold icon
        this.goldText = this.add.text(20, 13, 'Gold: ' + this.characterData.gold, {fill: 'white', fontSize: '28px'}).setDepth(3);

        // Exit
        // TODO: Make this text invisible
        this.exitButton = this.add.text(500, 0, 'exit').setInteractive();
        this.exitButton.on("pointerup", ()=>{
            // Pass in the current level to know which level to return to upon exiting the shop.
            this.scene.start(this.currentLevel, this.characterData);
            console.log("Going back to", this.currentLevel);
        })

        // TODO: Add buttons to switch between weapons, armor, tools, and consumables
        //this.toolsButton = ...
        //this.consumablesButton = ...

        // By default, load the array of available weapons objects 
        this.shopItems = this.loadItems("WEAPONS", this.characterData);

        // Display the items in the shop as interactive images
        this.displayItems();
    }

    update(){
        if(this.itemBought) {
            updateGold();
            updateShop();
        }
    }

    // TODO: Add armor as a potential item type? 
    loadItems(itemType, characterData) {
        switch(itemType) {
            case "WEAPONS":
                this.loadWeapons(this.characterData);
                break;
            case "TOOLS":
                this.loadTools(this.characterData);
                break;
            case "CONSUMABLES":
                this.loadConsumables(this.characterData);
                break;
            default:
                console.log("Cannot Load Shop -- Invalid Item Type");
        }
    }

    // Load weapons based on the character's levels
    loadWeapons(characterData) {
        console.log("Loading Weapons");
        var items = [];
        // Start by selecting all of the smithing classes the character has unlocked (according to att lvl)
        var bestMaterial;
        for(var material in CONSTANTS.SMITHINGMAT) {
            // Break once the character's attack level is not high enough to use a weapon tier
            if(material[2] > characterLevel)
                break;
            bestMaterial = material;
        } 
        console.log(bestMaterial);
        // Load shop with melee items of the best smithing material
        for(var type in CONSTANTS.MELEEWEAPON.SMITHINGITEM) {
            items.append(new item(bestMaterial, type)); 
        }
        return items;

    }

    // TODO
    loadTools(characterData) {}
    loadConsumables(characterData) {}

    displayItems() {

    }

    updateGold() {

    }

    updateShop() {

    }
}