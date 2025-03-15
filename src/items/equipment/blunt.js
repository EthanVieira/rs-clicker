import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Blunt extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Pound: {
            type: ATTACK_TYPES.CRUSH,
            icon: "blunt-pound",
            xpGain: ["attack"],
        },
        Pummel: {
            type: ATTACK_TYPES.CRUSH,
            icon: "blunt-pummel",
            xpGain: ["strength"],
        },
        Block: {
            type: ATTACK_TYPES.CRUSH,
            icon: "blunt-block",
            xpGain: ["defence"],
        },
    };
}
