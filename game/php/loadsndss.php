<?php
/**
 * Created by PhpStorm.
 * User: Nick
 * Date: 27-Nov-17
 * Time: 16:17
 */

$js_array = json_encode(glob("../assets/audio/audiosprites/*"));
echo $js_array;
?>