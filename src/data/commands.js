import { dataMap } from "./test-data.js";
import { characterData } from "../cookie-io.js";
import { CONSTANTS, FONTS } from "../constants/constants.js";
import * as Utilities from "../utilities.js";

export function handleCommand(commandStr) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    const words = commandStr.split(" ");

    // remove "/" from command word
    const command = words[0].substr(1).toLowerCase();

    switch (command) {
        case "load":
            // Usage:
            // /load name-of-test-data
            // e.g.
            // /load new-game
            // /load all-levels

            // ensure there is only one argument
            if (words.length != 2) {
                chatScene.writeText("The load command only takes one argument.");
                chatScene.writeText("/load name-of-test-data");
            } else {
                load(words[1]);
            }
            break;

        case "unlock-level":
            // Usage:
            // /unlock-level name-of-level
            // if name-of-level is "all", unlock all levels
            // e.g.
            // /unlock-level varrock
            // /unlock-level all

            // ensure there is only one argument
            if (words.length != 2) {
                chatScene.writeText("The unlock-level command only takes one argument.");
                chatScene.writeText("/unlock-level name-of-level");
            } else {
                unlockLevel(words[1]);
            }
            break;
        case "unlock-song":
        case "complete-quest":
            // Usage:
            // /complete-quest name-of-level
            // if name-of-level is "all", complete all quests
            // e.g.
            // /complete-quest tutorial_island
            // /complete-quest all

            // ensure there is only one argument
            if (words.length != 2) {
                chatScene.writeText(
                    "The complete-quest command only takes one argument."
                );
                chatScene.writeText("/complete-quest name-of-level");
            } else {
                completeQuest(words[1]);
            }
            break;

        // TODO:
        case "add-item":
        case "add-member":
        case "set-level":
        case "set-xp":
            chatScene.writeText(`The command: '${command}' is not yet implemented.`);
            break;

        default:
            chatScene.writeText(`Invalid command: ${command}`);
    }
}

export function load(dataName) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    // check if data exists
    if (dataMap.hasOwnProperty(dataName)) {
        // set current location to Tutorial Island to avoid any bugs of being
        // somewhere you haven't unlocked as per the newly loaded data
        characterData
            .getScene(characterData.getCurrentLevel())
            .scene.start(CONSTANTS.SCENES.TUTORIAL_ISLAND);
        // load in the new data
        characterData.loadData(JSON.parse(JSON.stringify(dataMap[dataName])));

        chatScene.writeText(`Loading: ${dataName}`);
    } else {
        chatScene.writeText(`The test data '${dataName}' does not exist.`);
    }
}

export function unlockLevel(dataName) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);

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
        chatScene.writeText(`The level '${dataName}' does not exist.`);
    }
}

export function completeQuest(dataName) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);

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
        chatScene.writeText(`The level '${dataName}' does not exist.`);
    }
}
