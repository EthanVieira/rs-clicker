import Dagger from "./dagger.js";

export default class BronzeDagger extends Dagger {
    xp = 12.5;
    bars = ["BronzeBar"];
    smithingErrorMessage = "You don't have enough bronze bars to make a bronze dagger.";

    // Bonuses
    stabBonus = 4;
    slashBonus = 2;
    crushBonus = -4;
    magicDefenseBonus = 1;
    strengthBonus = 3;

    // Text data
    name = "Bronze Dagger";
    item = "Dagger";
    type = "Bronze";
    examineText = "Short but pointy.";

    // Other
    cost = 10;
    requiredLevels = {
        attack: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
