import { OBJECT_TYPES, CONSTANTS, FONTS } from "../constants/constants.js";
import { runOnLoad } from "../utilities.js";

export class PromptScene extends Phaser.Scene {
    visible = false;

    create() {
        this.col1 = 120;

        // Chat window for examining items
        this.promptWindow = this.add
            .image(0, 338, "prompt-window")
            .setOrigin(0, 0)
            .setDepth(7);
        this.playerNameText = this.add.text(10, 459, "You", FONTS.ITEM_HEADER);

        // Add chat toggle button
        this.chatButtonText = this.add.text(20, 483, "Log", FONTS.HOTBAR);
        this.chatButton = new Button(this, 5, 480, 58, 22, { depth: 1 });
        this.chatButton.on("pointerup", () => {
            this.chatWindow.visible = !this.visible;
            this.show(!this.visible);
        });

        // Add bug report button
        this.reportButtonText = this.add.text(
            420,
            483,
            "Report a bug",
            FONTS.OPTIONS_MENU
        );
        this.reportButton = new Button(this, 402, 480, 115, 22);
        this.reportButton.on("pointerup", () => {
            window.open("https://github.com/EthanVieira/rs-clicker/issues", "_blank");
        });

        this.show(false);
    }

    // Takes in text, refreshes display, and shows notification button
    writeText(text, format = FONTS.ITEM_HEADER) {
        runOnLoad(this, () => {
            this.writeStrings({ x: 0, text, format });
            this.scrollWindow.refresh();
            this.scrollWindow.scrollToBottom();

            if (!this.visible) {
                this.show(false);
                this.showNotification();
            }

            console.log(text);
        });
    }

    // Create a row of text on the scroll window, needs refresh after
    writeStrings(...textObjs) {
        let textLine = [];
        let curX = 0;
        textObjs.forEach((textObj, index) => {
            curX += textObj.x;
            textLine.push(
                this.scrollWindow.add.text(curX, 0, textObj.text, textObj.format)
            );
        });
        this.writeObjects(...textLine);
    }

    writeObjects(...objects) {
        if (objects.length == 1) {
            this.scrollWindow.addObject(objects[0]);
        } else {
            let row = new TextRow(this.scrollWindow, 0, 0, []);
            objects.forEach((obj) => {
                row.add(obj);
            });
            this.scrollWindow.addObject(row);
        }
    }

