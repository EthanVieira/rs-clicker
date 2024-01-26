import Rune from "./rune.js";

export default class AirRune extends Rune {
    // Text data
    name = "Air Rune";
    item = "Rune";
    examineText = "One of the 4 basic elemental Runes.";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
