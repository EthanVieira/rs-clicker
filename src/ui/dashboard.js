import { CONSTANTS, FONTS } from "../constants/constants.js";
import { Inventory } from "./inventory.js";
import { Equipment } from "./equipment.js";
import { Clan } from "./clan.js";
import { Skills } from "./skills.js";
import { Button } from "./button.js";
import { characterData } from "../cookie-io.js";
import { QuestList } from "./quest-list.js";
import { MusicPanel } from "./music.js";

export class DashboardScene extends Phaser.Scene {
    currentScene;
    currentLevel = "";
    currentPanel = "";

    inventory = {};
    skills = {};

    prayer = {
        button: {},
        panel: {},
        maxPrayerText: "",
        curPrayerText: "",
    };

    audio = {
        bgm: "",
        page: {},
        pageButton: {},
        sliders: [],
        buttons: [],
        scene: {},
    };

    quests = {
        button: {},
        panel: {},
        list: {},
    };

    equipment = {
        button: {},
        panel: {},
        obj: {},
    };

    clan = {
        button: {},
        panel: {},
        obj: {},
    };

    musicPanel = {};

    // Hotbar
    prayerHotbarText;

    constructor() {
        super({ key: CONSTANTS.SCENES.DASHBOARD });
    }

    create() {
        // Get audio scene
        this.audio.scene = this.scene.get(CONSTANTS.SCENES.AUDIO);

        // Get current scene
        this.currentScene = this.scene.get(characterData.getCurrentLevel());

        // Disable right click popup
        this.input.mouse.disableContextMenu();

        // Inventory
        // Clear out and reinstantiate inventory
        if (Object.entries(this.inventory).length) {
            this.inventory.destroy();
        }
        this.inventory = new Inventory(this);
        this.inventory.show(true);

        // Shop
        let shopButton = new Button(this, 595, 466, 33, 35);
        shopButton.on("pointerup", () => {
            console.log("Going to Shop");
            this.currentScene.scene.start(CONSTANTS.SCENES.SHOP);
        });

        // Logout
        let logoutButton = new Button(this, 630, 466, 27, 35);
        logoutButton.on("pointerup", () => {
            console.log("Going to main menu");
            this.currentScene.scene.start(CONSTANTS.SCENES.MAIN_MENU);
        });

        // Skills
        this.skills = new Skills(this);

        // Prayer
        this.prayer.panel = this.add
            .image(548, 205, "prayer-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.prayer.button = this.add
            .image(692, 168, "prayer-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.showPrayer(true);
            });
        this.prayer.curPrayerText = this.add
            .text(630, 441, "1", FONTS.PRAYER)
            .setOrigin(0.5)
            .setDepth(3);
        this.prayer.maxPrayerText = this.add
            .text(646, 441, "1", FONTS.PRAYER)
            .setOrigin(0.5)
            .setDepth(3);
        this.showPrayer(false);

        // Audio settings
        let audioWindowX = 550;
        let audioWindowY = 205;
        this.audio.page = this.add
            .image(audioWindowX, audioWindowY, "audio-settings")
            .setOrigin(0, 0)
            .setDepth(1);
        this.audio.pageButton = this.add
            .image(659, 466, "audio-settings-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.showAudioSettings(true);
            });

