import { CONSTANTS, FONTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";

export class StatsScene extends Phaser.Scene {
    // Target: enemy, tree, etc.
    levelType = "";

    // Text
    goldText;
    enemiesKilledText;
    timesClickedText;
    damageByClickingText;
    clickDpsText;
    damageByAutoClickText;
    autoClickDpsText;
    autoClickDps = 0;
    totalGoldEarned = 25;

    recentDamage = 0;
    timer;

    constructor(data) {
        super({ key: CONSTANTS.SCENES.STATS });
    }

    init(data) {
        this.levelType = data.levelType;
    }

    create() {
        // Show stats
        this.goldText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);
        this.enemiesKilledText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);
        this.timesClickedText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);
        this.damageByClickingText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);
        this.clickDpsText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);
        this.damageByAutoClickText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);
        this.autoClickDpsText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);

        this.events.once("create", () => {
            this.initText();
            this.showStats();
        });

        // Setup dps timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.updateClickDpsStat();
            },
            loop: true,
        });
    }

    initText() {
        this.updateTotalEarnedGold(0);
        this.updateClickedTargetStat(0);
        this.updateClickDamageStat(0);
        this.updateClickDpsStat(0);
        this.updateEnemiesKilledStat(0);
        this.updateAutoClickDamageStat(0);
        this.updateAutoClickerDPS(0);
    }

    updateTotalEarnedGold(addedGold) {
        if (addedGold >= 0) {
            this.totalGoldEarned += addedGold;
            this.goldText.text = "Total Gold Earned: " + this.totalGoldEarned;
        }
    }

    updateClickedTargetStat(amount = 1) {
        characterData.addTimesClicked(amount);
        this.timesClickedText.text = "Times clicked: " + characterData.getTimesClicked();
    }

    updateClickDamageStat(damageDone) {
        // Increase click damage
        characterData.addDamageByClicking(damageDone);
        this.damageByClickingText.text =
            "Damage done by clicking: " + characterData.getDamageByClicking();

        // Collect damage for dps
        this.recentDamage += damageDone;
    }

    updateClickDpsStat() {
        this.clickDpsText.text = "Click DPS: " + this.recentDamage;
        this.recentDamage = 0;
    }

    updateEnemiesKilledStat() {
        this.enemiesKilledText.text =
            "Enemies killed: " + characterData.getTotalEnemiesKilled();
    }

    updateAutoClickDamageStat(damageDone) {
        characterData.addDamageByAutoClicker(damageDone);
        this.damageByAutoClickText.text =
            "Damage done by autoclickers: " + characterData.getDamageByAutoclicker();
    }

    updateAutoClickerDPS(dps) {
        this.autoClickDps += dps;
        this.autoClickDpsText.text = "AutoClicker DPS: " + this.autoClickDps;
    }

    resetAutoclickerDps() {
        this.autoClickDps = 0;
    }

    showStats() {
        this.setVisible(false);

        // Show level-relevant stats
        this.orderStats([
            this.goldText,
            this.enemiesKilledText,
            this.autoClickDpsText,
            this.damageByAutoClickText,
            this.timesClickedText,
            this.damageByClickingText,
            this.clickDpsText,
        ]);
    }

    // Takes in array of text objects and displays them in order
    orderStats(statsArray) {
        let xPos = 10;
        let yPos = 50;
        statsArray.forEach((stat) => {
            stat.x = xPos;
            stat.y = yPos;
            stat.visible = true;
            yPos += 16;
        });
    }

    setVisible(isVisible = true) {
        this.enemiesKilledText.visible = isVisible;
        this.timesClickedText.visible = isVisible;
        this.damageByClickingText.visible = isVisible;
        this.autoClickDpsText.visible = isVisible;
        this.damageByAutoClickText.visible = isVisible;
        this.clickDpsText.visible = isVisible;
    }
}
