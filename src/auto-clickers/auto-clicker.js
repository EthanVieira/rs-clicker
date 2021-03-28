import { autoclickerManifest } from "./auto-clicker-manifest.js";
import { CONSTANTS, OBJECT_TYPES } from "../constants/constants.js";

export async function getAutoclickerClass(className, scene) {
    let path = autoclickerManifest[className].classPath;
    let clickerClass = await import(path);

    return new clickerClass.default(scene);
}

export class AutoClicker {
    objectType = OBJECT_TYPES.AUTOCLICKER;
    name = "";
    examineText = "";
    cost = 0;
    dps = 0;
    level = 0;

    // Scenes
    scrollWindow;
    chat;
    dashboard;
    currentScene;
    stats;

    damageInterval = 0;
    timer = {};
    text = {};

    constructor(data) {
        this.scrollWindow = data.scene;
        this.examineText = data.examineText;
        this.cost = data.cost;
        this.dps = data.dps;
        this.level = data.level;
        this.name = data.name;
        this.dashboard = data.scene.scene.get(CONSTANTS.SCENES.DASHBOARD);

        // Damage every .1 seconds
        this.damageInterval = 100;
        this.timer = this.scrollWindow.time.addEvent({
            delay: this.damageInterval,
            callback: () => {
                this.clickTarget();
            },
            loop: true,
            paused: true,
        });
    }

    start(currentScene) {
        this.timer.paused = false;
        this.currentScene = currentScene;
        this.stats = currentScene.stats;

        this.stats.updateAutoClickerDPS(this.dps);
    }

    clickTarget() {
        let damagePerTick = this.dps * (this.damageInterval / 1000);
        this.currentScene.clickCurrentTarget(damagePerTick);
        this.stats.updateAutoClickDamageStat(damagePerTick);
    }

    createText(isShop = false, x = 0, y = 0) {
        this.text = this.scrollWindow.add
            .text(x, y, this.name, { font: "16px runescape" })
            .setDepth(4)
            .setInteractive()
            .setOrigin(0, 0)
            .on("pointerover", () => {
                this.examine(isShop);
            })
            .on("pointerout", () => {
                if (this.chat != undefined) {
                    this.chat.showObjectInfo(false);
                }
            })
            .on("pointerup", () => {
                if (isShop && this.dashboard.inventory.obj.getGold() >= this.cost) {
                    this.buy();
                }
            });
        this.displayHeight = this.text.displayHeight;
    }

    async buy() {
        this.dashboard.inventory.obj.addGold(-1 * this.cost);
        if (this.dashboard == undefined) {
            this.dashboard = this.scrollWindow.scene.get(CONSTANTS.SCENES.DASHBOARD);
        }
        let newMember = await getAutoclickerClass(this.name, this.dashboard);
        this.dashboard.clan.obj.addClanMember(newMember);
    }

    examine(isShop) {
        console.log(this.examineText);
        // Get chat scene
        if (this.chat == undefined) {
            this.chat = this.scrollWindow.scene.get(CONSTANTS.SCENES.CHAT);
        }
        this.chat.showObjectInfo(true, this, isShop);
    }

    setX(x) {
        if (this.text != undefined && this.text != null) {
            this.text.x = x;
        }
    }

    setY(y) {
        if (this.text != undefined && this.text != null) {
            this.text.y = y;
        }
    }

    setVisible(isVisible) {
        if (this.text != undefined && this.text != null) {
            this.text.visible = isVisible;
        }
    }

    destroy() {
        if (this.text != undefined && this.text != null) {
            this.text.destroy();
        }
        this.timer.destroy();
    }
}
