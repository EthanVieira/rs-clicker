import { dataMap } from "./test-data.js";
import { characterData } from "../cookie-io.js";
import { CONSTANTS, FONTS } from "../constants/constants.js";
import * as Utilities from "../utilities.js";

export function load(dataName) {
    let chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    // check if data exists
    if (dataMap.hasOwnProperty(dataName)) {
        // set current location to Tutorial Island to avoid any bugs of being
        // somewhere you haven't unlocked as per the newly loaded data
        characterData
            .getScene(characterData.getCurrentLevel())
            .scene.start(CONSTANTS.SCENES.TUTORIAL_ISLAND);
        // load in the new data
        characterData.loadData(JSON.parse(JSON.stringify(dataMap[dataName])));

        chatScene.writeText("Loading: " + dataName);
    } else {
        chatScene.writeText('The test data "' + dataName + '" does not exist.');
    }
}

export function unlockLevel(dataName) {
    let chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);

    const constName = dataName.toUpperCase();
    if (constName == "ALL") {
        // unlock all levels
        for (let level in characterData.characterData.levels) {
            characterData.setQuestCompleted(CONSTANTS.PREREQUISITES[level]);
        }
    } else if (characterData.characterData.levels.hasOwnProperty(constName)) {
        // unlock the level if it exists and start the newly unlocked scene

        characterData.setQuestCompleted(CONSTANTS.PREREQUISITES[constName]);
        chatScene.writeText(
            "Unlocked level: " + Utilities.prettyPrintConstant(constName),
            FONTS.ITEM_STATS
        );

        characterData
            .getScene(characterData.getCurrentLevel())
            .scene.start(CONSTANTS.SCENES[constName]);
    } else {
        chatScene.writeText('The level "' + dataName + '" does not exist.');
    }
}

export function completeQuest(dataName) {
    let chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);

    const constName = dataName.toUpperCase();
    if (constName == "ALL") {
        // complete all quests
        for (let level in characterData.characterData.levels) {
            characterData.setQuestCompleted(level);
        }
    } else if (characterData.characterData.levels.hasOwnProperty(constName)) {
        // complete the quest for a level if it exists
        characterData.setQuestCompleted(constName);
        chatScene.writeText(
            "Completed quest for level: " + Utilities.prettyPrintConstant(constName),
            FONTS.ITEM_STATS
        );
    } else {
        chatScene.writeText('The level "' + dataName + '" does not exist.');
    }
}
