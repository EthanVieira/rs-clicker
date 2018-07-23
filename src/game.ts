/// <reference path="../phaser.d.ts"/>
import "phaser";
//import { BootScene } from "./scenes/bootScene";
//import { MainMenuScene } from "./scenes/mainMenuScene";
//import { GameScene } from "./scenes/gameScene";

const config: GameConfig = {
  title: "RS Clicker",
  version: "0.1",
  width: 256,
  height: 224,
  zoom: 3,
  type: Phaser.AUTO,
  parent: "game",
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