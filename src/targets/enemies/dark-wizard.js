import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class DarkWizard extends Enemy {
    // Base stats
    attack = 5;
    strength = 2;
    defense = 5;
    magic = 6;
    ranged = 1;

    // Defense
    magicDefense = 3;

    // Text
    examineText = "He works evil magic.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Dark Wizard",
            varName: "darkWizard",
            images: [
                {
                    name: "dark-wizard",
                    path: "src/assets/sprites/DarkWizard.png",
                    scale: 0.4
                }
            ],
            maxHealth: 12,
            killGold: 10,
            drops: [{ item: NormalBones, rate: 0.5 }]
        });
    }
}
