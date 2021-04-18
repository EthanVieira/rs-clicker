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
        let curWeapon = this.scene.dashboard.equipment.equipment.WEAPON;
        let inventory = this.scene.dashboard.inventory;
        let chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        let toolKeyword = "";
        let skillLevel = calcLevel(characterData.getSkillXp(this.skill));

        switch (this.skill) {
            case "woodcutting":
                toolKeyword = "Axe";
                break;
            case "mining":
                toolKeyword = "Pickaxe";
                break;
            default:
                console.log("Error: invalid skill.");
        }

        let i = inventory.getKeywordInInventory(toolKeyword, true, [this.skill]);
        if (
            !(
                curWeapon.item == toolKeyword &&
                skillLevel >= curWeapon.requiredLevels[this.skill]
            ) &&
            i == -1
        ) {
            chat.writeText(
                "This action requires a " +
                    toolKeyword +
                    " that you have the required " +
                    this.skill +
                    " level to use."
            );
            return false;
        }

        if (skillLevel >= this.requiredLevels[this.skill]) {
            return true;
        } else {
            chat.writeText(
                "You do not have the required " +
                    this.skill +
                    " level to perform this action."
            );
            return false;
        }
    }

    getClickValue() {
        return calcLevel(characterData.getSkillXp(this.skill));
    }

    onClick(clickValue) {}

    onCompletion() {
        characterData.addSkillXp(this.skill, this.neededClicks);

        // Update quest and stats
        this.scene.enemyKilled(this.varName);
    }
}
