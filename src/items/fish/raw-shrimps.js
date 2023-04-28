import RawFish from "./raw-fish.js";

export default class RawShrimps extends RawFish {
    // Text data
    name = "Raw Shrimps";
    item = "Raw Fish";

    // Other
    cost = 5;
    cookingXp = 30;
    cookingLvl = 1;
    burnLvlLimit = 34;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
