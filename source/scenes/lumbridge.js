import { CONSTANTS } from "../constants.js";
import { Enemy } from "../enemy.js";
import { AutoClicker } from "../autoClicker.js";

export class Lumbridge extends Phaser.Scene{
	width = 0;
	height = 0;
	hitsplatText = '1';
	gold = 0;
	goldText = '';
	characterClass = '';
	enemy;
	enemyName = 'cow';
	autoClickers = [];
	enemiesKilled = 0;
	killQuest = 10;
	killQuestText = '';
	questCompleteText = '';
    constructor() {
        super({
            key: CONSTANTS.SCENES.LUMBRIDGE
        })
    }
    init(characterData) {
        if (characterData){
        	this.characterClass = characterData.characterClass;
        }
    }
    preload(){
        // Once again just loading stuff here until load state gets figured out
		this.load.image('lvl1-bg', 'source/assets/lvl1bg.png');

		// Enemy
		this.load.image('cow', 'source/assets/sprites/cow.png');

		// Damage
		this.load.image('red-hitsplat', 'source/assets/Red_Hitsplat.png');
		this.load.image('blue-hitsplat', 'source/assets/Blue_Hitsplat.png');

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
        this.add.image(0,0, 'lvl1-bg').setOrigin(0,0).setDepth(0);

        // Class picture
        this.add.image(0, 0, this.characterClass).setOrigin(0,0).setDepth(1);

        // Gold
        this.goldText = this.add.text(20, 20, 'Gold: ' + this.gold, {fill: 'gold'}).setDepth(3);
    
    	// Create enemy
    	this.enemy = new Enemy({
    		scene: this,
    		x: this.width/2,
    		y: this.height/2,
    		maxHealth: 20,
    		imageName: 'cow',
    		enemyName: this.enemyName,
    		killGold: 5
    	});

    	// Button text to test autoclickers
    	let autoClickerButton = this.add.text(this.width/2, 40, '50 gold for autoclicker', {fill: 'red'}).setDepth(3);
    	autoClickerButton.setInteractive();
    	autoClickerButton.on("pointerup", ()=>{
    		if (this.gold >= 50) {
    			this.gold -= 50;

    			let autoClicker = new AutoClicker({
	        		scene: this,
	        		dps: 5,
	        		level: 1,
	        		type: 'Hired Bowman'
	        	});
	        	this.autoClickers.push(autoClicker);
    		}       	
        });

        // Create kill quest
        this.killQuestText = this.add.text(this.width/2, 100, this.enemiesKilled + "/" + this.killQuest + " " + this.enemyName + "s killed", {fill: 'orange'}).setDepth(3);
        this.questCompleteText = this.add.text(this.width/2, 70, 'Quest complete!', {fill: 'orange'}).setDepth(3);
        this.questCompleteText.visible = false;
    }
	
}