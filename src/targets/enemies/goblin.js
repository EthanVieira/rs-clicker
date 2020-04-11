import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class Goblin extends Enemy {
    constructor(scene) {
        super({
            scene: scene,
            name: "Goblin",
            varName: "goblin",
            images: [{name: "goblin", path: "src/assets/sprites/Goblin.png"}],
            maxHealth: 5,
            killGold: 3,
            drops: [{item: NormalBones, rate: .5}]
        });
    }
}