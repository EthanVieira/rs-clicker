var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, 
	window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game'),
	Main = function () {};

Main.prototype = {
	preload: function () {

		game.load.image('background', 'source/assets/MenuBg.png');
		game.load.image('loading', 'source/assets/loading.png');
		game.load.image('button', 'source/assets/chicken.jpg');

		game.load.script('Splash', 'splash.js');
		game.load.script('Level1', 'level1.js');

	},

	create: function () {
		game.state.add('Splash', Splash);
		game.state.add('Level1', Level1);
		game.state.start('Splash');
		
	}
}

game.state.add('Main', Main);
game.state.start('Main');

// function update() {}
