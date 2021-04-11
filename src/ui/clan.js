import { CONSTANTS } from "../constants/constants.js";
import { getAutoclickerClass } from "../auto-clickers/auto-clicker.js";
import { characterData } from "../cookie-io.js";
import { ScrollWindow } from "./scroll-window.js";

// Clan members function as autoclickers
export class Clan {
    dashboard;
    scrollWindow;

    // Phaser objects
    panel;
    button;
    playerNameText;
    clanNameText;
    clanMembers = [];

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Panel
        this.panel = dashboard.add
            .image(550, 204, "clan-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        // Button
        this.button = dashboard.add
            .image(522, 466, "clan-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.show();
            });

        // Clan member scroll window
        this.scrollWindow = new ScrollWindow({
            name: "clans",
            x: 535,
            y: 280,
            width: 175,
            height: 140,
            numColumns: 1,
            padding: 10,
        });
        this.dashboard.scene.add(this.scrollWindow.name, this.scrollWindow, true);
        this.scrollWindow.refresh();

        // Update and show clan info on startup
        this.refreshClan();

        // Default to hidden
        this.show(false);

        // Scene destructor
        dashboard.events.once("shutdown", () => {
            this.destroy();
        });
    }

    // Load clan data on startup
    async refreshClan() {
        // Load clan name and player name
        this.clanNameText = this.dashboard.add
            .text(610, 228, characterData.getClanName(), {
                font: "15.5px runescape",
                fill: "yellow",
            })
            .setDepth(3);
        this.playerNameText = this.dashboard.add
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
        this.dashboard.currentScene.stats.resetAutoclickerDps();
        let savedClanMembers = characterData.getClanMembers();
        for (let index = 0; index < savedClanMembers.length; index++) {
            let memberName = savedClanMembers[index];
            let member = await getAutoclickerClass(memberName, this.scrollWindow);
            member.createText(false, startX, startY + (index + 1) * yDiff);
            member.setVisible(false);
            member.start(this.dashboard.currentScene);
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
        let show = this.dashboard.currentPanel == CONSTANTS.PANEL.CLAN;
        member.setVisible(show);

        this.scrollWindow.addObject(member);
    }

    show(isVisible = true) {
        if (isVisible) {
            this.dashboard.hideAllMenus();
            this.scrollWindow.refresh();
            this.dashboard.currentPanel = CONSTANTS.PANEL.CLAN;
            this.button.setAlpha(1);
        } else {
            this.button.setAlpha(0.1);
        }

        this.panel.visible = isVisible;
        this.scrollWindow.setVisible(isVisible);
        this.playerNameText.visible = isVisible;
        this.clanNameText.visible = isVisible;
    }

    destroy() {
        this.dashboard.scene.remove(this.scrollWindow.name);
        this.clanMembers.forEach((member) => {
            member.destroy();
        });
        this.playerNameText.destroy();
        this.clanNameText.destroy();
    }
}
