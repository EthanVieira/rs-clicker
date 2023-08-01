import { ClickableObject } from "../../clickable-object.js";
import { CONSTANTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";
import { calcLevel } from "../../utilities.js";
import { Button } from "../../ui/button.js";
import { ProgressBar } from "../../ui/progress-bar.js";

export class Obstacle extends ClickableObject {
    requiredLevel = 0;
    xpReward = 0;
    // Height and width of invisible button
    height = 0;
    width = 0;

    progressBar;
    neededClicks = 0;
    name = "Obstacle";
    skill = "agility";
    varName = "";

    stats;

    constructor(data) {
        super();
        this.scene = data.scene;
        this.name = data.name;
        this.varName = data.varName;
        this.examineText = data.examineText;
        this.actions = data.actions;
        this.requiredLevel = data.requiredLevel;
        this.xpReward = data.xpReward;
        this.neededClicks = data.neededClicks;
        this.height = data.height;
        this.width = data.width;
        this.stats = data.scene.stats;

        const cameraWidth = this.scene.cameras.main.width;
        const cameraHeight = this.scene.cameras.main.height;
        const x = cameraWidth / 2;
        const y = cameraHeight / 2;

        // Add invisible button for clicking obstacle
        this.sprite = new Button(
            this.scene,
            x - this.width,
            y - this.height / 2,
            this.width,
            this.height
        );
        this.sprite.on("pointerdown", (pointer) => {
            if (pointer.rightButtonDown() && !pointer.leftButtonDown()) {
                this.createRightClickMenu(pointer.x, pointer.y, this.actions);
            } else {
                this.clickTarget();
            }
        });

        this.progressBar = new ProgressBar(
            this.scene,
            x - 100,
            y - 100,
            this.neededClicks
        );
    }

    async clickTarget() {
        console.log("clicked");

        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        const currentLevel = calcLevel(characterData.getSkillXp(this.skill));

        if (currentLevel < this.requiredLevel) {
            chat.writeText(
                "You do not have the required agility level to cross this obstacle."
            );
            return;
        }

        // TODO: maybe have an animation
        let progress = this.getClickValue();

        console.log("prog", progress);

        // Click interaction to be implemented by the child
        this.onClick(progress);

        // Increase progress and check status
        this.updateProgress(progress);

        this.stats.updateClickedTargetStat();
    }

    updateProgress(progress) {
        let isFinished = this.progressBar.updateProgress(progress);

        if (isFinished) {
            characterData.addSkillXp({ agility: this.xpReward });
            this.scene.enemyKilled(this.varName);
        }
    }

    getClickValue() {
        return calcLevel(characterData.getSkillXp(this.skill));
    }

    onClick(clickValue) {}

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
        this.progressBar.setVisible(isVisible);
    }
}
