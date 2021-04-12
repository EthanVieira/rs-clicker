import { CONSTANTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";

export class Settings {
    dashboard;

    panel;
    button;

    sliders = [];
    buttons = [];

    constructor(dashboard) {
        this.dashboard = dashboard;
        this.audio = dashboard.scene.get(CONSTANTS.SCENES.AUDIO);

        // Audio settings
        let audioWindowX = 550;
        let audioWindowY = 205;
        this.panel = dashboard.add
            .image(audioWindowX, audioWindowY, "audio-settings")
            .setOrigin(0, 0)
            .setDepth(1);
        this.button = dashboard.add
            .image(659, 466, "audio-settings-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.show();
            });

        // Place sliders (TODO: Remove these and have them part of the image)
        let barXOffset = 53;
        this.sliders.push(
            dashboard.add
                .image(audioWindowX + barXOffset, audioWindowY + 80, "audio-slider")
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.sliders.push(
            dashboard.add
                .image(audioWindowX + barXOffset, audioWindowY + 125, "audio-slider")
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.sliders.push(
            dashboard.add
                .image(audioWindowX + barXOffset, audioWindowY + 170, "audio-slider")
                .setOrigin(0, 0)
                .setDepth(2)
        );

        // Set 5 buttons for each of the 3 sliders
        for (let volumeType = 0; volumeType < 3; volumeType++) {
            let audioButtonRow = [];
            for (let buttonNum = 0; buttonNum < 5; buttonNum++) {
                let audioButton = dashboard.add
                    .image(
                        audioWindowX + barXOffset + 10 + buttonNum * 22,
                        audioWindowY + 80 + volumeType * 45,
                        "audio-button"
                    )
                    .setOrigin(0, 0)
                    .setDepth(3)
                    .setInteractive()
                    .setAlpha(0.1)
                    .on("pointerdown", () => {
                        this.changeAudioButton(volumeType, buttonNum);
                    });

                audioButtonRow.push(audioButton);
            }
            // Save 2d array of buttons (3 x 5)
            this.buttons.push(audioButtonRow);
        }

        // Hide settings panel on startup
        this.show(false);
    }

    // Hide old button and show new one
    changeAudioButton(volumeType, buttonNum) {
        for (let button in this.buttons[volumeType]) {
            this.buttons[volumeType][button].setAlpha(0.1);
        }
        this.buttons[volumeType][buttonNum].setAlpha(1);

        this.audio.changeVolume(volumeType, buttonNum);
    }

    show(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.dashboard.currentPanel = CONSTANTS.PANEL.SETTINGS;
            this.button.setAlpha(1);

            // Show current volume buttons
            for (let i = 0; i < 3; i++) {
                this.buttons[i][characterData.getVolume(i)].setAlpha(1);
            }
        } else {
            this.button.setAlpha(0.1);
        }

        this.panel.visible = isVisible;
        this.sliders.forEach((slider) => {
            slider.visible = isVisible;
        });
        this.buttons.forEach((buttonRow) => {
            buttonRow.forEach((button) => {
                button.visible = isVisible;
            });
        });
    }
}
