import Staff from "./staff.js";

export default class EarthStaff extends Staff {
    // Attack bonuses
    stabBonus = 1;
    slashBonus = -1;
    crushBonus = 9;
    magicBonus = 10;

    // defence bonuses
    stabdefenceBonus = 2;
    slashdefenceBonus = 3;
    crushdefenceBonus = 1;
    magicdefenceBonus = 10;

    // Other
    strengthBonus = 5;
    magicStrengthBonus = 0;

    // Text data
    name = "Staff of earth";
    item = "Staff";
    type = "Earth";
    examineText = "A Magical staff.";

    // Other
    cost = 1500;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
