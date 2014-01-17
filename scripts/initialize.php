<?php

	session_start();
	
	$dbconnection = mysql_connect("localhost", "root", "4lJX24OOa4qbi");
		
	mysql_select_db("mgsgo", $dbconnection);
	
	include "cookieHandler.php";

?>