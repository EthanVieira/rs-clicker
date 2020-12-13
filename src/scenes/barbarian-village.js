import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { Barbarian } from "../targets/enemies/barbarian.js";

export class BarbarianVillageScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.ENEMY,
            key: CONSTANTS.SCENES.BARBARIAN_VILLAGE,
            killQuest: 20,
            background: {
                name: "barbarian-village",
                path: "src/assets/backgrounds/BarbarianVillageBackground.png",
            },
            minimap: {
                name: "barbarian-village-map",
                path: "src/assets/maps/BarbarianVillageMap.png",
            },
            targets: [Barbarian],
            audio: { bgm: "barbarianism" },
        });
    }
}
