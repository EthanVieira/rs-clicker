import { LevelScene } from "./level.js";
import { CONSTANTS } from "../constants/constants.js";
import { AutoClicker } from "../auto-clicker.js";
import { Enemy } from "../enemy.js";

export class EnemyLevelScene extends LevelScene {
  // Level completion
  killQuest = 0;
  killQuestText = "";
  questCompleteText = "";

  constructor(data) {
    super(data);

    this.killQuest = data.killQuest;
    this.levelType = CONSTANTS.LEVEL_TYPE.ENEMY;
  }

  childPreload() {
    // Hitsplats
    this.load.image("blue-hitsplat", "src/assets/effects/BlueHitsplat.png");
    this.load.image("red-hitsplat", "src/assets/effects/RedHitsplat.png");
  }

  childCreate() {
    // Create kill quest
    this.killQuestText = this.add
      .text(530, 270, "", { fill: "white" })
      .setDepth(3);
    this.clickObjectMetaData.forEach((enemy, index) => {
      this.killQuestText.text +=
        this.characterData[this.currentLevel].enemiesKilled[enemy.name] +
        "/" +
        this.killQuest +
        " " +
        enemy.name +
        "s";
      if (index + 1 < this.clickObjectMetaData.length) {
        this.killQuestText.text += " & ";
      }
    });

    this.questCompleteText = this.add
      .text(530, 290, "Quest complete!", { fill: "white" })
      .setDepth(3);

    // Hide text if level quest has not been completed
    if (!this.characterData[this.currentLevel].questCompleted) {
      this.questCompleteText.visible = false;
    }

    // Button text to test autoclickers
    let autoClickerButton = this.add
      .text(530, 250, "50 gold for autoclicker", { fill: "white" })
      .setDepth(3);
    autoClickerButton.setInteractive();
    autoClickerButton.on("pointerup", () => {
      if (this.characterData.gold >= 50) {
        this.addGold(-50);
        this.createAutoClicker({ dps: 5, level: 1, type: "Hired Bowman" });
      }
    });

    // Create click objects
    this.clickObjectMetaData.forEach(clickObject => {
      this.clickObjects.push(
        new Enemy({
          scene: this,
          x: this.width / 2 - 100,
          y: this.height / 2 - 115,
          maxHealth: clickObject.maxHealth,
          name: clickObject.name,
          killGold: clickObject.killGold
        })
      );
    });

    // Show stats
    let statColor = "white";
    this.autoClickDpsText = this.add
      .text(20, 120, "AutoClicker DPS: " + this.autoClickDps, {
        fill: statColor
      })
      .setDepth(3);

    // Re-add autoclickers from cookies on first load
    if (this.characterData.hasCookies && this.autoClickers.length == 0) {
      let numAutoClickers = this.characterData.numberOfAutoClickers;
      this.characterData.numberOfAutoClickers = 0;
      this.autoClickDps = 0;
      this.updateAutoClickerDPS(0);
      for (let i = 0; i < numAutoClickers; i++) {
        this.createAutoClicker({ dps: 5, level: 1, type: "Hired Bowman" });
      }
    }
  }

  enemyKilled(name) {
    this.characterData.totalEnemiesKilled++;
    // Update kill quest score
    if (
      this.characterData[this.currentLevel].enemiesKilled[name] < this.killQuest
    ) {
      this.characterData[this.currentLevel].enemiesKilled[name]++;

      let questCompleted = true;
      this.killQuestText.text = "";
      this.clickObjectMetaData.forEach((enemy, index) => {
        // Update quest text
        this.killQuestText.text +=
          this.characterData[this.currentLevel].enemiesKilled[enemy.name] +
          "/" +
          this.killQuest +
          " " +
          enemy.name +
          "s";
        if (index + 1 < this.clickObjectMetaData.length) {
          this.killQuestText.text += " & ";
        }

        // Check for quest completion
        if (
          this.characterData[this.currentLevel].enemiesKilled[enemy.name] <
          this.killQuest
        ) {
          questCompleted = false;
        }
        // Set as complete if all passed on last index
        else if (
          questCompleted &&
          index == this.clickObjectMetaData.length - 1
        ) {
          this.questCompleteText.visible = true;
          this.characterData[this.currentLevel].questCompleted = true;
          console.log("Quest complete!");
        }
      });
    }
    this.enemiesKilledText.text =
      "Enemies killed: " + this.characterData.totalEnemiesKilled;

    // Get new enemy
    this.showRandomClickObject();
  }

  createAutoClicker(data) {
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
}
