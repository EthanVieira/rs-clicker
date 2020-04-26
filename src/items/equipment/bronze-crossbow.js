import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class BronzeCrossbow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack Bonuses
    rangedBonus = 18;

    // Text data
    name = "Bronze Crossbow";
    item = "Crossbow";
    type = "Bronze";
    examineText = "A bronze crossbow.";

    // Other
    cost = 73;
    requiredLevel = 1;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
