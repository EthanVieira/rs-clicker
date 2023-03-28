import { CONSTANTS, FONTS } from "../../constants/constants.js";
import { characterData } from "../../cookie-io.js";
import { ScrollWindow } from "../scroll-window.js";

export class Friends {
    dashboard;
    panel;
    scrollWindow;
    button;
    addButton;
    deleteButton;
    friends = [];

    constructor(dashboard) {
        this.dashboard = dashboard;
        this.chat = dashboard.scene.get(CONSTANTS.SCENES.CHAT);

        // Add button / panel
        this.panel = dashboard.add
            .image(550, 204, "friends-panel")
            .setOrigin(0, 0)
            .setDepth(1);

        this.button = dashboard.add
            .image(560, 466, "friends-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.setVisible(true);
            });

        // Add scroll window
        this.scrollWindow = new ScrollWindow({
            name: "friends",
            x: 537,
            y: 234,
            width: 171,
            height: 185,
            numColumns: 1,
            padding: 1,
        });
        dashboard.scene.add(this.scrollWindow.name, this.scrollWindow, true);
        this.scrollWindow.refresh();

        // Add friend button
        this.addButton = dashboard.add.image(605, 448, "add-friend-button").setDepth(1);
        this.addButton.setInteractive();
        this.addButton.on("pointerup", () => {
            // TODO if we decide to make this functional
        });

        // delete friend button
        this.deleteButton = dashboard.add
            .image(805, 448, "delete-friend-button")
            .setDepth(1);
        this.deleteButton.setInteractive();
        this.deleteButton.on("pointerup", () => {
            /// TODO if we decide to make this functional
        });

        // Update and show friends on startup
        this.updateFriends();

        // Default to hidden
        this.setVisible(false);
        // Destructor
        dashboard.events.once("shutdown", () => this.destroy());
    }

    updateFriends(isVisible = true) {
        this.scrollWindow.clearObjects();

        // Load friends
        this.friends = characterData.getFriends();

        let friendsText = [];

        this.friends.forEach((name) => {
            // TODO: when we add functionality for on/offline
            // we would change text color here

            let textObj = this.scrollWindow.add
                .text(0, 0, "", { font: "15.5px runescape" })
                .setInteractive()
                .on("pointerup", () => {
                    // TODO: maybe allow message sending if they are online.
                    // ChatGpt Zezima
                });

            textObj.text = name;
            // TODO add offline/world to text
            // TODO sort by status

            friendsText.push(textObj);
        });

        this.scrollWindow.addObjects(friendsText);

        this.scrollWindow.refresh();
        this.scrollWindow.setVisible(isVisible);
    }

    setVisible(isVisible) {
        if (isVisible) {
            this.scrollWindow.refresh();
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.FRIENDS;
        } else {
            this.button.setAlpha(0.1);
        }
        this.panel.visible = isVisible;
        this.scrollWindow.setVisible(isVisible);

        this.addButton.visible = isVisible;
        this.deleteButton.visible = isVisible;
    }

    destroy() {
        this.dashboard.scene.remove(this.scrollWindow.name);
    }
}
