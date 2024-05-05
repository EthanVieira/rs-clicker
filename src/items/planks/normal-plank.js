import Plank from "./plank.js";

export default class NormalPlank extends Plank {
    // Text data
    name = "Plank";
    item = "Plank";
    type = "Normal";
    examineText = "A plank of wood!";

    // Other
    cost = 1;
    constructionLevel = 1;
    constructionXp = 29;
    // for future planks:
    // oak: 60xp/plank
    // teak: 90xp/plank
    // mahogany: 140xp/plank

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