    writeEnemyInfo(enemy) {
        const x = [this.col1, 40, 30, 45, 30, 50, 30, 45, 25, 45];

        this.writeStrings(
            { x: 0, text: "Stats:", format: FONTS.ITEM_HEADER },
            { x: x[0], text: "Atk", format: FONTS.ITEM_STATS },
            { x: x[1], text: enemy.attack, format: FONTS.ITEM_STATS },
            { x: x[2], text: "Str", format: FONTS.ITEM_STATS },
            { x: x[3], text: enemy.strength, format: FONTS.ITEM_STATS },
            { x: x[4], text: "Def", format: FONTS.ITEM_STATS },
            { x: x[5], text: enemy.defense, format: FONTS.ITEM_STATS },
            { x: x[6], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[7], text: enemy.magic, format: FONTS.ITEM_STATS },
            { x: x[8], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[9], text: enemy.ranged, format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: 0, text: "Accuracy Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[0], text: "Melee", format: FONTS.ITEM_STATS },
            { x: x[1], text: enemy.attackBonus, format: FONTS.ITEM_STATS },
            { x: x[2], text: "", format: FONTS.ITEM_STATS },
            { x: x[3], text: "", format: FONTS.ITEM_STATS },
            { x: x[4], text: "", format: FONTS.ITEM_STATS },
            { x: x[5], text: "", format: FONTS.ITEM_STATS },
            { x: x[6], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[7], text: enemy.magicBonus, format: FONTS.ITEM_STATS },
            { x: x[8], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[9], text: enemy.rangedBonus, format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: 0, text: "Damage Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[0], text: "Melee", format: FONTS.ITEM_STATS },
            { x: x[1], text: enemy.strengthBonus, format: FONTS.ITEM_STATS },
            { x: x[2], text: "", format: FONTS.ITEM_STATS },
            { x: x[3], text: "", format: FONTS.ITEM_STATS },
            { x: x[4], text: "", format: FONTS.ITEM_STATS },
            { x: x[5], text: "", format: FONTS.ITEM_STATS },
            { x: x[6], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[7], text: enemy.magicStrengthBonus, format: FONTS.ITEM_STATS },
            { x: x[8], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[9], text: enemy.rangedStrengthBonus, format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: 0, text: "Defense Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[0], text: "Stab", format: FONTS.ITEM_STATS },
            { x: x[1], text: enemy.stabDefense, format: FONTS.ITEM_STATS },
            { x: x[2], text: "Slash", format: FONTS.ITEM_STATS },
            { x: x[3], text: enemy.slashDefense, format: FONTS.ITEM_STATS },
            { x: x[4], text: "Crush", format: FONTS.ITEM_STATS },
            { x: x[5], text: enemy.crushDefense, format: FONTS.ITEM_STATS },
            { x: x[6], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[7], text: enemy.magicDefense, format: FONTS.ITEM_STATS },
            { x: x[8], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[9], text: enemy.rangedDefense, format: FONTS.ITEM_STATS }
        );
    }

    writeEquipmentInfo(equipment) {
        const x = [0, this.col1, 40, 30, 45, 30, 50, 30, 45, 25, 45];

        this.writeStrings(
            { x: x[0], text: "Sells for:", format: FONTS.ITEM_HEADER },
            { x: x[1], text: equipment.cost + "gp", format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: x[0], text: "Required Level:", format: FONTS.ITEM_HEADER },
            { x: x[1], text: equipment.requiredLevel, format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: x[0], text: "Accuracy Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[1], text: "Stab", format: FONTS.ITEM_STATS },
            { x: x[2], text: equipment.stabBonus, format: FONTS.ITEM_STATS },
            { x: x[3], text: "Slash", format: FONTS.ITEM_STATS },
            { x: x[4], text: equipment.slashBonus, format: FONTS.ITEM_STATS },
            { x: x[5], text: "Crush", format: FONTS.ITEM_STATS },
            { x: x[6], text: equipment.crushBonus, format: FONTS.ITEM_STATS },
            { x: x[7], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[8], text: equipment.magicBonus, format: FONTS.ITEM_STATS },
            { x: x[9], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[10], text: equipment.rangedBonus, format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: x[0], text: "Defense Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[1], text: "Stab", format: FONTS.ITEM_STATS },
            { x: x[2], text: equipment.stabDefenseBonus, format: FONTS.ITEM_STATS },
            { x: x[3], text: "Slash", format: FONTS.ITEM_STATS },
            { x: x[4], text: equipment.slashDefenseBonus, format: FONTS.ITEM_STATS },
            { x: x[5], text: "Crush", format: FONTS.ITEM_STATS },
            { x: x[6], text: equipment.crushDefenseBonus, format: FONTS.ITEM_STATS },
            { x: x[7], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[8], text: equipment.magicDefenseBonus, format: FONTS.ITEM_STATS },
            { x: x[9], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[10], text: equipment.rangedDefenseBonus, format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: x[0], text: "Damage Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[1], text: "Melee", format: FONTS.ITEM_STATS },
            { x: x[2], text: equipment.strengthBonus, format: FONTS.ITEM_STATS },
            { x: x[3], text: "Prayer", format: FONTS.ITEM_STATS },
            { x: x[4], text: equipment.prayerBonus, format: FONTS.ITEM_STATS },
            { x: x[5], text: "", format: FONTS.ITEM_STATS },
            { x: x[6], text: "", format: FONTS.ITEM_STATS },
            { x: x[7], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[8], text: equipment.magicStrengthBonus, format: FONTS.ITEM_STATS },
            { x: x[9], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[10], text: equipment.rangedStrengthBonus, format: FONTS.ITEM_STATS }
        );
    }

    writeAutoClickerInfo(autoClicker) {
        this.writeStrings(
            { x: 0, text: "Sells for:", format: FONTS.ITEM_HEADER },
            { x: this.col1, text: autoClicker.cost + "gp", format: FONTS.ITEM_STATS }
        );
        this.writeStrings(
            { x: 0, text: "DPS:", format: FONTS.ITEM_HEADER },
            { x: this.col1, text: autoClicker.dps, format: FONTS.ITEM_STATS }
        );
    }

    show(isVisible = true) {
        runOnLoad(this, () => {
            this.visible = isVisible;
            this.scrollWindow.setVisible(isVisible);
            this.playerNameText.visible = isVisible;
            this.chatButtonImage.visible = isVisible;
            this.chatButtonNotificationImage.visible = false;

            if (!isVisible) {
                this.chatWindow.visible = isVisible;
                this.shopChatWindow.visible = isVisible;
            }
        });
    }

    hideButtons() {
        this.chatButtonImage.visible = false;
        this.chatButtonText.visible = false;
        this.reportButtonText.visible = false;
        this.chatButtonNotificationImage.visible = false;
    }

    showNotification() {
        this.chatButtonNotificationImage.visible = true;
        this.chatButtonImage.visible = true;
    }

    // Show object info in chat window
    showObjectInfo(isVisible, object = false, isShop = false) {
        if (object && isVisible) {
            this.show();

            // Load bigger window and clear text on shop scene
            if (isShop) {
                this.shopChatWindow.visible = true;
                this.scrollWindow.clearObjects();
                this.chatButtonImage.visible = false;
            } else {
                this.chatWindow.visible = true;
            }

            const col1 = this.col1;

            // Write name & description
            this.writeStrings(
                { x: 0, text: object.name, format: FONTS.ITEM_HEADER },
                { x: col1, text: object.examineText, format: FONTS.ITEM_STATS }
            );
            // Show different things for different types of objects
            switch (object.objectType) {
                case OBJECT_TYPES.EQUIPMENT:
                    this.writeEquipmentInfo(object);
                    break;
                case OBJECT_TYPES.ITEM:
                    this.writeStrings(
                        { x: 0, text: "Sells for:", format: FONTS.ITEM_HEADER },
                        { x: col1, text: object.cost + "gp", format: FONTS.ITEM_STATS }
                    );
                    break;
                case OBJECT_TYPES.ENEMY:
                    this.writeEnemyInfo(object);
                    break;
                case OBJECT_TYPES.AUTOCLICKER:
                    this.writeAutoClickerInfo(object);
                    break;
            }

            // Add blank line
            this.writeStrings({ x: 0, text: "", format: FONTS.ITEM_STATS });
            this.scrollWindow.refresh();
            this.scrollWindow.scrollToBottom();
            if (isShop) {
                this.scrollWindow.showScrollBar(false);
            }
        } else {
            this.show(false);
        }
    }
}
