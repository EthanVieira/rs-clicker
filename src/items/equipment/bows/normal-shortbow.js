import Bow from "../bow.js";

export default class NormalShortbow extends Bow {
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
