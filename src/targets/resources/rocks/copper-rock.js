import { Rock } from "../rock.js";
import CopperOre from "../../../items/ore/copper-ore.js";

export class CopperRock extends Rock {
    examineText = "A copper rock.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Copper Rock",
            varName: "copperRock",
            images: [
                {
                    name: "copper-rock",
                    path: "src/assets/sprites/CopperRock.png",
                    scale: 1,
                },
            ],
            neededClicks: 5,
            drops: [{ item: CopperOre, rate: 1 }],
        });
    }
}
