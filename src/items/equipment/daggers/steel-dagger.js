import Dagger from "./dagger.js";

export default class SteelDagger extends Dagger {
    // Bonuses
    stabBonus = 8;
    slashBonus = 4;
    crushBonus = -4;
    magicBonus = 1;
    magicDefenseBonus = 1;
    strengthBonus = 7;

    // Text data
    name = "Steel Dagger";
    item = "Dagger";
    type = "Steel";
    examineText = "Short but pointy.";

    // Other
    cost = 125;
    requiredLevels = {
        attack: 5,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
