import { dataMap } from "./test-data.js";
import { characterData } from "../cookie-io.js";
import { CONSTANTS } from "../constants/constants.js";

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
