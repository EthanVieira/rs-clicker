import { Resource } from "../resource.js";

export class PickpocketTarget extends Resource {
    requiredLevels;
    actions = [
        { text: "Pickpocket", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(data) {
        data.skill = "thieving";
        super(data);
        this.requiredLevels = data.requiredLevels;
    }
}
