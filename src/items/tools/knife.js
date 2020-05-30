import Tool from "../tool.js";

export default class Knife extends Tool {
    // Text data
    name = "Knife";
    item = "Knife";
    examineText = "A dangerous looking knife.";

    // Other
    cost = 6;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
