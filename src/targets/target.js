import { ClickableObject } from "../clickable-object.js";
import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";

export class Target extends ClickableObject {
    curTarget;
    targets = [];
    progressBar;
    name = "";
    drops = [];
    uniqueDrops = [];
    isStaticTarget = false;

    x = 0;
    y = 0;

    scene;
    stats;

    constructor(data) {
        super();
        let width = data.scene.cameras.main.width;
        let height = data.scene.cameras.main.height;
        this.x = width / 2 - 100;
        this.y = height / 2 - 150;

        // Check for offsets
        if (data.offsetX != undefined) {
            this.x += data.offsetX;
        }
        if (data.offsetY != undefined) {
            this.y += data.offsetY;
        }

        // Add images if there are multiple
        data.images.forEach((image) => {
            let target = data.scene.add
                .image(this.x, this.y, image.name)
                .setOrigin(0.5, 0)
                .setDepth(2)
                .setScale(image.scale)
                .setInteractive()
                .on("pointerdown", (pointer) => {
                    if (pointer.rightButtonDown() && !pointer.leftButtonDown()) {
                        this.createRightClickMenu(pointer.x, pointer.y, this.actions);
                    } else {
                        this.clickTarget();
                    }
                });
            target.visible = false;

            this.targets.push(target);
        });

        // Set other vars
        this.name = data.name;
        this.questName = data.questName;
        this.drops = data.drops;
        this.uniqueDrops = data.uniqueDrops;
        this.images = data.images;
        this.scene = data.scene;
        this.stats = data.scene.stats;
    }

    async clickTarget() {
        // Check child conditions
        if (this.isClickable()) {
            // Click animation
            this.scene.scene
                .get(CONSTANTS.SCENES.ANIMATION)
                .clickAnimation(this.getAnimation());

            // Target click interaction to be implemented by the child
            let progress = this.getClickValue();
            this.onClick(progress);

            // Increase progress and check status
            this.updateProgress(progress);

            // Log click for stats
            this.stats.updateClickedTargetStat();
        }
        this.scene.dashboard.quests.refreshStats();
    }

    updateProgress(progress) {
        let isFinished = this.progressBar.updateProgress(progress);

        if (isFinished) {
            // Calculate item drops
            // Separate rolls for unique and general

            // Unique drops
            // Can only obtain one
            if (this.uniqueDrops) {
                const randomNum = Math.random();
                let threshold = 0;

                for (const item of this.uniqueDrops) {
                    const canGetDrop = Object.keys(item.requiredLevels).every(
                        (skill) =>
                            characterData.getLevel(skill) >= item.requiredLevels[skill]
                    );

                    if (canGetDrop) {
                        // Assumes sum of rates <= 100%
                        threshold += item.rate;
                        if (threshold > randomNum) {
                            const droppedItem = new item.item(this.scene.dashboard);
                            console.log(this.name, "dropped", droppedItem.name);
                            this.scene.dashboard.inventory.addToInventory(droppedItem);

                            break;
                        }
                    }
                }
            }

            // General drops
            // Can obtain multiple
            this.drops.forEach((item) => {
                if (item.rate > Math.random()) {
                    const droppedItem = new item.item(this.scene.dashboard);
                    console.log(this.name, "dropped", droppedItem.name);
                    this.scene.dashboard.inventory.addToInventory(droppedItem);
                }
            });

            // Check for target specific actions
            this.onCompletion();

            // Show next target
            this.showRandomTarget();
        }
    }

    showRandomTarget() {
        this.setVisible(false);
        let index = Math.floor(Math.random() * this.scene.targets.length);
        this.scene.currentTargetIndex = index;
        this.scene.targets[index].setVisible();
    }

    setVisible(isVisible = true) {
        // Show a random image if there are multiple
        if (isVisible) {
            let index = Math.floor(Math.random() * this.images.length);
            this.curTarget = this.targets[index];
        }

        this.curTarget.visible = isVisible;
        this.progressBar.setVisible(isVisible);
    }
}
