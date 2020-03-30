import { LevelScene } from "./level.js";
import { CONSTANTS, calcLevel } from "../constants/constants.js";
import { AutoClicker } from "../auto-clicker.js";
import { Enemy } from "../enemy.js";

export class EnemyLevelScene extends LevelScene {
    // Level completion
    killQuest = 0;
    autoClickerButton;

    constructor(data) {
        super(data);

        this.killQuest = data.killQuest;
        this.levelType = CONSTANTS.LEVEL_TYPE.ENEMY;
    }

    childCreate() {
        // Buy auto clickers
        this.autoClickerButton = this.add
            .text(20, 60, "50 gold for autoclicker", { fill: "gold" })
            .setDepth(3)
            .setInteractive()
            .on("pointerup", () => {
                if (this.characterData.gold >= 50) {
                    this.stats.addGold(-50);
                    this.createAutoClicker({
                        dps: 5,
                        level: 1,
                        type: "Hired Bowman"
                    });
                }
            });

        // Create click objects
        this.clickObjectMetaData.forEach(clickObject => {
            this.clickObjects.push(
                new Enemy({
                    scene: this,
                    x: this.width / 2 - 100,
                    y: this.height / 2 - 115,
                    maxHealth: clickObject.maxHealth,
                    name: clickObject.name,
                    killGold: clickObject.killGold,
                    drops: clickObject.drops
                })
            );
        });

        // Load autoclickers after stats
        this.stats.events.on('create', () =>  {
            if (this.characterData.hasCookies && this.autoClickers.length == 0) {
                let numAutoClickers = this.characterData.numberOfAutoClickers;
                this.characterData.numberOfAutoClickers = 0;
                this.stats.autoClickDps = 0;
                this.stats.updateAutoClickerDPS(0);
                for (let i = 0; i < numAutoClickers; i++) {
                    this.createAutoClicker({
                        dps: 5,
                        level: 1,
                        type: "Hired Bowman"
                    });
                }
            }
        });
    }

    enemyKilled(name) {
        // Update kill quest score
        if (this.characterData[this.currentLevel].enemiesKilled[name] < this.killQuest) {
            this.characterData[this.currentLevel].enemiesKilled[name]++;

            let questCompleted = true;
            this.clickObjectMetaData.forEach((enemy, index) => {
                // Check for quest completion
                if (
                    this.characterData[this.currentLevel].enemiesKilled[enemy.name] <
                    this.killQuest
                ) {
                    questCompleted = false;
                }
                // Set as complete if all passed on last index
                else if (questCompleted && index == this.clickObjectMetaData.length - 1) {
                    this.characterData[this.currentLevel].questCompleted = true;
                    console.log("Quest complete!");
                }
            });
        }

        // Update text
        this.dashboard.updateKillQuestText();
        this.stats.updateEnemiesKilledStat();

        // Get new enemy
        this.showRandomClickObject();
    }

    createAutoClicker(data) {
        let autoClicker = new AutoClicker({
            scene: this,
            dps: data.dps,
            level: data.level,
            type: data.type
        });
        this.autoClickers.push(autoClicker);
        this.stats.updateAutoClickerDPS(data.dps);
        this.characterData.numberOfAutoClickers++;
    }

    getDamageLevel() {
        switch (this.characterData.characterClass) {
            case CONSTANTS.CLASS.MAGE:
                return calcLevel(this.characterData.skills.magic);
                break;
            case CONSTANTS.CLASS.RANGER:
                return calcLevel(this.characterData.skills.ranged);
                break;
            case CONSTANTS.CLASS.WARRIOR:
                return calcLevel(this.characterData.skills.attack);
                break;
        }
    }

    showAutoClickerButton(isVisible) {
        this.autoClickerButton.visible = isVisible;
    }
}
