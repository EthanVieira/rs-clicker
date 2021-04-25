import Axe from "../axe.js";

export default class SteelAxe extends Axe {
    // Attack bonuses
    stabBonus = -2;
    slashBonus = 8;
    crushBonus = 6;
    magicBonus = 0;
    rangedBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 1;
    crushDefenseBonus = 0;
    magicDefenseBonus = 0;
    rangedDefenseBonus = 0;

    // Other bonuses
    strengthBonus = 9;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Steel Axe";
    item = "Axe";
    type = "Steel";
    examineText = "A woodcutter's axe.";

    // Other
    cost = 200;
    requiredLevels = {
        attack: 5,
        woodcutting: 6,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
