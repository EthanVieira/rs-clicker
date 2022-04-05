import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { TinRock } from "../targets/resources/rocks/tin-rock.js";
import { CopperRock } from "../targets/resources/rocks/copper-rock.js";

export class VarrockMineScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.RESOURCE,
            resourceType: CONSTANTS.RESOURCES.ORE,
            key: CONSTANTS.SCENES.VARROCK_MINE,
            background: {
                name: "varrock-mine",
                path: "src/assets/backgrounds/VarrockMineBackground.png",
            },
            minimap: {
                name: "varrock-mine-map",
                path: "src/assets/maps/VarrockMineMap.png",
            },
            targets: [TinRock, CopperRock],
            questAmounts: {
                tinRock: [15, 150, 1500],
                copperRock: [15, 150, 1500],
            },
            questPointAward: 2,

            audio: { bgm: "still-night" },
        });
    }
}
