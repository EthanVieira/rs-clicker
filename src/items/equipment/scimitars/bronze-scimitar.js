import Scimitar from "./scimitar.js";

export default class BronzeScimitar extends Scimitar {
    xp = 25.0;
    bars = [{ name: "BronzeBar", count: 2 }];
    smithingLevel = 5;
    questName = "bronzeScimitar";
    smithingErrorMessage = "You don't have enough bronze bars to make a bronze scimitar.";

    // Attack bonuses
    stabBonus = 1;
    slashBonus = 7;
    crushBonus = -2;
    rangedBonus = 0;
    magicBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 1;
    crushDefenseBonus = 0;
    magicDefenseBonus = 0;
    rangedDefenseBonus = 0;

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
