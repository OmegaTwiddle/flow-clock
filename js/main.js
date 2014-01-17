$(document).ready(function() {

    //initialize some php stuff
    $.ajax({
        type: 'GET',
        url: 'scripts/initialize.php',
        dataType: 'json',
        success: function(msg){
            $(document.body).prepend(msg.username + " is logged in!");
            $(document.body).append("<div hidden id='hiddenUserID'>" + msg.userID + "</div>");
        } 
    });

    //target first input when modal is opened
    $(document.body).on('shown', ".reveal-modal", function(){
        $("#loginFirstInputField").focus();
        $("#registerFirstInputField").focus();
    });

    //simulate login with enter key
    $(document.body).on("keypress", "#loginFirstInputField", function(e) {
        if(e.which == 13) {
            $("#loginConfirm").click();
        }
    });
    $(document.body).on("keypress", "#loginModal #password", function(e) {
        if(e.which == 13) {
            $("#loginConfirm").click();
        }
    });

    //simulate register with enter key
    $(document.body).on("keypress", "#registerFirstInputField", function(e) {
        if(e.which == 13) {
            $("#registerConfirm").click();
        }
    });
    $(document.body).on("keypress", "#registerModal #password", function(e) {
        if(e.which == 13) {
            $("#registerConfirm").click();
        }
    });
    $(document.body).on("keypress", "#registerModal #verifyPassword", function(e) {
        if(e.which == 13) {
            $("#registerConfirm").click();
        }
    });
    $(document.body).on("keypress" ,"#registerModal #email", function(e) {
        if(e.which == 13) {
            $("#registerConfirm").click();
        }
    });

    //login
    $(document.body).on("click", "#loginConfirm", function(){
        if (($("#loginFirstInputField").val() != "") && ($("#loginModal #password").val() != "")){
            $.ajax({
                type: 'POST',
                url: 'scripts/loginRequest.php',
                data: { username : $("#loginFirstInputField").val(), password : $("#loginModal #password").val() },
                success: function(msg){
                    if (msg.status == "success"){
                        var cookie_str = "jsauth=" + msg.auth_token + "; expires=Mon, 1 Jan 2035 00:00:01 UTC; path=/";
                        document.cookie = cookie_str;
                        location.reload();
                    } else if (msg.status == "badInput") {
                        $("#loginError").html("<em>Wrong username or password</em>");
                        $("#loginError").fadeIn("slow");
                    } else {
                        $("#loginError").html("<em>Something went wrong, try again</em>");
                        $("#loginError").fadeIn("slow");
                    }
                } 
            });
        } else {
            $("#loginError").html("<em>Please enter a username and password</em>");
            $("#loginError").fadeIn("slow");
        }
    });

    //register
    $(document.body).on("click", "#registerConfirm", function(){
        if (($("#registerFirstInputField").val() != "") && ($("#registerModal #password").val() != "")
        && ($("#registerModal #verifyPassword").val() != "") && ($("#registerModal #email").val() != "")){
            if ($("#registerModal #password").val().length >= 5){
                if ($("#registerModal #password").val() == $("#registerModal #verifyPassword").val()){
                    var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;;
                    if ($("#registerModal #email").val().search(emailRegExp) != -1){
                        $.ajax({
                            type: 'POST',
                            url: 'scripts/registerRequest.php',
                            data: { username : $("#registerFirstInputField").val(), password : $("#registerModal #password").val(),
                                verifyPassword : $("#registerModal #verifyPassword").val(), email : $("#registerModal #email").val() },
                            success: function(msg){
                                if (msg.status == "success"){
                                    //location.reload();
                                    window.location.replace("?newUser=true");
                                } else if (msg.status == "usernameTaken") {
                                    $("#registerError").html("<em>Username is already taken</em>");
                                    $("#registerError").fadeIn("slow");
                                } else {
                                    $("#registerError").html("<em>Something went wrong, try again</em>");
                                    $("#registerError").fadeIn("slow");
                                }
                            } 
                        });
                    } else {
                        $("#registerError").html("<em>Please enter a valid email</em>");
                        $("#registerError").fadeIn("slow");
                    }
                } else {
                    $("#registerError").html("<em>Passwords don't match</em>");
                    $("#registerError").fadeIn("slow");
                }
            } else {
                $("#registerError").html("<em>Password must be at least 5 characters</em>");
                $("#registerError").fadeIn("slow");
            }
        } else {
            $("#registerError").html("<em>Please fill out the entire form</em>");
            $("#registerError").fadeIn("slow");
        }
    });

    //logout
    $(document.body).on("click", "#logoutButton", function(){
        $.ajax({
            type: 'POST',
            url: 'scripts/logout.php',
            data: { user : $(".hiddenUserID").attr("id") },
            success: function (msg) {
                console.log("Successful log out.");
                location.reload();
            }
        });
    });

    //create clock
    $(document.body).on("click", "#createClockConfirm", function(){
        console.log($("#clockName").val());
        if (($("#clockName").val() != "") && ($("#task1Name").val() != "") && ($("#task1Length").val() != "")){
            $.ajax({
                type: 'POST',
                url: 'scripts/createClock.php',
                data: { userID : $("#hiddenUserID").html(), clockName : $("#clockName").val(), task1Name : $("#task1Name").val(), task1Length : $("#task1Length").val() },
                success: function(msg){
                    console.log(msg);
                    if (msg == "success"){
                        alert("Successful creation!");
                    } 
                } 
            });
        } else {
            $("#createClockError").html("<em>Please enter a clock name, task name, and task length</em>");
            $("#createClockError").fadeIn("slow");
        }
    });
});