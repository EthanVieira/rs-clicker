import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Cow extends Enemy {
    constructor(scene) {
        super({
            scene: scene,
            name: "Cow",
            varName: "cow",
            images: [{name: "cow", path: "src/assets/sprites/Cow.png"}],
            maxHealth: 8,
            killGold: 5,
            drops: [{item: NormalBones, rate: .5}]
        });
    }
}