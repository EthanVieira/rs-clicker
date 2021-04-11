import { CONSTANTS } from "../constants/constants.js";
import { Button } from "./button.js";
import { characterData } from "../cookie-io.js";
import { Inventory } from "./panels/inventory.js";
import { Equipment } from "./panels/equipment.js";
import { Clan } from "./panels/clan.js";
import { Skills } from "./panels/skills.js";
import { QuestList } from "./panels/quest-list.js";
import { MusicPanel } from "./panels/music.js";
import { Prayer } from "./panels/prayer.js";
import { Settings } from "./panels/settings.js";

export class DashboardScene extends Phaser.Scene {
    currentScene;
    currentLevel = "";
    currentPanel = "";

    // Panels
    inventory;
    skills;
    prayer;
    settings;
    quests;
    equipment;
    clan;
    music;

    constructor() {
        super({ key: CONSTANTS.SCENES.DASHBOARD });
    }

    create() {
        // Get current scene
        this.currentScene = this.scene.get(characterData.getCurrentLevel());

        // Disable right click popup
        this.input.mouse.disableContextMenu();

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

        // Panels
        // TODO inventory can't be destroyed with dashboard like others because it's needed when you buy items
        this.inventory?.destroy();
        this.inventory = new Inventory(this);
        this.skills = new Skills(this);
        this.prayer = new Prayer(this);
        this.settings = new Settings(this); // Just audio for now
        this.quests = new QuestList(this);
        this.equipment = new Equipment(this);
        this.clan = new Clan(this);
        this.music = new MusicPanel(this);
    }

    update(time, delta) {
        this.music.update();
    }

    hideAllMenus() {
        this.settings.show(false);
        this.skills.show(false);
        this.prayer.show(false);
        this.quests.show(false);
        this.equipment.show(false);
        this.clan.show(false);
        this.music.show(false);
        this.inventory.show(false);
    }
}
