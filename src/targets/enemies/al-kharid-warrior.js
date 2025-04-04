import { Enemy } from "./enemy.js";
import NormalBones from "../../items/bones/normal-bones.js";
import BronzeDagger from "../../items/equipment/swords/daggers/bronze-dagger.js";

export class AlKharidWarrior extends Enemy {
    // Base stats
    attack = 7;
    strength = 5;
    defence = 4;
    magic = 1;
    ranged = 1;

    // Offensive bonuses
    attackBonus = 10;
    strengthBonus = 9;

    // defence
    stabDefence = 12;
    slashDefence = 15;
    crushDefence = 10;
    magicDefence = -1;
    rangedDefence = 12;

    // Text
    examineText = "Part of Al Kharid's elite fighting force.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Al Kharid Warrior",
            questName: "alKharidWarrior",
            images: [
                {
                    name: "al-kharid-warrior",
                    path: "assets/sprites/AlKharidWarrior.png",
                    scale: 0.3,
                },
            ],
            offsetY: 50,
            maxHealth: 19,
            killGold: 20,
            drops: [
                { item: NormalBones, rate: 0.5 },
                // { item: BronzeMedHelm, rate: 1 / 64 },
                { item: BronzeDagger, rate: 1 / 128 }, // TODO: Replace with IronDagger when it's implemented
            ],
        });
    }
}
