import { CONSTANTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";

export class Settings {
    dashboard;

    panel;
    button;

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

        // Place sliders, Volume / SFX / Environment
        let barXOffset = 50;
        this.sliderMin = audioWindowX + barXOffset + 11;
        this.sliderMax = audioWindowX + barXOffset + 98;
        this.volumeButton = dashboard.add
            .image(this.sliderMin, audioWindowY + 77, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();
        this.sfxButton = dashboard.add
            .image(this.sliderMin, audioWindowY + 125, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();
        this.envButton = dashboard.add
            .image(this.sliderMin, audioWindowY + 171, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();

        // Init slider positions
        this.setVolume(this.volumeButton, characterData.getVolume(0));
        this.setVolume(this.sfxButton, characterData.getVolume(1));
        this.setVolume(this.envButton, characterData.getVolume(2));

        // Setup drag
        dashboard.input
            .setDraggable(this.volumeButton)
            .setDraggable(this.sfxButton)
            .setDraggable(this.envButton)
            .on("drag", (pointer, gameObject, dragX, dragY) => {
                if (dragX >= this.sliderMin && dragX <= this.sliderMax) {
                    gameObject.x = dragX;
                    this.updateVolume();
                }
            })
            // Snap volume slider to the closest position
            .on("dragend", (pointer, gameObject) => {
                this.setVolume(gameObject, this.getVolume(gameObject));
            });

        // Hide settings panel on startup
        this.show(false);
    }

    updateVolume() {
        const bgm = this.getVolume(this.volumeButton);
        const sfx = this.getVolume(this.sfxButton);
        const env = this.getVolume(this.envButton);

        this.audio.changeVolume(0, bgm);
        this.audio.changeVolume(1, sfx);
        this.audio.changeVolume(2, env);
    }

    // Convert volume slider coordinates to a 0-1 volume scale
    getVolume(gameObject) {
        // Convert to 0-1
        const diffX = this.sliderMax - this.sliderMin;
        let volume = (gameObject.x - this.sliderMin) / diffX;

        // Convert to 1 of 5 values
        const possibleValues = [0, 0.25, 0.5, 0.75, 1];
        volume = possibleValues.reduce((prev, curr) => {
            return Math.abs(curr - volume) < Math.abs(prev - volume) ? curr : prev;
        });
        return volume;
    }

    // Convert volume to X coordinate of slider
    setVolume(gameObject, volume) {
        const diffX = this.sliderMax - this.sliderMin;

        gameObject.x = volume * diffX + this.sliderMin;
    }

    show(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.dashboard.currentPanel = CONSTANTS.PANEL.SETTINGS;
            this.button.setAlpha(1);
        } else {
            this.button.setAlpha(0.1);
        }

        this.panel.visible = isVisible;
        this.volumeButton.visible = isVisible;
        this.sfxButton.visible = isVisible;
        this.envButton.visible = isVisible;
    }
}
