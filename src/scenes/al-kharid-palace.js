import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { AlKharidWarrior } from "../targets/enemies/al-kharid-warrior.js";

export class AlKharidPalaceScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.ENEMY,
            key: CONSTANTS.SCENES.AL_KHARID_PALACE,
            background: {
                name: "al-kharid-palace",
                path: "src/assets/backgrounds/AlKharidPalaceBackground.png",
            },
            minimap: {
                name: "al-kharid-palace-map",
                path: "src/assets/maps/AlKharidPalaceMap.png",
            },
            targets: [AlKharidWarrior],
            questAmounts: {
                alKharidWarrior: [20, 200, 2000],
            },
            questPointAward: 2,
            audio: { bgm: "al-kharid" },
            shouldAutoclick: true,
        });
    }
}