        // Place sliders
        let barXOffset = 53;
        this.audio.sliders = [];
        this.audio.sliders.push(
            this.add
                .image(audioWindowX + barXOffset, audioWindowY + 80, "audio-slider")
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.audio.sliders.push(
            this.add
                .image(audioWindowX + barXOffset, audioWindowY + 125, "audio-slider")
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.audio.sliders.push(
            this.add
                .image(audioWindowX + barXOffset, audioWindowY + 170, "audio-slider")
                .setOrigin(0, 0)
                .setDepth(2)
        );

        // Set 5 buttons for each of the 3 sliders
        this.audio.buttons = [];
        for (let volumeType = 0; volumeType < 3; volumeType++) {
            let audioButtonRow = [];
            for (let buttonNum = 0; buttonNum < 5; buttonNum++) {
                let audioButton = this.add
                    .image(
                        audioWindowX + barXOffset + 10 + buttonNum * 22,
                        audioWindowY + 80 + volumeType * 45,
                        "audio-button"
                    )
                    .setOrigin(0, 0)
                    .setDepth(3)
                    .setInteractive()
                    .setAlpha(0.1)
                    .on("pointerdown", () => {
                        this.changeAudioButton(volumeType, buttonNum);
                    });

                audioButtonRow.push(audioButton);
            }
            // Save 2d array of buttons (3 x 5)
            this.audio.buttons.push(audioButtonRow);
        }
        // Hide audio page on startup
        this.showAudioSettings(false);

        // Quests
        this.quests.panel = this.add
            .image(548, 208, "quests-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.quests.button = this.add
            .image(592, 168, "quests-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.showQuests(true);
            });

        this.quests.list = new QuestList(this);
        this.showQuests(false);

        // Equipment
        this.equipment.panel = this.add
            .image(548, 204, "equipment-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.equipment.button = this.add
            .image(659, 168, "equipment-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.showEquipment(true);

                this.equipment.obj.showEquipment(true);
            });

        // Clear out and reinstantiate equipment
        if (Object.entries(this.equipment.obj).length) {
            this.equipment.obj.destroy();
        }
        this.equipment.obj = new Equipment(this);
        this.showEquipment(false);

        // Clan chat
        this.clan.panel = this.add
            .image(550, 204, "clan-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.clan.button = this.add
            .image(522, 466, "clan-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.showClanChat(true);
            });

        // Clear out and reinstatiate clan members
        if (Object.entries(this.clan.obj).length) {
            this.clan.obj.destroy();
        }
        this.clan.obj = new Clan(this);
        this.showClanChat(false);

        // Music
        // Clear out and reinstatiate songs
        if (Object.entries(this.musicPanel).length) {
            this.musicPanel.destroy();
        }
        this.musicPanel = new MusicPanel(this);
        this.musicPanel.show(false);

        // Scene destructor
        this.events.once("shutdown", () => {
            this.scene.remove(this.clan.obj.scrollWindow.name);
            this.scene.remove(this.quests.list.scrollWindow.name);
        });
    }

    update(time, delta) {
        this.musicPanel.update();
    }

    showPrayer(isVisible) {
        if (isVisible) {
            this.hideAllMenus();
            this.prayer.button.setAlpha(1);
            this.currentPanel = CONSTANTS.PANEL.PRAYER;
        } else {
            this.prayer.button.setAlpha(0.1);
        }

        // Show/hide panel
        this.prayer.panel.visible = isVisible;
        this.prayer.curPrayerText.visible = isVisible;
        this.prayer.maxPrayerText.visible = isVisible;
    }

    showEquipment(isVisible) {
        if (isVisible) {
            this.hideAllMenus();
            this.equipment.button.setAlpha(1);
            this.currentPanel = CONSTANTS.PANEL.EQUIPMENT;
        } else {
            this.equipment.button.setAlpha(0.1);
        }

        this.equipment.panel.visible = isVisible;
    }

    showAudioSettings(isVisible) {
        if (isVisible) {
            this.hideAllMenus();
            this.currentPanel = CONSTANTS.PANEL.SETTINGS;
            this.audio.pageButton.setAlpha(1);

            // Show current volume buttons
            for (let i = 0; i < 3; i++) {
                this.audio.buttons[i][characterData.getVolume(i)].setAlpha(1);
            }
        } else {
            this.audio.pageButton.setAlpha(0.1);
        }

        this.audio.page.visible = isVisible;
        this.audio.sliders.forEach((slider) => {
            slider.visible = isVisible;
        });
        this.audio.buttons.forEach((buttonRow) => {
            buttonRow.forEach((button) => {
                button.visible = isVisible;
            });
        });
    }

    showQuests(isVisible) {
        if (isVisible) {
            this.hideAllMenus();
            this.quests.button.setAlpha(1);
            this.currentPanel = CONSTANTS.PANEL.QUESTS;
        } else {
            this.quests.button.setAlpha(0.1);
        }

        this.quests.list.show(isVisible);
        this.quests.panel.visible = isVisible;
    }

    showClanChat(isVisible) {
        if (isVisible) {
            this.hideAllMenus();
            this.clan.button.setAlpha(1);
            this.currentPanel = CONSTANTS.PANEL.CLAN;
        } else {
            this.clan.button.setAlpha(0.1);
        }

        this.clan.obj.show(isVisible);
        this.clan.panel.visible = isVisible;
    }

    // Hide old button and show new one
    changeAudioButton(volumeType, buttonNum) {
        for (let button in this.audio.buttons[volumeType]) {
            this.audio.buttons[volumeType][button].setAlpha(0.1);
        }
        this.audio.buttons[volumeType][buttonNum].setAlpha(1);

        this.audio.scene.changeVolume(volumeType, buttonNum);
    }

    hideAllMenus() {
        this.showAudioSettings(false);
        this.skills.show(false);
        this.showPrayer(false);
        this.showQuests(false);
        this.showEquipment(false);
        this.showClanChat(false);
        this.musicPanel.show(false);
        this.equipment.obj.showEquipment(false);
        this.inventory.show(false);
    }
}
