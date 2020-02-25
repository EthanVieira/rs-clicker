import { CONSTANTS } from "../constants/constants.js";
import { EnemyLevelScene } from "./enemy-level.js";

export class VarrockScene extends EnemyLevelScene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.VARROCK,
            killQuest: 15,
            background: {
                name: "varrock",
                path: "src/assets/backgrounds/VarrockBackground.png"
            },
            minimap: {
                name: "varrock_map",
                path: "src/assets/maps/VarrockMap.png"
            },
            clickObjects: [
                {
                    name: "dark_wizard",
                    path: "src/assets/sprites/DarkWizard.png",
                    maxHealth: 12,
                    killGold: 10
                },
                {
                    name: "guard",
                    path: "src/assets/sprites/Guard.png",
                    maxHealth: 22,
                    killGold: 15
                }
            ],
            audio: { bgm: "expanse" }
        });
    }
}
