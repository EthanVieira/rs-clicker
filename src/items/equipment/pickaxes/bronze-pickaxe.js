import Pickaxe from "./pickaxe.js";

export default class BronzePickaxe extends Pickaxe {
    // Attack bonuses
    stabBonus = 4;
    slashBonus = -2;
    crushBonus = 2;
    magicBonus = 0;
    rangedBonus = 0;

    // Defence bonuses
    stabDefenceBonus = 0;
    slashDefenceBonus = 1;
    crushDefenceBonus = 0;
    magicDefenceBonus = 0;
    rangedDefenceBonus = 0;

    // Other bonuses
    strengthBonus = 5;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Bronze Pickaxe";
    item = "Pickaxe";
    type = "Bronze";
    examineText = "Used for mining.";

    // Other
    cost = 15;
    requiredLevels = {
        attack: 1,
        mining: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
