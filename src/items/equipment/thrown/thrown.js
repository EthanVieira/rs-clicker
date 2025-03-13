import Equipment from "../equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Thrown extends Equipment {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;

    combatStyles = {
        Accurate: {
            type: ATTACK_TYPES.LIGHT,
            icon: "thrown-accurate",
            xpGain: ["hitpoints", "ranged"],
        },
        Rapid: {
            type: ATTACK_TYPES.LIGHT,
            icon: "thrown-rapid",
            xpGain: ["hitpoints", "ranged"],
        },
        Longrange: {
            type: ATTACK_TYPES.LIGHT,
            icon: "thrown-longrange",
            xpGain: ["hitpoints", "ranged", "defence"],
        },
    };
}
