export class AutoClicker {
    name = "";
    dps = 0;
    level = 0;

    scene;

    damageInterval = 0;
    timer = {};

    constructor(data) {
        console.log("Creating " + data.name + " autoclicker with " + data.dps + " dps");
        // Pull into local objects
        this.scene = data.scene;
        this.stats = data.scene.stats;
        this.dps = data.dps;
        this.level = data.level;
        this.name = name.type;

        // Damage every .1 second
        this.damageInterval = 0.1;
        this.timer = setInterval(this.clickTarget.bind(this), this.damageInterval * 1000);
    }

    clickTarget() {
        let damagePerTick = this.dps * this.damageInterval;
        this.scene.clickCurrentTarget(damagePerTick);
        this.stats.updateAutoClickDamageStat(damagePerTick);
    }

    release() {
        clearInterval(this.timer);
    }

    getDps() {
        return this.dps;
    }

    getLevel() {
        return this.level;
    }
}
