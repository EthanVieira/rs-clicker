import Scimitar from "./scimitar.js";

export default class BronzeScimitar extends Scimitar {
    xp = 25.0;
    bars = [{ name: "BronzeBar", count: 2 }];
    smithingLevel = 5;
    questName = "bronzeScimitar";
    smithingErrorMessage = "You don't have enough bronze bars to make a bronze scimitar.";
    smithingLevelErrorMessage =
        "You don't have a high enough smithing level to make a bronze scimitar.";

    // Attack bonuses
    stabBonus = 1;
    slashBonus = 7;
    crushBonus = -2;
    rangedBonus = 0;
    magicBonus = 0;

    // defence bonuses
    stabDefenceBonus = 0;
    slashDefenceBonus = 1;
    crushDefenceBonus = 0;
    magicDefenceBonus = 0;
    rangedDefenceBonus = 0;

    // Other bonuses
    strengthBonus = 6;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Bronze Scimitar";
    item = "Scimitar";
    type = "Bronze";
    examineText = "A vicious, curved sword.";

    // Other
    cost = 32;
    requiredLevels = {
        attack: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
