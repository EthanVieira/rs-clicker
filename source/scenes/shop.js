// TODO: Display items over the blank interface, along with their cost
// TODO: Each item needs to be a clickable image, and clicking adds the item to player inventory.
// TODO: Load images that are available to the player (based on levels)
// TODO: Show price of each item below the item, and gray out items that are too expensive

import { CONSTANTS } from "../constants.js";
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
        var items = [[]];
        var weaponTypes = [CONSTANTS.MELEEWEAPON, CONSTANTS.RANGEDWEAPON/*, CONSTANTS.MAGICWEAPON*/];

        // Load weapons for each part of the combat triangle
        for(let i = 0; i < weaponTypes.length; i++) {
            var weaponType = weaponTypes[i];
            // Determine which skill (attack/ranged/magic) is required for this weapon type
            var requiredSkill;
            if(weaponType == CONSTANTS.MELEEWEAPON)
                requiredSkill = characterData.skills.attack;
            else if(weaponType == CONSTANTS.RANGEDWEAPON)
                requiredSkill = characterData.skills.ranged;
            else
                requiredSkill = characterData.skills.magic;

            // Store each item for this row of the shop in tempList
            var tempList = [];
            for(var weapon in weaponType) {
                // weaponData stores [name, base_cost, material_type (smithing/fletching)]
                var weaponData = weaponType[weapon];  
                var matType = CONSTANTS[weaponData[2]];
                var bestMat = this.getBestMat(requiredSkill, matType);
                // Load the current weapon with the best possible material (e.g. dragon dagger)
                tempList.push(new Item(bestMat, weaponData));
            }
            // Store each class of weapon in its own row (melee on first row, ranged on second, magic on third)
            items[i] = tempList;
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
    getBestMat(level, matType) {
        var bestMat;
        console.log("Mat Type: ", matType);
        for(var mat in matType) {
            var matData = matType[mat];
            console.log("Mat: ", matData);
            if(matData[2] > level)
                break;
            bestMat = matData;
        }
        return bestMat;
    }

}