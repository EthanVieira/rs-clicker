import { defaultData } from "./default-data.js";
import { CONSTANTS } from "./constants/constants.js";

export function getDefaultData() {
    // Reset data (deep copy)
    return JSON.parse(JSON.stringify(defaultData));
}

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

export function storeCookies(characterData) {
    characterData.hasCookies = true;

    // Lasts for one year
    let dateTime = new Date();
    dateTime.setTime(dateTime.getTime() + CONSTANTS.UTILS.MILLIS_IN_YEAR);
    let expireString = "expires=" + dateTime.toUTCString();

    // Turn characterData into a json string and store it in a cookie
    let jsonString = JSON.stringify(characterData);
    document.cookie = "characterData=" + jsonString + ";" + expireString + ";path=/;";
}
