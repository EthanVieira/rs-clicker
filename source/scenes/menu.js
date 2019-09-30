import { CONSTANTS } from "../constants.js";

export class MenuScene extends Phaser.Scene{
    characterData = {};
    constructor() {
        super({
            key: CONSTANTS.SCENES.MENU
        })
    }
    init() {
        // receieve data from other scene that initialized this scene
    }
    preload(){

        // NEED:
        // Play 
        
        // Settings
        // Stats
    }
    create(){
        // create the menu screen
        this.add.image(0, 0, 'menu-bg').setOrigin(0,0).setDepth(0);
        this.add.image(400, 300, 'menu').setDepth(1);
        this.add.image(400, 125, 'rsc-logo').setDepth(1);

        // Play
        let playButton = this.add.image(485, 321, "play-button").setDepth(1);
        playButton.setInteractive();
        playButton.on("pointerup", ()=>{
            if (!this.characterData.characterClass) {
                this.scene.start(CONSTANTS.SCENES.CC); 
                console.log("Going to Character Creation");
            }
            else {
                this.scene.start(CONSTANTS.SCENES.LUMBRIDGE, this.characterData); 
                console.log("Going to Lumbridge");
            }
        })

        // Settings
        let settingsButton = this.add.image(319, 321, "settings-button").setDepth(1);

        // Pull in previous data
        this.getCookies();
    }
    getCookies(){
        // Pull out first cookie
        let decodedCookies = decodeURIComponent(document.cookie).split(';');
        if (decodedCookies[0] != "") {
            let cookieCrumbs = decodedCookies[0].split('=');   // Split into (0)name|(1)value
            this.characterData = JSON.parse(cookieCrumbs[1]);
            this.characterData.hasCookies = true;
        }
    }
}

