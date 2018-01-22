var cursor;
var muteSoundField;
var self;

BasicGame.MainMenu = function(game){

};

BasicGame.MainMenu.prototype = {
    preload: function(game){
        self = this;

        this.game.add.sprite(0,0, 'background');

        var styleA = { font: "bold 100px Playbill", fill: "#442416", align: "center", wordWrap: true, wordWrapWidth: 800 };
        var styleB = { font: "bold 50px Playbill", fill: "#FFFFFF", align: "center", wordWrap: true, wordWrapWidth: 600};

        var start_button = this.game.add.button(this.game.world.centerX, this.game.world.height, "start_button", this.handlePlayGame, this, 2, 1, 0);
        start_button.name = "easy";
        start_button.anchor.setTo(0.5, 0.5);
        start_button.scale.setTo(0.5, 0.5);

        var start_tween = this.game.add.tween(start_button).to({y: 600}, 500, Phaser.Easing.Linear.None, false);
        start_tween.start();

        muteSoundField = this.game.add.text(20, self.game.world.centerY + 200, "Mute sound", styleB);
        muteSoundField.inputEnabled = true;
        muteSoundField.events.onInputDown.add(this.muteSound, this);


        var game_title = this.game.add.text(this.game.world.centerX, 200, "Western Mayhem!", styleA);
        game_title.anchor.setTo(0.5, 0.5);

    },

    create: function(game){
        BasicGame.audio = this.game.add.audio("main_theme", 1, true);
        BasicGame.audio.play();

        this.cursor = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'crosshair');
        this.cursor.anchor.setTo(0.5, 0.5);
        this.cursor.scale.setTo(0.15, 0.15);
        this.game.canvas.style.cursor = "none";
    },

    update: function(game){
        this.game.input.addMoveCallback(function(pointer, x, y){
            self.cursor.x = x;
            self.cursor.y = y;
        }, game);
        this.game.canvas.style.cursor = "none";
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

        if(BasicGame.difficulty !== "error"){
            this.state.start("Preselect");
        }
    },

    muteSound: function () {
        if(BasicGame.audio.volume === 0){
            BasicGame.audio.volume = 1;
            muteSoundField.text = "Mute sound";
        }
        else{
            BasicGame.audio.volume = 0;
            muteSoundField.text = "Enable sound";
        }
    }


};