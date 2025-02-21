import Rune from "./rune.js";

export default class FireRune extends Rune {
    // Text data
    name = "Fire Rune";
    item = "Rune";
    examineText = "One of the 4 basic elemental Runes.";

    // Other
    cost = 4;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
