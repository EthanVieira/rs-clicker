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

        // Items
        // TODO: Load images that are available to the player (based on levels)
        // TODO: Show price of each item below the item, and gray out items that are too expensive
    }

    create(){
        // Background
        this.shop = this.add.image(0, 0, 'shop').setOrigin(0,0).setDepth(0).setInteractive();

        // Items
        // TODO: Display items over the blank interface, along with their cost
        // TODO: Each item needs to be a clickable image, and clicking adds the item to player inventory.

        // Available Gold
        this.goldText = this.add.text(20, 13, 'Gold: ' + this.characterData.gold, {fill: 'white', fontSize: '28px'}).setDepth(3);

        // Exit
        this.exitButton = this.add.text(500, 0, 'exit').setInteractive();
        this.exitButton.on("pointerup", ()=>{
            // Pass in the current level to know which level to return to upon exiting the shop.
            this.scene.start(this.currentLevel, this.characterData);
            console.log("Going back to", this.currentLevel);
        })

        this.loadItems(this.characterData);
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
                console.log("Loading MELEE Items");
                load
                break;
            case 'MAGE':
                console.log("Loading Mage Items");
                break;
            case 'RANGER':
                console.log("Loading Ranged Items");
                break;
            default:
                console.log("No Class Selected.");   
        }
        // TODO: Load items based on character level / class (once the character has levels)

    }

    updateGold() {

    }

    updateShop() {

    }
}