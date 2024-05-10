import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { SawmillOperator } from "../targets/sawmill-operator.js";

export class SawmillScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.RESOURCE,
            key: CONSTANTS.SCENES.SAWMILL,
            background: {
                name: "sawmill",
                path: "src/assets/backgrounds/SawmillBackground.png",
            },
            minimap: {
                name: "sawmill-map",
                path: "src/assets/maps/SawmillMap.png",
            },
            targets: [SawmillOperator],
            questAmounts: {
                normalPlank: [10, 100, 1000],
            },
            questPointAward: 1,
            audio: { bgm: "parade" },
            shouldAutoclick: false,
        });
    }
}
