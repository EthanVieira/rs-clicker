import { Resource } from "../resource.js";

export class FishingSpot extends Resource {
    requiredLevels;
    requiredTool;
    examineText = "I can see fish swimming in the water.";

    constructor(data) {
        data.skill = "fishing";
        super(data);
        this.requiredLevels = data.requiredLevels;
        this.requiredTool = data.requiredTool;
    }
}
