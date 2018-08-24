var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
preload: preload, create: create, update: update });

function preload() {

  game.load.image('background', 'source/assets/background.png');

}

function create() {

  game.add.image(400, 300, 'background');
}

function update() {
}
