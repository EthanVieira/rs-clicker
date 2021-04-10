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
        let curWeapon = this.scene.dashboard.equipment.equipment.WEAPON;
        return curWeapon.item == "Pickaxe";
    }
}
