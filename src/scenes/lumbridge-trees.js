import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import NormalLogs from "../items/logs/normal-logs.js";

export class LumbridgeTreeScene extends LevelScene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.LUMBRIDGE_TREES,
            background: {
                name: "lumbridge",
                path: "src/assets/backgrounds/LumbridgeBackground.jpg"
            },
            minimap: {
                name: "lumbridgeMap",
                path: "src/assets/maps/LumbridgeMap.png"
            },
            clickObjects: [
                {
                    skill: "woodcutting",
                    name: "tree1",
                    path: "src/assets/sprites/Tree1.webp",
                    neededClicks: 5,
                    drops: [{item: NormalLogs, rate: 1}]
                },
                {
                    skill: "woodcutting",
                    name: "tree2",
                    path: "src/assets/sprites/Tree2.webp",
                    neededClicks: 5,
                    drops: [{item: NormalLogs, rate: 1}]
                }
            ],
            audio: { bgm: "harmony" }
        });
    }
}
