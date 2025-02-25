import { Enemy } from "./enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Cow extends Enemy {
    // Base stats
    attack = 1;
    strength = 1;
    defence = 1;
    magic = 1;
    ranged = 1;

    // Attack bonuses
    attackBonus = -15;

    // Strength bonuses
    strengthBonus = -15;

    // defence
    stabDefence = -21;
    slashDefence = -21;
    crushDefence = -21;
    magicDefence = -21;
    rangedDefence = -21;

    // Text
    examineText = "Converts grass to beef.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Cow",
            questName: "cow",
            images: [{ name: "cow", path: "assets/sprites/Cow.png", scale: 0.4 }],
            maxHealth: 8,
            killGold: 5,
            drops: [{ item: NormalBones, rate: 0.5 }],
            offsetY: 100,
        });
    }
}
