import { CONSTANTS } from "../constants/constants.js";
import { Resource } from "../resource.js";
import { defaultData } from "../default-data.js";

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

    // Click object: enemy, tree, etc.
    clickObjects = [];
    clickObjectMetaData = [];
    currentClickObjectIndex = 0;
    levelType = "";

    // Autoclickers
    autoClickers = [];
    autoClickDps = 0;

    // Character
    characterData;

    // Dashboard for inventory, etc.
    dashboard;

    // Text
    goldText = "";
    enemiesKilledText;
    timesClickedText;
    damageByClickingText;
    autoClickDpsText;

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
        // Receive cookies if they exist
        if (characterData.hasCookies) {
            this.characterData = characterData;
        }
        // Otherwise, initialize character based on starting class
        else {
            // Reset data (deep copy)
            this.characterData = JSON.parse(JSON.stringify(defaultData));
            switch (characterData.characterClass) {
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

        // Always receive character class
        this.characterData.characterClass = characterData.characterClass;
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
            "src/assets/sprites/PlayerMage.png"
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
            .image(570, 0, this.minimap.name)
            .setOrigin(0, 0)
            .setDepth(0);
        this.minimap.obj.setInteractive();
        this.minimap.obj.on("pointerup", () => {
            this.scene.start(CONSTANTS.SCENES.MAP, this.characterData);
            console.log("Going to World Map");
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
            audioScene.playAudio("scape-main");
            this.scene.start(CONSTANTS.SCENES.MAIN_MENU, this.characterData);
        });

        // Class picture
        let classPicture = this.add
            .image(0, 250, this.characterData.characterClass)
            .setOrigin(0, 0)
            .setDepth(2);

        // Fix class images that are not the same dimensions
        if (this.characterData.characterClass == CONSTANTS.CLASS.RANGER) {
            classPicture.setScale(.3);
            classPicture.y = 195;
        }
        else if (this.characterData.characterClass == CONSTANTS.CLASS.MAGE) {
            classPicture.setScale(.5);
            classPicture.y = 175;
        }

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

        // Launch dashboard scene in parallel
        this.scene.run(CONSTANTS.SCENES.DASHBOARD, this.characterData);
        this.dashboard = this.scene.get(CONSTANTS.SCENES.DASHBOARD);

        // Call create function for inherited class
        if (this.levelType != "") {
            this.childCreate();
        }

        // Display click object
        this.showRandomClickObject();

        // Scene destructor
        this.events.on('shutdown', () => {
            // Release autoclickers to be garbage collected
            this.clearAutoClickers();
            // Hide dashboard
            this.scene.stop(CONSTANTS.SCENES.DASHBOARD);
        });
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

        this.dashboard.updateSkillsText();
    }

    updateAutoClickDamageStat(damageDone) {
        this.characterData.damageByAutoClick += damageDone;
        this.damageByAutoClickText.text =
            "Damage done by autoclickers: " +
            Math.floor(this.characterData.damageByAutoClick);
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
}
