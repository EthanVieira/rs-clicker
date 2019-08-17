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
		game.load.image('menu-bg', 'src/assets/background.png');
		game.load.image('loading', 'src/assets/loading.png');
		game.load.image('logo', 'src/assets/rslogo.png');

		// Backgrounds
		game.load.image('background', 'src/assets/MenuBg.png');
		game.load.image('temp-bg', 'src/assets/temp_bg.jpg');
		

		// Buttons

		// Weapons/Spells
		
		// Enemies
		game.load.image('chicken', 'src/assets/chicken.jpg');
		game.load.image('lesser-demon', 'src/assets/Lesser_demon.png')
		
		// Animations
		game.load.image('red-hitsplat', 'src/assets/Red_Hitsplat.png');
		game.load.image('blue-hitsplat', 'src/assets/Blue_Hitsplat.png');

		// Load states
		game.load.script('Splash', 'src/splash.js');
		game.load.script('Level1', 'src/level1.js');
		game.load.script('Menu', 'src/menu.js');

		// Player progression
		this.level = 1;
		this.levelKills = 0;
		this.requiredKills = 10;

	},

	create: function () {

		//var state = this;

		// Add states
		game.state.add('Splash', Splash);
		game.state.add('Level1', Level1);
		game.state.add('Menu', Menu);
		game.state.start('Splash');

		// Setup background - temporary I guess idk
		//this.bg = game.add.sprite(game.world.centerX, game.world.centerY, 'temp-bg');
		//this.bg.anchor.setTo(.5);


		// Create enemies
		
		
	},

	render: function() {
		
	}
}

// Start program
game.state.add('Main', Main);
game.state.start('Main');

// function update() {}
