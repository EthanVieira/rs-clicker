import { CONSTANTS } from "../constants/constants.js";
import { MATERIALS } from "../constants/materials.js";
import { ITEMS } from "../constants/items.js";
import { getDefaultData } from "../utilities.js";

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

        // Resources
        this.load.image("Logs", "src/assets/items/resources/Logs.png");

        // Other item sprites
        this.load.image("Bones", "src/assets/items/other/Bones.png");

        // Load all weapons
        let path = "src/assets/items/weapons/";
        Object.entries(ITEMS.WEAPONS).forEach(([item, itemObj]) => {
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
        Object.entries(ITEMS.TOOLS).forEach(([item, itemObj]) => {
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
