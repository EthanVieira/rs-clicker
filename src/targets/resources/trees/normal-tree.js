import { Tree } from "./tree.js";
import NormalLogs from "../../../items/logs/normal-logs.js";

export class NormalTree extends Tree {
    examineText = "A commonly found tree.";

    constructor(scene) {
        super({
            scene: scene,
            name: "Tree",
            questName: "tree",
            images: [
                { name: "tree1", path: "src/assets/sprites/Tree1.png", scale: 0.7 },
                { name: "tree2", path: "src/assets/sprites/Tree2.png", scale: 0.4 },
            ],
            neededClicks: 5,
            drops: [{ item: NormalLogs, rate: 1 }],
            requiredLevels: {
                woodcutting: 1,
            },
        });
    }
}
