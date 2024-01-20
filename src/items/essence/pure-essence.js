import Essence from "./essence.js";

export default class PureEssence extends Essence {
    // Text data
    name = "Pure Essence";
    item = "Essence";
    type = "Pure";
    examineText = "An unimbued rune of extra capability.";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
