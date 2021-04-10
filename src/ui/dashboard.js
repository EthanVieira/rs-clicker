import { CONSTANTS, FONTS } from "../constants/constants.js";
import { Inventory } from "./inventory.js";
import { Equipment } from "./equipment.js";
import { Clan } from "./clan.js";
import { Skills } from "./skills.js";
import { Button } from "./button.js";
import { characterData } from "../cookie-io.js";
import { QuestList } from "./quest-list.js";
import { MusicPanel } from "./music.js";
import { Prayer } from "./prayer.js";
import { Settings } from "./settings.js";

export class DashboardScene extends Phaser.Scene {
    currentScene;
    currentLevel = "";
    currentPanel = "";

    inventory = {};
    skills = {};
    prayer = {};
    settings = {};
    quests = {};
    equipment = {};
    clan = {};

    musicPanel = {};

    constructor() {
        super({ key: CONSTANTS.SCENES.DASHBOARD });
    }

    create() {
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
        this.prayer = new Prayer(this);

        // Settings (just audio for now)
        this.settings = new Settings(this);

        // Quests
        this.quests = new QuestList(this);

        // Equipment
        // Clear out and reinstantiate equipment
        if (Object.entries(this.equipment).length) {
            this.equipment.destroy();
        }
        this.equipment = new Equipment(this);

        // Clan chat
        // Clear out and reinstatiate clan members
        if (Object.entries(this.clan).length) {
            this.clan.destroy();
        }
        this.clan = new Clan(this);

        // Music
        // Clear out and reinstatiate songs
        if (Object.entries(this.musicPanel).length) {
            this.musicPanel.destroy();
        }
        this.musicPanel = new MusicPanel(this);
    }

    update(time, delta) {
        this.musicPanel.update();
    }

    hideAllMenus() {
        this.settings.show(false);
        this.skills.show(false);
        this.prayer.show(false);
        this.quests.show(false);
        this.equipment.show(false);
        this.clan.show(false);
        this.musicPanel.show(false);
        this.inventory.show(false);
    }
}
