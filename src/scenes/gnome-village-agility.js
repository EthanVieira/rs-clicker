import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { LogObstacle } from "../targets/obstacles/log-obstacle.js";

export class GnomeVillageAgilityScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.AGILITY,
            key: CONSTANTS.SCENES.GNOME_VILLAGE_AGILITY,
            background: {
                name: "gnome-village-agility",
                path: "src/assets/backgrounds/GnomeVillageAgilityBackground.png",
            },
            minimap: {
                name: "gnome-village-agility-map",
                path: "src/assets/maps/GnomeVillageAgilityMap.png",
            },
            targets: [LogObstacle],
            questAmounts: {
                logObstacle: [10, 100, 1000],
            },
            questPointAward: 1,
            audio: { bgm: "gnome-village" },
            height: 500,
            width: 230,
            shouldAutoclick: true,
        });
    }
}
