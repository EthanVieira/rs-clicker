import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { NormalTree } from "../targets/resources/trees/normal-tree.js";

export class LumbridgeTreeScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.RESOURCE,
            resourceType: CONSTANTS.RESOURCES.WOOD,
            key: CONSTANTS.SCENES.LUMBRIDGE_TREES,
            background: {
                name: "lumbridge",
                path: "src/assets/backgrounds/LumbridgeBackground.png",
            },
            minimap: {
                name: "lumbridge-map",
                path: "src/assets/maps/LumbridgeMap.png",
            },
            targets: [NormalTree],
            questAmounts: { tree: [10, 100, 1000] },
            questPointAward: 1,
            audio: { bgm: "harmony" },
        });
    }
}
