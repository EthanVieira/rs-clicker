import { CONSTANTS } from "../constants/constants.js";
import { Resource } from "../resource.js";
import { saveData } from "../save-data.js";

export class LevelScene extends Phaser.Scene {
    // General info that all levels should implement
    width = 0;
    height = 0;
    timeDelta = 0;

    background = {
        name: "",
        path: ""
    };

    minimap = {
        name: "",
        path: ""
    };

    inventory = {
        button: {}
    };

    skills = {
        button: {},
        panel: {}
    };

    audio = {
        bgm: "",
        audioPage: {},
        audioPageButton: {},
        sliders: [],
        audioButtons: []
    };

    // Click object: enemy, tree, etc.
    clickObjects = [];
    clickObjectMetaData = [];
    currentClickObjectIndex = 0;
    levelType = "";

    // Autoclickers
    autoClickers = [];
    autoClickDps = 0;

    // Character
    characterData = saveData;

    // Text
    goldText = "";
    enemiesKilledText;
    timesClickedText;
    damageByClickingText;
    autoClickDpsText;

    // Skill text
    attackText;
    rangedText;
    magicText;
    totalLevelText;

    constructor(data) {
        super({
            key: data.key
        });

        // Get data from child class
        this.background = data.background;
        this.minimap = data.minimap;
        this.audio = data.audio;
        this.clickObjectMetaData = data.clickObjects;

        // Store current level to return to after leaving shop
        this.currentLevel = data.key;
    }

    init(characterData) {
        // Always receive character class
        this.characterData.characterClass = characterData.characterClass;

        // Receive cookies if they exist
        if (characterData.hasCookies) {
            this.characterData = characterData;
        }
        // Otherwise, initialize character based on starting class
        else {
            switch (this.characterData.characterClass) {
                case "WARRIOR":
                    this.characterData.skills.attack = 5;
                    this.characterData.skills.strength = 5;
                    this.characterData.skills.defense = 5;
                    break;
                case "RANGER":
                    this.characterData.skills.ranged = 10;
                    break;
                case "MAGE":
                    this.characterData.skills.magic = 10;
                    break;
            }
        }
    }

    preload() {
        // Background
        this.load.image(this.background.name, this.background.path);

        // Minimap
        this.load.image(this.minimap.name, this.minimap.path);

        // Overlay
        this.load.image("overlay", "src/assets/ui/InterfaceNoChat.png");

        // Exit button
        this.load.image("exit-button", "src/assets/ui/buttons/ExitButton.png");

        // Click object (target)
        this.clickObjectMetaData.forEach(target => {
            this.load.image(target.name, target.path);
        });

        // Inventory icon
        this.load.image(
            "inventory-button",
            "src/assets/ui/buttons/InventoryButton.png"
        );

        // Skills panel
        this.load.image("skills-panel", "src/assets/ui/SkillsPanel.png");
        this.load.image(
            "skills-button",
            "src/assets/ui/buttons/SkillsButton.png"
        );

        // Audio panel
        this.load.image("audio-settings", "src/assets/ui/AudioSettings.png");
        this.load.image(
            "audio-settings-button",
            "src/assets/ui/buttons/AudioSettingsButton.png"
        );
        this.load.image(
            "audio-slider",
            "src/assets/ui/buttons/audioSlider.png"
        );
        this.load.image(
            "audio-button",
            "src/assets/ui/buttons/AudioButton.png"
        );

        // Classes
        this.load.image(
            CONSTANTS.CLASS.UNARMED,
            "src/assets/sprites/PlayerUnarmed.png"
        );
        this.load.image(
            CONSTANTS.CLASS.WARRIOR,
            "src/assets/sprites/PlayerWarrior.png"
        );
        this.load.image(
            CONSTANTS.CLASS.RANGER,
            "src/assets/sprites/PlayerRanger.png"
        );
        this.load.image(
            CONSTANTS.CLASS.MAGE,
            "src/assets/sprites/PlayerMage.jpg"
        );

        // Call preload function for inherited class
        if (this.levelType != "") {
            this.childPreload();
        }
    }

