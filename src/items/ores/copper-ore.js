import Ore from "./ore.js";

export default class CopperOre extends Ore {
    // Text data
    name = "Copper Ore";
    item = "Ore";
    type = "Copper";
    examineText = "Copper ore.";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
