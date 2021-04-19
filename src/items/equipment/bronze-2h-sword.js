import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class Bronze2hSword extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.SLASH;

    // Attack bonuses
    stabBonus = -4;
    slashBonus = 9;
    crushBonus = 8;
    magicBonus = -4;
    rangedBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 0;
    crushDefenseBonus = 0;
    magicDefenseBonus = 0;
    rangedDefenseBonus = -1;

    // Other bonuses
    strengthBonus = 10;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Bronze 2h Sword";
    item = "2hSword";
    type = "Bronze";
    examineText = "A two handed sword.";

    // Other
    cost = 80;
    requiredLevels = {
        attack: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
