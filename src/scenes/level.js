import { CONSTANTS, EQUIPMENT } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";
import { getItemClass } from "../utilities.js";

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

    // Targets: enemy, tree, etc.
    targets = [];
    targetMetaData = [];
    currentTargetIndex = 0;
    levelType = "";
    resourceType = "";
    // For enemy levels
    // varName: amount
    // giantRat: 10
    questAmounts = {};

    // Scenes
    dashboard;
    stats;
    audioScene;

    constructor(data) {
        super({
            key: data.key,
        });

        // Get data from child class
        this.background = data.background;
        this.minimap = data.minimap;
        this.audio = data.audio;
        this.targetMetaData = data.targets;
        this.questAmounts = data.questAmounts;

        // Store current level to return to after leaving shop
        this.currentLevel = data.key;
        this.levelType = data.levelType;
        this.resourceType = data.resourceType;
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
        characterData.setCurrentLevel(this.currentLevel);

        // Play music
        this.audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);
        this.audioScene.playBgm(this.audio.bgm);

        // Launch dashboard, stats, and chat scenes in parallel
        this.scene.run(CONSTANTS.SCENES.DASHBOARD);
        this.dashboard = this.scene.get(CONSTANTS.SCENES.DASHBOARD);
        this.scene.run(CONSTANTS.SCENES.STATS, {
            levelType: this.levelType,
        });
        this.stats = this.scene.get(CONSTANTS.SCENES.STATS);
        this.scene.run(CONSTANTS.SCENES.CHAT);

        // Helper vars
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // Background
        this.add.image(0, 0, this.background.name).setOrigin(0, 0).setDepth(0);

        // Minimap
        this.minimap.obj = this.add
            .image(570, 0, this.minimap.name)
            .setOrigin(0, 0)
            .setDepth(0)
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start(CONSTANTS.SCENES.MAP);
                console.log("Going to World Map");
            });

        // Overlay
        this.add.image(0, 0, "overlay").setOrigin(0, 0).setDepth(1);

        // Exit button
        this.add
            .image(this.width - 30, 0, "exit-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerup", () => {
                this.scene.start(CONSTANTS.SCENES.MAIN_MENU);
            });

        // Create targets
        this.targetMetaData.forEach((target) => {
            this.targets.push(new target(this));
        });

        // Display a target
        this.targets[this.currentTargetIndex].setVisible();

        // Scene destructor
        this.events.once("shutdown", () => {
            this.targets = [];

            // Hide dashboard and stats
            const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
            chatScene.setVisible(false);
            this.scene.stop(CONSTANTS.SCENES.CHAT);
            this.scene.stop(CONSTANTS.SCENES.DASHBOARD);
            this.scene.stop(CONSTANTS.SCENES.STATS);
        });
    }

    update(time, delta) {
        // Update cookies every second
        if (this.timeDelta >= 1000) {
            characterData.storeCookies();
            this.timeDelta = 0;
        } else {
            this.timeDelta += delta;
        }
    }

    // Used by autoclicker
    clickCurrentTarget(damage) {
        this.targets[this.currentTargetIndex].updateProgress(damage);
        this.scene.dashboard.quests.refreshStats();
    }

    enemyKilled(name) {
        // Update kill quest score
        const enemiesKilled = characterData.getEnemiesKilled(this.currentLevel, name);
        const maxKillCount = this.questAmounts[name][this.questAmounts[name].length - 1];
        if (enemiesKilled < maxKillCount) {
            characterData.incEnemiesKilled(this.currentLevel, name);

            if (!characterData.getQuestCompleted(this.currentLevel)) {
                // Check for level completion.
                const questCompleted = this.targets.every(
                    (enemy) =>
                        // A level is considered complete when
                        // all of the tier 1 (index 0) quests are complete.
                        characterData.getEnemiesKilled(
                            this.currentLevel,
                            enemy.varName
                        ) >= this.questAmounts[enemy.varName][0]
                );

                // Set as complete if all passed
                if (questCompleted) {
                    console.log("Quest complete!");
                    characterData.setQuestCompleted(this.currentLevel);

                    if (Math.random() < 0.5) {
                        this.audioScene.playSfx("quest-complete-1");
                    } else {
                        this.audioScene.playSfx("quest-complete-2");
                    }
                }
            }
        }

        // Update text
        this.dashboard.quests.refreshQuests();
        this.stats.updateEnemiesKilledStat();
    }

    async clickAnimation() {
        // Animation settings
        let imageName = "",
            startX = 0,
            startY = 0,
            scale = 1,
            curve = 0,
            alpha = 1,
            flipX = false;

        // Default to using currently equipped weapon
        let curWeapon = this.dashboard.equipment.equipment.WEAPON;
        let useWeapon = true;

        // Find correct item for resource if it's not equipped
        if (this.levelType == CONSTANTS.LEVEL_TYPE.RESOURCE) {
            const inventory = this.dashboard.inventory;

            switch (this.resourceType) {
                case CONSTANTS.RESOURCES.WOOD:
                    if (curWeapon?.item != "Axe") {
                        const i = inventory.getKeywordInInventory("Axe", true, [
                            "woodcutting",
                        ]);
                        curWeapon = inventory.inventory[i];
                    }
                    break;
                case CONSTANTS.RESOURCES.ORE:
                    if (curWeapon?.item != "Pickaxe") {
                        const i = inventory.getKeywordInInventory("Pickaxe", true, [
                            "mining",
                        ]);
                        curWeapon = inventory.inventory[i];
                    }
                    break;
                default:
                    console.log(
                        "Error: this resource type does not exist.",
                        this.resourceType
                    );
                    return;
            }
        } else if (this.levelType == CONSTANTS.LEVEL_TYPE.CRAFTING) {
            imageName = "furnace-hands";
            scale = 0.7;
            startX = 450;
            startY = 400;

            useWeapon = false;
        }
        // No weapon, use fist
        else if (!curWeapon) {
            imageName = "fist";
            scale = 1;
            startX = 450;
            startY = 400;

            useWeapon = false;
        }

        // Get animation data from weapon obj
        if (useWeapon) {
            ({
                imageName,
                startX,
                startY,
                scale,
                curve,
                alpha,
                flipX,
            } = curWeapon.animation);

            if (imageName == "") {
                imageName = curWeapon.sprite.texture.key + "-model";
            }
        }

        // Add animation image
        const image = this.add
            .image(startX, startY, imageName)
            .setScale(scale)
            .setDepth(4)
            .setAlpha(alpha)
            .setFlipX(flipX);

        // Move animation
        const endX = Math.floor(this.width / 2) - 100,
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
                if (
                    image.x >= endX - 1 &&
                    image.x <= endX + 1 &&
                    image.y >= endY - 1 &&
                    image.y <= endY + 1
                ) {
                    image.destroy();
                } else {
                    image.scale -= 0.005;
                    image.angle -= curve;
                    if (image.alpha < 1) {
                        image.alpha += 0.03;
                    }
                }
            },
            repeat: 0,
            delay: 50,
        });
    }
}
