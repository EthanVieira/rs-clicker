export class AutoClicker {
    scene;
    dps = 0;
    level = 0;
    type = "";
    damageInterval = 0;
    timer = {};

    constructor(data) {
        console.log("Creating " + data.type + " autoclicker with " + data.dps + " dps");
        // Pull into local objects
        this.scene = data.scene;
        this.dps = data.dps;
        this.level = data.level;
        this.type = data.type;

        // Damage every .1 second
        this.damageInterval = 0.1;
        this.timer = setInterval(this.clickTarget.bind(this), this.damageInterval * 1000);
    }

    clickTarget() {
        let damagePerTick = this.dps * this.damageInterval;
        this.scene.clickCurrentTarget(damagePerTick);
        this.scene.updateAutoClickDamageStat(damagePerTick);
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
