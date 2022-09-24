import { autoclickerManifest } from "./auto-clicker-manifest.js";
import { CONSTANTS, OBJECT_TYPES } from "../constants/constants.js";

export async function getAutoclickerClass(className, scene) {
    let path = autoclickerManifest[className].classPath;
    let clickerClass = await import(path);
    if (clickerClass) {
        return new clickerClass.default(scene);
    } else {
        console.log(
            "Invalid autoclicker name in getAutoclickerClass - returning null.",
            className
        );
        return null;
    }
}

export class AutoClicker {
    objectType = OBJECT_TYPES.AUTOCLICKER;
    name = "";
    examineText = "";
    cost = 0;
    dps = 0;
    level = 0;
    numberOwned = 0;

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
        this.numberOwned = data.numberOwned;

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
        // Crafting levels (furnace, anvil, etc.) can't use auto clickers
        if (
            currentScene.levelType != CONSTANTS.LEVEL_TYPE.CRAFTING &&
            currentScene.levelType != CONSTANTS.LEVEL_TYPE.SMITHING
        ) {
            this.timer.paused = false;
            this.currentScene = currentScene;
            this.stats = currentScene.stats;

            this.stats.updateAutoClickerDPS(this.dps * this.numberOwned);
        }
    }

    clickTarget() {
        let damagePerTick = this.dps * (this.damageInterval / 1000) * this.numberOwned;
        this.currentScene.clickCurrentTarget(damagePerTick);
        this.stats.updateAutoClickDamageStat(damagePerTick);
    }

    createText(isShop = false, x = 0, y = 0) {
        this.text = this.scrollWindow.add
            .text(
                x,
                y,
                isShop ? this.name : this.name + " x" + this.numberOwned.toString(),
                {
                    font: "16px runescape",
                }
            )
            .setDepth(4)
            .setInteractive()
            .setOrigin(0, 0)
            .on("pointerover", () => {
                this.examine(isShop);
            })
            .on("pointerout", () => {
                if (this.chat != undefined) {
                    // TODO: don't make chatbox close when pointerout
                    this.chat.showObjectInfo(false);
                }
            })
            .on("pointerup", () => {
                if (isShop && this.dashboard.inventory.getGold() >= this.cost) {
                    this.buy();
                }
            });
        this.displayHeight = this.text.displayHeight;
    }

    async buy() {
        if (this.dashboard == undefined) {
            this.dashboard = this.scrollWindow.scene.get(CONSTANTS.SCENES.DASHBOARD);
        }
        this.dashboard.inventory.addGold(-1 * this.cost);
        this.dashboard.clan.addClanMember(this.name);
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
