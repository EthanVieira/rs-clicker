import Sword from "./sword.js";

export default class Steel2hSword extends Sword {
    // Attack bonuses
    stabBonus = -4;
    slashBonus = 21;
    crushBonus = 16;
    magicBonus = -4;
    rangedBonus = 0;

    // defence bonuses
    stabdefenceBonus = 0;
    slashdefenceBonus = 0;
    crushdefenceBonus = 0;
    magicdefenceBonus = 0;
    rangeddefenceBonus = -1;

    // Other bonuses
    strengthBonus = 22;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Steel 2h Sword";
    item = "2hSword";
    type = "Steel";
    examineText = "A two handed sword.";

    // Other
    cost = 1000;
    requiredLevels = {
        attack: 5,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
