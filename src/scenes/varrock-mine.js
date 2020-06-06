import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { TinRock } from "../targets/resources/rocks/tin-rock.js";
import { CopperRock } from "../targets/resources/rocks/copper-rock.js";

export class VarrockMineScene extends LevelScene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.VARROCK_MINE,
            background: {
                name: "varrock",
                path: "src/assets/backgrounds/VarrockMineBackground.png",
            },
            minimap: {
                name: "varrock_map",
                path: "src/assets/maps/VarrockMap.png",
            },
            targets: [TinRock, CopperRock],
            audio: { bgm: "expanse" },
        });
    }
}
