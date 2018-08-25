var game = new Phaser.Game(800, 550, Phaser.AUTO, '', {
  preload: preload, create: create, update: update });

function preload() {

  game.load.image('background', 'source/assets/background.png');

}

function create() {

  game.add.image(0, 0, 'background');

}

function update() {
}
