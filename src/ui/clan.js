import { CONSTANTS } from "../constants/constants.js";
import { getAutoclickerClass } from "../auto-clickers/auto-clicker.js";
import { characterData } from "../cookie-io.js";

// Clan members function as autoclickers
export class Clan {
    scene;
    scrollWindow;

    // Phaser objects
    playerNameText;
    clanNameText;
    clanMembers = [];

    constructor(scene, scrollWindow) {
        this.scene = scene;
        this.scrollWindow = scrollWindow;

        // Update and show clan info on startup
        this.refreshClan();
    }

    // Load clan data on startup
    async refreshClan() {
        // Load clan name and player name
        this.clanNameText = this.scene.add
            .text(610, 228, characterData.getClanName(), {
                font: "15.5px runescape",
                fill: "yellow",
            })
            .setDepth(3);
        this.playerNameText = this.scene.add
            .text(610, 242, characterData.getName(), {
                font: "15.5px runescape",
            })
            .setDepth(3);

        // Load clan members
        const startX = 560,
            startY = 280,
            yDiff = 18;
        let playerName = this.scrollWindow.add
            .text(startX, startY, characterData.getName(), {
                font: "16px runescape",
            })
            .setDepth(3)
            .setVisible(false);
        this.clanMembers.push(playerName);

        // Reset dps counter before refreshing autoclickers
        this.scene.currentScene.stats.resetAutoclickerDps();
        let savedClanMembers = characterData.getClanMembers();
        for (let index = 0; index < savedClanMembers.length; index++) {
            let memberName = savedClanMembers[index];
            let member = await getAutoclickerClass(memberName, this.scrollWindow);
            member.createText(false, startX, startY + (index + 1) * yDiff);
            member.setVisible(false);
            member.start(this.scene.currentScene);
            this.clanMembers.push(member);
            this.scrollWindow.addObject(member);
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
        characterData.addClanMember(member.name);

        // Hide if clan tab is not selected
        let show = this.scene.currentPanel == CONSTANTS.PANEL.CLAN;
        member.setVisible(show);

        this.scrollWindow.addObject(member);
    }

    show(isVisible) {
        if (isVisible) {
            this.scrollWindow.refresh();
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
