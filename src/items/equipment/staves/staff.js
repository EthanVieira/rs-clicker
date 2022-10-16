import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Staff extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MAGIC;

    // Attack animation
    animation = {
        imageName: "fire-bolt",
        scale: 0.3,
        curve: 0.5,
        startX: 470,
        startY: 350,
        alpha: 0.5,
    };

    equipSound = "staff-spear-equip";
}
