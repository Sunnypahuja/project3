<?php
  header('Access-Control-Allow-Origin: localhost:3000');  
	include_once 'lib/core.php'; 
    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        if(isset($_POST['email']) && isset($_POST['password']))
        {
            $email=$conn->real_escape_string(trim(test_input($_POST['email'])));
            $password=md5($_POST['password']);
            if($id = teacher_login($email,$password,$conn))
            {
                echo "ok$id";
            }
            else
            {
                echo "Invalid Username & Password"; 
            }
        }
    }
?>