import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Staff extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE; // melee when not using a spell

    // Attack animation
    animation = {
        imageName: "",
        scale: 1,
        curve: 0.5,
        startX: 470,
        startY: 350,
        alpha: 1,
    };

    requiredLevels = {
        magic: 1,
        attack: 1,
    };

    equipSound = "staff-spear-equip";
}
