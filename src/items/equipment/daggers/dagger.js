import Smithable from "../smithable.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Dagger extends Smithable {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.STAB;

    // Attack animation
    animation = {
        imageName: "",
        scale: 0.5,
        curve: 0,
        startX: 200,
        startY: 430,
        alpha: 1,
        flipX: false,
    };

    equipSound = "sword-equip";
}
