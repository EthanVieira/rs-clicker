import { Resource } from "../resource.js";

export class Rock extends Resource {
    actions = [
        { text: "Mine", func: "clickTarget" },
        { text: "Examine", func: "examine" },
    ];

    constructor(data) {
        data.skill = "mining";
        super(data);
    }

    isClickable() {
        let curWeapon = this.scene.dashboard.equipment.obj.equipment.WEAPON;
        if (curWeapon.item == "Pickaxe") {
            return true;
        } else {
            return false;
        }
    }
}
