import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class Axe extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.SLASH;
}
