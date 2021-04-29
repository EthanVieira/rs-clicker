import Bar from "./bar.js";

export default class BronzeBar extends Bar {
    // Text data
    name = "Bronze Bar";
    item = "Bar";
    type = "Bronze";
    examineText = "It's a bar of bronze.";

    // Other
    cost = 8;
    xp = 6;
    ores = ["CopperOre", "TinOre"];
    smeltingErrorMessage = "You need at least one copper and one tin ore to smelt a bronze bar.";

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
