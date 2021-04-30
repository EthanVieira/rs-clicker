import { CONSTANTS, FONTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";

export class StatsScene extends Phaser.Scene {
    // Target: enemy, tree, etc.
    levelType = "";

    // Text
    statText = {
        totalGoldEarned: "",
        enemiesKilled: "",
        timesClicked: "",
        damageByClicking: "",
        damageByAutoclickers: "",
        totalDPS: "",
    };

    dpsText;

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
        this.dpsText = this.add.text(0, 0, "", FONTS.STATS).setDepth(3);

        this.events.once("create", () => {
            this.initText();
            this.showStats();
        });

        // Setup dps timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.updateDpsStat();
            },
            loop: true,
        });
    }

    initText() {
        this.updateTotalEarnedGold(0);
        this.updateClickedTargetStat(0);
        this.updateClickDamageStat(0);
        this.updateDpsStat(0);
        this.updateEnemiesKilledStat(0);
        this.updateAutoClickDamageStat(0);
        this.updateAutoClickerDPS(0);
    }

    getStats() {
        return this.statText;
    }

    updateTotalEarnedGold(addedGold) {
        if (addedGold >= 0) {
            this.totalGoldEarned += addedGold;
            this.statText["totalGoldEarned"] = "GP earned: " + this.totalGoldEarned;
        }
    }

    updateClickedTargetStat(amount = 1) {
        characterData.addTimesClicked(amount);
        this.statText["timesClicked"] =
            "Times clicked: " + characterData.getTimesClicked();
    }

    updateClickDamageStat(damageDone) {
        // Increase click damage
        characterData.addDamageByClicking(damageDone);
        this.statText["damageByClicking"] =
            "Clicking dmg: " + characterData.getDamageByClicking();

        // Collect damage for dps
        this.recentDamage += damageDone;
    }

    updateDpsStat() {
        this.dpsText.text = "DPS: " + (this.recentDamage + this.autoClickDps);
        this.statText["totalDPS"] = this.dpsText.text;
        this.recentDamage = 0;
    }

    // TODO: Display stat for each enemy type
    updateEnemiesKilledStat() {
        this.statText["enemiesKilled"] =
            "Enemies slain: " + characterData.getTotalEnemiesKilled();
    }

    updateAutoClickDamageStat(damageDone) {
        characterData.addDamageByAutoClicker(damageDone);
        this.statText["damageByAutoclickers"] =
            "Clan dmg: " + characterData.getDamageByAutoclicker();
    }

    updateAutoClickerDPS(dps) {
        this.autoClickDps += dps;
    }

    resetAutoclickerDps() {
        this.autoClickDps = 0;
    }

    showStats() {
        this.setVisible(false);

        // Show level-relevant stats
        this.orderStats([this.dpsText]);
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
        this.dpsText.visible = isVisible;
    }
}
