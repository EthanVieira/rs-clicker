Level1 = function () {};
// Upgrades
var purchases = {
	weapons: weapons,
	spells: spells,
	ranged: ranged
}

var spells = ["Air Strike", "Water Blast", "High Alc", "Earth Wave", "Blood Barrage", "Ice Barrage", "Fire Surge"];
var weapons = ["Dagger", "Sword", "Halberd", "Battle Axe", "Scimitar"];
var ranged = ["Shortbow", "Oak Shortbow", "Willow Shortbow", "Maple Shortbow", "Yew Shortbow", "Magic Shortbow", "Crystal Bow"];
var ores = ["Bronze", "Iron", "Steel", "Mithril", "Adamant", "Rune", "Dragon"];

// Player
var player = {
	level: 1,
	gold: 0,
	goldPerSec: 0
}

// Game objects
var gameWindow = {
	enemy: null,
	background: null,
	scoreText: null,
	redHitsplat: null,
	blueHitsplat: null,
	hitsplatText: null
}

Level1.prototype = {
  preload: function () {

    /*game.load.image('background', 'src/assets/MenuBg.png');
    game.load.image('loading', 'src/assets/loading.png');
    game.load.image('button', 'src/assets/chicken.jpg');*/


    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //game.scale.pageAlignVertically = true;
    //game.scale.setScreenSize( true );
  },

  create: function () {

  	// Background
  	gameWindow.background = game.add.image(game.world.centerX, game.world.centerY, 'background');
  	gameWindow.background.anchor.setTo(0.5);

  	// Enemy
  	gameWindow.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy');
    gameWindow.enemy.anchor.setTo(0.5);
  	gameWindow.enemy.inputEnabled = true;
  	gameWindow.scoreText = game.add.text(game.world.width - 200, 20, 'Gold: 0', {fontSize: '32px', fill: '#999'});
  	gameWindow.enemy.events.onInputDown.add(clickEnemy, this);

    // Hitsplat
    gameWindow.redHitsplat = game.add.sprite(game.world.centerX, game.world.centerY, 'red-hitsplat');
    gameWindow.redHitsplat.anchor.setTo(0.5);
    gameWindow.redHitsplat.visible = false;
    gameWindow.redHitsplat.scale.setTo(.5, .5);
    
    gameWindow.blueHitsplat = game.add.sprite(game.world.centerX, game.world.centerY, 'blue-hitsplat');
    gameWindow.blueHitsplat.anchor.setTo(0.5);
    gameWindow.blueHitsplat.visible = false;
    gameWindow.blueHitsplat.scale.setTo(.5, .5);

    gameWindow.hitsplatText = game.add.text(game.world.centerX-10, game.world.centerY-10, '1', {fill: 'white'});
    gameWindow.hitsplatText.visible = false;
  }
}

function clickEnemy(){
	// Display hit
	let hitValue = Math.floor( Math.random()*2 ); // Currently just 50-50 chance 0/1
	gameWindow.hitsplatText.text = hitValue
	hitValue == 0 ? gameWindow.blueHitsplat.visible = true : gameWindow.redHitsplat.visible = true; 
	gameWindow.hitsplatText.visible = true;
	player.gold += hitValue;
	gameWindow.scoreText.text = 'Gold: ' + player.gold;

	// Hide hitsplat
	setTimeout(function(){
		gameWindow.redHitsplat.visible = false;
		gameWindow.blueHitsplat.visible = false;
		gameWindow.hitsplatText.visible = false;
	}, 100);
}


/*function over(){
	console.log('Button over');
	console.log(window.innerWidth, window.devicePixelRatio, window.innerHeight);
}
function up(){
	console.log('Button up', arguments);
}
function out(){
	console.log('Button out');
}
function actionOnClick(){
	background.visible =! background.visible;
} */

// function update() {}
