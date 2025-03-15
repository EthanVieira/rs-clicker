import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Scythe extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Reap: {
            type: ATTACK_TYPES.SLASH,
            icon: "scythe-reap",
            xpGain: ["hitpoints", "attack"],
        },
        Chop: {
            type: ATTACK_TYPES.SLASH,
            icon: "scythe-chop",
            xpGain: ["hitpoints", "strength"],
        },
        Jab: {
            type: ATTACK_TYPES.CRUSH,
            icon: "scythe-jab",
            xpGain: ["hitpoints", "strength"],
        },
        Block: {
            type: ATTACK_TYPES.SLASH,
            icon: "scythe-block",
            xpGain: ["hitpoints", "defence"],
        },
    };
}
