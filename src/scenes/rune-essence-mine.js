import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { EssenceMine } from "../targets/resources/essence-mine.js";

export class RuneEssenceMineScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.RESOURCE,
            resourceType: CONSTANTS.RESOURCES.ESSENCE,
            key: CONSTANTS.SCENES.RUNE_ESSENCE_MINE,
            background: {
                name: "rune-essence-mine",
                path: "src/assets/backgrounds/RuneEssenceMineBackground.png",
            },
            minimap: {
                name: "rune-essence-mine-map",
                path: "src/assets/maps/RuneEssenceMineMap.png",
            },
            targets: [EssenceMine],
            questAmounts: {
                // No normal Rune Essence quest because you can no longer mine that at 30 mining
                pureEssence: [50, 500, 5000],
            },
            questPointAward: 2,
            audio: { bgm: "rune-essence" },
            shouldAutoclick: true,
        });
    }
}
