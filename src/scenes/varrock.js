import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
// import NormalBones from "../items/bones/normal-bones.js";
import { DarkWizard } from "../targets/enemies/dark-wizard.js";
import { Guard } from "../targets/enemies/guard.js";

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
            targets: [DarkWizard, Guard],
            audio: { bgm: "expanse" }
        });
    }
}
