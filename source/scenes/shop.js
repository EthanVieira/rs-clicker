// TODO: Display items over the blank interface, along with their cost
// TODO: Each item needs to be a clickable image, and clicking adds the item to player inventory.
// TODO: Load images that are available to the player (based on levels)
// TODO: Show price of each item below the item, and gray out items that are too expensive

import { CONSTANTS } from "../constants.js";
import { MATERIALS } from "../materials.js";
import { ITEMS } from "../items.js";
import { Item } from "../item.js";

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
        this.shopItems = [];
        this.shopIcons = [];
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
        // @TODO: Move this to line up with the gold icon
        this.goldText = this.add.text(20, 13, 'Gold: ' + this.characterData.gold, {fill: 'white', fontSize: '28px'}).setDepth(3);

        // Exit
        // @TODO: Make this text invisible
        this.exitButton = this.add.text(500, 0, 'exit').setInteractive();
        this.exitButton.on("pointerup", ()=>{
            // Pass in the current level to know which level to return to upon exiting the shop.
            this.scene.start(this.currentLevel, this.characterData);
            console.log("Going back to", this.currentLevel);
        })

        // @TODO: Add buttons to switch between weapons, tools, and consumables
        //this.weaponsButton = ...
        //this.toolsButton = ...
        //this.consumablesButton = ...

        // Load the array of available item objects (weapons by default)
        this.loadItems("WEAPONS", this.characterData);
        console.log(this.shopItems);

        // Display the items in the shop as interactive images
        this.displayIndex = 0;
        this.displayItems();
        console.log(this.shopIcons);
    }

    // @TODO: Update the shop to display current gold and which items you can afford
    // update(){
    //     if(this.itemBought) {
    //         updateGold();
    //         updateShop();
    //     }
    // }

    // @TODO: Add armor as a potential item type? 
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
        // Store the (x,y) coordinates for each image in the shop display
        var imageX = {"attack": 100, "ranged": 100, "magic": 100};
        var imageY = {"attack": 100, "ranged": 200, "magic": 300};
        for(var weapon in ITEMS.WEAPONS) {
            var weaponData = ITEMS.WEAPONS[weapon];
            var requiredSkill = weaponData.skill;
            var requiredLevel = characterData.skills[requiredSkill];
            // Load the current weapon with the best possible material (e.g. dragon dagger)
            var bestMat = this.getBestMat(requiredLevel, weaponData.material);
            // Determine the corect (x,y) coordinate for the image to be displayed in the shop
            var x = imageX[requiredSkill];
            var y = imageY[requiredSkill];
            // Increment the x location for the next item of this type
            imageX[requiredSkill] += 100;
            this.shopItems.push(new Item(bestMat, weaponData, x, y));
        }
    }

    // @TODO
    loadTools(characterData) {
        console.log("Loading Tools");
    }

    // @TODO
    loadConsumables(characterData) {
        console.log("Loading Consumables");
    }

    displayItems() {
        console.log("Current Display Index: ", this.displayIndex);
        var item = this.shopItems[this.displayIndex++];
        console.log("First Item to Display: ", item);
        this.displayX = item.x;
        this.displayY = item.y;

        // http://labs.phaser.io/edit.html?src=src/loader/loader%20events/start%20loader%20manually.js
        this.load.setPath('source/assets/items/');
        this.load.on('filecomplete', addNextImage, this);
        this.load.image(item.name);
        this.load.start();
    }

    // @TODO
    updateGold() {
        // If an item was bought, update the available gold and re-set the "itemBought" flag
    }

    // @TODO
    updateShop() {
        // Check if an item was bought?
    }

    //====== Helper Functions ======

    // Determine the best material type available for a character given their levels (e.g. 5 attack = steel weapons)
    getBestMat(reqLevel, matType) {
        var bestMat;
        // Looping over values of this material type (e.g. SMITHINGMAT: Bronze, Iron, Steel, ...)
        for(var mat in MATERIALS[matType]) {
            // No dict.values() in Javascript, so this is a workaround. 
            var matData = MATERIALS[matType][mat];
            if(matData.level > reqLevel)
                break;
            bestMat = matData;
        }
        return bestMat;
    }
}

// Event listener for dynamically loading all of the images in the shopItems list.
function addNextImage(key) {
    console.log("Adding Next Item to Display");
    var curIcon = this.add.image(this.displayX, this.displayY, key).setInteractive();
    curIcon.scale = .3;
    // @TODO Add a real click-listener function that actually buys the item
    curIcon.on("pointerup", ()=>{
        console.log("Clicked Item: ", key);
    })
    this.shopIcons.push(curIcon);

    var nextItem = this.shopItems[this.displayIndex++];

    if(nextItem) {
        this.displayX = nextItem.x;
        this.displayY = nextItem.y;
        this.load.image(nextItem.name);
    }
}