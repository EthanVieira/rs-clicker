import { HealthBar } from "./ui/health-bar.js";
import { Target } from "./target.js";

export class Enemy extends Target {
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
            .setDepth(3)
            .setScale(0.3);
        this.blueHitsplat.visible = false;

        this.redHitsplat = data.scene.add
            .image(data.x, data.y + 50, "red-hitsplat")
            .setOrigin(0.5, 0)
            .setDepth(3)
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
        this.progressBar = new HealthBar(data.scene, data.x, data.y - 40, data.maxHealth);
        
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
        this.scene.enemyKilled(this.name);
    }
}