import { CONSTANTS } from "../constants.js";
import { HealthBar } from "../healthBar.js";

export class Level1 extends Phaser.Scene{
	width = 0;
	height = 0;
	blueHitsplat;
	redHitsplat;
	hitsplatText = '1';
	gold = 0;
	goldText = '';
	characterClass = '';
	healthBar;
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
        this.add.image(0, 0, this.characterClass).setOrigin(0,0).setDepth(0);

        // Damage
        this.blueHitsplat = this.add.image(this.width/2, this.height/2, 'blue-hitsplat').setOrigin(0,0).setDepth(1);
        this.blueHitsplat.setScale(.3);
	    this.blueHitsplat.visible = false;

	    this.redHitsplat = this.add.image(this.width/2, this.height/2, 'red-hitsplat').setOrigin(0,0).setDepth(1);
	    this.redHitsplat.setScale(.3);
	    this.redHitsplat.visible = false;

	    this.hitsplatText = this.add.text(this.width/2 + 50, this.height/2 + 50, '1', {fill: 'white'});
	    this.hitsplatText.setOrigin(0,0).setDepth(2);
	    this.hitsplatText.visible = false;

        background.on("pointerup", ()=>{
        	this.clickEnemy();
        })

        // Gold
        this.goldText = this.add.text(20, 20, 'Gold: ' + this.gold, {fill: 'gold'}).setDepth(1);

        // Health bar
        let maxHealth = 20;
        this.healthBar = new HealthBar(this, this.width, this.height, maxHealth);
    }
	clickEnemy(){
		// Display hit
		let hitValue = Math.floor( Math.random()*2 ); // Currently just 50-50 chance 0/1
		this.hitsplatText.text = hitValue;
		hitValue == 0 ? this.blueHitsplat.visible = true : this.redHitsplat.visible = true; 
		this.hitsplatText.visible = true;

		// Lower health and check status
		let isDead = this.healthBar.updateHealth(hitValue);
		console.log(isDead);

		// Increase gold
		this.gold += hitValue;
		this.goldText.text = 'Gold: ' + this.gold;

		// Hide hitsplat
		let _this = this;	// Gross scope workaround
		setTimeout(function(){
			_this.redHitsplat.visible = false;
			_this.blueHitsplat.visible = false;
			_this.hitsplatText.visible = false;
		}, 200);
	}
}