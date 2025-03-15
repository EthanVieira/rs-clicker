import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Spiked extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Pound: {
            type: ATTACK_TYPES.CRUSH,
            icon: "spiked-pound",
            xpGain: ["hitpoints", "attack"],
        },
        Pummel: {
            type: ATTACK_TYPES.CRUSH,
            icon: "spiked-pummel",
            xpGain: ["hitpoints", "strength"],
        },
        Spike: {
            type: ATTACK_TYPES.STAB,
            icon: "spiked-spike",
            xpGain: ["hitpoints", "attack", "strength", "defence"],
        },
        Block: {
            type: ATTACK_TYPES.CRUSH,
            icon: "spiked-block",
            xpGain: ["hitpoints", "defence"],
        },
    };
}
