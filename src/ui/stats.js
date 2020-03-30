import { defaultData } from "../default-data.js";
import { CONSTANTS } from "../constants/constants.js";

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
    damageByAutoClickText
    autoClickDpsText;
    autoClickDps = 0;

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
            .text(20, 20, "Gold: " + this.characterData.gold, {
                fill: "gold",
                fontSize: "30px"
            })
            .setDepth(3);

        // Show stats
        let statColor = "white";
        this.enemiesKilledText = this.add
            .text(20, 60, "Enemies killed: " + this.characterData.totalEnemiesKilled, {
                fill: statColor
            })
            .setDepth(3);
        this.timesClickedText = this.add
            .text(20, 75, "Times clicked: " + this.characterData.timesClicked, {
                fill: statColor
            })
            .setDepth(3);
        this.damageByClickingText = this.add
            .text(
                20,
                90,
                "Damage done by clicking: " + this.characterData.damageByClicking,
                {
                    fill: statColor
                }
            )
            .setDepth(3);
        this.damageByAutoClickText = this.add
            .text(
                20,
                105,
                "Damage done by autoclickers: " + this.characterData.damageByAutoClick,
                {
                    fill: statColor
                }
            )
            .setDepth(3);        
        this.autoClickDpsText = this.add
            .text(20, 120, "AutoClicker DPS: " + this.autoClickDps, {
                fill: statColor
            })
            .setDepth(3);

        // Show stats depending on level
        this.showStats();

        // Access skills
        this.dashboard = this.scene.get(CONSTANTS.SCENES.DASHBOARD);
        console.log("end of create");
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

        // Increase attack XP
        switch (this.characterData.characterClass) {
            case CONSTANTS.CLASS.MAGE:
                this.characterData.skills.magic += damageDone;
                break;
            case CONSTANTS.CLASS.RANGER:
                this.characterData.skills.ranged += damageDone;
                break;
            case CONSTANTS.CLASS.WARRIOR:
                this.characterData.skills.attack += damageDone;
                break;
        }

        this.dashboard.updateSkillsText();
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
        switch(this.levelType) {
            case CONSTANTS.LEVEL_TYPE.ENEMY:
                this.orderStats([
                    this.enemiesKilledText,
                    this.timesClickedText,
                    this.damageByClickingText,
                    this.autoClickDpsText,
                    this.damageByAutoClickText
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
        statsArray.forEach(stat => {
            stat.y = yPos;
            stat.visible = true;
            yPos += 15;
        });
    }

    show(isVisible) {
        this.enemiesKilledText.visible = isVisible;
        this.timesClickedText.visible = isVisible;
        this.damageByClickingText.visible = isVisible;
        this.autoClickDpsText.visible = isVisible;
        this.damageByAutoClickText.visible = isVisible;
    }
}
