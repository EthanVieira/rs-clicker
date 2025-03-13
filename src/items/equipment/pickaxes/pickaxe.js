import Equipment from "../equipment.js";
import { ATTACK_TYPES, EQUIPMENT } from "../../../constants/constants.js";

export default class Pickaxe extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;

    combatStyles = {
        Spike: {
            type: ATTACK_TYPES.STAB,
            icon: "pickaxe-spike",
            xpGain: ["hitpoints", "attack"],
        },
        Impale: {
            type: ATTACK_TYPES.STAB,
            icon: "pickaxe-impale",
            xpGain: ["hitpoints", "strength"],
        },
        Smash: {
            type: ATTACK_TYPES.CRUSH,
            icon: "pickaxe-smash",
            xpGain: ["hitpoints", "strength"],
        },
        Block: {
            type: ATTACK_TYPES.STAB,
            icon: "pickaxe-block",
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
