<?php
/**
 * Created by IntelliJ IDEA.
 * User: Nick
 * Date: 17-1-2018
 * Time: 23:38
 */

    $theme_json_file = json_decode(file_get_contents("../assets/data/flashcard000.json"));
    $newly_generated = false;

    $theme_id = $_POST["theme-id"];
    $theme_name = $_POST["theme-name"];
    $theme_desc = $_POST["theme-description"];
    $theme_start_text = $_POST["start-text"];
    $theme_end_text = $_POST ["end-text"];
    $theme_time = $_POST["allocated-time"];

    $theme_allow_negative_score = $_POST["allow-negative-score"];
    $theme_allow_random_questions = $_POST["allow-random-questions"];
    $theme_allow_random_answers = $_POST["allow-random-answers"];
    $theme_allow_loop_questions = $_POST["allow-loop-questions"];

    $theme_questions = $_POST["question"];
    $theme_answers = $_POST["answer"];
    $theme_questions_answers = [];

    if(sizeof($theme_json_file->themes) > 7){
        echo "Error: JSON file has more than 8 themes already!";
        return;
    }

    if(sizeof($theme_questions) < 3 || sizeof($theme_answers) < 3){
        echo "Error: Less than 3 questions and/or answers!";
        return;
    }

    if($theme_id === null){
        $theme_id = uniqid('theme_');
        $newly_generated = true;
    }

    if($theme_allow_random_answers === null){
        $theme_allow_random_answers = false;
    }
    else{
        $theme_allow_random_answers = true;
    }

    if($theme_allow_random_questions === null){
        $theme_allow_random_questions = false;
    }
    else{
        $theme_allow_random_questions = true;
    }

    if($theme_allow_loop_questions === null){
        $theme_allow_loop_questions = false;
    }
    else{
        $theme_allow_loop_questions = true;
    }

    if($theme_allow_negative_score === null){
        $theme_allow_negative_score = false;
    }
    else{
        $theme_allow_negative_score = true;
    }

    foreach($theme_questions as $key => $value){
        array_push($theme_questions_answers, array($theme_questions[$key],$theme_answers[$key]));
    }

    $generatedJsonTheme = array(
        "theme_id" => $theme_id,
        "theme_name" => $theme_name,
        "theme_description" => $theme_desc,
        "start_text" => $theme_start_text,
        "end_text" => $theme_end_text,
        "allocated_time" => $theme_time,
        "negative_score" => $theme_allow_negative_score,
        "random_questions" => $theme_allow_random_questions,
        "random_awnsers" => $theme_allow_random_answers,
        "loop_questions" => $theme_allow_loop_questions,
        "theme_questions" => $theme_questions_answers
    );

    if($newly_generated){
        array_push($theme_json_file->themes, $generatedJsonTheme);
    }
    else{
        for($index = 0; $index < sizeof($theme_json_file->themes); $index++){
            if($theme_json_file->themes[$index]->theme_id === $theme_id){
                array_splice($theme_json_file->themes, $index, 1);
            }
        }
        array_push($theme_json_file->themes, $generatedJsonTheme);
    }

    $generatedJson = json_encode($theme_json_file, JSON_PRETTY_PRINT);
    file_put_contents("../assets/data/flashcard000.json", $generatedJson);
?>
<script>
    window.location.replace("../index.php");
</script>
