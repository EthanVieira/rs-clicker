export const testSmithingData = {
    //hasCookies: false, // todo: maybe use this for tutorial?
    name: "You",
    gold: 0,
    currentLevel: "TUTORIAL_ISLAND",
    timesClicked: 0,
    damageByClicking: 0,
    damageByAutoClick: 0,
    questPoints: 0,
    inventory: [
        { item: "BronzeDagger", count: 1 },
        { item: "NormalShortbow", count: 1 },
        { item: "NormalStaff", count: 1 },
        { item: "BronzeAxe", count: 1 },
        { item: "BronzePickaxe", count: 1 },
        { item: "Knife", count: 1 },
        { item: "Hammer", count: 1 },
        { item: "Coin", count: 69420 },
        { item: "BronzeBar", count: 42069 },
        { item: "CopperOre", count: 76543 },
        { item: "TinOre", count: 76543 },
    ],
    equipment: {
        WEAPON: "",
    },
    clan: {
        name: "The Black Knights",
        members: {},
    },
    attackStyle: 0,
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
        hunter: 0,
    },
    audio: [0.5, 0.5, 0.5], // BGM, SFX, Environment
    // Can be accessed with characterData[this.currentLevel].questCompleted, etc.
    levels: {
        TUTORIAL_ISLAND: {
            questCompleted: true,
            unlocked: true,
            enemiesKilled: {
                giantRat: 0,
            },
        },
        LUMBRIDGE: {
            questCompleted: true,
            unlocked: true,
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
            unlocked: false,
            enemiesKilled: {
                tree: 0,
            },
        },
        AL_KHARID_FURNACE: {
            questCompleted: true,
            unlocked: true,
            enemiesKilled: {
                bar: 0,
            },
        },
        VARROCK_ANVIL: {
            questCompleted: true,
            unlocked: true,
            enemiesKilled: {
                bronzeDagger: 0,
            },
        },
        VARROCK_MINE: {
            questCompleted: true,
            unlocked: true,
            enemiesKilled: {
                copperRock: 0,
                tinRock: 0,
            },
        },
        VARROCK: {
            questCompleted: true,
            unlocked: true,
            enemiesKilled: {
                darkWizard: 0,
                guard: 0,
            },
        },
        BARBARIAN_VILLAGE: {
            questCompleted: false,
            unlocked: false,
            enemiesKilled: {
                barbarian: 0,
            },
        },
    },
};
