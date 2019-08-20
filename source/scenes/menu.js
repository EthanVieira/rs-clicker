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
        // Image won't show up unless i preload it here as well?? Why do I need to do this again
        this.load.image('menu-bg', 'source/assets/MenuBg.png');

        // Load buttons here I guess since loading in LoadScene is currently busted
        // NEED:
        // Play 
        this.load.image('play-button', 'source/assets/playbutton.png');
        // Settings
        // Stats
    }
    create(){
        // create the menu screen

        this.add.image(0, 0, 'menu-bg').setOrigin(0,0).setDepth(0);

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
        let playButton = this.add.image(300, 300, "play-button").setDepth(1);
        playButton.setInteractive();
        

        // Why isn't level one starting???
        playButton.on("pointerup", ()=>{
            this.scene.start(CONSTANTS.SCENES.CC); 
            console.log("Going to Character Creation");
        })

    }
}

