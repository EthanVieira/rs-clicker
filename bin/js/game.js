"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/// <reference path="../phaser.d.ts"/>
require("phaser");
//import { BootScene } from "./scenes/bootScene";
//import { MainMenuScene } from "./scenes/mainMenuScene";
//import { GameScene } from "./scenes/gameScene";
var config = {
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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(config) {
        return _super.call(this, config) || this;
    }
    return Game;
}(Phaser.Game));
exports.Game = Game;
window.onload = function () {
    var game = new Game(config);
};
