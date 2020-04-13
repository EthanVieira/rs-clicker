import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Guard extends Enemy {
    constructor(scene) {
        super({
            scene: scene,
            name: "Guard",
            varName: "guard",
            images: [{name: "guard", path: "src/assets/sprites/Guard.png"}],
            maxHealth: 22,
            killGold: 15,
            drops: [{item: NormalBones, rate: .5}]
        });
    }
}