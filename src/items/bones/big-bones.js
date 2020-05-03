import Bones from "../bones.js";

export default class BigBones extends Bones {
    // Text data
    name = "Big Bones";
    item = "Bones";
    type = "Big";
    examineText = "Bones are for burying!";

    // Other
    prayerXp = 15;
    cost = 50;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}