    create() {
        console.log(this.characterData.characterClass);

        // Set current level
        this.characterData.currentLevel = this.currentLevel;

        // Play music
        let audioScene = this.scene.get(CONSTANTS.SCENES.AUDIO);
        audioScene.playAudio(this.audio.bgm);

        // Initialize volume levels
        audioScene.changeVolume(0, this.characterData.audio[0]);
        audioScene.changeVolume(1, this.characterData.audio[1]);
        audioScene.changeVolume(2, this.characterData.audio[2]);

        // Helper vars
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        // Background
        this.add
            .image(0, 0, this.background.name)
            .setOrigin(0, 0)
            .setDepth(0);

        // Create click objects
        if (this.levelType != CONSTANTS.LEVEL_TYPE.ENEMY) {
            this.clickObjectMetaData.forEach(clickObject => {
                this.clickObjects.push(
                    new Resource({
                        scene: this,
                        x: this.width / 2 - 100,
                        y: this.height / 2 - 150,
                        neededClicks: clickObject.neededClicks,
                        name: clickObject.name,
                        resourceType: clickObject.resourceType
                    })
                );
            });
        }

        // Minimap
        this.minimap.obj = this.add
            .image(526, 0, this.minimap.name)
            .setOrigin(0, 0)
            .setDepth(0);
        this.minimap.obj.setInteractive();
        this.minimap.obj.on("pointerup", () => {
            // Release autoclickers to be garbage collected
            this.clearAutoClickers();
            this.scene.start(CONSTANTS.SCENES.MAP, this.characterData);
            console.log("Going to World Map");
        });

        // Shop
        this.shopButton = this.add.text(585, 475, "Shop").setInteractive();
        this.shopButton.on("pointerup", () => {
            // Release autoclickers to be garbage collected
            this.clearAutoClickers();
            // Pass in the current level to know which level to return to upon exiting the shop.
            this.scene.start(CONSTANTS.SCENES.SHOP, [
                this.characterData,
                this.currentLevel
            ]);
            // TODO: Instead of starting a shop scene, just have a shop interface pop up w/o stopping game.
            console.log("Going to Shop");
        });

        // Overlay
        this.add
            .image(0, 0, "overlay")
            .setOrigin(0, 0)
            .setDepth(1);

        // Exit button
        let exitButton = this.add
            .image(this.width - 30, 0, "exit-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive();
        exitButton.on("pointerup", () => {
            this.clearAutoClickers();
            audioScene.playAudio("scape-main");
            this.scene.start(CONSTANTS.SCENES.MAIN_MENU, this.characterData);
        });

        // Inventory
        this.inventory.button = this.add
            .image(626, 168, "inventory-button")
            .setOrigin(0, 0)
            .setDepth(2);
        this.inventory.button.setInteractive();
        this.inventory.button.setAlpha(0.1);
        this.inventory.button.on("pointerup", () => {
            this.hideAllMenus();
            this.inventory.button.setAlpha(0.1);
        });

        // Skills
        this.skills.panel = this.add
            .image(548, 208, "skills-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.skills.button = this.add
            .image(560, 168, "skills-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive();
        this.skills.button.on("pointerup", () => {
            this.showSkills(true);
        });
        // Hide skills page on startup
        this.showSkills(false);

        // Skills text
        this.attackText = this.add
            .text(585, 215, "", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.rangedText = this.add
            .text(585, 310, "", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);
        this.magicText = this.add
            .text(585, 375, "", {fontSize: "12px"})
            .setOrigin(.5)
            .setDepth(2);

        // Audio settings
        let audioWindowX = 550;
        let audioWindowY = 205;
        this.audio.audioPage = this.add
            .image(audioWindowX, audioWindowY, "audio-settings")
            .setOrigin(0, 0)
            .setDepth(1);
        this.audio.audioPageButton = this.add
            .image(660, 465, "audio-settings-button")
            .setOrigin(0, 0)
            .setDepth(2);
        this.audio.audioPageButton.setInteractive();
        this.audio.audioPageButton.on("pointerup", () => {
            this.showAudioSettings(true);
        });

        // Place sliders
        let barXOffset = 53;
        this.audio.sliders = [];
        this.audio.sliders.push(
            this.add
                .image(
                    audioWindowX + barXOffset,
                    audioWindowY + 80,
                    "audio-slider"
                )
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.audio.sliders.push(
            this.add
                .image(
                    audioWindowX + barXOffset,
                    audioWindowY + 125,
                    "audio-slider"
                )
                .setOrigin(0, 0)
                .setDepth(2)
        );
        this.audio.sliders.push(
            this.add
                .image(
                    audioWindowX + barXOffset,
                    audioWindowY + 170,
                    "audio-slider"
                )
                .setOrigin(0, 0)
                .setDepth(2)
        );

        // Set 5 buttons for each of the 3 sliders
        this.audio.audioButtons = [];
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
                    .setDepth(3);
                audioButton.setInteractive();
                audioButton.setAlpha(0.1);
                audioButtonRow.push(audioButton);
                audioButton.on("pointerup", () => {
                    audioScene.changeVolume(volumeType, buttonNum);
                    this.changeAudioButton(volumeType, buttonNum);
                });
            }
            // Save 2d array of buttons (3 x 5)
            this.audio.audioButtons.push(audioButtonRow);
        }
        // Hide audio page on startup
        this.showAudioSettings(false);

        // Class picture
        this.add
            .image(0, 250, this.characterData.characterClass)
            .setOrigin(0, 0)
            .setDepth(2);

        // Gold
        this.goldText = this.add
            .text(20, 20, "Gold: " + this.characterData.gold, {
                fill: "gold",
                fontSize: "30px"
            })
            .setDepth(3);

        // Show stats
        let statColor = "white";
        this.enemiesKilledText = this.add
            .text(
                20,
                60,
                "Enemies killed: " + this.characterData.totalEnemiesKilled,
                { fill: statColor }
            )
            .setDepth(3);
        this.timesClickedText = this.add
            .text(20, 75, "Times clicked: " + this.characterData.timesClicked, {
                fill: statColor
            })
            .setDepth(3);
        this.damageByClickingText = this.add
            .text(
                20,
                90,
                "Damage done by clicking: " +
                    this.characterData.damageByClicking,
                { fill: statColor }
            )
            .setDepth(3);
        this.damageByAutoClickText = this.add
            .text(
                20,
                105,
                "Damage done by autoclickers: " +
                    this.characterData.damageByAutoClick,
                { fill: statColor }
            )
            .setDepth(3);

        // Call create function for inherited class
        if (this.levelType != "") {
            this.childCreate();
        }

        // Display click object
        this.showRandomClickObject();
    }

    update(time, delta) {
        // Update cookies every second
        if (this.timeDelta >= 1000) {
            this.storeCookies();
            this.timeDelta = 0;
        } else {
            this.timeDelta += delta;
        }
    }

    storeCookies() {
        this.characterData.hasCookies = true;

        // Lasts for one year
        let dateTime = new Date();
        dateTime.setTime(dateTime.getTime() + CONSTANTS.UTILS.MILLIS_IN_YEAR);
        let expireString = "expires=" + dateTime.toUTCString();

        // Turn characterData into a json string and store it in a cookie
        let jsonString = JSON.stringify(this.characterData);
        document.cookie =
            "characterData=" + jsonString + ";" + expireString + ";path=/;";
    }

    addGold(addedGold) {
        this.characterData.gold += addedGold;
        this.goldText.text = "Gold: " + this.characterData.gold;
    }

    updateClickedEnemyStat() {
        this.characterData.timesClicked++;
        this.timesClickedText.text =
            "Times clicked: " + this.characterData.timesClicked;
    }

    updateClickDamageStat(damageDone) {
        // Increase click damage
        this.characterData.damageByClicking += damageDone;
        this.damageByClickingText.text =
            "Damage done by clicking: " + this.characterData.damageByClicking;

        // Increase attack XP
        switch(this.characterData.characterClass) {
            case CONSTANTS.CLASS.MAGE:
                this.characterData.skills.magic += damageDone;
                break;
            case CONSTANTS.CLASS.RANGER:
                this.characterData.skills.ranged += damageDone;
                break;
            case CONSTANTS.CLASS.WARRIOR:
                this.characterData.skills.attack += damageDone;
                break;
        }

        this.updateSkillsText();
    }

    updateAutoClickDamageStat(damageDone) {
        this.characterData.damageByAutoClick += damageDone;
        this.damageByAutoClickText.text =
            "Damage done by autoclickers: " +
            Math.floor(this.characterData.damageByAutoClick);
    }

    showSkills(show) {
        if (show) {
            this.hideAllMenus();

            // Show skills panel
            this.skills.panel.visible = true;
            this.skills.button.setAlpha(1);
        } 
        else {
            this.skills.panel.visible = false;
            this.skills.button.setAlpha(0.1);
        }
    }

    showAudioSettings(show) {
        if (show) {
            this.hideAllMenus();

            // Show audio page
            this.audio.audioPage.visible = true;
            this.audio.audioPageButton.setAlpha(1);
            this.audio.sliders.forEach(slider => {
                slider.visible = true;
            });
            this.audio.audioButtons.forEach(buttonRow => {
                buttonRow.forEach(button => {
                    button.visible = true;
                });
            });

            // Show current volume buttons
            this.characterData.audio.forEach((volume, volumeType) => {
                this.audio.audioButtons[volumeType][volume].setAlpha(1);
            });
        } 
        else {
            this.audio.audioPage.visible = false;
            this.audio.audioPageButton.setAlpha(0.1);
            this.audio.sliders.forEach(slider => {
                slider.visible = false;
            });
            this.audio.audioButtons.forEach(buttonRow => {
                buttonRow.forEach(button => {
                    button.visible = false;
                });
            });
        }
    }

    // Hide old button and show new one
    changeAudioButton(volumeType, newButton) {
        let previousVolume = this.characterData.audio[volumeType];
        this.audio.audioButtons[volumeType][previousVolume].setAlpha(0.1);
        this.characterData.audio[volumeType] = newButton;
        this.audio.audioButtons[volumeType][newButton].setAlpha(1);
    }

    hideAllMenus() {
        this.showAudioSettings(false);
        this.showSkills(false);
        this.inventory.button.setAlpha(1); // Unselected inventory icon
    }

    showRandomClickObject() {
        this.clickObjects[this.currentClickObjectIndex].hide();
        this.currentClickObjectIndex = Math.floor(
            Math.random() * this.clickObjectMetaData.length
        );
        this.clickObjects[this.currentClickObjectIndex].show();
    }

    updateAutoClickerDPS(dps) {
        this.autoClickDps += dps;
        this.autoClickDpsText.text = "AutoClicker DPS: " + this.autoClickDps;
    }

    // Used by autoclicker
    clickCurrentTarget(damage) {
        this.clickObjects[this.currentClickObjectIndex].damageEnemy(damage);
    }

    // Need to clear data before changing scenes
    clearAutoClickers() {
        for (let i = 0; i < this.autoClickers.length; i++) {
            this.autoClickers[i].release();
        }
        this.autoClickers = [];
        this.clickObjects = [];
    }

    updateSkillsText() {
        // Attack
        let level = this.calcLevel(this.characterData.skills.attack, 1);
        this.attackText.text = level;

        // Ranged
        level = this.calcLevel(this.characterData.skills.ranged, 1);
        this.rangedText.text = level;

        // Magic
        level = this.calcLevel(this.characterData.skills.magic, 1);
        this.magicText.text = level;
    }

    calcLevel(xp, lv) {
        let currLvXp = 75*(Math.pow(1.104, lv-1));
        if (xp > currLvXp) {
            return (this.calcLevel(xp - currLvXp, lv+1));
        }
        else {
            return lv;
        }
    }
}
