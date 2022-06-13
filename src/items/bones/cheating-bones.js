import Bones from "./bones.js";

export default class CheatingBones extends Bones {
    // Text data
    name = "Cheating Bones";
    item = "Bones";
    type = "Cheating";
    examineText = "Bones are for burying!";

    // Other
    prayerXp = 10000;
    cost = 0;

    constructor(scene) {
        super();
        this.scene = scene;
    }
}