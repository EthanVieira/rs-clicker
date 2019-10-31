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

        // Load the 2D array of available item objects (weapons by default)
        this.loadItems("WEAPONS", this.characterData);
        console.log(this.shopItems);

        // Display the items in the shop as interactive images
        this.displayItems();
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
        var items = [];
        var meleeWeapons = [], rangedWeapons = [], magicWeapons = [];
        for(var key in ITEMS.WEAPONS) {
            console.log("Current Weapon: ", key);
            // Store the dictionary entry for this specific weapon
            var weaponData = ITEMS.WEAPONS[key];
            // Determine which skill (attack/ranged/magic) is required for this weapon type
            var requiredSkill = characterData.skills[weaponData.skill];
            // Load the current weapon with the best possible material (e.g. dragon dagger)
            var bestMat = this.getBestMat(requiredSkill, weaponData.material);
            items.push(new Item(bestMat, weaponData));
        }
        this.shopItems = items;
    }

    // @TODO
    loadTools(characterData) {}

    // @TODO
    loadConsumables(characterData) {}

    // @TODO
    displayItems() {
        // For each row in items, load all of the items side-by-side with price
        // Make sure spacing and prices show up cleanly
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
        console.log("Mat Type: ", matType);
        // Looping over values of this material type (e.g. SMITHINGMAT: Bronze, Iron, Steel, ...)
        for(var mat in MATERIALS[matType]) {
            // No dict.values() in Javascript, so this is a workaround. 
            var matData = MATERIALS[matType][mat];
            console.log("Mat Data: ", matData);
            if(matData.level > reqLevel)
                break;
            bestMat = matData;
        }
        return bestMat;
    }

}