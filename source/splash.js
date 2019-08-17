var splash = function(){};

splash.prototype = {

  init: function() {
    //this.loadingBar = game.make.sprite(game.width/2, game.height/2, 'loading');
    //this.loadingBar.anchor.setTo(.5, 1);
    this.welcome = game.make.text('Welcome to RS Clicker!', 250, 290);
    this.status = game.make.text(game.world.centerX, game.world.centerY, 'loading...', {fill: 'white'});
    //this.status.anchor.setTo(0.5);
  },

  preload: function () {
    //game.add.sprite(0, 0, 'background');
    //game.add.existing(this.loadingBar);
    //var lesserDemonSprite = game.add.sprite(450, 290, 'lesser-demon');
		//lesserDemonSprite.anchor.setTo(0.5, 0.5);
    game.add.existing(this.welcome);
    game.add.existing(this.status);
    //this.load.setPreloadSprite(this.loadingBar, 0);

    // Loading bar??

		// Menu/Logos
		game.load.image('menu-bg', 'source/assets/background.png');
		game.load.image('loading', 'source/assets/loading.png');
		game.load.image('logo', 'source/assets/rslogo.png');

		// Backgrounds
		game.load.image('background', 'source/assets/MenuBg.png');
		game.load.image('temp-bg', 'source/assets/temp_bg.jpg');
		
		// Buttons

		// Weapons/Spells
		
		// Enemies
		game.load.image('chicken', 'source/assets/chicken.jpg');
		game.load.image('lesser-demon', 'source/assets/Lesser_demon.png')
		
		// Animations
		game.load.image('red-hitsplat', 'source/assets/Red_Hitsplat.png');
		game.load.image('blue-hitsplat', 'source/assets/Blue_Hitsplat.png');

		// States
		//game.load.script('Level1', 'source/level1.js');
    //game.load.script('Menu', 'source/menu.js');
    //game.load.script('Splash', 'source/splash.js');
    

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
    this.status.setText('Click anywhere to continue.', 250, 340);
    this.addGameStates();
    this.addGameMusic();

    this.game.state.start('Menu');

    

    // Transition to main menu
    
  }
};
