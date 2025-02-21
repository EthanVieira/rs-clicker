import Staff from "./staff.js";

export default class WaterStaff extends Staff {
    // Attack bonuses
    stabBonus = 0;
    slashBonus = -1;
    crushBonus = 7;
    magicBonus = 10;

    // defence bonuses
    stabdefenceBonus = 2;
    slashdefenceBonus = 3;
    crushdefenceBonus = 1;
    magicdefenceBonus = 10;

    // Other
    strengthBonus = 3;
    magicStrengthBonus = 0;

    // Text data
    name = "Staff of water";
    item = "Staff";
    type = "Water";
    examineText = "A Magical staff.";

    // Other
    cost = 1500;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
