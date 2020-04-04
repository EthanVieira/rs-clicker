import { defaultData } from "./default-data.js";

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