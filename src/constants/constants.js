export const CONSTANTS = {
    SCENES: {
        LOAD: "LOAD",
        AUDIO: "AUDIO",
        MAIN_MENU: "MAIN_MENU",
        CHARACTER_CREATION: "CHARACTER_CREATION",
        DASHBOARD: "DASHBOARD",
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
    CENTER_X: -1520,
    CENTER_Y: -2970,
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

export const calcLevel = function(xp, lv = 1) {
    let curLvXp = Math.floor(.25*(lv + 300*Math.pow(2, lv/7)));
    if (xp > curLvXp) {
        return (calcLevel(xp - curLvXp, lv+1));
    }
    else {
        return lv;
    }
}