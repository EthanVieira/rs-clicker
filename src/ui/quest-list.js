import { CONSTANTS } from "../constants/constants.js";
import { getAutoclickerClass } from "../auto-clickers/auto-clicker.js";
import { characterData } from "../cookie-io.js";

export class QuestList {
    scene;
    scrollWindow;

    quests = [];

    constructor(scene, scrollWindow) {
        this.scene = scene;
        this.scrollWindow = scrollWindow;

        this.refreshQuests;
    }

    async refreshQuests() {
        const startX = 555,
            startY = 256,
            yDiff = 18;
    }
    // loop through unlocked scenes
    // loop through mobs in unlocked scenes
    // create quest text

    //let questText = this.scrollWindow.add.text(startX, startY, characterData.getQ)
}
