import { CONSTANTS, FONTS } from "../../constants/constants.js";
import { ModalWindow } from "../modal-window.js";
import { Button } from "../button.js";
import { getItemClass } from "../../utilities.js";

export class SmithingModalWindow extends ModalWindow {
    x = 10;
    y = 80;

    visible = false;

    window;
    elements = [];
    elementEvents = [];
    choice = "None";

    leftOffset = 8;
    topOffset = 32;

    horizontalPadding = 8;
    verticalPadding = 8;

    iconWidth = 60;
    iconHeight = 32;
    buttonWidth = 48;
    buttonHeight = 48;

    maxIconsPerRow = 5;

    constructor(scene) {
        super();
        this.scene = scene;

        this.window = this.scene.add
            .image(this.x, this.y, "smithing-interface")
            .setOrigin(0, 0)
            .setDepth(2);

        this.window.visible = this.visible;

        this.exitButton = new Button(this.scene, this.x + 473, this.y + 8, 19, 19);
        this.exitButton.on("pointerup", () => {
            if (this.visible) {
                this.setVisible(false);
            }
        });
    }

    clearChoices() {
        for (let element of this.elements) {
            element.destroy();
        }

        this.elements = [];
    }

    async setChoices(bar, barSupply, smithingLevel) {
        this.clearChoices();

        let recipes = [];

        switch (bar) {
            case "Bronze Bar":
                recipes = [
                    "BronzeDagger",
                    "BronzeAxe",
                    null,
                    null,
                    null,
                    "BronzeSword",
                    "BronzeScimitar",
                    "Bronze2hSword",
                ];
                break;
            default:
                return;
        }

        const offsetX = this.x + this.leftOffset + this.horizontalPadding;
        const offsetY = this.y + this.topOffset + this.verticalPadding;
        const padX = this.iconWidth + this.horizontalPadding;
        const padY = this.iconHeight + this.verticalPadding + 24;

        for (let [index, recipe] of recipes.entries()) {
            if (!recipe) {
                continue;
            }

            const positionX = offsetX + padX * (index % this.maxIconsPerRow);
            const positionY = offsetY + padY * parseInt(index / this.maxIconsPerRow);

            const item = await getItemClass(recipe, this.scene.window);
            console.log(item.name);
            const spriteName = await this.getSpriteName(item.name);

            const barFlag = barSupply >= item.bars[0].count;
            const levelFlag = smithingLevel >= item.smithingLevel;

            const chat = this.scene.scene.get(CONSTANTS.SCENES.CHAT);
            const elementButton = new Button(
                this.scene,
                positionX,
                positionY,
                this.buttonWidth,
                this.buttonHeight
            );

            if (barFlag && levelFlag) {
                elementButton.on("pointerup", () => {
                    if (this.visible) {
                        this.choice = recipe;
                        this.setVisible(false);
                    }
                });
            } else if (!barFlag) {
                elementButton.on("pointerup", () => {
                    if (this.visible) {
                        chat.writeText(item.smithingErrorMessage);
                    }
                });
            } else {
                elementButton.on("pointerup", () => {
                    if (this.visible) {
                        chat.writeText(item.smithingLevelErrorMessage);
                    }
                });
            }

            this.elements.push(elementButton);

            const elementIcon = this.scene.add
                .image(positionX + 12, positionY, spriteName)
                .setOrigin(0, 0)
                .setDepth(3)
                .setVisible(this.visible);

            const textFont = levelFlag ? FONTS.SMITH_UNLOCKED : FONTS.SMITH_LOCKED;

            const elementText = this.scene.add
                .text(positionX, positionY + this.iconHeight, item.item, textFont)
                .setDepth(3)
                .setVisible(this.visible);

            const postfix = item.bars[0].count > 1 ? " bars" : " bar";
            const countFont = barFlag
                ? FONTS.SMITH_COUNT_UNLOCKED
                : FONTS.SMITH_COUNT_LOCKED;

            const elementCount = this.scene.add
                .text(
                    positionX,
                    positionY + this.iconHeight + 16,
                    item.bars[0].count + postfix,
                    countFont
                )
                .setDepth(3)
                .setVisible(this.visible);

            this.elements.push(elementIcon);
            this.elements.push(elementText);
            this.elements.push(elementCount);
        }
    }

    setVisible(isVisible = true) {
        this.visible = isVisible;
        this.window.visible = isVisible;

        for (let element of this.elements) {
            element.visible = isVisible;
        }
    }
}
