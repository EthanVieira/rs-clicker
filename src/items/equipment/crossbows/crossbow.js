import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Crossbow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    // Attack animation
    animation = {
        imageName: "bronze-bolt",
        scale: 0.8,
        curve: 0,
        startX: 350,
        startY: 400,
        alpha: 1,
        flipX: true,
    };
}
