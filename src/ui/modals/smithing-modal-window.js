import { FONTS } from "../../constants/constants.js";
import { ModalWindow } from "../modal-window.js"
import { Button } from "../button.js";
import { getItemClass } from "../../utilities.js";
import { itemManifest } from "../../items/item-manifest.js";

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
                    recipes = ["BronzeDagger", "BronzeSword", null, "BronzeScimitar", "BronzeAxe", "Bronze2hSword"];
                break;
            default:
                return;
        }

        let rowIndex = 0;

        let positionX = this.x + this.leftOffset + this.horizontalPadding;
        let positionY = this.y + this.topOffset + this.verticalPadding;

        for (let recipe of recipes) {
            if (!recipe) {
                positionX += this.iconWidth + this.horizontalPadding;
                rowIndex += 1;
                continue;
            }

            if (rowIndex >= this.maxIconsPerRow) {
                positionX = this.x + this.leftOffset + this.horizontalPadding;
                positionY += this.iconHeight + this.verticalPadding + 24;
                rowIndex = 0;
            }

            const item = await getItemClass(recipe, this.scene.window);
            const spriteName = await this.getSpriteName(item.name);

            const barFlag = barSupply >= item.bars[0].count;
            const levelFlag = smithingLevel >= item.smithingLevel;

            if (barFlag && levelFlag) {
                const elementButton = new Button(this.scene, positionX, positionY, this.buttonWidth, this.buttonHeight);
                elementButton.on("pointerup", () => {
                    if (this.visible) {
                        this.choice = recipe;
                        this.setVisible(false);
                    }
                });

                this.elements.push(elementButton);
            }

            const elementIcon = this.scene.add
                .image(positionX + 12, positionY, spriteName)
                .setOrigin(0, 0)
                .setDepth(3)
                .setVisible(this.visible);

            const textFont = levelFlag ? FONTS.SMITH_UNLOCKED : FONTS.SMITH_LOCKED;

            const elementText = this.scene.add.text(positionX, positionY + this.iconHeight, item.item, textFont)
                .setDepth(3)
                .setVisible(this.visible);

            const postfix = (item.bars[0].count > 1) ? " bars" : " bar";
            const countFont = barFlag ? FONTS.SMITH_COUNT_UNLOCKED : FONTS.SMITH_COUNT_LOCKED;

            const elementCount = this.scene.add.text(positionX, positionY + this.iconHeight + 16, item.bars[0].count + postfix, countFont)
                .setDepth(3)
                .setVisible(this.visible);

            this.elements.push(elementIcon);
            this.elements.push(elementText);
            this.elements.push(elementCount);

            positionX += this.iconWidth + this.horizontalPadding;
            rowIndex += 1;
        }
    }

    setVisible(isVisible = true) {
        this.visible = isVisible;
        this.window.visible = isVisible;

        for (let element of this.elements) {
            element.visible = isVisible;
        }
    }

    getChoice() {
        return this.choice;
    }
};