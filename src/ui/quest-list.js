import { CONSTANTS } from "../constants/constants.js";
import { ScrollWindow } from "./scroll-window.js";
import { characterData } from "../cookie-io.js";
import { prettyPrintCamelCase } from "../utilities.js";

export class QuestList {
    dashboard;
    scrollWindow;

    textGroup;

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

        this.textGroup = [];

        this.refreshQuests();
    }

    async refreshQuests() {
        let numRows = 0;
        this.clearText();
        characterData.getUnlockedLevels().forEach((level) => {
            let scene = this.dashboard.scene.get(level);
            let enemies = characterData.getEnemiesInLevel(level);
            for (var enemy in enemies) {
                let enemiesKilled = characterData.getEnemiesKilled(level, enemy);
                for (
                    var tier = 1;
                    tier <= characterData.getQuestTier(scene.currentLevel, enemy);
                    tier++
                ) {
                    let questAmount = scene.questAmounts[enemy][tier - 1];
                    let printedAmount =
                        enemiesKilled > questAmount ? questAmount : enemiesKilled;
                    // TODO: make the quests text align so it looks better
                    this.textGroup.push(
                        this.dashboard.add
                            .text(
                                555,
                                256 + 15 * numRows,
                                printedAmount +
                                    "/" +
                                    questAmount +
                                    " " +
                                    prettyPrintCamelCase(enemy) +
                                    "s",
                                {
                                    fill:
                                        enemiesKilled >= questAmount
                                            ? "#00ff00"
                                            : "yellow",
                                    fontSize: 12,
                                }
                            )
                            .setDepth(3)
                    );
                    numRows++;
                    //Array(4 - printedAmount.toString().length).join(" ") +
                }
            }
        });
    }

    show(isVisible) {
        if (isVisible) {
            this.scrollWindow.refresh();
            this.dashboard.currentPanel = CONSTANTS.PANEL.QUESTS;
        }
        this.scrollWindow.setVisible(isVisible);
        this.textGroup.forEach((text) => {
            text.visible = isVisible;
        });
    }

    clearText() {
        this.textGroup.forEach((text) => {
            text.destroy();
        });
        this.textGroup = [];
    }
}
