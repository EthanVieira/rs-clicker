import { Resource } from "../resource.js";
import { CONSTANTS } from "../../constants/constants.js";
import { calcLevel, getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";

export class Rock extends Resource {
    requiredLevels;
    actions = [
        { text: "Mine", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(data) {
        data.skill = "mining";
        super(data);
        this.requiredLevels = data.requiredLevels;
    }
}
