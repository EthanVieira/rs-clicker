import Equipment from "../equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Crossbow extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    combatStyles = {
        Accurate: {
            type: ATTACK_TYPES.HEAVY,
            icon: "crossbow-accurate",
            xpGain: ["hitpoints", "ranged"],
        },
        Rapid: {
            type: ATTACK_TYPES.HEAVY,
            icon: "crossbow-rapid",
            xpGain: ["hitpoints", "ranged"],
        },
        Longrange: {
            type: ATTACK_TYPES.HEAVY,
            icon: "crossbow-longrange",
            xpGain: ["hitpoints", "ranged", "defence"],
        },
    };

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

    equipSound = "bow-arrow-equip";
}
