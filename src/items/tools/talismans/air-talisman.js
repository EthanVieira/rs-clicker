import Talisman from "./talisman.js";

export default class AirTalisman extends Talisman {
    // Text data
    name = "Air Talisman";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
