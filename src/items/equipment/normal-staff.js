import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class NormalStaff extends Equipment {
	// Attack types
	slot = EQUIPMENT.SLOTS.WEAPON;
	skill = EQUIPMENT.WEAPON_TYPES.MAGIC;

	// Bonuses
	slashBonus = -1;
	crushBonus = 7;
	magicBonus = 4;
	stabDefenseBonus = 2;
	slashDefenseBonus = 3;
	crushDefenseBonus = 1;
	magicDefenseBonus = 4;
	strengthBonus = 3;

	// Text data
	name = "Staff";
	item = "Staff";
	type = "Normal";
	examineText = "It's a slightly magical stick.";

	// Other
	cost = 15;
	requiredLevel = 1;

	constructor(scene) {
		super();

		this.scene = scene;
	}
}