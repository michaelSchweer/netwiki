<?php
$myMethod = $_SERVER['REQUEST_METHOD'];

if ($myMethod === 'POST') {
$myFile = "json/" . $_POST['emne'] . ".json";
$myJSON = json_encode($_POST['minArray'], JSON_UNESCAPED_UNICODE) . "\r\n";
$ret = file_put_contents($myFile, $myJSON, FILE_APPEND | LOCK_EX);
$url='../doku.php?id=' . $_POST['emne'];
echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$url.'">';
}

if ($myMethod === 'GET') {
$page = $_REQUEST['side'];
$myFileString = "json/" . $page . ".json";
$myFile = fopen($myFileString, "r") or die("Unable to open file!");
$indhold = fread($myFile,filesize($myFileString));
echo html_entity_decode($indhold);
fclose($myFile);
}
?>