splash.prototype = {

  loadScripts: function () {
  },

  loadBgm: function () {
  },

  loadImages: function () {
  },

  loadFonts: function () {
  },

  preload: function () {
    var loadingBar, status;
    game.add.sprite(0, 0, 'background');
    loadingBar = game.add.sprite(game.world.centerX-(387/2), 400, "loading");
    status = game.add.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    this.load.setPreloadSprite(loadingBar);
  }
}
