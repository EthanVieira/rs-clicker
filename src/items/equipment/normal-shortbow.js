import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class NormalShortbow extends Equipment {
	// Attack types
	slot = EQUIPMENT.SLOTS.WEAPON;
	skill = EQUIPMENT.WEAPON_TYPES.RANGED;

	// Bonuses
	rangedBonus = 8;

	// Text data
	name = "Shortbow";
	item = "Shortbow";
	type = "Normal";
	examineText = "Short but effective.";

	// Other
	cost = 50;
	requiredLevel = 1;

	constructor(scene) {
		super();

		this.scene = scene;
	}
}