export const CONSTANTS = {
    SCENES: {
        LOAD: "LOAD",
        AUDIO: "AUDIO",
        MAIN_MENU: "MAIN_MENU",
        CHARACTER_CREATION: "CHARACTER_CREATION",
        DASHBOARD: "DASHBOARD",
        STATS: "STATS",
        MAP: "MAP",
        SHOP: "SHOP",
        TUTORIAL_ISLAND: "TUTORIAL_ISLAND",
        LUMBRIDGE: "LUMBRIDGE",
        LUMBRIDGE_TREES: "LUMBRIDGE_TREES",
        VARROCK: "VARROCK",
        BARBARIAN_VILLAGE: "BARBARIAN_VILLAGE"
    },
    CLASS: {
        UNARMED: "UNARMED",
        WARRIOR: "WARRIOR",
        MAGE: "MAGE",
        RANGER: "RANGER"
    },
    RESOURCES: {
        WOOD: "WOOD",
        ORE: "ORE"
    },
    LEVEL_TYPE: {
        ENEMY: "ENEMY",
        RESOURCE: "RESOURCE"
    },
    PANEL: {
        INVENTORY: "INVENTORY",
        SKILLS: "SKILLS",
        QUESTS: "QUESTS",
        SETTINGS: "SETTINGS"
    },
    UTILS: {
        MILLIS_IN_YEAR: 365 * 24 * 60 * 60 * 1000
    }
};

export const SCREEN = {
    WIDTH: 765,
    HEIGHT: 503
};

export const MAP = {
    WIDTH: 4001,
    HEIGHT: 4431,
    TUTORIAL_ISLAND: {
        X: 2500,
        Y: 3570
    },
    LUMBRIDGE: {
        X: 3000,
        Y: 3075
    },
    LUMBRIDGE_TREES: {
        X: 2820,
        Y: 3075
    },
    VARROCK: {
        X: 2980,
        Y: 2210
    },
    BARBARIAN_VILLAGE: {
        X: 2400,
        Y: 2250
    }
};

export const FONTS = {
    UNLOCKED_FONT: {
        fill: "white",
        fontSize: "20px",
        style: "bold",
        backgroundColor: "grey",
        alpha: 0.5,
        shadow: {
            offsetX: 2,
            offsetY: 2,
            color: "black",
            fill: true
        }
    },
    LOCKED_FONT: {
        fill: "black",
        fontSize: "20px",
        style: "bold",
        backgroundColor: "grey"
    },
    OPTIONS_MENU: {
        fill: "white",
        fontSize: "12px",
    },
    ITEM_NAME: {
        fill: "orange",
        fontSize: "12px"
    },
}