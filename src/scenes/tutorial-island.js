import { CONSTANTS } from "../constants/constants.js";
import { EnemyLevelScene } from "./enemy-level.js";
import NormalBones from "../items/bones/normal-bones.js";

export class TutorialIslandScene extends EnemyLevelScene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.TUTORIAL_ISLAND,
            killQuest: 10,
            background: {
                name: "tutorial-island",
                path: "src/assets/backgrounds/TutorialIslandBackground.png"
            },
            minimap: {
                name: "tutorial-island-map",
                path: "src/assets/maps/TutorialIslandMap.png"
            },
            clickObjects: [
                {
                    name: "rat",
                    path: "src/assets/sprites/GiantRat.png",
                    maxHealth: 5,
                    killGold: 1,
                    drops: [{item: NormalBones, rate: .5}]
                }
            ],
            audio: { bgm: "newbie-melody" }
        });
    }
}
