import Staff from "./staff.js";

export default class NormalStaff extends Staff {
    // Attack bonuses
    slashBonus = -1;
    crushBonus = 7;
    magicBonus = 4;

    // defence bonuses
    stabdefenceBonus = 2;
    slashdefenceBonus = 3;
    crushdefenceBonus = 1;
    magicdefenceBonus = 4;

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
