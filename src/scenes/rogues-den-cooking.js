import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { CookingFire } from "../targets/cooking-fire.js";

export class RoguesDenCookingScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.COOKING,
            key: CONSTANTS.SCENES.ROGUES_DEN_COOKING,
            background: {
                name: "rogues-den-cooking",
                path: "src/assets/backgrounds/RoguesDenCookingBackground.png",
            },
            minimap: {
                name: "rogues-den-cooking-map",
                path: "src/assets/maps/RoguesDenCookingMap.png",
            },
            targets: [CookingFire],
            questAmounts: {
                shrimps: [10, 100, 1000],
                anchovies: [10, 100, 1000],
            },
            questPointAward: 1,
            audio: { bgm: "the-rogues-den" },
            shouldAutoclick: false,
        });
    }
}
