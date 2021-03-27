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
    const spaceStr = str.replace("_", " ");
    for (let i = 0; i < spaceStr.length; i++) {
        if (i == 0 || spaceStr.charAt(i-1) == " ") {
            resultStr += spaceStr.charAt(i).toUpperCase();
        }
        else {
            resultStr += spaceStr.charAt(i).toLowerCase();
        }
    }

    return resultStr;
}