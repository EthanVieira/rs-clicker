import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { Man } from "../targets/resources/pickpocketing/man.js";

export class LumbridgeThievingScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.RESOURCE,
            resourceType: CONSTANTS.RESOURCES.PICKPOCKET,
            key: CONSTANTS.SCENES.LUMBRIDGE_THIEVING,
            background: {
                name: "lumbridge-thieving",
                path: "assets/backgrounds/LumbridgeThievingBackground.png",
            },
            minimap: {
                name: "lumbridge-thieving-map",
                path: "assets/maps/LumbridgeThievingMap.png",
            },
            targets: [Man],
            questAmounts: { man: [10, 100, 1000] },
            questPointAward: 1,
            audio: { bgm: "harmony" },
            shouldAutoclick: true,
        });
    }
}
