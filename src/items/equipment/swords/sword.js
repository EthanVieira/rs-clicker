import Smithable from "../smithable.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Sword extends Smithable {
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    
    // Attack animation
    animation = {
        imageName: "",
        scale: 0.5,
        curve: 0,
        startX: 200,
        startY: 430,
        alpha: 1,
        flipX: true,
    };

    equipSound = "sword-equip";
}
