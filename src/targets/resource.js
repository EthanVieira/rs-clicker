import { ProgressBar } from "../ui/progress-bar.js";
import { CONSTANTS } from "../constants/constants.js";
import { calcLevel } from "../utilities.js";
import { Target } from "./target.js";

export class Resource extends Target {
    skill;

    constructor(data) {
        super(data);

        this.skill = data.skill;
        this.neededClicks = data.neededClicks;

        // Add health bar
        this.progressBar = new ProgressBar(
            data.scene,
            this.x,
            this.y - 40,
            data.neededClicks
        );
    }

    getClickValue() {
        return calcLevel(this.characterData.skills[this.skill]);
    }

    onClick(clickValue) {}

    onCompletion() {
        // Increase skill xp
        this.characterData.skills[this.skill] += this.neededClicks;
        this.scene.dashboard.updateSkillsText();
    }
}
