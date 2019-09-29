import { CONSTANTS } from "./constants.js";
import { Enemy } from "./enemy.js";
import { AutoClicker } from "./autoClicker.js";

// Parent level class
export class Level extends Phaser.Scene{
    // General
	width = 0;
	height = 0;
    background;
    minimap;
    timeDelta = 0;
    // Money
	gold = 0;
	goldText = '';
    // Character
	characterClass = '';
    autoClickers = [];
    // Enemy
	enemy;
    enemyObj;
	// Stats
	enemiesKilled = 0;
    timesClicked = 0;
    damageByClicking = 0;
    damageByAutoClick = 0;
    autoClickDps = 0;
    //Stats text
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
        this.enemy = data.enemy;
    }
    init(characterData) {
        // Always receive character class
        this.characterClass = characterData.characterClass;

        // Receive cookies if they exist
        if (characterData.hasCookies){
            this.gold = characterData.gold;
            this.enemiesKilled = characterData.enemiesKilled;
            this.timesClicked = characterData.timesClicked;
            this.damageByClicking = characterData.damageByClicking;
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
		this.load.image(this.enemy.name, this.enemy.path);
        this.load.image('blue-hitsplat', 'source/assets/Blue_Hitsplat.png');
        this.load.image('red-hitsplat', 'source/assets/Red_Hitsplat.png');

		// Class
		this.load.image(CONSTANTS.CLASS.UNARMED, 'source/assets/unarmed.png');
        this.load.image(CONSTANTS.CLASS.WARRIOR, 'source/assets/iron_armor.png');
        this.load.image(CONSTANTS.CLASS.RANGER, 'source/assets/oak_bow.png');
        this.load.image(CONSTANTS.CLASS.MAGE, 'source/assets/blue_robe.jpg');
    }
    create(){
    	console.log(this.characterClass);
    	// Helper vars
    	this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

    	// Background
        this.add.image(0,0, this.background.name).setOrigin(0,0).setDepth(0);

        // Minimap
        this.minimap.obj = this.add.image(526,0, this.minimap.name).setOrigin(0,0).setDepth(0);
        this.minimap.obj.setInteractive();
        this.minimap.obj.on("pointerup", ()=>{
            this.scene.start(CONSTANTS.SCENES.MAP, {
                characterClass: this.characterClass, 
                gold: this.gold,
                enemiesKilled: this.enemiesKilled,
                timesClicked: this.timesClicked,
                damageByClicking: this.damageByClicking
            }); 
            console.log("Going to World Map");     
        })

        // Overlay
        this.add.image(0,0, 'overlay').setOrigin(0,0).setDepth(1);

        // Class picture
        this.add.image(0, 250, this.characterClass).setOrigin(0,0).setDepth(2);

        // Gold
        this.goldText = this.add.text(20, 20, 'Gold: ' + this.gold, {fill: 'gold', fontSize: '30px'}).setDepth(3);
    
    	// Create enemy
    	this.enemyObj = new Enemy({
    		scene: this,
    		x: this.width/2-100,
    		y: this.height/2-115,
    		maxHealth: this.enemy.maxHealth,
    		name: this.enemy.name,
    		killGold: this.enemy.killGold
    	});

    	// Button text to test autoclickers
    	let autoClickerButton = this.add.text(530, 250, '50 gold for autoclicker', {fill: 'white'}).setDepth(3);
    	autoClickerButton.setInteractive();
    	autoClickerButton.on("pointerup", ()=>{
    		if (this.gold >= 50) {
    			this.addGold(-50);

                let dps = 5;
                let level = 1;
                let type = 'Hired Bowman';

    			let autoClicker = new AutoClicker({
	        		scene: this,
	        		dps: dps,
	        		level: level,
	        		type: type
	        	});
	        	this.autoClickers.push(autoClicker);
                this.updateAutoClickerDPS(dps);
    		}       	
        });

        // Create kill quest
        this.killQuestText = this.add.text(530, 270, this.enemiesKilled + "/" + this.killQuest + " " + this.enemy.name + "s killed", {fill: 'white'}).setDepth(3);
        this.questCompleteText = this.add.text(530, 290, 'Quest complete!', {fill: 'white'}).setDepth(3);
        this.questCompleteText.visible = false;

        // Show stats
        let statColor = 'white';
        this.enemiesKilledText = this.add.text(20, 60, "Enemies killed: " + this.enemiesKilled, {fill: statColor}).setDepth(3);
        this.timesClickedText = this.add.text(20, 75, "Times clicked: " + this.timesClicked, {fill: statColor}).setDepth(3);
        this.damageByClickingText = this.add.text(20, 90, "Damage done by clicking: " + this.damageByClicking, {fill: statColor}).setDepth(3);
        this.damageByAutoClickText = this.add.text(20, 105, "Damage done by autoclickers: " + this.damageByAutoClick, {fill: statColor}).setDepth(3);
        this.autoClickDpsText = this.add.text(20, 120, "AutoClicker DPS: " + this.autoClickDps, {fill: statColor}).setDepth(3);
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
        // Lasts for one year
        let cookieExpirationDate = 365; 
        let dateTime = new Date();
        dateTime.setTime(dateTime.getTime() + (cookieExpirationDate*24*60*60*1000));
        let expireString = 'expires=' + dateTime.toUTCString();

        // Store all data
        let cookieArray = [ 
            {name: "gold", value: this.gold},
            {name: "characterClass", value: this.characterClass},
            {name: "enemiesKilled", value: this.enemiesKilled},
            {name: "timesClicked", value: this.timesClicked},
            {name: "damageByClicking", value: this.damageByClicking},
        ];
        //document.cookie = "";
        cookieArray.forEach((data) => {
            document.cookie = data.name + "=" + data.value + ";" + expireString + ";path=/;";
        });

    }
    addGold(addedGold){
        this.gold += addedGold;
        this.goldText.text = 'Gold: ' + this.gold;
    }
    enemyKilled(){
        // Update kill quest score
        if (this.enemiesKilled < this.killQuest) {
            this.enemiesKilled++;
            this.killQuestText.text = this.enemiesKilled + "/" + this.killQuest + " " + this.enemy.name + "s killed";

            // Check quest completion
            if (this.enemiesKilled == this.killQuest){
                this.questCompleteText.visible = true;
                console.log("Quest complete!");
            }
        }
        this.enemiesKilledText.text = "Enemies killed: " + this.enemiesKilled;
    }
    updateClickedEnemyStat(){
        this.timesClicked++;
        this.timesClickedText.text = "Times clicked: " + this.timesClicked;
    }
    updateClickDamageStat(damageDone){
        this.damageByClicking += damageDone;
        this.damageByClickingText.text = "Damage done by clicking: " + this.damageByClicking;
    }
    updateAutoClickDamageStat(damageDone){
        this.damageByAutoClick += damageDone;
        this.damageByAutoClickText.text = "Damage done by autoclickers: " + Math.floor(this.damageByAutoClick);
    }
    updateAutoClickerDPS(dps){
        this.autoClickDps += dps;
        this.autoClickDpsText.text = "AutoClicker DPS: " + this.autoClickDps;
    }
	
}