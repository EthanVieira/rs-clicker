import { Item } from "../item.js";

export default class RawFish extends Item {
    constructor() {
        super();
    }

    examineText = "I should try cooking this.";

    leftClick() {
        this.use();
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }
}
