import Knife from "../knife.js";

export default class SteelKnife extends Knife {
    // Attack Bonuses
    rangedBonus = 8;

    // Strength Bonuses
    rangedStrengthBonus = 7;

    // Text data
    name = "Steel Knife";
    item = "Knife";
    type = "Steel";
    examineText = "A finely balanced throwing knife.";

    // Other
    cost = 110;
    requiredLevels = {
        ranged: 5,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
