import { OBJECT_TYPES, CONSTANTS, FONTS, KEY_CODES } from "../constants/constants.js";
import { ScrollWindow } from "./scroll-window.js";
import { TextRow } from "./text-row.js";
import { Button } from "./button.js";
import { runOnLoad, capitalize, ListWithTimeout } from "../utilities.js";
import { handleCommand } from "../data/commands.js";

export class ChatScene extends Phaser.Scene {
    chatWindow;
    shopChatWindow;
    scrollWindow;

    chatButton;
    chatButtonText;
    reportButton;
    reportButtonText;

    playerNameText;
    chatInput;
    userMessage;
    recentKeys = new ListWithTimeout();
    previousMessage = "";

    col1 = 0;
    visible = false;
    isPromptOpen = false;

    constructor() {
        super({ key: CONSTANTS.SCENES.CHAT });
    }

    preload() {
        this.load.image("chat-window", "assets/ui/ChatWindow.png");
        this.load.image("shop-chat-window", "assets/ui/ShopChatWindow.png");
        this.load.image("chat-button", "assets/ui/buttons/ChatButton.png");
        this.load.image(
            "chat-button-notification",
            "assets/ui/buttons/ChatButtonNotification.png"
        );
        this.load.image("prompt-window", "assets/ui/PromptWindow.png");
    }

