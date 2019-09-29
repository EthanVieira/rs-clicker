import { CONSTANTS } from "../constants.js";

export class MenuScene extends Phaser.Scene{
    levelData = {};
    constructor() {
        super({
            key: CONSTANTS.SCENES.MENU
        })
    }
    init() {
        // receieve data from other scene that initialized this scene
    }
    preload(){

        // NEED:
        // Play 
        
        // Settings
        // Stats
    }
    create(){
        // create the menu screen
        this.add.image(0, 0, 'menu-bg').setOrigin(0,0).setDepth(0);
        this.add.image(400, 300, 'menu').setDepth(1);
        this.add.image(400, 125, 'rsc-logo').setDepth(1);

        // Play
        let playButton = this.add.image(485, 321, "play-button").setDepth(1);
        playButton.setInteractive();
        playButton.on("pointerup", ()=>{
            if (!this.levelData.characterClass) {
                this.scene.start(CONSTANTS.SCENES.CC); 
                console.log("Going to Character Creation");
            }
            else {
                this.scene.start(CONSTANTS.SCENES.LUMBRIDGE, this.levelData); 
                console.log("Going to Lumbridge");
            }
        })

        // Settings
        let settingsButton = this.add.image(319, 321, "settings-button").setDepth(1);

        // Pull in previous data
        this.getCookies();
    }
    getCookies(){
        let cookieArray = ["gold", "characterClass", "enemiesKilled", "timesClicked", "damageByClicking"];

        let decodedCookies = decodeURIComponent(document.cookie).split(';');
        for (let i = 0; i < decodedCookies.length; i++) {
            let cookie = decodedCookies[i];

            // Let level know we have cookies
            this.levelData.hasCookies = true;

            // Remove starting whitespace
            while (cookie[0] == ' ') {
                cookie = cookie.substring(1);
            }

            // Save cookie
            if (cookie != "") {
            	let cookieCrumbs = cookie.split('=');	// Split into (0)name|(1)value
		        let tempValue = parseInt(cookieCrumbs[1]);
		        if (tempValue) { // Int
		        	eval("this.levelData." + cookieCrumbs[0] + "=" + tempValue);
		        }
		        else { // String
		        	eval("this.levelData." + cookieCrumbs[0] + "='" + cookieCrumbs[1] + "'");
		        }
            }
        }
    }
}

