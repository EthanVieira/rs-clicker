import CookedFish from "./cooked-fish.js";

export default class Shrimps extends CookedFish {
    // Text data
    name = "Shrimps";
    item = "Cooked Fish";
    examineText = "Some nicely cooked shrimps.";

    // Other
    cost = 5;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
