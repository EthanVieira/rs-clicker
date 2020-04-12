import { defaultData } from "./default-data.js";
import { CONSTANTS } from "./constants/constants.js";

export function getDefaultData() {
    // Reset data (deep copy)
    return JSON.parse(JSON.stringify(defaultData));
}

export const calcLevel = function(xp, lv = 1) {
    let curLvXp = Math.floor(0.25 * (lv + 300 * Math.pow(2, lv / 7)));
    if (xp > curLvXp) {
        return calcLevel(xp - curLvXp, lv + 1);
    } else {
        return lv;
    }
};

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