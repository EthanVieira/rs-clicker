// I'm limiting it to 800x600 for now just to make things easier

/*
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, 
	window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game'),
	Main = function () {};
*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'),
	Main = function () {};

Main.prototype = {

	init: function () {
		// Loading text
		//this.status = game.make.text(game.world.centerX, game.world.centerY, 'loading...', {fill: 'white'});
    	//this.status.anchor.setTo(0.5);
		//game.add.existing(this.status);
	},

	preload: function () {

		// Load images

		// Menu/Logos
		game.load.image('menu-bg', 'source/assets/background.png');
		game.load.image('loading', 'source/assets/loading.png');
		game.load.image('logo', 'source/assets/rslogo.png');

		// Backgrounds
		game.load.image('background', 'source/assets/MenuBg.png');
		

		// Buttons

		// Weapons/Spells
		
		// Enemies
		game.load.image('chicken', 'source/assets/chicken.jpg');
		game.load.image('lesser-demon', 'source/assets/Lesser_demon.png')
		
		// Animations
		game.load.image('red-hitsplat', 'source/assets/Red_Hitsplat.png');
		game.load.image('blue-hitsplat', 'source/assets/Blue_Hitsplat.png');

		// Load states
		//game.load.script('Splash', 'source/splash.js');
		//game.load.script('Level1', 'source/level1.js');
		//game.load.script('Menu', 'source/menu.js');

		// Player progression
		this.level = 1;
		this.levelKills = 0;
		this.requiredKills = 10;

	},

	create: function () {

		// Add states
		//game.state.add('Splash', Splash);
		//game.state.add('Level1', Level1);
		//game.state.add('Menu', Menu);
		//game.state.start('Splash');

		// Create enemies
		var lesserDemonSprite = game.add.sprite(450, 290, 'lesser-demon');
		lesserDemonSpriteSprite.anchor.setTo(0.5, 0.5);
		
	},

	render: function() {
		game.debug.text('Welcome to RS Clicker!', 250, 290);
		game.debug.text('Click anywhere to continue.', 250, 340);
	}
}

// Start program
game.state.add('Main', Main);
game.state.start('Main');

// function update() {}
