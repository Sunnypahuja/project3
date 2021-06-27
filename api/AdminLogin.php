<?php
	include_once 'lib/core.php'; 

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {  
        if(isset($_POST['email']) && isset($_POST['password']))
        {
            $email=$conn->real_escape_string(trim(test_input($_POST['email'])));
            $password=md5($_POST['password']);
            if($id = login($email,$password,$conn))
            {
                echo "ok$id";
            }
            else
            {
                echo "Invalid Username & Password"; 
            }
        }
        
        if(isset($_POST['agent_email']) && isset($_POST['agent_password']))
        { 
            $email=$conn->real_escape_string(trim(test_input($_POST['agent_email'])));
            $password=md5($_POST['agent_password']);
            
            $sql="select id from agents where (email='$email' or contact='$email') and password='$password'";
            
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    echo "ok".$row['id'];
                }
                else
                {
                    echo "Invalid Username & Password"; 
                }
            }
            else
            {
                echo "Invalid Username & Password"; 
            }
        }
        
        if(isset($_POST['agent_email']) && isset($_POST['agent_id']))
        { 
            $email=$conn->real_escape_string(trim(test_input($_POST['agent_email'])));
            $id=$conn->real_escape_string($_POST['agent_id']);
            
            $sql="select id from agents where (email='$email' or contact='$email') and id='$id'";
            
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    echo "ok";
                }
                else
                {
                    echo "Invalid Username & Password"; 
                }
            }
            else
            {
                echo "Invalid Username & Password"; 
            }
        }
        
        if(isset($_POST['user_email']) && isset($_POST['user_password']))
        { 
            $email=$conn->real_escape_string(trim(test_input($_POST['user_email'])));
            $password=md5($_POST['user_password']);
            
            $sql="select u.id from users u, user_profiles up where u.id=up.u_id and (u.email='$email' or up.contact='$email') and u.password='$password'";
            
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    echo "ok".$row['id'];
                }
                else
                {
                    echo "Invalid Username & Password"; 
                }
            }
            else
            {
                echo "Invalid Username & Password"; 
            }
        }
        
        if(isset($_POST['user_email']) && isset($_POST['user_id']))
        { 
            $email=$conn->real_escape_string(trim(test_input($_POST['user_email'])));
            $id=$conn->real_escape_string($_POST['user_id']);
            
            $sql="select u.id from users u, user_profiles up where u.id=up.u_id and (u.email='$email' or up.contact='$email') and u.id=$id";
            
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    echo "ok";
                }
                else
                {
                    echo "Invalid Username & Password"; 
                }
            }
            else
            {
                echo "Invalid Username & Password"; 
            }
        }
        
        if(isset($_POST['customer_details']))
        {
            $id=$conn->real_escape_string(test_input($_POST['customer_details']));
            $sql="select * from users u, user_profiles up where u.id=up.u_id and u.id=$id";
            
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    echo json_encode($row);
                }
                else
                {
                    echo "error"; 
                }
            }
            else
            {
                echo "error"; 
            }   
        }
        
        if(isset($_POST['register_agent']))
        {
            $name=test_input($_POST['name']);
		  	$email=test_input($_POST['email']);
		  	$aadhar=test_input($_POST['aadhar']);
		  	$contact=test_input($_POST['contact']);
		  	$pincode=test_input($_POST['pincode']);
			
		  	$address=test_input($_POST['address']);
			$address=str_replace("'","&#039;",$address);
			$address=str_replace("’","&#039;",$address);
			$address=str_replace("‘","&#039;",$address);
			$address=str_replace("<","&lt;",$address);
			$address=str_replace(">","&gt;",$address);
			$address=str_replace('"',"&quot;",$address);
			$address=str_replace('“',"&quot;",$address);
			$address=str_replace('”',"&quot;",$address);
			
		  	$password=md5(test_input($_POST['password']));
            
            $sql="select id from agents where email='$email' or aadhar='$aadhar' or contact='$contact'";
            if($res = $conn->query($sql))
            {		
                if($res->num_rows)
                {
                    echo "already registered";
                }
                else
                {
                    $sql="insert into agents(name, email, password, aadhar, contact, pincode, address) ";
                    $sql.="values('$name', '$email', '$password', '$aadhar', '$contact', '$pincode', '$address')";
                    if($conn->query($sql)===true)
                    {
                        echo "ok".$conn->insert_id;
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
            }
            else
            {
                echo $conn->error;
            }
        }
		
		if(isset($_POST['forgot_user']))
        {
            $email=$conn->real_escape_string(test_input($_POST['forgot_user']));
            $sql="select u.id, u.email, up.contact from users u, user_profiles up where u.id=up.u_id and (u.email='$email' or up.contact='$email')";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    $otp=rand(100000,999999);

                    $mMail->addAddress($row['email']); 
                    //$mMail->addAddress("oberoigaurav317@gmail.com"); 
                    $mMail->Subject = 'Account Recovery';
                    $mMail->Body = "<strong>Use $otp as your OTP for account password recovery @ Market Boi.<br/>Please do not share this otp with anyone.</strong>";
                    if($mMail->send())
                    {
                        echo $otp;
                    }
                    else
                    {
                        echo "unable";
                    }
                }
                else
                {
                    echo "invalid";
                }
            }
        }
        
        if(isset($_POST['change_user_pass']) && isset($_POST['change_pass']))
        {
            $user=$conn->real_escape_string(test_input($_POST['change_user_pass']));
            $pass=md5(test_input($_POST['change_pass']));
            
            $sql="select u.id, u.email, up.contact from users u, user_profiles up where u.id=up.u_id and (u.email='$user' or up.contact='$user')";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
            
                    $sql="update users set password='$pass' where id=".$row['id'];
                    if($conn->query($sql))
                    {
                        echo "ok".$row['id']."e".$row['email'];
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
                else
                {
                    echo "invalid";
                }
            }
            else
            {
                echo "error";
            }
        }
    
		if(isset($_POST['forgot_agent']))
        {
            $email=$conn->real_escape_string(test_input($_POST['forgot_agent']));
			
			$sql="select id, email from agents where (email='$email' or contact='$email')";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    $otp=rand(100000,999999);

                    $mMail->addAddress($row['email']); 
                    //$mMail->addAddress("oberoigaurav317@gmail.com"); 
                    $mMail->Subject = 'Account Recovery';
                    $mMail->Body = "<strong>Use $otp as your OTP for account password recovery @ Market Boi.<br/>Please do not share this otp with anyone.</strong>";
                    if($mMail->send())
                    {
                        echo $otp;
                    }
                    else
                    {
                        echo "unable";
                    }
                }
                else
                {
                    echo "invalid";
                }
            }
        }
        
        if(isset($_POST['change_agent_pass']) && isset($_POST['change_pass']))
        {
            $user=$conn->real_escape_string(test_input($_POST['change_agent_pass']));
            $pass=md5(test_input($_POST['change_pass']));
            
			$sql="select id, email, contact from agents where (email='$user' or contact='$user')";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
            
                    $sql="update agents set password='$pass' where id=".$row['id'];
                    if($conn->query($sql))
                    {
                        echo "ok".$row['id']."e".$row['email'];
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
                else
                {
                    echo "invalid";
                }
            }
            else
            {
                echo "error";
            }
        }
	}
?>