import Sword from "./sword.js";
import { ATTACK_TYPES } from "../../../constants/constants.js";

export default class SlashSword extends Sword {
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
        Lunge: {
            type: ATTACK_TYPES.STAB,
            icon: "sword-chop",
            xpGain: ["hitpoints", "attack", "strength", "defence"],
        },
        Block: {
            type: ATTACK_TYPES.SLASH,
            icon: "sword-block",
            xpGain: ["hitpoints", "defence"],
        },
    };
}
