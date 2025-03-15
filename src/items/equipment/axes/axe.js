import Smithable from "../smithable.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Axe extends Smithable {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Chop: {
            type: ATTACK_TYPES.SLASH,
            icon: "axe-chop",
            xpGain: ["hitpoints", "attack"],
        },
        Hack: {
            type: ATTACK_TYPES.SLASH,
            icon: "axe-hack",
            xpGain: ["hitpoints", "strength"],
        },
        Smash: {
            type: ATTACK_TYPES.CRUSH,
            icon: "axe-smash",
            xpGain: ["hitpoints", "strength"],
        },
        Block: {
            type: ATTACK_TYPES.SLASH,
            icon: "axe-block",
            xpGain: ["hitpoints", "defence"],
        },
    };

    // Attack animation
    animation = {
        imageName: "",
        scale: 0.5,
        curve: 1,
        startX: 450,
        startY: 200,
        alpha: 1,
        flipX: true,
    };

    equipSound = "axe-equip";
}
