import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class BronzeDagger extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.STAB;

    // Bonuses
    stabBonus = 4;
    slashBonus = 2;
    crushBonus = -4;
    magicDefenseBonus = 1;
    strengthBonus = 3;

    // Text data
    name = "Bronze Dagger";
    item = "Dagger";
    type = "Bronze";
    examineText = "Short but pointy.";

    // Other
    cost = 10;
    requiredLevel = 1;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
