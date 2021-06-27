<?php
    require_once 'lib/core.php';

    //MAKE CHANGES TO RETURN POLICY
    if(isset($_POST['return_policy_submit']))
    {
        $content=str_replace("'","&#039;",$conn->real_escape_string($_POST['dis']));
        $content=str_replace("<","&lt;",$content);
        $content=str_replace(">","&gt;",$content);
        $content=str_replace('"',"&quot;",$content);
        $max=$conn->real_escape_string($_POST['max_days']);
        $charge=$conn->real_escape_string($_POST['charge_days']);
        $amount=$conn->real_escape_string($_POST['charge_amount']);
        $type=$conn->real_escape_string($_POST['type']);

        if($max > 0)
        {
            if($charge<$max && $charge>=0)
            {
                if($max >= 0 && $charge<$max)
                {
                    $sql="update return_policy set max_day=$max ,charge_day=$charge,type ='$type' ,amount=$amount ,policy_content='$content'";
                    if($conn->query($sql))
                    {
                        echo "ok";
                    }
                    else
                    {
                        echo 'Not updated';
                    }

                }        
                else
                {
                    echo 'Not updated';
                }
            }
            else
            {
                echo 'Not updated';
            }            
        }           
    }


    //SET SHIPPING MIN AMOUNT
    if(isset($_POST['shipping_min_amount']))
    {                                  
        $min_amount=$conn->real_escape_string($_POST['minammount']);
        $charge=$conn->real_escape_string($_POST['shipping_charge']);
        $sell_scope=$conn->real_escape_string($_POST['sell_scope']);
        
        if(isset($_POST['max_distance']))
        {
            $max_distance=$conn->real_escape_string($_POST['max_distance']);
        }
        else
        {
            $max_distance='';
        }
        $sql="update shop_details set shipping_min_amount=$min_amount,shipping_charge=$charge,shipping_scope='$sell_scope',max_local_distance=$max_distance";
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }
    
    //condition for add shipping rules
    if(isset($_POST['charges']) && isset($_POST['distance']) && isset($_POST['shipping_rule']) )
    {                                  
        $charges=$conn->real_escape_string($_POST['charges']);
        $distance=$conn->real_escape_string($_POST['distance']);
        
        $sql="insert into local_delivery(charge,distance) values($charges,$distance)";
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }
    
    //DELTE RULE OF LOCAL DELIVERY
    if(isset($_POST['local_ship']))
    {                                  
        $local_id=$conn->real_escape_string($_POST['local_ship']);
        
        $sql="delete from local_delivery where id=$local_id";
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }

    //CHANGE STATUS OF DELIVERY - LOCAL OR GLOBAL
    if(isset($_POST['shipping_local_status']))
    {
        $status=$conn->real_escape_string($_POST['shipping_local_status']);
        if($status)
            $status=0;
        else
            $status=1;

        $sql="update shop_details set local_shipping=$status";
        if($conn->query($sql)===true)
        {
            $response['msg']='ok';
            $response['data']=$status;    
        }
        else
            $response['msg']='Status not be updated.';

        echo json_encode($response);
    }

    //ADD STAFF ACCOUNT
    if(isset($_POST['add_staff']))
    {
      $fname=$conn->real_escape_string($_POST['fname']);
      $lname=$conn->real_escape_string($_POST['lname']);
      $email=$conn->real_escape_string($_POST['email']);
      $password=$conn->real_escape_string($_POST['password']);
      $password=md5($password);
      $gender=$conn->real_escape_string($_POST['gender']);
      $contact=$conn->real_escape_string($_POST['contact']);
      $sql="insert into users(email,password,type) values('$email','$password',4)";
      if($conn->query($sql))
      {
        $staff_id=$conn->insert_id;
        $sql="insert into user_profiles(u_id,f_name,l_name,gender,contact,profile_pic,status) values($staff_id,'$fname','$lname','$gender','$contact','user.png','Enable')";
        if($conn->query($sql))
        {
            echo "ok";
        }
        else
        {
            $sql="delete from users where id=$staff_id";
            $conn->query($sql);
            echo "error";
        }
      }
      else
      {
            echo $conn->error;
      }
    }
      
    //DELETE STAFF ACCOUNT
    if(isset($_POST['staff_account_delete']))
    {
        $id_d=$_POST["staff_account_delete"];
        $sql="delete from user_profiles where u_id=$id_d";
        if($conn->query($sql))
        {
            $sql="delete from users where id=$id_d";
            if($conn->query($sql))
                echo "ok";
            else
                echo $conn->error;
        }
        else
            echo $conn->error;
    }
	
    //EDIT STAFF ACCOUNT
    if(isset($_POST['edit_staff_account']))
    {
        $staff_id=$_POST["edit_staff_account"];
        $fname=$conn->real_escape_string($_POST['efname']);
        $lname=$conn->real_escape_string($_POST['elname']);
        $email=$conn->real_escape_string($_POST['eemail']);
        $gender=$conn->real_escape_string($_POST['egender']);
        $contact=$conn->real_escape_string($_POST['econtact']);
        if(isset($_POST['epassword']))
        {
            $password=$conn->real_escape_string($_POST['epassword']);
            $password=md5($password);
            $sql="update users set email='$email',password='$password' where id=$staff_id";
            if($conn->query($sql))
            {	
                $sql="update user_profiles set f_name='$fname',l_name='$lname',gender='$gender',contact='$contact' where u_id=$staff_id";
                if($conn->query($sql))
                {
                  echo "ok";
                }
                else
                {
                  echo $conn->error;
                }
            }
            else
            {
              echo $conn->error;
            }
        }
        else
        {
            $sql="update staff_account set name='$name',email='$email',password='$password' where id='$id'";
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

    //CHANGE THE NAVBAR ACCESS STATUS FOR STAFF ACCOUNTS
	if(isset($_POST["navbar_status"]))
	{
		$status=$_POST["navbar_status"];
		//for switch toggle
		$id=$_POST["id"];
		$s_id=$_POST["staff_id"];
		$sql="select access from navbar_access where staff_id=$s_id and navbar_id=$id";
		if($result=$conn->query($sql))
		{
			if($result->num_rows>0)
			{
			    $exists=true;
			}
		}
		if(isset($exists))
		{
			$sql="delete from navbar_access where staff_id=$s_id and navbar_id=$id";
			if($conn->query($sql))
				echo "ok";
			else
				echo $conn->error;
		}
		else
		{
			$sql="insert into navbar_access(staff_id,navbar_id,access) values($s_id,$id,$status)";
			if($conn->query($sql))
				echo "ok";
			else
				echo $conn->error;
		}
    }

    //DELETE FROM TAXES
     if(isset($_POST['tax_id'])){
        $id=$_POST['tax_id'];
        $sql="DELETE from taxes where id=$id";
        if($conn->query($sql)){
            echo "success";
        }
        else{
            echo $conn->error;
        }
    }
    
    //ADD TAXES
    if(isset($_POST['add_tax']))
    {
        $name=$conn->real_escape_string($_POST['name']);
        $type=$conn->real_escape_string($_POST['type']);
        $charge=$conn->real_escape_string($_POST['charge']);
        $sql="select id from taxes where name='$name'";
        $result=$conn->query($sql);
        if($result->num_rows>0)
        {
            echo "already";
        }
        else
        {
             $sql="Insert Into taxes (name,charges,type) values ('$name',$charge,'$type')";
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

    //EDIT TAXES
    if(isset($_POST['edit_tax']))
    {
        $name=$conn->real_escape_string($_POST['ename']);
        $type=$conn->real_escape_string($_POST['etype']);
        $charge=$conn->real_escape_string($_POST['echarge']);
        $id=$conn->real_escape_string($_POST['value_id']);
        $sql="UPDATE taxes set name='$name',type='$type',charges=$charge where id=$id";
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }

    if(isset($_POST['set_cleaning_charge']))
    {
        $charge=$conn->real_escape_string($_POST['set_cleaning_charge']);
        
        $sql="update shop_details set cleaning_charges=$charge";
        if($conn->query($sql))
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
            
    }

    //ADD CHARGE
    if(isset($_POST['add_charge']))
    {
        $name=$conn->real_escape_string($_POST['name']);
        $charge=$conn->real_escape_string($_POST['amount']);
        $sql="insert into cutting_charges(name,charge) values ('$name',$charge)";
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }         
    }

    //EDIT CHARGE
    if(isset($_POST['edit_charge']))
    {
        $name=$conn->real_escape_string($_POST['ename']);
        $charge=$conn->real_escape_string($_POST['eamount']);
        $id=$conn->real_escape_string($_POST['edit_charge']);
        $sql="UPDATE cutting_charges set name='$name',charge=$charge where id=$id";
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }

    //DELETE CHARGE
    if(isset($_POST['delete_charge']))
    {
        $id=$conn->real_escape_string($_POST['delete_charge']);
        $sql="delete from cutting_charges where id=$id";
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }

    //DELETE FAQ
    if(isset($_POST['delete_faq'])) //for deleting navbar heads
    {
        $id=$_POST["delete_faq"];
        $sql="delete from faq where id='$id'";
        if($conn->query($sql))
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }       
    
    //ADD FAQ
    if(isset($_POST['add_faq']))   //for adding  navbar heads
    {
        $ques=str_replace("'","&#39;",$conn->real_escape_string($_POST["head"]));
        $ans=str_replace("'","&#39;",$conn->real_escape_string($_POST["description"]));
        $sql="insert into faq(question,answer) values('$ques','$ans')";
        if($conn->query($sql))
        {
          echo "ok";
        }
        else
        {
          echo $conn->error;
        }
    }

    //EDIT FAQ
    if(isset($_POST['edit_faq']))     //for editing navbar heads
    {
        $eid=$_POST["edit_faq"];
        $ques=str_replace("'","&#39;",$conn->real_escape_string($_POST["ehead"]));
        $ans=str_replace("'","&#39;",$conn->real_escape_string($_POST["description"]));
        $sql="update faq set question='$ques',answer='$ans' where id='$eid'";
        if($conn->query($sql))
        {
          echo "ok";
        }
        else
        {
          echo $conn->error;
        } 
    }

    //ADD FEATURED COURSE
    if(isset($_POST['add_featured']))  
    {
        $fId=$conn->real_escape_string($_POST["course_main"]);
        $sql="insert into featured_courses(course_id) values($fId)";
        if($conn->query($sql))
        {
          echo "ok";
        }
        else
        {
          echo $conn->error;
        }
    }

    //DELETE FEATURED
    if(isset($_POST['delete_featured']))
    {
        $sql="delete from featured_courses where course_id=".$_POST['delete_featured'];
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }

    //ADD REVIEW
    if(isset($_POST['add_review']))
    {
        $name=$conn->real_escape_string($_POST['name']);
        $title=$conn->real_escape_string($_POST['title']);
        $description=$conn->real_escape_string($_POST['description']);

        $response = array();
        $upload_dir = '../images/';
        $server_url = 'http://127.0.0.1:8000';
        if($_FILES['image'])
        {
            $image_name = $_FILES["image"]["name"];
            $image_tmp_name = $_FILES["image"]["tmp_name"];
            $error = $_FILES["image"]["error"];
            if($error > 0){
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }else 
            {
                $random_name = strtolower(rand(1000,100000)."-".uniqid()."-".substr($image_name, -7));
                $upload_name = $upload_dir.strtolower($random_name);
                $upload_name = preg_replace('/\s+/', '-', $upload_name);

                if(move_uploaded_file($image_tmp_name , $upload_name)) {
                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "File uploaded successfully",
                        "url" => $server_url."/".$upload_name
                        );
                }
                else
                {
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "Error uploading the file!"
                    );
                }
            }

        }else{
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "No file was sent!"
            );
        }

        if($response['status'] == "success")
        {
            $sql="insert into reviews(name, title, description, image) values('$name', '$title', '$description', '".strtolower($random_name)."')";
            if($conn->query($sql)===true)
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        else
        {
            echo $response['message'];
        }
    }
    
    //DELETE REVIEW
    if(isset($_POST['delete_review']))
    {
            $sql="delete from reviews where id=".$_POST['delete_review'];
            if($conn->query($sql)===true)
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
    }

    //ADD FOOTER LINK
    if(isset($_POST['add_footer_link']))  
    {
        $fId=$conn->real_escape_string($_POST["course_main"]);
        $sql="insert into useful_links(page_id) values($fId)";
        if($conn->query($sql))
        {
          echo "ok";
        }
        else
        {
          echo $conn->error;
        }
    }

    //DELETE FOOTER LINKS
    if(isset($_POST['delete_footer']))
    {
        $sql="delete from useful_links where page_id=".$_POST['delete_footer'];
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }

    //ADD WHY US
    if(isset($_POST['add_why']))  
    {
        $head=$conn->real_escape_string($_POST["head"]);
        $description=$conn->real_escape_string($_POST["description"]);
        $sort_order=$conn->real_escape_string($_POST["sort_order"]);

        $sql="insert into why_us(title,description,sort_order) values('$head', '$description', $sort_order)";
        if($conn->query($sql))
        {
          echo "ok";
        }
        else
        {
          echo $conn->error;
        }
    }

    //EDIT WHY US
    if(isset($_POST['edit_why']))  
    {
        $edit_why=$conn->real_escape_string($_POST["edit_why"]);

        $head=$conn->real_escape_string($_POST["head"]);
        $description=$conn->real_escape_string($_POST["description"]);
        $sort_order=$conn->real_escape_string($_POST["sort_order"]);

        $sql="update why_us set title='$head', description='$description', sort_order=$sort_order where id=$edit_why";
        if($conn->query($sql))
        {
          echo "ok";
        }
        else
        {
          echo $conn->error;
        }
    }

    //DELETE WHY US
    if(isset($_POST['delete_why']))
    {
        $sql="delete from why_us where id=".$_POST['delete_why'];
        if($conn->query($sql)===true)
        {
            echo "ok";
        }
        else
        {
            echo $conn->error;
        }
    }
?>