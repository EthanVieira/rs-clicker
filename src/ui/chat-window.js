import { OBJECT_TYPES, CONSTANTS, FONTS } from "../constants/constants.js";

export class ChatScene extends Phaser.Scene {
    // Used for all object types
    chatWindow;
    shopChatWindow;
    objNameText;
    objExamineText;
    welcomeText;
    row2Header;
    row2Text;

    // Equipment
    itemStatHeaders;
    itemStatLabels = [];
    itemStatText = {};

    // Enemies
    enemyStatHeaders;
    enemyStatLabels = [];
    enemyStatText = {};

    constructor() {
        super({ key: CONSTANTS.SCENES.CHAT });
    }

    init(characterData) {
        this.characterData = characterData;
    }

    preload() {
        this.load.image("chat-window", "src/assets/ui/ChatWindow.png");
        this.load.image("shop-chat-window", "src/assets/ui/ShopChatWindow.png");
    }

    create() {
        // Chat window for examining items
        this.chatWindow = this.add
            .image(0, 338, "chat-window")
            .setOrigin(0, 0)
            .setDepth(0);
        this.shopChatWindow = this.add
            .image(0, 338, "shop-chat-window")
            .setOrigin(0, 0)
            .setDepth(0);

        // Setup table dimensions
        let tableStartX = 140;
        let tableStartY = 380;
        let tableWidth = 70;
        let tableHeight = 16;

        // General info
        this.objNameText = this.add.text(10, tableStartY - 32, "", FONTS.ITEM_HEADER);
        this.objExamineText = this.add.text(
            tableStartX,
            tableStartY - 32,
            "",
            FONTS.ITEM_STATS
        );

        // Welcome text
        this.welcomeText = this.add.text(
            10,
            441,
            "Welcome to RS Clicker",
            FONTS.ITEM_HEADER
        );

        //
        // Items
        //

        this.row2Header = this.add.text(
            10,
            tableStartY - 16,
            "Sells for:",
            FONTS.ITEM_HEADER
        );
        this.row2Text = this.add.text(
            tableStartX,
            tableStartY - 16,
            "",
            FONTS.ITEM_STATS
        );

        //
        // Equipment
        //

        // Stat headers
        let text = "Accuracy Bonuses:\nDefense Bonuses:\nDamage Bonuses:";
        this.itemStatHeaders = this.add.text(10, tableStartY, text, FONTS.ITEM_HEADER);

        // Column labels
        let labels = [
            "Stab\nStab\nMelee",
            "Slash\nSlash\nPrayer",
            "Crush\nCrush",
            "Magic\nMagic\nMagic",
            "Ranged\nRanged\nRanged",
        ];
        labels.forEach((header, index) => {
            this.itemStatLabels[index] = this.add.text(
                tableStartX + tableWidth * index,
                tableStartY,
                header,
                FONTS.ITEM_STATS
            );
        });

        // Variable names in the item class
        let itemStats = [
            "stabBonus",
            "slashBonus",
            "crushBonus",
            "magicBonus",
            "rangedBonus",
            "stabDefenseBonus",
            "slashDefenseBonus",
            "crushDefenseBonus",
            "magicDefenseBonus",
            "rangedDefenseBonus",
            "strengthBonus",
            "prayerBonus",
            "",
            "magicStrengthBonus",
            "rangedStrengthBonus",
        ];

        // Create text fields for the stat values
        itemStats.forEach((varName, index) => {
            if (varName != "") {
                let column = index % 5;
                let row = Math.floor(index / 5);
                this.itemStatText[varName] = this.add.text(
                    tableStartX + 50 + tableWidth * column,
                    tableStartY + tableHeight * row,
                    "0",
                    FONTS.ITEM_STATS
                );
            }
        });

        //
        // Enemies
        //

        // Stat headers
        text = "Levels:\nAccuracy Bonuses:\nDamage Bonuses:\nDefense Bonuses:";
        this.enemyStatHeaders = this.add.text(10, tableStartY, text, FONTS.ITEM_HEADER);

        // Column labels
        labels = [
            "Attack\nMelee\nMelee\nStab",
            "Strength\n\n\nSlash",
            "Defense\n\n\nCrush",
            "Magic\nMagic\nMagic\nMagic",
            "Ranged\nRanged\nRanged\nMagic",
        ];
        labels.forEach((header, index) => {
            this.enemyStatLabels[index] = this.add.text(
                tableStartX + tableWidth * index,
                tableStartY,
                header,
                FONTS.ITEM_STATS
            );
        });

        // Variable names in the enemy class
        let enemyStats = [
            "attack",
            "strength",
            "defense",
            "magic",
            "ranged",
            "attackBonus",
            "",
            "",
            "magicBonus",
            "rangedBonus",
            "strengthBonus",
            "",
            "",
            "magicStrengthBonus",
            "rangedStrengthBonus",
            "stabDefense",
            "slashDefense",
            "crushDefense",
            "magicDefense",
            "rangedDefense",
        ];

        // Create text fields for the stat values
        enemyStats.forEach((varName, index) => {
            if (varName != "") {
                let column = index % 5;
                let row = Math.floor(index / 5);
                this.enemyStatText[varName] = this.add.text(
                    tableStartX + 55 + tableWidth * column,
                    tableStartY + tableHeight * row,
                    "0",
                    FONTS.ITEM_STATS
                );
            }
        });

        this.hideObjectInfo();
    }

