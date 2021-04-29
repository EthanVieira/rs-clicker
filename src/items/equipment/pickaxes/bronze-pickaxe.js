import Pickaxe from "./pickaxe.js";

export default class BronzePickaxe extends Pickaxe {
    // Attack bonuses
    stabBonus = 4;
    slashBonus = -2;
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
