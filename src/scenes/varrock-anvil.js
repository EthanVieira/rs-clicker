import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { Anvil } from "../targets/anvil.js";

export class VarrockAnvilScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.SMITHING,
            key: CONSTANTS.SCENES.VARROCK_ANVIL,
            background: {
                name: "varrock-anvil",
                path: "src/assets/backgrounds/VarrockAnvilBackground.png",
            },
            minimap: {
                name: "varrock-anvil-map",
                path: "src/assets/maps/VarrockAnvilMap.png",
            },
            targets: [Anvil],
            questAmounts: {
                bronzeDagger: [10, 100, 1000],
            },
            questPointAward: 2,

            audio: { bgm: "expanse" },
        });
    }
}
