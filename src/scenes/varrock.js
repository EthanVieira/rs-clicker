import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import NormalBones from "../items/bones/normal-bones.js";

export class VarrockScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.ENEMY,
            key: CONSTANTS.SCENES.VARROCK,
            killQuest: 15,
            background: {
                name: "varrock",
                path: "src/assets/backgrounds/VarrockBackground.png"
            },
            minimap: {
                name: "varrock_map",
                path: "src/assets/maps/VarrockMap.png"
            },
            clickObjects: [
                {
                    name: "dark_wizard",
                    path: "src/assets/sprites/DarkWizard.png",
                    maxHealth: 12,
                    killGold: 10,
                    drops: [{item: NormalBones, rate: .5}]
                },
                {
                    name: "guard",
                    path: "src/assets/sprites/Guard.png",
                    maxHealth: 22,
                    killGold: 15,
                    drops: [{item: NormalBones, rate: .5}]
                }
            ],
            audio: { bgm: "expanse" }
        });
    }
}
