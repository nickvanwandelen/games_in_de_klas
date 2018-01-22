var cursor;
var self;

BasicGame.Preselect = function(game){

};

BasicGame.Preselect.prototype = {
    preload: function(game){
        var theme_json = this.game.cache.getJSON('flashcard000');
        self = this;

        self.game.add.sprite(0,0, 'background');

        if(theme_json.themes.length === 0){
            this.states.start('MainMenu');
        }

        var theme_button_array = [];
        var theme_button_group = game.add.group();

        var style = { font: "bold 40px Playbill", fill: "#a1663f", align: "left", wordWrap: true, wordWrapWidth: 140 };

        for(var i = 0; i < theme_json.themes.length; i++){
            var theme_button = this.game.add.button(i * 170, self.game.world.centerY , "button", this.handlePlayGame, this, 2, 1, 0);
            theme_button.name = theme_json.themes[i].theme_name;
            theme_button.width = 150;
            theme_button.height = 150;
            theme_button.anchor.setTo(0.5, 0.5);
            theme_button_array.push(theme_button);
            theme_button_group.add(theme_button);
        }

        theme_button_group.centerX = self.world.centerX;


        for(var text = 0; text < theme_button_group.children.length; text++){
            var theme_text = this.game.add.text((theme_button_group.children[text].x + theme_button_group.centerX / 2), this.game.world.centerY - 30, theme_button_group.children[text].name, style);
        }
    },

    create: function(game){
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

    handlePlayGame: function(selected_button){
        BasicGame.level = selected_button.name;
        this.state.start('Game');
    }
};