import { HealthBar } from "../ui/health-bar.js";
import { Target } from "./target.js";
import { CONSTANTS, EQUIPMENT } from "../constants/constants.js";
import { calcLevel } from "../utilities.js";

export class Enemy extends Target {
    blueHitsplat;
    redHitsplat;
    hitsplatText;
    killGold;
    objectType = "ENEMY";

    // Target stats
    attack = 1;
    strength = 1;
    defense = 1;
    magic = 1;
    ranged = 1;

    // Attack bonuses
    attackBonus = 0;
    strengthBonus = 0;
    magicBonus = 0;
    magicStrengthBonus = 0;
    rangedBonus = 0;
    rangedStrengthBonus = 0;

    // Defenses
    stabDefense = 0;
    slashDefense = 0;
    crushDefense = 0;
    magicDefense = 0;
    rangedDefense = 0;

    constructor(data) {
        super(data);

        // Setup coordinates
        let hitSplatX = this.x;
        let hitSplatY = this.y + 50;
        let hitTextX = this.x;
        let hitTextY = this.y + 100;
        let barX = this.x;
        let barY = this.y - 40;

        // Get offsets if they exist
        if (data.barOffsetX != undefined) {
            barX += data.barOffsetX;
        }
        if (data.barOffsetY != undefined) {
            barY += data.barOffsetY;
        }
        if (data.splatOffsetX != undefined) {
            hitSplatX += data.splatOffsetX;
            hitTextX += data.splatOffsetX;
        }
        if (data.splatOffsetY != undefined) {
            hitSplatY += data.splatOffsetY;
            hitTextY += data.splatOffsetY;
        }

        // Add hitsplats
        this.blueHitsplat = data.scene.add
            .image(hitSplatX, hitSplatY, "blue-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(4)
            .setScale(0.3);
        this.blueHitsplat.visible = false;

        this.redHitsplat = data.scene.add
            .image(hitSplatX, hitSplatY, "red-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(4)
            .setScale(0.3);
        this.redHitsplat.visible = false;

        // Add damage text
        this.hitsplatText = data.scene.add
            .text(hitTextX, hitTextY, "1", {
                fill: "white",
            })
            .setOrigin(0.5, 0)
            .setDepth(5);
        this.hitsplatText.visible = false;

        // Add health bar
        this.progressBar = new HealthBar(data.scene, barX, barY, data.maxHealth);

        // Enemy specific vars
        this.killGold = data.killGold;
    }

    isClickable() {
        return true;
    }

    // Player: (attack/items/bonuses) and enemy:  (defense/bonuses) affects accuracy
    // Player: (strength/items/bonuses) affect max hit
    // Equal chance to deal (1 - max hit) damage if it hits
    getClickValue() {
        // Get damage based on level
        // Normally for melee you would use strength for damage and attack for accuracy
        // But for now we'll use attack for both
        let damageLevel = this.getDamageLevel();

        // Get weapon stats and enemy bonuses
        let equipmenStrength = 0;
        let equipmentAttack = 0;
        let enemyBonus = 0;
        if (Object.entries(this.equipment.obj.equipment.WEAPON).length) {
            switch (this.equipment.obj.equipment.WEAPON.skill) {
                case EQUIPMENT.WEAPON_TYPES.MAGIC:
                    equipmentAttack = this.equipment.obj.equipment.WEAPON.magicBonus;
                    equipmenStrength = this.equipment.obj.equipment.WEAPON
                        .magicStrengthBonus;
                    enemyBonus = this.magicDefense;
                    break;
                case EQUIPMENT.WEAPON_TYPES.RANGED:
                    equipmentAttack = this.equipment.obj.equipment.WEAPON.rangedBonus;
                    equipmenStrength = this.equipment.obj.equipment.WEAPON
                        .rangedStrengthBonus;
                    enemyBonus = this.rangedDefense;
                    break;
                case EQUIPMENT.WEAPON_TYPES.MELEE: {
                    equipmenStrength = this.equipment.obj.equipment.WEAPON.strengthBonus;

                    switch (this.equipment.obj.equipment.WEAPON.style) {
                        case EQUIPMENT.ATTACK_STYLE.STAB:
                            equipmentAttack = this.equipment.obj.equipment.WEAPON
                                .stabBonus;
                            enemyBonus = this.stabDefense;
                            break;
                        case EQUIPMENT.ATTACK_STYLE.SLASH:
                            equipmentAttack = this.equipment.obj.equipment.WEAPON
                                .slashBonus;
                            enemyBonus = this.slashDefense;
                            break;
                        case EQUIPMENT.ATTACK_STYLE.CRUSH:
                            equipmentAttack = this.equipment.obj.equipment.WEAPON
                                .crushBonus;
                            enemyBonus = this.crushDefense;
                            break;
                    }
                    break;
                }
            }
        } else {
            // Unarmed uses crush type attack
            enemyBonus = this.crushDefense;
        }

        // Strength level bonuses
        let potBonus = 0;
        let styleBonus = 3; // Aggressive: 3, Controlled: 1, Accurate/Defensive: 0
        let prayerCoeff = 1; // Prayer gives multiplier (ex: 1.05)

        // Get damage level after bonuses
        let effectiveDamageLevel =
            Math.floor((damageLevel + potBonus) * prayerCoeff) + styleBonus;

        // Get max hit
        let maxHit = Math.floor(
            1.3 +
                effectiveDamageLevel / 10 +
                equipmenStrength / 80 +
                (effectiveDamageLevel * equipmenStrength) / 640
        );

        // Check accuracy
        let affinity = 55;
        let accuracy =
            this.calcLevelCoeff(damageLevel) + 2.5 * this.calcLevelCoeff(equipmentAttack);
        let defense =
            this.calcLevelCoeff(this.defense) + 2.5 * this.calcLevelCoeff(enemyBonus);
        let hitChance = affinity * (accuracy / defense);

        let rand = Math.random() * 100;
        let hitValue = 0;
        if (hitChance > rand || hitChance < 0) {
            // Handle case for negative armor
            hitValue = Math.floor(maxHit * (rand / 100) + 1);
        }

        const logHit = false;
        if (logHit) {
            console.log("----------------hit info-------------");
            console.log("player level", damageLevel);
            console.log("item str", equipmenStrength);
            console.log("item attack", equipmentAttack);
            console.log("enemy defense", this.defense);
            console.log("enemy bonus", enemyBonus);
            console.log("accuracy", accuracy);
            console.log("defense", defense);
            console.log("effective damage level", effectiveDamageLevel);
            console.log("hit chance", hitChance);
            console.log("max hit", maxHit);
            console.log("rolled", rand);
            console.log("Damage", hitValue);
        }

        return hitValue;
    }

    // .0008a^3 + 4a + 40
    calcLevelCoeff(level) {
        return 0.0008 * Math.pow(level, 3) + 4 * level + 40;
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
        setTimeout(function () {
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
                    console.log(
                        "Error, incorrect weapon type",
                        this.equipment.obj.equipment.WEAPON
                    );
                    break;
            }
        } else {
            // Unarmed
            return calcLevel(this.characterData.skills.attack);
        }
    }

    increaseXp(hitValue) {
        // Increase attack/ranged/magic XP
        const xpModifier = 1; // OSRS has an xp mod of 4 but that's assuming your attack speed is much lower
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
                    console.log(
                        "Error, incorrect weapon type",
                        this.equipment.obj.equipment.WEAPON
                    );
                    break;
            }
        } else {
            // Unarmed
            this.characterData.skills.attack += xpIncrease;
        }

        this.scene.dashboard.updateSkillsText();
    }
}
