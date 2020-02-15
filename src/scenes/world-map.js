import { CONSTANTS, SCREEN, MAP } from "../constants/constants.js";

export class WorldMapScene extends Phaser.Scene {
    characterData = {};
    constructor() {
        super({
            key: CONSTANTS.SCENES.MAP
        });
    }
    init(characterData) {
        // Carry along character data
        this.characterData = characterData;
    }
    preload() {
        // Background
        this.load.image("world-map", "src/assets/maps/WorldMap.png");

        // Exit button
        this.load.image("exit-button", "src/assets/ui/buttons/ExitButton.png");
    }
    create() {
        // Background
        let map = this.add
            .image(0, 0, "world-map")
            .setOrigin(0, 0)
            .setDepth(0);

        // Exit button
        let exitButton = this.add
            .image(SCREEN.WIDTH - 30, 0, "exit-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive();
        exitButton.on("pointerup", () => {
            this.scene.start(this.characterData.currentLevel, this.characterData);
        });

        // Color links if they haven't been unlocked yet
        let fontStyle = MAP.UNLOCKED_FONT;
        if (!this.characterData.TUTORIAL_ISLAND.questCompleted) {
            fontStyle = MAP.LOCKED_FONT;
        }

        // Tutorial Island
        let tutorialIsland = this.add
            .text(
                MAP.TUTORIAL_ISLAND.X,
                MAP.TUTORIAL_ISLAND.Y,
                "Tutorial Island",
                MAP.UNLOCKED_FONT
            )
            .setDepth(1);
        tutorialIsland.setInteractive();
        tutorialIsland.on("pointerup", () => {
            this.scene.start(
                CONSTANTS.SCENES.TUTORIAL_ISLAND,
                this.characterData
            );
            console.log("Going to Tutorial Island");
        });

        // Lumbridge
        let lumbridge = this.add
            .text(MAP.LUMBRIDGE.X, MAP.LUMBRIDGE.Y, "Lumbridge", fontStyle)
            .setDepth(1);
        lumbridge.setInteractive();
        lumbridge.on("pointerup", () => {
            if (this.characterData.TUTORIAL_ISLAND.questCompleted) {
                this.scene.start(
                    CONSTANTS.SCENES.LUMBRIDGE,
                    this.characterData
                );
                console.log("Going to Lumbridge");
            } else {
                console.log("Lumbridge not unlocked yet");
            }
        });

        // Lumbridge Trees
        let lumbridgeTrees = this.add
            .text(
                MAP.LUMBRIDGE_TREES.X,
                MAP.LUMBRIDGE_TREES.Y,
                "Lumbridge\nTrees",
                fontStyle
            )
            .setDepth(1);
        lumbridgeTrees.setInteractive();
        lumbridgeTrees.on("pointerup", () => {
            if (this.characterData.TUTORIAL_ISLAND.questCompleted) {
                this.scene.start(
                    CONSTANTS.SCENES.LUMBRIDGE_TREES,
                    this.characterData
                );
                console.log("Going to Lumbridge Trees");
            } else {
                console.log("Lumbridge not unlocked yet");
            }
        });

        // Group objects together
        let container = this.add.container(MAP.CENTER_X, MAP.CENTER_Y);
        container.add(map);
        container.add(tutorialIsland);
        container.add(lumbridge);
        container.add(lumbridgeTrees);

        // Setup drag limits
        container.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, MAP.WIDTH, MAP.HEIGHT),
            Phaser.Geom.Rectangle.Contains
        ); // Use size of map image
        this.input.setDraggable(container);
        this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
            if (MAP.WIDTH - SCREEN.WIDTH + dragX > 0 && dragX < 0) {
                gameObject.x = dragX;
            }
            if (MAP.HEIGHT - SCREEN.HEIGHT + dragY > 0 && dragY < 0) {
                gameObject.y = dragY;
            }
        });
    }
}
