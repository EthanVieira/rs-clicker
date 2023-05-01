import { Enemy } from "./enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Barbarian extends Enemy {
    // Base stats
    attack = 6;
    strength = 5;
    defence = 5;
    magic = 1;
    ranged = 1;

    // Attack bonuses
    attackBonus = 8;

    // Strength bonuses
    strengthBonus = 10;

    // defence
    stabdefence = 1;
    slashdefence = 1;

    // Text
    examineText = "Wotan, a sturdy barbarian warrior.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Barbarian",
            varName: "barbarian",
            images: [
                {
                    name: "male-barbarian",
                    path: "src/assets/sprites/MaleBarbarian.png",
                    scale: 0.4,
                },
                {
                    name: "female-barbarian",
                    path: "src/assets/sprites/FemaleBarbarian.png",
                    scale: 0.4,
                },
            ],
            maxHealth: 20,
            killGold: 20,
            drops: [{ item: NormalBones, rate: 0.5 }],
        });
    }
}
