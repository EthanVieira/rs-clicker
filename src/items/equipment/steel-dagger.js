import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class SteelDagger extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.STAB;

    // Bonuses
    stabBonus = 8;
    slashBonus = 4;
    crushBonus = -4;
    magicBonus = 1;
    magicDefenseBonus = 1;
    strengthBonus = 7;

    // Text data
    name = "Steel Dagger";
    item = "Dagger";
    type = "Steel";
    examineText = "Short but pointy.";

    // Other
    cost = 125;
    requiredLevel = 5;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
