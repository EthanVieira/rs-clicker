import { CONSTANTS } from "../constants/constants.js";

export class LoadScene extends Phaser.Scene {
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
    init() {
        // this is where you receive data from other scenes or instantiate plugins
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

        // Simulate lag
        for (let i = 0; i < 500; i++) {
            this.load.image("chicken" + i, "src/assets/sprites/Chicken.jpg");
        }

        //TODO: Get RS Font working
        // Fonts
        //this.load.bitmapFont('rsfont', 'src/assets/fonts/runescape_uf.bmp');

        // Enemies
        this.load.image("chicken", "src/assets/sprites/Chicken.jpg");
        this.load.image("lesser-demon", "src/assets/sprites/LesserDemon.png");

        // Backgrounds/Logos
        this.load.image(
            "main-menu-bg",
            "src/assets/backgrounds/MainMenuBg.png"
        );
        this.load.image("main-menu", "src/assets/ui/MainMenu.png");
        this.load.image("rsc-logo", "src/assets/logos/RSCLogo.png");

        // Buttons
        this.load.image("play-button", "src/assets/ui/buttons/PlayButton.png");
        this.load.image(
            "settings-button",
            "src/assets/ui/buttons/SettingsButton.png"
        );

        // Resources
        this.load.image(CONSTANTS.RESOURCES.WOOD, "src/assets/items/resources/Logs.png");
    }
    create() {
        // Launch audio scene in parallel
        this.scene.launch(CONSTANTS.SCENES.AUDIO);

        this.add.text(250, 300, "Welcome to RS Clicker!");
        this.add.text(250, 340, "Click the lesser demon to continue.");

        let lesserDemonSprite = this.add.image(750, 600, "lesser-demon");
        lesserDemonSprite.setInteractive();

        // Start main menu scene on demon click
        lesserDemonSprite.on("pointerup", () => {
            this.scene.start(CONSTANTS.SCENES.MAIN_MENU);
        });

        //
        /*
            Use launch to start a scene in parallel
            this.scene.launch(...)

            Use add to start dynamically
            this.scene.add(...)
        */
    }
    update() {
        // this is the update loop
        // dont need this for load scene
    }
}
