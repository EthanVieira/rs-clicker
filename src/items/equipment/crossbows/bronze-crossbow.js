import Crossbow from "./crossbow.js";

export default class BronzeCrossbow extends Crossbow {
    // Attack Bonuses
    rangedBonus = 18;

    // Text data
    name = "Bronze Crossbow";
    item = "Crossbow";
    type = "Bronze";
    examineText = "A bronze crossbow.";

    // Other
    cost = 73;
    requiredLevels = {
        ranged: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
