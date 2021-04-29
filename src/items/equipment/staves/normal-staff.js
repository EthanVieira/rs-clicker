import Staff from "./staff.js";

export default class NormalStaff extends Staff {
    // Attack bonuses
    slashBonus = -1;
    crushBonus = 7;
    magicBonus = 4;

    // Defense bonuses
    stabDefenseBonus = 2;
    slashDefenseBonus = 3;
    crushDefenseBonus = 1;
    magicDefenseBonus = 4;

    // Other
    strengthBonus = 3;

    // Text data
    name = "Staff";
    item = "Staff";
    type = "Normal";
    examineText = "It's a slightly magical stick.";

    // Other
    cost = 15;
    requiredLevels = {
        magic: 1,
    };

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
