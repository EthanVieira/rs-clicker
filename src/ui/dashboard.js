import { CONSTANTS, calcLevel } from "../constants/constants.js";

export class Dashboard extends Phaser.Scene {

    currentScene;

    currentLevel = "";

    inventory = {
        button: {}
    };

    skills = {
        button: {},
        panel: {}
    };

    audio = {
        bgm: "",
        audioPage: {},
        audioPageButton: {},
        sliders: [],
        audioButtons: []
    };

    // Save data
    characterData;

    // Skill text
    attackText;
    attackBottomText;
    rangedText;
    rangedBottomText;
    magicText;
    magicBottomText;
    totalLevelText;
    woodcuttingText;
    woodcuttingBottomText;

    constructor() {
        super({
            key: CONSTANTS.SCENES.DASHBOARD
        });
    }

    init(characterData) {
        // Receive cookies if they exist
        if (characterData.currentLevel) {
            this.characterData = characterData;
        }
    }

    preload() {
        // Inventory icon
        this.load.image(
            "inventory-button",
            "src/assets/ui/buttons/InventoryButton.png"
        );

        // Skills panel
        this.load.image("skills-panel", "src/assets/ui/SkillsPanel.png");
        this.load.image(
            "skills-button",
            "src/assets/ui/buttons/SkillsButton.png"
        );

        // Audio panel
        this.load.image("audio-settings", "src/assets/ui/AudioSettings.png");
        this.load.image(
            "audio-settings-button",
            "src/assets/ui/buttons/AudioSettingsButton.png"
        );
        this.load.image(
            "audio-slider",
            "src/assets/ui/buttons/audioSlider.png"
        );
        this.load.image(
            "audio-button",
            "src/assets/ui/buttons/AudioButton.png"
        );
    }

    create() {

        // Get audio scene
        let audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);

        // Get current scene
        this.currentScene = this.scene.get(this.characterData.currentLevel);

        // Shop
        this.add.text(585, 475, "Shop")
            .setAlpha(.1)
            .setInteractive()
            .on("pointerup", () => {
                // Release autoclickers to be garbage collected
                this.currentScene.clearAutoClickers();
                
                // Pass in the current level to know which level to return to upon exiting the shop.
                this.currentScene.scene.start(CONSTANTS.SCENES.SHOP, [
                    this.characterData,
                    this.characterData.currentLevel
                ]);

                // Stop dashboard
                this.scene.stop(CONSTANTS.SCENES.DASHBOARD);

                // TODO: Instead of starting a shop scene, just have a shop interface pop up w/o stopping game.
                console.log("Going to Shop");
            });

