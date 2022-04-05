import { defaultData } from "./default-data.js";
import { CONSTANTS, FONTS } from "./constants/constants.js";
import * as Utilities from "./utilities.js";

function getDefaultData() {
    // Reset data (deep copy)
    return JSON.parse(JSON.stringify(defaultData));
}

class CharacterData {
    characterData = getDefaultData();
    scene;
    otherScenes = {}; // Hold dictionary of other scenes

    init(scene) {
        this.scene = scene;
    }

    getName() {
        return this.characterData.name;
    }
    setName(name) {
        this.characterData.name = name;
    }

    getCurrentLevel() {
        return this.characterData.currentLevel;
    }
    setCurrentLevel(level) {
        if (this.checkScene(level)) {
            this.characterData.currentLevel = level;
        }
    }

    getTotalEnemiesKilled() {
        let sum = 0;
        for (const level in this.characterData.levels) {
            for (const enemy in this.characterData.levels[level].enemiesKilled) {
                sum += this.characterData.levels[level].enemiesKilled[enemy];
            }
        }
        return sum;
    }

    addTimesClicked(value) {
        this.characterData.timesClicked += value;
    }
    getTimesClicked() {
        return this.characterData.timesClicked;
    }
    incTimesClicked() {
        this.characterData.timesClicked++;
    }

    addDamageByClicking(damage) {
        this.characterData.damageByClicking += damage;
    }
    getDamageByClicking() {
        return this.characterData.damageByClicking;
    }

    addDamageByAutoClicker(damage) {
        this.characterData.damageByAutoClick += damage;
    }
    getDamageByAutoclicker() {
        return Math.floor(this.characterData.damageByAutoClick);
    }

    getInventory() {
        return this.characterData.inventory;
    }
    setInventory(index, obj) {
        this.characterData.inventory[index] = obj;
    }

    getAllEquipment() {
        return this.characterData.equipment;
    }
    getEquipment(slot) {
        if (this.characterData.equipment[slot] !== undefined) {
            return this.characterData.equipment[slot];
        } else {
            console.log("Error: invalid equipment slot", slot);
            return "";
        }
    }
    setEquipment(slot, itemName) {
        if (this.characterData.equipment[slot] !== undefined) {
            this.characterData.equipment[slot] = itemName;
        } else {
            console.log("Error: invalid equipment slot", slot, itemName);
        }
    }

    getClanName() {
        return this.characterData.clan.name;
    }
    setClanName(name) {
        this.characterData.clan.name = name;
    }

    addClanMember(obj) {
        this.characterData.clan.members.push(obj);
    }
    getClanMembers() {
        return this.characterData.clan.members;
    }

    getVolume(typeIndex) {
        if (typeIndex < this.characterData.audio.length) {
            return this.characterData.audio[typeIndex];
        } else {
            console.log("Error: getVolume() index out of range:", typeIndex);
        }
    }
    setVolume(typeIndex, volume) {
        if (typeIndex < this.characterData.audio.length) {
            this.characterData.audio[typeIndex] = volume;
        } else {
            console.log("Error: setVolume() index out of range:", typeIndex);
        }
    }

    addSkillXp(skill, xp) {
        if (this.characterData.skills[skill] != undefined) {
            const prevLevel = Utilities.calcLevel(this.characterData.skills[skill]);
            this.characterData.skills[skill] += xp;
            const curLevel = Utilities.calcLevel(this.characterData.skills[skill]);

            // Play level up sfx
            if (curLevel > prevLevel) {
                const audioScene = this.getScene(CONSTANTS.SCENES.AUDIO);
                audioScene.playSfx(skill + "-level-up");

                // Write level up text to chat
                const chatScene = this.getScene(CONSTANTS.SCENES.CHAT);
                const logString =
                    Utilities.prettyPrintCamelCase(skill) + " leveled up to " + curLevel;
                chatScene.writeText(logString, FONTS.ITEM_STATS);
            }

            // Update xp text on dashboard
            const dashboardScene = this.getScene(CONSTANTS.SCENES.DASHBOARD);
            dashboardScene.skills.updateSkillsText();

            // Show xp animation
            this.getScene(CONSTANTS.SCENES.ANIMATION).showXp(skill, xp);
        } else {
            console.log("Error: setting invalid skill", skill, xp);
        }
    }
    getSkillXp(skill) {
        if (this.characterData.skills[skill] != undefined) {
            return this.characterData.skills[skill];
        } else {
            console.log("Error: getting invalid skill", skill);
            return 0;
        }
    }
    getSkills() {
        return this.characterData.skills;
    }

