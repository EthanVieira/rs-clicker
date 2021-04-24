import { Item } from "./item.js";

export default class Bar extends Item {
    xp = 0;
    ores = [];
    smeltingErrorMessage = "Insufficient ingredients.";

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
