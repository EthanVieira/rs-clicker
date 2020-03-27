import { Item } from "./item.js";

export default class Logs extends Item {
    actions = ["use"];

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