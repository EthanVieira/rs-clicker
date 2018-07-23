/// <reference path="../../bin/lib/phaser.d.ts"/>

export class LoadScene extends Phaser.Scene {
    constructor() {
      super({
        key: "LoadScene"
      });
    }
  
    update(): void {
      this.scene.start("MenuScene");
    }
  }