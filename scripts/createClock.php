<?php
	
	session_start();

	list($user, $pass, $extra) = explode(",", file_get_contents('/home/flow-clock/conf/db_conf'));

	//check if username exists
	$dbconnection = mysql_connect("localhost", (string)$user, (string)$pass);
	mysql_select_db("flow-clock", $dbconnection);

	$sql = "INSERT INTO clocks
			(name)
			VALUES
			('" . $_GET["clockName"] . "')";

	mysql_query($sql);


	

	echo "success";

?>