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


	$sql = "SELECT clock_id FROM clocks WHERE name='" $_GET["clockName"] . "' ORDER BY clock_id DESC limit 1";

	$result = mysql_query($sql);

	while($currentrow = mysql_fetch_array($result)){
		$clockID = $currentrow["clock_id"];
	}


	

	echo "success";

?>