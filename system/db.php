<?php

$db_server = mysql_connect ('localhost', 'root', '');

mysql_set_charset ('utf-8');

if (!$db_server)
	die ("Error data base connect: ".mysql_error());

mysql_select_db ('cartoon') or
	die ("Error data base select: ".mysql_error());

mysql_query("SET NAMES utf8");

?>