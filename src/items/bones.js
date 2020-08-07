import { Item } from "./item.js";
import { characterData } from "../cookie-io.js";

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
        console.log("bury", this.name, "xp added:", this.prayerXp);
        characterData.addSkillXp("prayer", this.prayerXp);
        this.scene.skills.obj.updateSkillsText();

        // Reduce stack or destroy object
        if (this.numItems > 1) {
            this.setNumItems(this.numItems - 1);
        } else {
            this.destroy();
        }
    }

    use() {
        super.highlightItem();
        console.log("use", this.name);
    }
}
