import Pickaxe from "./pickaxe.js";

export default class SteelPickaxe extends Pickaxe {
    // Attack bonuses
    stabBonus = 8;
    slashBonus = -2;
    crushBonus = 6;
    magicBonus = 0;
    rangedBonus = 0;

    // defence bonuses
    stabDefenceBonus = 0;
    slashDefenceBonus = 1;
    crushDefenceBonus = 0;
    magicDefenceBonus = 0;
    rangedDefenceBonus = 0;

    // Other bonuses
    strengthBonus = 9;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Steel Pickaxe";
    item = "Pickaxe";
    type = "Steel";
    examineText = "Used for mining.";

    // Other
    cost = 500;
    requiredLevels = {
        attack: 5,
        mining: 6,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
