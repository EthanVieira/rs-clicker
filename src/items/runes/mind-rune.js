import Rune from "./rune.js";

export default class MindRune extends Rune {
    // Text data
    name = "Mind Rune";
    item = "Rune";
    examineText = "Used for basic level missile spells.";

    // Other
    cost = 3;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
