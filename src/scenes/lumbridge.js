import { CONSTANTS } from "../constants/constants.js";
import { EnemyLevelScene } from "./enemy-level.js";

export class LumbridgeScene extends EnemyLevelScene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.LUMBRIDGE,
            killQuest: 10,
            background: {
                name: "lumbridge",
                path: "src/assets/backgrounds/LumbridgeBackground.jpg"
            },
            minimap: {
                name: "lumbridge-map",
                path: "src/assets/maps/LumbridgeMap.png"
            },
            clickObjects: [
                {
                    name: "cow",
                    path: "src/assets/sprites/Cow.png",
                    maxHealth: 8,
                    killGold: 5,
                    drops: [{name: "bones", rate: .5}]
                },
                {
                    name: "goblin",
                    path: "src/assets/sprites/Goblin.png",
                    maxHealth: 5,
                    killGold: 3,
                    drops: [{name: "bones", rate: .5}]
                }
            ],
            audio: { bgm: "harmony" }
        });
    }
}
