<?php
header('Access-Control-Allow-Origin: *');
if(isset($_GET['SESSID']) && !empty($_GET['SESSID']))
{
    session_id($_GET['SESSID']);
    $location=substr($_SERVER['REQUEST_URI'],0,strpos($_SERVER['REQUEST_URI'],"?"));
    header("location: $location");
}
session_start();
require_once'PHPMailer/PHPMailerAutoload.php';
require_once'config.php'; 
  

    //check page setting
    function check_page($id,$conn)
    {
        $sql="select * from services where link='$id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0)
           return true;
        else
        {
            header("location:error.php");
            die();
        }
    }


    //check user authpage for admin and staff
    function user_auth($page,$type1,$type2)
    {
        if($page!=$type1 || $page!=$type2)
            header("location:logout");   
    }

    //method to check availability of page to staff account
    function page_allowed($conn,$conn_admin,$id,$page)
    {
        $sql="select cn.id from customer_navbar cn left outer join customer_navbar_corresponding_pages cncp on cn.id=cncp.navbar_id where cn.link='$page' or cncp.link='$page' ";
        $res=$conn_admin->query($sql);
        if($res->num_rows>0)
        {
            $row=$res->fetch_assoc();
            $nid=$row['id'];
            $sql="select access from navbar_access where navbar_id=$nid  and staff_id=$id";
    		if($res=$conn->query($sql))
    		{
    			if($res->num_rows>0)
    			{
    				$row=$res->fetch_assoc();
    				if($row['access']!=0)
    					return true;
    				else
    					return false;
    			}
    		}
    		else
    		{
    			$sql="";
    			return false;
    		}
        }
		else
		{
			$sql="";
			return false;
		}   
    }

//check page request
    function check_request($id,$unid,$conn)
    {
        $sql="select * from registrations where id='$id' and unid='$unid'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0)
           return true;
        else
        {
          header("location:404.php");
            die();
        }
        
    }
//velidation for input type
    function test_input($data) 
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

//add address
    function add_address($name,$contact,$zip,$city,$state,$address,$landmark,$conn,$u_id)
    {
        $sql="insert into address(u_id,name,contact,zip,city,state,address,landmark) values($u_id,'$name','$contact','$zip','$city','$state','$address','$landmark')";
        if($conn->query($sql)===true)
        {   
            $last_id = $conn->insert_id;
            return $last_id;
        }
        else
        {
            return $conn->error;
        }
    }
    
    //ADMIN LOGIN
    function login($email,$password,$conn)
    {
        $sql="select * from users where email='$email' and password='$password' and type=1";
        
        if($res=$conn->query($sql))
        {
            $type=-1;
            $id=-1;
            while($row=$res->fetch_assoc())
            {
                $type=$row['type'];
                $id=$row['id'];
            }
            switch($type)
            {
                case 1: $_SESSION['session_admin']=$email;
						$_SESSION['id']=$id;
                        return $id;
						break;
                default: return false;
            }
        }
        else
            return false;
    }
    
//user login
   function user_login($email,$password,$conn,$user)
    {
        $sql="select email,id from users where email='$email' and password='$password' and type=$user";
        $res=$conn->query($sql);
        if($res->num_rows > 0)
        {
            $data = $res->fetch_assoc();
            setcookie("new",$email, time() + (86400 * 80), "/");  // set cookie for 1 month
			setcookie("pass",$password, time() + (86400 * 80), "/");  // set cookie for 1 month
            $_SESSION['signed_in']=$email;
            $_SESSION['user_type'] = $user;
            $_SESSION['user_id'] =$data['id'];
            // header("location: home"); 
            return $data['id'];
        }
        else
            return false;
    }
    //teacher login
   function teacher_login($email,$password,$conn)
    {
        $sql="select email,id from teachers where email='$email' and password='$password'";
        $res=$conn->query($sql);
        if($res->num_rows > 0)
        {
            $data = $res->fetch_assoc();
            setcookie("new",$email, time() + (86400 * 80), "/");  // set cookie for 1 month
			setcookie("pass",$password, time() + (86400 * 80), "/");  // set cookie for 1 month
            $_SESSION['teacher_in']=$email;
            $_SESSION['teacher_id'] =$data['id'];
            // header("location: home"); 
            return $data['id'];
        }
        else
            return false;
    }

