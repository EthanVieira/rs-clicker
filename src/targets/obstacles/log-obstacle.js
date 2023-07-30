import { Obstacle } from "./obstacle.js";

export class LogObstacle extends Obstacle {
    constructor(scene) {
        super({
            scene: scene,
            name: "Log Obstacle",
            varName: "logObstacle",
            examineText: "A slippery log I can walk across",
            actions: [
                { text: "Walk Across", func: "clickTarget" },
                { text: "Examine", func: "examine" },
            ],
            requiredLevel: 1,
            xpReward: 7.5,
            neededClicks: 5,
            height: 100,
            width: 200,
        });
    }
}
