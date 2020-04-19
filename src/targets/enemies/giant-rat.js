import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class GiantRat extends Enemy {
    // Stats
    attack = 2;
    strength = 3;
    defense = 2;
    magic = 1;
    ranged = 1;

    constructor(scene) {
        super({
            scene: scene,
            name: "Giant Rat",
            varName: "giantRat",
            images: [{name: "giant-rat", path: "src/assets/sprites/GiantRat.png"}],
            maxHealth: 5,
            killGold: 1,
            drops: [{item: NormalBones, rate: .5}]
        });
    }
}