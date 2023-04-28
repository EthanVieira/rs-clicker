import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { SmallNetFishingSpot } from "../targets/resources/fishing-spots/small-net-fishing-spot.js";

export class DraynorFishingScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.RESOURCE,
            resourceType: CONSTANTS.RESOURCES.FISH,
            key: CONSTANTS.SCENES.DRAYNOR_FISHING,
            background: {
                name: "draynor-fishing",
                path: "src/assets/backgrounds/DraynorFishingBackground.png",
            },
            minimap: {
                name: "draynor-fishing-map",
                path: "src/assets/maps/DraynorFishingMap.png",
            },
            targets: [SmallNetFishingSpot],
            questAmounts: { smallNetFishingSpot: [10, 100, 1000] },
            questPointAward: 1,
            audio: { bgm: "unknown-land" },
        });
    }
}
