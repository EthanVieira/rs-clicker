import { ClickableObject } from "../../clickable-object.js";
import { CONSTANTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";
import { getItemClass } from "../../utilities.js";
import { Button } from "../../ui/button.js";
import { ProgressBar } from "../../ui/progress-bar.js";

export class EssenceMine extends ClickableObject {
    pureEssenceLevel = 30;
    progressBar;
    name = "Rune Essence";
    skill = "mining";

    isStaticTarget = false;

    // only need the questName for updating quest stats
    // and there is only a quest for pure essence
    questName = "pureEssence";
    xpReward = 5;
    animation;
    examineText = "The source of all runes.";
    actions = [
        { text: "Mine", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    stats;

    constructor(scene) {
        super();
        this.scene = scene;

        const cameraWidth = scene.cameras.main.width;
        const cameraHeight = scene.cameras.main.height;
        // Height and width of invisible button
        const height = 180;
        const width = 220;
        const neededClicks = 5;

        const x = cameraWidth / 2;
        const y = cameraHeight / 2;

        // Add invisible button for clicking the mine
        this.sprite = new Button(this.scene, x - width, y - height / 2, width, height);
        this.sprite.on("pointerdown", (pointer) => {
            if (pointer.rightButtonDown() && !pointer.leftButtonDown()) {
                this.createRightClickMenu(pointer.x, pointer.y, this.actions);
            } else {
                this.clickTarget();
            }
        });

        this.progressBar = new ProgressBar(this.scene, x - 100, y - 100, neededClicks);
    }

    isClickable() {
        const curWeapon = this.scene.dashboard.equipment.equipment.WEAPON;
        const inventory = this.scene.dashboard.inventory;
        const skillLevel = characterData.getLevel(this.skill);
        const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);

        const toolKeyword = "Pickaxe";

        // Check currently equipped tool
        if (
            curWeapon?.item == toolKeyword &&
            skillLevel >= curWeapon.requiredLevels[this.skill]
        ) {
            this.animation = curWeapon.getAnimation();
            return true;
        }

        // Check inventory
        const i = inventory.getKeywordInInventory(toolKeyword, true, [this.skill]);
        if (i >= 0) {
            this.animation = inventory.inventory[i].getAnimation();
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

    async clickTarget() {
        if (this.isClickable()) {
            this.scene.scene
                .get(CONSTANTS.SCENES.ANIMATION)
                .clickAnimation(this.getAnimation());
            let progress = this.getClickValue();
            this.updateProgress(progress);
            this.scene.stats.updateClickedTargetStat();
        }
    }

    async updateProgress(progress) {
        let isFinished = this.progressBar.updateProgress(progress);

        if (isFinished) {
            const inv = this.scene.dashboard.inventory;
            const currentLevel = characterData.getLevel(this.skill);

            const canMinePureEssence = currentLevel >= this.pureEssenceLevel;
            const essenceName = (canMinePureEssence ? "Pure" : "Rune") + "Essence";

            const essence = await getItemClass(essenceName, this.scene.dashboard);
            inv.addToInventory(essence, true);
            characterData.addSkillXp({ mining: this.xpReward });

            if (canMinePureEssence) {
                this.scene.enemyKilled(this.questName);
            }
        }
    }

    getClickValue() {
        return characterData.getLevel(this.skill);
    }

    getAnimation() {
        return this.animation;
    }

    setVisible(isVisible = true) {
        this.sprite.visible = isVisible;
        this.progressBar.setVisible(isVisible);
    }
}
