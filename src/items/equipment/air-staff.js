import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class AirStaff extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MAGIC;

    // Attack bonuses
    stabBonus = 0;
    slashBonus = -1;
    crushBonus = 7;
    magicBonus = 20; // Buffed from 10

    // Defense bonuses
    stabDefenseBonus = 2;
    slashDefenseBonus = 3;
    crushDefenseBonus = 1;
    magicDefenseBonus = 10;

    // Other
    strengthBonus = 3;
    magicStrengthBonus = 10; // Buffed from 0

    // Text data
    name = "Staff of air";
    item = "Staff";
    type = "Air";
    examineText = "A Magical staff.";

    // Other
    cost = 1500;
    requiredLevel = 1;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
