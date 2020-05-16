import { CONSTANTS, EQUIPMENT } from "../constants/constants.js";
import { defaultData } from "../default-data.js";
import { HiredBowman } from "../auto-clickers/hired-bowman.js";
import { storeCookies } from "../utilities.js";

export class LevelScene extends Phaser.Scene {
    // General info that all levels should implement
    width = 0;
    height = 0;
    timeDelta = 0;

    background = {
        name: "",
        path: "",
    };

    minimap = {
        name: "",
        path: "",
    };

    // targets: enemy, tree, etc.
    targets = [];
    targetMetaData = [];
    currentTargetIndex = 0;
    levelType = "";

    // Cookies
    autoClickers = [];
    autoClickerButton;

    // Character
    characterData;

    // Dashboard for inventory, skills, etc.
    dashboard;
    stats;

    // For enemy levels
    killQuest = 0;

    constructor(data) {
        super({
            key: data.key,
        });

        // Get data from child class
        this.background = data.background;
        this.minimap = data.minimap;
        this.audio = data.audio;
        this.targetMetaData = data.targets;

        // Store current level to return to after leaving shop
        this.currentLevel = data.key;
        this.levelType = data.levelType;

        if (this.levelType == CONSTANTS.LEVEL_TYPE.ENEMY) {
            this.killQuest = data.killQuest;
        }
    }

    init(characterData) {
        // Receive cookies if they exist
        this.characterData = characterData;
    }

    preload() {
        // Background
        this.load.image(this.background.name, this.background.path);

        // Minimap
        this.load.image(this.minimap.name, this.minimap.path);

        // Overlay
        this.load.image("overlay", "src/assets/ui/InterfaceNoChat.png");

        // Exit button
        this.load.image("exit-button", "src/assets/ui/buttons/ExitButton.png");
    }

    create() {
        // Set current level
        this.characterData.currentLevel = this.currentLevel;

        // Play music
        let audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);
        audioScene.playBgm(this.audio.bgm);

        // Initialize volume levels
        audioScene.changeVolume(0, this.characterData.audio[0]);
        audioScene.changeVolume(1, this.characterData.audio[1]);
        audioScene.changeVolume(2, this.characterData.audio[2]);

        // Launch dashboard, stats, and chat scenes in parallel
        this.scene.run(CONSTANTS.SCENES.DASHBOARD, this.characterData);
        this.dashboard = this.scene.get(CONSTANTS.SCENES.DASHBOARD);
        this.scene.run(CONSTANTS.SCENES.STATS, {
            characterData: this.characterData,
            levelType: this.levelType,
        });
        this.stats = this.scene.get(CONSTANTS.SCENES.STATS);
        this.scene.run(CONSTANTS.SCENES.CHAT, this.characterData);

        // Helper vars
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // Background
        this.add.image(0, 0, this.background.name).setOrigin(0, 0).setDepth(0);

        // Create targets
        this.targetMetaData.forEach((target) => {
            this.targets.push(new target(this));
        });

        // Minimap
        this.minimap.obj = this.add
            .image(570, 0, this.minimap.name)
            .setOrigin(0, 0)
            .setDepth(0);
        this.minimap.obj.setInteractive();
        this.minimap.obj.on("pointerup", () => {
            this.scene.start(CONSTANTS.SCENES.MAP, this.characterData);
            console.log("Going to World Map");
        });

        // Overlay
        this.add.image(0, 0, "overlay").setOrigin(0, 0).setDepth(1);

        // Exit button
        let exitButton = this.add
            .image(this.width - 30, 0, "exit-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive();
        exitButton.on("pointerup", () => {
            audioScene.playBgm("scape-main");
            this.scene.start(CONSTANTS.SCENES.MAIN_MENU, this.characterData);
        });

        // Buy auto clickers
        this.autoClickerButton = this.add
            .text(20, 50, "50 gold for autoclicker", { font: "20px runescape", fill: "gold" })
            .setDepth(3)
            .setInteractive()
            .on("pointerup", () => {
                if (this.characterData.gold >= 50) {
                    this.stats.addGold(-50);
                    this.createAutoClicker();
                }
            });

        // Load autoclickers after stats
        this.stats.events.once("create", () => {
            if (this.characterData.hasCookies && this.autoClickers.length == 0) {
                let numAutoClickers = this.characterData.numberOfAutoClickers;
                this.characterData.numberOfAutoClickers = 0;
                this.stats.autoClickDps = 0;
                this.stats.updateAutoClickerDPS(0);
                for (let i = 0; i < numAutoClickers; i++) {
                    this.createAutoClicker();
                }
            }
        });

        // Display first click object
        this.targets[this.currentTargetIndex].show();

        // Scene destructor
        this.events.on("shutdown", () => {
            // Release autoclickers to be garbage collected
            this.clearAutoClickers();
            // Hide dashboard and stats
            this.scene.stop(CONSTANTS.SCENES.DASHBOARD);
            this.scene.stop(CONSTANTS.SCENES.STATS);
        });
    }

