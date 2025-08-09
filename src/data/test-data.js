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
smithingTestData["currentLevel"] = CONSTANTS.SCENES.VARROCK_ANVIL;
// ---------------------------------------------------------------------
const smeltingTestData = JSON.parse(JSON.stringify(smithingTestData));
smeltingTestData["currentLevel"] = CONSTANTS.SCENES.AL_KHARID_FURNACE;
// ---------------------------------------------------------------------
const fishingTestData = JSON.parse(JSON.stringify(generalTestData));
fishingTestData["inventory"].find((x) => x.item == "SmallFishingNet").count = 69240;
fishingTestData["currentLevel"] = CONSTANTS.SCENES.DRAYNOR_FISHING;
// ---------------------------------------------------------------------
const cookingTestData = JSON.parse(JSON.stringify(generalTestData));
cookingTestData["inventory"].push({ item: "RawShrimps", count: 42069 });
cookingTestData["inventory"].push({ item: "RawAnchovies", count: 42069 });
cookingTestData["currentLevel"] = CONSTANTS.SCENES.ROGUES_DEN_COOKING;
// ---------------------------------------------------------------------
const firemakingTestData = JSON.parse(JSON.stringify(generalTestData));
firemakingTestData["inventory"].push({ item: "NormalLogs", count: 42069 });
// ---------------------------------------------------------------------
const runecraftingTestData = JSON.parse(JSON.stringify(generalTestData));
runecraftingTestData["inventory"].push({ item: "RuneEssence", count: 42069 });
runecraftingTestData["inventory"].push({ item: "PureEssence", count: 42069 });
runecraftingTestData["inventory"].push({ item: "AirTalisman", count: 42069 });
runecraftingTestData["currentLevel"] = CONSTANTS.SCENES.AIR_ALTAR;
// ---------------------------------------------------------------------
const constructionTestData = JSON.parse(JSON.stringify(generalTestData));
constructionTestData["inventory"].push({ item: "NormalLogs", count: 42069 });
constructionTestData["inventory"].push({ item: "NormalPlank", count: 42069 });
constructionTestData["currentLevel"] = CONSTANTS.SCENES.PLAYER_OWNED_HOUSE;
// ---------------------------------------------------------------------
const magicTestData = JSON.parse(JSON.stringify(generalTestData));
magicTestData["inventory"].push({ item: "AirRune", count: 42069 });
magicTestData["inventory"].push({ item: "WaterRune", count: 42069 });
magicTestData["inventory"].push({ item: "EarthRune", count: 42069 });
magicTestData["inventory"].push({ item: "FireRune", count: 42069 });
magicTestData["inventory"].push({ item: "MindRune", count: 42069 });
magicTestData["inventory"].push({ item: "AirStaff", count: 1 });
magicTestData["inventory"].push({ item: "WaterStaff", count: 1 });
magicTestData["inventory"].push({ item: "EarthStaff", count: 1 });
magicTestData["inventory"].push({ item: "FireStaff", count: 1 });
// ---------------------------------------------------------------------
const prayerTestData = JSON.parse(JSON.stringify(generalTestData));
prayerTestData["skills"]["prayer"] = 2100000; // lvl 80
prayerTestData["prayerPoints"] = 80;
prayerTestData["inventory"].push({ item: "NormalBones", count: 100000 });
prayerTestData["currentLevel"] = CONSTANTS.SCENES.LUMBRIDGE_ALTAR;
// ---------------------------------------------------------------------
const thievingTestData = JSON.parse(JSON.stringify(generalTestData));
thievingTestData["skills"]["thieving"] = 2100000; // lvl 80
thievingTestData["currentLevel"] = CONSTANTS.SCENES.LUMBRIDGE_THIEVING;
export const dataMap = {
    "new-game": defaultData,
    "all-levels": allLevelsUnlockedData,
    "autoclicker-performance": autoclickerPerformanceTestData,
    general: generalTestData,
    smithing: smithingTestData,
    smelting: smeltingTestData,
    fishing: fishingTestData,
    cooking: cookingTestData,
    firemaking: firemakingTestData,
    runecrafting: runecraftingTestData,
    construction: constructionTestData,
    magic: magicTestData,
    prayer: prayerTestData,
    rich: richData,
    thieving: thievingTestData,
};
