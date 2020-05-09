import { CONSTANTS } from "../constants/constants.js";
import { getDefaultData } from "../utilities.js";
import { itemManifest } from "../items/item-manifest.js";
import { targetManifest } from "../targets/target-manifest.js";

export class LoadScene extends Phaser.Scene {
    characterData = {};

    constructor() {
        super({
            key: CONSTANTS.SCENES.LOAD,

            pack: {
                files: [
                    {
                        type: "image",
                        key: "lesser-demon",
                        url: "/src/assets/sprites/LesserDemon.png",
                    },
                ],
            },
        });
    }

    preload() {
        this.add.image(750, 600, "lesser-demon");

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle("#ED1C24", 0.2);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: Math.floor(width / 2),
            y: Math.floor(height / 2) - 50,
            text: "RS Clicker is loading - Please Wait...",
            style: {
                font: "24px runescape",
                fill: "#ffffff",
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: Math.floor(width / 2),
            y: Math.floor(height / 2) - 5,
            text: "0%",
            style: {
                font: "18px runescape",
                fill: "#ffffff",
            },
        });
        percentText.setOrigin(0.5, 0.5);

        // Display asset text on loading bar
        var assetText = this.make.text({
            x: Math.floor(width / 2),
            y: Math.floor(height / 2) + 42,
            text: "Loading asset",
            style: {
                font: "18px runescape",
                fill: "#ffffff",
            },
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on("fileprogress", function (file) {
            assetText.text = "Loading asset: " + file.key;
        });

        this.load.on("progress", function (value, file) {
            percentText.setText(
                "Loading good ol rs stuff " + parseInt(value * 100) + "%"
            );
            progressBar.clear();
            progressBar.fillStyle(0xed1c24, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on("complete", function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // Effects
        this.load.image("blue-hitsplat", "src/assets/effects/BlueHitsplat.png");
        this.load.image("red-hitsplat", "src/assets/effects/RedHitsplat.png");

        // Enemies
        this.load.image("chicken", "src/assets/sprites/Chicken.jpg");
        this.load.image("lesser-demon", "src/assets/sprites/LesserDemon.png");

        // Backgrounds/Logos
        this.load.image("main-menu-bg", "src/assets/backgrounds/MainMenuBg.png");
        this.load.image("main-menu", "src/assets/ui/MainMenu.png");
        this.load.image("rsc-logo", "src/assets/logos/RSCLogo.png");

        // Buttons
        this.load.image("play-button", "src/assets/ui/buttons/PlayButton.png");
        this.load.image("settings-button", "src/assets/ui/buttons/SettingsButton.png");

        // Dashboard UI
        // Panels and buttons
        this.load.image("inventory-button", "src/assets/ui/buttons/InventoryButton.png");
        this.load.image("skills-panel", "src/assets/ui/SkillsPanel.png");
        this.load.image("skills-button", "src/assets/ui/buttons/SkillsButton.png");
        this.load.image("prayer-panel", "src/assets/ui/PrayerPanel.png");
        this.load.image("prayer-button", "src/assets/ui/buttons/PrayerButton.png");
        this.load.image("audio-settings", "src/assets/ui/AudioSettings.png");
        this.load.image(
            "audio-settings-button",
            "src/assets/ui/buttons/AudioSettingsButton.png"
        );
        this.load.image("audio-slider", "src/assets/ui/buttons/AudioSlider.png");
        this.load.image("audio-button", "src/assets/ui/buttons/AudioButton.png");
        this.load.image("quests-panel", "src/assets/ui/QuestsPanel.png");
        this.load.image("quests-button", "src/assets/ui/buttons/QuestsButton.png");
        this.load.image("equipment-panel", "src/assets/ui/EquipmentPanel.png");
        this.load.image("equipment-button", "src/assets/ui/buttons/EquipmentButton.png");
        this.load.image("clan-panel", "src/assets/ui/ClanPanel.png");
        this.load.image("clan-button", "src/assets/ui/buttons/ClanButton.png");
        this.load.image("right-click-menu", "src/assets/ui/RightClickMenu.png");
        this.load.image("scroll-bar", "src/assets/ui/ScrollBar.png");
        this.load.image("scroll-button", "src/assets/ui/ScrollButton.png");

        // Load all targets in target manifest
        let path = "src/assets/sprites/";
        Object.entries(targetManifest).forEach(([target, targetObj]) => {
            this.load.image(targetObj.imageName, path + targetObj.imagePath);
        });

        // Load all items in item manifest
        path = "src/assets/items/icons/";
        let modelPath = "src/assets/items/models/";
        Object.entries(itemManifest).forEach(([item, itemObj]) => {
            this.load.image(itemObj.imageName, path + itemObj.imagePath);
            this.load.image(itemObj.imageName + "-model", modelPath + itemObj.imagePath);
        });
    }

    create() {
        // Initialize save data
        this.characterData = getDefaultData();

        // Check for previous play data
        this.getCookies();

        // Launch audio scene in parallel
        this.scene.launch(CONSTANTS.SCENES.AUDIO, this.characterData);
        let audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);
        audioScene.playBgm("scape-main");

        this.add.text(250, 300, "Welcome to RS Clicker!", { font: "24px runescape" });
        this.add.text(250, 340, "Click the lesser demon to continue.", {
            font: "18px runescape",
        });

        let lesserDemonSprite = this.add.image(750, 600, "lesser-demon");
        lesserDemonSprite.setInteractive();

        // Start main menu scene on demon click
        lesserDemonSprite.on("pointerup", () => {
            this.scene.start(CONSTANTS.SCENES.MAIN_MENU, this.characterData);
        });
    }

    getCookies() {
        // Pull out first cookie
        let decodedCookies = decodeURIComponent(document.cookie).split(";");
        if (decodedCookies[0] != "") {
            for (let i = 0; i < decodedCookies.length; i++) {
                // Split into (0)name|(1)value
                let cookieCrumbs = decodedCookies[i].split("=");
                if (
                    cookieCrumbs[i] == "characterData" ||
                    cookieCrumbs[i] == " characterData"
                ) {
                    this.characterData = JSON.parse(cookieCrumbs[1]);
                }
            }
        }
    }
}
