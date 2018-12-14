<?php
$myFile = "json/" . $_POST['emne'] . ".json";
$linieDerSkalSlettes = $_POST['indeks'];

$filen = file($myFile);
unset($filen[$linieDerSkalSlettes]);
file_put_contents($myFile, implode("", $filen));
?>