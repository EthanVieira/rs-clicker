var Splash = function(){};

Splash.prototype = {

  loadScripts: function() {
    //game.load.script('WebFont', 'lib/webfontloader.js');
  },

  loadBgm: function() {
  },

  loadImages: function() {
  },

  loadFonts: function() {
    WebFontConfig = {
      custom: {
        families: ['testFont'],
        urls: ['src/assets/fonts.css']
      }
    }
  },

  init: function() {
    //this.loadingBar = game.make.sprite(game.width/2, game.height/2, 'loading');
    //this.loadingBar.anchor.setTo(.5, 1);
    //this.status = game.make.text(game.world.centerX, game.world.centerY, 'loading...', {fill: 'white'});
    //this.status.anchor.setTo(0.5);
  },

  preload: function () {
    //game.add.sprite(0, 0, 'background');
    //game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    //this.load.setPreloadSprite(this.loadingBar, 0);
    

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();
  },

  addGameStates: function() {

  },
  addGameMusic: function() {

  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    // Display 
    var lesserDemonSprite = game.add.sprite(450, 290, 'lesser-demon');
    lesserDemonSpriteSprite.anchor.setTo(0.5, 0.5);
    
    game.add.text('Welcome to RS Clicker!', 250, 290);
		game.add.text('Click anywhere to continue.', 250, 340);

    // Transition to main menu
    game.input.onDown.add(game.start.start('Menu'));
  }
};
