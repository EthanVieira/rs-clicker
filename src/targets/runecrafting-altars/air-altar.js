import { RunecraftingAltar } from "./runecrafting-altar.js";

export class AirAltar extends RunecraftingAltar {
    constructor(scene) {
        super({
            scene: scene,
            name: "Air Altar",
            runeVarName: "airRune",
            altarType: "Air",
            needsPureEssence: false,
            numRunesPerEssenceLvlThreshold: 11,
            requiredLevel: 1,
            runecraftingXp: 7.5,
        });
    }
}
