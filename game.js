var game = new Phaser.Game(800, 550, Phaser.AUTO, '', {
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

function preload() {

  game.load.image('background', 'source/assets/background.png');
  game.load.image('button', 'source/assets/logo.png');

}

function create() {

  background = game.add.image(0, 0, 'background');

  // Button
  button = game.add.button(200, 200, 'button', actionOnClick, this, 2, 1, 0);
  button.onInputOver.add(over, this);
  button.onInputOut.add(out, this);
  button.onInputUp.add(up, this);

}

function over(){
	console.log('Button over');
}

function up(){
	console.log('button up', arguments);
}

function out(){
	console.log('button out');
}

function actionOnClick(){
	background.visible =! background.visible;
}

function update() {
	
}
