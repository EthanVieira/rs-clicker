// I'm limiting it to 800x600 for now just to make things easier

/*
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, 
	window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'game'),
	Main = function () {};
*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game')

// Define global vars
//var gold = 0;
// Player progression

// Add states
game.state.add('splash', splash)
game.state.add('menu', menu);
game.state.add('level1', level1);


// Start program
game.state.start('splash');

