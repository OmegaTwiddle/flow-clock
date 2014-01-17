<?php

	session_start();
	
	$file = 'dbInfo.txt';
	$fileContent = file($file);

	//check if username exists
	$dbconnection = mysql_connect("localhost", $fileContent[0], $fileContent[1]);
		
	mysql_select_db("mgsgo", $dbconnection);
	
	include "cookieHandler.php";

?>