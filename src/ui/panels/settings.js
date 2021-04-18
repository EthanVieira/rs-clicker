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
        this.sliderMin = audioWindowX + barXOffset + 11;
        this.sliderMax = audioWindowX + barXOffset + 98;
        this.volumeButton = dashboard.add
            .image(this.sliderMin + 1, audioWindowY + 80, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();
        this.sfxButton = dashboard.add
            .image(this.sliderMin, audioWindowY + 125, "audio-button")
            .setDepth(3)
            .setOrigin(0, 0)
            .setInteractive();
        this.envButton = dashboard.add
            .image(this.sliderMin + 1, audioWindowY + 170, "audio-button")
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
        const diffX = this.sliderMax - this.sliderMin;

        const volume = ((gameObject.x - this.sliderMin) / diffX).toFixed(1);
        return parseFloat(volume);
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
