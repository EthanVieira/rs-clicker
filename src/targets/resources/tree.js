import { Resource } from "../resource.js";

export class Tree extends Resource {
    actions = [
        { text: "Chop", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(data) {
        data.skill = "woodcutting";
        super(data);
    }

    isClickable() {
        let curWeapon = this.scene.dashboard.equipment.equipment.WEAPON;
        return curWeapon.item == "Axe";
    }
}
