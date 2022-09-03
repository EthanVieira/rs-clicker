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
            // Usage:
            // /unlock-song name-of-song
            // if name-of-song is "all", unlock all songs
            // e.g.
            // /unlock-song al-kharid
            // /unlock-song all

            // ensure there is only one argument
            if (words.length != 2) {
                chatScene.writeText("The unlock-song command only takes one argument.");
                chatScene.writeText("/unlock-song name-of-song");
            } else {
                unlockSong(words[1]);
            }
            break;
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

export function unlockLevel(levelName) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);

    const constName = levelName.toUpperCase();
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
        chatScene.writeText(`The level '${levelName}' does not exist.`);
    }
}

export function completeQuest(levelName) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);

    const constName = levelName.toUpperCase();
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
        chatScene.writeText(`The level '${levelName}' does not exist.`);
    }
}

export function unlockSong(songName) {
    // Song unlocks are currently tied to quest completion, so if we want
    // to be able to unlock songs independently, we will need to decouple
    // them in the future

    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    const dashScene = characterData.getScene(CONSTANTS.SCENES.DASHBOARD);

    const constName = songName.toLowerCase();
    if (constName == "all") {
        // unlock all songs
        dashScene.music.songTexts.forEach((textObj) => {
            characterData.setQuestCompleted(textObj.prereq);
            // Let the music scene handle the rest
        });
        return;
    }

    const songTextObj = dashScene.music.songTexts.find(
        (textObj) => textObj.text == constName
    );

    if (songTextObj != undefined) {
        // unlock the song if it exists and play it
        // this may unlock other songs as well since songs can share prereqs
        characterData.setQuestCompleted(songTextObj.prereq);
        const audioScene = characterData.getScene(CONSTANTS.SCENES.AUDIO);
        audioScene.playBgm(constName);
        // The music scene will write the unlock text for us
    } else {
        chatScene.writeText(`The song '${songName}' does not exist.`);
    }
}
