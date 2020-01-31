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
        this.load.image('world-map', 'source/assets/WorldMap.png');
    }
    create(){
        let mapCenterX = -1000;
        let mapCenterY = -600;
        const mapWidth = 2161;
        const mapHeight = 1166;
        const screenWidth = 765;
        const screenHeight = 503;

        // Background
        let map = this.add.image(0, 0, 'world-map').setOrigin(0,0).setDepth(0);

        // Color links if they haven't been unlocked yet
        let fillColor = 'yellow';
        if (!this.characterData.TUTORIAL_ISLAND.questCompleted) {
            fillColor = 'white';
        }

        // Tutorial Island
        const tutorialIslandX = 1100;
        const tutorialIslandY = 1070;
        let tutorialIsland = this.add.text(tutorialIslandX, tutorialIslandY, 'Tutorial Island', {fill: 'yellow', fontSize: '20px', style: 'bold'}).setDepth(1);
        tutorialIsland.setInteractive();
        tutorialIsland.on('pointerup', ()=>{
            this.scene.start(CONSTANTS.SCENES.TUTORIAL_ISLAND, this.characterData); 
            console.log("Going to Tutorial Island");   
        })

        // Lumbridge
        const lumbridgeX = 1400;
        const lumbridgeY = 815;
        let lumbridge = this.add.text(lumbridgeX, lumbridgeY, 'Lumbridge', {fill: fillColor, fontSize: '20px', style: 'bold'}).setDepth(1);
        lumbridge.setInteractive();
        lumbridge.on('pointerup', ()=>{
            if (this.characterData.TUTORIAL_ISLAND.questCompleted) {
                this.scene.start(CONSTANTS.SCENES.LUMBRIDGE, this.characterData); 
                console.log("Going to Lumbridge");   
            }
            else {
                console.log("Lumbridge not unlocked yet");
            }
        })

        // Lumbridge Trees
        const lumbridgeTreesX = 1280;
        const lumbridgeTreesY = 800;
        let lumbridgeTrees = this.add.text(lumbridgeTreesX, lumbridgeTreesY, 'Lumbridge\nTrees', {fill: fillColor, fontSize: '20px', style: 'bold'}).setDepth(1);
        lumbridgeTrees.setInteractive();
        lumbridgeTrees.on('pointerup', ()=>{
            if (this.characterData.TUTORIAL_ISLAND.questCompleted) {
                this.scene.start(CONSTANTS.SCENES.LUMBRIDGE_TREES, this.characterData); 
                console.log("Going to Lumbridge Trees");  
            }
            else {
                console.log("Lumbridge not unlocked yet");
            }
        })

        // Group objects together
        let container = this.add.container(mapCenterX, mapCenterY);
        container.add(map);
        container.add(tutorialIsland);
        container.add(lumbridge);
        container.add(lumbridgeTrees);

        // Setup drag limits
        container.setInteractive(new Phaser.Geom.Rectangle(0, 0, mapWidth, mapHeight), Phaser.Geom.Rectangle.Contains); // Use size of map image
        this.input.setDraggable(container);
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if (mapWidth - screenWidth + dragX > 0 && dragX < 0) {
                gameObject.x = dragX;
            }
            if (mapHeight - screenHeight + dragY > 0 && dragY < 0) {
                gameObject.y = dragY;
            }
        });
    }
}

