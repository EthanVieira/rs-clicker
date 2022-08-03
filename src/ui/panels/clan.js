import { CONSTANTS } from "../../constants/constants.js";
import { getAutoclickerClass } from "../../auto-clickers/auto-clicker.js";
import { characterData } from "../../cookie-io.js";
import { ScrollWindow } from "../scroll-window.js";

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
                this.setVisible();
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
        this.setVisible(false);

        // Scene destructor
        dashboard.events.once("shutdown", () => this.destroy());
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
        for (let memberName in savedClanMembers) {
            let member = await getAutoclickerClass(memberName, this.scrollWindow);
            member.numberOwned = savedClanMembers[memberName];
            member.createText(
                false,
                startX,
                startY + (this.clanMembers.length + 1) * yDiff
            );
            member.setVisible(false);
            member.start(this.dashboard.currentScene);
            this.clanMembers.push(member);
            this.scrollWindow.addObject(member.text);
        }
    }

    // Add clan member to list
    addClanMember(memberName) {
        // Add to saved data
        characterData.addClanMember(memberName);

        // Add visuals if the dashboard is up
        if (this.dashboard.scene.isActive()) {
            const startX = 560,
                startY = 280,
                yDiff = 18;

            // Add new clan entry if new member else increment existing members
            const member = this.clanMembers.find((member) => member.name === memberName);
            if (!member) {
                member = getAutoclickerClass(memberName, this.scrollWindow);
                member.createText(
                    false,
                    startX,
                    startY + this.clanMembers.length * yDiff
                );
                this.clanMembers.push(newMember);
            }
            member.numberOwned++;

            // Hide if clan tab is not selected
            let show = this.dashboard.currentPanel == CONSTANTS.PANEL.CLAN;
            member.setVisible(show);

            this.scrollWindow.addObject(member);
        }
    }

    setVisible(isVisible = true) {
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
