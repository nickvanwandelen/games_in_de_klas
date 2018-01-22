function handleChangeThemeSelector(){
    var themeSelectBox = document.getElementById("themeSelector");
    var themeID = themeSelectBox.options[themeSelectBox.selectedIndex].value;

    if(themeID === "" || themeID === "new_theme"|| themeID === null){
        clearForm();
        console.log("Won't generate a theme for: " + themeID);
        return;
    }

    var jsonFile = loadJSONFile(function(response){
        getJSONTheme(JSON.parse(response), themeID);
    });
}

function loadForm(json){
    clearForm();

    var id = document.getElementById("theme_id");
    id.value = json.theme_id;

    var name = document.getElementById("theme_name");
    name.value = json.theme_name;

    var description = document.getElementById("theme_description");
    description.value = json.theme_description;

    var start = document.getElementById("theme_start");
    start.value = json.start_text;

    var end = document.getElementById("theme_end");
    end.value = json.end_text;

    var time = document.getElementById("theme_time");
    time.value = json.allocated_time;

    var neg_score = document.getElementById("theme_score");
    neg_score.checked = json.negative_score;

    var ran_questions = document.getElementById("theme_ran_questions");
    ran_questions.checked = json.random_questions;

    var ran_answers = document.getElementById("theme_ran_answers");
    ran_answers.checked = json.random_awnsers;

    var loop_questions = document.getElementById("theme_loop_questions");
    loop_questions.checked = json.loop_questions;

    var table = document.getElementById("questionsTable");
    for(var rowIndex = 2; rowIndex < (table.rows.length - 1); rowIndex++){
        table.deleteRow(rowIndex);
    }

    for(var index = 0; index < json.theme_questions.length; index++){
        var addedRow = handleAddRow();
        addedRow.cells[0].children[0].value = json.theme_questions[index][0];
        addedRow.cells[1].children[0].value = json.theme_questions[index][1];
    }

    handleAddRow();
}

function clearForm(){
    var id = document.getElementById("theme_id");
    id.value = null;

    var name = document.getElementById("theme_name");
    name.value = null;

    var description = document.getElementById("theme_description");
    description.value = null;

    var start = document.getElementById("theme_start");
    start.value = null;

    var end = document.getElementById("theme_end");
    end.value = null;

    var time = document.getElementById("theme_time");
    time.value = null;

    var neg_score = document.getElementById("theme_score");
    neg_score.checked = false;

    var ran_questions = document.getElementById("theme_ran_questions");
    ran_questions.checked = false;

    var ran_answers = document.getElementById("theme_ran_answers");
    ran_answers.checked = false;

    var loop_questions = document.getElementById("theme_loop_questions");
    loop_questions.checked = false;

    handleRemoveRows(true);
}

function handleAddRow(){
    var table = document.getElementById("questionsTable");
    var addedRow = table.insertRow(table.rows.length - 1);

    var questionCell = addedRow.insertCell(0);
    var answerCell = addedRow.insertCell(1);
    var checkedCell = addedRow.insertCell(2);

    questionCell.innerHTML = '<input type="text" placeholder="Your question" name="question[]" required="">';
    answerCell.innerHTML = '<input type="text" placeholder="The Answer" name="answer[]" required="">';
    checkedCell.innerHTML = '<input type="checkbox" name="checked[]">';

    return addedRow;
}

function handleRemoveRows(deleteAllRows = false){
    var table = document.getElementById("questionsTable");

    for(var index = 2; index < table.rows.length - 1; index++){
        if(deleteAllRows){
            table.deleteRow(index);
            index--;
        }
        else{
            if(table.rows[index].cells[2].children[0].checked){
                table.deleteRow(index);
                index--;
            }
        }

    }
}

function loadJSONFile(callback){
    var file = new XMLHttpRequest();
    file.overrideMimeType("application/json");
    file.open("GET", "../../assets/data/flashcard000.json", true);
    file.onreadystatechange = function(){
        if(file.readyState === 4 && file.status == "200"){
            callback(file.responseText);
        }
    };
    file.send(null);
}

function getJSONTheme(data, themeID){
    Object.keys(data).forEach(function(name, value){
        Object.keys(data[name]).forEach(function (theme_name, theme_value){
            if(data[name][theme_name].theme_id === themeID){
                loadForm(data[name][theme_name]);
            }
        });
    });
}