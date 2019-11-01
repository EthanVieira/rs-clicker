import { Level } from "./level.js";
import { CONSTANTS } from "./constants.js";
import { Enemy } from "./enemy.js";
import { AutoClicker } from "./autoClicker.js";

// Parent level class
export class enemyLevel extends Level{
    // Enemy
    enemyMetadata = [];   // name, path, maxHealth, killGold
    enemyObjects = [];
    currentEnemyIndex = 0;

    // Autoclickers
    autoClickers = [];
    autoClickDps = 0;
    autoClickDpsText;

    // Level completion
    killQuest = 0;
    killQuestText = '';
    questCompleteText = '';

    constructor(data) {
        super(data);

        this.enemyMetadata = data.enemies;
        this.killQuest = data.killQuest;
    }

    childPreload() {
        // Hitsplats
        this.load.image('blue-hitsplat', 'source/assets/BlueHitsplat.png');
        this.load.image('red-hitsplat', 'source/assets/RedHitsplat.png');

        // Enemy
        this.enemyMetadata.forEach((enemy) => {
            this.load.image(enemy.name, enemy.path);
        });
    }

    childCreate() {
        // Create enemies
        this.enemyMetadata.forEach((enemy) => {
            this.enemyObjects.push(
                new Enemy({
                    scene: this,
                    x: this.width/2-100,
                    y: this.height/2-115,
                    maxHealth: enemy.maxHealth,
                    name: enemy.name,
                    killGold: enemy.killGold
                })
            );
        });

        // Create kill quest
        this.killQuestText = this.add.text(530, 270, "", {fill: 'white'}).setDepth(3);
        this.enemyMetadata.forEach((enemy, index) => {
            this.killQuestText.text += this.characterData[this.currentLevel].enemiesKilled[enemy.name] + "/" + this.killQuest + " " + enemy.name + "s";
            if (index + 1 < this.enemyMetadata.length) {
                this.killQuestText.text += " & ";
            }
        });

        this.questCompleteText = this.add.text(530, 290, 'Quest complete!', {fill: 'white'}).setDepth(3);

        // Hide text if level quest has not been completed
        if (!this.characterData[this.currentLevel].questCompleted) {
            this.questCompleteText.visible = false;
        }

        // Button text to test autoclickers
        let autoClickerButton = this.add.text(530, 250, '50 gold for autoclicker', {fill: 'white'}).setDepth(3);
        autoClickerButton.setInteractive();
        autoClickerButton.on("pointerup", ()=>{
            if (this.characterData.gold >= 50) {
                this.addGold(-50);
                this.createAutoClicker({dps: 5, level: 1, type: 'Hired Bowman'});
            }           
        });

        // Show stats
        let statColor = 'white';
        this.autoClickDpsText = this.add.text(20, 120, "AutoClicker DPS: " + this.autoClickDps, {fill: statColor}).setDepth(3);

        // Re-add autoclickers from cookies on first load
        if (this.characterData.hasCookies && this.autoClickers.length == 0){
            let numAutoClickers = this.characterData.numberOfAutoClickers;
            this.characterData.numberOfAutoClickers = 0;
            this.autoClickDps = 0;
            this.updateAutoClickerDPS(0);
            for (let i = 0; i < numAutoClickers; i++) {
                this.createAutoClicker({dps: 5, level: 1, type: 'Hired Bowman'});
            }
        }

        // Choose first displayed enemy
        this.showRandomEnemy();
    }

    showRandomEnemy() {
        this.enemyObjects[this.currentEnemyIndex].hide();
        this.currentEnemyIndex = Math.floor(Math.random() * this.enemyMetadata.length);
        this.enemyObjects[this.currentEnemyIndex].show();
    }

    damageCurrentEnemy(damage) {
        this.enemyObjects[this.currentEnemyIndex].damageEnemy(damage);
    }

    enemyKilled(name){
        this.characterData.totalEnemiesKilled++;
        // Update kill quest score
        if (this.characterData[this.currentLevel].enemiesKilled[name] < this.killQuest) {
            this.characterData[this.currentLevel].enemiesKilled[name]++;

            let questCompleted = true;
            this.killQuestText.text = "";
            this.enemyMetadata.forEach((enemy, index) => {
                // Update quest text
                this.killQuestText.text += this.characterData[this.currentLevel].enemiesKilled[enemy.name] + "/" + this.killQuest + " " + enemy.name + "s";
                if (index + 1 < this.enemyMetadata.length) {
                    this.killQuestText.text += " & ";
                }

                // Check for quest completion
                if (this.characterData[this.currentLevel].enemiesKilled[enemy.name] < this.killQuest) {
                    questCompleted = false;
                }
                // Set as complete if all passed on last index
                else if (questCompleted && index == this.enemyMetadata.length - 1) {
                    this.questCompleteText.visible = true;
                    this.characterData[this.currentLevel].questCompleted = true;
                    console.log("Quest complete!");
                }
            });
        }
        this.enemiesKilledText.text = "Enemies killed: " + this.characterData.totalEnemiesKilled;
    
        // Get new enemy
        this.showRandomEnemy();
    }

    createAutoClicker(data){
        let autoClicker = new AutoClicker({
            scene: this,
            dps: data.dps,
            level: data.level,
            type: data.type
        });
        this.autoClickers.push(autoClicker);
        this.updateAutoClickerDPS(data.dps);
        this.characterData.numberOfAutoClickers++;
    }

    updateAutoClickerDPS(dps){
        this.autoClickDps += dps;
        this.autoClickDpsText.text = "AutoClicker DPS: " + this.autoClickDps;
    }

    // Need to clear data before changing scenes
    clearAutoClickers() {
        for (let i = 0; i < this.autoClickers.length; i++) {
            this.autoClickers[i].release();
        }
        this.autoClickers = [];
        this.enemyObjects = [];
    }
}