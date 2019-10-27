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

        this.shopItems = this.loadItems(this.characterData);
    }

    update(){
        if(this.itemBought) {
            updateGold();
            updateShop();
        }
    }

    loadItems(characterData) {
        switch(characterData.characterClass) {
            case 'WARRIOR':
                loadMelee(characterData);
                break;
            case 'RANGER':
                loadRanged(characterData);
                break;
            case 'MAGE':
                loadMagic(characterData);
                break;
            default:
                console.log("No Class Selected.");   
        }
    }

    loadMelee(characterData) {
        // TODO
        // Start by selecting all of the smithing classes the character has unlocked (according to att lvl)
        // Then, select all of the melee items from this category and calculate price
        // Create item object for each item, storing price / image location 
        // Add each item object to shopItems array
        console.log("Loading Melee Items");
    }

    loadRanged(characterData) {
        console.log("Loading Ranged Items");
    }

    loadMagic(characterData) {
        console.log("Loading Mage Items");
    }

    updateGold() {

    }

    updateShop() {

    }
}