import { CONSTANTS, FONTS } from "../../constants/constants.js";

export class AttackStyle {
    dashboard;
    panel;
    button;

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Panel
        this.panel = dashboard.add
            .image(547, 204, "attack-style-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        // Button
        this.button = dashboard.add
            .image(522, 168, "attack-style-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVisible();
            });

        // Default to hidden
        this.setVisible(false);
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.ATTACK_STYLE;
        } else {
            this.button.setAlpha(0.1);
        }

        // Show/hide panel
        this.panel.visible = isVisible;
    }
}
