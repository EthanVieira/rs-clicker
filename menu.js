Menu = function () {};

Menu.prototype = {
	preload: function () {

		// Title (not currently shown for some reason)
		this.titleText = game.add.text(game.world.centerX, game.world.centerY, "RS Clicker");
		this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.titleText.anchor.setTo(.5);

		this.optionCount = 0;
	},

	create: function () {

		// Background
		this.bg = game.add.sprite(game.world.centerX, game.world.centerY, 'menu-bg');
		this.bg.anchor.setTo(.5);
		game.add.existing(this.titleText);

		this.addMenuOption('Start', function () {
			game.state.start('Level1');
		})

	},

	// Function to add menu buttons
	addMenuOption: function(text, callback) {
		var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', stokeThickness: 4};
		var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 260, text, optionStyle);
		var onOver = function (target) {
			target.fill = "#FEFFD5";
			target.stroke = "rgba(200,200,200,0.5)";
		};
		var onOut = function (target) {
			target.fill = "white";
			target.stroke = "rgba(0,0,0,0)";
		};
		txt.stroke = "rgba(0,0,0,0)";
		txt.strokeThickness = 4;
		txt.inputEnabled = true;
		txt.events.onInputUp.add(callback);
		txt.events.onInputOver.add(onOver);
		txt.events.onInputOut.add(onOut);
		txt.anchor.setTo(.5);
		this.optionCount ++;
	  }
};