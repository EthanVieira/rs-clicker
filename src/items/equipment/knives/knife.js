import Equipment from "../../equipment.js";
import { EQUIPMENT } from "../../../constants/constants.js";

export default class Knife extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.RANGED;
}
