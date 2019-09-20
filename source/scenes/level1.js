import { CONSTANTS } from "../constants.js";
import { Enemy } from "../enemy.js";

export class Level1 extends Phaser.Scene{
	width = 0;
	height = 0;
	hitsplatText = '1';
	gold = 0;
	goldText = '';
	characterClass = '';
	enemy;
    constructor() {
        super({
            key: CONSTANTS.SCENES.LEVEL1
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
        let background = this.add.image(0,0, 'lvl1-bg').setOrigin(0,0).setDepth(0);
        background.setInteractive();

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
    		killGold: 5
    	})
    }
	
}