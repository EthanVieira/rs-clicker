import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class BronzeKnife extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack Bonuses
    rangedBonus = 4;

    // Strength Bonuses
    rangedStrengthBonus = 3;

    // Text data
    name = "Bronze Knife";
    item = "Knife";
    type = "Bronze";
    examineText = "A finely balanced throwing knife.";

    // Other
    cost = 50;
    requiredLevels = {
        ranged: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
