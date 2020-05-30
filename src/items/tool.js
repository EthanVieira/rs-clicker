import { Item } from "./item.js";

export default class Tool extends Item {
    canCraft = true;

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
