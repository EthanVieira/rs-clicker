import { ProgressBar } from "../ui/progress-bar.js";
import { CONSTANTS } from "../constants/constants.js";
import { calcLevel } from "../utilities.js";
import { Target } from "./target.js";
import { characterData } from "../cookie-io.js";

export class Resource extends Target {
    skill = "";
    neededClicks = 0;

    constructor(data) {
        super(data);

        this.skill = data.skill;
        this.neededClicks = data.neededClicks;

        // Add health bar
        this.progressBar = new ProgressBar(
            this.scene,
            this.x,
            this.y - 40,
            this.neededClicks
        );
    }

    isClickable() {
        return true;
    }

    getClickValue() {
        return calcLevel(characterData.getSkillXp(this.skill));
    }

    onClick(clickValue) {}

    onCompletion() {
        characterData.addSkillXp(this.skill, this.neededClicks);
    }
}
