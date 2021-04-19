import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class NormalShortbow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack Bonuses
    rangedBonus = 8;

    // Text data
    name = "Shortbow";
    item = "Shortbow";
    type = "Normal";
    examineText = "Short but effective.";

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
