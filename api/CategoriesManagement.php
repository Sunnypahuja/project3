<?php
    require_once 'lib/core.php';
    
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {  
		//ADD CATEGORIES
        if(isset($_POST['add']) && !isset($_POST['type']))
		{
			$name=rtrim(test_input($_POST['name']),' ');
		  	$name=ltrim($name,' ');
		  	$parent=test_input($_POST['parent']);
			$status=test_input($_POST['status']);
			$sort_order=test_input($_POST['sort_order']);

		  	$sql="select id from menus where name='$name'";
		  	$result=$conn->query($sql);
		  	if($result->num_rows>0)
		  	{
				echo "already";
		  	}
			else
			{
				$link=str_replace(" ", "-", $name);
				$link=str_replace('(','-',$link);
				$link=str_replace('&','',$link);
				$link=str_replace('amp;','',$link);
				$link=str_replace(')','-',$link);
				$link=str_replace('.','-',$link); 
				$link=str_replace(',','-',$link);
				$link=str_replace('/','-',$link);
				$link=str_replace('\\','-',$link);
			  	
			  	$response = array();
				$upload_dir = '../images/';
				
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
					}
                    else 
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

				}
                else{
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "No file was sent!"
					);
				}
			  
			  	if($response['status'] == "success")
				{
					$sql="insert into menus(image,name,parent,link,sort_order,status) values('".strtolower($random_name)."','$name','None','$link',$sort_order,'$status')";
					if($conn->query($sql)===true)
					{
						$menu_id=$conn->insert_id;
						
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
		}

		//EDIT CATEGORIES
		if(isset($_POST['edit']) && !isset($_POST['type']))
		{
			$name=rtrim(test_input($_POST['name']),' ');
			$name=ltrim($name,' ');
			$status=test_input($_POST['status']);
			$sort_order=test_input($_POST['sort_order']);
			$old_name=test_input($_POST['old_name']);
			$link=str_replace(" ", "-", $name);
			$link=str_replace('(','-',$link);
			$link=str_replace('&','',$link);
			$link=str_replace('amp;','',$link);
			$link=str_replace(')','-',$link);
			$link=str_replace('.','-',$link); 
			$link=str_replace(',','-',$link);
			$link=str_replace('/','-',$link);
			$link=str_replace('\\','-',$link);
			
			$response = array();
				$upload_dir = '../images/';
				
			
			if(isset($_FILES['image']))
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

			}
			else
			{
				$response = array(
					"status" => "success",
					"error" => false,
					"message" => "None"
				);
			}
			
			if($response['status'] == "success")
			{
				$sql="update menus set parent='$name' where parent='$old_name'";
				if($conn->query($sql)===true)
				{
					if(isset($_FILES['image']))
					{
						$sql="update menus set name='$name', status='$status', link='$link', sort_order=$sort_order, image='".strtolower($random_name)."' where id=".$_POST['edit'];
					}
					else
					{
						$sql="update menus set name='$name', status='$status', link='$link', sort_order=$sort_order where id=".$_POST['edit'];
					}
					if($conn->query($sql)===true)
					{
						$menu_id=$_POST['edit'];
						
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
				echo $response['message'];
			}
		}

        //ADD STUDY MATERIAL
		if(isset($_POST['add_study']))
		{
		  	$sort_order=test_input($_POST['sort_order']);
		  	$title=test_input($_POST['title']);
			  $tag=test_input($_POST['tag']);
		  
		  	$status=test_input($_POST['status']);
		  	$type=test_input($_POST['type']);
		  	$choice=test_input($_POST['choice']);

			$response = array();
			$upload_dir = '../images/';
			$server_url = 'http://127.0.0.1:8000';
			if($_FILES['file'])
			{
				$image_name = $_FILES["file"]["name"];
				$image_tmp_name = $_FILES["file"]["tmp_name"];
				$error = $_FILES["file"]["error"];
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
				$sql="insert into study_material(type, pc_id, title,tag, file,  status, sort_order) ";
                $sql.="values('$type', '$choice','$title','$tag', '".strtolower($random_name)."','$status', $sort_order)";
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
		
		//DELETE STUDY MATERIAL
		if(isset($_POST['delete_study']))
		{
			  $sql="delete from study_material where id=".$_POST['delete_study'];
			  if($conn->query($sql)===true)
			  {
  				  echo "ok";
			  }
			  else
			  {
				  echo $conn->error;
			  }
		}
        
        //EDIT STUDY MATERIAL STATUS
		if(isset($_POST['status_study']))
		{
            $sql="select status from study_material where id=".$_POST['status_study'];
            if($res = $conn->query($sql))
            {
                if($res->num_rows)
                {
                    $r = $res->fetch_assoc();
                    if($r['status'] == "active")
                    {
                        $sql="update study_material set status='inactive' where id=".$_POST['status_study'];
                    }
                    else
                    {
                        $sql="update study_material set status='active' where id=".$_POST['status_study'];
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
            else
            {
                echo $conn->error;
            }
		}
    }



	if(isset($_POST['register_student']))
		{

			$fname=test_input($_POST['fname']);
			$lname=test_input($_POST['lname']);
			$email=test_input($_POST['email']);
			$contact=test_input($_POST['contact']);
			$pass=test_input($_POST['pass']);
			$gender=test_input($_POST['gender']);
			  

			 $upswd = md5($pass); 
			 $sql="insert into users (email,password,type) values('$email','$upswd','2') ";
		
			  if($result = $conn->query($sql))
			  {
				$id = $conn->insert_id;
				
				    $sql1="insert into user_profiles (u_id,status,f_name,l_name,gender,contact,profile_pic) values('$id','Enabled','$fname','$lname','$gender','$contact','user.png')";
				  if($result1 = $conn->query($sql1))
				  {
					$mail->AltBody = 'This is an auto generated email so please dont reply this';
					$mail->AddAddress($email);   
					$mail->Subject = "Welcome"; 
					$mail->isHtml(true);
					
					$mail->Body = '<!doctype html>
									<html lang="en-US">

									<head>
									<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
									<title>Welcome</title>
									<meta name="description" content="Reset Password Email Template.">
									<style type="text/css">
										a:hover {text-decoration: underline !important;}
									</style>
									</head>

									<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
									<!--100% body table-->
									<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
										style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open Sans", sans-serif;">
										<tr>
											<td>
												<table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
													align="center" cellpadding="0" cellspacing="0">
													<tr>
														<td style="height:80px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="height:20px;">&nbsp;</td>
													</tr>
													<tr>
														<td>
															<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
																style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
																<tr>
																	<td style="height:40px;">&nbsp;</td>
																</tr>
																<tr>
																	<td style="padding:0 35px;">
																		<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">Welcome Email</h1>
																		<span
																			style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
																		<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
																			Hello user!! Welcome<br/>
																		</p>
																	</td>
																</tr>
																<tr>
																	<td style="height:40px;">&nbsp;</td>
																</tr>
															</table>
														</td>
													<tr>
														<td style="height:20px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="height:80px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
									<!--/100% body table-->
									</body>

									</html>';
					$mail->send();
					$response['msg']='ok';
				  }
				  else
				  {
					  $response['msg']='error1';
				  }
			  }else
			  {
				  
				  $response['msg']='error';
			  }

			 echo json_encode($response);
		  

		}
?>