import { autoclickerManifest } from "./auto-clicker-manifest.js";
import { OBJECT_TYPES } from "../constants/constants.js";

export async function getautoclickerClass(className, scene) {
    let path = autoclickerManifest[className].classPath;
    let clickerClass = await import(path);

    return new clickerClass.default(scene);
}

export class AutoClicker {
    objectType = OBJECT_TYPES.AUTOCLICKER;
    name = "";
    dps = 0;
    level = 0;

    scene;

    damageInterval = 0;
    timer = {};

    constructor(data) {
        console.log("Creating " + data.name + " autoclicker with " + data.dps + " dps");
        this.scene = data.scene;
        this.stats = data.scene.stats;
        this.dps = data.dps;
        this.level = data.level;
        this.name = name.type;

        // Damage every .1 second
        this.damageInterval = 100;
        this.timer = this.scene.time.addEvent({
            delay: this.damageInterval,
            callback: () => {
                this.clickTarget();
            },
            loop: true,
            paused: false,
        });
    }

    clickTarget() {
        let damagePerTick = this.dps * (this.damageInterval / 1000);
        this.scene.clickCurrentTarget(damagePerTick);
        this.stats.updateAutoClickDamageStat(damagePerTick);
    }
}
