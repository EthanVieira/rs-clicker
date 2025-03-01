import Staff from "./staff.js";

export default class MagicStaff extends Staff {
    // Attack bonuses
    stabBonus = 2;
    slashBonus = -1;
    crushBonus = 10;
    magicBonus = 10;

    // defence bonuses
    stabDefenceBonus = 2;
    slashDefenceBonus = 3;
    crushDefenceBonus = 1;
    magicDefenceBonus = 10;

    // Other
    strengthBonus = 7;

    // Text data
    name = "Magic Staff";
    item = "Staff";
    type = "Magic";
    examineText = "A Magical staff.";

    // Other
    cost = 200;
    constructor(scene) {
        super();

        this.scene = scene;
    }
}
