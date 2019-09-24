import { CONSTANTS } from "./constants.js";
import { Enemy } from "./enemy.js";
import { AutoClicker } from "./autoClicker.js";

// Parent level class
export class Level extends Phaser.Scene{
    // General
	width = 0;
	height = 0;
    background;
    // Money
	gold = 0;
	goldText = '';
    // Character
	characterClass = '';
    autoClickers = [];
    // Enemy
	enemy;
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
        this.enemy = data.enemy;
    }
    init(characterData) {
        if (characterData){
        	this.characterClass = characterData.characterClass;
        }
    }
    preload(){
        // Background
		this.load.image(this.background.name, this.background.path);

		// Enemy
		this.load.image(this.enemy.name, this.enemy.path);
        this.load.image('blue-hitsplat', 'source/assets/Blue_Hitsplat.png');
        this.load.image('red-hitsplat', 'source/assets/Red_Hitsplat.png');

		// Class
		this.load.image(CONSTANTS.CLASS.UNARMED, 'source/assets/unarmed.jpg');
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

        // Class picture
        this.add.image(0, 0, this.characterClass).setOrigin(0,0).setDepth(1);

        // Gold
        this.goldText = this.add.text(20, 20, 'Gold: ' + this.gold, {fill: 'gold'}).setDepth(3);
    
    	// Create enemy
    	this.enemy = new Enemy({
    		scene: this,
    		x: this.width/2,
    		y: this.height/2,
    		maxHealth: this.enemy.maxHealth,
    		name: this.enemy.name,
    		killGold: this.enemy.killGold
    	});

    	// Button text to test autoclickers
    	let autoClickerButton = this.add.text(this.width/2, 40, '50 gold for autoclicker', {fill: 'red'}).setDepth(3);
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
        this.killQuestText = this.add.text(this.width/2, 100, this.enemiesKilled + "/" + this.killQuest + " " + this.enemy.name + "s killed", {fill: 'orange'}).setDepth(3);
        this.questCompleteText = this.add.text(this.width/2, 70, 'Quest complete!', {fill: 'orange'}).setDepth(3);
        this.questCompleteText.visible = false;

        // Show stats
        this.enemiesKilledText = this.add.text(20, 100, "Enemies killed: " + this.enemiesKilled, {fill: 'blue'}).setDepth(3);
        this.timesClickedText = this.add.text(20, 150, "Times clicked: " + this.timesClicked, {fill: 'blue'}).setDepth(3);
        this.damageByClickingText = this.add.text(20, 200, "Damage done by clicking: " + this.damageByClicking, {fill: 'blue'}).setDepth(3);
        this.damageByAutoClickText = this.add.text(20, 250, "Damage done by autoclickers: " + this.damageByAutoClick, {fill: 'blue'}).setDepth(3);
        this.autoClickDpsText = this.add.text(20, 300, "AutoClicker DPS: " + this.autoClickDps, {fill: 'blue'}).setDepth(3);
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