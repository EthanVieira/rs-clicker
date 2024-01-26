import { Item } from "../item.js";

export default class Rune extends Item {
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
