import Sword from "./sword.js";
import { ATTACK_TYPES } from "../../../constants/constants.js";

export default class StabSword extends Sword {
    combatStyles = {
        Stab: {
            type: ATTACK_TYPES.STAB,
            icon: "sword-stab",
            xpGain: ["hitpoints", "attack"],
        },
        Lunge: {
            type: ATTACK_TYPES.STAB,
            icon: "sword-chop",
            xpGain: ["hitpoints", "strength"],
        },
        Slash: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-slash",
            xpGain: ["hitpoints", "strength"],
        },
        Block: {
            type: ATTACK_TYPES.STAB,
            icon: "sword-block",
            xpGain: ["hitpoints", "defence"],
        },
    };
}
