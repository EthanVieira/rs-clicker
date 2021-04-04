import { CONSTANTS } from "../constants/constants.js";
import { ScrollWindow } from "./scroll-window.js";
import { characterData } from "../cookie-io.js";
import { prettyPrintCamelCase } from "../utilities.js";

export class MusicPanel {
    dashboard;
    scrollWindow;

    constructor(dashboard) {
        this.dashboard = dashboard;

        this.scrollWindow = new ScrollWindow({
            name: "music",
            x: 536,
            y: 262,
            width: 175,
            height: 186,
            numColumns: 1,
            padding: 10,
        });
        this.dashboard.scene.add(this.scrollWindow.name, this.scrollWindow, true);
        this.scrollWindow.refresh();
    }

    show(isVisible) {
        this.isTextVisible = isVisible;
        if (isVisible) {
            this.scrollWindow.refresh();
            this.dashboard.currentPanel = CONSTANTS.PANEL.MUSIC;
        }
        this.scrollWindow.setVisible(isVisible);
    }

    destroy() {}
}
