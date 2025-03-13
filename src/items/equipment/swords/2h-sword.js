import Sword from "./sword.js";
import { ATTACK_TYPES } from "../../../constants/constants.js";

export default class TwoHandedSword extends Sword {
    combatStyles = {
        Chop: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-chop",
            xpGain: ["hitpoints", "attack"],
        },
        Slash: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-slash",
            xpGain: ["hitpoints", "strength"],
        },
        Smash: {
            type: ATTACK_TYPES.CRUSH,
            icon: "sword-slash",
            xpGain: ["hitpoints", "strength"],
        },
        Block: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-block",
            xpGain: ["hitpoints", "defence"],
        },
    };
}
