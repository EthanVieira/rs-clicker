import Essence from "./essence.js";

export default class RuneEssence extends Essence {
    // Text data
    name = "Rune Essence";
    item = "Essence";
    type = "Rune";
    examineText = "An unimbued rune.";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
