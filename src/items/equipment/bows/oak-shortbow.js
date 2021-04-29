import Bow from "./bow.js";

export default class OakShortbow extends Bow {
    // Attack Bonuses
    rangedBonus = 14;

    // Text data
    name = "Oak Shortbow";
    item = "Shortbow";
    type = "Oak";
    examineText = "An shortbow made out of oak, still effective.";

    // Other
    cost = 100;
    requiredLevels = {
        ranged: 5,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
