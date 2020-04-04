import { ProgressBar } from "./ui/progress-bar.js";
import { CONSTANTS, calcLevel } from "./constants/constants.js"; 

export class Resource {
    scene;
    progressBar;
    skill;
    resource;
    name = "";
    drops = [];

    constructor(data) {
        // Add skill object
        this.resource = data.scene.add.image(data.x, data.y, data.name);
        this.resource
            .setOrigin(0.5, 0)
            .setDepth(2)
            .setScale(1);
        this.resource.setInteractive();
        this.resource.visible = false;
        this.resource.on("pointerup", () => {
            // Check if it is the current enemy
            if (this.resource.visible) {
                this.clickTarget();
            }
        });
        this.name = data.name;

        // Add progress bar
        this.progressBar = new ProgressBar(
            data.scene,
            data.x,
            data.y - 40,
            data.neededClicks
        );

        // Set other vars
        this.drops = data.drops;
        this.scene = data.scene;
        this.stats = data.scene.stats;
    }

    clickTarget() {
        // Get current resource level and add xp
        let curXp = 0;
        let droppedResource = new this.drops[0].item(this.scene.dashboard);

        // Increase xp for relevant resources
        switch (droppedResource.item) {
            case "Logs":
                curXp = this.scene.characterData.skills.woodcutting++;
                break;
        }
        let curLv = calcLevel(curXp);

        // Display updated level
        this.scene.dashboard.updateSkillsText();

        // Increase progress and check completion
        let completed = this.progressBar.updateProgress(curLv);
        if (completed) {
            console.log("Got", droppedResource.name);
            this.scene.dashboard.inventory.obj.addToInventory(droppedResource);
            this.scene.showRandomClickObject();
        }

        // Update stats
        this.stats.updateClickedTargetStat();
    }

    show() {
        this.resource.visible = true;
        this.progressBar.show();
    }

    hide() {
        this.resource.visible = false;
        this.progressBar.hide();
    }
}
