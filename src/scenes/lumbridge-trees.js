import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { NormalTree } from "../targets/resources/normal-tree.js";

export class LumbridgeTreeScene extends LevelScene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.LUMBRIDGE_TREES,
            background: {
                name: "lumbridge",
                path: "src/assets/backgrounds/LumbridgeBackground.jpg",
            },
            minimap: {
                name: "lumbridge-map",
                path: "src/assets/maps/LumbridgeMap.png",
            },
            targets: [NormalTree],
            audio: { bgm: "harmony" },
        });
    }
}
