import { Enemy } from "./enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Guard extends Enemy {
    // Base stats
    attack = 19;
    strength = 18;
    defence = 14;
    magic = 1;
    ranged = 1;

    // Attack bonuses
    attackBonus = 4;

    // Strength bonuses
    strengthBonus = 5;

    // defences
    stabDefence = 18;
    slashDefence = 25;
    crushDefence = 19;
    magicDefence = -4;
    rangedDefence = 20;

    // Text
    examineText = "He tries to keep order around here.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Guard",
            questName: "guard",
            images: [{ name: "guard", path: "assets/sprites/Guard.png", scale: 0.4 }],
            maxHealth: 22,
            killGold: 15,
            drops: [{ item: NormalBones, rate: 0.5 }],
        });
    }
}
