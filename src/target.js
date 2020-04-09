import { HealthBar } from "./ui/health-bar.js";

export class Target {
    target;
	progressBar;
    scene;
    name = "";
    drops = [];

    constructor(data) {
        // Add target
        this.target = data.scene.add.image(data.x, data.y, data.name);
        this.target
            .setOrigin(0.5, 0)
            .setDepth(2)
            .setScale(0.4);
			.setInteractive();
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

    updateProgress(damage) {
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

class Enemy extends Target {
	blueHitsplat;
    redHitsplat;
    hitsplatText = "1";
	killGold;
	
	constructor(data) {
		super(data);
		
		// Add hitsplats
        this.blueHitsplat = data.scene.add
            .image(data.x, data.y + 50, "blue-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(3);
			.setScale(0.3);
        this.blueHitsplat.visible = false;

        this.redHitsplat = data.scene.add
            .image(data.x, data.y + 50, "red-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(3);
			.setScale(0.3);
        this.redHitsplat.visible = false;

		// Add damage text
        this.hitsplatText = data.scene.add
			.text(data.x, data.y + 100, "1", {
				fill: "white"
			})
			.setOrigin(0.5, 0)
			.setDepth(4);
        this.hitsplatText.visible = false;

        // Add health bar
        this.progressBar = new HealthBar(data.scene, data.x, data.y - 40, data.health);
		
		// Enemy specific vars
		this.killGold = data.killGold;
	}
	
	getClickValue() {
		// Get damage based on level
        let damageLevel =  this.scene.getDamageLevel();
		let hitValue = Math.floor(Math.random() * (damageLevel + 1));
		return hitValue;
	}
	
	onClick(hitValue) {
		// Get bonus gold for using mouseclick to encourage user interaction
        this.stats.addGold(hitValue);
		
		// Update stats
		this.stats.updateClickDamageStat(hitValue);
		// Update skills here
		
		// Display hit
        this.hitsplatText.text = hitValue;
        hitValue == 0
            ? (this.blueHitsplat.visible = true)
            : (this.redHitsplat.visible = true);
        this.hitsplatText.visible = true;
		
		// Hide hitsplat
        let _this = this;
        setTimeout(function() {
            _this.redHitsplat.visible = false;
            _this.blueHitsplat.visible = false;
            _this.hitsplatText.visible = false;
        }, 200);
	}
	
	onCompletion() {
		// Give extra gold if unit is killed
		this.stats.addGold(this.killGold);
		console.log(this.name + " killed, getting " + this.killGold + " extra gold");
		
		// Update quest and stats
        this.scene.targetKilled(this.name);
	}
}

class Resource extends Target {
	skill;
	
	constructor(data) {
		super(data);
		
		this.skill = data.skill;

        // Add health bar
        this.progressBar = new ProgressBar(data.scene, data.x, data.y - 40, data.health);
	}
	
	getClickValue() {
		return calcLeve(this.characterData.skills[skill]);
	}
	
	onClick(clickValue) {
		// Increase skill xp
		this.characterData.skills[skill] += clickValue;
	}
	
	onCompletion() {}
}
