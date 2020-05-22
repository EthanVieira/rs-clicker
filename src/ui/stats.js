import { defaultData } from "../default-data.js";
import { CONSTANTS, FONTS } from "../constants/constants.js";

export class StatsScene extends Phaser.Scene {
    // Target: enemy, tree, etc.
    levelType = "";

    // Character
    characterData;

    // Dashboard for inventory, etc.
    dashboard;

    // Text
    goldText = "";
    enemiesKilledText;
    timesClickedText;
    damageByClickingText;
    clickDpsText;
    damageByAutoClickText;
    autoClickDpsText;
    autoClickDps = 0;

    recentDamage = 0;
    timer;

    constructor(data) {
        super({ key: CONSTANTS.SCENES.STATS });
    }

    init(data) {
        this.characterData = data.characterData;
        this.levelType = data.levelType;
    }

    preload() {}

    create() {
        // Gold
        this.goldText = this.add
            .text(20, 20, "Gold: " + this.characterData.gold, FONTS.GOLD)
            .setDepth(3);

        // Show stats
        this.enemiesKilledText = this.add
            .text(
                20,
                60,
                "Enemies killed: " + this.characterData.totalEnemiesKilled,
                FONTS.STATS
            )
            .setDepth(3);
        this.timesClickedText = this.add
            .text(
                20,
                75,
                "Times clicked: " + this.characterData.timesClicked,
                FONTS.STATS
            )
            .setDepth(3);
        this.damageByClickingText = this.add
            .text(
                20,
                90,
                "Damage done by clicking: " + this.characterData.damageByClicking,
                FONTS.STATS
            )
            .setDepth(3);
        this.clickDpsText = this.add
            .text(20, 75, "Click DPS: 0", FONTS.STATS)
            .setDepth(3);
        this.damageByAutoClickText = this.add
            .text(
                20,
                105,
                "Damage done by autoclickers: " + Math.floor(this.characterData.damageByAutoClick),
                FONTS.STATS
            )
            .setDepth(3);
        this.autoClickDpsText = this.add
            .text(20, 120, "AutoClicker DPS: " + this.autoClickDps, FONTS.STATS)
            .setDepth(3);

        // Show stats depending on level
        this.showStats();

        // Access skills
        this.dashboard = this.scene.get(CONSTANTS.SCENES.DASHBOARD);

        // Setup dps timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.updateClickDpsStat();
            },
            loop: true,
        });
    }

    addGold(addedGold) {
        this.characterData.gold += addedGold;
        this.goldText.text = "Gold: " + this.characterData.gold;
    }

    updateClickedTargetStat() {
        this.characterData.timesClicked++;
        this.timesClickedText.text = "Times clicked: " + this.characterData.timesClicked;
    }

    updateClickDamageStat(damageDone) {
        // Increase click damage
        this.characterData.damageByClicking += damageDone;
        this.damageByClickingText.text =
            "Damage done by clicking: " + this.characterData.damageByClicking;

        // Collect damage for dps
        this.recentDamage += damageDone;
    }

    updateClickDpsStat() {
        this.clickDpsText.text = "Click DPS: " + this.recentDamage;
        this.recentDamage = 0;
    }

    updateEnemiesKilledStat() {
        this.characterData.totalEnemiesKilled++;
        this.enemiesKilledText.text =
            "Enemies killed: " + this.characterData.totalEnemiesKilled;
    }

    updateAutoClickDamageStat(damageDone) {
        this.characterData.damageByAutoClick += damageDone;
        this.damageByAutoClickText.text =
            "Damage done by autoclickers: " +
            Math.floor(this.characterData.damageByAutoClick);
    }

    updateAutoClickerDPS(dps) {
        this.autoClickDps += dps;
        this.autoClickDpsText.text = "AutoClicker DPS: " + this.autoClickDps;
    }

    showStats() {
        this.show(false);

        // Show level-relevant stats
        switch (this.levelType) {
            case CONSTANTS.LEVEL_TYPE.ENEMY:
                this.orderStats([
                    this.enemiesKilledText,
                    this.autoClickDpsText,
                    this.damageByAutoClickText,
                    this.timesClickedText,
                    this.damageByClickingText,
                    this.clickDpsText,
                ]);
                break;
            default:
                this.orderStats([this.timesClickedText]);
                break;
        }
    }

    // Takes in array of text objects and displays them in order
    orderStats(statsArray) {
        let yPos = 75;
        statsArray.forEach((stat) => {
            stat.y = yPos;
            stat.visible = true;
            yPos += 16;
        });
    }

    show(isVisible) {
        this.enemiesKilledText.visible = isVisible;
        this.timesClickedText.visible = isVisible;
        this.damageByClickingText.visible = isVisible;
        this.autoClickDpsText.visible = isVisible;
        this.damageByAutoClickText.visible = isVisible;
        this.clickDpsText.visible = isVisible;
    }
}
