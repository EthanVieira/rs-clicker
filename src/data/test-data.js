import { defaultData } from "./default-data.js";
// ---------------------------------------------------------------------
let allLevelsUnlockedData = JSON.parse(JSON.stringify(defaultData));

for (let scene in allLevelsUnlockedData["levels"]) {
    allLevelsUnlockedData["levels"][scene]["questCompleted"] = true;
    allLevelsUnlockedData["levels"][scene]["unlocked"] = true;
}
// ---------------------------------------------------------------------
let autoclickerPerformanceTestData = JSON.parse(JSON.stringify(allLevelsUnlockedData));

autoclickerPerformanceTestData["clan"]["members"]["Bot"] = 100;
// ---------------------------------------------------------------------
let smithingTestData = JSON.parse(JSON.stringify(allLevelsUnlockedData));

smithingTestData["inventory"].push({ item: "Coin", count: 69420 });
smithingTestData["inventory"].push({ item: "BronzeBar", count: 42069 });
smithingTestData["inventory"].push({ item: "CopperOre", count: 76543 });
smithingTestData["inventory"].push({ item: "TinOre", count: 76543 });
// ---------------------------------------------------------------------

export const dataMap = {
    "new-game": defaultData,
    "all-levels": allLevelsUnlockedData,
    "autoclicker-performance": autoclickerPerformanceTestData,
    smithing: smithingTestData,
};
