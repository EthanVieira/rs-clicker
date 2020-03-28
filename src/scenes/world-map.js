import { CONSTANTS, SCREEN, MAP, FONTS } from "../constants/constants.js";

export class WorldMapScene extends Phaser.Scene {
    characterData = {};
    currentHeight = 0;
    currentWidth = 0;
    exitButton;
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
        // Get current width/height without scrollbars
        this.currentWidth = window.innerWidth - 10;
        this.currentHeight = window.innerHeight - 10;
        // Background
        let map = this.add
            .image(0, 0, "world-map")
            .setOrigin(0, 0)
            .setDepth(0);

        // Exit button
        this.exitButton = this.add
            .image(this.currentWidth - 30, 0, "exit-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start(this.characterData.currentLevel, this.characterData);
            });

        // Color links if they haven't been unlocked yet
        let fontStyle = FONTS.UNLOCKED_FONT;
        if (!this.characterData.TUTORIAL_ISLAND.questCompleted) {
            fontStyle = FONTS.LOCKED_FONT;
        }

        // Tutorial Island
        let tutorialIsland = this.add
            .text(
                MAP.TUTORIAL_ISLAND.X,
                MAP.TUTORIAL_ISLAND.Y,
                "Tutorial Island",
                FONTS.UNLOCKED_FONT
            )
            .setDepth(1)
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start(CONSTANTS.SCENES.TUTORIAL_ISLAND, this.characterData);
                console.log("Going to Tutorial Island");
            });

        // Lumbridge
        let lumbridge = this.add
            .text(MAP.LUMBRIDGE.X, MAP.LUMBRIDGE.Y, "Lumbridge", fontStyle)
            .setDepth(1)
            .setInteractive()
            .on("pointerup", () => {
                if (this.characterData.TUTORIAL_ISLAND.questCompleted) {
                    this.scene.start(CONSTANTS.SCENES.LUMBRIDGE, this.characterData);
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
            .setDepth(1)
            .setInteractive()
            .on("pointerup", () => {
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

        // Color link if they haven't been unlocked yet
        if (!this.characterData.LUMBRIDGE.questCompleted) {
            fontStyle = FONTS.LOCKED_FONT;
        }

        // Varrock
        let varrock = this.add
            .text(MAP.VARROCK.X, MAP.VARROCK.Y, "Varrock", fontStyle)
            .setDepth(1)
            .setInteractive()
            .on("pointerup", () => {
                if (this.characterData.LUMBRIDGE.questCompleted) {
                    this.scene.start(CONSTANTS.SCENES.VARROCK, this.characterData);
                    console.log("Going to Varrock");
                } else {
                    console.log("Varrock not unlocked yet");
                }
            });

        // Color link if they haven't been unlocked yet
        if (!this.characterData.VARROCK.questCompleted) {
            fontStyle = FONTS.LOCKED_FONT;
        }

        // Barbarian Village
        let barbarianVillage = this.add
            .text(
                MAP.BARBARIAN_VILLAGE.X,
                MAP.BARBARIAN_VILLAGE.Y,
                "Barbarian Village",
                fontStyle
            )
            .setDepth(1)
            .setInteractive()
            .on("pointerup", () => {
                if (this.characterData.VARROCK.questCompleted) {
                    this.scene.start(
                        CONSTANTS.SCENES.BARBARIAN_VILLAGE,
                        this.characterData
                    );
                    console.log("Going to Barbarian Village");
                } else {
                    console.log("Barbarian Village not unlocked yet");
                }
            });

        // Tutorial Island and Lumbridge use default starting location, others are centered
        const { startX, startY } = this.setMapLocation();

        // Group objects together
        let container = this.add.container(startX, startY);
        container.add(map);
        container.add(tutorialIsland);
        container.add(lumbridge);
        container.add(lumbridgeTrees);
        container.add(varrock);
        container.add(barbarianVillage);

        // Setup drag limits
        container.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, MAP.WIDTH, MAP.HEIGHT),
            Phaser.Geom.Rectangle.Contains
        );
        this.input.setDraggable(container);
        let _this = this;
        this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
            if (MAP.WIDTH - _this.currentWidth + dragX > 0 && dragX < 0) {
                gameObject.x = dragX;
            }
            if (MAP.HEIGHT - _this.currentHeight + dragY > 0 && dragY < 0) {
                gameObject.y = dragY;
            }
        });

        // Resize to full screen
        this.scale.resize(this.currentWidth, this.currentHeight);

        // When exiting the scene
        this.events.on("shutdown", () => {
            this.scale.resize(SCREEN.WIDTH, SCREEN.HEIGHT);
        });
    }

    // Handle window size changes
    update() {
        if (
            window.innerWidth - 10 != this.currentWidth ||
            window.innerHeight - 10 != this.currentHeight
        ) {
            this.currentWidth = window.innerWidth - 10;
            this.currentHeight = window.innerHeight - 10;
            this.scale.resize(this.currentWidth, this.currentHeight);
            this.exitButton.x = this.currentWidth - 30;
        }
    }

    // Center map and make sure it isn't off screen
    setMapLocation() {
        // Center around current level
        let startX = this.currentWidth / 2 - MAP[this.characterData.currentLevel].X;
        let startY = this.currentHeight / 2 - MAP[this.characterData.currentLevel].Y;

        // Check if map is off screen
        // Right
        if (startX < this.currentWidth - MAP.WIDTH) {
            startX = this.currentWidth - MAP.WIDTH;
        }
        // Left
        else if (startX > 0) {
            startX = 0;
        }
        // Bottom
        if (startY < this.currentHeight - MAP.HEIGHT) {
            startY = this.currentHeight - MAP.HEIGHT;
        }
        // Top
        else if (startY > 0) {
            startY = 0;
        }

        return { startX, startY };
    }
}
