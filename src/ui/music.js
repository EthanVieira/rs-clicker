import { CONSTANTS } from "../constants/constants.js";
import { ScrollWindow } from "./scroll-window.js";
import { characterData } from "../cookie-io.js";
import { prettyPrintCamelCase } from "../utilities.js";

export class MusicPanel {
    dashboard;
    scrollWindow;
    panel;
    button;

    constructor(dashboard) {
        this.dashboard = dashboard;

        // Add scroll window
        this.scrollWindow = new ScrollWindow({
            name: "music",
            x: 536,
            y: 262,
            width: 175,
            height: 186,
            numColumns: 1,
            padding: 10,
        });
        dashboard.scene.add(this.scrollWindow.name, this.scrollWindow, true);
        this.scrollWindow.refresh();

        // Add button / panel
        this.panel = dashboard.add
            .image(546, 205, "music-panel")
            .setOrigin(0, 0)
            .setDepth(1);
        this.button = dashboard.add
            .image(725, 466, "music-button")
            .setOrigin(0, 0)
            .setDepth(2)
            .setInteractive()
            .on("pointerdown", () => {
                this.show(true);
            });

        // Setup destructor
        dashboard.events.once("shutdown", () => {
            dashboard.scene.remove(this.scrollWindow.name);
        });
    }

    show(isVisible) {
        this.isTextVisible = isVisible;
        if (isVisible) {
            this.scrollWindow.refresh();
            this.dashboard.hideAllMenus();
            this.button.setAlpha(1);
            this.dashboard.currentPanel = CONSTANTS.PANEL.MUSIC;
        } else {
            this.button.setAlpha(0.1);
        }
        this.panel.visible = isVisible;
        this.scrollWindow.setVisible(isVisible);
    }

    destroy() {}
}
