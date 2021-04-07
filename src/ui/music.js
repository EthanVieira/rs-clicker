import { CONSTANTS, FONTS } from "../constants/constants.js";
import { ScrollWindow } from "./scroll-window.js";
import { characterData } from "../cookie-io.js";
import { prettyPrintDash } from "../utilities.js";

export class MusicPanel {
    dashboard;
    audio;
    scrollWindow;
    panel;
    button;
    currentSongText;
    songTexts = [];

    constructor(dashboard) {
        this.dashboard = dashboard;
        this.audio = dashboard.scene.get(CONSTANTS.SCENES.AUDIO);

        // Add scroll window
        this.scrollWindow = new ScrollWindow({
            name: "music",
            x: 527,
            y: 262,
            width: 185,
            height: 186,
            numColumns: 1,
            padding: 5,
        });
        dashboard.scene.add(this.scrollWindow.name, this.scrollWindow, true);
        this.scrollWindow.refresh();

        // Init song data
        const songNames = [
            {
                name: "barbarianism",
                prereq: CONSTANTS.PREREQUISITES.BARBARIAN_VILLAGE,
                unlocked: false,
            },
            {
                name: "expanse",
                prereq: CONSTANTS.PREREQUISITES.VARROCK,
                unlocked: false,
            },
            {
                name: "harmony",
                prereq: CONSTANTS.PREREQUISITES.LUMBRIDGE,
                unlocked: false,
            },
            {
                name: "newbie-melody",
                prereq: "NONE",
                unlocked: true,
            },
            {
                name: "scape-main",
                prereq: "NONE",
                unlocked: true,
            },
            {
                name: "still-night",
                prereq: CONSTANTS.PREREQUISITES.VARROCK_MINE,
                unlocked: false,
            },
            {
                name: "the-trade-parade",
                prereq: "NONE",
                unlocked: true,
            },
        ];

        // Add song names to scroll window
        this.songTexts = songNames.map((song) => {
            const font = song.unlocked ? FONTS.SONG_UNLOCKED : FONTS.SONG_LOCKED;
            let textObj = this.scrollWindow.add
                .text(0, 0, "", font)
                .setInteractive()
                .on("pointerup", () => {
                    if (textObj.unlocked) {
                        this.audio.playBgm(song.name);
                    }
                });

            // Store necessary data within the object itself
            textObj.text = prettyPrintDash(song.name);
            textObj.unlocked = song.unlocked;
            textObj.prereq = song.prereq;

            return textObj;
        });
        this.scrollWindow.addObjects(this.songTexts);
        this.updateSongUnlocks();

        // Add num unlocks at the bottom
        this.numUnlockedText = dashboard.add
            .text(633, 452, "0", FONTS.SONG_COUNT)
            .setDepth(2)
            .setOrigin(1, 0);
        this.totalText = dashboard.add
            .text(645, 452, "0", FONTS.SONG_COUNT)
            .setDepth(2)
            .setOrigin(0, 0);

        // Add current playing song
        this.currentSongText = dashboard.add
            .text(555, 239, "NONE", FONTS.SONG_UNLOCKED)
            .setDepth(2);
        this.updateCurrentSongText();

        // Add button / panel
        this.panel = dashboard.add
            .image(546, 205, "music-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.button = dashboard.add
            .image(725, 466, "music-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.show(true);
            });

        // Setup destructor
        dashboard.events.once("shutdown", () => {
            dashboard.scene.remove(this.scrollWindow.name);
        });
    }

    update() {
        this.updateCurrentSongText();
        this.updateSongUnlocks();
    }

    updateSongUnlocks() {
        // Update song name color
        this.songTexts.forEach((textObj) => {
            if (!textObj.unlocked && characterData.getQuestCompleted(textObj.prereq)) {
                textObj.unlocked = true;
                textObj.setStyle(FONTS.SONG_UNLOCKED);
                console.log("unlocked", textObj.text);
            }
        });

        // Update current / total unlocked
        if (this.numUnlockedText != undefined) {
            this.numUnlockedText.text = this.songTexts.filter(
                (textObj) => textObj.unlocked
            ).length;
            this.totalText.text = this.songTexts.length;
        }
    }

    updateCurrentSongText() {
        this.currentSongText.text = prettyPrintDash(this.audio.currentSongName);
    }

    show(isVisible) {
        this.isTextVisible = isVisible;
        if (isVisible) {
            this.scrollWindow.refresh();
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.MUSIC;
        } else {
            this.button.setAlpha(0.1);
        }
        this.panel.visible = isVisible;
        this.currentSongText.visible = isVisible;
        this.numUnlockedText.visible = isVisible;
        this.totalText.visible = isVisible;
        this.scrollWindow.setVisible(isVisible);
    }

    destroy() {}
}
