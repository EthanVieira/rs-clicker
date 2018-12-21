var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, 
	window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game'),
	Main = function () {};

Main.prototype = {

	init: function () {
		// Loading text
		this.status = game.make.text(game.world.centerX, game.world.centerY, 'loading...', {fill: 'white'});
    	this.status.anchor.setTo(0.5);
		game.add.existing(this.status);
	},

	preload: function () {

		// Load images
		game.load.image('background', 'source/assets/MenuBg.png');
		game.load.image('loading', 'source/assets/loading.png');
		game.load.image('enemy', 'source/assets/chicken.jpg');
		game.load.image('menu-bg', 'source/assets/background.png');
		game.load.image('red-hitsplat', 'source/assets/Red_Hitsplat.png');
		game.load.image('blue-hitsplat', 'source/assets/Blue_Hitsplat.png');

		// Load states
		game.load.script('Splash', 'source/splash.js');
		game.load.script('Level1', 'source/level1.js');
		game.load.script('Menu', 'source/menu.js');

	},

	create: function () {

		// Add states
		game.state.add('Splash', Splash);
		game.state.add('Level1', Level1);
		game.state.add('Menu', Menu);
		game.state.start('Splash');
		
	}
}

// Start program
game.state.add('Main', Main);
game.state.start('Main');

// function update() {}
