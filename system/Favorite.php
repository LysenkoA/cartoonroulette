<?php
require ("../db.php");

$string = implode(",", $_POST['data']);

$query = "SELECT * FROM mult WHERE id IN (".$string.")";

$result = mysql_query ($query) or die (mysql_error());

while ($row = mysql_fetch_array($result)) {
	echo "<li class='".$row['link']."' id='".$row['id']."'>".$row['name']."</li>";
}

?>