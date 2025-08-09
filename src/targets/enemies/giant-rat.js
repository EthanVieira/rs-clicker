import { Enemy } from "./enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class GiantRat extends Enemy {
    // Base stats
    attack = 2;
    strength = 3;
    defence = 2;
    magic = 1;
    ranged = 1;

    // Text
    examineText = "Overgrown vermin.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Giant Rat",
            questName: "giantRat",
            images: [
                {
                    name: "giant-rat",
                    path: "assets/sprites/GiantRat.png",
                    scale: 0.4,
                },
            ],
            maxHealth: 5,
            killGold: 1,
            drops: [{ item: NormalBones, rate: 0.5, amount: 1 }],
            barOffsetY: 110,
            splatOffsetY: 50,
        });
    }
}
