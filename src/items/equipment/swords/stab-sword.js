import Sword from "./sword.js";
import { ATTACK_TYPES } from "../../../constants/constants.js";

export default class StabSword extends Sword {
    combatStyles = {
        Stab: {
            type: ATTACK_TYPES.STAB,
            icon: "sword-stab",
            xpGain: ["attack"],
        },
        Lunge: {
            type: ATTACK_TYPES.STAB,
            icon: "sword-chop",
            xpGain: ["strength"],
        },
        Slash: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-slash",
            xpGain: ["strength"],
        },
        Block: {
            type: ATTACK_TYPES.STAB,
            icon: "sword-block",
            xpGain: ["defence"],
        },
    };
}
