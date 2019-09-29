import { CONSTANTS } from "../constants.js";

export class MenuScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.MENU
        })
    }
    init() {
        // receieve data from other scene that initialized this scene
    }
    preload(){

        // Load buttons here I guess since loading in LoadScene is currently busted
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

        // Button hover sprites


        // Button format
/*
        let buttonName = this.add.image(locationX, locationY, "button-name").setDepth(1);
        buttonName.setInteractive();
        buttonName.on("pointerover", ()=>{
             stuff on hover 
        }
        buttonName.on("pointerover", ()=>{
             stuff on hover 
        
        }
        buttonName.on("pointerout", ()=>{
             stuff on not hover 
        }
        buttonName.on("pointerup", ()=>{
             stuff on click 
        }
*/
        // Buttons
        let playButton = this.add.image(485, 321, "play-button").setDepth(1);
        playButton.setInteractive();
        

        playButton.on("pointerup", ()=>{
            this.scene.start(CONSTANTS.SCENES.CC); 
            console.log("Going to Character Creation");
        })

        let settingsButton = this.add.image(319, 321, "settings-button").setDepth(1);

    }
}

