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

export function calcXpForLevel(lv) {
    let xp = 0;
    for (let x = 1; x < lv; x++) {
        xp += x + 300 * Math.pow(2, (x + 1) / 7);
    }
    return 0.25 * xp;
}

var itemClasses = {};
export async function getItemClass(itemName, scene) {
    if (itemClasses.hasOwnProperty(itemName)) {
        let itemClass = itemClasses[itemName];
        return new itemClass.default(scene);
    } else {
        console.log("Invalid item name in getItemClass - returning null.", itemName);
        return null;
    }
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

// Transforms varrock-mine -> VarrockMine
export function dashToPascalCase(str) {
    let resultStr = "";
    for (let i = 0; i < str.length; i++) {
        if (i == 0 || str.charAt(i - 1) == "-") {
            resultStr += str.charAt(i).toUpperCase();
        } else {
            resultStr += str.charAt(i).toLowerCase();
        }
    }

    return resultStr.replaceAll("-", "");
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

// don't need an 's' to pluralize these
const noncountNouns = ["essence"];

export function pluralize(text) {
    // special case
    if (text == "Man") {
        return "Men";
    }

    let pluralText = text;

    if (!text.endsWith("s")) {
        const dontAddS = noncountNouns.some((word) => {
            return text.toLowerCase().endsWith(word);
        });

        if (!dontAddS) {
            pluralText += "s";
        }
    }

    return pluralText;
}

// Returns a rough estimate of the pixel width of
// a string based on the letters in the string
// in RS font. Didn't consider numbers or other symbols.
export const getEstimatedPixelWidth = (str) =>
    str.split("").reduce((sum, char) => {
        if (["i", "l"].includes(char)) return sum + 1;
        if (["m", "w"].includes(char)) return sum + 8;
        if (char == char.toUpperCase()) return sum + 8;
        return sum + 6;
    }, 0);

export class ListWithTimeout {
    constructor() {
        this.items = new Array();
    }

    put(value, expireIn) {
        this.items.push(value);
        setTimeout(() => {
            const index = this.items.indexOf(value);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        }, expireIn);
    }

    get(value) {
        return this.items.find((element) => element == value);
    }
}
