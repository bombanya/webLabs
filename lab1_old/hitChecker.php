<?php
session_start();
date_default_timezone_set("Europe/Moscow");
$start = hrtime(true);
$timeOfRequest = date("d.m.Y H:i:s");

$result = "";
$x = (float) $_POST["x"];
$y = (float) $_POST["y"];
$r = (float) $_POST["r"];

if (($x >= 0 and $y >= 0 and ($x**2 + $y**2) <= $r**2) or
    ($x >= 0 and $y <= 0 and $y >= (2*$x - $r)) or
    ($x <= 0 and $y >= 0 and $x >= -$r and $y <= $r/2)){
    $result = "Точка попала в область";
}
else $result = "Точка не попала в область";

$workTime = (string) ((hrtime(true) - $start) / 10**9);

$_SESSION['table'] .= "<tr>
    <td>$timeOfRequest</td>
    <td>$workTime</td>
    <td>$r</td>
    <td>$x</td>
    <td>$y</td>
    <td>$result</td>
</tr>";

header('Content-Type: application/json');
echo json_encode(array('result' => $result, 'x' => $x, 'y' => $y, 'r'=> $r, 'workTime' => $workTime,
    'timeOfRequest' => $timeOfRequest));
?>


