import BurntFish from "./burnt-fish.js";

export default class BurntAnchovies extends BurntFish {
    // Text data
    name = "Burnt Anchovies";
    item = "Burnt Fish";

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
