export var saveData = {
  gold: 0,
  characterClass: "",
  totalEnemiesKilled: 0,
  timesClicked: 0,
  damageByClicking: 0,
  damageByAutoClick: 0,
  numberOfAutoClickers: 0,
  skills: {
    woodcutting: 1,
    mining: 1,
    attack: 1,
    strength: 1,
    defense: 1,
    hitpoints: 10,
    ranged: 1,
    magic: 1,
    herblore: 1
  },
  audio: [2, 2, 2], // BGM, SFX, Environment
  // Can be accessed with characterData[this.currentLevel].questCompleted, etc.
  TUTORIAL_ISLAND: {
    questCompleted: false,
    enemiesKilled: {
      rat: 0
    }
  },
  LUMBRIDGE: {
    questCompleted: false,
    enemiesKilled: {
      cow: 0,
      goblin: 0
    }
  },
  VARROCK: {
    questCompleted: false,
    enemiesKilled: {
      wizard: 0
    }
  }
};
