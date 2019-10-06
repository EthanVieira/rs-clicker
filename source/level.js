import { CONSTANTS } from "./constants.js";
import { Enemy } from "./enemy.js";
import { AutoClicker } from "./autoClicker.js";

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
    timeDelta = 0;
    // Character
    characterData = {
        gold: 0,
        characterClass: '',
        totalEnemiesKilled: 0,
        timesClicked: 0,
        damageByClicking: 0,
        damageByAutoClick: 0,
        numberOfAutoClickers: 0,
        // Can be accessed with characterData[this.background.name].questCompleted, etc.
        tutorialIsland: {
            questCompleted: false,
            enemiesKilled: 0
        },
        lumbridge: {
            questCompleted: false,
            enemiesKilled: 0
        },
        varrock: {
            questCompleted: false,
            enemiesKilled: 0
        }
    };
    // Autoclickers
    autoClickers = [];
    autoClickDps = 0;
    // Enemy
    enemySettings = { // From constructor
        name: '',
        path: ''
    } 
    enemy;
    // Text
    goldText = '';
    enemiesKilledText;
    timesClickedText;
    damageByClickingText;
    damageByAutoClickText;
    autoClickDpsText;
    // Level completion
    killQuest = 0;
    killQuestText = '';
    questCompleteText = '';
    constructor(data) {
        super({
            key: data.key
        })

        // Get data from child class
        this.killQuest = data.killQuest;
        this.background = data.background;
        this.minimap = data.minimap;
        this.enemySettings = data.enemy;
    }
    init(characterData) {
        // Always receive character class
        this.characterData.characterClass = characterData.characterClass;

        // Receive cookies if they exist
        if (characterData.hasCookies){
            this.characterData = characterData;
        }
    }
    preload(){
        // Background
        this.load.image(this.background.name, this.background.path);

        // Minimap
        this.load.image(this.minimap.name, this.minimap.path);

        // Overlay
        this.load.image('overlay', 'source/assets/InterfaceNoChat.png');

        // Enemy
        this.load.image(this.enemySettings.name, this.enemySettings.path);
        this.load.image('blue-hitsplat', 'source/assets/BlueHitsplat.png');
        this.load.image('red-hitsplat', 'source/assets/RedHitsplat.png');

        // Class
        this.load.image(CONSTANTS.CLASS.UNARMED, 'source/assets/sprites/Unarmed.png');
        this.load.image(CONSTANTS.CLASS.WARRIOR, 'source/assets/sprites/Warrior.png');
        this.load.image(CONSTANTS.CLASS.RANGER, 'source/assets/sprites/Ranger.png');
        this.load.image(CONSTANTS.CLASS.MAGE, 'source/assets/sprites/Mage.jpg');
    }
    create(){
        console.log(this.characterData.characterClass);
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
            for (let i = 0; i < this.autoClickers.length; i++) {
                this.autoClickers[i].release();
            }
            this.autoClickers = [];
            this.scene.start(CONSTANTS.SCENES.MAP, this.characterData); 
            console.log("Going to World Map");     
        })

        // Overlay
        this.add.image(0,0, 'overlay').setOrigin(0,0).setDepth(1);

        // Class picture
        this.add.image(0, 250, this.characterData.characterClass).setOrigin(0,0).setDepth(2);

        // Gold
        this.goldText = this.add.text(20, 20, 'Gold: ' + this.characterData.gold, {fill: 'gold', fontSize: '30px'}).setDepth(3);
    
        // Create enemy
        this.enemy = new Enemy({
            scene: this,
            x: this.width/2-100,
            y: this.height/2-115,
            maxHealth: this.enemySettings.maxHealth,
            name: this.enemySettings.name,
            killGold: this.enemySettings.killGold
        });

        // Button text to test autoclickers
        let autoClickerButton = this.add.text(530, 250, '50 gold for autoclicker', {fill: 'white'}).setDepth(3);
        autoClickerButton.setInteractive();
        autoClickerButton.on("pointerup", ()=>{
            if (this.characterData.gold >= 50) {
                this.addGold(-50);
                this.createAutoClicker({dps: 5, level: 1, type: 'Hired Bowman'});
            }           
        });

        // Create kill quest
        this.killQuestText = this.add.text(530, 270, this.characterData[this.background.name].enemiesKilled + "/" + this.killQuest + " " + this.enemySettings.name + "s killed", {fill: 'white'}).setDepth(3);
        this.questCompleteText = this.add.text(530, 290, 'Quest complete!', {fill: 'white'}).setDepth(3);

        // Hide text if level quest has not been completed
        if (!this.characterData[this.background.name].questCompleted) {
            this.questCompleteText.visible = false;
        }

        // Show stats
        let statColor = 'white';
        this.enemiesKilledText = this.add.text(20, 60, "Enemies killed: " + this.characterData.totalEnemiesKilled, {fill: statColor}).setDepth(3);
        this.timesClickedText = this.add.text(20, 75, "Times clicked: " + this.characterData.timesClicked, {fill: statColor}).setDepth(3);
        this.damageByClickingText = this.add.text(20, 90, "Damage done by clicking: " + this.characterData.damageByClicking, {fill: statColor}).setDepth(3);
        this.damageByAutoClickText = this.add.text(20, 105, "Damage done by autoclickers: " + this.characterData.damageByAutoClick, {fill: statColor}).setDepth(3);
        this.autoClickDpsText = this.add.text(20, 120, "AutoClicker DPS: " + this.autoClickDps, {fill: statColor}).setDepth(3);
       
        // Re-add autoclickers from cookies on first load
        if (this.characterData.hasCookies && this.autoClickers.length == 0){
            let numAutoClickers = this.characterData.numberOfAutoClickers;
            this.characterData.numberOfAutoClickers = 0;
            this.autoClickDps = 0;
            this.updateAutoClickerDPS(0);
            for (let i = 0; i < numAutoClickers; i++) {
                this.createAutoClicker({dps: 5, level: 1, type: 'Hired Bowman'});
            }
        }
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
    enemyKilled(){
        // Update kill quest score
        if (this.characterData[this.background.name].enemiesKilled < this.killQuest) {
            this.characterData.totalEnemiesKilled++;
            this.characterData[this.background.name].enemiesKilled++;
            this.killQuestText.text = this.characterData[this.background.name].enemiesKilled + "/" + this.killQuest + " " + this.enemySettings.name + "s killed";

            // Check quest completion
            if (this.characterData[this.background.name].enemiesKilled == this.killQuest){
                this.questCompleteText.visible = true;
                this.characterData[this.background.name].questCompleted = true;
                console.log("Quest complete!");
            }
        }
        this.enemiesKilledText.text = "Enemies killed: " + this.characterData.totalEnemiesKilled;
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
    updateAutoClickerDPS(dps){
        this.autoClickDps += dps;
        this.autoClickDpsText.text = "AutoClicker DPS: " + this.autoClickDps;
    }
    createAutoClicker(data){
        let autoClicker = new AutoClicker({
            scene: this,
            dps: data.dps,
            level: data.level,
            type: data.type
        });
        this.autoClickers.push(autoClicker);
        this.updateAutoClickerDPS(data.dps);
        this.characterData.numberOfAutoClickers++;
    }
    
}