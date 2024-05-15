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
    stabdefence = -21;
    slashdefence = -21;
    crushdefence = -21;
    magicdefence = -21;
    rangeddefence = -21;

    // Text
    examineText = "Converts grass to beef.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Cow",
            questName: "cow",
            images: [{ name: "cow", path: "src/assets/sprites/Cow.png", scale: 0.4 }],
            maxHealth: 8,
            killGold: 5,
            drops: [{ item: NormalBones, rate: 0.5 }],
            offsetY: 100,
        });
    }
}
