import { Resource } from "../resource.js";
import { CONSTANTS } from "../../../constants/constants.js";
import { calcLevel } from "../../../utilities.js";
import { characterData } from "../../../cookie-io.js";

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
