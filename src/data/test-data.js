import { defaultData } from "./default-data.js";
import { CONSTANTS } from "../constants/constants.js";
// ---------------------------------------------------------------------
// There is a bug where newly added items via altering the saved data won't
// behave correctly if that item already exists in the inventory. This is normally
// handled with the addToInventory method, but we bypass that by adding directly to
// the saved data.
// To avoid that, update the count of the item instead of pushing a new one.
// ---------------------------------------------------------------------
const richData = JSON.parse(JSON.stringify(defaultData));
richData["inventory"].filter((x) => x.item == "Coin")[0].count =
    CONSTANTS.LIMITS.MAX_ITEM_STACK;

const allLevelsUnlockedData = JSON.parse(JSON.stringify(defaultData));

for (let scene in allLevelsUnlockedData["levels"]) {
    allLevelsUnlockedData["levels"][scene]["questCompleted"] = true;
    allLevelsUnlockedData["levels"][scene]["unlocked"] = true;
}
// ---------------------------------------------------------------------
const autoclickerPerformanceTestData = JSON.parse(JSON.stringify(allLevelsUnlockedData));

autoclickerPerformanceTestData["clan"]["members"]["Bot"] = 100;
// ---------------------------------------------------------------------
const smithingTestData = JSON.parse(JSON.stringify(allLevelsUnlockedData));

smithingTestData["inventory"].filter((x) => x.item == "Coin")[0].count = 69240;
smithingTestData["inventory"].push({ item: "BronzeBar", count: 42069 });
smithingTestData["inventory"].push({ item: "CopperOre", count: 76543 });
smithingTestData["inventory"].push({ item: "TinOre", count: 76543 });

console.log(smithingTestData["inventory"]);
// ---------------------------------------------------------------------

export const dataMap = {
    "new-game": defaultData,
    "all-levels": allLevelsUnlockedData,
    "autoclicker-performance": autoclickerPerformanceTestData,
    smithing: smithingTestData,
    rich: richData,
};
