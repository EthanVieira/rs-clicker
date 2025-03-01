import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { Button } from "../ui/button.js";

export class MainMenuScene extends Phaser.Scene {
    settingsWindow;
    settingsOpen = false;
    settingsTitle;
    settingsYesText;
    settingsNoText;

    mutedButton;
    unmutedButton;

    audioScene;

    constructor() {
        super({
            key: CONSTANTS.SCENES.MAIN_MENU,
        });
    }

    preload() {
        this.load.image("settings", "assets/ui/SettingsPanel.png");
        this.load.image("sound-on", "assets/ui/buttons/SoundOn.png");
        this.load.image("sound-off", "assets/ui/buttons/SoundOff.png");
    }

    create() {
        // Create the menu screen
        let bg = this.add
            .image(0, 0, "main-menu-bg")
            .setOrigin(0, 0)
            .setDepth(0)
            .setInteractive();
        this.add.image(400, 300, "main-menu").setDepth(1);
        this.add.image(400, 125, "rsc-logo").setDepth(1);

        // Settings window
        this.settingsWindow = this.add
            .image(400, 300, "settings")
            .setDepth(2)
            .setInteractive();
        this.settingsWindow.visible = false;
        this.settingsTitle = this.add
            .text(330, 190, "Delete cookies?", { color: "yellow" })
            .setDepth(3);
        this.settingsTitle.visible = false;
        this.settingsYesText = this.add
            .text(348, 242, "Yes", {
                color: "red",
                shadow: {
                    offsetX: 1,
                    offsetY: 1,
                    color: "black",
                    fill: true,
                },
            })
            .setDepth(3);
        this.settingsYesText.visible = false;
        this.settingsNoText = this.add.text(428, 242, "No").setDepth(3);
        this.settingsNoText.visible = false;

        // Close settings window if clicked outside of it
        bg.on("pointerup", () => {
            this.toggleSettings(false);
        });

        // Play
        let playButton = this.add.image(485, 321, "play-button").setDepth(1);
        playButton.setInteractive();
        playButton.on("pointerup", () => {
            // Prevent play while settings are open
            if (this.settingsOpen) {
                this.toggleSettings(false);
            } else {
                this.scene.start(characterData.getCurrentLevel());
                console.log("Going to", characterData.getCurrentLevel());
            }
        });

        // Settings button
        let settingsButton = this.add.image(319, 321, "settings-button").setDepth(1);
        settingsButton.setInteractive();
        settingsButton.on("pointerup", () => {
            if (this.settingsOpen) {
                this.toggleSettings(false);
            } else {
                this.toggleSettings(true);
            }
        });

        // Delete cookies (Yes)
        let yesButton = new Button(this, 332, 232, 60, 30, { depth: 4 });
        yesButton.on("pointerup", () => {
            if (this.settingsOpen) {
                characterData.reset();
                characterData.storeCookies();
                this.toggleSettings(false);
                this.showMuteButton(false);
                const BGM = 0;
                this.audioScene.changeVolume(BGM, characterData.getVolume(BGM));
            }
        });

        // Close Settings (No)
        let noButton = new Button(this, 406, 232, 60, 30, { depth: 4 });
        noButton.on("pointerup", () => {
            if (this.settingsOpen) {
                this.toggleSettings(false);
            }
        });

        // Get audio scene
        this.audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);
        this.audioScene.playBgm("scape-main");

        // Muted button
        this.mutedButton = this.add
            .image(
                this.cameras.main.width - 40,
                this.cameras.main.height - 40,
                "sound-off"
            )
            .setDepth(1)
            .setInteractive()
            .on("pointerup", () => {
                this.showMuteButton(false);
                this.audioScene.mute(false);
                characterData.storeCookies();
            });

        // Unmuted button
        this.unmutedButton = this.add
            .image(
                this.cameras.main.width - 40,
                this.cameras.main.height - 40,
                "sound-on"
            )
            .setDepth(1)
            .setInteractive()
            .on("pointerup", () => {
                this.showMuteButton(true);
                this.audioScene.mute(true);
                characterData.storeCookies();
            });

        // Check if audio is muted
        if (characterData.getVolume(0) > 0) {
            this.showMuteButton(false);
        } else {
            this.showMuteButton(true);
        }
    }

    toggleSettings(toggle) {
        this.settingsOpen = toggle;
        this.settingsWindow.visible = toggle;
        this.settingsTitle.visible = toggle;
        this.settingsYesText.visible = toggle;
        this.settingsNoText.visible = toggle;
    }

    showMuteButton(isMuted) {
        this.mutedButton.visible = isMuted;
        this.unmutedButton.visible = !isMuted;
    }
}
