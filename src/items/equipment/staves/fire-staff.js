import Staff from "./staff.js";

export default class FireStaff extends Staff {
    // Attack bonuses
    stabBonus = 3;
    slashBonus = -1;
    crushBonus = 9;
    magicBonus = 10;

    // defence bonuses
    stabDefenceBonus = 2;
    slashDefenceBonus = 3;
    crushDefenceBonus = 1;
    magicDefenceBonus = 10;

    // Other
    strengthBonus = 6;
    magicStrengthBonus = 0;

    // Text data
    name = "Staff of fire";
    item = "Staff";
    type = "Fire";
    examineText = "A Magical staff.";

    // Other
    cost = 1500;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
