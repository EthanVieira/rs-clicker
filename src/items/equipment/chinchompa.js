import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Chinchompa extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    combatStyles = {
        ShortFuse: {
            type: ATTACK_TYPES.HEAVY,
            icon: "chinchompa-short-fuse",
            xpGain: ["hitpoints", "ranged"],
        },
        MediumFuse: {
            type: ATTACK_TYPES.HEAVY,
            icon: "chinchompa-medium-fuse",
            xpGain: ["hitpoints", "ranged"],
        },
        LongFuse: {
            type: ATTACK_TYPES.HEAVY,
            icon: "chinchompa-long-fuse",
            xpGain: ["hitpoints", "ranged", "defence"],
        },
    };
}
