export class Target {
    target;
	progressBar;
    name = "";
    drops = [];

    scene;
    stats;
    characterData;

    constructor(data) {
        // Add target
        this.target = data.scene.add.image(data.x, data.y, data.name);
        this.target
            .setOrigin(0.5, 0)
            .setDepth(2)
            .setScale(.4)
			.setInteractive()
			.on("pointerup", () => {
				// Check if it is the current target
				if (this.target.visible) {
					this.clickTarget();
				}
			});
		this.target.visible = false;

        // Set other vars
		this.name = data.name;
        this.drops = data.drops;
        this.scene = data.scene;
        this.stats = data.scene.stats;
        this.characterData = data.scene.characterData;
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
			this.scene.showRandomClickObject();
        }
    }

    show() {
        this.target.visible = true;
        this.progressBar.show();
    }

    hide() {
        this.target.visible = false;
        this.progressBar.hide();
    }
}
