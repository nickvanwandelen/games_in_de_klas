BasicGame.Preselect = function(game){

};

BasicGame.Preselect.prototype = {
    preload: function(game){
        var theme_json = this.game.cache.getJSON('flashcard000');
        var self = this;

        self.game.add.sprite(0,0, 'background');

        if(theme_json.themes.length === 0){
            this.states.start('MainMenu');
        }

        var theme_button_array = [];
        var theme_button_group = game.add.group();


        for(var i = 0; i < theme_json.themes.length; i++){
            var theme_button = this.game.add.button(i * 75, self.game.world.centerY , "button", this.handlePlayGame, this, 2, 1, 0);
            theme_button.name = theme_json.themes[i].theme_name;
            theme_button.width = 50;
            theme_button.height = 50;
            theme_button.anchor.setTo(0.5, 0.5);
            theme_button_array.push(theme_button);
            theme_button_group.add(theme_button);
        }

        theme_button_group.centerX = self.world.centerX;
    },

    create: function(game){

    },

    handlePlayGame: function(selected_button){
        BasicGame.level = selected_button.name;
        this.state.start('Game');
    }
};