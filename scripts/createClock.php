<?php
	
	session_start();

	list($user, $pass, $extra) = explode(",", file_get_contents('/home/flow-clock/conf/db_conf'));

	

	echo "success";

?>