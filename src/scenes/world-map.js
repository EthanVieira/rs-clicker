import { CONSTANTS, SCREEN, MAP, FONTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";

export class WorldMapScene extends Phaser.Scene {
    currentHeight = 0;
    currentWidth = 0;
    exitButton;

    constructor() {
        super({
            key: CONSTANTS.SCENES.MAP,
        });
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
        const map = this.add.image(0, 0, "world-map").setOrigin(0, 0).setDepth(0);

        // Exit button
        this.exitButton = this.add
            .image(this.currentWidth - 30, 0, "exit-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start(characterData.getCurrentLevel());
            });

        const levelConfig = [
            {
                text: "Tutorial Island",
                condition: true,
                x: MAP.TUTORIAL_ISLAND.X,
                y: MAP.TUTORIAL_ISLAND.Y,
                key: CONSTANTS.SCENES.TUTORIAL_ISLAND,
            },
            {
                text: "Lumbridge",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.LUMBRIDGE
                ),
                x: MAP.LUMBRIDGE.X,
                y: MAP.LUMBRIDGE.Y,
                key: CONSTANTS.SCENES.LUMBRIDGE,
            },
            {
                text: "Lumbridge\nForest",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.LUMBRIDGE_TREES
                ),
                x: MAP.LUMBRIDGE_TREES.X,
                y: MAP.LUMBRIDGE_TREES.Y,
                key: CONSTANTS.SCENES.LUMBRIDGE_TREES,
            },
            {
                text: "Draynor\nFishing",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.DRAYNOR_FISHING
                ),
                x: MAP.DRAYNOR_FISHING.X,
                y: MAP.DRAYNOR_FISHING.Y,
                key: CONSTANTS.SCENES.DRAYNOR_FISHING,
            },
            {
                text: "Rogue's Den\nCooking",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.ROGUES_DEN_COOKING
                ),
                x: MAP.ROGUES_DEN_COOKING.X,
                y: MAP.ROGUES_DEN_COOKING.Y,
                key: CONSTANTS.SCENES.ROGUES_DEN_COOKING,
            },
            {
                text: "Al Kharid\nFurnace",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.AL_KHARID_FURNACE
                ),
                x: MAP.AL_KHARID_FURNACE.X,
                y: MAP.AL_KHARID_FURNACE.Y,
                key: CONSTANTS.SCENES.AL_KHARID_FURNACE,
            },
            {
                text: "Al Kharid\nPalace",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.AL_KHARID_PALACE
                ),
                x: MAP.AL_KHARID_PALACE.X,
                y: MAP.AL_KHARID_PALACE.Y,
                key: CONSTANTS.SCENES.AL_KHARID_PALACE,
            },
            {
                text: "Varrock Anvil",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.VARROCK_ANVIL
                ),
                x: MAP.VARROCK_ANVIL.X,
                y: MAP.VARROCK_ANVIL.Y,
                key: CONSTANTS.SCENES.VARROCK_ANVIL,
            },
            {
                text: "Varrock Mine",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.VARROCK_MINE
                ),
                x: MAP.VARROCK_MINE.X,
                y: MAP.VARROCK_MINE.Y,
                key: CONSTANTS.SCENES.VARROCK_MINE,
            },
            {
                text: "Varrock",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.VARROCK
                ),
                x: MAP.VARROCK.X,
                y: MAP.VARROCK.Y,
                key: CONSTANTS.SCENES.VARROCK,
            },
            {
                text: "Barbarian Village",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.BARBARIAN_VILLAGE
                ),
                x: MAP.BARBARIAN_VILLAGE.X,
                y: MAP.BARBARIAN_VILLAGE.Y,
                key: CONSTANTS.SCENES.BARBARIAN_VILLAGE,
            },
            {
                text: "Gnome Village Agility",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.GNOME_VILLAGE_AGILITY
                ),
                x: MAP.GNOME_VILLAGE_AGILITY.X,
                y: MAP.GNOME_VILLAGE_AGILITY.Y,
                key: CONSTANTS.SCENES.GNOME_VILLAGE_AGILITY,
            },
            {
                text: "Rune Essence Mine",
                condition: characterData.getQuestCompleted(
                    CONSTANTS.PREREQUISITES.RUNE_ESSENCE_MINE
                ),
                x: MAP.RUNE_ESSENCE_MINE.X,
                y: MAP.RUNE_ESSENCE_MINE.Y,
                key: CONSTANTS.SCENES.RUNE_ESSENCE_MINE,
            },
        ];

        // Tutorial Island and Lumbridge use default starting location, others are centered
        const { startX, startY } = this.setMapLocation();

        // Group objects together
        const container = this.add.container(startX, startY);
        container.add(map);

        levelConfig.forEach((level) => {
            // Color links if they haven't been unlocked yet
            let fontStyle = {};
            if (level.condition) {
                fontStyle = FONTS.UNLOCKED_FONT;
            } else {
                fontStyle = FONTS.LOCKED_FONT;
            }

            // Create text
            const text = this.add
                .text(level.x, level.y, level.text, fontStyle)
                .setDepth(1)
                .setInteractive()
                .on("pointerup", () => {
                    if (level.condition) {
                        this.scene.start(level.key);
                        console.log("Going to " + level.text);
                    } else {
                        console.log(level.text + " is not unlocked yet.");
                    }
                });
            container.add(text);
        });

        // Setup drag limits
        container.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, MAP.WIDTH, MAP.HEIGHT),
            Phaser.Geom.Rectangle.Contains
        );

        this.input.setDraggable(container);
        const _this = this;
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
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

        container.on("wheel", function (pointer, deltaX, deltaY, deltaZ) {
            // how fast it zooms
            const scaleFactor = -0.0005;

            // arbitrary zoom scaling limits
            const scaleMin = 0.4;
            const scaleMax = 1;

            // position factor needed to keep the map in place when zooming
            const xyFactor = 2;

            const newScale = this.scale + deltaY * scaleFactor;

            if (newScale < scaleMax && newScale > scaleMin) {
                this.scale = newScale;
                this.x += deltaY * xyFactor;
                this.y += deltaY * xyFactor;
            }
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
        let startX = this.currentWidth / 2 - MAP[characterData.getCurrentLevel()].X;
        let startY = this.currentHeight / 2 - MAP[characterData.getCurrentLevel()].Y;

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
