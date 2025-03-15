import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Salamander extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    combatStyles = {
        Scorch: {
            type: ATTACK_TYPES.SLASH,
            icon: "salamander-scorch",
            xpGain: ["hitpoints", "strength"],
        },
        Flare: {
            type: ATTACK_TYPES.STANDARD,
            icon: "salamander-flare",
            xpGain: ["hitpoints", "ranged"],
        },
        Blaze: {
            type: ATTACK_TYPES.MAGIC,
            icon: "salamander-blaze",
            xpGain: ["hitpoints", "magic"],
        },
    };
}
