<?php
	include_once 'lib/core.php';   
    header('Access-Control-Allow-Origin: *');
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {  
        if(isset($_POST['email']) && isset($_POST['id']))
        { 
            $email=$conn->real_escape_string(trim(test_input($_POST['email'])));
            $id=$conn->real_escape_string(test_input($_POST['id']));
              $sql="select id from users where email='$email' and id=$id";
            $result=$conn->query($sql);
            if($result->num_rows)
            {
                echo "ok";
            }
            else
            {
                echo "no"; 
            }
        }
    }
?>