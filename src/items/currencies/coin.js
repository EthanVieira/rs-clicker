import { Currency } from "../currency.js";
import { OBJECT_TYPES, CONSTANTS } from "../../constants/constants.js";
import { itemManifest } from "../item-manifest.js";
import { getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";

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
