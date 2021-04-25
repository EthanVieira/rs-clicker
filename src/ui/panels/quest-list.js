import { CONSTANTS } from "../../constants/constants.js";
import { ScrollWindow } from "../scroll-window.js";
import { characterData } from "../../cookie-io.js";
import { prettyPrintCamelCase } from "../../utilities.js";

export class QuestList {
    dashboard;

    panel;
    button;
    scrollWindow;

    isTextVisible;

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Panel
        this.panel = dashboard.add
            .image(548, 208, "quests-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        // Button
        this.button = dashboard.add
            .image(592, 168, "quests-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.show();
            });

        // Quest list scroll window
        this.scrollWindow = new ScrollWindow({
            name: "quests",
            x: 526,
            y: 251,
            textStartOffsetY: 5,
            width: 190,
            height: 214,
            numColumns: 1,
            padding: 3,
        });
        this.dashboard.scene.add(this.scrollWindow.name, this.scrollWindow, true);
        this.scrollWindow.refresh();

        this.refreshQuests();

        // Default to hidden
        this.show(false);

        // Destructor
        dashboard.events.once("shutdown", () => this.destroy());
    }

    async refreshQuests() {
        this.scrollWindow.clearObjects();
        characterData.getUnlockedLevels().forEach((level) => {
            let scene = this.dashboard.scene.get(level);
            let enemies = characterData.getEnemiesInLevel(level);
            for (var enemy in enemies) {
                let enemiesKilled = characterData.getEnemiesKilled(level, enemy);

                for (
                    var tier = 1;
                    tier <=
                    characterData.calcQuestTier(enemiesKilled, scene.questAmounts[enemy]);
                    tier++
                ) {
                    let questAmount = scene.questAmounts[enemy][tier - 1];
                    let printedAmount =
                        enemiesKilled > questAmount ? questAmount : enemiesKilled;
                    // TODO: make the quests text align so it looks better
                    let questText = this.scrollWindow.add
                        .text(
                            0,
                            0,
                            printedAmount +
                                "/" +
                                questAmount +
                                " " +
                                prettyPrintCamelCase(enemy) +
                                "s",
                            {
                                fill: enemiesKilled >= questAmount ? "#00ff00" : "yellow",
                                fontSize: 12,
                            }
                        )
                        .setDepth(3);
                    this.scrollWindow.addObject(questText);
                }
            }
        });
        this.scrollWindow.refresh();
        this.scrollWindow.setVisible(this.isTextVisible);
    }

    show(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.scrollWindow.refresh();
            this.dashboard.currentPanel = CONSTANTS.PANEL.QUESTS;
            this.button.setAlpha(1);
        } else {
            this.button.setAlpha(0.1);
        }

        this.panel.visible = isVisible;
        this.scrollWindow.setVisible(isVisible);

        this.isTextVisible = isVisible;
    }

    destroy() {
        this.dashboard.scene.remove(this.scrollWindow.name);
    }
}
