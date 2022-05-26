import Smithable from "../smithable.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Axe extends Smithable {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.SLASH;

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
}
