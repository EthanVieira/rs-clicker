import { Item } from "../item.js";

export default class CookedFish extends Item {
    constructor() {
        super();
    }

    leftClick() {
        // potential TODO: eat
        this.use();
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }
}
