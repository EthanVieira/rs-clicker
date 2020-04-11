import { AutoClicker } from "./auto-clicker.js";

export class HiredBowman extends AutoClicker {
    constructor(scene) {
        super({
            scene: scene,
            name: "Hired Bowman",
            level: 1,
            dps: 5
        });
    }
}
