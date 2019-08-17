import { CONSTANTS } from "../constants.js";

export class MenuScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.MENU
        })
    }
    init(data) {
        // receieve data from other scene that initialized this scene
        console.log(data)
        console.log("I GOT IT")
    }
    create(){

    }
}

