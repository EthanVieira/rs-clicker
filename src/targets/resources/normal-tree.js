import { Resource } from "../resource.js";
import NormalLogs from "../../items/logs/normal-logs.js";

export class NormalTree extends Resource {
    constructor(scene) {
        super({
            scene: scene,
            name: "Tree",
            varName: "tree",
            skill: "woodcutting",
            images: [
                {name: "tree1", path: "src/assets/sprites/Tree1.webp", scale: 0.7},
                {name: "tree2", path: "src/assets/sprites/Tree2.webp", scale: 0.4},
            ],
            neededClicks: 5,
            drops: [{item: NormalLogs, rate: 1}]
        });
    }
}