import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { Anvil } from "../targets/anvil.js";

export class VarrockAnvilScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.CRAFTING,
            key: CONSTANTS.SCENES.VARROCK_ANVIL,
            background: {
                name: "varrock-anvil",
                path: "src/assets/backgrounds/VarrockMineBackground.png",
            },
            minimap: {
                name: "varrock-anvil-map",
                path: "src/assets/maps/VarrockMineMap.png",
            },
            targets: [Anvil],
            questAmounts: {
                bronzeDagger: [10, 100, 1000],
            },
            audio: { bgm: "expanse" },
        });
    }
}
