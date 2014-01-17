<?php

	session_start();

	$fileContent = file('dbInfo.txt', FILE_IGNORE_NEW_LINES);

	//check if username exists
	$dbconnection = mysql_connect("localhost", $fileContent[0], $fileContent[1]);
		
	mysql_select_db("mgsgo", $dbconnection);
	
	include "cookieHandler.php";

	echo json_encode($fileContent);

?>