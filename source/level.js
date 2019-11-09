import { CONSTANTS } from "./constants.js";

// Parent level class
export class Level extends Phaser.Scene{
    // General
    width = 0;
    height = 0;
    background = {
        name: '',
        path: ''
    }
    minimap = {
        name: '',
        path: ''
    }
    inventory = {
        button: {}
    }
    audio = {
        bgm: '',
        audioPage: {},
        audioPageButton: {},
        sliders: [],
        audioButtons: []
    }
    timeDelta = 0;
    // Click object: enemy, tree, etc.
    clickObjects = [];
    clickObjectMetaData = [];
    currentClickObjectIndex = 0;
    // Character
    characterData = {
        gold: 0,
        characterClass: '',
        totalEnemiesKilled: 0,
        timesClicked: 0,
        damageByClicking: 0,
        damageByAutoClick: 0,
        numberOfAutoClickers: 0,
        skills: {
            woodcutting: 1,
            mining: 1,
            attack: 1,
            strength: 1,
            defense: 1,
            hitpoints: 10,
            ranged: 1,
            magic: 1,
            herblore: 1
        }, 
        audio: [2, 2, 2],   // BGM, SFX, Environment
        // Can be accessed with characterData[this.currentLevel].questCompleted, etc.
        TUTORIAL_ISLAND: {
            questCompleted: false,
            enemiesKilled: {
                rat: 0,
            }
        },
        LUMBRIDGE: {
            questCompleted: false,
            enemiesKilled: {
                cow: 0,
                goblin: 0
            }
        },
        VARROCK: {
            questCompleted: false,
            enemiesKilled: {
                wizard: 0
            }
        }
    };
    // Text
    goldText = '';
    enemiesKilledText;
    timesClickedText;
    damageByClickingText;

    constructor(data) {
        super({
            key: data.key
        })

        // Get data from child class
        this.background = data.background;
        this.minimap = data.minimap;
        this.audio = data.audio;
        this.clickObjectMetaData = data.clickObjects;

        // Store current level to return to after leaving shop
        this.currentLevel = data.key;
    }

    init(characterData) {
        // Always receive character class
        this.characterData.characterClass = characterData.characterClass;

        // Receive cookies if they exist
        if (characterData.hasCookies){
            this.characterData = characterData;
        }
        // Otherwise, initialize character based on starting class
        else {
            switch(this.characterData.characterClass) {
                case("WARRIOR"):
                    this.characterData.skills.attack = 5;
                    this.characterData.skills.strength = 5;
                    this.characterData.skills.defense = 5;
                    break;
                case("RANGER"):
                    this.characterData.skills.ranged = 10;
                    break;
                case("MAGE"):
                    this.characterData.skills.magic = 10;
                    break;
            }
        }
    }

    preload(){
        // Background
        this.load.image(this.background.name, this.background.path);

        // Minimap
        this.load.image(this.minimap.name, this.minimap.path);

        // Overlay
        this.load.image('overlay', 'source/assets/InterfaceNoChat.png');

        // Click object (target)
        this.clickObjectMetaData.forEach((target) => {
            this.load.image(target.name, target.path);
        });

        // Inventory icon
        this.load.image('inventoryButton', 'source/assets/InventoryButton.png');

        // Audio panel
        this.load.image('audioSettings', 'source/assets/AudioSettings.png');
        this.load.image('audioSettingsButton', 'source/assets/AudioSettingsButton.png');
        this.load.image('audioSlider', 'source/assets/audioSlider.png');
        this.load.image('audioButton', 'source/assets/AudioButton.png');

        // Classes
        this.load.image(CONSTANTS.CLASS.UNARMED, 'source/assets/sprites/Unarmed.png');
        this.load.image(CONSTANTS.CLASS.WARRIOR, 'source/assets/sprites/Warrior.png');
        this.load.image(CONSTANTS.CLASS.RANGER, 'source/assets/sprites/Ranger.png');
        this.load.image(CONSTANTS.CLASS.MAGE, 'source/assets/sprites/Mage.jpg');

        // Call preload function for inherited class
        this.childPreload();
    }

    create(){
        console.log(this.characterData.characterClass);
        // Play music
        let audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);
        audioScene.playAudio(this.audio.bgm);

