import Plank from "./plank.js";

export default class NormalPlank extends Plank {
    // Text data
    name = "Plank";
    item = "Plank";
    type = "Normal";
    examineText = "A plank of wood!";

    // Other
    cost = 1;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
