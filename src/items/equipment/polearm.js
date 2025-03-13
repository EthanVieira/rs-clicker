import Equipment from "./equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Polearm extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Jab: {
            type: ATTACK_TYPES.STAB,
            icon: "polearm-jab",
            xpGain: ["hitpoints", "attack"],
        },
        Swipe: {
            type: ATTACK_TYPES.SLASH,
            icon: "polearm-swipe",
            xpGain: ["hitpoints", "strength"],
        },
        Block: {
            type: ATTACK_TYPES.STAB,
            icon: "polearm-block",
            xpGain: ["hitpoints", "defence"],
        },
    };
}
