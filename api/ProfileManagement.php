<?php
    require_once 'lib/core.php';

    function bytecode_to_file($data,$file_name,$path)
    {
        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);
        if(file_put_contents($path.$file_name,$data) !== false)
        {
            $img_size=filesize($path.$file_name);
            if($img_size>= 2097152)
            {
                $quality= 20;
            }
            else if($img_size<= 2097152 && $img_size>= 1048576)
            {
                $quality= 25;
            }
            else
            {
                $quality=30;
            }

            list($width, $height, $type, $attr) = getimagesize($path.$file_name); 
            createThumbnail($path.$file_name,$path.$file_name,$width,$height,$quality);
            return true;
        }
        else
        {
            return false;
        }
    }

    function createThumbnail($filepath, $thumbPath, $maxwidth, $maxheight, $quality)
    {   
                $created=false;
                $file_name  = pathinfo($filepath);  
                $format = $file_name['extension'];
                // Get new dimensions
                $newW   = $maxwidth;
                $newH   = $maxheight;

                // Resample
                $thumb = imagecreatetruecolor($newW, $newH);
                $image = imagecreatefromstring(file_get_contents($filepath));
                list($width_orig, $height_orig) = getimagesize($filepath);
                imagecopyresampled($thumb, $image, 0, 0, 0, 0, $newW, $newH, $width_orig, $height_orig);

                // Output
                switch (strtolower($format)) {
                    case 'png':
                    imagepng($thumb, $thumbPath, 9);
                    $created=true;
                    break;

                    case 'gif':
                    imagegif($thumb, $thumbPath);
                    $created=true;
                    break;

                    default:
                    imagejpeg($thumb, $thumbPath, $quality);
                    $created=true;
                    break;
                }
                imagedestroy($image);
                imagedestroy($thumb);
                return $created; 
    }


    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        //MANAGE PROFILE DETAILS
        if(isset($_POST['profile']))
        {
            $name=test_input($_POST['name']);
            $email=test_input($_POST['email']);
            $contact=test_input($_POST['contact']);
            $acontact=test_input($_POST['alt_contact']);
            $address=str_replace("'","&#039;",test_input($_POST['address']));
            $address=str_replace("<","&lt;",$address);
            $address=str_replace(">","&gt;",$address);
            $address=str_replace('"',"&quot;",$address);
            $pin=test_input($_POST['pin']);
            $gstin=test_input($_POST['gstin']);
            $technical_contact=test_input($_POST['technical_contact']);
            $technical_email=test_input($_POST['technical_email']);

           $sql="update shop_details set name='$name', email='$email', contact='$contact', address='$address', alternate_contact='$acontact', pin=$pin, gstin='$gstin', technical_contact='$technical_contact', technical_email='$technical_email'";
            if($conn->query($sql)===true)
            {
                echo "ok";
            }
            else
            {
                echo $conn->error." ".$sql;
            }
        }

        if(isset($_POST['update_logo']))
        {
            //path of images
            $cdnPath="../images";

            /*defined settings - start*/
            ini_set("memory_limit", "99M");
            ini_set('post_max_size', '20M');
            ini_set('max_execution_time', 600);
            define('IMAGE_SMALL_DIR',$cdnPath.'/small/');
            define('IMAGE_MEDIUM_DIR', $cdnPath.'/medium/');
            /*defined settings - end*/

            if(isset($_FILES['logo'])){

                $image_info = getimagesize($_FILES['logo']["tmp_name"]);
                $max_image_width = $image_info[0];
                $max_image_height = $image_info[1];

                $min_image_width =$image_info[0]/5;
                $min_image_height =$image_info[1]/5;

                $output['status']=FALSE;
                set_time_limit(0);
                $allowedImageType = array("image/gif",   "image/jpeg",   "image/pjpeg",   "image/png",   "image/x-png"  );

                if ($_FILES['logo']["error"] > 0) {
                    $output['error']= "Error in File";
                }
                elseif (!in_array($_FILES['logo']["type"], $allowedImageType)) {
                    $output['error']= "You can only upload JPG, PNG and GIF file";
                }
                elseif (round($_FILES['logo']["size"] / 1024) > 4096) {
                    $output['error']= "You can upload file size up to 4 MB";
                } else {
                    /*create directory with 777 permission if not exist - start*/
                    createDir(IMAGE_SMALL_DIR);
                    createDir(IMAGE_MEDIUM_DIR);

                    /*create directory with 777 permission if not exist - end*/
                    $path[0] = $_FILES['logo']['tmp_name'];
                    $file = pathinfo($_FILES['logo']['name']);
                    $fileType = $file["extension"];
                    $desiredExt='jpg';
                    $fileNameNew = rand(333, 999) . time() . ".$desiredExt";
                    $path[1] = IMAGE_MEDIUM_DIR . $fileNameNew;
                    $path[2] = IMAGE_SMALL_DIR . $fileNameNew;

                    if (createThumb($path[0], $path[1], $fileType, $max_image_width,$max_image_height,'')) {

                        if (createThumb($path[1], $path[2],"$desiredExt", $min_image_width,$min_image_height,'')) 
                        {
                            $final_file=str_replace("../images/","",$path[1]);
                             $output['query']= $sql="update shop_details set logo='$final_file'";
                            if($conn->query($sql)===true)
                            {
                                $output['status']=TRUE;
                                $output['image_medium']= $path[1];
                                $output['image_small']= $path[2];
                            }

                        }
                    }
                }

                if($output['status'])
                {
                    echo "ok";
                }
                else
                {
                    echo $output['error'];
                }
            }
        }
        
        //CHANGE BROWSER TAB ICON
        if(isset($_POST['update_icon']))
        {
            //path of images
            $cdnPath="../images";

            /*defined settings - start*/
            ini_set("memory_limit", "99M");
            ini_set('post_max_size', '20M');
            ini_set('max_execution_time', 600);
            define('IMAGE_SMALL_DIR',$cdnPath.'/small/');
            define('IMAGE_MEDIUM_DIR', $cdnPath.'/medium/');
            /*defined settings - end*/

            if(isset($_FILES['icon'])){

                $image_info = getimagesize($_FILES['icon']["tmp_name"]);
                $max_image_width = $image_info[0];
                $max_image_height = $image_info[1];

                $min_image_width =$image_info[0]/5;
                $min_image_height =$image_info[1]/5;

                $output['status']=FALSE;
                set_time_limit(0);
                $allowedImageType = array("image/gif",   "image/jpeg",   "image/pjpeg",   "image/png",   "image/x-png"  );

                if ($_FILES['logo']["error"] > 0) {
                    $output['error']= "Error in File";
                }
                elseif (!in_array($_FILES['icon']["type"], $allowedImageType)) {
                    $output['error']= "You can only upload JPG, PNG and GIF file";
                }
                elseif (round($_FILES['icon']["size"] / 1024) > 4096) {
                    $output['error']= "You can upload file size up to 4 MB";
                } else {
                    /*create directory with 777 permission if not exist - start*/
                    createDir(IMAGE_SMALL_DIR);
                    createDir(IMAGE_MEDIUM_DIR);

                    /*create directory with 777 permission if not exist - end*/
                    $path[0] = $_FILES['icon']['tmp_name'];
                    $file = pathinfo($_FILES['icon']['name']);
                    $fileType = $file["extension"];
                    $desiredExt='jpg';
                    $fileNameNew = rand(333, 999) . time() . ".$desiredExt";
                    $path[1] = IMAGE_MEDIUM_DIR . $fileNameNew;
                    $path[2] = IMAGE_SMALL_DIR . $fileNameNew;

                    if (createThumb($path[0], $path[1], $fileType, $max_image_width,$max_image_height,'')) {

                        if (createThumb($path[1], $path[2],"$desiredExt", $min_image_width,$min_image_height,'')) 
                        {
                            $final_file=str_replace("../images/","",$path[1]);
                             $output['query']= $sql="update shop_details set icon='$final_file'";
                            if($conn->query($sql)===true)
                            {
                                $output['status']=TRUE;
                                $output['image_medium']= $path[1];
                                $output['image_small']= $path[2];
                            }

                        }
                    }
                }

                if($output['status'])
                {
                    echo "ok";
                }
                else
                {
                    echo $output['error'];
                }
            }
        }        

        //CHANGE PASSWORD
        if(isset($_POST['update_password']))
        {
            $current=md5($_POST['current_pass']);
            $new=md5($_POST['new_pass']);
            $confirm=md5($_POST['confirm_pass']);
            $email=test_input($_POST['email']);
            if(change_pass($current,$new,$confirm,$conn, $email))
            {
                echo "ok";
            }
            else
                echo "Invalid Current Password!";
        }

    }
?>