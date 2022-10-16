import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Pickaxe extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.STAB;

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
