import Equipment from "../equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Bow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    combatStyles = {
        Accurate: {
            type: ATTACK_TYPES.STANDARD,
            icon: "bow-accurate",
            xpGain: ["hitpoints", "ranged"],
        },
        Rapid: {
            type: ATTACK_TYPES.STANDARD,
            icon: "bow-rapid",
            xpGain: ["hitpoints", "ranged"],
        },
        Longrange: {
            type: ATTACK_TYPES.STANDARD,
            icon: "bow-longrange",
            xpGain: ["hitpoints", "ranged", "defence"],
        },
    };

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

    equipSound = "bow-arrow-equip";
}
