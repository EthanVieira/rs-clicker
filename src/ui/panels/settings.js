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

        // Volume / SFX / Environment
        const minX = audioWindowX + barXOffset + 11;
        const maxX = audioWindowX + barXOffset + 98;
        this.volumeButton = dashboard.add
            .image(minX + 1, audioWindowY + 80, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();
        this.sfxButton = dashboard.add
            .image(minX, audioWindowY + 125, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();
        this.envButton = dashboard.add
            .image(minX + 1, audioWindowY + 170, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();

        // Setup drag
        dashboard.input.setDraggable(this.volumeButton);
        dashboard.input.setDraggable(this.sfxButton);
        dashboard.input.setDraggable(this.envButton);
        dashboard.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            if (dragX >= minX && dragX <= maxX) {
                gameObject.x = dragX;
            }
        });

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
            // characterData.getVolume(i)
        } else {
            this.button.setAlpha(0.1);
        }

        this.panel.visible = isVisible;
        this.sliders.forEach((slider) => {
            slider.visible = isVisible;
        });
        this.volumeButton.visible = isVisible;
        this.sfxButton.visible = isVisible;
        this.envButton.visible = isVisible;
    }
}
