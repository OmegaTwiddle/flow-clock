<?php
	session_start();

	//kill session
	session_destroy();
	
	//delete cookies
	setcookie("username", "", time()-60*60*24*365, '/', 'www.jinseigo.com');
	setcookie("password", "", time()-60*60*24*365, '/', 'www.jinseigo.com');

    // Should we echo which user was logged out?
    echo "{status:'success', user: ''}"
	//header('Location: index.html');
	//exit();
?>
