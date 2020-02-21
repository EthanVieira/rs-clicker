import { CONSTANTS } from "../constants/constants.js";

export class AudioScene extends Phaser.Scene {
    currentSong = {};
    audioLoaded = false;
    currentVolume = 3;
    currentSongName = "scape-main";
    constructor() {
        super({
            key: CONSTANTS.SCENES.AUDIO
        });
    }

    async preload() {
        // Audio
        this.load.audio("scape-main", "src/assets/audio/bgm/ScapeMain.ogg");
        this.load.audio(
            "newbie-melody",
            "src/assets/audio/bgm/NewbieMelody.ogg"
        );
        this.load.audio("harmony", "src/assets/audio/bgm/Harmony.ogg");
        this.load.audio("expanse", "src/assets/audio/bgm/Expanse.mp3");

        this.load.on("complete", () => {
            this.currentSong = this.sound.add(this.currentSongName);
            this.currentSong.play();
            this.audioLoaded = true;
            this.changeVolume(0, this.currentVolume);
        });
    }

    create() {
        // Don't pause BGM when clicking off the window
        this.sound.pauseOnBlur = false;
    }

    async playAudio(audioName) {
        if (this.audioLoaded) {
            this.currentSong.stop();
            this.currentSong = this.sound.add(audioName);
            this.currentSong.play();
        } else {
            this.currentSongName = audioName;
        }
    }

    changeVolume(volumeType, value) {
        switch (volumeType) {
            case 0: // BGM
                // Set volume and show button
                if (this.audioLoaded) {
                    this.currentSong.setVolume(value / 4); // 0-4 = 0-100
                } else {
                    // Save volume to be set after loading
                    this.currentVolume = value;
                }
                break;
            case 1: // SFX
                break;
            case 2: // Environment
                break;
            default:
                console.log("Error: incorrect volume knob type");
                break;
        }
    }
}
