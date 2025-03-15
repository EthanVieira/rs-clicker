import { CONSTANTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";
import {
    SPELL_MANIFEST,
    AVAILABLE_INDEX,
    UNAVAILABLE_INDEX,
} from "../../constants/spell-manifest.js";
import { calcLevel, dashToPascalCase } from "../../utilities.js";

const BUTTON_INDEX = 0;
const AVAILABILITY_INDEX = 1;

export class Spellbook {
    dashboard;
    panel;
    button;
    spells = {};
    selectedSpell = "None";
    selectedRectangle;
    isVisible = false;

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
                this.spells[iconName] = [
                    this.dashboard.add
                        .image(560 + xDif * i, 213, iconName)
                        .setOrigin(0, 0)
                        .setDepth(2)
                        .setInteractive()
                        .on("pointerdown", () => {
                            if (j == AVAILABLE_INDEX) {
                                this.selectSpell(iconName);
                            }
                        }),
                    false,
                ];
            });
        });

        this.selectedRectangle = this.dashboard.add
            .rectangle(0, 0, 20, 20, 0x000000, 0)
            .setStrokeStyle(1, 0xffffff)
            .setDepth(1)
            .setVisible(false);

        // Default to hidden
        this.setVisible(false);
    }

    selectSpell(spell) {
        if (this.selectedSpell != spell) {
            const spellButton = this.spells[spell][BUTTON_INDEX];
            this.selectedSpell = spell;
            this.selectedRectangle
                .setPosition(spellButton.x + 6, spellButton.y + 5)
                .setVisible(true);
        } else {
            this.unselectSpell();
        }
    }

    unselectSpell() {
        this.selectedSpell = "None";
        this.selectedRectangle.setVisible(false);
    }

    refreshSpells() {
        Object.values(SPELL_MANIFEST.StandardSpellbook).forEach((spell) => {
            let isSpellAvailable = false;
            const availableName = spell.imageNames[AVAILABLE_INDEX];
            const unavailableName = spell.imageNames[UNAVAILABLE_INDEX];
            const hasLevel = Object.keys(spell.requiredLevels).every((skill) => {
                return (
                    calcLevel(characterData.getSkills()[skill]) >=
                    spell.requiredLevels[skill]
                );
            });

            if (hasLevel) {
                const weapon = this.dashboard.equipment.equipment.WEAPON;
                const staffType = weapon && weapon.item == "Staff" ? weapon.type : "None";

                isSpellAvailable = Object.keys(spell.requiredRunes).every((rune) => {
                    return rune.startsWith(staffType)
                        ? true
                        : this.dashboard.inventory.getNumItemsByName(rune) >=
                              spell.requiredRunes[rune];
                });
            }

            if (isSpellAvailable) {
                this.spells[availableName][BUTTON_INDEX].setVisible(this.isVisible);
                this.spells[unavailableName][BUTTON_INDEX].setVisible(false);
            } else {
                if (this.selectedSpell == availableName) {
                    this.unselectSpell();
                }
                this.spells[availableName][BUTTON_INDEX].setVisible(false);
                this.spells[unavailableName][BUTTON_INDEX].setVisible(this.isVisible);
            }
            this.spells[availableName][AVAILABILITY_INDEX] = isSpellAvailable;
        });
    }

    getCurrentSelectedSpell() {
        return SPELL_MANIFEST.StandardSpellbook[dashToPascalCase(this.selectedSpell)];
    }

    getCurrentSelectedSpellName() {
        return this.selectedSpell;
    }

    setVisible(isVisible) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.SPELLBOOK;
            if (this.selectedSpell != "None") {
                this.selectedRectangle.setVisible(isVisible);
            }
        } else {
            this.button.setAlpha(0.1);
            this.selectedRectangle.setVisible(false);
        }
        this.panel.visible = isVisible;
        this.isVisible = isVisible;
        this.refreshSpells();
    }
}
