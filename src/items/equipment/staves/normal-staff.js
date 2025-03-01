import Staff from "./staff.js";

export default class NormalStaff extends Staff {
    // Attack bonuses
    slashBonus = -1;
    crushBonus = 7;
    magicBonus = 4;

    // defence bonuses
    stabDefenceBonus = 2;
    slashDefenceBonus = 3;
    crushDefenceBonus = 1;
    magicDefenceBonus = 4;

    // Other
    strengthBonus = 3;

    // Text data
    name = "Staff";
    item = "Staff";
    type = "Normal";
    examineText = "It's a slightly magical stick.";

    // Other
    cost = 15;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
