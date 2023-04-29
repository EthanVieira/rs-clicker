import BurntFish from "./burnt-fish.js";

export default class BurntShrimps extends BurntFish {
    // Text data
    name = "Burnt Shrimps";
    item = "Burnt Fish";

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
