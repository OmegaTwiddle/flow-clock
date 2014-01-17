<?php

	session_start();
	
	$dbconnection = mysql_connect("localhost", "", "");
		
	mysql_select_db("mgsgo", $dbconnection);
	
	include "cookieHandler.php";

?>