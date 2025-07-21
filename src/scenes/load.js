import { CONSTANTS } from "../constants/constants.js";
import { AVAILABLE_INDEX, SPELL_MANIFEST } from "../constants/spell-manifest.js";
import { PRAYER_MANIFEST } from "../constants/prayer-manifest.js";
import { characterData } from "../cookie-io.js";
import { itemManifest } from "../items/item-manifest.js";
import { targetManifest } from "../targets/target-manifest.js";
import { dashToPascalCase, setItemClass } from "../utilities.js";

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
                        url: "assets/sprites/LesserDemon.png",
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
        this.load.image("blue-hitsplat", "assets/effects/BlueHitsplat.png");
        this.load.image("red-hitsplat", "assets/effects/RedHitsplat.png");

        // Enemies
        this.load.image("chicken", "assets/sprites/Chicken.png");
        this.load.image("lesser-demon", "assets/sprites/LesserDemon.png");

        // Backgrounds/Logos
        this.load.image("main-menu-bg", "assets/backgrounds/MainMenuBg.png");
        this.load.image("main-menu", "assets/ui/MainMenu.png");
        this.load.image("rsc-logo", "assets/logos/RSCLogo.png");

        // Buttons
        this.load.image("play-button", "assets/ui/buttons/PlayButton.png");
        this.load.image("settings-button", "assets/ui/buttons/SettingsButton.png");

        // Dashboard UI
        // Panels and buttons
        this.load.image("xp-button", "assets/ui/buttons/XpCounterButton.png");
        this.load.image("inventory-button", "assets/ui/buttons/InventoryButton.png");
        this.load.image("skills-panel", "assets/ui/SkillsPanel.png");
        this.load.image("skills-button", "assets/ui/buttons/SkillsButton.png");
        this.load.image("skills-info", "assets/ui/SkillsInfo.png");
        this.load.image("prayer-panel", "assets/ui/EmptyPanel.png");
        this.load.image("prayer-button", "assets/ui/buttons/PrayerButton.png");

        for (const prayer in PRAYER_MANIFEST.StandardPrayers) {
            const prayerManifest = PRAYER_MANIFEST.StandardPrayers[prayer];
            this.load.image(
                prayerManifest.imageName,
                "assets/ui/icons/prayers/" + prayerManifest.imagePath
            );
        }

        this.load.image("audio-settings", "assets/ui/AudioSettings.png");
        this.load.image(
            "audio-settings-button",
            "assets/ui/buttons/AudioSettingsButton.png"
        );
        this.load.image("audio-button", "assets/ui/buttons/AudioButton.png");
        this.load.image("quests-panel", "assets/ui/QuestsPanel.png");
        this.load.image("quests-button", "assets/ui/buttons/QuestsButton.png");
        this.load.image("quests-tab-button", "assets/ui/buttons/QuestsTabButton.png");
        this.load.image("stats-tab-button", "assets/ui/buttons/StatsTabButton.png");
        this.load.image("equipment-panel", "assets/ui/EquipmentPanel.png");
        this.load.image("equipment-background", "assets/ui/EquipmentBackground.png");
        this.load.image("equipment-button", "assets/ui/buttons/EquipmentButton.png");
        this.load.image("clan-panel", "assets/ui/ClanPanel.png");
        this.load.image("clan-button", "assets/ui/buttons/ClanButton.png");
        this.load.image("friends-panel", "assets/ui/FriendsPanel.png");
        this.load.image("friends-button", "assets/ui/buttons/FriendsButton.png");
        this.load.image("add-friend-button", "assets/ui/buttons/AddFriendButton.png");
        this.load.image(
            "delete-friend-button",
            "assets/ui/buttons/DeleteFriendButton.png"
        );
        this.load.image("music-panel", "assets/ui/MusicPanel.png");
        this.load.image("music-button", "assets/ui/buttons/MusicButton.png");

        this.load.image("spellbook-panel", "assets/ui/EmptyPanel.png");
        this.load.image("spellbook-button", "assets/ui/buttons/SpellbookButton.png");

        for (const spell in SPELL_MANIFEST.StandardSpellbook) {
            const spellManifest = SPELL_MANIFEST.StandardSpellbook[spell];
            spellManifest.imageNames.forEach((iconName, i) => {
                this.load.image(
                    iconName,
                    "assets/ui/icons/spells/" + spellManifest.imagePaths[i]
                );

                if (i == AVAILABLE_INDEX) {
                    this.load.image(
                        iconName + "-effect",
                        "assets/effects/spells/" + spellManifest.imagePaths[i]
                    );
                }
            });
        }

        for (let i = 2; i <= 6; i++) {
            this.load.image(`right-click-menu-${i}`, `assets/ui/RightClickMenu_${i}.png`);
        }

        this.load.image("scroll-background", "assets/ui/ScrollBackground.png");
        this.load.image("scroll-header", "assets/ui/ScrollHeader.png");
        this.load.image("scroll-footer", "assets/ui/ScrollFooter.png");
        this.load.image("scroll-button", "assets/ui/ScrollButton.png");

        // Combat styles and panel
        this.load.image("combat-style-button", "assets/ui/buttons/CombatStyleButton.png");
        this.load.image(
            "combat-style-button-on",
            "assets/ui/buttons/CombatStyleButtonOn.png"
        );
        this.load.image(
            "combat-style-button-off",
            "assets/ui/buttons/CombatStyleButtonOff.png"
        );
        this.load.image("combat-style-panel", "assets/ui/CombatStylePanel.png");
        this.load.image(
            "combat-style-retaliate-button",
            "assets/ui/buttons/CombatStyleRetaliateButton.png"
        );

        const combatStyles = [
            "axe-chop",
            "axe-hack",
            "axe-smash",
            "axe-block",
            "blunt-pound",
            "blunt-pummel",
            "blunt-block",
            "bow-accurate",
            "bow-rapid",
            "bow-longrange",
            "chinchompa-short-fuse",
            "chinchompa-medium-fuse",
            "chinchompa-long-fuse",
            "claw-chop",
            "claw-slash",
            "claw-lunge",
            "claw-block",
            "crossbow-accurate",
            "crossbow-rapid",
            "crossbow-longrange",
            "pickaxe-spike",
            "pickaxe-impale",
            "pickaxe-smash",
            "pickaxe-block",
            "polearm-jab",
            "polearm-swipe",
            "polearm-block",
            "salamander-scorch",
            "salamander-flare",
            "salamander-blaze",
            "scythe-reap",
            "scythe-chop",
            "scythe-jab",
            "scythe-block",
            "sword-chop",
            "sword-slash",
            "sword-block",
            "sword-stab",
            "spear-lunge",
            "spear-swipe",
            "spear-pound",
            "spear-block",
            "spiked-pound",
            "spiked-pummel",
            "spiked-spike",
            "spiked-block",
            "staff-jab",
            "staff-pound",
            "staff-block",
            "thrown-accurate",
            "thrown-rapid",
            "thrown-longrange",
            "unarmed-punch",
            "unarmed-kick",
            "unarmed-block",
            "whip-flick",
            "whip-lash",
        ];

        combatStyles.forEach((style) => {
            this.load.image(
                style,
                "assets/ui/icons/combat-styles/" +
                    dashToPascalCase(style) +
                    "CombatStyle.png"
            );
        });

        // Modal
        this.load.image("smithing-interface", "assets/ui/SmithingInterface.png");

        // Load all targets in target manifest
        let path = "assets/sprites/";
        Object.entries(targetManifest).forEach(([target, targetObj]) => {
            this.load.image(targetObj.imageName, path + targetObj.imagePath);
        });

        // Load all items in item manifest
        path = "assets/items/icons/";
        const modelPath = "assets/items/models/";
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
        this.load.image("fist", "assets/effects/Fist.png");
        this.load.image("bronze-arrow", "assets/effects/BronzeArrow.png");
        this.load.image("bronze-bolt", "assets/effects/BronzeBolt.png");
        this.load.image("furnace-hands", "assets/effects/FurnaceHands.png");
        this.load.image("hammer-hand", "assets/effects/HammerHand.png");
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
