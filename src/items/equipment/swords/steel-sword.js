import Sword from "./sword.js";

export default class SteelSword extends Sword {
    // Attack bonuses
    stabBonus = 11;
    slashBonus = 8;
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
    strengthBonus = 12;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Steel Sword";
    item = "Sword";
    type = "Steel";
    examineText = "A razor sharp sword.";

    // Other
    cost = 325;
    requiredLevels = {
        attack: 5,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
