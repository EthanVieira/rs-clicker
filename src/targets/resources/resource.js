import { ProgressBar } from "../../ui/progress-bar.js";
import { CONSTANTS } from "../../constants/constants.js";
import { calcLevel } from "../../utilities.js";
import { Target } from "../target.js";
import { characterData } from "../../cookie-io.js";

export class Resource extends Target {
    skill = "";
    neededClicks = 0;
    animation = {};

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

    // If it's clickable, set animation for target's use then return true
    isClickable() {
        const curWeapon = this.scene.dashboard.equipment.equipment.WEAPON;
        const inventory = this.scene.dashboard.inventory;
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
        let toolKeyword = "";
        const skillLevel = calcLevel(characterData.getSkillXp(this.skill));

        // Skill level too low
        if (skillLevel < this.requiredLevels[this.skill]) {
            chat.writeText(
                "You do not have the required " +
                    this.skill +
                    " level to perform this action."
            );
            return false;
        }

        // Get tool
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

        // Check currently equipped tool
        if (
            curWeapon?.item == toolKeyword &&
            skillLevel >= curWeapon.requiredLevels[this.skill]
        ) {
            this.setAnimation(curWeapon);
            return true;
        }

        // Check inventory
        const i = inventory.getKeywordInInventory(toolKeyword, true, [this.skill]);
        if (i >= 0) {
            this.setAnimation(inventory.inventory[i]);
            return true;
        } else {
            chat.writeText(
                "This action requires a " +
                    toolKeyword +
                    " that you have the required " +
                    this.skill +
                    " level to use."
            );
            return false;
        }
    }

    getAnimation() {
        return this.animation;
    }

    setAnimation(weapon) {
        let animation = weapon.animation;
        if (animation.imageName == "") {
            animation.imageName = weapon.sprite.texture.key + "-model";
        }
        this.animation = animation;
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