    create() {
        this.col1 = 120;

        // Setup scroll window
        if (this.scrollWindow == undefined) {
            this.scrollWindow = new ScrollWindow({
                name: "chat",
                x: -20,
                y: 345,
                width: 515,
                height: 113,
                numColumns: 1,
                padding: 0,
            });
            this.scene.add(this.scrollWindow.name, this.scrollWindow, true);
            let welcomeText = this.scrollWindow.add.text(
                0,
                0,
                "Welcome to RS Clicker",
                FONTS.ITEM_HEADER
            );

            this.scrollWindow.addObject(welcomeText);
            this.scrollWindow.refresh();
        }

        // Chat window for examining items
        this.chatWindow = this.add
            .image(0, 338, "chat-window")
            .setOrigin(0, 0)
            .setDepth(0);
        this.shopChatWindow = this.add
            .image(0, 338, "shop-chat-window")
            .setOrigin(0, 0)
            .setDepth(0);
        this.chatButtonImage = this.add.image(32, 490, "chat-button").setDepth(0);
        this.chatButtonNotificationImage = this.add
            .image(32, 491, "chat-button-notification")
            .setDepth(0);
        this.playerNameText = this.add.text(10, 459, "You", FONTS.ITEM_HEADER);

        // Add chat toggle button
        this.chatButtonText = this.add.text(20, 483, "Log", FONTS.HOTBAR);
        this.chatButton = new Button(this, 5, 480, 58, 22, { depth: 1 });
        this.chatButton.on("pointerup", () => {
            this.setVisible(!this.visible);
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

        this.userMessage = this.add.text(60, 458, "*", FONTS.PROMPT_INPUT).setDepth(8);
        this.userMessage.visible = false;

        this.setVisible(false);
    }

    // Takes in text, refreshes display, and shows notification button
    writeText(text, format = FONTS.ITEM_HEADER) {
        runOnLoad(this, () => {
            this.writeStrings({ x: 0, text, format });

            if (!this.visible) {
                this.setVisible(false);
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
        this.scrollWindow.refresh();
        this.scrollWindow.scrollToBottom();
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
            { x: x[5], text: enemy.defence, format: FONTS.ITEM_STATS },
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
            { x: 0, text: "defence Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[0], text: "Stab", format: FONTS.ITEM_STATS },
            { x: x[1], text: enemy.stabDefence, format: FONTS.ITEM_STATS },
            { x: x[2], text: "Slash", format: FONTS.ITEM_STATS },
            { x: x[3], text: enemy.slashDefence, format: FONTS.ITEM_STATS },
            { x: x[4], text: "Crush", format: FONTS.ITEM_STATS },
            { x: x[5], text: enemy.crushDefence, format: FONTS.ITEM_STATS },
            { x: x[6], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[7], text: enemy.magicDefence, format: FONTS.ITEM_STATS },
            { x: x[8], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[9], text: enemy.rangedDefence, format: FONTS.ITEM_STATS }
        );
    }

    writeEquipmentInfo(equipment) {
        const x = [0, this.col1, 40, 30, 45, 30, 50, 30, 45, 25, 45];

        this.writeStrings(
            { x: x[0], text: "Sells for:", format: FONTS.ITEM_HEADER },
            { x: x[1], text: equipment.cost + "gp", format: FONTS.ITEM_STATS }
        );

        let reqLevelText = [];

        reqLevelText.push({
            x: x[0],
            text: "Required Levels:",
            format: FONTS.ITEM_HEADER,
        });

        for (
            var i = 0, keys = Object.keys(equipment.requiredLevels), ii = keys.length;
            i < ii;
            i++
        ) {
            reqLevelText.push({
                x: x[i * 2 + 1] + x[i * 2],
                text: capitalize(keys[i]) + " " + equipment.requiredLevels[keys[i]],
                format: FONTS.ITEM_STATS,
            });
        }
        this.writeStrings(...reqLevelText);

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
            { x: x[0], text: "defence Bonuses:", format: FONTS.ITEM_HEADER },
            { x: x[1], text: "Stab", format: FONTS.ITEM_STATS },
            { x: x[2], text: equipment.stabDefenceBonus, format: FONTS.ITEM_STATS },
            { x: x[3], text: "Slash", format: FONTS.ITEM_STATS },
            { x: x[4], text: equipment.slashDefenceBonus, format: FONTS.ITEM_STATS },
            { x: x[5], text: "Crush", format: FONTS.ITEM_STATS },
            { x: x[6], text: equipment.crushDefenceBonus, format: FONTS.ITEM_STATS },
            { x: x[7], text: "Mag", format: FONTS.ITEM_STATS },
            { x: x[8], text: equipment.magicDefenceBonus, format: FONTS.ITEM_STATS },
            { x: x[9], text: "Rng", format: FONTS.ITEM_STATS },
            { x: x[10], text: equipment.rangedDefenceBonus, format: FONTS.ITEM_STATS }
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

    setVisible(isVisible = true) {
        if (!this.isPromptOpen) {
            runOnLoad(this, () => {
                this.visible = isVisible;
                this.scrollWindow.setVisible(isVisible);
                this.playerNameText.visible = isVisible;
                this.chatButtonImage.visible = isVisible;
                this.chatButtonNotificationImage.visible = false;
                this.chatWindow.visible = isVisible;
                if (isVisible) {
                    this.allowTyping();
                } else {
                    this.shopChatWindow.visible = isVisible;
                    this.disallowTyping();
                }
            });
        }
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
    showObjectInfo(isVisible, object = undefined, isShop = false) {
        if (object && isVisible) {
            this.setVisible();

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
                    if (!isShop) {
                        this.writeAmountText(object);
                    }
                    break;
                case OBJECT_TYPES.ITEM:
                    this.writeStrings(
                        { x: 0, text: "Sells for:", format: FONTS.ITEM_HEADER },
                        { x: col1, text: object.cost + "gp", format: FONTS.ITEM_STATS }
                    );
                    if (!isShop) {
                        this.writeAmountText(object);
                    }
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
            this.setVisible(false);
        }
    }

    writeAmountText(item) {
        const amount = this.scene
            .get(CONSTANTS.SCENES.DASHBOARD)
            .inventory.getNumItems(item);

        if (amount > 100000) {
            this.writeStrings(
                {
                    x: 0,
                    text: "Amount:",
                    format: FONTS.ITEM_HEADER,
                },
                { x: this.col1, text: amount, format: FONTS.ITEM_STATS }
            );
        }
    }

    // TODO: if we need more prompts we should reuse a lot of this
    // Right now it is specifically for selling X amount of an item
    prompt(promptText, item) {
        const originallyVisible = this.visible;
        this.setVisible(false);
        this.isPromptOpen = true;

        let promptObjs = [];

        let promptWindow = this.add
            .image(0, 338, "prompt-window")
            .setOrigin(0, 0)
            .setDepth(8);

        // TODO: Current x value is only for the text "Enter Amount:"
        let prompt = this.add.text(225, 380, promptText, FONTS.PROMPT).setDepth(8);
        let promptInput = this.add
            .text(promptWindow.width / 2, 410, "*", FONTS.PROMPT_INPUT)
            .setDepth(9);

        let keyboardInput = this.input.keyboard.on("keydown", (event) => {
            if (event.keyCode == KEY_CODES.ENTER) {
                let inputValue = parseInt(
                    promptInput.text.substr(0, promptInput.text.length - 1)
                );

                if (isNaN(inputValue)) {
                    inputValue = 0;
                }

                item.sellX(inputValue);
                this.destroyPrompt(promptObjs, keyboardInput, originallyVisible);
            }

            if (event.keyCode == KEY_CODES.BACKSPACE && promptInput.text.length > 1) {
                promptInput.text =
                    promptInput.text.substr(0, promptInput.text.length - 2) + "*";
                promptInput.x += 4;
            }

            if (
                (event.keyCode <= KEY_CODES.NINE && event.keyCode >= KEY_CODES.ZERO) ||
                (event.keyCode <= KEY_CODES.NUMPAD_NINE &&
                    event.keyCode >= KEY_CODES.NUMPAD_ZERO)
            ) {
                // arbitrary input length limit
                if (promptInput.text.length < 15) {
                    promptInput.text =
                        promptInput.text.substr(0, promptInput.text.length - 1) +
                        event.key +
                        "*";
                    promptInput.x -= 4;
                }
            }

            if (event.keyCode == KEY_CODES.ESC) {
                this.destroyPrompt(promptObjs, keyboardInput, originallyVisible);
            }
        });

        promptObjs = [prompt, promptInput, promptWindow];
    }

    destroyPrompt(promptContainer, inputObj, showChat) {
        inputObj.removeAllListeners();
        promptContainer.forEach((item) => {
            item.destroy();
        });

        this.isPromptOpen = false;
        this.setVisible(showChat);
    }

    allowTyping() {
        this.userMessage.visible = true;

        // Don't create duplicate listeners if this is called twice
        if (this.chatInput != null) {
            this.chatInput.removeAllListeners();
        }

        this.chatInput = this.input.keyboard.on("keydown", (event) => {
            if (event.keyCode == KEY_CODES.ENTER) {
                if (this.userMessage.text != "" && this.userMessage.text != "*") {
                    // remove prompt character
                    this.userMessage.text = this.userMessage.text.substr(
                        0,
                        this.userMessage.text.length - 1
                    );

                    // check for commands
                    if (this.userMessage.text[0] == "/") {
                        handleCommand(this.userMessage.text);
                    } else {
                        // write to chat window
                        this.writeStrings(
                            { x: 0, text: "You:", format: FONTS.ITEM_HEADER },
                            {
                                x: 28,
                                text: this.userMessage.text,
                                format: FONTS.ITEM_STATS,
                            }
                        );
                    }
                    this.previousMessage = this.userMessage.text + "*";
                    this.userMessage.text = "";
                } else {
                    // Close the chat box
                    this.setVisible(false);
                }
            }

            if (
                event.keyCode == KEY_CODES.BACKSPACE &&
                this.userMessage.text.length > 1
            ) {
                this.userMessage.text =
                    this.userMessage.text.substr(0, this.userMessage.text.length - 2) +
                    "*";
            }

            if (event.keyCode == KEY_CODES.UP) {
                this.userMessage.text = this.previousMessage;
            }

            // There are some firefox only keycodes that we might want to look into
            // numbers, letters, punctuation, or space
            if (
                event.keyCode == KEY_CODES.SPACE ||
                (event.keyCode <= KEY_CODES.NINE && event.keyCode >= KEY_CODES.ZERO) ||
                event.keyCode == KEY_CODES.COLON ||
                (event.keyCode <= KEY_CODES.Z && event.keyCode >= KEY_CODES.A) ||
                (event.keyCode <= KEY_CODES.NUMPAD_NINE &&
                    event.keyCode >= KEY_CODES.NUMPAD_ZERO) ||
                (event.keyCode <= KEY_CODES.BACKTICK &&
                    event.keyCode >= KEY_CODES.SEMICOLON) ||
                (event.keyCode <= KEY_CODES.QUOTES &&
                    event.keyCode >= KEY_CODES.OPEN_BRACKET)
            ) {
                // arbitrary input length limit
                if (
                    this.userMessage.text.length < 55 &&
                    this.recentKeys.get(event.keyCode) == undefined
                ) {
                    this.userMessage.text =
                        this.userMessage.text.substr(
                            0,
                            this.userMessage.text.length - 1
                        ) +
                        event.key +
                        "*";

                    // Phaser has an input bug where pressing multiple keys simultaneously
                    // (or near-simultaneously) results in duplicate letters being detected as input.
                    // Here we add recently typed letters to a decaying list so that they aren't duplicated
                    // within 10 milliseconds
                    this.recentKeys.put(event.keyCode, 10);
                }
            }

            if (event.keyCode == KEY_CODES.ESC) {
                if (this.userMessage.text == "") {
                    this.setVisible(false);
                } else {
                    this.userMessage.text = "";
                }
            }
        });
    }

    listenForEnter() {
        this.chatInput = this.input.keyboard.on("keydown", (event) => {
            if (event.keyCode == KEY_CODES.ENTER) {
                this.setVisible(true);
            }
        });
    }

    disallowTyping() {
        if (this.chatInput != null) {
            this.chatInput.removeAllListeners();
        }
        this.userMessage.visible = false;
        this.listenForEnter();
    }
}
