/// <reference path="../bin/lib/phaser.d.ts"/>
//import "phaser";
import { LoadScene } from "./scenes/loadScene";
import { MenuScene } from "./scenes/menuScene";
//import { GameScene } from "./scenes/gameScene";

const config: GameConfig = {
  title: "RS Clicker",
  version: "0.1",
  width: window.innerWidth/1.2,
  height: window.innerHeight/1.2,
  zoom: 1,
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
  resize(game);
  window.addEventListener("resize", function(){
      resize(game);
  }, false);
};

function resize(_game : Game) {
  console.log("YO")
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = +_game.config.width / +_game.config.height;
  if(windowRatio < gameRatio){
      canvas.style.width = windowWidth + "px";
      canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else{
      canvas.style.width = (windowHeight * gameRatio) + "px";
      canvas.style.height = windowHeight + "px";
  }
}
