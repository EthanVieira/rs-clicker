import { CONSTANTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";
import {
    SPELL_MANIFEST,
    AVAILABLE_INDEX,
    UNAVAILABLE_INDEX,
} from "../../spell-manifest.js";
import { calcLevel } from "../../utilities.js";

export class Spellbook {
    dashboard;
    panel;
    button;
    spells = {};

    constructor(dashboard) {
        this.dashboard = dashboard;
        this.chat = dashboard.scene.get(CONSTANTS.SCENES.CHAT);

        // Add button / panel
        this.panel = dashboard.add
            .image(550, 204, "spellbook-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        this.button = dashboard.add
            .image(725, 168, "spellbook-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVisible(true);
            });

        // TODO: handle y dif when we have more spells
        const xDif = 30;

        Object.values(SPELL_MANIFEST.StandardSpellbook).forEach((spell, i) => {
            spell.imageNames.forEach((iconName, j) => {
                this.spells[iconName] = this.dashboard.add
                    .image(560 + xDif * i, 213, iconName)
                    .setOrigin(0, 0)
                    .setDepth(2)
                    .setInteractive()
                    .on("pointerdown", () => {});
            });
        });

        // Default to hidden
        this.setVisible(false);
    }

    refreshSpells(isVisible = true) {
        Object.values(SPELL_MANIFEST.StandardSpellbook).forEach((spell) => {
            const hasRunes = Object.keys(spell.requiredRunes).every((rune) => {
                return (
                    this.dashboard.inventory.getNumItemsByName(rune) >=
                    spell.requiredRunes[rune]
                );
            });

            const skills = characterData.getSkills();
            const hasLevel = Object.keys(spell.requiredLevels).every((skill) => {
                return calcLevel(skills[skill]) >= spell.requiredLevels[skill];
            });

            if (hasRunes && hasLevel) {
                this.spells[spell.imageNames[AVAILABLE_INDEX]].setVisible(isVisible);
                this.spells[spell.imageNames[UNAVAILABLE_INDEX]].setVisible(false);
            } else {
                this.spells[spell.imageNames[AVAILABLE_INDEX]].setVisible(false);
                this.spells[spell.imageNames[UNAVAILABLE_INDEX]].setVisible(isVisible);
            }
        });
    }

    setVisible(isVisible) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.SPELLBOOK;
        } else {
            this.button.setAlpha(0.1);
        }
        this.panel.visible = isVisible;
        this.refreshSpells(isVisible);
    }
}
