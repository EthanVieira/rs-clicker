import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { PrayerAltar } from "../targets/prayer-altar.js";

export class LumbridgeAltarScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.PRAYER,
            key: CONSTANTS.SCENES.LUMBRIDGE_ALTAR,
            background: {
                name: "lumbridge-altar",
                path: "assets/backgrounds/LumbridgeAltarBackground.png",
            },
            minimap: {
                name: "lumbridge-altar-map",
                path: "assets/maps/LumbridgeAltarMap.png",
            },
            targets: [PrayerAltar],
            audio: { bgm: "harmony" },
            shouldAutoclick: false,
        });
    }
}
