export class ProgressBar {
    progressBar;
    clicksNeeded = 0;
    clickProgress = 0;
    x = 0;
    y = 0;
    height = 0;
    width = 0;

    constructor(scene, x, y, clicksNeeded) {
        // Offset coordinates based on width/height of health bar
        this.width = clicksNeeded + 50;
        this.height = 12;
        this.x = x - 4 - (5 * this.width) / 12;
        this.y = y - this.height;

        // Get health
        this.clicksNeeded = clicksNeeded;
        this.currentHealth = clicksNeeded;

        // Construct health bar
        this.progressBar = scene.add.graphics();
        this.progressBar.setDepth(3);
        this.progressBar.fillStyle(0xffffff); // Border (white)
        this.progressBar.fillRect(
            this.x + 2,
            this.y + 2,
            this.width,
            this.height
        );
        this.progressBar.visible = false;
    }

    updateProgress(progIncrease) {
        this.progressBar.clear();

        // Border (white)
        this.progressBar.fillStyle(0xffffff);
        this.progressBar.fillRect(
            this.x + 2,
            this.y + 2,
            this.width,
            this.height
        );

        // Apply damage
        this.clickProgress += progIncrease;

        // If completed, show new resource
        let completed = false;
        if (this.clickProgress >= this.clicksNeeded) {
            completed = true;
            this.clickProgress = 0;
        }

        this.progressBar.fillStyle(0xffcc00);
        this.progressBar.fillRect(
            this.x + 2,
            this.y + 2,
            this.clickProgress * (this.width / this.clicksNeeded),
            this.height
        );
        return completed;
    }

    show() {
        this.progressBar.visible = true;
    }

    hide() {
        this.progressBar.visible = false;
    }
}
