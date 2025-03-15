import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Claw extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Chop: {
            type: ATTACK_TYPES.SLASH,
            icon: "claw-chop",
            xpGain: ["attack"],
        },
        Slash: {
            type: ATTACK_TYPES.SLASH,
            icon: "claw-slash",
            xpGain: ["strength"],
        },
        Lunge: {
            type: ATTACK_TYPES.STAB,
            icon: "claw-lunge",
            xpGain: ["attack", "strength", "defence"],
        },
        Block: {
            type: ATTACK_TYPES.SLASH,
            icon: "claw-block",
            xpGain: ["defence"],
        },
    };
}
