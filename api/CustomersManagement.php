<?php
    require_once 'lib/core.php';
    
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {  
        //ADD LOCAL CUSTOMER
        if(isset($_POST['add_customer']))
        {
            $name=$conn->real_escape_string(test_input($_POST['name']));
            $name=str_replace("'","&#039;",$name);
			$name=str_replace("’","&#039;",$name);
			$name=str_replace("‘","&#039;",$name);
            $name=str_replace('"',"&quot;",$name);
			$name=str_replace('“',"&quot;",$name);
			$name=str_replace('”',"&quot;",$name);
            
            $email=$conn->real_escape_string(test_input($_POST['email']));
            $contact=$conn->real_escape_string(test_input($_POST['contact']));
            
            $state=$conn->real_escape_string(test_input($_POST['state']));
            $city=$conn->real_escape_string(test_input($_POST['city']));
            $zipcode=$conn->real_escape_string(test_input($_POST['zipcode']));
            
            $landmark=$conn->real_escape_string(test_input($_POST['landmark']));
            $landmark=str_replace("'","&#039;",$landmark);
			$landmark=str_replace("’","&#039;",$landmark);
			$landmark=str_replace("‘","&#039;",$landmark);
			$landmark=str_replace("<","&lt;",$landmark);
			$landmark=str_replace(">","&gt;",$landmark);
			$landmark=str_replace('"',"&quot;",$landmark);
			$landmark=str_replace('“',"&quot;",$landmark);
			$landmark=str_replace('”',"&quot;",$landmark);
			
		  	$address=$conn->real_escape_string(test_input($_POST['address']));
			$address=str_replace("'","&#039;",$address);
			$address=str_replace("’","&#039;",$address);
			$address=str_replace("‘","&#039;",$address);
			$address=str_replace("<","&lt;",$address);
			$address=str_replace(">","&gt;",$address);
			$address=str_replace('"',"&quot;",$address);
			$address=str_replace('“',"&quot;",$address);
			$address=str_replace('”',"&quot;",$address);
            
            $sql="select u.id from users u, user_profiles up where u.email='$email' or up.contact='$contact'";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    echo "already registered";
                }
                else
                {
                    $sql="select id from local_customers where email='$email' or contact='$contact'";
                    if($result = $conn->query($sql))
                    {
                        if($result->num_rows)
                        {
                            echo "already registered";
                        }
                        else
                        {
                            if(isset($_POST['agent_id']))
                            {
                                $agent_id=test_input($_POST['agent_id']);
                                $sql="insert into local_customers(name, email, contact, address, state, city, zipcode, landmark, agent_id) ";
                                $sql.="values('$name', '$email', '$contact', '$address', '$state', '$city', '$zipcode', '$landmark', $agent_id)";
                            }
                            else
                            {
                                $sql="insert into local_customers(name, email, contact, address, state, city, zipcode, landmark) ";
                                $sql.="values('$name', '$email', '$contact', '$address', '$state', '$city', '$zipcode', '$landmark')";
                            }
                            if($conn->query($sql)===true)
                            {
                                echo "ok";
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
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //EDIT LOCAL CUSTOMER DETAILS
        if(isset($_POST['edit_customer']))
        {
            $name=test_input($_POST['name']);
            $name=str_replace("'","&#039;",$name);
			$name=str_replace("’","&#039;",$name);
			$name=str_replace("‘","&#039;",$name);
            $name=str_replace('"',"&quot;",$name);
			$name=str_replace('“',"&quot;",$name);
			$name=str_replace('”',"&quot;",$name);
            
            $email=test_input($_POST['email']);
            $contact=test_input($_POST['contact']);
            
            $state=test_input($_POST['state']);
            $city=test_input($_POST['city']);
            $zipcode=test_input($_POST['zipcode']);
            
            $landmark=test_input($_POST['landmark']);
            $landmark=str_replace("'","&#039;",$landmark);
			$landmark=str_replace("’","&#039;",$landmark);
			$landmark=str_replace("‘","&#039;",$landmark);
			$landmark=str_replace("<","&lt;",$landmark);
			$landmark=str_replace(">","&gt;",$landmark);
			$landmark=str_replace('"',"&quot;",$landmark);
			$landmark=str_replace('“',"&quot;",$landmark);
			$landmark=str_replace('”',"&quot;",$landmark);
			
		  	$address=test_input($_POST['address']);
			$address=str_replace("'","&#039;",$address);
			$address=str_replace("’","&#039;",$address);
			$address=str_replace("‘","&#039;",$address);
			$address=str_replace("<","&lt;",$address);
			$address=str_replace(">","&gt;",$address);
			$address=str_replace('"',"&quot;",$address);
			$address=str_replace('“',"&quot;",$address);
			$address=str_replace('”',"&quot;",$address);
            
            $sql="update local_customers set name='$name', email='$email', contact='$contact', address='$address', state='$state', city='$city', ";
            $sql.="zipcode='$zipcode', landmark='$landmark' where id=".$_POST['edit_customer'];
            if($conn->query($sql)===true)
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //BLOCK USERS
        if(isset($_POST['block']))
        {
            $reason=test_input($_POST['reason']);
            $reason=str_replace("'", "", strtolower($reason));
			$reason=str_replace('"','',$reason);
			$reason=str_replace('/','-',$reason);
			$reason=str_replace('\\','-',$reason);
            $sql="update user_profiles set status='Block', block_reason='$reason' where u_id=".$_POST['block'];
            if($conn->query($sql)===true)
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //UNBLOCK USERS
        if(isset($_POST['enable']))
        {
            $sql="update user_profiles set status='Enabled' where u_id=".$_POST['enable'];
            if($conn->query($sql)===true)
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //ADD ONLINE USER
        if(isset($_POST['register_user']))
        {
            $fname=test_input($_POST['fname']);
            $fname=str_replace("'","&#039;",$fname);
			$fname=str_replace("’","&#039;",$fname);
			$fname=str_replace("‘","&#039;",$fname);
            $fname=str_replace('"',"&quot;",$fname);
			$fname=str_replace('“',"&quot;",$fname);
			$fname=str_replace('”',"&quot;",$fname);
            
            $lname=test_input($_POST['lname']);
            $lname=str_replace("'","&#039;",$lname);
			$lname=str_replace("’","&#039;",$lname);
			$lname=str_replace("‘","&#039;",$lname);
            $lname=str_replace('"',"&quot;",$lname);
			$lname=str_replace('“',"&quot;",$lname);
			$lname=str_replace('”',"&quot;",$lname);
            
            $email=test_input($_POST['email']);
            $contact=test_input($_POST['contact']);
            $pass=md5(test_input($_POST['pass']));
            
            $sql="select u.id from users u, user_profiles up where u.email='$email' or up.contact='$contact'";
            if($result = $conn->query($sql))
            {
            
                if($result->num_rows)
                {
                    echo "already registered";
                }
                else
                {
                    $sql="insert into users(email, password, type) values('$email', '$pass', 3)";
                    if($conn->query($sql))
                    {
                        $user_id=$conn->insert_id;
                        $sql="insert into user_profiles(u_id, f_name, l_name, contact, gender, status, token, profile_pic) ";
                        $sql.="values($user_id, '$fname', '$lname', '$contact', 'Male', 'Enabled', '', 'user.png') ";
                        if($conn->query($sql))
                        {
                            echo "ok".$user_id;
                        }
                        else
                        {
                            echo "error";
                        }
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
        
        //UPDATE ONLINE USER
        if(isset($_POST['update_user']))
        {
            $id=test_input($_POST['update_user']);
            $fname=str_replace("'","&#039;",$fname);
			$fname=str_replace("’","&#039;",$fname);
			$fname=str_replace("‘","&#039;",$fname);
            $fname=str_replace('"',"&quot;",$fname);
			$fname=str_replace('“',"&quot;",$fname);
			$fname=str_replace('”',"&quot;",$fname);
            
            $lname=test_input($_POST['lname']);
            $lname=str_replace("'","&#039;",$lname);
			$lname=str_replace("’","&#039;",$lname);
			$lname=str_replace("‘","&#039;",$lname);
            $lname=str_replace('"',"&quot;",$lname);
			$lname=str_replace('“',"&quot;",$lname);
			$lname=str_replace('”',"&quot;",$lname);
            
            $email=test_input($_POST['email']);
            $contact=test_input($_POST['contact']);
            
            $sql="select u.id from users u, user_profiles up where (u.email='$email' or up.contact='$contact') and u.id<>$id";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    
                    $duplicate='';
                    
                    if($row['email'] == $email)
                    {
                        $duplicate.="Email";
                    }
                    
                    if($row['contact'] == $contact)
                    {
                        if(empty($duplicate))
                        {
                            $duplicate.="Contact";
                        }
                        else
                        {
                            $duplicate.=", Contact";
                        }
                    }
                    
                    $duplicate = preg_replace('/,([^,]*)$/', ' & \1', $duplicate);
                    
                    echo "already".$duplicate;
                }
                else
                {
                    $sql="update users set email='$email' where id=$id";
                    if($conn->query($sql))
                    {
                        $sql="update user_profiles set f_name='$fname', l_name='$lname', contact='$contact' where u_id=$id";
                        if($conn->query($sql))
                        {
                            echo "ok";
                        }
                        else
                        {
                            echo "error";
                        }
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
        
        //UPDATE ONLINE USER
        if(isset($_POST['update_user_password']))
        {
            $id=test_input($_POST['update_user_password']);
            $cpass=md5(test_input($_POST['current_pass']));
            $npass=md5(test_input($_POST['new_pass']));
            
            $sql="select id from users where id=$id and password='$cpass'";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $sql="update users set password='$cpass' where id=$id";
                    if($conn->query($sql))
                    {
                        echo "ok";
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
            else
            {
                echo $conn->error;
            }
        }
        
        //UPDATE ONLINE USER PASSWORD FROM ADMIN
        if(isset($_POST['update_customer_password']))
        {
            $id=test_input($_POST['update_customer_password']);
            $cpass=md5(test_input($_POST['new_pass']));
            
            $sql="select id from users where id=$id";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $sql="update users set password='$cpass' where id=$id";
                    if($conn->query($sql))
                    {
                        echo "ok";
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
            else
            {
                echo $conn->error;
            }
        }
        
        //ADD ADDRESS TO USER
        if(isset($_POST['add_address']))
        {
            $id=test_input($_POST['add_address']);
            
            $name=test_input($_POST['name']);
            $name=str_replace("'","&#039;",$name);
			$name=str_replace("’","&#039;",$name);
			$name=str_replace("‘","&#039;",$name);
            $name=str_replace('"',"&quot;",$name);
			$name=str_replace('“',"&quot;",$name);
			$name=str_replace('”',"&quot;",$name);
            
            $contact=test_input($_POST['contact']);
            $zip=test_input($_POST['zip']);
            $landmark=test_input($_POST['landmark']);
            $state=test_input($_POST['state']);
            $city=test_input($_POST['city']);
            $address_type=test_input($_POST['address_type']);
			$address=test_input($_POST['address']);
            $address=str_replace("'","&#039;",$address);
			$address=str_replace("’","&#039;",$address);
			$address=str_replace("‘","&#039;",$address);
			$address=str_replace("<","&lt;",$address);
			$address=str_replace(">","&gt;",$address);
			$address=str_replace('"',"&quot;",$address);
			$address=str_replace('“',"&quot;",$address);
			$address=str_replace('”',"&quot;",$address);
            
            $sql="select id from address where u_id=$id";
            if($result=$conn->query($sql))
            {         
                if($result->num_rows)
                {
                    $sql="insert into address(u_id, name, contact, zip, city, landmark, state, address_type, address) ";
                    $sql.="values($id, '$name', '$contact', '$zip', '$city', '$landmark', '$state', '$address_type', '$address')";
                }
                else
                {
                    $sql="insert into address(u_id, name, contact, zip, city, landmark, state, address_type, address, is_default) ";
                    $sql.="values($id, '$name', '$contact', '$zip', '$city', '$landmark', '$state', '$address_type', '$address', 1)";
                }
                if($conn->query($sql))
                {
                    echo "ok";
                }
                else
                {
                    echo $conn->error;
                }
            }
        }
        
        //REMOVE ADDRESS TO USER
        if(isset($_POST['remove_address']))
        {
            $id=test_input($_POST['remove_address']);
            $address_id=test_input($_POST['remove_address_id']);
            
            $sql="delete from address where u_id=$id and id=$address_id";
            if($conn->query($sql))
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
    
		//MAKE DEFAULT ADDRESS
		if(isset($_POST['choose_default_address']) && isset($_POST['dafault_address_id']))
		{
			$user_id=test_input($_POST['choose_default_address']);
			$address_id=test_input($_POST['dafault_address_id']);
			
			$sql="update address set is_default=0 where u_id=$user_id";
			if($conn->query($sql))
			{
				$sql="update address set is_default=1 where id=$address_id";
				if($conn->query($sql))
				{
					echo "ok";
				}
				else
				{
					echo $conn->error.' '.$sql;
				}
			}
			else
			{
				echo $conn->error.' '.$sql;
			}
		}
        
        //GET DEFAULT ADDRESS FOR USER 
        if(isset($_POST['get_default_pincode']))
        {
            $user_id=test_input($_POST['get_default_pincode']);
            
            $sql="select zip from address where u_id=$user_id and is_default=1";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row = $result->fetch_assoc();
                    echo $row['zip'];
                }
                else
                {
                    echo "no";
                }
            }
        }
	}
?>