import { Rock } from "./rock.js";
import TinOre from "../../../items/ores/tin-ore.js";

export class TinRock extends Rock {
    examineText = "A tin rock.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Tin Rock",
            questName: "tinRock",
            images: [{ name: "tin-rock", path: "assets/sprites/TinRock.png", scale: 1 }],
            neededClicks: 5,
            drops: [{ item: TinOre, rate: 1, amount: 1 }],
            offsetY: 150,
            requiredLevels: {
                mining: 1,
            },
        });
    }
}
