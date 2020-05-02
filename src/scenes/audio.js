import { CONSTANTS } from "../constants/constants.js";

export class AudioScene extends Phaser.Scene {
    currentSong = {};
    audioLoaded = false;
    currentVolume = [3, 3, 3];
    previousVolume = [3, 3, 3];
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
        // BGM
        this.load.audio("scape-main", "src/assets/audio/bgm/ScapeMain.ogg");
        this.load.audio("newbie-melody", "src/assets/audio/bgm/NewbieMelody.ogg");
        this.load.audio("harmony", "src/assets/audio/bgm/Harmony.ogg");
        this.load.audio("expanse", "src/assets/audio/bgm/Expanse.mp3");
        this.load.audio("barbarianism", "src/assets/audio/bgm/Barbarianism.ogg");
        this.load.audio("the-trade-parade", "src/assets/audio/bgm/TheTradeParade.ogg");

        // SFX
        this.load.audio("purchase", "src/assets/audio/sfx/GrandExchangeOfferComplete.mp3");
    }

    create() {
        // Don't pause BGM when clicking off the window
        this.sound.pauseOnBlur = false;
        this.changeVolume(0, this.characterData.audio[0]);
    }

    playBgm(audioName) {
        // Only play if song changes
        if (audioName != this.currentSongName) {
            // Check if audio has been loaded
            if (this.scene.isActive()) {
                if (this.audioLoaded) {
                    this.currentSong.stop();
                }
                this.currentSongName = audioName;
                this.currentSong = this.sound.add(audioName);
                this.currentSong.setLoop(true);
                this.currentSong.play();
                this.audioLoaded = true;
                this.changeVolume(0, this.currentVolume[0]);
            } else {
                // If called before load, play once loaded
                this.events.once("create", () => {
                    this.playBgm(audioName);
                });
            }
        }
    }

    // Pause BGM while playing SFX
    playSfx(audioName) {
        this.currentSong.pause();
        let sfx = this.sound.add(audioName);
        sfx.setVolume(this.currentVolume[1] / 4)
        sfx.play()
        sfx.once("complete", () => {
            this.currentSong.resume();
        }); 
    }

    // 0: BGM, 1: SFX, 2: Environment
    changeVolume(volumeType, value) {
        // Set volume and show button
        this.characterData.audio[volumeType] = value;
        this.currentVolume[volumeType] = value;

        // Lower volume of currently playing BGM
        if (volumeType == 0 && this.audioLoaded) {
            this.currentSong.setVolume(value / 4); // 0-4 = 0-100
        }
    }

    mute(isMuted) {
        if (isMuted) {
            this.previousVolume = this.currentVolume;
            this.changeVolume(0, 0);
            this.changeVolume(1, 0);
            this.changeVolume(2, 0);
        } else {
            this.changeVolume(0, this.previousVolume[0]);
            this.changeVolume(1, this.previousVolume[1]);
            this.changeVolume(2, this.previousVolume[2]);
        }
    }
}
