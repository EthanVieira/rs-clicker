import { HealthBar } from "../../ui/health-bar.js";
import { Target } from "../target.js";
import { ATTACK_TYPES, OBJECT_TYPES, EQUIPMENT } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";

export class Enemy extends Target {
    blueHitsplat;
    redHitsplat;
    hitsplatText;
    killGold;
    objectType = OBJECT_TYPES.ENEMY;

    // Target stats
    maxHealth = 0;
    attack = 1;
    strength = 1;
    defence = 1;
    magic = 1;
    ranged = 1;

    // Attack bonuses
    attackBonus = 0;
    strengthBonus = 0;
    magicBonus = 0;
    magicStrengthBonus = 0;
    rangedBonus = 0;
    rangedStrengthBonus = 0;

    // defences
    stabDefence = 0;
    slashDefence = 0;
    crushDefence = 0;
    magicDefence = 0;
    rangedDefence = 0;

    actions = [
        { text: "Attack", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

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
        this.maxHealth = data.maxHealth;

        // Enemy specific vars
        this.killGold = data.killGold;
    }

    isClickable() {
        return true;
    }

    // Get weapon animation, otherwise fists
    getAnimation() {
        const weapon = this.scene.dashboard.equipment.equipment.WEAPON;

        if (this.getSkill() == EQUIPMENT.WEAPON_TYPES.MAGIC) {
            return {
                imageName:
                    this.scene.dashboard.spellbook.getCurrentSelectedSpellName() +
                    "-effect",
                startX: 470,
                startY: 350,
                scale: 0.5,
                curve: 0.5,
                alpha: 0.5,
                flipx: false,
            };
        } else if (weapon) {
            return weapon.getAnimation();
        } else {
            return {
                imageName: "fist",
                startX: 450,
                startY: 400,
                scale: 1,
                curve: 0,
                alpha: 1,
                flipx: false,
            };
        }
    }

    getSkill() {
        const weapon = this.scene.dashboard.equipment.equipment.WEAPON;
        let skill = EQUIPMENT.WEAPON_TYPES.UNARMED;

        if (this.scene.dashboard.spellbook.getCurrentSelectedSpell()) {
            skill = EQUIPMENT.WEAPON_TYPES.MAGIC;
        } else if (weapon) {
            skill = weapon.skill;
        }

        return skill;
    }

    // Player: (attack/items/bonuses) and enemy:  (defence/bonuses) affects accuracy
    // Player: (strength/items/bonuses) affect max hit
    // Equal chance to deal (1 - max hit) damage if it hits
    getClickValue() {
        const weapon = this.scene.dashboard.equipment.equipment.WEAPON;
        let skill = this.getSkill();

        // Get damage based on level
        const damageLevel = this.getDamageLevel(skill);
        const accuracyLevel = this.getAccuracyLevel(skill);

        // Get weapon stats and enemy bonuses
        let equipmentStrength = 0;
        let equipmentAttack = 0;
        let enemyBonus = 0;
        switch (skill) {
            case EQUIPMENT.WEAPON_TYPES.MAGIC:
                if (weapon) {
                    equipmentAttack = weapon.magicBonus;
                    equipmentStrength = weapon.magicStrengthBonus;
                }

                enemyBonus = this.magicDefence;
                break;
            case EQUIPMENT.WEAPON_TYPES.RANGED:
                equipmentAttack = weapon.rangedBonus;
                equipmentStrength = weapon.rangedStrengthBonus;
                enemyBonus = this.rangedDefence;
                break;
            case EQUIPMENT.WEAPON_TYPES.MELEE: {
                equipmentStrength = weapon.strengthBonus;
                switch (characterData.getCombatStyle()["type"]) {
                    case ATTACK_TYPES.STAB:
                        equipmentAttack = weapon.stabBonus;
                        enemyBonus = this.stabDefence;
                        break;
                    case ATTACK_TYPES.SLASH:
                        equipmentAttack = weapon.slashBonus;
                        enemyBonus = this.slashDefence;
                        break;
                    case ATTACK_TYPES.CRUSH:
                        equipmentAttack = weapon.crushBonus;
                        enemyBonus = this.crushDefence;
                        break;
                }
                break;
            }
            // Unarmed uses crush type attack
            default:
                enemyBonus = this.crushDefence;
                break;
        }

        // Strength level bonuses
        let potBonus = 0;
        let styleBonus = 3; // Aggressive: 3, Controlled: 1, Accurate/Defensive: 0
        let prayerCoeff = 1; // Prayer gives multiplier (ex: 1.05)

        // Get damage level after bonuses
        let effectiveDamageLevel =
            Math.floor((damageLevel + potBonus) * prayerCoeff) + styleBonus;

        // Get max hit
        let maxHit = 0;
        if (skill == EQUIPMENT.WEAPON_TYPES.MAGIC) {
            const spell = this.scene.dashboard.spellbook.getCurrentSelectedSpell();
            if (spell) {
                maxHit = spell.baseMaxHit;
            }
        } else {
            maxHit = Math.floor(
                1.3 +
                    effectiveDamageLevel / 10 +
                    equipmentStrength / 80 +
                    (effectiveDamageLevel * equipmentStrength) / 640
            );
        }

        // Check accuracy
        let affinity = 55;
        let accuracy =
            this.calcLevelCoeff(accuracyLevel) +
            2.5 * this.calcLevelCoeff(equipmentAttack);
        let defence =
            this.calcLevelCoeff(this.defence) + 2.5 * this.calcLevelCoeff(enemyBonus);
        let hitChance = affinity * (accuracy / defence);

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
            console.log("item str", equipmentStrength);
            console.log("item attack", equipmentAttack);
            console.log("enemy defence", this.defence);
            console.log("enemy bonus", enemyBonus);
            console.log("accuracy", accuracy);
            console.log("defence", defence);
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
        // consume runes if using magic
        if (this.getSkill() == EQUIPMENT.WEAPON_TYPES.MAGIC) {
            const weapon = this.scene.dashboard.equipment.equipment.WEAPON;
            const staffType = weapon && weapon.item == "Staff" ? weapon.type : "None";
            const spell = this.scene.dashboard.spellbook.getCurrentSelectedSpell();

            Object.keys(spell.requiredRunes).forEach((rune) => {
                if (!rune.startsWith(staffType)) {
                    this.scene.dashboard.inventory.removeNFromInventoryByName(
                        rune,
                        spell.requiredRunes[rune]
                    );
                }
            });

            this.scene.dashboard.spellbook.refreshSpells();
        }

        // Get bonus gold for using mouseclick to encourage user interaction
        this.scene.dashboard.inventory.addGold(hitValue);

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
        this.scene.dashboard.inventory.addGold(this.killGold);
        console.log(this.name + " killed, getting " + this.killGold + " extra gold");

        // Update quest and stats
        this.scene.enemyKilled(this.questName);
    }

    getDamageLevel(skill) {
        let damageSkill = "";
        switch (skill) {
            case EQUIPMENT.WEAPON_TYPES.RANGED:
                damageSkill = "ranged";
                break;
            case EQUIPMENT.WEAPON_TYPES.MAGIC:
                damageSkill = "magic";
                break;
            default:
                damageSkill = "strength";
        }

        return characterData.getLevel(damageSkill);
    }

    getAccuracyLevel(skill) {
        let accuracySkill = "";
        switch (skill) {
            case EQUIPMENT.WEAPON_TYPES.RANGED:
                accuracySkill = "ranged";
                break;
            case EQUIPMENT.WEAPON_TYPES.MAGIC:
                accuracySkill = "magic";
                break;
            default:
                accuracySkill = "attack";
        }

        return characterData.getLevel(accuracySkill);
    }

    increaseXp(hitValue) {
        const skill = this.getSkill();
        const meleeRangedXpModifier = 4;
        const magicXpModifier = 2;
        const hitpointsXpModifier = 1.33;

        const skillXpMap = {};

        // magic has base xp gain even if hitting a 0
        if (skill == EQUIPMENT.WEAPON_TYPES.MAGIC) {
            const spell = this.scene.dashboard.spellbook.getCurrentSelectedSpell();

            let xpIncrease = magicXpModifier * hitValue;
            if (spell) {
                xpIncrease += spell.baseXp;
            }
            skillXpMap["magic"] = xpIncrease;
        } else {
            const skills = characterData.getCombatStyle()["xpGain"];

            skillXpMap["hitpoints"] = hitpointsXpModifier * hitValue;

            let xpIncrease = (meleeRangedXpModifier * hitValue) / skills.length;
            skills.forEach((skill) => {
                skillXpMap[skill] = xpIncrease;
            });
        }

        characterData.addSkillXp(skillXpMap);
    }
}
