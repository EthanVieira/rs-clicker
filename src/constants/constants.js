export const CONSTANTS = {
    SCENES: {
        LOAD: "LOAD",
        AUDIO: "AUDIO",
        MAIN_MENU: "MAIN_MENU",
        CHARACTER_CREATION: "CHARACTER_CREATION",
        DASHBOARD: "DASHBOARD",
        CHAT: "CHAT",
        STATS: "STATS",
        MAP: "MAP",
        SHOP: "SHOP",
        ANIMATION: "ANIMATION",
        TUTORIAL_ISLAND: "TUTORIAL_ISLAND",
        LUMBRIDGE: "LUMBRIDGE",
        LUMBRIDGE_TREES: "LUMBRIDGE_TREES",
        AL_KHARID_FURNACE: "AL_KHARID_FURNACE",
        VARROCK_ANVIL: "VARROCK_ANVIL",
        VARROCK_MINE: "VARROCK_MINE",
        VARROCK: "VARROCK",
        BARBARIAN_VILLAGE: "BARBARIAN_VILLAGE",
    },
    QUEST_TABS: {
        QUESTS: "QUESTS",
        STATS: "STATS",
    },
    PREREQUISITES: {
        LUMBRIDGE: "TUTORIAL_ISLAND",
        LUMBRIDGE_TREES: "TUTORIAL_ISLAND",
        AL_KHARID_FURNACE: "LUMBRIDGE",
        VARROCK_ANVIL: "AL_KHARID_FURNACE",
        VARROCK_MINE: "LUMBRIDGE",
        VARROCK: "LUMBRIDGE",
        BARBARIAN_VILLAGE: "VARROCK",
    },
    CLASS: {
        UNARMED: "UNARMED",
        WARRIOR: "WARRIOR",
        MAGE: "MAGE",
        RANGER: "RANGER",
    },
    RESOURCES: {
        WOOD: "WOOD",
        ORE: "ORE",
    },
    ITEM_TYPES: {
        WEAPON: "WEAPON",
        TOOL: "TOOL",
        CONSUMABLE: "CONSUMABLE",
        RESOURCE: "RESOURCE",
        CURRENCY: "CURRENCY",
    },
    LEVEL_TYPE: {
        ENEMY: "ENEMY",
        RESOURCE: "RESOURCE",
        CRAFTING: "CRAFTING",
        SMITHING: "SMITHING",
    },
    PANEL: {
        INVENTORY: "INVENTORY",
        MUSIC: "MUSIC",
        SKILLS: "SKILLS",
        PRAYER: "PRAYER",
        EQUIPMENT: "EQUIPMENT",
        QUESTS: "QUESTS",
        SETTINGS: "SETTINGS",
        CLAN: "CLAN",
    },
    UTILS: {
        MILLIS_IN_YEAR: 365 * 24 * 60 * 60 * 1000,
    },
};

export const OBJECT_TYPES = {
    ITEM: "ITEM",
    EQUIPMENT: "EQUIPMENT",
    ENEMY: "ENEMY",
    RESOURCE: "RESOURCE",
    AUTOCLICKER: "AUTOCLICKER",
};

export const EQUIPMENT = {
    WEAPON_TYPES: {
        MELEE: "MELEE",
        RANGED: "RANGED",
        MAGIC: "MAGIC",
    },
    SLOTS: {
        HEAD: "HEAD",
        CAPE: "CAPE",
        NECK: "NECK",
        AMMUNITION: "AMMUNITION",
        WEAPON: "WEAPON",
        SHIELD: "SHIELD",
        BODY: "BODY",
        LEGS: "LEGS",
        HANDS: "HANDS",
        FEET: "FEET",
        TWO_HANDED: "TWO_HANDED",
    },
    ATTACK_STYLE: {
        STAB: "STAB",
        SLASH: "SLASH",
        CRUSH: "CRUSH",
    },
};

export const SCREEN = {
    WIDTH: 765,
    HEIGHT: 503,
};

export const MAP = {
    WIDTH: 4001,
    HEIGHT: 4431,
    TUTORIAL_ISLAND: {
        X: 2500,
        Y: 3570,
    },
    LUMBRIDGE: {
        X: 3000,
        Y: 3075,
    },
    LUMBRIDGE_TREES: {
        X: 2820,
        Y: 3075,
    },
    AL_KHARID_FURNACE: {
        X: 3230,
        Y: 3170,
    },
    VARROCK_ANVIL: {
        X: 2860,
        Y: 2250,
    },
    VARROCK_MINE: {
        X: 3250,
        Y: 2450,
    },
    VARROCK: {
        X: 2980,
        Y: 2210,
    },
    BARBARIAN_VILLAGE: {
        X: 2400,
        Y: 2250,
    },
};

export const FONTS = {
    GOLD: {
        font: "24px runescape",
        fill: "gold",
    },
    STATS: {
        font: "18px runescape",
        fill: "white",
    },
    UNLOCKED_FONT: {
        fill: "white",
        font: "26px runescape",
        style: "bold",
        backgroundColor: "grey",
        alpha: 0.5,
        shadow: {
            offsetX: 2,
            offsetY: 2,
            color: "black",
            fill: true,
        },
    },
    LOCKED_FONT: {
        fill: "black",
        font: "26px runescape",
        style: "bold",
        backgroundColor: "grey",
    },
    OPTIONS_MENU: {
        fill: "white",
        font: "16px runescape",
    },
    ITEM_NAME: {
        fill: "orange",
        font: "16px runescape",
    },
    ITEM_STATS: {
        font: "16px runescape",
        fill: "blue",
    },
    ITEM_HEADER: {
        font: "16px runescape",
        fill: "black",
    },
    PRAYER: {
        font: "16px runescape",
        fill: "orange",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    HOTBAR: {
        font: "15.5px runescape",
        fill: "#00ff00",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    SKILLS: {
        font: "12px runescape",
        fill: "yellow",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    SKILL_HOVER: {
        font: "14px runescape",
        fill: "black",
    },
    SHOP: {
        font: "19px runescape",
        fill: "#e9921e",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    SONG_UNLOCKED: {
        font: "15.5px runescape",
        fill: "#00ff00",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    SONG_LOCKED: {
        font: "15.5px runescape",
        fill: "#ff0000",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    SONG_COUNT: {
        font: "14px runescape",
        fill: "orange",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    PROMPT: {
        font: "16px runescape",
        fill: "black",
    },
    PROMPT_INPUT: {
        font: "16px runescape",
        fill: "blue",
    },
};
