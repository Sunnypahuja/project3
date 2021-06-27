<?php
    require_once 'lib/core.php';
    
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {  
		
		//ADD PRODUCT
		if(isset($_POST['add_programme']))
		{
			$name=$conn->real_escape_string($_POST['name']);
			$fees=$conn->real_escape_string($_POST['fees']);
			$tax_per=$conn->real_escape_string($_POST['tax_per']);
			
			$starting_from=$conn->real_escape_string($_POST['starting_from']);
			$status=$conn->real_escape_string($_POST['status']);
			$description=$conn->real_escape_string($_POST['description']);

            $link = slugify($name);

			$response = array();
			$upload_dir = '../images/';
			
			if($_FILES['image']['name'])
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
					"status" => "error",
					"error" => true,
					"message" => "No file was sent!"
				);
			}

            if(isset($_FILES['schedule_pdf']['name']))
			{
				$pdf_name = $_FILES["schedule_pdf"]["name"];
				$pdf_tmp_name = $_FILES["schedule_pdf"]["tmp_name"];
				$pdf_error = $_FILES["schedule_pdf"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$pdfName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($pdf_name, -7));
					$upload_name = $upload_dir.strtolower($pdfName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($pdf_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

            if(isset($_FILES['sample_video']['name']))
			{
				$video_name = $_FILES["sample_video"]["name"];
				$video_tmp_name = $_FILES["sample_video"]["tmp_name"];
				$video_error = $_FILES["sample_video"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$videoName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($video_name, -7));
					$upload_name = $upload_dir.strtolower($videoName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($video_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

			if($response['status'] == "success")
			{
				$sql="insert into programs_and_courses(image, name, link, type, description, fees, tax_per, starting_from, status ";
				
				if(isset($pdfName))
				{
					$sql.=", schedule_pdf";	
				}

                if(isset($videoName))
				{
					$sql.=", sample_video";	
				}
				
				$sql.=") values ('$random_name', '$name', '$link', 'program', '$description', '$fees', '$tax_per', '$starting_from', '$status'";
				if(isset($pdfName))
				{
					$sql.=", '$pdfName'";	
				}

                if(isset($videoName))
				{
					$sql.=", '$videoName'";	
				}
				
				$sql.=")";
				
				if($conn->query($sql)===true)
				{
					$prod_id=$conn->insert_id;
					
					echo "ok";
				}
				else
				{
					echo $conn->error." ";
				}
			}
			else
			{
				echo $response['message'];
			}
		}
		
		//EDIT PRODUCT
		if(isset($_POST['edit_programme']))
		{
			$id=$conn->real_escape_string($_POST['edit_programme']);
			$name=$conn->real_escape_string($_POST['name']);
			$fees=$conn->real_escape_string($_POST['fees']);
			$tax_per=$conn->real_escape_string($_POST['tax_per']);
			
			$starting_from=$conn->real_escape_string($_POST['starting_from']);
			$status=$conn->real_escape_string($_POST['status']);
			$description=$conn->real_escape_string($_POST['description']);

			$response = array();
			$upload_dir = '../images/';
			
			if(isset($_FILES['image']) && !empty($_FILES['image']['name']))
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
							"message" => "File uploaded successfully"
							//"url" => $server_url."/".$upload_name
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
					"message" => "No file was sent!"
				);
			}

            if(isset($_FILES['schedule_pdf']['name']))
			{
				$pdf_name = $_FILES["schedule_pdf"]["name"];
				$pdf_tmp_name = $_FILES["schedule_pdf"]["tmp_name"];
				$pdf_error = $_FILES["schedule_pdf"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$pdfName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($pdf_name, -7));
					$upload_name = $upload_dir.strtolower($pdfName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($pdf_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

            if(isset($_FILES['sample_video']['name']))
			{
				$video_name = $_FILES["sample_video"]["name"];
				$video_tmp_name = $_FILES["sample_video"]["tmp_name"];
				$video_error = $_FILES["sample_video"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$videoName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($video_name, -7));
					$upload_name = $upload_dir.strtolower($videoName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($video_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

			if($response['status'] == "success")
			{
				$sql="update programs_and_courses set name='$name', status='$status', description='$description', fees='$fees', tax_per='$tax_per', starting_from='$starting_from' ";
				
				if(isset($random_name))
				{
					$sql.=", image='$random_name' ";
				}

                if(isset($pdfName))
				{
					$sql.=", schedule_pdf='$pdfName' ";
				}

                if(isset($videoName))
				{
					$sql.=", sample_video='$videoName' ";
				}
				
				$sql.=" where id=$id";
				
				if($conn->query($sql)===true)
				{
					$prod_id=$id;
					
					echo "ok";
				}
				else
				{
					echo "error";
				}
			}
			else
			{
				echo $response['message'];
			}
		}
    
		//DELETE Product Image 
		if(isset($_POST['delete_programme']))
		{
			$id=$conn->real_escape_string($_POST['delete_programme']);
			$sql="update programs_and_courses set status='delete' where id=$id";
			if($conn->query($sql))
			{
				echo "ok";
			}
			else
			{
				echo $conn->error;
			}
		}

        //ADD PRODUCT
		if(isset($_POST['add_course']))
		{
			$name=$conn->real_escape_string($_POST['name']);
			$fees=$conn->real_escape_string($_POST['fees']);
			$tax_per=$conn->real_escape_string($_POST['tax_per']);
			
			$starting_from=$conn->real_escape_string($_POST['starting_from']);
			$status=$conn->real_escape_string($_POST['status']);
			$description=$conn->real_escape_string($_POST['description']);

            $link = slugify($name);

			$response = array();
			$upload_dir = '../images/';
			
			if($_FILES['image']['name'])
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
					"status" => "error",
					"error" => true,
					"message" => "No file was sent!"
				);
			}

            if(isset($_FILES['schedule_pdf']['name']))
			{
				$pdf_name = $_FILES["schedule_pdf"]["name"];
				$pdf_tmp_name = $_FILES["schedule_pdf"]["tmp_name"];
				$pdf_error = $_FILES["schedule_pdf"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$pdfName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($pdf_name, -7));
					$upload_name = $upload_dir.strtolower($pdfName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($pdf_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

            if(isset($_FILES['sample_video']['name']))
			{
				$video_name = $_FILES["sample_video"]["name"];
				$video_tmp_name = $_FILES["sample_video"]["tmp_name"];
				$video_error = $_FILES["sample_video"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$videoName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($video_name, -7));
					$upload_name = $upload_dir.strtolower($videoName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($video_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

			if($response['status'] == "success")
			{
				$sql="insert into programs_and_courses(image, name, link, type, description, fees, tax_per, starting_from, status ";
				
				if(isset($pdfName))
				{
					$sql.=", schedule_pdf";	
				}

                if(isset($videoName))
				{
					$sql.=", sample_video";	
				}
				
				$sql.=") values ('$random_name', '$name', '$link', 'course', '$description', '$fees', '$tax_per', '$starting_from', '$status'";
				if(isset($pdfName))
				{
					$sql.=", '$pdfName'";	
				}

                if(isset($videoName))
				{
					$sql.=", '$videoName'";	
				}
				
				$sql.=")";
				
				if($conn->query($sql)===true)
				{
					$prod_id=$conn->insert_id;
					
					echo "ok";
				}
				else
				{
					echo $conn->error." ";
				}
			}
			else
			{
				echo $response['message'];
			}
		}
		
		//EDIT PRODUCT
		if(isset($_POST['edit_course']))
		{
			$id=$conn->real_escape_string($_POST['edit_course']);
			$name=$conn->real_escape_string($_POST['name']);
			$fees=$conn->real_escape_string($_POST['fees']);
			$tax_per=$conn->real_escape_string($_POST['tax_per']);
			
			$starting_from=$conn->real_escape_string($_POST['starting_from']);
			$status=$conn->real_escape_string($_POST['status']);
			$description=$conn->real_escape_string($_POST['description']);

			$response = array();
			$upload_dir = '../images/';
			
			if(isset($_FILES['image']) && !empty($_FILES['image']['name']))
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
							"message" => "File uploaded successfully"
							//"url" => $server_url."/".$upload_name
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
					"message" => "No file was sent!"
				);
			}

            if(isset($_FILES['schedule_pdf']['name']))
			{
				$pdf_name = $_FILES["schedule_pdf"]["name"];
				$pdf_tmp_name = $_FILES["schedule_pdf"]["tmp_name"];
				$pdf_error = $_FILES["schedule_pdf"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$pdfName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($pdf_name, -7));
					$upload_name = $upload_dir.strtolower($pdfName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($pdf_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

            if(isset($_FILES['sample_video']['name']))
			{
				$video_name = $_FILES["sample_video"]["name"];
				$video_tmp_name = $_FILES["sample_video"]["tmp_name"];
				$video_error = $_FILES["sample_video"]["error"];
				if($pdf_error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$videoName = strtolower(rand(1000,100000)."-".uniqid()."-".substr($video_name, -7));
					$upload_name = $upload_dir.strtolower($videoName);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($video_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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

			if($response['status'] == "success")
			{
				$sql="update programs_and_courses set name='$name', status='$status', description='$description', fees='$fees', tax_per='$tax_per', starting_from='$starting_from' ";
				
				if(isset($random_name))
				{
					$sql.=", image='$random_name' ";
				}

                if(isset($pdfName))
				{
					$sql.=", schedule_pdf='$pdfName' ";
				}

                if(isset($videoName))
				{
					$sql.=", sample_video='$videoName' ";
				}
				
				$sql.=" where id=$id";
				
				if($conn->query($sql)===true)
				{
					$prod_id=$id;
					
					echo "ok";
				}
				else
				{
					echo "error";
				}
			}
			else
			{
				echo $response['message'];
			}
		}
    
		//DELETE Product Image 
		if(isset($_POST['delete_course']))
		{
			$id=$conn->real_escape_string($_POST['delete_course']);
			$sql="update programs_and_courses set status='delete' where id=$id";
			if($conn->query($sql))
			{
				echo "ok";
			}
			else
			{
				echo $conn->error;
			}
		}

        //DELETE QUIZ
		if(isset($_POST['delete_quiz']))
		{
			$id=$conn->real_escape_string($_POST['delete_quiz']);
            $sql="delete from quiz_options where question_id in(select id from quiz_questions where quiz_id=$id)";
			if($conn->query($sql))
			{
				$sql="delete from quiz_questions where quiz_id=$id";
                if($conn->query($sql))
                {
                    $sql="delete from quiz where id=$id";
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
				echo $conn->error;
			}
		}

        //ADD QUIZ
		if(isset($_POST['add_product']))
		{
			$name=$conn->real_escape_string($_POST['name']);
			$totalPoints=$conn->real_escape_string($_POST['totalPoints']);
			$type=$conn->real_escape_string($_POST['type']);
			$prevyear=$conn->real_escape_string($_POST['prevyear']);

			$status=$conn->real_escape_string($_POST['status']);
			$free=$conn->real_escape_string($_POST['free']);
			$under=$conn->real_escape_string($_POST['under']);
			
			$available_from=$conn->real_escape_string($_POST['available_from']);
			$available_to=$conn->real_escape_string($_POST['available_to']);

			$description=$conn->real_escape_string($_POST['description']);

            if(isset($_POST['questions']))
            {
                $questions=json_decode($_POST['questions']);
            }

			$response = array();
			$upload_dir = '../images/';
			
			if(isset($_FILES['file']['name']))
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
					"error" => true,
					"message" => "No file was sent!"
				);
			}
			if(isset($_FILES['file1']['name']))
			{
				$image_name = $_FILES["file1"]["name"];
				$image_tmp_name = $_FILES["file1"]["tmp_name"];
				$error = $_FILES["file1"]["error"];
				if($error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$random_name1 = strtolower(rand(1000,100000)."-".uniqid()."-".substr($image_name, -7));
					$upload_name = $upload_dir.strtolower($random_name1);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($image_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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
					"error" => true,
					"message" => "No file was sent!"
				);
			}
			if(isset($_FILES['file2']['name']))
			{
				$image_name = $_FILES["file2"]["name"];
				$image_tmp_name = $_FILES["file2"]["tmp_name"];
				$error = $_FILES["file2"]["error"];
				if($error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$random_name2 = strtolower(rand(1000,100000)."-".uniqid()."-".substr($image_name, -7));
					$upload_name = $upload_dir.strtolower($random_name2);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($image_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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
					"error" => true,
					"message" => "No file was sent!"
				);
			}

			if($response['status'] == "success")
			{
				$sql="insert into quiz(title, type, description, total_points, available_from, available_to, status, prev_year ";
				
                if($free == "yes")
                {
                    $sql.=", free_under";
                }
                else
                {
                    $sql.=", paid_under";
                }

				if(isset($random_name))
				{
					$sql.=", media_file";	
				}
				if(isset($random_name1))
				{
					$sql.=", media_file1";	
				}
				if(isset($random_name2))
				{
					$sql.=", media_file2";	
				}
				
				$sql.=") values ('$name', '$type', '$description', '$totalPoints', '$available_from', '$available_to', '$status', '$prevyear', '$under'";

				if(isset($random_name))
				{
					$sql.=", '$random_name'";	
				}
				if(isset($random_name1))
				{
					$sql.=", '$random_name1'";	
				}
				if(isset($random_name2))
				{
					$sql.=", '$random_name2'";	
				}
				
				$sql.=")";
				
				if($conn->query($sql)===true)
				{
					$prod_id=$conn->insert_id;

                    if(isset($questions))
                    {
                        foreach($questions as $q)
                        {
                            $question = $conn->real_escape_string($q->question);
                            $correct = $conn->real_escape_string($q->correct_answer);
                            $explanation = $conn->real_escape_string($q->explanation);
                            $options = $q->options;

                            $sql="insert into quiz_questions(quiz_id, question, correct_answer, explanation) values($prod_id, '$question', $correct, '$explanation')";

                            if($conn->query($sql))
                            {
                                $question_id=$conn->insert_id;
                                foreach($options as $o)
                                {
                                    $o=$conn->real_escape_string($o);

                                   $sql="insert into quiz_options(question_id, option_value) values($question_id, '$o')";
                                    if($conn->query($sql))
                                    {
                                        
                                    }
                                    else
                                    {
                                        $queryError=true;
                                        break;
                                    }
                                }
                            }
                            else
                            {
                                $queryError=true;
                                break;
                            }
                        }
                    }

                    if(isset($queryError))
                    {
                        echo "error";
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
			else
			{
				echo $response['message'];
			}
		}

        //EDIT PRODUCT
		if(isset($_POST['edit_product']))
		{
            $id=$conn->real_escape_string($_POST['edit_product']);

            $name=$conn->real_escape_string($_POST['name']);
			$totalPoints=$conn->real_escape_string($_POST['totalPoints']);
			$type=$conn->real_escape_string($_POST['type']);

			$status=$conn->real_escape_string($_POST['status']);
			$free=$conn->real_escape_string($_POST['free']);
			$under=$conn->real_escape_string($_POST['under']);
			
			$available_from=$conn->real_escape_string($_POST['available_from']);
			$available_to=$conn->real_escape_string($_POST['available_to']);

			$description=$conn->real_escape_string($_POST['description']);

			
            if(isset($_POST['questions']))
            {
                $questions=json_decode($_POST['questions']);
            }

			$response = array();
			$upload_dir = '../images/';
			
			if(isset($_FILES['file']['name']))
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
					"error" => true,
					"message" => "No file was sent!"
				);
			}

			if(isset($_FILES['file1']['name']))
			{
				$image_name = $_FILES["file1"]["name"];
				$image_tmp_name = $_FILES["file1"]["tmp_name"];
				$error = $_FILES["file1"]["error"];
				if($error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$random_name1 = strtolower(rand(1000,100000)."-".uniqid()."-".substr($image_name, -7));
					$upload_name = $upload_dir.strtolower($random_name1);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($image_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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
					"error" => true,
					"message" => "No file was sent!"
				);
			}

			if(isset($_FILES['file2']['name']))
			{
				$image_name = $_FILES["file2"]["name"];
				$image_tmp_name = $_FILES["file2"]["tmp_name"];
				$error = $_FILES["file2"]["error"];
				if($error > 0){
					$response = array(
						"status" => "error",
						"error" => true,
						"message" => "Error uploading the file!"
					);
				}else 
				{
					$random_name2 = strtolower(rand(1000,100000)."-".uniqid()."-".substr($image_name, -7));
					$upload_name = $upload_dir.strtolower($random_name2);
					$upload_name = preg_replace('/\s+/', '-', $upload_name);

					if(move_uploaded_file($image_tmp_name , $upload_name)) {
						$response = array(
							"status" => "success",
							"error" => false,
							"message" => "File uploaded successfully",
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
					"error" => true,
					"message" => "No file was sent!"
				);
			}

			if($response['status'] == "success")
			{
				$sql="update quiz set title='$name', type='$type', description='$description', total_points='$totalPoints', ";
                $sql.="available_from='$available_from', available_to='$available_to', status='$status' ";
				if($free == "yes")
                {
                    $sql.=", free_under='$under', paid_under=NULL";
                }
                else
                {
                    $sql.=", free_under=NULL, paid_under='$under'";
                }

				if(isset($random_name))
				{
					$sql.=", media_file='$random_name'";	
				}
                
				if(isset($random_name1))
				{
					$sql.=", media_file1='$random_name1'";	
				}
                
				if(isset($random_name2))
				{
					$sql.=", media_file2='$random_name2'";	
				}
                
                
				
				$sql.=" where id=$id";
				
				if($conn->query($sql)===true)
				{
					$prod_id=$id;

                    if(isset($questions) || $type == "mains")
                    {
                        $sql="delete from quiz_options where question_id in(select id from quiz_questions where quiz_id=$id)";
                        if($conn->query($sql))
                        {
                            $sql="delete from quiz_questions where quiz_id=$id";
                            if($conn->query($sql))
                            {}
                        }
                    }

                    if(isset($questions))
                    {
                        foreach($questions as $q)
                        {
                            $question = $conn->real_escape_string($q->question);
                            $correct = $conn->real_escape_string($q->correct_answer);
                            $explanation = $conn->real_escape_string($q->explanation);
                            $options = $q->options;

                            $sql="insert into quiz_questions(quiz_id, question, correct_answer, explanation) values($prod_id, '$question', $correct, '$explanation')";

                            if($conn->query($sql))
                            {
                                $question_id=$conn->insert_id;
                                foreach($options as $o)
                                {
                                    $o=$conn->real_escape_string($o);

                                    $sql="insert into quiz_options(question_id, option_value) values($question_id, '$o')";
                                    if($conn->query($sql))
                                    {
                                        
                                    }
                                    else
                                    {
                                        $queryError=true;
                                        break;
                                    }
                                }
                            }
                            else
                            {
                                $queryError=true;
                                break;
                            }
                        }
                    }

                    if(isset($queryError))
                    {
                        echo "error";
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
			else
			{
				echo $response['message'];
			}
		}
	}
        //EDIT PRODUCT
		if(isset($_POST['edit_product_previous']))
		{
            $id=$conn->real_escape_string($_POST['edit_product_previous']);

            $name=$conn->real_escape_string($_POST['name']);
			$totalPoints=$conn->real_escape_string($_POST['totalPoints']);
			$type=$conn->real_escape_string($_POST['type']);

			$status=$conn->real_escape_string($_POST['status']);
			$free=$conn->real_escape_string($_POST['free']);
			$under=$conn->real_escape_string($_POST['under']);
			
			$available_from=$conn->real_escape_string($_POST['available_from']);
			$available_to=$conn->real_escape_string($_POST['available_to']);

			$description=$conn->real_escape_string($_POST['description']);

			
            if(isset($_POST['questions']))
            {
                $questions=json_decode($_POST['questions']);
            }

			$response = array();
			$upload_dir = '../images/';
			
			if(isset($_FILES['file']['name']))
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
					"error" => true,
					"message" => "No file was sent!"
				);
			}

			if($response['status'] == "success")
			{
				$sql="update quiz set title='$name', type='$type', description='$description', total_points='$totalPoints', ";
                $sql.="available_from='$available_from', available_to='$available_to', status='$status' ";
				if($free == "yes")
                {
                    $sql.=", free_under='$under', paid_under=NULL";
                }
                else
                {
                    $sql.=", free_under=NULL, paid_under='$under'";
                }

				if(isset($random_name))
				{
					$sql.=", media_file='$random_name'";	
				}
				$sql.=" where id=$id";
				
				if($conn->query($sql)===true)
				{
					$prod_id=$id;

                    if(isset($questions) || $type == "mains")
                    {
                        $sql="delete from quiz_options where question_id in(select id from quiz_questions where quiz_id=$id)";
                        if($conn->query($sql))
                        {
                            $sql="delete from quiz_questions where quiz_id=$id";
                            if($conn->query($sql))
                            {}
                        }
                    }

                    if(isset($questions))
                    {
                        foreach($questions as $q)
                        {
                            $question = $conn->real_escape_string($q->question);
                            $correct = $conn->real_escape_string($q->correct_answer);
                            $explanation = $conn->real_escape_string($q->explanation);
                            $options = $q->options;

                           $sql="insert into quiz_questions(quiz_id, question, correct_answer, explanation) values($prod_id, '$question', $correct, '$explanation')";

                            if($conn->query($sql))
                            {
                                $question_id=$conn->insert_id;
                                foreach($options as $o)
                                {
                                    $o=$conn->real_escape_string($o);

                                  $sql="insert into quiz_options(question_id, option_value) values($question_id, '$o')";
                                    if($conn->query($sql))
                                    {
                                        
                                    }
                                    else
                                    {
                                        $queryError=true;
                                        break;
                                    }
                                }
                            }
                            else
                            {
                                $queryError=true;
                                break;
                            }
                        }
                    }

                    if(isset($queryError))
                    {
                        echo "error";
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
			else
			{
				echo $response['message'];
			}
		}


	if(isset($_POST['updatefile']))
		{
			$m=$_POST['mediaa'];
			$id=$_POST['updatefile'];
			print_r($_FILES);
			print_r($_POST);
			$response=[];
			if(upload_files_quiz($_FILES,$conn,"quiz","id",$m,$id,"file","uploads"))
			{
				$data['msg']= "ok";
			}
			else
			{
				$data['msg'] = "File Not Uploaded";
			}

			 echo json_encode($data);
		  

		}
?>