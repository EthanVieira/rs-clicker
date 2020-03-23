import { CONSTANTS } from "../constants/constants.js";
import { EnemyLevelScene } from "./enemy-level.js";
import { ITEMS } from "../constants/items.js";

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
                    killGold: 20,
                    drops: [{item: "Bones", material: "Normal", rate: .5}]
                },
                {
                    name: "female_barbarian",
                    path: "src/assets/sprites/FemaleBarbarian.png",
                    maxHealth: 20,
                    killGold: 20,
                    drops: [{item: "Bones", material: "Normal", rate: .5}]
                }
            ],
            audio: { bgm: "barbarianism" }
        });
    }
}
