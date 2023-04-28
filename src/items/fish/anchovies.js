import CookedFish from "./cooked-fish.js";

export default class Anchovies extends CookedFish {
    // Text data
    name = "Anchovies";
    item = "Cooked Fish";
    examineText = "Some nicely cooked anchovies.";

    // Other
    cost = 15;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
