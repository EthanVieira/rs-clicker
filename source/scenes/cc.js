import { CONSTANTS } from "../constants.js";

export class CCScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.CC
        })
    }
    init() {
        // receieve data from other scene that initialized this scene

        // TODO: Adjust the starting positions of buttons/background by a set scale
        // let scale = 1;
    }
    preload(){
        this.load.image('default', 'source/assets/cc_default.png');
        this.load.image('warrior', 'source/assets/cc_warrior.png');
        this.load.image('ranger', 'source/assets/cc_ranger.png');
        this.load.image('mage', 'source/assets/cc_mage.png');

        this.load.image('play-button', 'source/assets/playbutton.png');
        // TODO:
            // Settings
            // Stats
    }
    create(){

        // Load the default character creation screen
        this.add.image(0, 0, 'default').setOrigin(0,0).setDepth(0);

        // Warrior Button
        let warriorButton = this.add.image(130, 180, "play-button").setDepth(0);
        warriorButton.setAlpha(0.01);
        warriorButton.setInteractive();

        // Mage Button
        let mageButton = this.add.image(130, 290, "play-button").setDepth(0);
        mageButton.setAlpha(0.01);
        mageButton.setInteractive();

        // Ranger Button
        let rangerButton = this.add.image(130, 405, "play-button").setDepth(0);
        rangerButton.setAlpha(0.01);
        rangerButton.setInteractive();

        // Accept Button
        let acceptButton = this.add.image(400, 455, "play-button").setDepth(0);
        acceptButton.setAlpha(0.01);
        acceptButton.setInteractive();

        warriorButton.on("pointerup", ()=>{
            // Load the warrior image
            this.add.image(0, 0, 'warrior').setOrigin(0,0).setDepth(0);
        })

        mageButton.on("pointerup", ()=>{
            // Load the mage image
            this.add.image(0, 0, 'mage').setOrigin(0,0).setDepth(0);
        })

        rangerButton.on("pointerup", ()=>{
            // Load the ranger image
            this.add.image(0, 0, 'ranger').setOrigin(0,0).setDepth(0);
        })

        // Why isn't level one starting???
        acceptButton.on("pointerup", ()=>{
            this.scene.start(CONSTANTS.SCENES.LEVEL1); 
            console.log("Going to Level 1");
        })

    }
}