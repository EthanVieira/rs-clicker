import { CONSTANTS } from "../constants.js";

export class Level1 extends Phaser.Scene{
	blueHitsplat;
	redHitsplat;
	hitsplatText = '1';
	gold = 0;
	goldText = '';
	characterClass = '';
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
    	var width = this.cameras.main.width;
        var height = this.cameras.main.height;

    	// Background
        let background = this.add.image(0,0, 'lvl1-bg').setOrigin(0,0).setDepth(0);
        background.setInteractive();

        // Class picture
        this.add.image(0, 0, this.characterClass).setOrigin(0,0).setDepth(0);

        // Damage
        this.blueHitsplat = this.add.image(width/2, height/2, 'blue-hitsplat').setOrigin(0,0).setDepth(1);
        this.blueHitsplat.setScale(.3);
	    this.blueHitsplat.visible = false;

	    this.redHitsplat = this.add.image(width/2, height/2, 'red-hitsplat').setOrigin(0,0).setDepth(1);
	    this.redHitsplat.setScale(.3);
	    this.redHitsplat.visible = false;

	    this.hitsplatText = this.add.text(width/2 + 50, height/2 + 50, '1', {fill: 'white'});
	    this.hitsplatText.setOrigin(0,0).setDepth(2);
	    this.hitsplatText.visible = false;

        background.on("pointerup", ()=>{
        	this.clickEnemy();
        })

        // Gold
        this.goldText = this.add.text(20, 20, 'Gold: ' + this.gold, {fill: 'gold'}).setDepth(1);
    }
	clickEnemy(){
		// Display hit
		let hitValue = Math.floor( Math.random()*2 ); // Currently just 50-50 chance 0/1
		this.hitsplatText.text = hitValue;
		hitValue == 0 ? this.blueHitsplat.visible = true : this.redHitsplat.visible = true; 
		this.hitsplatText.visible = true;

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

// level1 = function () {};
// // Upgrades
// var purchases = {
// 	weapons: weapons,
// 	spells: spells,
// 	ranged: ranged
// }

// var spells = ["Air Strike", "Water Blast", "High Alc", "Earth Wave", "Blood Barrage", "Ice Barrage", "Fire Surge"];
// var weapons = ["Dagger", "Sword", "Halberd", "Battle Axe", "Scimitar"];
// var ranged = ["Shortbow", "Oak Shortbow", "Willow Shortbow", "Maple Shortbow", "Yew Shortbow", "Magic Shortbow", "Crystal Bow"];
// var ores = ["Bronze", "Iron", "Steel", "Mithril", "Adamant", "Rune", "Dragon"];

// // Player
// var player = {
// 	level: 1,
// 	gold: 0,
// 	goldPerSec: 0
// }

// // Game objects
// var gameWindow = {
// 	enemy: null,
// 	background: null,
// 	scoreText: null,
// 	redHitsplat: null,
// 	blueHitsplat: null,
// 	hitsplatText: null
// }

// level1.prototype = {
//   preload: function () {

//     /*game.load.image('background', 'source/assets/MenuBg.png');
//     game.load.image('loading', 'source/assets/loading.png');
//     game.load.image('button', 'source/assets/chicken.jpg');*/


//     //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     //game.scale.pageAlignVertically = true;
//     //game.scale.setScreenSize( true );
//   },

//   create: function () {

//   	// Background
//   	gameWindow.background = game.add.image(game.world.centerX, game.world.centerY, 'background');
//   	gameWindow.background.anchor.setTo(0.5);

//   	// Enemy
//   	gameWindow.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'chicken');
//     gameWindow.enemy.anchor.setTo(0.5);
//   	gameWindow.enemy.inputEnabled = true;
//   	gameWindow.scoreText = game.add.text(game.world.width - 200, 20, 'Gold: 0', {fontSize: '32px', fill: '#999'});
//   	gameWindow.enemy.events.onInputDown.add(clickEnemy, this);

//     // Hitsplat
//     gameWindow.redHitsplat = game.add.sprite(game.world.centerX, game.world.centerY, 'red-hitsplat');
//     gameWindow.redHitsplat.anchor.setTo(0.5);
//     gameWindow.redHitsplat.visible = false;
//     gameWindow.redHitsplat.scale.setTo(.5, .5);
    
//     gameWindow.blueHitsplat = game.add.sprite(game.world.centerX, game.world.centerY, 'blue-hitsplat');
//     gameWindow.blueHitsplat.anchor.setTo(0.5);
//     gameWindow.blueHitsplat.visible = false;
//     gameWindow.blueHitsplat.scale.setTo(.5, .5);

//     gameWindow.hitsplatText = game.add.text(game.world.centerX-10, game.world.centerY-10, '1', {fill: 'white'});
//     gameWindow.hitsplatText.visible = false;
//   }
// }

// function clickEnemy(){
// 	// Display hit
// 	let hitValue = Math.floor( Math.random()*2 ); // Currently just 50-50 chance 0/1
// 	gameWindow.hitsplatText.text = hitValue
// 	hitValue == 0 ? gameWindow.blueHitsplat.visible = true : gameWindow.redHitsplat.visible = true; 
// 	gameWindow.hitsplatText.visible = true;
// 	player.gold += hitValue;
// 	gameWindow.scoreText.text = 'Gold: ' + player.gold;

// 	// Hide hitsplat
// 	setTimeout(function(){
// 		gameWindow.redHitsplat.visible = false;
// 		gameWindow.blueHitsplat.visible = false;
// 		gameWindow.hitsplatText.visible = false;
// 	}, 100);
// }


// /*function over(){
// 	console.log('Button over');
// 	console.log(window.innerWidth, window.devicePixelRatio, window.innerHeight);
// }
// function up(){
// 	console.log('Button up', arguments);
// }
// function out(){
// 	console.log('Button out');
// }
// function actionOnClick(){
// 	background.visible =! background.visible;
// } */

// // function update() {}
