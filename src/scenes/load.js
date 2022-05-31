import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { itemManifest } from "../items/item-manifest.js";
import { targetManifest } from "../targets/target-manifest.js";
import { setItemClass } from "../utilities.js";

export class LoadScene extends Phaser.Scene {
    // Loading bar info
    fullyLoaded = false;
    numItemsLoaded = 0;
    totalItems = 0;
    percentImagesLoaded = 0.0;

    constructor() {
        super({
            key: CONSTANTS.SCENES.LOAD,

            pack: {
                files: [
                    {
                        type: "image",
                        key: "lesser-demon",
                        url: "src/assets/sprites/LesserDemon.png",
                    },
                ],
            },
        });
    }

    preload() {
        this.add.image(750, 600, "lesser-demon");

        // Load item classes
        this.totalItems = Object.keys(itemManifest).length;
        this.loadItems(this.loadData);

        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle("#ED1C24", 0.2);
        this.progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.loadingText = this.make.text({
            x: Math.floor(width / 2),
            y: Math.floor(height / 2) - 50,
            text: "RS Clicker is loading - Please Wait...",
            style: {
                font: "24px runescape",
                fill: "#ffffff",
            },
        });
        this.loadingText.setOrigin(0.5, 0.5);

        this.percentText = this.make.text({
            x: Math.floor(width / 2),
            y: Math.floor(height / 2) - 5,
            text: "0%",
            style: {
                font: "18px runescape",
                fill: "#ffffff",
            },
        });
        this.percentText.setOrigin(0.5, 0.5);

        // Display asset text on loading bar
        this.assetText = this.make.text({
            x: Math.floor(width / 2),
            y: Math.floor(height / 2) + 42,
            text: "Loading asset",
            style: {
                font: "18px runescape",
                fill: "#ffffff",
            },
        });
        this.assetText.setOrigin(0.5, 0.5);

        const _this = this;
        this.load.on("fileprogress", (file) => {
            _this.assetText.text = "Loading asset: " + file.key;
        });

        this.load.on("progress", (value, file) => {
            _this.percentImagesLoaded = value;
            _this.updateProgress();
        });

        // Effects
        this.load.image("blue-hitsplat", "src/assets/effects/BlueHitsplat.png");
        this.load.image("red-hitsplat", "src/assets/effects/RedHitsplat.png");

        // Enemies
        this.load.image("chicken", "src/assets/sprites/Chicken.png");
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
        this.load.image("xp-button", "src/assets/ui/buttons/XpCounterButton.png");
        this.load.image("inventory-button", "src/assets/ui/buttons/InventoryButton.png");
        this.load.image("skills-panel", "src/assets/ui/SkillsPanel.png");
        this.load.image("skills-button", "src/assets/ui/buttons/SkillsButton.png");
        this.load.image("skills-info", "src/assets/ui/SkillsInfo.png");
        this.load.image("prayer-panel", "src/assets/ui/PrayerPanel.png");
        this.load.image("prayer-button", "src/assets/ui/buttons/PrayerButton.png");
        this.load.image("audio-settings", "src/assets/ui/AudioSettings.png");
        this.load.image(
            "audio-settings-button",
            "src/assets/ui/buttons/AudioSettingsButton.png"
        );
        this.load.image("audio-button", "src/assets/ui/buttons/AudioButton.png");
        this.load.image("quests-panel", "src/assets/ui/QuestsPanel.png");
        this.load.image("quests-button", "src/assets/ui/buttons/QuestsButton.png");
        this.load.image("quests-tab-button", "src/assets/ui/buttons/QuestsTabButton.png");
        this.load.image("stats-tab-button", "src/assets/ui/buttons/StatsTabButton.png");
        this.load.image("equipment-panel", "src/assets/ui/EquipmentPanel.png");
        this.load.image("equipment-background", "src/assets/ui/EquipmentBackground.png");
        this.load.image("equipment-button", "src/assets/ui/buttons/EquipmentButton.png");
        this.load.image("clan-panel", "src/assets/ui/ClanPanel.png");
        this.load.image("clan-button", "src/assets/ui/buttons/ClanButton.png");
        this.load.image("music-panel", "src/assets/ui/MusicPanel.png");
        this.load.image("music-button", "src/assets/ui/buttons/MusicButton.png");
        this.load.image("right-click-menu-2", "src/assets/ui/RightClickMenu_2.png");
        this.load.image("right-click-menu-3", "src/assets/ui/RightClickMenu_3.png");
        this.load.image("right-click-menu-4", "src/assets/ui/RightClickMenu_4.png");
        this.load.image("right-click-menu-5", "src/assets/ui/RightClickMenu_5.png");
        this.load.image("right-click-menu-6", "src/assets/ui/RightClickMenu_6.png");
        this.load.image("scroll-background", "src/assets/ui/ScrollBackground.png");
        this.load.image("scroll-header", "src/assets/ui/ScrollHeader.png");
        this.load.image("scroll-footer", "src/assets/ui/ScrollFooter.png");
        this.load.image("scroll-button", "src/assets/ui/ScrollButton.png");
        this.load.image(
            "attack-style-button",
            "src/assets/ui/buttons/AttackStyleButton.png"
        );
        this.load.image("attack-style-panel", "src/assets/ui/AttackStylePanel.png");
        this.load.image(
            "attack-style-1-button",
            "src/assets/ui/buttons/AttackStyle1Button.png"
        );
        this.load.image(
            "attack-style-2-button",
            "src/assets/ui/buttons/AttackStyle2Button.png"
        );
        this.load.image(
            "attack-style-3-button",
            "src/assets/ui/buttons/AttackStyle3Button.png"
        );
        this.load.image(
            "attack-style-retaliate-button",
            "src/assets/ui/buttons/AttackStyleRetaliateButton.png"
        );

        // Modal
        this.load.image("smithing-interface", "src/assets/ui/SmithingInterface.png");

        // Load all targets in target manifest
        let path = "src/assets/sprites/";
        Object.entries(targetManifest).forEach(([target, targetObj]) => {
            this.load.image(targetObj.imageName, path + targetObj.imagePath);
        });

        // Load all items in item manifest
        path = "src/assets/items/icons/";
        const modelPath = "src/assets/items/models/";
        Object.entries(itemManifest).forEach(([item, itemObj]) => {
            if (itemObj.type == CONSTANTS.ITEM_TYPES.CURRENCY) {
                itemObj.imageName.forEach((name, i) => {
                    this.load.image(name, path + itemObj.imagePath[i]);
                    this.load.image(name + "-model", modelPath + itemObj.imagePath[i]);
                });
            } else {
                this.load.image(itemObj.imageName, path + itemObj.imagePath);
                this.load.image(
                    itemObj.imageName + "-model",
                    modelPath + itemObj.imagePath
                );
            }
        });

        // For attack animations
        this.load.image("fist", "src/assets/effects/Fist.png");
        this.load.image("bronze-arrow", "src/assets/effects/BronzeArrow.png");
        this.load.image("bronze-bolt", "src/assets/effects/BronzeBolt.png");
        this.load.image("fire-bolt", "src/assets/effects/FireBolt.png");
        this.load.image("furnace-hands", "src/assets/effects/FurnaceHands.png");
        this.load.image("hammer-hand", "src/assets/effects/HammerHand.png");
    }

