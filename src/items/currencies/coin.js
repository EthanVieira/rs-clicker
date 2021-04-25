import { Currency } from "./currency.js";

export default class Coin extends Currency {
    // Item data
    name = "Coin";
    item = "Currency";
    examineText = "Lovely money!";
    cost = 1;

    scene;

    actions = [
        { text: "Use", func: "use" },
        { text: "Examine", func: "examine" },
    ];

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
