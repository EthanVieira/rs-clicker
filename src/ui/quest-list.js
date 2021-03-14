import { CONSTANTS } from "../constants/constants.js";
import { ScrollWindow } from "./scroll-window.js";
import { characterData } from "../cookie-io.js";
import { prettyPrintCamelCase } from "../utilities.js";

export class QuestList {
    dashboard;
    scrollWindow;

    questText;

    constructor(dashboard) {
        this.dashboard = dashboard;

        this.scrollWindow = new ScrollWindow({
            name: "quests",
            x: 542,
            y: 251,
            width: 175,
            height: 214,
            numColumns: 1,
            padding: 10,
        });
        this.dashboard.scene.add(this.scrollWindow.name, this.scrollWindow, true);
        this.scrollWindow.refresh();

        this.questText = this.dashboard.add
            .text(555, 256, "", { fill: "white" })
            .setDepth(3);

        this.refreshQuests();
    }

    async refreshQuests() {
        this.questText.text = "";
        characterData.getUnlockedLevels().forEach((level) => {
            let currentLevel = this.dashboard.scene.get(level);
            let enemies = characterData.getEnemiesInLevel(level);
            for (var enemy in enemies) {
                this.questText.text +=
                    characterData.getEnemiesKilled(level, enemy) +
                    "/" +
                    currentLevel.killQuest +
                    " " +
                    prettyPrintCamelCase(enemy) +
                    "s\n";
            }
        });
    }

    show(isVisible) {
        if (isVisible) {
            this.scrollWindow.refresh();
            this.dashboard.currentPanel = CONSTANTS.PANEL.QUESTS;
        }
        this.scrollWindow.setVisible(isVisible);
        this.questText.visible = isVisible;
    }
}
