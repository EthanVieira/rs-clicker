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
    // The number of quest points awarded for completing a level
    // The level is considered complete when all of the tier 1 quests are complete
    questPointAward = 0;

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
        this.questPointAward = data.questPointAward;

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
        this.scene.get(CONSTANTS.SCENES.DASHBOARD).quests.refreshStats();
    }

    enemyKilled(name) {
        // Check if quest even exists
        if (!this.questExists(name)) {
            console.log("Attempted to advance a non-existent quest:", name);
            return;
        }

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
                    characterData.addQuestPoints(this.questPointAward);

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

    questExists(name) {
        return !this.questAmounts[name] ? false : true;
    }
}
