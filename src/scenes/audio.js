import { CONSTANTS } from "../constants/constants.js";

const BGM = 0;
const SFX = 1;
const ENV = 2;

export class AudioScene extends Phaser.Scene {
    currentSong = {};
    audioLoaded = false;
    currentVolume = [2, 2, 2];
    previousVolume = [2, 2, 2];
    currentSongName = "";

    characterData = {};

    constructor() {
        super({
            key: CONSTANTS.SCENES.AUDIO,
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
        this.load.audio(
            "purchase",
            "src/assets/audio/sfx/GrandExchangeOfferComplete.mp3"
        );
    }

    create() {
        // Don't pause BGM when clicking off the window
        this.sound.pauseOnBlur = false;
        this.changeVolume(BGM, this.characterData.audio[BGM]);
    }

    playBgm(audioName) {
        // Only play if song changes
        if (audioName != this.currentSongName) {
            // Check if audio has been loaded
            if (this.scene.isActive()) {
                console.log("playing music", audioName);
                if (this.audioLoaded) {
                    console.log("stopped prev song");
                    this.currentSong.stop();
                }
                this.currentSongName = audioName;
                this.currentSong = this.sound.add(audioName);
                this.currentSong.setLoop(true);
                this.currentSong.play();
                this.audioLoaded = true;
                this.changeVolume(BGM, this.currentVolume[BGM]);
            } else {
                // If called before load, play once loaded
                this.currentSongName = audioName;
                this.events.once("create", () => {
                    this.playBgm(this.currentSongName);
                });
            }
        }
    }

    // Pause BGM while playing SFX
    playSfx(audioName) {
        this.currentSong.pause();
        let sfx = this.sound.add(audioName);
        sfx.setVolume(this.currentVolume[SFX] / 4);
        sfx.play();
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
        if (volumeType == BGM && this.audioLoaded) {
            this.currentSong.setVolume(value / 4); // 0-4 = 0-100
        }
    }

    mute(isMuted) {
        if (isMuted) {
            this.previousVolume[BGM] = this.currentVolume[BGM];
            this.previousVolume[SFX] = this.currentVolume[SFX];
            this.previousVolume[ENV] = this.currentVolume[ENV];
            this.changeVolume(BGM, 0);
            this.changeVolume(SFX, 0);
            this.changeVolume(ENV, 0);
        } else {
            this.changeVolume(BGM, this.previousVolume[BGM]);
            this.changeVolume(SFX, this.previousVolume[SFX]);
            this.changeVolume(ENV, this.previousVolume[ENV]);
        }
    }
}
