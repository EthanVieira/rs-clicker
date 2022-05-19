import Axe from "./axe.js";

export default class BronzeAxe extends Axe {
    xp = 12.5;
    bars = [{ name: "BronzeBar", count: 1 }];
    smithingLevel = 1;
    questName = "bronzeAxe";
    smithingErrorMessage = "You don't have enough bronze bars to make a bronze axe.";
    smithingLevelErrorMessage = "You don't have a high enough smithing level to make a bronze axe.";

    // Attack bonuses
    stabBonus = -2;
    slashBonus = 4;
    crushBonus = 2;
    magicBonus = 0;
    rangedBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 1;
    crushDefenseBonus = 0;
    magicDefenseBonus = 0;
    rangedDefenseBonus = 0;

    // Other bonuses
    strengthBonus = 5;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Bronze Axe";
    item = "Axe";
    type = "Bronze";
    examineText = "A woodcutter's axe.";

    // Other
    cost = 16;
    requiredLevels = {
        attack: 1,
        woodcutting: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
