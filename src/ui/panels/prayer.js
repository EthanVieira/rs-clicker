import { CONSTANTS, FONTS } from "../../constants/constants.js";

export class Prayer {
    dashboard;

    panel;
    button;
    curPrayerText;
    maxPrayerText;
    prayerHotbarText;

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Panel
        this.panel = dashboard.add
            .image(548, 205, "prayer-panel")
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
            .text(630, 441, "1", FONTS.PRAYER)
            .setOrigin(0.5)
            .setDepth(3);
        this.maxPrayerText = dashboard.add
            .text(646, 441, "1", FONTS.PRAYER)
            .setOrigin(0.5)
            .setDepth(3);

        // Hotbar skills text (the top part)
        this.prayerHotbarText = dashboard.add
            .text(532, 97, "1", FONTS.HOTBAR)
            .setOrigin(0.5)
            .setDepth(3);

        // Default to hidden
        this.setVisible(false);
    }

    setLevel(level) {
        this.prayerHotbarText.text = level;
        this.curPrayerText.text = level;
        this.maxPrayerText.text = level;
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.PRAYER;
        } else {
            this.button.setAlpha(0.1);
        }

        // Show/hide panel
        this.panel.visible = isVisible;
        this.curPrayerText.visible = isVisible;
        this.maxPrayerText.visible = isVisible;
    }
}
