import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { DarkWizard } from "../targets/enemies/dark-wizard.js";
import { Guard } from "../targets/enemies/guard.js";

export class VarrockScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.ENEMY,
            key: CONSTANTS.SCENES.VARROCK,
            background: {
                name: "varrock",
                path: "src/assets/backgrounds/VarrockBackground.png",
            },
            minimap: {
                name: "varrock-map",
                path: "src/assets/maps/VarrockMap.png",
            },
            targets: [DarkWizard, Guard],
            questAmounts: {
                darkWizard: [15, 150, 1500],
                guard: [15, 150, 1500],
            },
            audio: { bgm: "expanse" },
        });
    }
}
