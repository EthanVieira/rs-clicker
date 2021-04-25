import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Bow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack animation
    animation = {
        imageName: "bronze-arrow",
        scale: 0.8,
        curve: 1,
        startX: 470,
        startY: 350,
        alpha: 1,
        flipX: false,
    };
}
