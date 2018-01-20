<!DOCTYPE HTML>
<html ng-app>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="../js/lib/formhelper.js"></script>
</head>

<body>
    <nav>
        <a href="../index.php"><button>Game</button></a>
        <a href="themebuilder.php"><button>Theme Builder</button></a>
    </nav>

    <section>
        <h1>Theme Builder</h1>
        <p>
            Select a theme to edit, or create a new one. You can create up to 8 different themes.
        </p>
    </section>

    <section>
            <form action="themegenerator.php" class="theme_editor" method="post">
                <select id="themeSelector" onchange="handleChangeThemeSelector()">
                    <optgroup label="Theme">
                        <option value="" selected="selected"></option>
                        <option value="new_theme">Generate new theme</option>

                        <?php
                            $theme_json = json_decode(file_get_contents("../assets/data/flashcard000.json"));

                            for($index = 0; $index < sizeof($theme_json->themes); $index++){
                                echo "<option value=".str_replace(' ', '', $theme_json->themes[$index]->theme_id).">".$theme_json->themes[$index]->theme_name."</option>";
                            }
                        ?>
                    </optgroup>
                </select>

                <article>
                    <h2>Basic Information</h2>
                    <p>
                        Theme ID: <input type="text" name="theme-id" id="theme_id" placeholder="Will be automatically generated" readonly>
                    </p>
                    <p>
                        Theme name: <input type="text" name="theme-name" id="theme_name" placeholder="Name of the theme" required>
                    </p>
                    <p>
                        Theme description: <input type="text" name="theme-description" id="theme_description" placeholder="Description">
                    </p>
                    <p>
                        Starting text: <input type="text" name="start-text" id="theme_start" placeholder="This text will be displayed before the game begins" required>
                    </p>
                    <p>
                        Ending text: <input type="text" name="end-text" id="theme_end" placeholder="This text will be displayed when the game ends" required>
                    </p>
                    <p>
                        Allocated time: <input type="number" name="allocated-time" id="theme_time" placeholder="This is the amount of time a player has in the game" required>
                    </p>
                </article>

                <article>
                    <h2>Options</h2>
                    <p>
                        <label>
                            <input type="checkbox" name="allow-negative-score" id="theme_score">
                            Negative score
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="allow-random-questions" id="theme_ran_questions">
                            Random questions
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="allow-random-answers" id="theme_ran_answers">
                            Random answers
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="allow-loop-questions" id="theme_loop_questions">
                            Loop questions
                        </label>
                    </p>
                </article>

                <article>
                    <h2>Answers</h2>
                    <p>A theme needs at least 4 questions.</p>

                    <table id="questionsTable" name="theme-questions">
                        <tbody>
                            <tr>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Remove</th>
                            </tr>
                            <tr>
                                <td colspan="2"><button onclick="handleAddRow()" type="button">Add Question</button></td>
                                <td><button onclick="handleRemoveRows()" type="button">Remove Questions</button></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" placeholder="Your question" name="question[]" required>
                                </td>
                                <td>
                                    <input type="text" placeholder="The answer" name="answer[]" required>
                                </td>
                                <td>
                                    <input type="checkbox" name="checked[]">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><button onclick="handleAddRow()" type="button">Add Question</button></td>
                                <td><button onclick="handleRemoveRows()" type="button">Remove Questions</button></td>
                            </tr>
                        </tbody>
                    </table>
                </article>

                <article>
                    <button type="submit">Generate Theme</button>
                </article>

            </form>
    </section>
</body>
</html>

