import { Resource } from "../resource.js";
import NormalLogs from "../../items/logs/normal-logs.js";

export class NormalTree extends Resource {
    constructor(scene) {
        super({
            scene: scene,
            skill: "woodcutting",
            images: [
                {name: "tree1", path: "src/assets/sprites/Tree1.webp"},
                {name: "tree2", path: "src/assets/sprites/Tree2.webp"},
            ],
            neededClicks: 5,
            drops: [{item: NormalLogs, rate: 1}]
        });
    }
}