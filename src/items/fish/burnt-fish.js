import { Item } from "../item.js";

export default class BurntFish extends Item {
    cost = 1;
    examineText = "Oops!";

    constructor() {
        super();
    }

    leftClick() {
        this.use();
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }
}
