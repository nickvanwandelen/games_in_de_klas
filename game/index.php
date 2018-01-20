<!DOCTYPE HTML>
<html>
<head>
    <title>HuGame v1.0</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="user-scalable=0, initial-scale=1,minimum-scale=1, maximum-scale=1, width=device-width, minimal-ui=1" />
    <meta name="apple-mobile-web-app-title" content="Phaser App">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="HandheldFriendly" content="true" />
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="stylesheet" href="assets/css/stylesheet.css" type="text/css" />
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/lib/phaser.js"></script>
    <script src="js/helper/helper.js"></script>
    <script src="js/states/boot.js"></script>
    <script src="js/states/preloader.js"></script>
    <script src="js/states/mainmenu.js"></script>
    <script src="js/states/level_preselect.js"></script>
    <script src="js/states/game.js"></script>
</head>
<body>
<div class="workarround"></div>

<div id="game"></div>
<div id="orientation"></div>
<script type="text/javascript">
    function autorun()
    {

        preload_init = <?php include("php/loadinit.php");?>;
        preload_imgs = <?php include("php/loadimgs.php");?>;
        preload_spritesheets = <?php include("php/loadspritesheets.php");?>;
        preload_snds = <?php include("php/loadsnds.php");?>;
        preload_sndss = <?php include("php/loadsndss.php");?>;

        (function () {
            // the game itself
            var game;

            // global variable containing all game options
            var gameOptions = {
                // width of the game, in pixels
                gameWidth: 1280,
                // height of the game, in pixels
                gameHeight: 720,
            }

            game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);

            game.state.add('Boot', BasicGame.Boot);
            game.state.add('Preloader', BasicGame.Preloader);
            game.state.add('MainMenu', BasicGame.MainMenu);
            game.state.add('Preselect', BasicGame.Preselect);
            game.state.add('Game', BasicGame.Game);

            game.state.start('Boot');
        })();
    }
    if (window.addEventListener) window.addEventListener("load", autorun, false);
    else if (window.attachEvent) window.attachEvent("onload", autorun);
    else window.onload = autorun;
</script>

<nav>
    <a href="index.php"><button>Game</button></a>
    <a href="php/themebuilder.php"><button>Theme Builder</button></a>
</nav>
</body>
</html>