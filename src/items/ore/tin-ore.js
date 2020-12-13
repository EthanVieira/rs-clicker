import Ore from "../ore.js";

export default class TinOre extends Ore {
    // Text data
    name = "Tin Ore";
    item = "Ore";
    type = "Tin";
    examineText = "Tin ore.";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
