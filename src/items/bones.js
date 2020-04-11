import { Item } from "./item.js";

export default class Bones extends Item {
    prayerXp = 0;

    constructor() {
        super();
        // Add to front of actions array
        this.actions.unshift({ text: "Bury", func: "bury" });
    }

    leftClick() {
        this.bury();
    }

    bury() {
        console.log("bury", this.name);
        this.destroy();
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }
}
