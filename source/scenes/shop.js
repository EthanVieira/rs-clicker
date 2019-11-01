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
        this.displayIndex = 0;
        this.itemBought = false;
    }

    preload(){
        // Background
        this.load.image('shop', 'source/assets/shopInterface.png');

        // Cash Stacks
        let stacks = ['5', '25', '100', '250', '1k', '10k'];
        for(let i = 0; i < stacks.length; i++) {
            this.load.image(stacks[i], 'source/assets/coin_stacks/' + stacks[i] + '_stack.png');
        }
    }

    create(){
        // Background
        this.shop = this.add.image(0, 0, 'shop').setOrigin(0,0).setDepth(0)

        // Available Gold
        this.displayGold(this.characterData.gold);

        // Exit
        this.exitButton = this.add.text(568, 15, 'exit').setDepth(-1).setInteractive();
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
        this.loadItems("WEAPONS", this.characterData.skills);

        // Display the items in the shop as interactive images
        this.loadingText = this.add.text(200, 200, 'Loading...', {fill: 'white', fontSize: '28px'}).setDepth(3);
        this.loadImages();  
        
        // @TODO: Fix this dirty hack
        // Loader getting hung when opening the shop for the 2nd time, works fine on 1st, 3rd, 4th, ...
        this.load.once('start', this.displayItems, this);
        this.load.once('complete', this.displayItems, this);
    }

    // @TODO: Update the shop to display current gold and which items you can afford
    // update(){
    //     if(this.itemBought) {
    //         updateGold();
    //         updateShop();
    //     }
    // }

    // Outputs the player text in RS format: 1m = 1000k, 10m = green text, 1b = 1000m
    displayGold(gold) {
        // Pick gold image based on # of coins 
        let stack = '';
        switch(true) {
            case (gold < 25):
                stack = '5'; break;
            case (gold < 100):
                stack = '25'; break;
            case (gold < 250):
                stack = '100'; break;
            case (gold < 1000):
                stack = '250'; break;
            case (gold < 10000):
                stack = '1k'; break;
            default:
                stack = '10k'; break;
        }
        let goldImage = this.add.image(48, 346, stack).setInteractive();
        goldImage.scale = 1.3;
        // this.add.image(40, 320, stack).setInteractive();

        // Pick text color and style based on # of coins
        let color = 'white';
        let goldText = this.characterData.gold;
        if(gold > 99999 && gold < 10000000) {
            goldText = (gold / 1000) + 'k';
        }
        else if(gold > 10000000) {
            goldText = (gold / 1000000) + 'M';
            fill = '#06c663';
        }
        this.add.text(33, 320, goldText, {fontFamily: '"runescape_uf"', fill: color, stroke: '#000000', strokeThickness: 2});
    }

    // @TODO: Add armor as a potential item type? 
    loadItems(itemType, characterSkills) {
        switch(itemType) {
            case "WEAPONS":
                this.loadWeapons(characterSkills); break;
            case "TOOLS":
                this.loadTools(characterSkills); break;
            case "CONSUMABLES":
                this.loadConsumables(characterSkills); break;
            default:
                console.log("Cannot Load Shop -- Invalid Item Type");
        }
    }

    // Load weapons based on the character's levels
    loadWeapons(characterSkills) {
        console.log("Loading Weapons");
        // Store the (x,y) coordinates for each image in the shop display
        let imageX = {"attack": 100, "ranged": 100, "magic": 100};
        let imageY = {"attack": 100, "ranged": 200, "magic": 300};
        for(let weapon in ITEMS.WEAPONS) {
            let weaponData = ITEMS.WEAPONS[weapon];
            let requiredSkill = weaponData.skill;
            let requiredLevel = characterSkills[requiredSkill];
            // Load the current weapon with the best possible material (e.g. dragon dagger)
            let bestMat = this.getBestMat(requiredLevel, weaponData.material);
            // Determine the corect (x,y) coordinate for the image to be displayed in the shop
            let x = imageX[requiredSkill];
            let y = imageY[requiredSkill];
            // Increment the x location for the next item of this type
            imageX[requiredSkill] += 100;
            this.shopItems.push(new Item(bestMat, weaponData, x, y));
        }
    }

    // @TODO
    loadTools(characterSkills) {
        console.log("Loading Tools");
    }

    // @TODO
    loadConsumables(characterSkills) {
        console.log("Loading Consumables");
    }

    // Load images dynamically to avoid having to preload every item image.
    loadImages() {
        let item = this.shopItems[this.displayIndex++];
        console.log("Loading Image: ", item.name);
        this.displayX = item.x;
        this.displayY = item.y;

        // http://labs.phaser.io/edit.html?src=src/loader/loader%20events/start%20loader%20manually.js
        this.load.setPath('source/assets/items/');
        this.load.on('filecomplete', addNextImage, this);
        this.load.image(item.name);
        this.load.start();
    }

    // Display the loaded images in the shop
    displayItems() {
        // @TODO Remove this check, only in place because of the display hack that calls this function twice
        if(this.shopIcons.length == this.shopItems.length)
            return;

        console.log("Done Loading Images");
        this.loadingText.visible = false;
        // Create icons for all of the loaded images
        for(let i = 0; i < this.shopItems.length; i++) {
            let item = this.shopItems[i];
            console.log("Displaying Item: ", item.name);
            let tempIcon = this.add.image(item.x, item.y, item.name).setInteractive();
            tempIcon.scale = .25;
            // @TODO Add a real click-listener function that actually buys the item
            tempIcon.on("pointerup", ()=>{
                this.buyItem(this.shopItems[i]);
            })
            tempIcon.on("pointerover", ()=>{
                this.displayToolTip(this.shopItems[i]);
            })
            this.shopIcons.push(tempIcon);
        }
    }

    // @TODO: Buy an item from the shop (add item to inventory / subtract from available gold)
    buyItem(item) {
        console.log("Buying Item:", item.name);
    }

    // @TODO: Display the tooltip text for an item (item name / stats) when hovering over it
    displayToolTip(item) {
        console.log("Hovering Over Item: ", item.name);
    }

    // // @TODO
    // updateGold() {
    //     // If an item was bought, update the available gold and re-set the "itemBought" flag
    // }

    // // @TODO
    // updateShop() {
    //     // Check if an item was bought?
    // }

    //====== Helper Functions ======

    // Determine the best material type available for a character given their levels (e.g. 5 attack = steel weapons)
    getBestMat(reqLevel, matType) {
        let bestMat = 'No Mat';
        // Looping over values of this material type (e.g. SMITHINGMAT: Bronze, Iron, Steel, ...)
        for(let mat in MATERIALS[matType]) {
            // No dict.values() in Javascript, so this is a workaround. 
            let matData = MATERIALS[matType][mat];
            if(matData.level > reqLevel)
                break;
            bestMat = matData;
        }
        return bestMat;
    }
}

// Event listener for dynamically loading all of the images in the shopItems list.
function addNextImage(key) {
    let nextItem = this.shopItems[this.displayIndex++];

    if(nextItem) {
        console.log("Loading Image: ", nextItem.name);
        this.load.image(nextItem.name);
    }
}