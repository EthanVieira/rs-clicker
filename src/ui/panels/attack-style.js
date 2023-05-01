import { CONSTANTS, ATTACK_STYLES } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";

export class AttackStyle {
    dashboard;
    panel;
    button;
    styleButtons = [];
    retaliateButton;

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
        this.styleButtons[ATTACK_STYLES.ACCURATE] = dashboard.add
            .image(567, 250, "attack-style-1-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setStyle(ATTACK_STYLES.ACCURATE);
            });
        this.styleButtons[ATTACK_STYLES.AGGRESSIVE] = dashboard.add
            .image(646, 250, "attack-style-2-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setStyle(ATTACK_STYLES.AGGRESSIVE);
            });
        this.styleButtons[ATTACK_STYLES.DEFENSIVE] = dashboard.add
            .image(567, 304, "attack-style-3-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setStyle(ATTACK_STYLES.DEFENSIVE);
            });
        this.retaliateButton = dashboard.add
            .image(567, 358, "attack-style-retaliate-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setAutoRetaliate(!characterData.getAutoRetaliate());
            });

        // Default to hidden
        this.setVisible(false);
        this.setStyle(characterData.getAttackStyle());
        this.setAutoRetaliate(characterData.getAutoRetaliate());
    }

    setStyle(newStyle) {
        this.styleButtons.forEach((b) => b.setAlpha(0.01));
        this.styleButtons[newStyle].setAlpha(1);
        characterData.setAttackStyle(newStyle);
    }

    setAutoRetaliate(willRetaliate) {
        if (willRetaliate) this.retaliateButton.setAlpha(1);
        else this.retaliateButton.setAlpha(0.01);
        characterData.setAutoRetaliate(willRetaliate);
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
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