        // Inventory
        this.inventory.button = this.add
            .image(626, 168, "inventory-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .setAlpha(0.1)
            .on("pointerup", () => {
                this.hideAllMenus();

                // If enemy-level, repopulate quest text
                if (this.currentScene.levelType == CONSTANTS.LEVEL_TYPE.ENEMY) {
                    this.currentScene.showQuestText(true);
                    this.currentScene.showAutoClickerButton(true);
                }

                this.inventory.button.setAlpha(0.1);
            });

        // Skills
        this.skills.panel = this.add
            .image(548, 208, "skills-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.skills.button = this.add
            .image(560, 168, "skills-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive();
        this.skills.button.on("pointerup", () => {
            this.showSkills(true);
        });

        // Skills text
        this.attackText = this.add
            .text(585, 220, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.attackBottomText = this.add
            .text(600, 230, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.rangedText = this.add
            .text(585, 310, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.rangedBottomText = this.add
            .text(600, 320, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.magicText = this.add
            .text(585, 375, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.magicBottomText = this.add
            .text(600, 385, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.totalLevelText = this.add
            .text(705, 450, "3", {fontSize: "12px", fill: "yellow"})
            .setOrigin(.5)
            .setDepth(2);
        this.woodcuttingText = this.add
            .text(710, 375, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.woodcuttingBottomText = this.add
            .text(725, 385, "1", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);

        // Set and hide skills page on startup
        this.updateSkillsText();
        this.showSkills(false);

        // Audio settings
        let audioWindowX = 550;
        let audioWindowY = 205;
        this.audio.audioPage = this.add
            .image(audioWindowX, audioWindowY, "audio-settings")
            .setOrigin(0, 0)
            .setDepth(1);
        this.audio.audioPageButton = this.add
            .image(660, 465, "audio-settings-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerup", () => {
                this.showAudioSettings(true);
            });

        // Place sliders
        let barXOffset = 53;
        this.audio.sliders = [];
        this.audio.sliders.push(
            this.add
                .image(
                    audioWindowX + barXOffset,
                    audioWindowY + 80,
                    "audio-slider"
                )
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.audio.sliders.push(
            this.add
                .image(
                    audioWindowX + barXOffset,
                    audioWindowY + 125,
                    "audio-slider"
                )
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.audio.sliders.push(
            this.add
                .image(
                    audioWindowX + barXOffset,
                    audioWindowY + 170,
                    "audio-slider"
                )
                .setOrigin(0, 0)
                .setDepth(2)
        );

        // Set 5 buttons for each of the 3 sliders
        this.audio.audioButtons = [];
        for (let volumeType = 0; volumeType < 3; volumeType++) {
            let audioButtonRow = [];
            for (let buttonNum = 0; buttonNum < 5; buttonNum++) {
                let audioButton = this.add
                    .image(
                        audioWindowX + barXOffset + 10 + buttonNum * 22,
                        audioWindowY + 80 + volumeType * 45,
                        "audio-button"
                    )
                    .setOrigin(0, 0)
                    .setDepth(3)
                    .setInteractive()
                    .setAlpha(0.1)
                    .on("pointerup", () => {
                        audioScene.changeVolume(volumeType, buttonNum);
                        this.changeAudioButton(volumeType, buttonNum);
                    });

                audioButtonRow.push(audioButton);
            }
            // Save 2d array of buttons (3 x 5)
            this.audio.audioButtons.push(audioButtonRow);
        }
        // Hide audio page on startup
        this.showAudioSettings(false);
    }

    showSkills(show) {
        if (show) {
            this.hideAllMenus();
            this.skills.button.setAlpha(1);
        } 
        else {
            this.skills.button.setAlpha(0.1);
        }

        // Show panel and all skill text
        this.skills.panel.visible = show;
        this.attackText.visible = show;
        this.attackBottomText.visible = show;
        this.rangedText.visible = show;
        this.rangedBottomText.visible = show;
        this.magicText.visible = show;
        this.magicBottomText.visible = show;
        this.totalLevelText.visible = show;
        this.woodcuttingText.visible = show;
        this.woodcuttingBottomText.visible = show;
    }

    showAudioSettings(show) {
        if (show) {
            this.hideAllMenus();

            // Show audio page
            this.audio.audioPage.visible = true;
            this.audio.audioPageButton.setAlpha(1);
            this.audio.sliders.forEach(slider => {
                slider.visible = true;
            });
            this.audio.audioButtons.forEach(buttonRow => {
                buttonRow.forEach(button => {
                    button.visible = true;
                });
            });

            // Show current volume buttons
            this.characterData.audio.forEach((volume, volumeType) => {
                this.audio.audioButtons[volumeType][volume].setAlpha(1);
            });
        } 
        else {
            this.audio.audioPage.visible = false;
            this.audio.audioPageButton.setAlpha(0.1);
            this.audio.sliders.forEach(slider => {
                slider.visible = false;
            });
            this.audio.audioButtons.forEach(buttonRow => {
                buttonRow.forEach(button => {
                    button.visible = false;
                });
            });
        }
    }

    // Hide old button and show new one
    changeAudioButton(volumeType, newButton) {
        let previousVolume = this.characterData.audio[volumeType];
        this.audio.audioButtons[volumeType][previousVolume].setAlpha(0.1);
        this.characterData.audio[volumeType] = newButton;
        this.audio.audioButtons[volumeType][newButton].setAlpha(1);
    }

    hideAllMenus() {
        this.showAudioSettings(false);
        this.showSkills(false);
        this.inventory.button.setAlpha(1); // Unselected inventory icon

        // If enemy-level, hide quest text
        if (this.currentScene.levelType == CONSTANTS.LEVEL_TYPE.ENEMY) {
            this.currentScene.showQuestText(false);
            this.currentScene.showAutoClickerButton(false);
        }
    }

    updateSkillsText() {
        let totalLevel = 0;

        // Attack
        let level = calcLevel(this.characterData.skills.attack);
        this.attackText.text = level;
        this.attackBottomText.text = level;
        totalLevel += level;

        // Ranged
        level = calcLevel(this.characterData.skills.ranged);
        this.rangedText.text = level;
        this.rangedBottomText.text = level;
        totalLevel += level;

        // Magic
        level = calcLevel(this.characterData.skills.magic);
        this.magicText.text = level;
        this.magicBottomText.text = level;
        totalLevel += level;

        // Woodcutting
        level = calcLevel(this.characterData.skills.woodcutting);
        this.woodcuttingText.text = level;
        this.woodcuttingBottomText.text = level;
        totalLevel += level;

        this.totalLevelText.text = totalLevel;
    }
}