        // Initialize volume levels
        audioScene.changeVolume(0, this.characterData.audio[0]);
        audioScene.changeVolume(1, this.characterData.audio[1]);
        audioScene.changeVolume(2, this.characterData.audio[2]);

        // Helper vars
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // Background
        this.add.image(0,0, this.background.name).setOrigin(0,0).setDepth(0);

        // Minimap
        this.minimap.obj = this.add.image(526,0, this.minimap.name).setOrigin(0,0).setDepth(0);
        this.minimap.obj.setInteractive();
        this.minimap.obj.on("pointerup", ()=>{
            // Release autoclickers to be garbage collected
            this.clearAutoClickers();
            this.scene.start(CONSTANTS.SCENES.MAP, this.characterData); 
            console.log("Going to World Map");     
        })

        // Shop
        this.shopButton = this.add.text(585, 475, 'Shop').setInteractive();
        this.shopButton.on("pointerup", ()=>{
            // Release autoclickers to be garbage collected
            this.clearAutoClickers();
            // Pass in the current level to know which level to return to upon exiting the shop.
            this.scene.start(CONSTANTS.SCENES.SHOP, [this.characterData, this.currentLevel]);
            // TODO: Instead of starting a shop scene, just have a shop interface pop up w/o stopping game.
            console.log("Going to Shop");
        })

        // Overlay
        this.add.image(0,0, 'overlay').setOrigin(0,0).setDepth(1);

        // Inventory
        this.inventory.button = this.add.image(626, 169, 'inventoryButton').setOrigin(0,0).setDepth(2);
        this.inventory.button.setInteractive();
        this.inventory.button.setAlpha(.1);
        this.inventory.button.on("pointerup", () =>{
            this.hideAllMenus();
            this.inventory.button.setAlpha(.1);
        })

        // Audio settings
        let audioWindowX = 550;
        let audioWindowY = 205;
        this.audio.audioPage = this.add.image(audioWindowX, audioWindowY, 'audioSettings').setOrigin(0,0).setDepth(1);
        this.audio.audioPageButton = this.add.image(660, 465, 'audioSettingsButton').setOrigin(0,0).setDepth(2);
        this.audio.audioPageButton.setInteractive();
        this.audio.audioPageButton.on("pointerup", ()=>{
            this.showAudioSettings(true);
        })

        // Place sliders
        let barXOffset = 53;
        this.audio.sliders = [];
        this.audio.sliders.push(this.add.image(audioWindowX + barXOffset, audioWindowY + 80, 'audioSlider').setOrigin(0,0).setDepth(2));
        this.audio.sliders.push(this.add.image(audioWindowX + barXOffset, audioWindowY + 125, 'audioSlider').setOrigin(0,0).setDepth(2));
        this.audio.sliders.push(this.add.image(audioWindowX + barXOffset, audioWindowY + 170, 'audioSlider').setOrigin(0,0).setDepth(2));

        // Set 5 buttons for each of the 3 sliders
        this.audio.audioButtons = [];
        for (let volumeType = 0; volumeType < 3; volumeType++) {
            let audioButtonRow = [];
            for (let buttonNum = 0; buttonNum < 5; buttonNum++) {
                let audioButton = this.add.image(audioWindowX + barXOffset + 10 + (buttonNum * 22), audioWindowY + 80 + (volumeType * 45), 'audioButton').setOrigin(0,0).setDepth(3);
                audioButton.setInteractive();
                audioButton.setAlpha(.1);
                audioButtonRow.push(audioButton);
                audioButton.on("pointerup", ()=>{
                    audioScene.changeVolume(volumeType, buttonNum);
                    this.changeAudioButton(volumeType, buttonNum);
                })
            }
            // Save 2d array of buttons (3 x 5)
            this.audio.audioButtons.push(audioButtonRow);
        }
        // Hide audio page on startup
        this.showAudioSettings(false);

        // Class picture
        this.add.image(0, 250, this.characterData.characterClass).setOrigin(0,0).setDepth(2);

        // Gold
        this.goldText = this.add.text(20, 20, 'Gold: ' + this.characterData.gold, {fill: 'gold', fontSize: '30px'}).setDepth(3);

