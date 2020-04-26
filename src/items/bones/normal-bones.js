import Bones from "../bones.js";

export default class NormalBones extends Bones {
	// Text data
	name = "Bones";
	item = "Bones";
	type = "Normal";
	examineText = "Bones are for burying!";

	// Other
	prayerXp = 5;
	cost = 5;

	constructor(scene) {
		super();
        this.scene = scene;
	}
}