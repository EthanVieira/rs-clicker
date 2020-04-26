import { CONSTANTS } from "../constants/constants.js";

export class AudioScene extends Phaser.Scene {
    currentSong = {};
    audioLoaded = false;
    currentVolume = 3;
    previousVolume = 3;
    currentSongName = "";

    characterData = {};

    constructor() {
        super({
            key: CONSTANTS.SCENES.AUDIO
        });
    }

    init(data) {
        this.characterData = data;
    }

    preload() {
        // Audio
        this.load.audio("scape-main", "src/assets/audio/bgm/ScapeMain.ogg");
        this.load.audio("newbie-melody", "src/assets/audio/bgm/NewbieMelody.ogg");
        this.load.audio("harmony", "src/assets/audio/bgm/Harmony.ogg");
        this.load.audio("expanse", "src/assets/audio/bgm/Expanse.mp3");
        this.load.audio("barbarianism", "src/assets/audio/bgm/Barbarianism.ogg");
    }

    create() {
        // Don't pause BGM when clicking off the window
        this.sound.pauseOnBlur = false;
        this.changeVolume(0, this.characterData.audio[0]);
    }

    playAudio(audioName) {
        console.log("input:", audioName, "current:", this.currentSongName)
        // Only play if song changes
        if (audioName != this.currentSongName) {
            // Check if audio has been loaded
            if (this.scene.isActive()) {
                console.log("scene is active, play", audioName);
                if (this.audioLoaded) {
                    this.currentSong.stop();
                }
                this.currentSongName = audioName;
                this.currentSong = this.sound.add(audioName);
                this.currentSong.setLoop(true);
                this.currentSong.play();
                this.audioLoaded = true;
                this.changeVolume(0, this.currentVolume);
            } else {
                // If called before load, play once loaded
                this.events.once("create", () => {
                    console.log("once event: ", audioName);
                    this.playAudio(audioName);
                });
            }
        }
    }

    changeVolume(volumeType, value) {
        switch (volumeType) {
            case 0: // BGM
                // Set volume and show button
                this.characterData.audio[0] = value;
                this.currentVolume = value;

                if (this.audioLoaded) {
                    this.currentSong.setVolume(value / 4); // 0-4 = 0-100
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

    mute(isMuted) {
        if (isMuted) {
            this.previousVolume = this.currentVolume;
            this.changeVolume(0, 0);
        } else {
            this.changeVolume(0, this.previousVolume);
        }
    }
}
