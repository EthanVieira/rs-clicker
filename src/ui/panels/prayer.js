import { CONSTANTS, FONTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";
import { PRAYER_MANIFEST } from "../../constants/prayer-manifest.js";
import { dashToPascalCase } from "../../utilities.js";

export class Prayer {
    dashboard;

    panel;
    button;
    prayers = {};
    selectedPrayers = [];
    selectedRectangles = {};
    isVisible = false;
    secondsSinceLastDrain = 0;
    drainTaskID;

    maxPrayerPoints = 0;
    curPrayerText;
    prayerHotbarText;

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Panel
        this.panel = dashboard.add
            .image(550, 204, "prayer-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        // Button
        this.button = dashboard.add
            .image(692, 168, "prayer-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVisible();
            });

        // Current / Max points
        this.curPrayerText = dashboard.add
            .text(640, 451, "1", FONTS.PRAYER)
            .setOrigin(0.5)
            .setDepth(1);

        // Hotbar skills text (the top part)
        this.prayerHotbarText = dashboard.add
            .text(532, 97, "1", FONTS.HOTBAR)
            .setOrigin(0.5)
            .setDepth(1);

        // TODO: handle y dif when we have more prayers
        const xDif = 40;

        Object.values(PRAYER_MANIFEST.StandardPrayers).forEach((prayer, i) => {
            const hasLevel = Object.keys(prayer.requiredLevels).every((skill) => {
                return characterData.getLevel(skill) >= prayer.requiredLevels[skill];
            });

            this.prayers[prayer.imageName] = this.dashboard.add
                .image(560 + xDif * i, 213, prayer.imageName)
                .setOrigin(0)
                .setDepth(3)
                .setInteractive()
                .setVisible(hasLevel)
                .on("pointerdown", () => {
                    this.selectPrayer(prayer.imageName);
                });
        });

        // Default to hidden
        this.setVisible(false);

        this.drainTaskID = setInterval(() => {
            this.applyPrayerDrain();
            this.refreshPrayers();
        }, 1000);
    }

    stopPrayerDrain() {
        clearInterval(this.drainTaskID);
    }

    applyPrayerDrain() {
        const currentPrayPoints = characterData.getPrayerPoints();
        if (currentPrayPoints > 0) {
            let totalDrainEffect = 0;

            this.selectedPrayers.forEach((prayer) => {
                totalDrainEffect +=
                    PRAYER_MANIFEST.StandardPrayers[dashToPascalCase(prayer)].drainEffect;
            });

            if (totalDrainEffect > 0) {
                // TODO: get prayer bonus from equipped items whenever we have items with prayer bonus
                const prayBonus = 0;
                const basePrayResistance = 60;
                const drainResistance = basePrayResistance + 2 * prayBonus;
                const secondsPerDrain = 0.6 * (drainResistance / totalDrainEffect);

                if (this.secondsSinceLastDrain >= secondsPerDrain) {
                    characterData.setPrayerPoints(currentPrayPoints - 1);
                    this.updatePrayerText();
                    this.secondsSinceLastDrain = 0;

                    if (characterData.getPrayerPoints() <= 0) {
                        Object.values(this.selectedRectangles).forEach((rect) => {
                            rect.destroy();
                        });
                        this.selectedRectangles = {};
                        this.selectedPrayers = [];
                    }
                } else {
                    this.secondsSinceLastDrain++;
                }
            }
        }
    }

    selectPrayer(prayer) {
        if (characterData.getPrayerPoints() > 0) {
            if (!this.selectedPrayers.includes(prayer)) {
                const prayerButton = this.prayers[prayer];
                this.selectedPrayers.push(prayer);

                this.selectedRectangles[prayer] = this.dashboard.add
                    .rectangle(
                        prayerButton.x + 14,
                        prayerButton.y + 15,
                        38,
                        38,
                        0x000000,
                        0
                    )
                    .setStrokeStyle(1, 0xffffff)
                    .setDepth(1)
                    .setVisible(true);
            } else {
                this.unselectPrayer(prayer);
            }
        }
    }

    unselectPrayer(prayer) {
        this.selectedPrayers = this.selectedPrayers.filter((item) => item !== prayer);
        this.selectedRectangles[prayer].destroy();
        delete this.selectedRectangles[prayer];
    }

    refreshPrayers() {
        Object.values(PRAYER_MANIFEST.StandardPrayers).forEach((prayer) => {
            const name = prayer.imageName;
            const hasLevel = Object.keys(prayer.requiredLevels).every((skill) => {
                return characterData.getLevel(skill) >= prayer.requiredLevels[skill];
            });

            if (hasLevel) {
                this.prayers[name].setVisible(this.isVisible);
            }
        });
    }

    setLevel(level) {
        this.maxPrayerPoints = level;
        this.updatePrayerText();
    }

    updatePrayerText() {
        const currentPoints = characterData.getPrayerPoints();
        this.curPrayerText.text = currentPoints + "/" + this.maxPrayerPoints;
        this.prayerHotbarText.text = currentPoints;
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.PRAYER;
        } else {
            this.button.setAlpha(0.1);
        }

        Object.values(this.selectedRectangles).forEach((rect) => {
            rect.setVisible(isVisible);
        });

        // Show/hide panel
        this.panel.visible = isVisible;
        this.isVisible = isVisible;
        this.curPrayerText.visible = isVisible;
        this.refreshPrayers();
    }
}
