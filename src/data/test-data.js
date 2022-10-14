import { defaultData } from "./default-data.js";
import { CONSTANTS } from "../constants/constants.js";

// ---------------------------------------------------------------------
const richData = JSON.parse(JSON.stringify(defaultData));

// Gold already exists in defaultData so we should overwrite it instead of pushing a duplicate stack
richData["inventory"].find((x) => x.item == "Coin").count =
    CONSTANTS.LIMITS.MAX_ITEM_STACK;
// ---------------------------------------------------------------------
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

smithingTestData["inventory"].find((x) => x.item == "Coin").count = 69240;
smithingTestData["inventory"].push({ item: "BronzeBar", count: 42069 });
smithingTestData["inventory"].push({ item: "CopperOre", count: 76543 });
smithingTestData["inventory"].push({ item: "TinOre", count: 76543 });
// ---------------------------------------------------------------------
export const dataMap = {
    "new-game": defaultData,
    "all-levels": allLevelsUnlockedData,
    "autoclicker-performance": autoclickerPerformanceTestData,
    smithing: smithingTestData,
    rich: richData,
};
