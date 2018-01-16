BasicGame.Preloader = function(game){
    var sprite = 0;
    var timer = 0;
    var total = 0;
    this.background = null;
    this.preloaderBar = null;
    this.ready = false;
    this.ext_data_url = "assets/data/flashcard000.json";
    this.audioJSON = {
        spritemap: {
            'shoot': {
                start: 0.2,
                end: 0.8,
                loop: false
            },
            'miss': {
                start: 0.9,
                end: 1.95,
                loop: false
            },
            'ok': {
                start: 1.96,
                end: 7.46,
                loop: false
            },
            'nok': {
                start: 7.46,
                end: 8.86,
                loop: false
            }
        }
    };
};

BasicGame.Preloader.prototype = {
    preload: function(){
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
        this.preloaderBar.anchor.setTo(0.5, 0.5);
        this.preloaderBar.scale.set(1, 1);
        this.load.setPreloadSprite(this.preloaderBar);
        this.game.load.json('flashcard000', this.ext_data_url);
    },

    update: function(){
        this.ready = true;
        this.state.start('MainMenu');
    }



};