    create() {
        // Check for previous play data
        characterData.getCookies();
        characterData.init(this);

        // Launch audio scene in parallel
        this.scene.launch(CONSTANTS.SCENES.AUDIO);
        const audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);
        audioScene.playBgm("scape-main");

        // Launch animation scene in parallel
        this.scene.launch(CONSTANTS.SCENES.ANIMATION);
    }
    updateProgress() {
        const itemLoadPercent = this.numItemsLoaded / this.totalItems;
        const totalLoadPercent = this.percentImagesLoaded / 2 + itemLoadPercent / 2;
        this.percentText.setText(
            "Loading good ol rs stuff " + parseInt(totalLoadPercent * 100) + "%"
        );
        this.progressBar.clear();
        this.progressBar.fillStyle(0xed1c24, 1);
        this.progressBar.fillRect(250, 280, 300 * totalLoadPercent, 30);
    }

    // Load item classes
    async loadItems() {
        for (const item in itemManifest) {
            setItemClass(item, await import("../items/" + itemManifest[item].classPath));
            this.numItemsLoaded++;
            this.assetText.text = "Loading asset: " + item;
            this.updateProgress();
        }

        // Remove loading stuff and create start screen
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
        this.percentText.destroy();
        this.assetText.destroy();

        this.add.text(250, 300, "Welcome to RS Clicker!", { font: "24px runescape" });
        this.add.text(250, 340, "Click the lesser demon to continue.", {
            font: "18px runescape",
        });

        // Add clickable lesser demon
        this.add
            .image(750, 600, "lesser-demon")
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start(CONSTANTS.SCENES.MAIN_MENU);
            });
    }
}
