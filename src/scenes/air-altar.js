import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { AirAltar } from "../targets/runecrafting-altars/air-altar.js";

export class AirAltarScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.RUNECRAFTING,
            key: CONSTANTS.SCENES.AIR_ALTAR,
            background: {
                name: "air-altar",
                path: "src/assets/backgrounds/AirAltarBackground.png",
            },
            minimap: {
                name: "air-altar-map",
                path: "src/assets/maps/AirAltarMap.png",
            },
            targets: [AirAltar],
            questAmounts: {
                airRune: [10, 100, 1000],
            },
            questPointAward: 1,
            audio: { bgm: "serene" },
        });
    }
}
