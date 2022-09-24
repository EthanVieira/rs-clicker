import { dataMap } from "./test-data.js";
import { characterData } from "../cookie-io.js";
import { CONSTANTS, FONTS } from "../constants/constants.js";
import * as Utilities from "../utilities.js";
import { autoclickerManifest } from "../auto-clickers/auto-clicker-manifest.js";
import { getAutoclickerClass } from "../auto-clickers/auto-clicker.js";

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
                chatScene.writeText("The load command takes one argument.");
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
                chatScene.writeText("The unlock-level command takes one argument.");
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
                chatScene.writeText("The unlock-song command takes one argument.");
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
                chatScene.writeText("The complete-quest command takes one argument.");
                chatScene.writeText("/complete-quest name-of-level");
            } else {
                completeQuest(words[1]);
            }
            break;

        case "set-level":
            // Usage:
            // /set-level name-of-skill level
            // if name-of-skill is "all", set all skills to the given level
            // if level is "max", set the skill to 99
            // e.g.
            // /set-level fletching 72
            // /set-level all max

            // ensure there are exactly 2 arguments
            if (words.length != 3) {
                chatScene.writeText("The set-level command takes two arguments.");
                chatScene.writeText("/set-level name-of-skill level");
            } else {
                setLevel(words[1], words[2]);
            }
            break;
        case "set-xp":
            // Usage:
            // /set-xp name-of-skill xp
            // if name-of-skill is "all", set all skills to the given xp
            // if xp is "max", set the xp to 200,000,000
            // e.g.
            // /set-xp fletching 236674
            // /set-xp all max

            // ensure there are exactly 2 arguments
            if (words.length != 3) {
                chatScene.writeText("The set-xp command takes two arguments.");
                chatScene.writeText("/set-xp name-of-skill xp");
            } else {
                setXp(words[1], words[2]);
            }
            break;
        case "add-item":
            // Usage:
            // /add-item name-of-item amount
            // amount is optional and defaults to 1
            // if amount is "max", set the amount to 2,147,483,647 if stackable or 28 if not stackable
            // e.g.
            // /add-item gold max
            // /add-item BronzeDagger

            // ensure there are either 1 or 2 arguments
            if (words.length != 2 && words.length != 3) {
                chatScene.writeText("The add-item command takes one or two arguments.");
                chatScene.writeText("/add-item name-of-item amount");
            } else {
                addItem(words[1], words.length == 3 ? words[2] : "1");
            }
            break;
        case "add-member":
            // Usage:
            // /add-member name-of-member amount
            // amount is optional and defaults to 1
            // e.g.
            // /add-member bot 10
            // ensure there are either 1 or 2 arguments
            if (words.length != 2 && words.length != 3) {
                chatScene.writeText("The add-member command takes one or two arguments.");
                chatScene.writeText("/add-member name-of-member amount");
            } else {
                addMember(words[1], words.length == 3 ? words[2] : "1");
            }
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

export function setLevel(skillName, level) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    const constName = skillName.toLowerCase();
    const isMax = level.toLowerCase() == "max";
    const levelInt = parseInt(level);

    if (!isMax && isNaN(levelInt)) {
        chatScene.writeText(`Cannot set a skill's level to a non-integer value.`);
        return;
    }

    if (constName == "all") {
        if (isMax) {
            characterData.setLevelForAllSkills(CONSTANTS.LIMITS.MAX_LEVEL);
        } else {
            characterData.setLevelForAllSkills(levelInt);
        }
    } else if (characterData.getSkills().hasOwnProperty(constName)) {
        if (isMax) {
            characterData.setSkillLevel(CONSTANTS.LIMITS.MAX_LEVEL);
        } else {
            characterData.setSkillLevel(constName, levelInt);
        }
    } else {
        chatScene.writeText(`The skill '${skillName}' does not exist.`);
    }
}

export function setXp(skillName, xp) {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    const constName = skillName.toLowerCase();
    const isMax = xp.toLowerCase() == "max";
    const xpInt = parseInt(xp);

    if (!isMax && isNaN(xpInt)) {
        chatScene.writeText(`Cannot set a skill's xp to a non-integer value.`);
        return;
    }

    if (constName == "all") {
        if (isMax) {
            characterData.setXpForAllSkills(CONSTANTS.LIMITS.MAX_XP);
        } else {
            characterData.setXpForAllSkills(xpInt);
        }
    } else if (characterData.getSkills().hasOwnProperty(constName)) {
        if (isMax) {
            characterData.setSkillXp(CONSTANTS.LIMITS.MAX_XP);
        } else {
            characterData.setSkillXp(constName, xpInt);
        }
    } else {
        chatScene.writeText(`The skill '${skillName}' does not exist.`);
    }
}

export async function addItem(itemName, amount = "1") {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    const isMax = amount.toLowerCase() == "max";
    let amountInt = parseInt(amount);

    if (!isMax && isNaN(amountInt)) {
        // invalid amount, go back to default
        amountInt = 1;
    }

    const dashboard = characterData.getScene(CONSTANTS.SCENES.DASHBOARD);
    const itemObj = await Utilities.getItemClass(
        Utilities.capitalize(itemName),
        dashboard
    );

    if (itemObj) {
        dashboard.inventory.addNToInventory(
            itemObj,
            (amount = isMax ? CONSTANTS.LIMITS.MAX_ITEM_STACK : amountInt)
        );
    } else {
        chatScene.writeText(`The item '${itemName}' does not exist.`);
    }
}

export async function addMember(memberName, amount = "1") {
    const chatScene = characterData.getScene(CONSTANTS.SCENES.CHAT);
    let amountInt = parseInt(amount);

    const capitalizedName = Utilities.capitalize(memberName);

    if (isNaN(amountInt)) {
        // invalid amount, go back to default
        amountInt = 1;
    }

    const dashboard = characterData.getScene(CONSTANTS.SCENES.DASHBOARD);

    if (autoclickerManifest.hasOwnProperty(capitalizedName)) {
        dashboard.clan.addClanMember(capitalizedName, amountInt);
    } else {
        chatScene.writeText(`The clan member '${memberName}' does not exist.`);
    }
}
