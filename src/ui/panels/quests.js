import { CONSTANTS } from "../../constants/constants.js";
import { ScrollWindow } from "../scroll-window.js";
import { characterData } from "../../cookie-io.js";
import { prettyPrintCamelCase, getItemText } from "../../utilities.js";
import { TextRow } from "../text-row.js";

export class Quests {
    dashboard;

    panel;
    button;
    questsTabButton;
    statsTabButton;
    questsScrollWindow;
    statsScrollWindow;
    questPointsText;

    currentTab;

    isStatTextVisible = false;
    isQuestTextVisible = false;

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Panel
        this.panel = dashboard.add
            .image(548, 208, "quests-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        // Buttons
        this.button = dashboard.add
            .image(592, 168, "quests-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVisible();
            });

        this.questsTabButton = dashboard.add
            .image(549, 210, "quests-tab-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setAlpha(0.01)
            .setInteractive()
            .on("pointerdown", () => {
                if (this.panel.visible) {
                    this.openTab(CONSTANTS.QUEST_TABS.QUESTS);
                }
            });

        this.statsTabButton = dashboard.add
            .image(596, 210, "stats-tab-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setAlpha(0.01)
            .setInteractive()
            .on("pointerdown", () => {
                if (this.panel.visible) {
                    this.openTab(CONSTANTS.QUEST_TABS.STATS);
                }
            });

        this.questPointsText = dashboard.add
            .text(645, 233, String(characterData.getQuestPoints()), {
                font: "16px runescape",
                fill: "white",
            })
            .setDepth(3);

        // Quest list scroll window
        this.questsScrollWindow = new ScrollWindow({
            name: "quests",
            x: 526,
            y: 251,
            textStartOffsetY: 5,
            width: 190,
            height: 214,
            numColumns: 1,
            padding: 3,
        });
        this.dashboard.scene.add(
            this.questsScrollWindow.name,
            this.questsScrollWindow,
            true
        );
        this.refreshQuests();

        this.statsScrollWindow = new ScrollWindow({
            name: "stats",
            x: 526,
            y: 251,
            textStartOffsetY: 5,
            width: 190,
            height: 214,
            numColumns: 1,
            padding: 3,
        });

        this.dashboard.scene.add(
            this.statsScrollWindow.name,
            this.statsScrollWindow,
            true
        );
        this.refreshStats();

        this.currentTab = CONSTANTS.QUEST_TABS.QUESTS;
        this.openTab(CONSTANTS.QUEST_TABS.QUESTS);

        // Default to hidden
        this.setVisible(false);

        // Destructor
        dashboard.events.once("shutdown", () => this.destroy());
    }

    // TODO: handle other tabs?
    openTab(tab) {
        this.closeCurrentTab();
        switch (tab) {
            case CONSTANTS.QUEST_TABS.QUESTS:
                this.questsTabButton.setAlpha(1);
                this.isQuestTextVisible = true;
                this.refreshQuests();
                break;

            case CONSTANTS.QUEST_TABS.STATS:
                this.statsTabButton.setAlpha(1);
                this.isStatTextVisible = true;
                this.refreshStats();
                break;

            default:
                console.log("Error: invalid quest tab.");
        }

        this.currentTab = tab;
    }

    // TODO: handle other tabs?
    closeCurrentTab() {
        switch (this.currentTab) {
            case CONSTANTS.QUEST_TABS.QUESTS:
                this.questsTabButton.setAlpha(0.01);
                this.questsScrollWindow.setVisible(false);
                this.isQuestTextVisible = false;
                break;

            case CONSTANTS.QUEST_TABS.STATS:
                this.statsTabButton.setAlpha(0.01);
                this.statsScrollWindow.setVisible(false);
                this.isStatTextVisible = false;
                break;

            default:
                console.log("Error: attempting to close invalid quest tab.");
        }
    }

    refreshStats() {
        this.statsScrollWindow.clearObjects();
        let statTexts = this.dashboard.scene.get(CONSTANTS.SCENES.STATS).getStats();

        for (const statkey in statTexts) {
            let row = new TextRow(this.statsScrollWindow, 0, 0, []);

            let statText = this.statsScrollWindow.add
                .text(0, 0, statTexts[statkey]["text"], {
                    font: "16px runescape",
                    fill: "white",
                })
                .setDepth(3);
            row.add(statText);

            let statTxtAmount = this.statsScrollWindow.add
                .text(100, 0, getItemText(statTexts[statkey]["amount"])[0], {
                    font: "16px runescape",
                    fill: "orange",
                })
                .setDepth(3);
            row.add(statTxtAmount);

            this.statsScrollWindow.addObject(row);
        }
        this.statsScrollWindow.refresh(true);
        this.statsScrollWindow.setVisible(this.isStatTextVisible);
    }

    async refreshQuests() {
        this.questsScrollWindow.clearObjects();
        characterData.getUnlockedLevels().forEach((level) => {
            let scene = this.dashboard.scene.get(level);
            let enemies = characterData.getEnemiesInLevel(level);
            for (var enemy in enemies) {
                const enemiesKilled = characterData.getEnemiesKilled(level, enemy);

                const questTier = characterData.calcQuestTier(
                    enemiesKilled,
                    scene.questAmounts[enemy]
                );

                for (let tier = 1; tier <= questTier; tier++) {
                    let row = new TextRow(this.questsScrollWindow, 0, 0, []);
                    const questAmount = scene.questAmounts[enemy][tier - 1];

                    const isQuestComplete = enemiesKilled >= questAmount;

                    const printedAmount = isQuestComplete ? questAmount : enemiesKilled;
                    let questText = this.questsScrollWindow.add
                        .text(0, 0, prettyPrintCamelCase(enemy) + "s: ", {
                            fill: isQuestComplete ? "#00ff00" : "yellow",
                            font: "16px runescape",
                        })
                        .setDepth(3);
                    row.add(questText);

                    let questTxtAmount = this.questsScrollWindow.add
                        .text(90, 0, printedAmount + "/" + questAmount, {
                            fill: isQuestComplete ? "#00ff00" : "yellow",
                            font: "16px runescape",
                        })
                        .setDepth(3);
                    row.add(questTxtAmount);

                    this.questsScrollWindow.addObject(row);
                }
            }
        });
        this.questPointsText.text = characterData.getQuestPoints();
        this.questsScrollWindow.refresh(true);
        this.questsScrollWindow.setVisible(this.isQuestTextVisible);
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.dashboard.currentPanel = CONSTANTS.PANEL.QUESTS;
            this.button.setAlpha(1);
            this.openTab(this.currentTab);
        } else {
            this.button.setAlpha(0.1);
            this.isStatTextVisible = false;
            this.isQuestTextVisible = false;
            this.closeCurrentTab();
        }

        this.questPointsText.visible = isVisible;

        this.panel.visible = isVisible;
    }

    destroy() {
        this.dashboard.scene.remove(this.questsScrollWindow.name);
        this.dashboard.scene.remove(this.statsScrollWindow.name);
    }
}
