import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { TableSpace } from "../targets/table-space.js";

export class PlayerOwnedHouseScene extends LevelScene {
    constructor() {
        super({
            levelType: CONSTANTS.LEVEL_TYPE.CONSTRUCTION,
            key: CONSTANTS.SCENES.PLAYER_OWNED_HOUSE,
            background: {
                name: "player-owned-house",
                path: "src/assets/backgrounds/PlayerOwnedHouseBackground.png",
            },
            minimap: {
                name: "player-owned-house-map",
                path: "src/assets/maps/PlayerOwnedHouseMap.png",
            },
            targets: [TableSpace],
            questAmounts: {
                normalTable: [10, 100, 1000],
            },
            questPointAward: 1,
            audio: { bgm: "home-sweet-home" },
        });
    }
}