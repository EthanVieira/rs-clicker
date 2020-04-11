export class Target {
    target; // Reference to the current image
    targets = [];
    progressBar;
    name = "";
    drops = [];

    x = 0;
    y = 0;

    scene;
    stats;
    characterData;

    constructor(data) {
        let width = data.scene.cameras.main.width;
        let height = data.scene.cameras.main.height;
        this.x = width / 2 - 100;
        this.y = height / 2 - 150;

        // Add images if there are multiple
        data.images.forEach(image => {
            let target = data.scene.add
                .image(this.x, this.y, image.name)
                .setOrigin(0.5, 0)
                .setDepth(2)
                .setScale(0.4)
                .setInteractive()
                .on("pointerup", () => {
                    this.clickTarget();
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
        this.characterData = data.scene.characterData;

        this.val = Math.floor(Math.random() * 100);
    }

    clickTarget() {
        // Target click interaction to be implemented by the child
        let progress = this.getClickValue();
        this.onClick(progress);

        // Increase progress and check status
        this.updateProgress(progress);

        // Log click for stats
        this.stats.updateClickedTargetStat();
    }

    updateProgress(progress) {
        let isFinished = this.progressBar.updateProgress(progress);

        if (isFinished) {
            // Calculate item drops
            this.drops.forEach(item => {
                if (item.rate > Math.random()) {
                    let droppedItem = new item.item(this.scene.dashboard);
                    console.log(this.name, "dropped", droppedItem.name);
                    this.scene.dashboard.inventory.obj.addToInventory(droppedItem);
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
        let index = Math.floor(Math.random() * this.scene.targetMetaData.length);
        this.scene.currentTargetIndex = index;
        this.scene.targets[index].show();
    }

    show() {
        // Show a random image if there are multiple
        let index = Math.floor(Math.random() * this.images.length);
        this.target = this.targets[index];
        this.target.visible = true;
        this.progressBar.show();
    }

    hide() {
        this.target.visible = false;
        this.progressBar.hide();
    }
}
