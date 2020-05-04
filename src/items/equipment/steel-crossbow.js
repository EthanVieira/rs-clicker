import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class SteelCrossbow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack Bonuses
    rangedBonus = 54;

    // Text data
    name = "Steel Crossbow";
    item = "Crossbow";
    type = "Steel";
    examineText = "A steel crossbow.";

    // Other
    cost = 360;
    requiredLevel = 31;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
