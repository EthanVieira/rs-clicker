import { CONSTANTS } from "../constants/constants.js";
import { EnemyLevelScene } from "./enemy-level.js";

export class BarbarianVillageScene extends EnemyLevelScene {
    constructor() {
        super({
            key: CONSTANTS.SCENES.BARBARIAN_VILLAGE,
            killQuest: 20,
            background: {
                name: "barbarian_village",
                path: "src/assets/backgrounds/BarbarianVillageBackground.png"
            },
            minimap: {
                name: "barbarian_village_map",
                path: "src/assets/maps/BarbarianVillageMap.png"
            },
            clickObjects: [
                {
                    name: "male_barbarian",
                    path: "src/assets/sprites/MaleBarbarian.png",
                    maxHealth: 20,
                    killGold: 20
                },
                {
                    name: "female_barbarian",
                    path: "src/assets/sprites/FemaleBarbarian.png",
                    maxHealth: 20,
                    killGold: 20
                }
            ],
            audio: { bgm: "barbarianism" }
        });
    }
}
