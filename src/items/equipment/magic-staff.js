import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class MagicStaff extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MAGIC;

    // Attack bonuses
    stabBonus = 2;
    slashBonus = -1;
    crushBonus = 10;
    magicBonus = 10;

    // Defense bonuses
    stabDefenseBonus = 2;
    slashDefenseBonus = 3;
    crushDefenseBonus = 1;
    magicDefenseBonus = 10;

    // Other
    strengthBonus = 7;

    // Text data
    name = "Magic Staff";
    item = "Staff";
    type = "Magic";
    examineText = "A Magical staff.";

    // Other
    cost = 200;
    requiredLevel = 1;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
