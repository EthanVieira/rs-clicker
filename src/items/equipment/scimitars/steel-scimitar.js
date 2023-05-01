import Scimitar from "./scimitar.js";

export default class SteelScimitar extends Scimitar {
    // Attack bonuses
    stabBonus = 3;
    slashBonus = 15;
    crushBonus = -2;
    rangedBonus = 0;
    magicBonus = 0;

    // defence bonuses
    stabdefenceBonus = 0;
    slashdefenceBonus = 1;
    crushdefenceBonus = 0;
    magicdefenceBonus = 0;
    rangeddefenceBonus = 0;

    // Other bonuses
    strengthBonus = 14;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Steel Scimitar";
    item = "Scimitar";
    type = "Steel";
    examineText = "A vicious, curved sword.";

    // Other
    cost = 400;
    requiredLevels = {
        attack: 5,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
