import { CONSTANTS } from "../constants.js";
import { MenuScene } from "./menu.js";

export class LoadScene extends Phaser.Scene{
    constructor() {
        super({
            key: CONSTANTS.SCENES.LOAD,

            pack: {
                files: [
                    {
                        type: 'image',
                        key: 'lesser-demon',
                        url: '/source/assets/Lesser_demon.png'
                    }
                ]
            }
        });
    }
    init(){
        // this is where you receive data from other scenes or instantiate plugins

    }
    preload(){

        // splash screen stuff
        var lesserDemonSprite = this.add.image(750, 600, 'lesser-demon');

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle("#ff0000", 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'RS Clicker is loading - Please Wait...',
            style: {
                font: '18px courier',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '12px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        // var assetText = this.make.text({
        //     x: width / 2,
        //     y: height / 2 + 50,
        //     text: '',
        //     style: {
        //         font: '18px monospace',
        //         fill: '#ffffff'
        //     }
        // });
        // assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value, file) {
            percentText.setText('Loading asset: good ol rs stuff ' + parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xff0000, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        // this.load.on('fileprogress', function (file) {
        //     assetText.setText('Loading asset: ' + file.key);
        // });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            //assetText.destroy();
        });
        
        // Enemies
        
        
        
        for (var i = 0; i < 500; i++) {
            this.load.image('random image '+i, 'source/assets/chicken.jpg');
        }

        for (var i = 0; i < 2000; i++) {
            this.load.image('all that good rs stuff '+i, 'source/assets/chicken.jpg');
        }
    }
    create(){
        // this is where you make game objects
        this.add.text(250, 300, "Welcome to RS Clicker!");
        this.add.text(250, 340, "Click anywhere to continue.");
        this.scene.add(CONSTANTS.SCENES.MENU, MenuScene, false)

        //this.scene.start(CONSTANTS.SCENES.MENU, "hello from load scene")
        /*
            Use launch to start a scene in parallel
            this.scene.launch(...)

            Use add to start dynamically
            this.scene.add(...)
        */
    }
    update(){
        // this is the update loop
        // dont need this for load scene
    }
}


// var splash = {
//     preload: function() {

//         var progressBar = this.add.graphics();
//         var progressBox = this.add.graphics();
//         progressBox.fillStyle = "#222222";
//         progressBox.fillRect(240, 270, 320, 50);
        
//         var width = this.cameras.main.width;
//         var height = this.cameras.main.height;
//         var loadingText = this.make.text({
//             x: width / 2,
//             y: height / 2 - 50,
//             text: 'Loading...',
//             style: {
//                 font: '20px monospace',
//                 fill: '#ffffff'
//             }
//         });
//         loadingText.setOrigin(0.5, 0.5);
        
//         var percentText = this.make.text({
//             x: width / 2,
//             y: height / 2 - 5,
//             text: '0%',
//             style: {
//                 font: '18px monospace',
//                 fill: '#ffffff'
//             }
//         });
//         percentText.setOrigin(0.5, 0.5);
        
//         var assetText = this.make.text({
//             x: width / 2,
//             y: height / 2 + 50,
//             text: '',
//             style: {
//                 font: '18px monospace',
//                 fill: '#ffffff'
//             }
//         });
//         assetText.setOrigin(0.5, 0.5);
        
//         this.load.on('progress', function (value) {
//             percentText.setText(parseInt(value * 100) + '%');
//             progressBar.clear();
//             progressBar.fillStyle(0xffffff, 1);
//             progressBar.fillRect(250, 280, 300 * value, 30);
//         });
        
//         this.load.on('fileprogress', function (file) {
//             assetText.setText('Loading asset: ' + file.key);
//         });

//         this.load.on('complete', function () {
//             progressBar.destroy();
//             progressBox.destroy();
//             loadingText.destroy();
//             percentText.destroy();
//             assetText.destroy();
//         });
        
//         // Enemies
// 		this.game.load.image('chicken', 'source/assets/chicken.jpg');
// 		this.game.load.image('lesser-demon', 'source/assets/Lesser_demon.png')
//     },

//     create: function() {
//         var lesserDemonSprite = game.add.sprite(450, 290, 'lesser-demon');
//         lesserDemonSprite.anchor.setTo(0.5, 0.5);

//     }
// };