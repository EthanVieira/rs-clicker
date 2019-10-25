import { CONSTANTS } from "./constants.js";

export class AudioScene extends Phaser.Scene{
    currentSong = {};
    previousAudioButtons = [{}, {}, {}]
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

    changeVolume(audioButton, volumeType, value) {
        // Hide previously pressed button (this check is obj exists)
        if (Object.keys(this.previousAudioButtons[volumeType]).length != 0) {
            this.previousAudioButtons[volumeType].setAlpha(.1);
        }
        
        // Replace previous button for this type
        this.previousAudioButtons[volumeType] = audioButton;
        audioButton.setAlpha(1);

        switch(volumeType) {
            case 0: // BGM
                // Set volume and show button
                this.currentSong.setVolume(value/4); // 0-4 = 0-100
                break;
            case 1: // SFX
                break;
            case 2: // Environment
                break;
            default:
                console.log('Error: incorrect volume knob type');
                break;
        }
    }
}