    hideObjectInfo() {
        for (let varName in this.itemStatText) {
            this.itemStatText[varName].visible = false;
        }
        this.itemStatLabels.forEach((label) => {
            label.visible = false;
        });
        for (let varName in this.enemyStatText) {
            this.enemyStatText[varName].visible = false;
        }
        this.enemyStatLabels.forEach((label) => {
            label.visible = false;
        });
        this.objExamineText.visible = false;
        this.objNameText.visible = false;
        this.row2Header.visible = false;
        this.row2Text.visible = false;
        this.itemStatHeaders.visible = false;
        this.enemyStatHeaders.visible = false;
        this.chatWindow.visible = false;
        this.shopChatWindow.visible = false;
        this.welcomeText.visible = false;
    }

    // Show object info in chat window
    showObjectInfo(isVisible, object = false, isShop = false) {
        // Hide all text
        this.hideObjectInfo();

        // Show name, description, and stats from object
        if (object && isVisible) {
            // Show name and description for all
            this.objNameText.text = object.name;
            this.objNameText.visible = true;
            this.objExamineText.text = object.examineText;
            this.objExamineText.visible = true;
            this.welcomeText.visible = true;

            // Load bigger window on shop scene
            if (isShop) {
                this.shopChatWindow.visible = true;
            } else {
                this.chatWindow.visible = true;
            }

            // Show different things for different types of objects
            switch (object.objectType) {
                case OBJECT_TYPES.EQUIPMENT:
                    // Headers
                    this.itemStatHeaders.visible = true;

                    // Labels
                    this.itemStatLabels.forEach((label) => {
                        label.visible = true;
                    });

                    // Stat values
                    for (let varName in this.itemStatText) {
                        this.itemStatText[varName].text = object[varName];
                        this.itemStatText[varName].visible = true;
                    }
                case OBJECT_TYPES.ITEM:
                    // Get cost/sale price
                    if (isShop) {
                        this.row2Header.text = "Cost:";
                        this.row2Text.text = object.cost + "gp";
                    } else {
                        this.row2Header.text = "Sells for:";
                        this.row2Text.text = Math.floor(object.cost / 2) + "gp";
                    }

                    this.row2Header.visible = true;
                    this.row2Text.visible = true;
                    break;
                case OBJECT_TYPES.ENEMY:
                    // Headers
                    this.enemyStatHeaders.visible = true;

                    // Labels
                    this.enemyStatLabels.forEach((label) => {
                        label.visible = true;
                    });

                    // Stat values
                    for (let varName in this.enemyStatText) {
                        this.enemyStatText[varName].text = object[varName];
                        this.enemyStatText[varName].visible = true;
                    }

                    this.row2Header.text = "HP:";
                    this.row2Text.text = object.maxHealth;
                    break;
                case OBJECT_TYPES.AUTOCLICKER:
                    this.row2Header.text = "Cost:";
                    this.row2Text.text = object.cost + "gp";
                    this.row2Header.visible = true;
                    this.row2Text.visible = true;
                    break;
            }
        }
    }
}
