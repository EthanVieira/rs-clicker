import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class OakShortbow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack Bonuses
    rangedBonus = 14;

    // Text data
    name = "Oak Shortbow";
    item = "Shortbow";
    type = "Oak";
    examineText = "An shortbow made out of oak, still effective.";

    // Other
    cost = 100;
    requiredLevel = 5;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
