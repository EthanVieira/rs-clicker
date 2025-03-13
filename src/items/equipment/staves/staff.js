import Equipment from "../equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Staff extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Jab: {
            type: ATTACK_TYPES.STAB,
            icon: "staff-jab",
            xpGain: ["hitpoints", "attack"],
        },
        Pound: {
            type: ATTACK_TYPES.SLASH,
            icon: "staff-pound",
            xpGain: ["hitpoints", "strength"],
        },
        Block: {
            type: ATTACK_TYPES.CRUSH,
            icon: "staff-block",
            xpGain: ["hitpoints", "defence"],
        },
    };

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
