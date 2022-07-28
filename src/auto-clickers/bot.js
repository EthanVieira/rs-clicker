import { AutoClicker } from "./auto-clicker.js";

export default class Bot extends AutoClicker {
    constructor(scene) {
        super({
            scene: scene,
            name: "Bot",
            examineText: "A bot made by a script kiddie. Might get banned soon.",
            cost: 50,
            level: 1,
            dps: 1,
            numberOwned: 1,
        });
    }
}
