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
const generalTestData = JSON.parse(JSON.stringify(allLevelsUnlockedData));
generalTestData["inventory"].find((x) => x.item == "Coin").count =
    CONSTANTS.LIMITS.MAX_ITEM_STACK;
// ---------------------------------------------------------------------
const smithingTestData = JSON.parse(JSON.stringify(generalTestData));
smithingTestData["inventory"].push({ item: "BronzeBar", count: 42069 });
smithingTestData["inventory"].push({ item: "CopperOre", count: 76543 });
smithingTestData["inventory"].push({ item: "TinOre", count: 76543 });
// ---------------------------------------------------------------------
const fishingTestData = JSON.parse(JSON.stringify(generalTestData));
fishingTestData["inventory"].find((x) => x.item == "SmallFishingNet").count = 69240;
// ---------------------------------------------------------------------
const cookingTestData = JSON.parse(JSON.stringify(generalTestData));
cookingTestData["inventory"].push({ item: "RawShrimps", count: 42069 });
cookingTestData["inventory"].push({ item: "RawAnchovies", count: 42069 });
// ---------------------------------------------------------------------
const firemakingTestData = JSON.parse(JSON.stringify(generalTestData));
firemakingTestData["inventory"].push({ item: "NormalLogs", count: 42069 });
// ---------------------------------------------------------------------
const runecraftingTestData = JSON.parse(JSON.stringify(generalTestData));
runecraftingTestData["inventory"].push({ item: "RuneEssence", count: 42069 });
runecraftingTestData["inventory"].push({ item: "PureEssence", count: 42069 });
// ---------------------------------------------------------------------
export const dataMap = {
    "new-game": defaultData,
    "all-levels": allLevelsUnlockedData,
    "autoclicker-performance": autoclickerPerformanceTestData,
    general: generalTestData,
    smithing: smithingTestData,
    fishing: fishingTestData,
    cooking: cookingTestData,
    firemaking: firemakingTestData,
    runecrafting: runecraftingTestData,
    rich: richData,
};
