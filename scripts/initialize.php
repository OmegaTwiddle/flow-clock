<?php

	session_start();

	$fileContent = file_get_contents('dbInfo.txt');

	//check if username exists
	$dbconnection = mysql_connect("localhost", $fileContent[0], $fileContent[1]);
		
	mysql_select_db("mgsgo", $dbconnection);
	
	include "cookieHandler.php";

	if ($_SESSION['username']){
		echo json_encode($_SESSION['username'] . " is logged in!");
	} else {
		echo json_encode($fileContent . " " . $fileContent[0]);
	}

?>