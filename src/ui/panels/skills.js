import { CONSTANTS, FONTS } from "../../constants/constants.js";
import { calcLevel, calcRemainingXp } from "../../utilities.js";
import { getSkillDescription } from "./skill-descriptions.js";
import { characterData } from "../../cookie-io.js";

export class Skills {
    scene;
    statsScene;
    skillText = {};

    hoverGraphics;
    hoverWindow;
    HOVER_WINDOW_INITIAL_WIDTH = 68;
    hoverNameText;
    hoverLevelText;
    hoverXpText;
    hoverRemainingXpText;

    skillInfo = {
        bg: {},
        header: {},
        closeButton: {},
        description: {},
        body: {},
    };

    skillWidth = 64;
    skillHeight = 31;

    constructor(scene) {
        this.scene = scene;

        // Panel
        this.panel = scene.add
            .image(548, 208, "skills-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        // Button
        this.button = scene.add
            .image(560, 168, "skills-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVisible();
            });

        let startX = 585,
            startY = 220,
            index = 0;

        // Add level text for skills
        for (let skill in characterData.getSkills()) {
            let row = index % 3;
            let column = Math.floor(index / 3);
            let x = startX + row * this.skillWidth;
            let y = startY + column * this.skillHeight;

            this.skillText[skill] = scene.add
                .text(x, y, "1", FONTS.SKILLS)
                .setOrigin(0.5)
                .setDepth(2);
            this.skillText[skill + "Bottom"] = scene.add
                .text(x + 12, y + 10, "1", FONTS.SKILLS)
                .setOrigin(0.5)
                .setDepth(2);

            index++;
        }

        // Add hover menu for skills
        this.hoverNameText = this.scene.add.text(0, 0, "", FONTS.SKILL_HOVER).setDepth(3);
        this.hoverLevelText = this.scene.add
            .text(0, 0, "", FONTS.SKILL_HOVER)
            .setDepth(3);
        this.hoverXpText = this.scene.add.text(0, 0, "", FONTS.SKILL_HOVER).setDepth(3);
        this.hoverRemainingXpText = this.scene.add
            .text(0, 0, "", FONTS.SKILL_HOVER)
            .setDepth(3);
        this.hoverWindow = new Phaser.Geom.Rectangle(
            0,
            0,
            this.HOVER_WINDOW_INITIAL_WIDTH,
            50
        );
        this.hoverGraphics = this.scene.add.graphics({
            lineStyle: { width: 1, color: 0x000000 },
            fillStyle: { color: 0xffffa0 },
        });

        // Hover on skill
        this.scene.input.on("pointermove", (pointer) => {
            if (this.scene.currentPanel == CONSTANTS.PANEL.SKILLS) {
                this.createHoverWindow(pointer.x, pointer.y);
            }
        });

        // Click on skill
        this.scene.input.on("pointerdown", (pointer) => {
            if (this.scene.currentPanel == CONSTANTS.PANEL.SKILLS) {
                this.createSkillInfo(pointer.x, pointer.y, true);
            }
        });

        this.totalLevelText = scene.add
            .text(705, 450, "1", { fontSize: "12px", fill: "yellow" })
            .setOrigin(0.5)
            .setDepth(2);

        // Skill description
        this.skillInfo.bg = this.scene.add
            .image(250, 250, "skills-info")
            .setDepth(2)
            .setVisible(false);
        this.skillInfo.header = this.scene.add
            .text(250, 110, "Fletching", { font: "28px runescape", fill: "black" })
            .setOrigin(0.5)
            .setDepth(3)
            .setVisible(false);
        this.skillInfo.description = this.scene.add
            .text(240, 180, "", { font: "20px runescape", fill: "black" })
            .setOrigin(0.5)
            .setDepth(3)
            .setVisible(false);
        this.skillInfo.body = this.scene.add
            .text(150, 230, "", { font: "18px runescape", fill: "black" })
            .setOrigin(0)
            .setDepth(3)
            .setVisible(false);
        this.skillInfo.closeButton = this.scene.add
            .image(405, 75, "exit-button")
            .setDepth(2)
            .setInteractive()
            .setVisible(false)
            .on("pointerup", () => {
                this.showSkillInfo(false);
            });

        // Set and hide skills page on startup
        this.updateSkillsText();
        this.setVisible(false);
    }

    setVisible(isVisible = true) {
        if (isVisible) {
            this.scene.hideAllMenus();
            this.button.setAlpha(1);
            this.scene.currentPanel = CONSTANTS.PANEL.SKILLS;
        } else {
            this.button.setAlpha(0.1);
        }

        // Show panel and all skill text
        for (let skill in this.skillText) {
            this.skillText[skill].visible = isVisible;
        }
        this.panel.visible = isVisible;
        this.totalLevelText.visible = isVisible;
        this.hoverGraphics.visible = false;
        this.hoverXpText.visible = false;
        this.hoverLevelText.visible = false;
        this.hoverRemainingXpText.visible = false;
    }

