/// <reference path="../../bin/lib/phaser.d.ts"/>

export class MenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "MenuScene"
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  preload(): void {
    this.load.image('background', 'assets/background.png');
  }

  create(): void {
    this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, 'background');
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}