//check for cookie login
    function cookie_login($conn)
    {
        if (!isset($_SESSION['signed_in']))
        {  
            if(isset($_COOKIE["new"]) && isset($_COOKIE["pass"]))
            {
                $email=test_input($_COOKIE["new"]);
	               $pass=$_COOKIE["pass"];
                $sql= "select email from users where email='$email' and password='$pass'";
                $result = $conn->query($sql);
                if ($result->num_rows > 0) 
                {
	               $_SESSION['signed_in']=$email;
                }
        
            }

        }
    }

//method for auth
    function auth()
    {
        if (isset($_SESSION['signed_in']) && isset($_SESSION['type']))
        {
            session_regenerate_id(true);
            return true;// IMPORTANT: staff account auth
            
        }
        else if(isset($_SESSION['session_vendor']) || isset($_SESSION['pass_on']))
        {
            // session_regenerate_id(true);
            return true;
        }
        else
        {
            return false;
        }
    }

//if user already login
    function auto_redirect($conn)
    {
        if(isset($_SESSION['signed_in']))
        {
            $email=$_SESSION['signed_in'];
            $sql="select * from users where email='$email'";
            $res=$conn->query($sql);
            if($res->num_rows > 0)
            {
                while($row=$res->fetch_assoc())
                {
                    $type=$row['type'];
                }
                switch($type)
                {
                    case 1: header("location: admin/dashboard");
                        break;
                    case 2: header("location: dashboard"); 
                        break;
                    case 3: header("location: dashboard");
                        break;
                    default: header("location: 404?$type");
                }

            }
        }
    }
    
    //user login redirect
    function user_redirect()
    {
        if(isset($_SESSION['signed_in']))
        {
            header("location: home");
        }
    }

    //check token
    function check_token($token)
    {
        if(!isset($token))
        {
            header("location:404");
        }
    }


    //change pass
        function change_pass($current,$new,$confirm,$conn,$email)
        {
            $getdata="select id from users where email='$email' and password='$current'";
            
            $result=$conn->query($getdata);
            if ($result->num_rows > 0) 
            {
                $row=$result->fetch_assoc();
                $id=$row['id'];
                if($new==$confirm)
                {
                    
                    $ss="update users set password='$new' where id=$id";
                    if($conn->query($ss)===true)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

    //user Registration

    function registration($f_name,$l_name,$contact,$email,$pass,$type,$conn)
    {
    
            $sql="insert into users (email,password,type) values('$email','$pass',$type)";
            if($conn->query($sql)===true)
            {
                $u_id = $conn->insert_id;
                $sql="insert into user_profiles(u_id,f_name,l_name,contact,profile_pic) values($u_id,'$f_name','$l_name','$contact','user.png')";
                if($conn->query($sql)===true)
                {
                return true;
                }
                else{
                return false;
                }
            }
            else
            {
                return false;
            }
    }


    function upload_image($files,$website_link)
    {
        $uploadedFile = 'err';
        if(!empty($_FILES['images']["type"]))
        {
            $fileName = time().'_'.$_FILES['images']['name'];
            $valid_extensions = array("jpeg", "jpg", "png","pdf","bmp","JPG");
            $temporary = explode(".", $_FILES['images']["name"]);
            $file_extension = end($temporary);
            
            //path of images
            $cdnPath=$website_link."CDN/".$_SESSION['domain'];
            
            
            //Creating CDN/ddomain directory if does not exist
            createDir($cdnPath);
            
            if((($_FILES['images']["type"] == "image/png") || ($_FILES['images']["type"] == "application/pdf") || ($_FILES['images']["type"] == "image/bmp") || ($_FILES['images']["type"] == "image/jpg") || ($_FILES['images']["type"] == "image/JPG") || ($_FILES['images']["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions))
            {
                $sourcePath = $_FILES['images']['tmp_name'];
    //            $targetPath = "uploads/".$fileName;
                
                //Setting images path to CDN/domain 
                $targetPath = $cdnPath."/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath))
                {
                    $uploadedFile = $fileName;
                    return $uploadedFile;
                }
                else
                {
                    $uploadedFile="err";
                    return $uploadedFile;
                }
            }
            else
            {
                $uploadedFile="err";
                return $uploadedFile;
            }
        
        }
        else
        {
                $uploadedFile="err";
                return $uploadedFile;
        }
    }

    //upload file 
    function upload_file($files,$conn,$r_id,$website_link)
    {
        $uploadedFile = '';
        if(!empty($_FILES["type"]))
        {
            $fileName = time().'_'.str_replace(' ','-',$_FILES['name']);
            $valid_extensions = array("jpeg", "jpg", "png","pdf","bmp","JPG");
            $temporary = explode(".", $_FILES["name"]);
            $file_extension = end($temporary);
            
            
            //path of images
            $cdnPath=$website_link."CDN/".$_SESSION['domain'];
            
            //Creating CDN/ddomain directory if does not exist
            createDir($cdnPath);
            
            if((($_FILES["type"] == "image/png") || ($_FILES["type"] == "application/pdf") || ($_FILES["type"] == "image/bmp") || ($_FILES["type"] == "image/jpg") || ($_FILES["type"] == "image/JPG") || ($_FILES["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions))
            {
                $sourcePath = $_FILES['tmp_name'];
    //            $targetPath = "uploads/".$fileName;
                
                //Setting images path to CDN/domain 
                $targetPath = $cdnPath."/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath))
                {
                    $uploadedFile = $fileName;
                    $sql="insert into documents_upload(p_id,src) values('$r_id','$uploadedFile')";

                    if($conn->query($sql)===true)
                    {
                        return "yes";
                    }
                    else
                    {
                        return $conn->error;
                    }
                }
            }
        }
    }

    function upload_files2($files,$conn,$table,$id_col,$column,$id,$images,$url)
    {
        if(isset($_FILES[$images]))
        {
            $extension=array("jpeg", "jpg", "png","pdf","bmp","JPG","docx");
            foreach($_FILES[$images]["tmp_name"] as $key=>$tmp_name) 
            {
                $file_name=$_FILES[$images]["name"][$key];
                $file_tmp=$_FILES[$images]["tmp_name"][$key];
                $ext=pathinfo($file_name,PATHINFO_EXTENSION);
                if(in_array(strtolower($ext),$extension)) 
                {
                    $filename=basename($file_name,$ext);
                    $newFileName=$filename.time().".".$ext;
                    if(move_uploaded_file($file_tmp=$_FILES[$images]["tmp_name"][$key],"uploads/".$newFileName))
                    {
                        $sql="update $table set $column='$url/$newFileName' where $id_col=$id";
                        if($conn->query($sql)===true)
                        {
                            $status=true;
                        }
                        else
                        {
                            $status=false;
                            break;
                        }
                    }
                    else
                    {
                        $status=false;
                        break;
                    }
                }
                else 
                {
                    array_push($error,"$file_name, ");
                }
            }
            return $status;
        }
    }




    function upload_files_quiz($files,$conn,$table,$id_col,$column,$id,$images,$url)
    {
        if(isset($_FILES[$images]))
        {
            $extension=array("jpeg", "jpg", "png","pdf","bmp","JPG","docx");
            foreach($_FILES[$images]["tmp_name"] as $key=>$tmp_name) 
            {
                $file_name=$_FILES[$images]["name"][$key];
                $file_tmp=$_FILES[$images]["tmp_name"][$key];
                $ext=pathinfo($file_name,PATHINFO_EXTENSION);
                if(in_array(strtolower($ext),$extension)) 
                {
                    $filename=basename($file_name,$ext);
                    $newFileName=$filename.time().".".$ext;
                    if(move_uploaded_file($file_tmp=$_FILES[$images]["tmp_name"][$key],"uploads/".$newFileName))
                    {
                        $sql="update $table set $column='$newFileName' where $id_col=$id";
                        if($conn->query($sql)===true)
                        {
                            $status=true;
                        }
                        else
                        {
                            $status=false;
                            break;
                        }
                    }
                    else
                    {
                        $status=false;
                        break;
                    }
                }
                else 
                {
                    array_push($error,"$file_name, ");
                }
            }
            return $status;
        }
    }

    // function the show cart details
    function cart_view($conn)
    {
        $sum=0;
        $total_items=0;
        if(isset($_SESSION["products"]))
        {
            $total_items = count($_SESSION["products"]);
        
            $ac="";
            if($total_items>0)
            {
                foreach($_SESSION["products"] as $key=>$product)
                {
                    $p_id=$product["product_code"];
                    if(isset($p_id))
                    {
                        $sql="select price from products where id=$p_id";
                        $res=$conn->query($sql);
                        while($row=$res->fetch_assoc())
                        {   
                            $price=$row['price'];
                        }
                        $op="";
                        foreach($product['options'] as $option)
                        {
                            $op.= "( ".$option." )";
                        }
                    $sum=$sum+$price*$product["quantity"];;
                    $name=$product["product_name"];
                    $src=$product['src'];
                    $quantity=$product["quantity"];
                    $code_id=$key;
                    $ac .="<div class='dropdown-product-item'><span class='dropdown-product-remove'><i class='icon-cross' onclick='remove(".$code_id.");'></i></span><a class='dropdown-product-thumb' href='shop-single?token=".str_replace(' ','-',$name)."'><img src=vendor/admin/uploads/".$src." alt='Product' style='max-height:50px'></a>
                    <div class='dropdown-product-info'><a class='dropdown-product-title' href='shop-single?token=".str_replace(' ','-',$name)."' style=font-size:12px>".$name." ".$op."</a> <span class='dropdown-product-details' style=font-size:12px>".$quantity." x ".$price." =  &#x20a8; ".$quantity * $price."</span></div></div>";
                    }
                }
        
                $cart_item['cart']=$ac;
                $_SESSION["products"][$key]["product_price"]=$price;
            }
            else
            {
            $cart_item['cart']="No Item Found";
            }
        }
        else
            {
            $cart_item['cart']="No Item Found";
            }
        $cart_item['items']=$total_items;
        $cart_item['price']=$sum;
        return $cart_item;
    }

    // function for add user cart value in the cart
    function login_cart($conn,$id)
    {
        //get the data from user account
        $sql="select cart.cart_id as cart_id,cart.product_quantity,products.price,cart.p_id,products.name from products,cart where cart.u_id=$id and products.id=cart.p_id";
        $result=$conn->query($sql);
        if($result->num_rows > 0)
        {
            $x=0;
            while($rows = $result->fetch_assoc()) 
            {
                $new_product[$x]['product_name']=$rows['name'];
                $new_product[$x]['product_code']=$rows['p_id'];
                $new_product[$x]['quantity']=$rows['product_quantity'];
                $new_product[$x]['product_price']=$rows['price'];
                $new_product[$x]['cart_id']=$rows['cart_id'];
                $p_id=$rows['p_id'];
                $cart_id=$rows['cart_id'];
        
                $sql="select * from documents_upload where p_id=$p_id limit 1";
                $res=$conn->query($sql);
                if($res->num_rows > 0)
                {
                    while($row1=$res->fetch_assoc())
                        $new_product[$x]['src']=$row1['src'];
                }
                
                $sql="select * from cart_product_options where cart_id=$cart_id";
                $res=$conn->query($sql);
                if($res->num_rows > 0)
                {
                    while($row5=$res->fetch_assoc())
                    $new_product[$x]['options'][$row5['option_name']]=$row5['option_value'];
                }
                $x++;
            }
        }
        
        //check if user acount cart not empty
        if(isset($new_product))
        {
            //check local session is set or not
            if(!isset($_SESSION["products"]))
            {
                foreach($new_product as $cartdata)
                {
                    //push the data in session
                    $_SESSION["products"][]=$cartdata;
                }
            }
            else
            {
                if(isset($_SESSION["products"]))
                {
                    foreach($new_product as $cartdata)
                    {
                        $product_code=$cartdata['cart_id'];
                        if(in_array($product_code, array_column($_SESSION['products'],'cart_id')))
                        {
                            foreach($_SESSION['products'] as $k=>$value)
                            {
                                $cart_id=$cartdata['cart_id'];
                                $quantity=$_SESSION["products"][$k]['quantity'];
                                if($quantity!=$cartdata['quantity'])
                                {
                                    $sql="update cart set product_quantity=$quantity where cart_id=$cart_id";
                                    if($conn->query($sql)===true)
                                    {   
                                        //unset old item
                                    }
                                    else
                                    {
                                        echo $conn->error;
                                    }
                                }
                            }
                        } 
                        else
                        {
                            $_SESSION["products"][]=$cartdata;
                            break;
                        } 
                    }
                    
                    foreach($_SESSION['products'] as $key=>$pp)
                    {
                        $c_id=$pp['cart_id'];
                        if($c_id=="")
                        {
                            $quantity=$pp['quantity'];
                            $p_id=$pp['product_code'];
                            $u_id=$id;
                            $sql="insert into cart (u_id,p_id,product_quantity) values($u_id,$p_id,$quantity)";
                            if($conn->query($sql)===true)
                            {
                                $last_id = $conn->insert_id;	//update products with new item array
                                $_SESSION["products"][$key]['cart_id']=$last_id;
                                foreach($pp['options'] as $x=>$po)
                                {
                                    $sql="insert into cart_product_options(cart_id,option_name,option_value) values($last_id,$x,'$po')";
                                    $conn->query($sql);
                                }
                            }
                        }	
                    }
                }
            }
        }
        else
        {
            if(isset($_SESSION["products"]))
            {
                $result=$_SESSION['products'];
                foreach($result as $key=>$result)
                {
                    $quantity=$result['quantity'];
                    $p_id=$result['product_code'];
                    $u_id=$id;
                    $sql="insert into cart (u_id,p_id,product_quantity) values($u_id,$p_id,$quantity)";
                    if($conn->query($sql)===true)
                    {
                        $last_id = $conn->insert_id;	//update products with new item array
                        $_SESSION["products"][$key]['cart_id']=$last_id;
                        foreach($result['options'] as $x=>$po)
                        {
                            $sql="insert into cart_product_options(cart_id,option_name,option_value) values($last_id,$x,'$po')";
                            $conn->query($sql);
                        }
                    }
                    
                } 
            }
        }

        if(isset($new_product))
        {
            return $new_product;
        }
    }


    //function for forget password.

    function forget_pass($conn,$contact)
    {
        $sql="select email from users where id=(select u_id from user_profiles where contact='$contact')";
        $res=$conn->query($sql);
        if($res->num_rows > 0)
        {
            $row=$res->fetch_assoc();
            $email=$row['email'];
            return $email;
        }
        else
        {
            return false;
        }
    }

    //function for change the password
    function update_pass($conn,$contact,$pass)
    {
        $sql="update users set users.password='$pass' where id=(select u_id from user_profiles where contact='$contact')";
        if($conn->query($sql)===true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function createDir($path)
    {		
        if (!file_exists($path)) 
        {
            $old_mask = umask(0);
            mkdir($path, 0777, TRUE);
            umask($old_mask);
        }
    }


    //update info for place orders
    function update_place_order($conn,$order_id)
    {
        $sql="update orders set order_status='placed' where order_id='$order_id'";
        if($conn->query($sql)===true)
        {
            $sql="update payment_log set status='Sucess' where o_id=(select id from orders where order_id='$order_id')";
            if($conn->query($sql)===true)
            {
                $sql="delete from cart where u_id=(select u_id from orders where order_id='$order_id')";
                if($conn->query($sql)===true)
                {
                    unset($_SESSION["products"]);
                    return true;
                }
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }


    function createThumb($path1, $path2, $file_type, $new_w, $new_h, $squareSize = '')
    {
        /* read the source image */
        $source_image = FALSE;
        
        if (preg_match("/jpg|JPG|jpeg|JPEG/", $file_type)) {
            $source_image = imagecreatefromjpeg($path1);
        }
        elseif (preg_match("/png|PNG/", $file_type)) {
            
            if (!$source_image = @imagecreatefrompng($path1)) {
                $source_image = imagecreatefromjpeg($path1);
            }
        }
        elseif (preg_match("/gif|GIF/", $file_type)) {
            $source_image = imagecreatefromgif($path1);
        }		
        if ($source_image == FALSE) {
            $source_image = imagecreatefromjpeg($path1);
        }

        $orig_w = imageSX($source_image);
        $orig_h = imageSY($source_image);
        
        if ($orig_w < $new_w && $orig_h < $new_h) {
            $desired_width = $orig_w;
            $desired_height = $orig_h;
        } else {
            $scale = min($new_w / $orig_w, $new_h / $orig_h);
            $desired_width = ceil($scale * $orig_w);
            $desired_height = ceil($scale * $orig_h);
        }
                
        if ($squareSize != '') {
            $desired_width = $desired_height = $squareSize;
        }

        /* create a new, "virtual" image */
        $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
        // for PNG background white----------->
        $kek = imagecolorallocate($virtual_image, 255, 255, 255);
        imagefill($virtual_image, 0, 0, $kek);
        
        if ($squareSize == '') {
            /* copy source image at a resized size */
            imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $orig_w, $orig_h);
        } else {
            $wm = $orig_w / $squareSize;
            $hm = $orig_h / $squareSize;
            $h_height = $squareSize / 2;
            $w_height = $squareSize / 2;
            
            if ($orig_w > $orig_h) {
                $adjusted_width = $orig_w / $hm;
                $half_width = $adjusted_width / 2;
                $int_width = $half_width - $w_height;
                imagecopyresampled($virtual_image, $source_image, -$int_width, 0, 0, 0, $adjusted_width, $squareSize, $orig_w, $orig_h);
            }

            elseif (($orig_w <= $orig_h)) {
                $adjusted_height = $orig_h / $wm;
                $half_height = $adjusted_height / 2;
                imagecopyresampled($virtual_image, $source_image, 0,0, 0, 0, $squareSize, $adjusted_height, $orig_w, $orig_h);
            } else {
                imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $squareSize, $squareSize, $orig_w, $orig_h);
            }
        }
        
        
        $img_size=filesize($virtual_image);
        $quality=90;
        if($img_size>= 2097152)
        {
            $quality= 50;
        }
        else if($img_size<= 2097152 && $img_size>= 1048576)
        {
            $quality= 70;
        }

        if (@imagejpeg($virtual_image, $path2, $quality)) {
            imagedestroy($virtual_image);
            imagedestroy($source_image);
            return TRUE;
        } else {
            return FALSE;
        }
    }	
    function number_to_words($num)
    { 
        $ones = array( 
        1 => "one", 
        2 => "two", 
        3 => "three", 
        4 => "four", 
        5 => "five", 
        6 => "six", 
        7 => "seven", 
        8 => "eight", 
        9 => "nine", 
        10 => "ten", 
        11 => "eleven", 
        12 => "twelve", 
        13 => "thirteen", 
        14 => "fourteen", 
        15 => "fifteen", 
        16 => "sixteen", 
        17 => "seventeen", 
        18 => "eighteen", 
        19 => "nineteen" 
        ); 
        $tens = array( 
        1 => "ten",
        2 => "twenty", 
        3 => "thirty", 
        4 => "forty", 
        5 => "fifty", 
        6 => "sixty", 
        7 => "seventy", 
        8 => "eighty", 
        9 => "ninety" 
        ); 
        $hundreds = array( 
        "hundred", 
        "thousand", 
        "million", 
        "billion", 
        "trillion", 
        "quadrillion" 
        ); //limit t quadrillion 
        $num = number_format($num,2,".",","); 
        $num_arr = explode(".",$num); 
        $wholenum = $num_arr[0]; 
        $decnum = $num_arr[1]; 
        $whole_arr = array_reverse(explode(",",$wholenum)); 
        krsort($whole_arr); 
        $rettxt = ""; 
        foreach($whole_arr as $key => $i)
        { 
            if($i < 20)
            { 
                $rettxt .= $ones[$i]; 
            }
            elseif($i < 100)
            { 
                $rettxt .= $tens[substr($i,0,1)]; 
                $rettxt .= " ".$ones[substr($i,1,1)]; 
            }
            else
            { 
                $rettxt .= $ones[substr($i,0,1)]." ".$hundreds[0]; 
                $rettxt .= " ".$tens[substr($i,1,1)]; 
                $rettxt .= " ".$ones[substr($i,2,1)]; 
            } 
            if($key > 0)
            { 
                $rettxt .= " ".$hundreds[$key]." "; 
            } 
        } 
        if($decnum > 0)
        { 
            $rettxt .= " and "; 
            if($decnum < 20)
            { 
                $rettxt .= $ones[$decnum]; 
            }
            elseif($decnum < 100)
            { 
                $rettxt .= $tens[substr($decnum,0,1)]; 
                $rettxt .= " ".$ones[substr($decnum,1,1)]; 
            } 
        } 
    return ucwords($rettxt); 
    }


    // find the vendor commision
    function get_commission($conn,$p_id)
    {
        $sql="select price,branch_commision,com_type from products where id=$p_id";
        $res=$conn->query($sql);
        $row = $res->fetch_assoc();
        if($row['com_type']=='Percentage')
        {
            $commision=$row['price']*$row['branch_commision']/100;
        }
        else
        {
            $commision=$row['branch_commision'];
        }
        return $commision;
    }

    //function for get discount from coupon code

    function coupon_code($coupon_code,$conn)
    {
        unset($_SESSION['coupon_code']);
        $sql="select * from coupons where code = '$coupon_code'"; // check coupon code valid
            $res=$conn->query($sql);
            if ($res->num_rows > 0) 
            {
            
                $current_date=date('Y/m/d'); //take date from system
                $row=$res->fetch_assoc();
                
                
                //condition for check coupon dates are valid
                if(strtotime($row['start'])<=strtotime($current_date) && strtotime($row['end'])>=strtotime($current_date) )
                {   
                    
                    $sql="select count(*) as per_coupon from coupon_uses where coupon_id = (select id from coupons where code = '$coupon_code') and coupon_status=1";
                    $res=$conn->query($sql);
                    if($res->num_rows <= $row['percoupon'])  //condition for check coupon per validation
                    {
                        $discount_product=array(); //create discount product array
                        $x=0;
                        
                            //take product value from product session
                            if(isset($_SESSION['products']) && !empty($_SESSION['products']))
                            {
                                
                                foreach($_SESSION['products'] as $product)
                                {
                                    $p_id=$product['product_code'];
                                    
                                    // check coupon apply category
                                    $sql="select coupon_id from coupon_categories where coupon_id=(select id from coupons where code = '$coupon_code') and m_id =(select m_id from products where id=$p_id)";
                                    $res=$conn->query($sql);
                                    if ($res->num_rows > 0) 
                                    {
                                        if(!in_array($p_id,$discount_product))
                                        {
                                            $discount_product[$x]=$p_id;
                                                $x++;
                                        }
                                    }
                                    else
                                    {
                                    //check coupon apply products
                                    $sql="select coupon_id from coupon_products where coupon_id=(select id from coupons where code = '$coupon_code') and p_id = $p_id";
                                    $res=$conn->query($sql);
                                    if ($res->num_rows > 0) 
                                    {
                                        if(!in_array($p_id,$discount_product))
                                        {
                                            $discount_product[$x]=$p_id;
                                                $x++;
                                        }
                                    }
                                    else
                                    {
                                        $response['msg']="5";   
                                    }
                                    }
                                }
                            }
                        else
                        {
                            $response['msg']="4";   
                        }
                            
                    }
                    else
                    {
                        $response['msg']="3";
                    }
                }
                else
                {
                    $response['msg']="2";
                }
            }
            else
            {
                
                $response['msg']="Invalid Coupon Code.";
            
            }
            
            
            if(isset($discount_product))
            {
                $coupan_discount=$row['coupon_discount'];
                $coupon_type=$row['coupon_type'];
        
                $discount=0;
                foreach($discount_product as $ds_product)
                {
                    //take product price from product session
                    $product_price=$_SESSION['products'][$ds_product]['product_price']*$_SESSION['products'][$ds_product]['quantity'];
                    $discount=$discount+$product_price;
                }
        
                    //apply coupon _type
                if($coupon_type=='Percentage')
                {
                    $total_discount=$discount*$coupan_discount/100;
                }
                else
                {
                    $total_discount=$coupan_discount;
                }
                
                //check price is grator then extra
                
                if($total_discount>$row['max_discount'])
                {
                    $response['discount']=$row['max_discount'];
                }
                else
                {
                    $response['discount']=floor($total_discount);
                }
                if($response['discount']==0)
                {
                    $response['msg']="This Coupon Code is not for this item";
                }
                else
                {
                    //create coupon code session
                    $_SESSION['coupon_code']=$coupon_code;
                    $response['msg']='ok';
                }
            }
            else
            {
                $response['msg']="Invalid Coupon Code.";
            }
        
        return $response;
    }

    //function for get discount


    function discount_percent($sell_price,$price)
    {
        $rs_off=$price-$sell_price;
        $percentage=floor($rs_off*100/$price);
        return $percentage;
    }

    // function for calculate branch commitions

    function calculate_commitions($p_id,$conn)
    {
        $sql="select price,branch_commision,com_type from products where id=$p_id";
        $res=$conn->query($sql);
        $row=$res->fetch_assoc();
    
        if($row['com_type']=='Percentage')
        {
            $cc=$row['price']*$row['branch_commision']/100;
        }
        else
        {
            $cc=$row['branch_commision'];
        }
        return $cc;
    }

    //COMPRESS IMAGE FUNCTION
    function compress($source, $destination, $quality) {

		$info = getimagesize($source);

		if ($info['mime'] == 'image/jpeg') 
			$image = imagecreatefromjpeg($source);

		elseif ($info['mime'] == 'image/gif') 
			$image = imagecreatefromgif($source);

		elseif ($info['mime'] == 'image/png') 
			$image = imagecreatefrompng($source);

		imagejpeg($image, $destination, $quality);

		return $destination;
	}

    function slugify($text)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~-+~', '-', $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return 'n-a';
        }
    
        return $text;
    }
?>