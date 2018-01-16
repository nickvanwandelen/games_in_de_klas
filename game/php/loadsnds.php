<?php
/**
 * Created by PhpStorm.
 * User: Nick
 * Date: 27-Nov-17
 * Time: 16:18
 */

$js_array = json_encode(glob("../assets/audio/*"));
echo $js_array;
?>