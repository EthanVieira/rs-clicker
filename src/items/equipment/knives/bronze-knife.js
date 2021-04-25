import Knife from "../knife.js";

export default class BronzeKnife extends Knife {
    // Attack Bonuses
    rangedBonus = 4;

    // Strength Bonuses
    rangedStrengthBonus = 3;

    // Text data
    name = "Bronze Knife";
    item = "Knife";
    type = "Bronze";
    examineText = "A finely balanced throwing knife.";

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