    update(time, delta) {
        // Update cookies every second
        if (this.timeDelta >= 1000) {
            storeCookies(this.characterData);
            this.timeDelta = 0;
        } else {
            this.timeDelta += delta;
        }
    }

    // Used by autoclicker
    clickCurrentTarget(damage) {
        this.targets[this.currentTargetIndex].updateProgress(damage);
    }

    // Need to clear data before changing scenes
    clearAutoClickers() {
        for (let i = 0; i < this.autoClickers.length; i++) {
            this.autoClickers[i].release();
        }
        this.autoClickers = [];
        this.targets = [];
    }

    enemyKilled(name) {
        // Update kill quest score
        if (this.characterData[this.currentLevel].enemiesKilled[name] < this.killQuest) {
            this.characterData[this.currentLevel].enemiesKilled[name]++;

            let questCompleted = true;
            this.targetMetaData.forEach((enemy, index) => {
                // Check for quest completion
                if (
                    this.characterData[this.currentLevel].enemiesKilled[name] <
                    this.killQuest
                ) {
                    questCompleted = false;
                }
                // Set as complete if all passed on last index
                else if (questCompleted && index == this.targetMetaData.length - 1) {
                    this.characterData[this.currentLevel].questCompleted = true;
                    console.log("Quest complete!");
                }
            });
        }

        // Update text
        this.dashboard.updateKillQuestText();
        this.stats.updateEnemiesKilledStat();
    }

    showAutoClickerButton(isVisible) {
        this.autoClickerButton.visible = isVisible;
    }

    createAutoClicker() {
        let autoClicker = new HiredBowman(this);
        this.autoClickers.push(autoClicker);
        this.stats.updateAutoClickerDPS(autoClicker.dps);
        this.characterData.numberOfAutoClickers++;
    }

    clickAnimation() {
        // Animation settings
        let image = {},
            imageName = "",
            startX = 0,
            startY = 0,
            scale = 1,
            curve = 0,
            alpha = 1;

        // Get current weapon image
        let curWeapon = this.dashboard.equipment.obj.equipment.WEAPON;
        if (Object.keys(curWeapon).length) {
            // Set animation based on current weapon
            switch (curWeapon.skill) {
                // Melee weapons use the weapon model image
                case EQUIPMENT.WEAPON_TYPES.MELEE:
                    imageName = curWeapon.sprite.texture.key + "-model";
                    scale = 0.5;

                    // Different animations for different attack styles
                    switch (curWeapon.style) {
                        case EQUIPMENT.ATTACK_STYLE.STAB:
                            startX = 200;
                            startY = 430;
                            break;
                        case EQUIPMENT.ATTACK_STYLE.CRUSH:
                            startX = 450;
                            startY = 200;
                            break
                        case EQUIPMENT.ATTACK_STYLE.SLASH:
                            curve = 1;
                            startX = 450;
                            startY = 400;
                            break;
                    }
                    break;

                // Ranged uses arrows
                case EQUIPMENT.WEAPON_TYPES.RANGED:
                    imageName = "bronze-arrow";
                    scale = 0.8;
                    curve = 1;
                    startX = 470;
                    startY = 350;
                    break;

                // Magic uses spells
                case EQUIPMENT.WEAPON_TYPES.MAGIC:
                    imageName = "fire-bolt";
                    scale = 0.3;
                    curve = 0.5;
                    startX = 470;
                    startY = 350;
                    alpha = 0.5;
                    break;
                default:
                    console.log("Error: item does not have attack type");
                    break;
            }
        } else {
            // Fist animation
            imageName = "fist";
            scale = 1;
            startX = 450;
            startY = 400;
        }

        // Add animation image
        image = this.add
                .image(startX, startY, imageName)
                .setScale(scale)
                .setDepth(4)
                .setAlpha(alpha);

        // Move animation
        let endX = Math.floor(this.width / 2) - 100,
            endY = Math.floor(this.height / 2);
        this.tweens.add({
                targets: image,
                x: endX,
                y: endY,
                duration: 500,
                ease: (t) => {
                    return Math.pow(Math.sin(t * 3), 3);
                },
                onComplete: () => {
                    image.destroy();
                },
                onUpdate: () => {
                    // Destroy if within 1 pixel of end point
                    // Otherwise image will return to origin
                    if ((image.x >= endX - 1 && image.x <= endX + 1) && 
                        (image.y >= endY - 1 && image.y <= endY + 1)) {
                        image.destroy();
                    } else {
                        image.scale -= 0.005;
                        image.angle -= curve;
                        if (image.alpha < 1) {
                            image.alpha += .03;
                        }
                    }
                },
                repeat: 0,
                delay: 50,
            });
    }
}
