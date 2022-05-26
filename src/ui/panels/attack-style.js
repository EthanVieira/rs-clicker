import { CONSTANTS, FONTS } from "../../constants/constants.js";

export class AttackStyle {
    dashboard;
    panel;
    button;
    styleButtons = [];
    retaliateButton;
    currentStyle = 1;

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

        // Style buttons
        this.styleButtons[0] = dashboard.add
            .image(567, 250, "attack-style-1-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setStyle(0);
            });
        this.styleButtons[1] = dashboard.add
            .image(646, 250, "attack-style-2-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setStyle(1);
            });
        this.styleButtons[2] = dashboard.add
            .image(567, 304, "attack-style-1-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setStyle(2);
            });
        this.retaliateButton = dashboard.add
            .image(567, 358, "attack-style-retaliate-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                if (this.retaliateButton.alpha == 1) this.retaliateButton.setAlpha(0.01);
                else this.retaliateButton.setAlpha(1);
            });

        // Default to hidden
        this.setVisible(false);
    }

    setStyle(newStyle) {
        this.styleButtons.forEach((b) => b.setAlpha(0.01));
        this.styleButtons[newStyle].setAlpha(1);
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.setStyle(0);
            this.dashboard.currentPanel = CONSTANTS.PANEL.ATTACK_STYLE;
        } else {
            this.button.setAlpha(0.01);
        }

        // Show/hide panel
        this.panel.visible = isVisible;
        this.retaliateButton.visible = isVisible;
        this.styleButtons.forEach((b) => (b.visible = isVisible));
    }
}
