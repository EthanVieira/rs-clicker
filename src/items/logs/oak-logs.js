import Logs from "../logs.js";

export default class OakLogs extends Logs {
    // Text data
    name = "Oak Logs";
    item = "Logs";
    type = "Oak";
    examineText = "Logs cut from an oak tree.";

    // Other
    cost = 20;
  
    requiredLevel = 15;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
