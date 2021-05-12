import { Resource } from "../resource.js";

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