        // Show stats
        let statColor = 'white';
        this.enemiesKilledText = this.add.text(20, 60, "Enemies killed: " + this.characterData.totalEnemiesKilled, {fill: statColor}).setDepth(3);
        this.timesClickedText = this.add.text(20, 75, "Times clicked: " + this.characterData.timesClicked, {fill: statColor}).setDepth(3);
        this.damageByClickingText = this.add.text(20, 90, "Damage done by clicking: " + this.characterData.damageByClicking, {fill: statColor}).setDepth(3);
        this.damageByAutoClickText = this.add.text(20, 105, "Damage done by autoclickers: " + this.characterData.damageByAutoClick, {fill: statColor}).setDepth(3);

        // Call create function for inherited class
        this.childCreate();

        // Display click object
        this.showRandomClickObject();
    }

    update(time, delta){
        // Update cookies every second
        if (this.timeDelta >= 1000) {
            this.storeCookies();
            this.timeDelta = 0;
        }
        else {
            this.timeDelta += delta;
        }
    }

    storeCookies(){
        this.characterData.hasCookies = true;

        // Lasts for one year
        let cookieExpirationDate = 365; 
        let dateTime = new Date();
        dateTime.setTime(dateTime.getTime() + (cookieExpirationDate*24*60*60*1000));
        let expireString = 'expires=' + dateTime.toUTCString();

        // Turn characterData into a json string and store it in a cookie
        let jsonString = JSON.stringify(this.characterData);
        document.cookie = "characterData=" + jsonString + ";" + expireString + ";path=/;";
    }

    addGold(addedGold){
        this.characterData.gold += addedGold;
        this.goldText.text = 'Gold: ' + this.characterData.gold;
    }

    updateClickedEnemyStat(){
        this.characterData.timesClicked++;
        this.timesClickedText.text = "Times clicked: " + this.characterData.timesClicked;
    }

    updateClickDamageStat(damageDone){
        this.characterData.damageByClicking += damageDone;
        this.damageByClickingText.text = "Damage done by clicking: " + this.characterData.damageByClicking;
    }

    updateAutoClickDamageStat(damageDone){
        this.characterData.damageByAutoClick += damageDone;
        this.damageByAutoClickText.text = "Damage done by autoclickers: " + Math.floor(this.characterData.damageByAutoClick);
    }

    showAudioSettings(show) {
        if (show) {
            this.hideAllMenus();
            // Show audio page
            this.audio.audioPage.visible = true;
            this.audio.audioPageButton.setAlpha(1);
            this.audio.sliders.forEach((slider) => {
                slider.visible = true;
            })
            this.audio.audioButtons.forEach((buttonRow) => {
                buttonRow.forEach((button) => {
                    button.visible = true;
                })
            })

            // Show current volume buttons
            this.characterData.audio.forEach((volume, volumeType) => {
                this.audio.audioButtons[volumeType][volume].setAlpha(1);
            })
        }
        else {
            this.audio.audioPage.visible = false;
            this.audio.audioPageButton.setAlpha(.1);
            this.audio.sliders.forEach((slider) => {
                slider.visible = false;
            })
            this.audio.audioButtons.forEach((buttonRow) => {
                buttonRow.forEach((button) => {
                    button.visible = false;
                })
            })
        }
    }

    // Hide old button and show new one
    changeAudioButton(volumeType, newButton) {
        let previousVolume = this.characterData.audio[volumeType];
        this.audio.audioButtons[volumeType][previousVolume].setAlpha(.1);
        this.characterData.audio[volumeType] = newButton;
        this.audio.audioButtons[volumeType][newButton].setAlpha(1);
    }

    hideAllMenus() {
        this.showAudioSettings(false);
        this.inventory.button.setAlpha(1); // Unselected inventory icon
    }

    showRandomClickObject() {
        this.clickObjects[this.currentClickObjectIndex].hide();
        this.currentClickObjectIndex = Math.floor(Math.random() * this.clickObjectMetaData.length);
        this.clickObjects[this.currentClickObjectIndex].show();
    }

    updateAutoClickerDPS(dps){
        this.autoClickDps += dps;
        this.autoClickDpsText.text = "AutoClicker DPS: " + this.autoClickDps;
    }

    // Used by autoclicker
    clickCurrentTarget(damage) {
        this.clickObjects[this.currentClickObjectIndex].damageEnemy(damage);
    }

    // Need to clear data before changing scenes
    clearAutoClickers() {
        for (let i = 0; i < this.autoClickers.length; i++) {
            this.autoClickers[i].release();
        }
        this.autoClickers = [];
        this.clickObjects = [];
    }
}