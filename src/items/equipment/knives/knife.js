import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Knife extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack animation
    animation = {
        imageName: "",
        scale: 0.6,
        curve: 0.1,
        startX: 350,
        startY: 400,
        alpha: 1,
        flipX: true,
    };

    equipSound = "bow-arrow-equip";
}
