var themeJson;
var cursor;

var questions;
var currentQuestion;
var questionIndex = 0;
var maximumQuestions;
var submittedAnswers;

var currentTime;
var allocatedTime;
var started;

var score = 0;
var allowNegativeScore = true;
var allowRandomQuestions = true;
var allowRandomAwnsers = true;
var allowLoopQuestions = true;

var soundEnabled = true;

var feedbackHud;
var questionHud;
var awnserFrameGroup;
var awnserTextGroup;
var self;
var styleA;
var styleB;
var styleC;
var styleD;
var countdownTimer;

var scoreField;
var timeField;
var questionField;
var questionIndexField;
var startStopField;
var muteSoundField;

BasicGame.Game = function(game){};

BasicGame.Game.prototype = {
    preload: function(game){
        console.log(BasicGame.level);
        self = this;

        self.game.add.sprite(0,0, 'background');

        //Get the selected theme based on the BasicGame.level variable
        themeJson = this.game.cache.getJSON('flashcard000');
        for(var i = 0; i < themeJson.themes.length; i++){
            if(themeJson.themes[i].theme_name === BasicGame.level){
                themeJson = themeJson.themes[i];
                break;
            }
        }

        //Error handling: go back to main menu when a JSON theme isn't loaded
        if(themeJson.theme_name !== BasicGame.level){
            this.state.start('MainMenu');
        }

        //Creating styles A and B
        styleA = { font: "bold 50px Playbill", fill: "#442416", align: "center", wordWrap: true, wordWrapWidth: 256 }; //score time and question fields
        styleB = { font: "bold 50px Playbill", fill: "#442416", align: "center", wordWrap: true, wordWrapWidth: 600 }; //question itself
        styleC = { font: "bold 50px Playbill", fill: "#FFFFFF", align: "center", wordWrap: true, wordWrapWidth: 600}; //start mute and end fields
        styleD = { font: "bold 30px Playbill", fill: "#442416", align: "center", wordWrap: true, wordWrapWidth: 7}; //answer

        //Retrieving theme variables from the JSON file
        questions = themeJson.theme_questions;
        allowNegativeScore = themeJson.negative_score;
        allowRandomAwnsers = themeJson.random_awnsers;
        allowRandomQuestions = themeJson.random_questions;
        allowLoopQuestions = themeJson.loop_questions;
        started = false;
        score = 0;
        questionIndex = 0;
        currentQuestion = null;
        allocatedTime = themeJson.allocated_time;
        currentTime = allocatedTime;
        maximumQuestions = (themeJson.theme_questions.length - 1);

        console.log("Game variables loaded");
    },

    create: function(game){


        //Creating feedback text
        feedbackHud = this.game.add.group();
        scoreField = this.game.add.text(20, 50, "Score: " + score, styleA, feedbackHud);
        timeField = this.game.add.text(20, 100, "Time: " + currentTime, styleA, feedbackHud);
        questionIndexField = this.game.add.text(20, 150, "Question: ", styleA, feedbackHud);

        startStopField = this.game.add.text(20, self.game.world.centerY, "Start Game", styleC, feedbackHud);
        startStopField.name = "startstop";
        startStopField.inputEnabled = true;
        muteSoundField = this.game.add.text(20, self.game.world.centerY + 200, "Mute Sound", styleC, feedbackHud);
        muteSoundField.name = "mute";
        muteSoundField.inputEnabled = true;
        var exitGameField = this.game.add.text(20, self.game.world.centerY + 250, "Exit Game", styleC, feedbackHud);
        exitGameField.name = "exit";
        exitGameField.inputEnabled = true;
        feedbackHud.add(scoreField, timeField, questionIndexField);
        feedbackHud.onChildInputDown.add(this.handleFeedbackInput, this);


        //Creating the question group and fields
        var questionHud = this.game.add.group();
        questionField = this.game.add.text(self.game.world.centerX, 50, themeJson.start_text, styleB, questionHud);
        questionField.anchor.setTo(0.5, 0.5);
        questionField.setTextBounds(0, 50, this.game.world.width - 100, 150);
        questionHud.add(questionField);

        awnserFrameGroup = this.game.add.group();
        awnserTextGroup = this.game.add.group();

        for(var i = 0; i < 4; i++){
            var awnserFrame = this.game.add.sprite(i * 150, self.game.world.centerY + 100, "button");
            awnserFrame.inputEnabled = true;
            awnserFrame.name = "awnser_" + i;
            awnserFrameGroup.add(awnserFrame);
            awnserFrame.width = 100;
            awnserFrame.height = 150;
        }
        for(var j = 0; j < 4; j++){
            var awnserText = this.game.add.text(awnserFrameGroup.children[j].x, self.game.world.centerY + 175, "Awnser_" + j, styleD, awnserTextGroup);
            awnserText.inputEnabled = true;
            awnserText.name = "awnser_text_" + j;
            awnserText.setTextBounds(10, 0, 90, 100);
            awnserTextGroup.add(awnserText);
        }

        awnserFrameGroup.x = 400;
        awnserFrameGroup.onChildInputDown.add(this.handleSelectedAwnserInput, this);
        awnserFrameGroup.visible = false;

        awnserTextGroup.x = 400;
        awnserTextGroup.onChildInputDown.add(this.handleSelectedAwnserInput, this);
        awnserTextGroup.visible = false;

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

    handleFeedbackInput: function(selectedButton){
        console.log('called');
        switch(selectedButton.name){
            case "startstop":
                this.startGame();
                break;
            case "mute":
                this.muteSound();
                break;
            case "exit":
                this.exitGame();
                break;
        }
    },

    handleSelectedAwnserInput: function(selectedButton){
        var selectedAnswer = selectedButton.text ? selectedButton.text: selectedButton.value;
        console.log(selectedAnswer);

        if(selectedAnswer === currentQuestion[1]){
            score = score + 10;
            submittedAnswers.push("Correct");

            if(questionIndex === maximumQuestions && !allowLoopQuestions){
                this.handleEndOfGame();
            }
            else{
                questionIndex++;
                this.nextQuestion();
            }
        }
        else{
            if(!allowNegativeScore && (score - 5) < 0){
                score = 0;
            }
            else{
                score = score - 5;
            }
            submittedAnswers.push("Incorrect");
        }
        scoreField.text = "Score: " + score;
    },

    startGame: function(){
        started = !started;

        if(started){
            startStopField.text = "Stop game";

        }
        else{
            this.handleEndOfGame();
        }
        awnserFrameGroup.visible = true;
        awnserTextGroup.visible = true;
        submittedAnswers = [];

        countdownTimer = self.game.time.create();
        var updateTimeEvent = countdownTimer.add(1000, this.updateTime, this);
        countdownTimer.start();

        this.nextQuestion();
    },

    muteSound: function(){
        if(BasicGame.audio.volume === 0){
            BasicGame.audio.volume = 1;
            muteSoundField.text = "Mute sound";
        }
        else{
            BasicGame.audio.volume = 0;
            muteSoundField.text = "Enable sound"
        }
    },

    exitGame: function(){
        self.state.start('MainMenu');
    },

    handleEndOfGame: function(){
        currentTime = -1;
        countdownTimer.removeAll();

        awnserFrameGroup.visible = false;
        awnserTextGroup.visible = false;
        questionField.text = themeJson.end_text;


        var countCorrect = 0;
        var countIncorrect = 0;

        for(var submittedAnswer = 0; submittedAnswer < submittedAnswers.length; submittedAnswer++){
            if(submittedAnswers[submittedAnswer] === "Correct"){
                countCorrect++;
            }
            else{
                countIncorrect++;
            }
        }

        timeField.text = "Correct: " + countCorrect;
        questionIndexField.text = "Incorrect: " + countIncorrect;
        startStopField.visible = false;

        var returnToMainMenu = self.game.time.create();
        var mainMenuEvent = returnToMainMenu.add(7000, function(){this.game.state.start('MainMenu')}, this);
        returnToMainMenu.start();
    },

    nextQuestion: function(){
        console.log("Next Question called");

        if(allowRandomQuestions){
            var randomQuestionIndex = Math.floor(Math.random() * questions.length);
            currentQuestion = questions[randomQuestionIndex];

            if(!allowLoopQuestions){
                questions.splice(questions[randomQuestionIndex], 1);
            }

            questionIndex = randomQuestionIndex;

        }
        else{
            currentQuestion = questions[questionIndex];

            if(allowLoopQuestions && questions.length === questionIndex){
                questionIndex = 0;
            }
        }

        var answerFieldIndexesArray = [0, 1, 2, 3];
        var correctAnswerIndex = Math.floor(Math.random() * answerFieldIndexesArray.length);
        awnserTextGroup.children[correctAnswerIndex].text = currentQuestion[1];
        awnserFrameGroup.children[correctAnswerIndex].value = currentQuestion[1];
        answerFieldIndexesArray.splice(correctAnswerIndex, 1);

        if(allowRandomAwnsers){
            var randomAnswerIndexA = -1;
            var randomAnswerIndexB = -1;
            var randomAnswerIndexC = -1;

            console.log(questions.length);

            while(randomAnswerIndexA === randomAnswerIndexB || randomAnswerIndexA === randomAnswerIndexC || randomAnswerIndexB === randomAnswerIndexC){

                randomAnswerIndexA = Math.floor(Math.random() * questions.length);
                randomAnswerIndexB = Math.floor(Math.random() * questions.length);
                randomAnswerIndexC = Math.floor(Math.random() * questions.length);

            }

            awnserTextGroup.children[answerFieldIndexesArray[0]].text = questions[randomAnswerIndexA][1];
            awnserTextGroup.children[answerFieldIndexesArray[1]].text = questions[randomAnswerIndexB][1];
            awnserTextGroup.children[answerFieldIndexesArray[2]].text = questions[randomAnswerIndexC][1];
            awnserFrameGroup.children[answerFieldIndexesArray[0]].value = questions[randomAnswerIndexA][1];
            awnserFrameGroup.children[answerFieldIndexesArray[1]].value = questions[randomAnswerIndexB][1];
            awnserFrameGroup.children[answerFieldIndexesArray[2]].value = questions[randomAnswerIndexC][1];
        }
        else{

            var tempQuestionIndex = questionIndex;

            for(var answerIndex = 0; answerIndex < 3; answerIndex++){
                tempQuestionIndex++;

                if(tempQuestionIndex === questions.length){
                    tempQuestionIndex = 0;
                }

                awnserTextGroup.children[answerFieldIndexesArray[answerIndex]].text = questions[tempQuestionIndex][1];
                awnserFrameGroup.children[answerFieldIndexesArray[answerIndex]].value = questions[tempQuestionIndex][1];
            }
        }

        questionField.text = currentQuestion[0];
        questionIndexField.text = "Question: " + (questionIndex + 1) + "/" + (maximumQuestions + 1);

    },

    updateTime: function(){
        currentTime--;

        if(currentTime <= 0){
            this.handleEndOfGame();
        }
        else{
            countdownTimer.add(1000, this.updateTime, this);
            countdownTimer.start();
            timeField.text = "Time: " + currentTime;
        }
    }
};