import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Whip extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Flick: {
            type: ATTACK_TYPES.SLASH,
            icon: "whip-flick",
            xpGain: ["attack"],
        },
        Lash: {
            type: ATTACK_TYPES.SLASH,
            icon: "whip-lash",
            xpGain: ["strength"],
        },
        Deflect: {
            type: ATTACK_TYPES.SLASH,
            icon: "whip-flick",
            xpGain: ["attack", "strength", "defence"],
        },
    };
}
