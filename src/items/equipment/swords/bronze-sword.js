import StabSword from "./stab-sword.js";

export default class BronzeSword extends StabSword {
    xp = 12.5;
    bars = [{ name: "BronzeBar", count: 1 }];
    smithingLevel = 4;
    questName = "bronzeSword";
    smithingErrorMessage = "You don't have enough bronze bars to make a bronze sword.";
    smithingLevelErrorMessage =
        "You don't have a high enough smithing level to make a bronze sword.";

    // Attack bonuses
    stabBonus = 4;
    slashBonus = 3;
    crushBonus = -2;
    rangedBonus = 0;
    magicBonus = 0;

    // defence bonuses
    stabDefenceBonus = 0;
    slashDefenceBonus = 2;
    crushDefenceBonus = 1;
    magicDefenceBonus = 0;
    rangedDefenceBonus = 0;

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
