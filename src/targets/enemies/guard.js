import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Guard extends Enemy {
    // Base stats
    attack = 19;
    strength = 18;
    defense = 14;
    magic = 1;
    ranged = 1;

    // Attack bonuses
    attackBonus = 4;

    // Strength bonuses
    strengthBonus = 5;

    // Defenses
    stabDefense = 18;
    slashDefense = 25;
    crushDefense = 19;
    magicDefense = -4;
    rangedDefense = 20;

    constructor(scene) {
        super({
            scene: scene,
            name: "Guard",
            varName: "guard",
            images: [{name: "guard", path: "src/assets/sprites/Guard.png", scale: 0.4}],
            maxHealth: 22,
            killGold: 15,
            drops: [{item: NormalBones, rate: .5}]
        });
    }
}