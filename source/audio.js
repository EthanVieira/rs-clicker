import { CONSTANTS } from "./constants.js";

export class AudioScene extends Phaser.Scene{
    currentSong = {};
    constructor() {
        super({
            key: CONSTANTS.SCENES.AUDIO
        });
    }

    preload(){
        // Audio
        this.load.audio('scapeMain', 'source/assets/audio/bgm/ScapeMain.ogg');
        this.load.audio('newbieMelody', 'source/assets/audio/bgm/NewbieMelody.ogg');
        this.load.audio('harmony', 'source/assets/audio/bgm/Harmony.ogg');
    }

    create(){
        // Don't pause BGM when focus changes
        this.sound.pauseOnBlur = false; 

        // Run login screen on start
        this.playAudio('scapeMain');
    }

    playAudio(audioName){
        if (this.currentSong.isPlaying) {
            this.currentSong.stop();
        }
        this.currentSong = this.sound.add(audioName);
        this.currentSong.play(); 
    }
}