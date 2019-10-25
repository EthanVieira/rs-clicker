import { CONSTANTS } from "../constants.js";

export class Shop extends Phaser.Scene{
    characterData = {};
    constructor() {
        super({
            key: CONSTANTS.SCENES.SHOP
        })
    }
    init(characterData) {
        // Carry along character data
        this.characterData = characterData;
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
        let shop = this.add.image(0, 0, 'shop').setOrigin(0,0).setDepth(0).setInteractive();

        // Items
        // TODO: Display items over the blank interface, along with their cost
        // TODO: Each item needs to be a clickable image, and clicking adds the item to player inventory.
    }
}