BasicGame.MainMenu = function(game){
    this.music = null;
};

BasicGame.MainMenu.prototype = {
    preload: function(game){
        this.game.add.sprite(0,0, 'background');

        var game_title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameTitle');
        game_title.anchor.setTo(0.5, 0.5);

        var easy_button = this.game.add.button(this.game.world.centerX - 300, this.game.world.height, "button_easy", this.handlePlayGame, this, 2, 1, 0);
        easy_button.name = "easy";
        easy_button.anchor.setTo(0.5, 0.5);

        var medium_button = this.game.add.button(this.game.world.centerX, this.game.world.height, "button_medium", this.handlePlayGame, this, 2, 1, 0);
        medium_button.name = "medium";
        medium_button.anchor.setTo(0.5, 0.5);

        var hard_button = this.game.add.button(this.game.world.centerX + 300, this.game.world.height, "button_hard", this.handlePlayGame, this, 2, 1, 0);
        hard_button.name = "hard";
        hard_button.anchor.setTo(0.5, 0.5);

        var easy_tween = this.game.add.tween(easy_button).to({y: 600}, 750, Phaser.Easing.Bounce.None, false);
        var medium_tween = this.game.add.tween(medium_button).to({y: 600}, 750, Phaser.Easing.Bounce.None, false);
        var hard_tween = this.game.add.tween(hard_button).to({y: 600}, 750, Phaser.Easing.Bounce.None, false);

        easy_tween.start();
        medium_tween.start();
        hard_tween.start();
    },

    create: function(game){

    },

    handlePlayGame: function(pressedButton){
        switch(pressedButton.name){
            case "easy":
                BasicGame.difficulty = "easy";
                break;
            case "medium":
                BasicGame.difficulty = "medium";
                break;
            case "hard":
                BasicGame.difficulty = "hard";
                break;
            default:
                BasicGame.difficulty = "error";
                break;
        }

        if(BasicGame.difficulty != "error"){
            this.state.start("Preselect");
        }
    }


};