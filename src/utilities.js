import { EQUIPMENT } from "./constants/constants.js";

// Returns XP needed for given level, not total xp
function calcLevelUpXp(lv) {
    return Math.floor(0.25 * (lv + 300 * Math.pow(2, lv / 7)));
}

export const calcLevel = function (xp, lv = 1) {
    let levelUpXp = calcLevelUpXp(lv);
    if (xp > levelUpXp) {
        return calcLevel(xp - levelUpXp, lv + 1);
    } else {
        return lv;
    }
};

export function calcRemainingXp(xp) {
    let lv = calcLevel(xp);
    for (let i = 1; i < lv; i++) {
        xp -= calcLevelUpXp(i);
    }
    let levelUpXp = calcLevelUpXp(lv);
    return levelUpXp - xp + 1;
}

var itemClasses = {};
export async function getItemClass(itemName, scene) {
    let itemClass = itemClasses[itemName];

    return new itemClass.default(scene);
}

export async function setItemClass(key, value) {
    itemClasses[key] = value;
}

// Transforms camelCase -> Camel Case
export function prettyPrintCamelCase(str) {
    let resultStr = "";
    for (var i = 0; i < str.length; i++) {
        if (i == 0) {
            resultStr += str.charAt(i).toUpperCase();
        } else if (str.charAt(i) == str.charAt(i).toUpperCase()) {
            resultStr += " ";
            resultStr += str.charAt(i);
        } else {
            resultStr += str.charAt(i);
        }
    }
    return resultStr;
}

// Transforms VARROCK_MINE -> Varrock Mine
export function prettyPrintConstant(str) {
    let resultStr = "";
    const spaceStr = str.replaceAll("_", " ");
    for (let i = 0; i < spaceStr.length; i++) {
        if (i == 0 || spaceStr.charAt(i - 1) == " ") {
            resultStr += spaceStr.charAt(i).toUpperCase();
        } else {
            resultStr += spaceStr.charAt(i).toLowerCase();
        }
    }

    return resultStr;
}

// Transforms newbie-melody -> Newbie Melody
export function prettyPrintDash(str) {
    const spaceStr = str.replaceAll("-", " ");
    return prettyPrintConstant(spaceStr);
}

export function getGoldStackType(goldAmount) {
    switch (true) {
        case goldAmount < 5:
            return goldAmount.toString();
        case goldAmount < 25:
            return "5";
        case goldAmount < 100:
            return "25";
        case goldAmount < 250:
            return "100";
        case goldAmount < 1000:
            return "250";
        case goldAmount < 10000:
            return "1k";
        default:
            return "10k";
    }
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function aOrAn(followingWord) {
    return ["a", "e", "i", "o", "u"].includes(followingWord.charAt(0).toLowerCase())
        ? "an"
        : "a";
}

export function getRequiredCombatSkill(skillConstant) {
    switch (skillConstant) {
        case EQUIPMENT.WEAPON_TYPES.MELEE:
            return "attack";
        case EQUIPMENT.WEAPON_TYPES.RANGED:
            return "ranged";
        case EQUIPMENT.WEAPON_TYPES.MAGIC:
            return "magic";
        default:
            return "attack";
    }
}

// For calling scene functions that might not be ready immediately
export function runOnLoad(scene, func) {
    if (scene.scene.isActive()) {
        func();
    } else {
        // If called before load, run once loaded
        scene.events.once("create", () => {
            func();
        });
    }
}

// Returns true if item exist in inventory
export function hasItem(inventory, itemName) {
    for (let i = 0; i < inventory.length; i++)
    {
        if (!inventory[i] || !inventory[i].name) {
            continue;
        }

        if (inventory[i].name === itemName) {
            return true;
        }
    }

    return false;
}

// Returns (string, color)
export function getItemText(amount) {
    switch (true) {
        case amount < 99999:
            return [amount, "orange"];
        case amount < 9999999:
            return [Math.floor(amount / 1000) + "K", "white"];
        default:
            return [Math.floor(amount / 1000000) + "M", "#00FF7F"];
    }
}
