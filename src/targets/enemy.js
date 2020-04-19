import { HealthBar } from "../ui/health-bar.js";
import { Target } from "./target.js";
import { CONSTANTS, EQUIPMENT } from "../constants/constants.js";
import { calcLevel } from "../utilities.js";

export class Enemy extends Target {
    blueHitsplat;
    redHitsplat;
    hitsplatText = "1";
    killGold;

    constructor(data) {
        data.scale = 0.4;
        super(data);

        // Add hitsplats
        this.blueHitsplat = data.scene.add
            .image(this.x, this.y + 50, "blue-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(4)
            .setScale(0.3);
        this.blueHitsplat.visible = false;

        this.redHitsplat = data.scene.add
            .image(this.x, this.y + 50, "red-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(4)
            .setScale(0.3);
        this.redHitsplat.visible = false;

        // Add damage text
        this.hitsplatText = data.scene.add
            .text(this.x, this.y + 100, "1", {
                fill: "white"
            })
            .setOrigin(0.5, 0)
            .setDepth(5);
        this.hitsplatText.visible = false;

        // Add health bar
        this.progressBar = new HealthBar(data.scene, this.x, this.y - 40, data.maxHealth);

        // Enemy specific vars
        this.killGold = data.killGold;
    }

    getClickValue() {
        // Get damage based on level
        let damageLevel = this.getDamageLevel();

        // Get weapon stats
        let equipmenStrengthBonus = 0;
        let equipmentLevel = 0;
        if (Object.entries(this.equipment.obj.equipment.WEAPON).length) {
            equipmentLevel = this.equipment.obj.equipment.WEAPON.requiredLevel;
            equipmenStrengthBonus = this.equipment.obj.equipment.WEAPON.strengthBonus;
        }

        // Strength level bonuses
        let potBonus = 0;
        let styleBonus = 1; // Aggressive: 3, Controlled: 1, Accurate/Defensive: 0
        let prayerCoeff = 1;

        // Get damage level after bonuses
        let effectiveDamageLevel = Math.floor((damageLevel + potBonus) * prayerCoeff) + styleBonus;
        console.log("effective damage level", effectiveDamageLevel)
        // Get max hit
        let maxHit = Math.floor(1.3 + (effectiveDamageLevel/10) + (equipmenStrengthBonus/80) + ((effectiveDamageLevel * equipmenStrengthBonus) / 640));
        
        // Check accuracy
        let affinity = 55;
        let accuracy = this.calcLevelCoeff(damageLevel) + 2.5 * this.calcLevelCoeff(equipmentLevel);
        let defense = this.calcLevelCoeff(this.defense) + 2.5 * this.calcLevelCoeff(0);
        let hitChance = affinity * (accuracy / defense);
        
        console.log("hit chance", hitChance)
        console.log("max hit", maxHit);
        let rand = Math.random() * 100;
        console.log(rand);
        let hitValue = 0;
        if (hitChance > rand) {
            hitValue = Math.floor(maxHit * (rand / 100) + 1);
            console.log("hit", hitValue);
        }
        //let hitValue = Math.floor(Math.random() * (damageLevel + 1));
        return hitValue;
    }

    calcLevelCoeff(level) {
        return (0.0008 * Math.pow(level, 3)) + (4 * level) + 40;
    }

    onClick(hitValue) {
        // Get bonus gold for using mouseclick to encourage user interaction
        this.stats.addGold(hitValue);

        // Update stats
        this.stats.updateClickDamageStat(hitValue);

        // Update xp
        this.increaseXp(hitValue);

        // Display hit
        this.hitsplatText.text = hitValue;
        hitValue == 0
            ? (this.blueHitsplat.visible = true)
            : (this.redHitsplat.visible = true);
        this.hitsplatText.visible = true;

        // Hide hitsplat
        let _this = this;
        setTimeout(function() {
            _this.redHitsplat.visible = false;
            _this.blueHitsplat.visible = false;
            _this.hitsplatText.visible = false;
        }, 200);
    }

    onCompletion() {
        // Give extra gold if unit is killed
        this.stats.addGold(this.killGold);
        console.log(this.name + " killed, getting " + this.killGold + " extra gold");

        // Update quest and stats
        this.scene.enemyKilled(this.varName);
    }

    getDamageLevel() {
        if (Object.entries(this.equipment.obj.equipment.WEAPON).length) {
            switch (this.equipment.obj.equipment.WEAPON.skill) {
                case EQUIPMENT.WEAPON_TYPES.MAGIC:
                    return calcLevel(this.characterData.skills.magic);
                    break;
                case EQUIPMENT.WEAPON_TYPES.RANGED:
                    return calcLevel(this.characterData.skills.ranged);
                    break;
                case EQUIPMENT.WEAPON_TYPES.MELEE:
                    return calcLevel(this.characterData.skills.attack);
                    break;
                default:
                    console.log("Error, incorrect weapon type", this.equipment.obj.equipment.WEAPON);
                    break;
            }
        } else { // Unarmed
            return calcLevel(this.characterData.skills.attack);
        }
    }

    increaseXp(hitValue) {
        // Increase attack/ranged/magic XP
        const xpModifier = 1;
        let xpIncrease = xpModifier * hitValue;
        if (Object.entries(this.equipment.obj.equipment.WEAPON).length) {
            switch (this.equipment.obj.equipment.WEAPON.skill) {
                case EQUIPMENT.WEAPON_TYPES.MAGIC:
                    this.characterData.skills.magic += xpIncrease;
                    break;
                case EQUIPMENT.WEAPON_TYPES.RANGED:
                    this.characterData.skills.ranged += xpIncrease;
                    break;
                case EQUIPMENT.WEAPON_TYPES.MELEE:
                    this.characterData.skills.attack += xpIncrease;
                    break;
                default:
                    console.log("Error, incorrect weapon type", this.equipment.obj.equipment.WEAPON);
                    break;
            }
        } else { // Unarmed
            this.characterData.skills.attack += xpIncrease;
        }

        this.scene.dashboard.updateSkillsText();
    }
}
