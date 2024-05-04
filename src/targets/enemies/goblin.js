import { Enemy } from "./enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";
import AirTalisman from "../../items/tools/talismans/air-talisman.js";

export class Goblin extends Enemy {
    // Base stats
    attack = 1;
    strength = 1;
    defence = 1;
    magic = 1;
    ranged = 1;

    // defences
    stabdefence = -15;
    slashdefence = -15;
    crushdefence = -15;
    magicdefence = -15;
    rangeddefence = -15;

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
            drops: [
                { item: NormalBones, rate: 0.5 },
                { item: AirTalisman, rate: 1 / 128 },
            ],
            offsetY: 50,
        });
    }
}
