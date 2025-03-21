import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Spear extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Lunge: {
            type: ATTACK_TYPES.STAB,
            icon: "spear-lunge",
            xpGain: ["attack", "strength", "defence"],
        },
        Swipe: {
            type: ATTACK_TYPES.SLASH,
            icon: "spear-swipe",
            xpGain: ["attack", "strength", "defence"],
        },
        Pound: {
            type: ATTACK_TYPES.CRUSH,
            icon: "spear-pound",
            xpGain: ["attack", "strength", "defence"],
        },
        Block: {
            type: ATTACK_TYPES.STAB,
            icon: "spear-block",
            xpGain: ["defence"],
        },
    };
}
