import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
// import NormalBones from "../items/bones/normal-bones.js";
import { Barbarian } from "../targets/enemies/barbarian.js";

export class BarbarianVillageScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.ENEMY,
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
            targets: [Barbarian],
            audio: { bgm: "barbarianism" }
        });
    }
}
