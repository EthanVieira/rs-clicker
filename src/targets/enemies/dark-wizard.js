import { Enemy } from "../enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";

export class DarkWizard extends Enemy {
    constructor(scene) {
        super({
            scene: scene,
            name: "Dark Wizard",
            varName: "darkWizard",
            images: [{name: "darkWizard", path: "src/assets/sprites/DarkWizard.png"}],
            maxHealth: 12,
            killGold: 10,
            drops: [{item: NormalBones, rate: .5}]
        });
    }
}