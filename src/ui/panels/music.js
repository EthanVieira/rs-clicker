import { CONSTANTS, FONTS } from "../../constants/constants.js";
import { ScrollWindow } from "../scroll-window.js";
import { characterData } from "../../cookie-io.js";
import { prettyPrintDash } from "../../utilities.js";

export class MusicPanel {
    dashboard;
    audio;
    scrollWindow;
    panel;
    button;
    currentSongText;
    songTexts = [];
    previousUnlocked = 0;

    constructor(dashboard) {
        this.dashboard = dashboard;
        this.audio = dashboard.scene.get(CONSTANTS.SCENES.AUDIO);
        this.chat = dashboard.scene.get(CONSTANTS.SCENES.CHAT);

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
                name: "al-kharid",
                prereq: CONSTANTS.PREREQUISITES.AL_KHARID_FURNACE,
                unlocked: false,
            },
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
            textObj.text = song.name;
            textObj.unlocked = song.unlocked;
            textObj.prereq = song.prereq;

            return textObj;
        });
        this.scrollWindow.addObjects(this.songTexts);

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
                this.setVisible(true);
            });
        this.updateSongUnlocks(false);

        // Default to hidden
        this.setVisible(false);

        // Destructor
        dashboard.events.once("shutdown", () => this.destroy());
    }

    update() {
        this.updateCurrentSongText();
        this.updateSongUnlocks();
    }

    updateSongUnlocks(log = true) {
        // Update song name color
        this.songTexts.forEach((textObj) => {
            if (!textObj.unlocked && characterData.getQuestCompleted(textObj.prereq)) {
                textObj.unlocked = true;
                textObj.setStyle(FONTS.SONG_UNLOCKED);
                if (log) {
                    this.chat.writeText(
                        "Unlocked song: " + prettyPrintDash(textObj.text)
                    );
                }
            }
        });

        // Update current / total unlocked
        if (this.numUnlockedText != undefined) {
            const numUnlocked = this.songTexts.filter(
                (textObj) => textObj.unlocked
            ).length;
            this.numUnlockedText.text = numUnlocked;
            this.totalText.text = this.songTexts.length;

            // All songs unlocked
            if (
                log &&
                this.previousUnlocked < numUnlocked &&
                numUnlocked == this.songTexts.length
            ) {
                this.chat.writeText("Congratulations, you have unlocked all songs!");
            }
            this.previousUnlocked = numUnlocked;
        }
    }

    updateCurrentSongText() {
        this.currentSongText.text = prettyPrintDash(this.audio.currentSongName);
    }

    setVisible(isVisible) {
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

    destroy() {
        this.dashboard.scene.remove(this.scrollWindow.name);
    }
}
