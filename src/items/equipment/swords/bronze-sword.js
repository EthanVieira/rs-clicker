import Sword from "./sword.js";

export default class BronzeSword extends Sword {
    xp = 12.5;
    bars = [{ name: "BronzeBar", count: 1 }];
    smithingLevel = 4;
    questName = "bronzeSword";
    smithingErrorMessage = "You don't have enough bronze bars to make a bronze sword.";

    // Attack bonuses
    stabBonus = 4;
    slashBonus = 3;
    crushBonus = -2;
    rangedBonus = 0;
    magicBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 2;
    crushDefenseBonus = 1;
    magicDefenseBonus = 0;
    rangedDefenseBonus = 0;

    // Other bonuses
    strengthBonus = 5;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Bronze Sword";
    item = "Sword";
    type = "Bronze";
    examineText = "A razor sharp sword.";

    // Other
    cost = 26;
    requiredLevels = {
        attack: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
