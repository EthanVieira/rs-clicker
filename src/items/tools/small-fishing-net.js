import Tool from "./tool.js";

export default class SmallFishingNet extends Tool {
    // Item data
    name = "Small Fishing Net";
    item = "Small Fishing Net";
    requiredLevels = { fishing: 1 };
    examineText = "Useful for catching small fish.";
    cost = 5;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
