import { CONSTANTS } from "../constants/constants.js";
import { getAutoclickerClass } from "../auto-clickers/auto-clicker.js";

// Clan members function as autoclickers
export class Clan {
    scene;
    scrollWindow;

    // Pointer to cookies, stores clan name and member names
    clanCookies;
    characterData;

    // Phaser objects
    playerNameText;
    clanNameText;
    clanMembers = [];

    constructor(scene, scrollWindow) {
        this.scene = scene;
        this.scrollWindow = scrollWindow;
        this.characterData = scene.characterData;
        this.clanCookies = this.characterData.clan;

        // Update and show clan info on startup
        this.refreshClan();
    }

    // Load clan data on startup
    async refreshClan() {
        // Load clan name and player name
        this.clanNameText = this.scene.add
            .text(610, 228, this.clanCookies.name, {
                font: "15.5px runescape",
                fill: "yellow",
            })
            .setDepth(3);
        this.playerNameText = this.scene.add
            .text(610, 242, this.characterData.name, {
                font: "15.5px runescape",
            })
            .setDepth(3);

        // Load clan members
        const startX = 560,
            startY = 280,
            yDiff = 18;
        let playerName = this.scrollWindow.add
            .text(startX, startY, this.characterData.name, {
                font: "16px runescape",
            })
            .setDepth(3)
            .setVisible(false);
        this.clanMembers.push(playerName);

        // Reset dps counter before refreshing autoclickers
        this.scene.currentScene.stats.resetAutoclickerDps();
        for (let index = 0; index < this.clanCookies.members.length; index++) {
            let memberName = this.clanCookies.members[index];
            let member = await getAutoclickerClass(memberName, this.scrollWindow);
            member.createText(false, startX, startY + (index + 1) * yDiff);
            member.setVisible(false);
            member.start(this.scene.currentScene);
            this.clanMembers.push(member);
        }
    }

    // Add clan member to list
    addClanMember(member) {
        const startX = 560,
            startY = 280,
            yDiff = 18;

        // Add text to the list
        let index = this.clanMembers.length;
        member.createText(false, startX, startY + index * yDiff);
        this.clanMembers.push(member);

        // Add to saved data
        this.clanCookies.members.push(member.name);

        // Hide if clan tab is not selected
        let show = this.scene.currentPanel == CONSTANTS.PANEL.CLAN;
        member.setVisible(show);

        this.scrollWindow.addObject(member);
    }

    show(isVisible) {
        this.scrollWindow.refresh({
            x: 535,
            y: 280,
            width: 175,
            height: 140,
            numColumns: 1,
            padding: 10,
            objects: this.clanMembers,
        });
        if (isVisible) {
            this.scene.currentPanel = CONSTANTS.PANEL.CLAN;
        }
        this.scrollWindow.setVisible(isVisible);
        this.playerNameText.visible = isVisible;
        this.clanNameText.visible = isVisible;
    }

    destroy() {
        this.clanMembers.forEach((member) => {
            member.destroy();
        });
        this.playerNameText.destroy();
        this.clanNameText.destroy();
    }
}
