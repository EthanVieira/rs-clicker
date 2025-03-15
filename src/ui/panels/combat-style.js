import { ATTACK_TYPES, CONSTANTS, FONTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";

export class CombatStyle {
    dashboard;
    panel;
    button;
    styleOffButtons = [];
    styleOnButtons = [];
    styleIcons = [];
    styleText = [];
    retaliateButton;
    isVisible = false;

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Panel
        this.panel = dashboard.add
            .image(547, 204, "combat-style-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        // Button
        this.button = dashboard.add
            .image(522, 168, "combat-style-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVisible();
                this.refreshStyles();
            });

        this.retaliateButton = dashboard.add
            .image(567, 358, "combat-style-retaliate-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setAutoRetaliate(!characterData.getAutoRetaliate());
            });

        this.refreshStyles();

        // Default to hidden
        this.setVisible(false);
        this.setAutoRetaliate(characterData.getAutoRetaliate());
    }

    refreshStyles() {
        const weapon = this.dashboard.equipment.equipment.WEAPON;

        // default to unarmed
        let combatStyles = {
            Punch: {
                type: ATTACK_TYPES.CRUSH,
                icon: "unarmed-punch",
                xpGain: ["hitpoints", "attack"],
            },
            Kick: {
                type: ATTACK_TYPES.CRUSH,
                icon: "unarmed-kick",
                xpGain: ["hitpoints", "strength"],
            },
            Block: {
                type: ATTACK_TYPES.CRUSH,
                icon: "unarmed-block",
                xpGain: ["hitpoints", "defence"],
            },
        };

        if (weapon) {
            combatStyles = weapon.combatStyles;
        }

        this.styleOffButtons.forEach((b) => b.destroy());
        this.styleOnButtons.forEach((b) => b.destroy());
        this.styleIcons.forEach((i) => i.destroy());
        this.styleText.forEach((t) => t.destroy());

        this.styleOffButtons = [];
        this.styleOnButtons = [];
        this.styleIcons = [];
        this.styleText = [];

        const xstart = 567;
        const ystart = 250;
        const xdif = 79;
        const ydif = 54;
        const xIconOffset = 22;
        const yIconOffset = 5;
        const yTextOffset = 30;

        // Style buttons
        Object.keys(combatStyles).forEach((style, index) => {
            const x = xstart + (index % 2 == 0 ? 0 : xdif);
            const y = ystart + (index <= 1 ? 0 : ydif);

            this.styleOffButtons[index] = this.dashboard.add
                .image(x, y, "combat-style-button-off")
                .setOrigin(0, 0)
                .setDepth(2)
                .setInteractive()
                .on("pointerdown", () => {
                    this.setStyle(index, combatStyles[style]);
                });
            this.styleOnButtons[index] = this.dashboard.add
                .image(x, y, "combat-style-button-on")
                .setOrigin(0, 0)
                .setDepth(2)
                .setInteractive()
                .on("pointerdown", () => {
                    this.setStyle(index, combatStyles[style]);
                });
            this.styleIcons[index] = this.dashboard.add
                .image(x + xIconOffset, y + yIconOffset, combatStyles[style]["icon"])
                .setOrigin(0, 0)
                .setDepth(2)
                .setInteractive()
                .on("pointerdown", () => {
                    this.setStyle(index, combatStyles[style]);
                });
            this.styleText[index] = this.dashboard.add
                .text(
                    x + xIconOffset + (style.length > 6 ? (style.length - 6) * -5 : 0),
                    y + yTextOffset,
                    style,
                    FONTS.ITEM_NAME
                )
                .setOrigin(0, 0)
                .setDepth(2);
        });

        let style = characterData.getCombatStyle();
        let index = this.styleIcons.indexOf(style["icon"]);
        if (!style || index == -1) {
            //default to first valid option
            index = 0;
            style = combatStyles[Object.keys(combatStyles)[0]];
        }

        this.setStyle(index, style);
    }

    setStyle(styleIndex, newStyle) {
        this.styleOnButtons.forEach((b) => (b.visible = false));
        this.styleOffButtons.forEach((b) => (b.visible = this.isVisible));
        this.styleIcons.forEach((i) => (i.visible = this.isVisible));
        this.styleText.forEach((t) => (t.visible = this.isVisible));
        if (styleIndex > -1) {
            this.styleOnButtons[styleIndex].visible = this.isVisible;
            this.styleOffButtons[styleIndex].visible = false;
        }
        characterData.setCombatStyle(newStyle);
    }

    setAutoRetaliate(willRetaliate) {
        if (willRetaliate) {
            this.retaliateButton.setAlpha(1);
        } else {
            this.retaliateButton.setAlpha(0.01);
        }
        characterData.setAutoRetaliate(willRetaliate);
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.COMBAT_STYLE;
        } else {
            this.button.setAlpha(0.01);
            this.styleOnButtons.forEach((b) => (b.visible = false));
            this.styleOffButtons.forEach((b) => (b.visible = false));
        }

        // Show/hide panel
        this.panel.visible = isVisible;
        this.retaliateButton.visible = isVisible;
        this.styleIcons.forEach((i) => (i.visible = isVisible));
        this.styleText.forEach((t) => (t.visible = isVisible));
        this.isVisible = isVisible;
    }
}
