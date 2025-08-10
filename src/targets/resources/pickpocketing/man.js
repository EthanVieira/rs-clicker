import { PickpocketTarget } from "./pickpocket-target.js";
import Coin from "../../../items/currencies/coin.js";

export class Man extends PickpocketTarget {
    examineText = "One of Gielinor's many citizens.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Man",
            questName: "man",
            images: [
                { name: "man", path: "assets/sprites/thieving/Man.png", scale: 0.3 },
            ],
            neededClicks: 5,
            drops: [{ item: Coin, rate: 1, amount: 3 }],
            requiredLevels: {
                thieving: 1,
            },
        });
    }
}
