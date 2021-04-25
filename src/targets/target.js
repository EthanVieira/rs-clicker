import { ClickableObject } from "../clickable-object.js";

export class Target extends ClickableObject {
    curTarget;
    targets = [];
    progressBar;
    name = "";
    drops = [];

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
        this.varName = data.varName;
        this.drops = data.drops;
        this.images = data.images;
        this.scene = data.scene;
        this.stats = data.scene.stats;
    }

    async clickTarget() {
        // Check child conditions
        if (await this.isClickable()) {
            // Click animation
            this.scene.clickAnimation();

            // Target click interaction to be implemented by the child
            let progress = this.getClickValue();
            this.onClick(progress);

            // Increase progress and check status
            this.updateProgress(progress);

            // Log click for stats
            this.stats.updateClickedTargetStat();
        }
    }

    updateProgress(progress) {
        let isFinished = this.progressBar.updateProgress(progress);

        if (isFinished) {
            // Calculate item drops
            this.drops.forEach((item) => {
                if (item.rate > Math.random()) {
                    let droppedItem = new item.item(this.scene.dashboard);
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
        this.hide();
        let index = Math.floor(Math.random() * this.scene.targets.length);
        this.scene.currentTargetIndex = index;
        this.scene.targets[index].show();
    }

    show() {
        // Show a random image if there are multiple
        let index = Math.floor(Math.random() * this.images.length);
        this.curTarget = this.targets[index];
        this.curTarget.visible = true;
        this.progressBar.show();
    }

    hide() {
        this.curTarget.visible = false;
        this.progressBar.hide();
    }
}
