import Sword from "./sword.js";

export default class Bronze2hSword extends Sword {
    xp = 37.5;
    bars = [{ name: "BronzeBar", count: 3 }];
    smithingLevel = 14;
    questName = "bronzeSword";
    smithingErrorMessage = "You don't have enough bronze bars to make a bronze 2h sword.";

    // Attack bonuses
    stabBonus = -4;
    slashBonus = 9;
    crushBonus = 8;
    magicBonus = -4;
    rangedBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 0;
    crushDefenseBonus = 0;
    magicDefenseBonus = 0;
    rangedDefenseBonus = -1;

    // Other bonuses
    strengthBonus = 10;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Bronze 2h Sword";
    item = "2hSword";
    type = "Bronze";
    examineText = "A two handed sword.";

    // Other
    cost = 80;
    requiredLevels = {
        attack: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
