BasicGame = {

};
//force save
BasicGame.Boot = function(game) {};

BasicGame.Boot.prototype = {
    preload: function() {
        this.load.crossOrigin = "Anonymous";
        preload_init.forEach(function(i){
            var b = baseName(i);
            self.load.image(b,i);
        });

        this.load.image("background", "assets/images/sprites/background.jpg");
        this.load.image("button", "assets/images/sprites/default_button.jpg");
    },

    create: function() {
        this.input.maxPointers = 1;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.disableVisibilityChange = true;
        this.state.start('Preloader');
    }

};