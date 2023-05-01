import { CONSTANTS } from "../constants/constants.js";
import { Button } from "./button.js";
import { characterData } from "../cookie-io.js";
import { Inventory } from "./panels/inventory.js";
import { Equipment } from "./panels/equipment.js";
import { Clan } from "./panels/clan.js";
import { Skills } from "./panels/skills.js";
import { Quests } from "./panels/quests.js";
import { MusicPanel } from "./panels/music.js";
import { Prayer } from "./panels/prayer.js";
import { Settings } from "./panels/settings.js";
import { AttackStyle } from "./panels/attack-style.js";
import { Friends } from "./panels/friends.js";

export class DashboardScene extends Phaser.Scene {
    currentScene;
    currentLevel = "";
    currentPanel = "";

    // Panels
    attackStyle;
    inventory;
    skills;
    prayer;
    settings;
    quests;
    equipment;
    clan;
    music;
    friends;

    xpCounterOn = true;
    xpCounterOnButton;

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

        // XP Counter
        this.xpCounterOnButton = this.add
            .image(517, 19, "xp-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                if (this.xpCounterOn) {
                    console.log("Toggling xp counter off");
                    this.xpCounterOnButton.setVisible(false);
                    this.xpCounterOn = false;
                }
            });

        let xpCounterOffButton = new Button(this, 517, 19, 27, 35);
        xpCounterOffButton.on("pointerdown", () => {
            if (!this.xpCounterOn) {
                console.log("Toggling xp counter on");
                this.xpCounterOnButton.setVisible(true);
                this.xpCounterOn = true;
            }
        });

        // Panels
        // TODO inventory can't be destroyed with dashboard like others because it's needed when you buy items
        this.inventory?.destroy();
        this.inventory = new Inventory(this);
        this.skills = new Skills(this);
        this.prayer = new Prayer(this);
        this.settings = new Settings(this); // Just audio for now
        this.quests = new Quests(this);
        this.equipment = new Equipment(this);
        this.clan = new Clan(this);
        this.music = new MusicPanel(this);
        this.attackStyle = new AttackStyle(this);
        this.friends = new Friends(this);
    }

    update(time, delta) {
        this.music.update();
    }

    hideAllMenus() {
        this.settings.setVisible(false);
        this.skills.setVisible(false);
        this.prayer.setVisible(false);
        this.quests.setVisible(false);
        this.equipment.setVisible(false);
        this.clan.setVisible(false);
        this.music.setVisible(false);
        this.inventory.setVisible(false);
        this.attackStyle.setVisible(false);
        this.friends.setVisible(false);
    }
}
