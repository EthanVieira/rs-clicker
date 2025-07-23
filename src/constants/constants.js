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
        LUMBRIDGE_ALTAR: "LUMBRIDGE_ALTAR",
        DRAYNOR_FISHING: "DRAYNOR_FISHING",
        ROGUES_DEN_COOKING: "ROGUES_DEN_COOKING",
        AL_KHARID_FURNACE: "AL_KHARID_FURNACE",
        AL_KHARID_PALACE: "AL_KHARID_PALACE",
        VARROCK_ANVIL: "VARROCK_ANVIL",
        VARROCK_MINE: "VARROCK_MINE",
        VARROCK: "VARROCK",
        BARBARIAN_VILLAGE: "BARBARIAN_VILLAGE",
        GNOME_VILLAGE_AGILITY: "GNOME_VILLAGE_AGILITY",
        RUNE_ESSENCE_MINE: "RUNE_ESSENCE_MINE",
        AIR_ALTAR: "AIR_ALTAR",
        SAWMILL: "SAWMILL",
        PLAYER_OWNED_HOUSE: "PLAYER_OWNED_HOUSE",
    },
    QUEST_TABS: {
        QUESTS: "QUESTS",
        STATS: "STATS",
    },
    PREREQUISITES: {
        LUMBRIDGE: "TUTORIAL_ISLAND",
        LUMBRIDGE_TREES: "TUTORIAL_ISLAND",
        LUMBRIDGE_ALTAR: "TUTORIAL_ISLAND",
        DRAYNOR_FISHING: "TUTORIAL_ISLAND",
        ROGUES_DEN_COOKING: "DRAYNOR_FISHING",
        AL_KHARID_FURNACE: "LUMBRIDGE",
        AL_KHARID_PALACE: "LUMBRIDGE",
        VARROCK_ANVIL: "AL_KHARID_FURNACE",
        VARROCK_MINE: "LUMBRIDGE",
        VARROCK: "LUMBRIDGE",
        BARBARIAN_VILLAGE: "VARROCK",
        GNOME_VILLAGE_AGILITY: "TUTORIAL_ISLAND",
        RUNE_ESSENCE_MINE: "LUMBRIDGE",
        AIR_ALTAR: "LUMBRIDGE",
        SAWMILL: "LUMBRIDGE",
        PLAYER_OWNED_HOUSE: "LUMBRIDGE",
    },
    CLASS: {
        UNARMED: "UNARMED",
        WARRIOR: "WARRIOR",
        MAGE: "MAGE",
        RANGER: "RANGER",
    },
    RESOURCES: {
        FISH: "FISH",
        ORE: "ORE",
        WOOD: "WOOD",
        ESSENCE: "ESSENCE",
    },
    ITEM_TYPES: {
        WEAPON: "WEAPON",
        TOOL: "TOOL",
        CONSUMABLE: "CONSUMABLE",
        RESOURCE: "RESOURCE",
        CURRENCY: "CURRENCY",
        RUNE: "RUNE",
    },
    LEVEL_TYPE: {
        ENEMY: "ENEMY",
        RESOURCE: "RESOURCE",
        CRAFTING: "CRAFTING",
        SMITHING: "SMITHING",
        COOKING: "COOKING",
        AGILITY: "AGILITY",
        RUNECRAFTING: "RUNECRAFTING",
        CONSTRUCTION: "CONSTRUCTION",
        PRAYER: "PRAYER",
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
        COMBAT_STYLE: "COMBAT_STYLE",
        FRIENDS: "FRIENDS",
        SPELLBOOK: "SPELLBOOK",
    },
    LIMITS: {
        MAX_LEVEL: 99,
        MAX_XP: 200_000_000,
        XP_FOR_99: 13_034_431,
        MAX_ITEM_STACK: 2_147_483_647,
        MAX_INVENTORY_SPACE: 28,
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
        UNARMED: "UNARMED",
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
};

export const ATTACK_TYPES = {
    CRUSH: "CRUSH",
    HEAVY: "HEAVY",
    LIGHT: "LIGHT",
    MAGIC: "MAGIC",
    SLASH: "SLASH",
    STAB: "STAB",
    STANDARD: "STANDARD",
};

export const SCREEN = {
    WIDTH: 765,
    HEIGHT: 503,
};

export const MAP = {
    WIDTH: 7417,
    HEIGHT: 6165,
    TUTORIAL_ISLAND: {
        X: 4150,
        Y: 4000,
    },
    LUMBRIDGE: {
        X: 4650,
        Y: 3505,
    },
    LUMBRIDGE_TREES: {
        X: 4470,
        Y: 3505,
    },
    LUMBRIDGE_ALTAR: {
        X: 4750,
        Y: 3555,
    },
    DRAYNOR_FISHING: {
        X: 4180,
        Y: 3445,
    },
    ROGUES_DEN_COOKING: {
        X: 3400,
        Y: 2155,
    },
    AL_KHARID_FURNACE: {
        X: 4880,
        Y: 3600,
    },
    AL_KHARID_PALACE: {
        X: 4950,
        Y: 3680,
    },
    VARROCK_ANVIL: {
        X: 4510,
        Y: 2680,
    },
    VARROCK_MINE: {
        X: 4900,
        Y: 2880,
    },
    VARROCK: {
        X: 4630,
        Y: 2640,
    },
    BARBARIAN_VILLAGE: {
        X: 4050,
        Y: 2680,
    },
    GNOME_VILLAGE_AGILITY: {
        X: 1630,
        Y: 2610,
    },
    RUNE_ESSENCE_MINE: {
        X: 4720,
        Y: 2800,
    },
    AIR_ALTAR: {
        X: 3750,
        Y: 3230,
    },
    SAWMILL: {
        X: 4950,
        Y: 2400,
    },
    PLAYER_OWNED_HOUSE: {
        X: 3520,
        Y: 3485,
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
    SMITH_UNLOCKED: {
        font: "16px runescape",
        fill: "white",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    SMITH_LOCKED: {
        font: "16px runescape",
        fill: "black",
    },
    SMITH_COUNT_UNLOCKED: {
        font: "16px runescape",
        fill: "#00ff00",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
    SMITH_COUNT_LOCKED: {
        font: "16px runescape",
        fill: "#ff8800",
        shadow: {
            offsetX: 1,
            offsetY: 1,
            color: "black",
            fill: true,
        },
    },
};

export const KEY_CODES = Phaser.Input.Keyboard.KeyCodes;
