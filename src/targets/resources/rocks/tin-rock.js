import { Rock } from "../rock.js";
import TinOre from "../../../items/ore/tin-ore.js";

export class TinRock extends Rock {
    examineText = "A tin rock.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Tin Rock",
            varName: "tinRock",
            images: [
                { name: "tin-rock", path: "src/assets/sprites/TinRock.png", scale: 1 },
            ],
            neededClicks: 5,
            drops: [{ item: TinOre, rate: 1 }],
        });
    }
}
