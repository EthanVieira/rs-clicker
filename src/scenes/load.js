import { CONSTANTS } from "../constants/constants.js";
import { MATERIALS } from "../constants/materials.js";
import { ITEMS } from "../constants/items.js";
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
                        url: "/src/assets/sprites/LesserDemon.png"
                    }
                ]
            }
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
            x: width / 2,
            y: height / 2 - 50,
            text: "RS Clicker is loading - Please Wait...",
            style: {
                font: "18px courier",
                fill: "#ffffff"
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: "0%",
            style: {
                font: "12px monospace",
                fill: "#ffffff"
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // TODO: Display asset text on loading bar
        // var assetText = this.make.text({
        //     x: width / 2,
        //     y: height / 2 + 50,
        //     text: '',
        //     style: {
        //         font: '18px monospace',
        //         fill: '#ffffff'
        //     }
        // });
        // assetText.setOrigin(0.5, 0.5);

        // this.load.on('fileprogress', function (file) {
        //     assetText.setText('Loading asset: ' + file.key);
        // });

        this.load.on("progress", function(value, file) {
            percentText.setText(
                "Loading asset: good ol rs stuff " + parseInt(value * 100) + "%"
            );
            progressBar.clear();
            progressBar.fillStyle(0xed1c24, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on("complete", function() {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            //assetText.destroy();
        });

        //TODO: Get RS Font working
        // Fonts
        //this.load.bitmapFont('rsfont', 'src/assets/fonts/runescape_uf.bmp');

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
        // Inventory icon
        this.load.image("inventory-button", "src/assets/ui/buttons/InventoryButton.png");
        // Skills panel
        this.load.image("skills-panel", "src/assets/ui/SkillsPanel.png");
        this.load.image("skills-button", "src/assets/ui/buttons/SkillsButton.png");
        // Prayer panel
        this.load.image("prayer-panel", "src/assets/ui/PrayerPanel.png");
        this.load.image("prayer-button", "src/assets/ui/buttons/PrayerButton.png");
        // Audio panel
        this.load.image("audio-settings", "src/assets/ui/AudioSettings.png");
        this.load.image(
            "audio-settings-button",
            "src/assets/ui/buttons/AudioSettingsButton.png"
        );
        this.load.image("audio-slider", "src/assets/ui/buttons/AudioSlider.png");
        this.load.image("audio-button", "src/assets/ui/buttons/AudioButton.png");
        // Quests panel
        this.load.image("quests-panel", "src/assets/ui/QuestsPanel.png");
        this.load.image("quests-button", "src/assets/ui/buttons/QuestsButton.png");
        // Equipment panel
        this.load.image("equipment-panel", "src/assets/ui/EquipmentPanel.png");
        this.load.image("equipment-button", "src/assets/ui/buttons/EquipmentButton.png");
        // Right click menu
        this.load.image("right-click-menu", "src/assets/ui/RightClickMenu.png");

        // Load all targets in target manifest
        let path = "src/assets/sprites/";
        Object.entries(targetManifest).forEach(([target, targetObj]) => {
            this.load.image(targetObj.imageName, path + targetObj.imagePath);
        });

        // Load all items in item manifest
        path = "src/assets/items/icons/";
        Object.entries(itemManifest).forEach(([item, itemObj]) => {
            this.load.image(itemObj.imageName, path + itemObj.imagePath);
        });

        // Load all weapons
        path = "src/assets/items/models/weapons/";
        Object.entries(ITEMS.Weapons).forEach(([item, itemObj]) => {
            // Loop through materials
            Object.entries(MATERIALS[itemObj.material]).forEach(([mat, matObj]) => {
                // Load all types
                this.load.image(
                    matObj.name + itemObj.name,
                    path + matObj.name + itemObj.name + ".png"
                );
            });
        });

        // Load all tools
        Object.entries(ITEMS.Tools).forEach(([item, itemObj]) => {
            // Loop through materials
            Object.entries(MATERIALS[itemObj.material]).forEach(([mat, matObj]) => {
                // Load all types
                this.load.image(
                    matObj.name + itemObj.name,
                    path + matObj.name + itemObj.name + ".png"
                );
            });
        });
    }

    create() {
        // Initialize save data
        this.characterData = getDefaultData();

        // Check for previous play data
        this.getCookies();

        // Launch audio scene in parallel
        this.scene.launch(CONSTANTS.SCENES.AUDIO, this.characterData);

        this.add.text(250, 300, "Welcome to RS Clicker!");
        this.add.text(250, 340, "Click the lesser demon to continue.");

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
