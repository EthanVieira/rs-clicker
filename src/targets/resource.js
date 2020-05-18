import { ProgressBar } from "../ui/progress-bar.js";
import { CONSTANTS } from "../constants/constants.js";
import { calcLevel } from "../utilities.js";
import { Target } from "./target.js";

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
            this.neededClicks,
        );
    }

    isClickable() {
        let curWeapon = this.scene.dashboard.equipment.obj.equipment.WEAPON;
        if (this.skill == "woodcutting" && curWeapon.item != "Axe") {
            return false;
        } else {
            return true; true;
        }
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
