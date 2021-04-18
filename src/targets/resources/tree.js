import { Resource } from "../resource.js";
import { CONSTANTS } from "../../constants/constants.js";
import { calcLevel, getItemClass } from "../../utilities.js";
import { characterData } from "../../cookie-io.js";

export class Tree extends Resource {
    requiredLevels;
    actions = [
        { text: "Chop", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(data) {
        data.skill = "woodcutting";
        super(data);
        this.requiredLevels = data.requiredLevels;
    }
}
