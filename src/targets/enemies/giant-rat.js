import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class GiantRat extends Enemy {
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