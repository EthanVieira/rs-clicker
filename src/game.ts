/// <reference path="../bin/lib/phaser.d.ts"/>
//import "phaser";
import { LoadScene } from "./scenes/loadScene";
import { MenuScene } from "./scenes/menuScene";
//import { GameScene } from "./scenes/gameScene";

const config: GameConfig = {
  title: "RS Clicker",
  version: "0.1",
  width: 256,
  height: 224,
  zoom: 3,
  type: Phaser.AUTO,
  parent: "game",
  scene: [LoadScene, MenuScene],
  input: {
    keyboard: true,
    mouse: true,
    touch: false,
    gamepad: false
  },
  backgroundColor: "#000000"
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};