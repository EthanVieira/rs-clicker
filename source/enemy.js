import { HealthBar } from "./healthBar.js";

export class Enemy {
	healthBar;
	enemy;
	blueHitsplat;
	redHitsplat;
	hitsplatText = '1';
	scene;
	killGold;
	constructor(data){
		// Add enemy
		this.enemy = data.scene.add.image(data.x, data.y, data.imageName);
        this.enemy.setOrigin(.5,0).setDepth(2).setScale(.5);
        this.enemy.setInteractive();
        this.enemy.on("pointerup", ()=>{
        	this.clickEnemy();
        })

        // Add hitsplats
        this.blueHitsplat = data.scene.add.image(data.x, data.y + 50, 'blue-hitsplat').setOrigin(.5,0).setDepth(3);
        this.blueHitsplat.setScale(.3);
	    this.blueHitsplat.visible = false;

	    this.redHitsplat = data.scene.add.image(data.x, data.y + 50, 'red-hitsplat').setOrigin(.5,0).setDepth(3);
	    this.redHitsplat.setScale(.3);
	    this.redHitsplat.visible = false;

	    this.hitsplatText = data.scene.add.text(data.x, data.y + 100, '1', {fill: 'white'});
	    this.hitsplatText.setOrigin(.5,0).setDepth(4);
	    this.hitsplatText.visible = false;

	    // Add health bar
        this.healthBar = new HealthBar(data.scene, data.x, data.y - 40, data.maxHealth);

        // Set other vars
        this.killGold = data.killGold;
        this.scene = data.scene;
	}
	clickEnemy(){
		// Display hit
		let hitValue = Math.floor( Math.random()*2 ); // Currently just 50-50 chance 0/1
		this.hitsplatText.text = hitValue;
		hitValue == 0 ? this.blueHitsplat.visible = true : this.redHitsplat.visible = true; 
		this.hitsplatText.visible = true;

		// Get bonus gold for using mouseclick to encourage user interaction
		this.scene.gold += hitValue;
		this.scene.goldText.text = 'Gold: ' + this.scene.gold;

		// Lower health and check life
		this.damageEnemy(hitValue);

		// Hide hitsplat
		let _this = this;	// Gross scope workaround
		setTimeout(function(){
			_this.redHitsplat.visible = false;
			_this.blueHitsplat.visible = false;
			_this.hitsplatText.visible = false;
		}, 200);
	}
	damageEnemy(damage){
		// Lower health and check status
		let isDead = this.healthBar.updateHealth(damage);
		
		// Give extra gold if unit is killed
		if (isDead){
			this.scene.gold += this.killGold;
			this.scene.goldText.text = 'Gold: ' + this.scene.gold;
			console.log("Enemy killed, getting " + this.killGold + " extra gold");

		}
	}

}