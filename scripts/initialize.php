<?php

	session_start();

	list($user, $pass, $extra) = explode(",", file_get_contents('dbInfo.txt'));

	//check if username exists
	$dbconnection = mysql_connect("localhost", (string)$user, (string)$pass);
		
	mysql_select_db("mgsgo", $dbconnection);
	
	include "cookieHandler.php";

	if ($_SESSION['username']){
		echo json_encode($_SESSION['username'] . " is logged in!");
	} else {
		echo json_encode($user . " " . $pass);
	}

?>