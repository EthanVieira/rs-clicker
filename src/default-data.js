export const defaultData = {
    hasCookies: false,
    gold: 0,
    characterClass: "",
    currentLevel: "",
    totalEnemiesKilled: 0,
    timesClicked: 0,
    damageByClicking: 0,
    damageByAutoClick: 0,
    numberOfAutoClickers: 0,
    inventory: [],
    equipment: {
    	WEAPON: {type: "Bronze", item: "Dagger"}
    },
    // Skill XP
    skills: {
        attack: 0,
        ranged: 0,
        prayer: 0,
        magic: 0,
        health: 10,
        woodcutting: 0,
        mining: 0
    },
    audio: [2, 2, 2], // BGM, SFX, Environment
    // Can be accessed with characterData[this.currentLevel].questCompleted, etc.
    TUTORIAL_ISLAND: {
        questCompleted: false,
        enemiesKilled: {
            giantRat: 0
        }
    },
    LUMBRIDGE: {
        questCompleted: false,
        enemiesKilled: {
            cow: 0,
            goblin: 0
        }
    },
    LUMBRIDGE_TREES: {
        // TODO: "enemiesKilled" makes things work nicely but isn't an accurate name here
        // Didn't want to implement the logic to discern between levels for this yet as the
        // Quest text will soon change anyway
        questCompleted: false,
        enemiesKilled: {
            tree: 0
        }
    },
    VARROCK: {
        questCompleted: false,
        enemiesKilled: {
            darkWizard: 0,
            guard: 0
        }
    },
    BARBARIAN_VILLAGE: {
        questCompleted: false,
        enemiesKilled: {
            barbarian: 0
        }
    }
};
