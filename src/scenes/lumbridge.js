import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { Cow } from "../targets/enemies/cow.js";
import { Goblin } from "../targets/enemies/goblin.js";

export class LumbridgeScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.ENEMY,
            key: CONSTANTS.SCENES.LUMBRIDGE,
            killQuest: 10,
            background: {
                name: "lumbridge",
                path: "src/assets/backgrounds/LumbridgeBackground.jpg"
            },
            minimap: {
                name: "lumbridge-map",
                path: "src/assets/maps/LumbridgeMap.png"
            },
            targets: [Cow, Goblin],
            audio: { bgm: "harmony" }
        });
    }
}
