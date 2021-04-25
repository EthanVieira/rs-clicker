import { Enemy } from "./enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Goblin extends Enemy {
    // Base stats
    attack = 1;
    strength = 1;
    defense = 1;
    magic = 1;
    ranged = 1;

    // Defenses
    stabDefense = -15;
    slashDefense = -15;
    crushDefense = -15;
    magicDefense = -15;
    rangedDefense = -15;

    // Text
    examineText = "An ugly green creature.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Goblin",
            varName: "goblin",
            images: [
                { name: "goblin", path: "src/assets/sprites/Goblin.png", scale: 0.4 },
            ],
            maxHealth: 5,
            killGold: 3,
            drops: [{ item: NormalBones, rate: 0.5 }],
            offsetY: 50,
        });
    }
}
