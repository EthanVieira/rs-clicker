import Crossbow from "./crossbow.js";

export default class SteelCrossbow extends Crossbow {
    // Attack Bonuses
    rangedBonus = 54;

    // Text data
    name = "Steel Crossbow";
    item = "Crossbow";
    type = "Steel";
    examineText = "A steel crossbow.";

    // Other
    cost = 360;
    requiredLevels = {
        ranged: 31,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
