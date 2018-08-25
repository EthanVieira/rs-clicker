var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '', {
  preload: preload, create: create, update: update
});

// Upgrades
var purchases = {
	weapons: weapons,
	spells: spells,
	ranged: ranged
}

var spells = ["Air Strike", "Water Blast", "High Alc", "Earth Wave", "Blood Barrage", "Ice Barrage", "Fire Surge"];
var weapons = ["Dagger", "Sword", "Halberd", "Battle Axe", "Scimitar"];
var ranged = ["Shortbow", "Oak Shortbow", "Willow Shortbow", "Maple Shortbow", "Yew Shortbow", "Magic Shortbow", "Crystal Bow"];
var ores = ["Bronze", "Iron", "Steel", "Mithril", "Adament", "Rune", "Dragon"];

// Player
var player = {
	level: 1,
	gold: 0
}

// Game objects
var button;
var background;
var clicks = 0;
var scoreText;

function preload() {

  game.load.image('background', 'source/assets/background.png');
  game.load.image('button', 'source/assets/logo.png');

  //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  //game.scale.pageAlignVertically = true;
  //game.scale.setScreenSize( true );
}

function create() {

  background = game.add.image(game.world.centerX, game.world.centerY, 'background');
  background.anchor.setTo(0.5);

  // Button
  button = game.add.sprite(50, 50, 'button');
  button.inputEnabled = true;
  scoreText = game.add.text(16, 16, 'Clicks: 0', {fontSize: '32px', fill: '#555'});
  button.events.onInputDown.add(listener, this);

}

function listener()
{
  clicks++;
  scoreText.text = 'Clicks: ' + clicks;
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

function update() {

}
