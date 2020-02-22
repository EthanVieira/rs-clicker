export const CONSTANTS = {
    SCENES: {
        LOAD: "LOAD",
        AUDIO: "AUDIO",
        MAIN_MENU: "MAIN_MENU",
        CHARACTER_CREATION: "CHARACTER_CREATION",
        MAP: "MAP",
        SHOP: "SHOP",
        TUTORIAL_ISLAND: "TUTORIAL_ISLAND",
        LUMBRIDGE: "LUMBRIDGE",
        LUMBRIDGE_TREES: "LUMBRIDGE_TREES",
        VARROCK: "VARROCK",
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
    UTILS: {
        MILLIS_IN_YEAR: 365 * 24 * 60 * 60 * 1000
    }
};

export const SCREEN = {
    WIDTH: 765,
    HEIGHT: 503
};

export const MAP = {
    CENTER_X: -1820,
    CENTER_Y: -2170,
    WIDTH: 3298,
    HEIGHT: 3285,
    TUTORIAL_ISLAND: {
        X: 1940,
        Y: 2620
    },
    LUMBRIDGE: {
        X: 2400,
        Y: 2215
    },
    LUMBRIDGE_TREES: {
        X: 2220,
        Y: 2210
    },
    VARROCK: {
        X: 2325,
        Y: 1565
    },
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
    }
};
