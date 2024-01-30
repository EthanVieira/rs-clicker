import { Item } from "../../item.js";

export default class Talisman extends Item {
    item = "Talisman";
    examineText = "A mysterious power emanates from the talisman...";

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
