<?php
header('Access-Control-Allow-Origin: *');
//for the database
//$db_server = "103.76.231.95";
//$db_username = "webix4me_weazy";
//$db_password = "develop@123";
//$dbname = "webix4me_wecart-main";
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$dbname = "react_lms";

// Create connection
$conn_admin = new mysqli($db_server, $db_username,$db_password, $dbname);
// Check connection
if ($conn_admin->connect_error) {
    die("Connection failed: " . $conn_admin->connect_error);
}


//page value;
$admin=1;
$subadmin=2;
$user=3;

//Session Variables
$session_login="kfgvufaj1";
?>