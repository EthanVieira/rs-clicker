import Bar from "../bar.js";

export default class BronzeBar extends Bar {
    // Text data
    name = "Bronze Bar";
    item = "Bar";
    type = "Bronze";
    examineText = "It's a bar of bronze.";

    // Other
    cost = 8;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
