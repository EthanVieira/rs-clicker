import RawFish from "./raw-fish.js";

export default class RawAnchovies extends RawFish {
    // Text data
    name = "Raw Anchovies";
    item = "Raw Fish";

    // Other
    cost = 15;
    cookingXp = 30;
    cookingLvl = 1;
    burnLvlLimit = 34;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
