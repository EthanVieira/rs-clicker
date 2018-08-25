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

function preload() {

  game.load.image('background', 'source/assets/background.png');

}

function create() {

  game.add.image(0, 0, 'background');

}

function update() {
}
