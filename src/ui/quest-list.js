import { CONSTANTS } from "../constants/constants.js";
import { getAutoclickerClass } from "../auto-clickers/auto-clicker.js";
import { characterData } from "../cookie-io.js";

export class QuestList {
    scene;
    scrollWindow;

    questText;

    constructor(scene, scrollWindow) {
        this.scene = scene;
        this.scrollWindow = scrollWindow;
        this.questText = this.scene.add.text(555, 256, "", { fill: "white" }).setDepth(3);

        this.refreshQuests();
    }

    async refreshQuests() {
        const startX = 555,
            startY = 256,
            yDiff = 18;
        this.questText.text = "";
        characterData.getUnlockedLevels().forEach((level) => {
            console.log("level: %s", level);
            let currentLevel = this.scene.scene.get(level);
            console.log("currentLevel: %s", currentLevel);
            currentLevel.targets.forEach((enemy) => {
                console.log("enemy: %s", enemy.name);
                this.questText.text +=
                    characterData.getEnemiesKilled(level, enemy.varName) +
                    "/" +
                    currentLevel.killQuest +
                    " " +
                    enemy.name +
                    "s\n";
            });
            console.log(this.questText.text);
        });
    }

    show(isVisible) {
        if (isVisible) {
            this.scrollWindow.refresh();
            this.scene.currentPanel = CONSTANTS.PANEL.QUESTS;
        }
        this.scrollWindow.setVisible(isVisible);
        this.questText.visible = isVisible;
    }
}