    updateSkillsText() {
        if (this.scene.scene.isActive()) {
            let totalLevel = 0;
            const skills = characterData.getSkills();

            for (let skill in skills) {
                let level = Math.min(
                    calcLevel(skills[skill]),
                    CONSTANTS.LIMITS.MAX_LEVEL
                );
                this.skillText[skill].text = level;
                this.skillText[skill + "Bottom"].text = level;

                // Prayer has its own panel + hotbar
                if (skill == "prayer") {
                    this.scene.prayer.setLevel(level);
                }

                totalLevel += level;
            }

            this.totalLevelText.text = totalLevel;
        } else {
            // If called before load, update once loaded
            this.scene.events.once("create", () => {
                this.updateSkillsText();
            });
        }
    }

    // Find which skill is being clicked/hovered
    findSkill(x, y) {
        let column = 0;
        let row = 0;
        let index = 0;
        let skill = 0;

        if (x > 550 && x < 730 && y > 205 && y < 450) {
            column = Math.floor((x - 550) / this.skillWidth);
            row = Math.floor((y - 205) / this.skillHeight);
            index = column + row * 3;
            skill = Object.keys(characterData.getSkills())[index];

            return { skill, index, row, column };
        }
        return { skill, index, row, column };
    }

    createHoverWindow(x, y) {
        let { skill, index, row, column } = this.findSkill(x, y);

        if (skill != 0) {
            x = Math.floor(490 + column * this.skillWidth);
            y = Math.floor(205 + row * this.skillHeight + this.skillHeight / 1.5);

            let xpStr = "";
            let remainingXpStr = "";

            if (index < 23) {
                this.hoverNameText.text = skill[0].toUpperCase() + skill.substring(1);
                xpStr = characterData.getSkillXp(skill).toLocaleString();
                this.hoverXpText.text = "Total XP: " + xpStr;
                let remainingXp = calcRemainingXp(characterData.getSkillXp(skill));
                remainingXpStr = remainingXp.toLocaleString();
                this.hoverRemainingXpText.text = "Remaining: " + remainingXpStr;
            } else {
                this.hoverNameText.text = "Total Level";

                // Get cumulative XP
                let sum = 0;
                for (let [curSkill, xp] of Object.entries(characterData.getSkills())) {
                    sum += xp;
                }
                xpStr = sum.toLocaleString();
                this.hoverXpText.text = "Total XP: " + xpStr;
                this.hoverRemainingXpText.text = "";
            }

            // Set window
            this.hoverWindow.x = x;
            this.hoverWindow.y = y;
            this.hoverWindow.width =
                this.HOVER_WINDOW_INITIAL_WIDTH +
                Math.max(xpStr.length, remainingXpStr.length) * 5;
            this.hoverGraphics.clear();
            this.hoverGraphics.fillRectShape(this.hoverWindow);
            this.hoverGraphics.strokeRectShape(this.hoverWindow);
            this.hoverGraphics.setDepth(3);

            // Set text
            this.hoverNameText.x = x + 5;
            this.hoverNameText.y = y + 5;
            this.hoverXpText.x = x + 5;
            this.hoverXpText.y = y + 20;
            this.hoverRemainingXpText.x = x + 5;
            this.hoverRemainingXpText.y = y + 33;

            this.hoverNameText.visible = true;
            this.hoverGraphics.visible = true;
            this.hoverXpText.visible = true;
            this.hoverRemainingXpText.visible = true;
        } else {
            this.hoverGraphics.visible = false;
            this.hoverNameText.visible = false;
            this.hoverXpText.visible = false;
            this.hoverRemainingXpText.visible = false;
        }
    }

    createSkillInfo(x, y, isVisible) {
        if (isVisible) {
            const { skill, index, row, column } = this.findSkill(x, y);

            if (skill != 0 && skill != undefined) {
                // Close the window if the same skill is clicked twice
                if (
                    this.skillInfo.header.text ==
                        skill[0].toUpperCase() + skill.substring(1) &&
                    this.skillInfo.header.visible
                ) {
                    this.showSkillInfo(false);
                    return;
                }

                this.skillInfo.header.text = skill[0].toUpperCase() + skill.substring(1);
                const { description, body } = getSkillDescription(skill);
                this.skillInfo.description.text = description;
                this.skillInfo.body.text = body;

                this.showSkillInfo(true);
            }
        } else {
            this.showSkillInfo(false);
        }
    }

    showSkillInfo(isVisible) {
        if (this.statsScene == undefined) {
            this.statsScene = this.scene.scene.get(CONSTANTS.SCENES.STATS);
        }

        if (isVisible) {
            this.statsScene.setVisible(false);
        } else {
            // Put correct stats per scene
            this.statsScene.showStats();
        }
        for (let obj in this.skillInfo) {
            this.skillInfo[obj].visible = isVisible;
        }
    }
}
