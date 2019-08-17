/** @type {import("../typings/phaser")} */

// I'm limiting it to 800x600 for now just to make things easier

import { LoadScene } from "./scenes/load.js"
import { MenuScene } from "./scenes/menu.js"

let game = new Phaser.Game({
	width: 800,
	height: 600,
	scene:[
		LoadScene
	]
});

// // Define global vars
// // var gold = 0;
// // Player progression

// // Add states
// game.state.add('splash', splash);
// //game.state.add('menu', menu);
// //game.state.add('level1', level1);


// // Start program
// game.state.start('splash');
