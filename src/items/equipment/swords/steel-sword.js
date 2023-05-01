import Sword from "./sword.js";

export default class SteelSword extends Sword {
    // Attack bonuses
    stabBonus = 11;
    slashBonus = 8;
    crushBonus = -2;
    rangedBonus = 0;
    magicBonus = 0;

    // defence bonuses
    stabdefenceBonus = 0;
    slashdefenceBonus = 2;
    crushdefenceBonus = 1;
    magicdefenceBonus = 0;
    rangeddefenceBonus = 0;

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
