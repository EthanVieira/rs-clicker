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
