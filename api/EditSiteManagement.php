<?php
    require_once 'lib/core.php';
    
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {  
		//EDIT PAGE DATA
		if(isset($_POST['edit_page']))
		{
			  $page_name=rtrim(test_input($_POST['page_name']),' ');
			  $page_name=ltrim($page_name,' ');
			  $page_data=test_input($_POST['page_data']);
			  $id=test_input($_POST['edit_page']);
			  $parent=test_input($_POST['page_parent']);
			  $status=test_input($_POST['page_status']);

			  $sql="update dynamic_pages set page_name='".strtolower($page_name)."', page_data='$page_data', status='$status',  ";
              if($parent == "None")
              {
                $sql.="parent_id=NULL ";
              }
              else
              {
                $sql.="parent_id='$parent' ";
              }
              $sql.="where id=$id";
			  if($conn->query($sql))
			  {
					if(isset($_FILES))
					{
					if(upload_files2($_FILES,$conn,"dynamic_pages","id","file",$id, "file","uploads"))
						{
							echo "ok";
						}
						else
						{
							echo "file not uploaded";
						}
					}
					else
					{
						echo "ok";
					}
			  }
			  else
			  {
				  echo $conn->error;
			  }
		}
		
		//ADD PAGE DATA
		if(isset($_POST['add_page']))
		{
			  $page_name=rtrim(test_input($_POST['page_name']),' ');
			  $page_name=ltrim($page_name,' ');
			  $page_title=test_input($_POST['page_title']);
			
			  $sql="insert into dynamic_pages(page_name, title, page_data) values('".strtolower($page_name)."', '$page_title', '<h1>Will Get Updated Soon</h1>')";
			  	if($conn->query($sql)===true)
			  	{
				  	$id=$conn->insert_id;
					if(isset($_FILES))
					{
					   if(upload_files2($_FILES,$conn,"dynamic_pages","id","file",$insert_id,"file","uploads"))
						{
							$data['msg']= "ok";
						}
						else
						{
							$data['msg']= "file not uploaded";
						}
					}
					else
					{
						echo "ok";
					}
			  }
			  else
			  {
				  echo $conn->error;
			  }
		}
		
		//DELETE PAGE DATA
		if(isset($_POST['delete_page']))
		{
			  $sql="delete from dynamic_pages where id=".$_POST['delete_page'];
			  if($conn->query($sql)===true)
			  {
  				  echo "ok";
			  }
			  else
			  {
				  echo $conn->error;
			  }
		}
		
		//ADD SLIDER
		if(isset($_POST['add_slider']))
		{
		  	$sort_order=test_input($_POST['sort_order']);

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
				$sql="insert into slider(image,sort_order) values('".strtolower($random_name)."',$sort_order)";
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
		
		//DELETE SLIDER
		if(isset($_POST['delete_slider']))
		{
			  $sql="delete from slider where id=".$_POST['delete_slider'];
			  if($conn->query($sql)===true)
			  {
  				  echo "ok";
			  }
			  else
			  {
				  echo $conn->error;
			  }
		}
        
        //CHANGE STATUS OF SLIDER
		if(isset($_POST['status_slider']))
		{
            $sql="select status from slider where id=".$_POST['status_slider'];
            if($res = $conn->query($sql))
            {
                if($res->num_rows)
                {
                    $r = $res->fetch_assoc();
                    if($r['status'] == "active")
                    {
                        $sql="update slider set status='block' where id=".$_POST['status_slider'];
                    }
                    else
                    {
                        $sql="update slider set status='active' where id=".$_POST['status_slider'];
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
		
		//ADD SOCIAL LINK
		if(isset($_POST['add_media']))
		{
		  	$icon=test_input($_POST['media']);
			$head=ucwords(str_replace("fa-","",$icon));
		  	$link=test_input($_POST['link']);

			$sql="insert into social_links(head,icon,link) values('$head','$icon','$link')";
			if($conn->query($sql)===true)
			{
				echo "ok";
			}
			else
			{
				echo $conn->error;
			}
		}
		
		//DELETE SOCIAL LINK
		if(isset($_POST['delete_media']))
		{
			  $sql="delete from social_links where id=".$_POST['delete_media'];
			  if($conn->query($sql)===true)
			  {
  				  echo "ok";
			  }
			  else
			  {
				  echo $conn->error;
			  }
		}

        //ADD MEDIA
		if(isset($_POST['add_media_file']))
		{
			$response = array();

            $final_images = [];

			$upload_dir = '../images/';
			$server_url = 'http://127.0.0.1:8000';
			if($_FILES['file']['name'])
			{
                foreach($_FILES['file']['name'] as $key=>$f)
                {
                    $image_name = $_FILES["file"]["name"][$key];
                    $image_tmp_name = $_FILES["file"]["tmp_name"][$key];
                    $error = $_FILES["file"]["error"][$key];
                    if($error > 0){
                        $response = array(
                            "status" => "error",
                            "error" => true,
                            "message" => "Error uploading the file!"
                        );
                        break;
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

                        if($response['status'] == "success")
                        {
                            $sql="insert into documents_upload(src) values('".strtolower($random_name)."')";
                            if($conn->query($sql)===true)
                            {
                                $final_images[]=strtolower($random_name);
                            }
                            else
                            {
                                $response = array(
                                    "status" => "error",
                                    "error" => true,
                                    "message" => "Query Error".$conn->error
                                );
                                break;
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                }
			}
            else
            {
				$response = array(
					"status" => "error",
					"error" => true,
					"message" => "No file was sent!"
				);
			}

			if($response['status'] == "success")
			{
				echo json_encode($final_images);
			}
			else
			{
				echo "error";
			}
		}
		
		//DELETE MEDIA
		if(isset($_POST['delete_media']))
		{
			  $sql="delete from documents_upload where id=".$_POST['delete_media'];
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
?>