import { defaultData } from "./data/default-data.js";
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

    loadData(data) {
        this.characterData = data;
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

    addClanMember(memberName, amount = 1) {
        if (memberName in this.characterData.clan.members) {
            this.characterData.clan.members[memberName] += amount;
        } else {
            this.characterData.clan.members[memberName] = amount;
        }
    }
    getClanMembers() {
        return this.characterData.clan.members;
    }

    addFriend(name) {
        if (!this.characterData.friends.includes(name)) {
            this.characterData.friends.push(name);
        }
    }
    removeFriend(name) {
        this.characterData.friends = this.characterData.friends.filter(
            (friend) => friend != name
        );
    }
    getFriends() {
        return this.characterData.friends;
    }

    getAttackStyle() {
        return this.characterData.attackStyle;
    }

    setAttackStyle(styleNum) {
        if (styleNum >= 0 && styleNum <= 2) {
            this.characterData.attackStyle = styleNum;
        } else {
            console.log("Error: setAttackStyle() index out of range:", styleNum);
        }
    }

    getAutoRetaliate() {
        return this.characterData.autoRetaliate;
    }

    setAutoRetaliate(willRetaliate) {
        this.characterData.autoRetaliate = willRetaliate;
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

    // map of skill: xp as input
    addSkillXp(skillXpMap) {
        let animationMap = {};

        for (var skill in skillXpMap) {
            const xp = skillXpMap[skill];
            if (this.characterData.skills[skill] != undefined) {
                const prevLevel = Utilities.calcLevel(this.characterData.skills[skill]);
                this.characterData.skills[skill] = Math.min(
                    this.characterData.skills[skill] + xp,
                    CONSTANTS.LIMITS.MAX_XP
                );

                const curLevel = Utilities.calcLevel(this.characterData.skills[skill]);

                // Play level up sfx
                if (curLevel > prevLevel) {
                    const audioScene = this.getScene(CONSTANTS.SCENES.AUDIO);
                    audioScene.playSfx(skill + "-level-up");

                    // Write level up text to chat
                    const chatScene = this.getScene(CONSTANTS.SCENES.CHAT);
                    const logString =
                        Utilities.prettyPrintCamelCase(skill) +
                        " leveled up to " +
                        curLevel;
                    chatScene.writeText(logString, FONTS.ITEM_STATS);
                }

                // Update xp text on dashboard
                const dashboardScene = this.getScene(CONSTANTS.SCENES.DASHBOARD);
                dashboardScene.skills.updateSkillsText();
                animationMap[skill] = xp;
            } else {
                console.log("Error: setting invalid skill", skill, xp);
            }
        }

        // Show xp animation
        this.getScene(CONSTANTS.SCENES.ANIMATION).showXp(animationMap);
    }

    setSkillXp(skill, xp) {
        if (this.characterData.skills[skill] != undefined) {
            this.characterData.skills[skill] = Math.min(xp, CONSTANTS.LIMITS.MAX_XP);

            // Update xp text on dashboard
            const dashboardScene = this.getScene(CONSTANTS.SCENES.DASHBOARD);
            dashboardScene.skills.updateSkillsText();
        } else {
            console.log("Error: setting invalid skill", skill);
        }
    }

    setXpForAllSkills(xp) {
        for (let skill in this.characterData.skills) {
            this.setSkillXp(skill, xp);
        }
    }

    setSkillLevel(skill, level) {
        if (this.characterData.skills[skill] != undefined) {
            this.characterData.skills[skill] = Math.min(
                Utilities.calcXpForLevel(level),
                CONSTANTS.LIMITS.XP_FOR_99
            );

            // Update xp text on dashboard
            const dashboardScene = this.getScene(CONSTANTS.SCENES.DASHBOARD);
            dashboardScene.skills.updateSkillsText();
        } else {
            console.log("Error: setting invalid skill", skill);
        }
    }

    setLevelForAllSkills(level) {
        for (let skill in this.characterData.skills) {
            this.setSkillLevel(skill, level);
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

    // This sets the quest to be completed, unlocks associated levels, and gives quest points
    // It does NOT give the actual KC that would be required to complete the quest normally
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

                    // Write unlock text to chat
                    const chatScene = this.getScene(CONSTANTS.SCENES.CHAT);
                    chatScene.writeText(
                        "Unlocked " + Utilities.prettyPrintConstant(level),
                        FONTS.ITEM_STATS
                    );
                }
            }

            this.addQuestPoints(this.getScene(CONSTANTS.SCENES[scene]).questPointAward);
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
        const dateTime = new Date();
        dateTime.setTime(dateTime.getTime() + CONSTANTS.UTILS.MILLIS_IN_YEAR);
        const expireString = `expires=${dateTime.toUTCString()};`;

        // Format cookie data
        const jsonString = JSON.stringify(this.characterData);
        const dataString = `characterData=${jsonString};`;
        const boilerplate = "path=/;SameSite=Strict;";

        document.cookie = dataString + expireString + boilerplate;
    }

    reset() {
        this.characterData = getDefaultData();
    }
}

export const characterData = new CharacterData();
