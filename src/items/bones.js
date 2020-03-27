import { Item } from "./item.js";

export default class Bones extends Item {
    prayerXp = 0;
    actions = ["bury", "use"];

    constructor() {
        super();
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