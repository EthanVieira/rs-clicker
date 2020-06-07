export const defaultData = {
    hasCookies: false,
    name: "You",
    gold: 0,
    characterClass: "",
    currentLevel: "TUTORIAL_ISLAND",
    totalEnemiesKilled: 0,
    timesClicked: 0,
    damageByClicking: 0,
    damageByAutoClick: 0,
    numberOfAutoClickers: 0,
    inventory: [
        { item: "BronzeDagger", count: 1 },
        { item: "NormalShortbow", count: 1 },
        { item: "NormalStaff", count: 1 },
        { item: "BronzeAxe", count: 1 },
        { item: "BronzePickaxe", count: 1 },
        { item: "Knife", count: 1 },
    ],
    equipment: {
        WEAPON: "",
    },
    clan: {
        name: "The Black Knights",
        members: [],
    },
    // Skill XP
    skills: {
        attack: 0,
        health: 0,
        mining: 0,
        strength: 0,
        agility: 0,
        smithing: 0,
        defense: 0,
        herblore: 0,
        fishing: 0,
        ranged: 0,
        thieving: 0,
        cooking: 0,
        prayer: 0,
        crafting: 0,
        firemaking: 0,
        magic: 0,
        fletching: 0,
        woodcutting: 0,
        runecrafting: 0,
        slayer: 0,
        farming: 0,
        construction: 0,
        trapping: 0,
    },
    audio: [2, 2, 2], // BGM, SFX, Environment
    // Can be accessed with characterData[this.currentLevel].questCompleted, etc.
    TUTORIAL_ISLAND: {
        questCompleted: false,
        enemiesKilled: {
            giantRat: 0,
        },
    },
    LUMBRIDGE: {
        questCompleted: false,
        enemiesKilled: {
            cow: 0,
            goblin: 0,
        },
    },
    LUMBRIDGE_TREES: {
        // TODO: "enemiesKilled" makes things work nicely but isn't an accurate name here
        // Didn't want to implement the logic to discern between levels for this yet as the
        // Quest text will soon change anyway
        questCompleted: false,
        enemiesKilled: {
            tree: 0,
        },
    },
    VARROCK_MINE: {
        questCompleted: false,
        enemiesKilled: {
            copperRock: 0,
            tinRock: 0,
        },
    },
    VARROCK: {
        questCompleted: false,
        enemiesKilled: {
            darkWizard: 0,
            guard: 0,
        },
    },
    BARBARIAN_VILLAGE: {
        questCompleted: false,
        enemiesKilled: {
            barbarian: 0,
        },
    },
};
