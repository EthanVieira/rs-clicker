import { CONSTANTS } from "../constants/constants.js";
import { LevelScene } from "./level.js";
import { Furnace } from "../targets/furnace.js";

export class AlKharidFurnaceScene extends LevelScene {
    constructor() {
        super({
            // levelType: CONSTANTS.LEVEL_TYPE.RESOURCE,
            // resourceType: CONSTANTS.RESOURCES.ORE,
            key: CONSTANTS.SCENES.AL_KHARID_FURNACE,
            background: {
                name: "al-kharid-furnace",
                path: "src/assets/backgrounds/AlKharidFurnaceBackground.png",
            },
            minimap: {
                name: "al-kharid-furnace-map",
                path: "src/assets/maps/AlKharidFurnaceMap.png",
            },
            targets: [Furnace],
            questAmounts: {
                furnace: [15, 150, 1500],
            },
            audio: { bgm: "al-kharid" },
        });
    }
}
