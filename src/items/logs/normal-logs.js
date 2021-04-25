import Logs from "./logs.js";

export default class NormalLogs extends Logs {
    // Text data
    name = "Logs";
    item = "Logs";
    type = "Normal";
    examineText = "A number of wooden logs.";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
