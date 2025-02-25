import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { Cow } from "../targets/enemies/cow.js";
import { Goblin } from "../targets/enemies/goblin.js";

export class LumbridgeScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.ENEMY,
            key: CONSTANTS.SCENES.LUMBRIDGE,
            background: {
                name: "lumbridge",
                path: "assets/backgrounds/LumbridgeBackground.png",
            },
            minimap: {
                name: "lumbridge-map",
                path: "assets/maps/LumbridgeMap.png",
            },
            targets: [Cow, Goblin],
            questAmounts: {
                cow: [10, 100, 1000],
                goblin: [10, 100, 1000],
            },
            questPointAward: 1,
            audio: { bgm: "harmony" },
            shouldAutoclick: true,
        });
    }
}
