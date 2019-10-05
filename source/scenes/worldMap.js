import { CONSTANTS } from "../constants.js";

export class WorldMap extends Phaser.Scene{
    characterData = {};
    constructor() {
        super({
            key: CONSTANTS.SCENES.MAP
        })
    }
    init(characterData) {
        // Carry along character data
        this.characterData = characterData;
    }
    preload(){
        // Background
        this.load.image('world-map', 'source/assets/rs_world_map.png');
    }
    create(){
        // Background
        let map = this.add.image(0, 0, 'world-map').setOrigin(0,0).setDepth(0).setInteractive();
        this.input.setDraggable(map);
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // City text
        let tutorialIsland = this.add.text(600, 360, 'Tutorial Island', {fill: 'white', fontSize: '20px'}).setDepth(1);
        tutorialIsland.setInteractive();
        tutorialIsland.on('pointerup', ()=>{
            this.scene.start(CONSTANTS.SCENES.TUTORIALISLAND, this.characterData); 
            console.log("Going to Tutorial Island");   
        })

        let lumbridge = this.add.text(600, 390, 'Lumbridge', {fill: 'white', fontSize: '20px'}).setDepth(1);
        lumbridge.setInteractive();
        lumbridge.on('pointerup', ()=>{
            if (this.characterData.tutorialIsland.questCompleted) {
                this.scene.start(CONSTANTS.SCENES.LUMBRIDGE, this.characterData); 
                console.log("Going to Lumbridge");   
            }
            else {
                console.log("Lumbridge not unlocked yet");
            }
        })
    }
}

