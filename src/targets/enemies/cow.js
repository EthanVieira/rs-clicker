import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Cow extends Enemy {
    // Base stats
    attack = 1;
    strength = 1;
    defense = 1;
    magic = 1;
    ranged = 1;

    // Attack bonuses
    attackBonus = -15;

    // Strength bonuses
    strengthBonus = -15;

    // Defense
    stabDefense = -21;
    slashDefense = -21;
    crushDefense = -21;
    magicDefense = -21;
    rangedDefense = -21;

    constructor(scene) {
        super({
            scene: scene,
            name: "Cow",
            varName: "cow",
            images: [{ name: "cow", path: "src/assets/sprites/Cow.png", scale: 0.4 }],
            maxHealth: 8,
            killGold: 5,
            drops: [{ item: NormalBones, rate: 0.5 }]
        });
    }
}
