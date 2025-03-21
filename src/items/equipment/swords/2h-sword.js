import Sword from "./sword.js";
import { ATTACK_TYPES } from "../../../constants/constants.js";

export default class TwoHandedSword extends Sword {
    combatStyles = {
        Chop: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-chop",
            xpGain: ["attack"],
        },
        Slash: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-slash",
            xpGain: ["strength"],
        },
        Smash: {
            type: ATTACK_TYPES.CRUSH,
            icon: "sword-slash",
            xpGain: ["strength"],
        },
        Block: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-block",
            xpGain: ["defence"],
        },
    };
}