    getQuestCompleted(scene) {
        if (this.checkScene(scene)) {
            return this.characterData.levels[scene].questCompleted;
        }
    }

    setQuestCompleted(scene) {
        if (this.checkScene(scene)) {
            this.characterData.levels[scene].questCompleted = true;
            // Unlock levels
            for (let level in this.characterData.levels) {
                if (
                    !this.characterData.levels[level].unlocked &&
                    CONSTANTS.PREREQUISITES[level] == scene
                ) {
                    this.characterData.levels[level].unlocked = true;

                    // Write level up text to chat
                    const chatScene = this.getScene(CONSTANTS.SCENES.CHAT);
                    chatScene.writeText(
                        "Unlocked " + Utilities.prettyPrintConstant(level),
                        FONTS.ITEM_STATS
                    );
                }
            }
        }
    }

    addQuestPoints(points) {
        this.characterData.questPoints += points;
    }

    getQuestPoints() {
        return this.characterData.questPoints;
    }

    calcQuestTier(numKilled, tiers) {
        for (const [index, tier] of tiers.slice(0, -1).reverse().entries()) {
            if (numKilled >= tier) {
                return tiers.length - index;
            }
        }
        return 1;
    }

    getUnlockedLevels() {
        let unlockedLevels = [];
        for (var level in this.characterData.levels) {
            if (this.characterData.levels[level].unlocked) {
                unlockedLevels.push(CONSTANTS.SCENES[level]);
            }
        }
        return unlockedLevels;
    }

    getEnemiesInLevel(scene) {
        if (this.checkScene(scene)) {
            return this.characterData.levels[scene].enemiesKilled;
        }
    }

    incEnemiesKilled(scene, enemy) {
        if (this.checkEnemy(scene, enemy)) {
            this.characterData.levels[scene].enemiesKilled[enemy]++;
        }
    }
    getEnemiesKilled(scene, enemy) {
        if (this.checkEnemy(scene, enemy)) {
            return this.characterData.levels[scene].enemiesKilled[enemy];
        }
    }

    checkEnemy(scene, enemy) {
        if (this.checkScene(scene)) {
            if (this.characterData.levels[scene].enemiesKilled[enemy] != undefined) {
                return true;
            } else {
                console.log("Error: getting/setting invalid enemy", enemy);
                return false;
            }
        }
    }

    checkScene(scene) {
        if (this.characterData.levels[scene] != undefined) {
            return true;
        } else {
            console.log("Error: getting/setting invalid scene", scene);
            return false;
        }
    }

    getScene(sceneName) {
        if (this.otherScenes[sceneName] == undefined) {
            this.otherScenes[sceneName] = this.scene.scene.get(sceneName);
        }
        return this.otherScenes[sceneName];
    }

    getCookies() {
        // Pull out first cookie
        let decodedCookies = decodeURIComponent(document.cookie).split(";");
        if (decodedCookies[0] != "") {
            for (let i = 0; i < decodedCookies.length; i++) {
                // Split into (0)name|(1)value
                let cookieCrumbs = decodedCookies[i].split("=");
                if (
                    cookieCrumbs[i] == "characterData" ||
                    cookieCrumbs[i] == " characterData"
                ) {
                    this.characterData = JSON.parse(cookieCrumbs[1]);
                    break;
                }
            }
        }
    }

    storeCookies() {
        this.characterData.hasCookies = true;

        // Lasts for one year
        let dateTime = new Date();
        dateTime.setTime(dateTime.getTime() + CONSTANTS.UTILS.MILLIS_IN_YEAR);
        let expireString = "expires=" + dateTime.toUTCString();

        // Turn characterData into a json string and store it in a cookie
        let jsonString = JSON.stringify(this.characterData);
        document.cookie = "characterData=" + jsonString + ";" + expireString + ";path=/;";
    }

    reset() {
        this.characterData = getDefaultData();
    }
}

export const characterData = new CharacterData();
