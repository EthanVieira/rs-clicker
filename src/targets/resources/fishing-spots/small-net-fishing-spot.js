import { FishingSpot } from "./fishing-spot.js";
import RawShrimps from "../../../items/fish/raw-shrimps.js";
import RawAnchovies from "../../../items/fish/raw-anchovies.js";

export class SmallNetFishingSpot extends FishingSpot {
    actions = [
        { text: "Net", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(scene) {
        super({
            scene: scene,
            name: "",
            questName: "smallNetFishingSpot",
            images: [
                {
                    name: "fishing-spot",
                    path: "assets/sprites/FishingSpot.png",
                    scale: 1,
                },
            ],
            neededClicks: 5,
            uniqueDrops: [
                {
                    item: RawShrimps,
                    rate: 0.75,
                    requiredLevels: { fishing: 1 },
                    amount: 1,
                },
                {
                    item: RawAnchovies,
                    rate: 0.25,
                    requiredLevels: { fishing: 15 },
                    amount: 1,
                },
            ],
            drops: [],
            requiredLevels: {
                fishing: 1,
            },
            requiredTool: "Small Fishing Net",
            offsetY: 150,
        });
    }
}
