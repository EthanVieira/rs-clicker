import { HealthBar } from "./ui/health-bar.js";

export class Enemy {
    healthBar;
    enemy;
    blueHitsplat;
    redHitsplat;
    hitsplatText = "1";
    scene;
    killGold;
    name = "";

    constructor(data) {
        // Add enemy
        this.enemy = data.scene.add.image(data.x, data.y, data.name);
        this.enemy
            .setOrigin(0.5, 0)
            .setDepth(2)
            .setScale(0.4);
        this.enemy.setInteractive();
        this.enemy.visible = false;
        this.enemy.on("pointerup", () => {
            // Check if it is the current enemy
            if (this.enemy.visible) {
                this.clickEnemy();
            }
        });
        this.name = data.name;

        // Add hitsplats
        this.blueHitsplat = data.scene.add
            .image(data.x, data.y + 50, "blue-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(3);
        this.blueHitsplat.setScale(0.3);
        this.blueHitsplat.visible = false;

        this.redHitsplat = data.scene.add
            .image(data.x, data.y + 50, "red-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(3);
        this.redHitsplat.setScale(0.3);
        this.redHitsplat.visible = false;

        this.hitsplatText = data.scene.add.text(data.x, data.y + 100, "1", {
            fill: "white"
        });
        this.hitsplatText.setOrigin(0.5, 0).setDepth(4);
        this.hitsplatText.visible = false;

        // Add health bar
        this.healthBar = new HealthBar(
            data.scene,
            data.x,
            data.y - 40,
            data.maxHealth
        );

        // Set other vars
        this.killGold = data.killGold;
        this.scene = data.scene;
    }

    clickEnemy() {
        // Get damage based on level
        let damageLevel = this.scene.getDamageLevel();

        // Display hit
        let hitValue = Math.floor(Math.random() * (damageLevel + 1));
        console.log(damageLevel, hitValue);
        this.hitsplatText.text = hitValue;
        hitValue == 0
            ? (this.blueHitsplat.visible = true)
            : (this.redHitsplat.visible = true);
        this.hitsplatText.visible = true;

        // Get bonus gold for using mouseclick to encourage user interaction
        this.scene.addGold(hitValue);

        // Lower health and check life
        this.damageEnemy(hitValue);

        // Log hit for stats
        this.scene.updateClickedEnemyStat();
        this.scene.updateClickDamageStat(hitValue);

        // Hide hitsplat
        let _this = this; // Gross scope workaround
        setTimeout(function() {
            _this.redHitsplat.visible = false;
            _this.blueHitsplat.visible = false;
            _this.hitsplatText.visible = false;
        }, 200);
    }

    damageEnemy(damage) {
        // Lower health and check status
        let isDead = this.healthBar.updateHealth(damage);

        if (isDead) {
            // Give extra gold if unit is killed
            this.scene.addGold(this.killGold);
            console.log(
                this.name + " killed, getting " + this.killGold + " extra gold"
            );

            // Update quest and stats
            this.scene.enemyKilled(this.name);
        }
    }

    show() {
        this.enemy.visible = true;
        this.healthBar.show();
    }

    hide() {
        this.enemy.visible = false;
        this.healthBar.hide();
    }
}
