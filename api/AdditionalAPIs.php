<?php
    require_once 'lib/core.php';

    //DELETE FROM DOCUMENTS UPLOAD
    if(isset($_POST['image_id']))
    {
        $i_id=test_input($_POST['image_id']);
        $image_name=$_POST['nameimage'];
        $path = 'uploads/'.$image_name;
        unlink($path);
        $sql="Delete from documents_upload where id=$i_id";
        if($conn->query($sql)){
            echo "success";
        }
        else{
            echo $conn->error;
        }
    }

    //CHNAGE PRODUCT STATUS
    if(isset($_POST['product_id']))
    {
        $id=$_POST['product_id'];
        $sql="Select p_status from products where id =$id";
        if($res=$conn->query($sql)){
            if($res->num_rows>0){
                while($row=$res->fetch_assoc()){
                    $ui=$row;
                }
            }
        }
        $status=strtolower($ui['p_status']);
        if($status==='active'){
            $sql="UPDATE products set p_status='inactive' where id=$id ";
            if($conn->query($sql)){
                echo "inactivate";
            }
        }
        else if($status==='inactive'){
            $sql="UPDATE products set p_status='active' where id=$id ";
            if($conn->query($sql)){
                echo "activate";
            }
        }
    }

    //DELETE FROM PRODUCT TAXES
    if(isset($_POST['product_tax_id'])){
        $id=$_POST['product_tax_id'];
        $sql="DELETE from product_taxes where id=$id";
        if($conn->query($sql)){
            echo "success";
        }
        else{
            echo $conn->error;
        }
    }

    //Giving Back Products List To Coupons
	if(isset($_POST['product_ids']))
	{
        $id=$_POST['product_ids'];
        $sql="SELECT p.id,p.name from products as p,coupon_products as cp where p.id=cp.p_id and cp.coupon_id=$id and cp.p_id is not null";
        if($result=$conn->query($sql))
		{
			if($result->num_rows>0)
			{
				while($row=$result->fetch_assoc())
				{
					$arr[]=$row;
				}
				echo json_encode($arr);
			}
			else
			{
				echo 'norecord';
			}
        }
        else{
            echo $conn->error;
        }
    }

    //Giving Back Products List To Coupons for bxgy offer
	if(isset($_POST['gproduct_ids']))
	{
        $id=$_POST['gproduct_ids'];
        $sql="SELECT p.id,p.name from products as p,coupon_products as cp where p.id=cp.g_id and cp.coupon_id=$id and cp.g_id is not null";
        if($result=$conn->query($sql))
		{
			if($result->num_rows>0)
			{
				while($row=$result->fetch_assoc())
				{
					$arr[]=$row;
				}
				echo json_encode($arr);
			}
			else
			{
				echo 'norecord';
			}
        }
        else{
            echo $conn->error;
        }
    }

    //Giving Back Categories List To Coupons
	if(isset($_POST['categories_ids'])){
		
        $id=$_POST['categories_ids'];
        $sql="SELECT m.id,m.name from menus as m,coupon_categories as cp where m.id=cp.m_id and cp.coupon_id=$id and cp.m_id is not null";
        if($result=$conn->query($sql))
		{	
            if($result->num_rows>0)
			{
				while($row=$result->fetch_assoc())
				{
					$arr[]=$row;
				}
				echo json_encode($arr);
			}
			else
			{
				echo 'norecord';
			}
        }
        else{
            echo $conn->error;
        }
    }

    //Giving Back Categories List To Coupons for bxgy offer
	if(isset($_POST['gcategories_ids'])){
		
        $id=$_POST['gcategories_ids'];
        $sql="SELECT m.id,m.name from menus as m,coupon_categories as cp where m.id=cp.g_id and cp.coupon_id=$id and cp.g_id is not null";
        if($result=$conn->query($sql))
		{	
            if($result->num_rows>0)
			{
				while($row=$result->fetch_assoc())
				{
					$arr[]=$row;
				}
				echo json_encode($arr);
			}
			else
			{
				echo 'norecord';
			}
        }
        else{
            echo $conn->error;
        }
    }

    //Giving Back Customer Details In Manual Order
	if(isset($_POST['contact']))
	{
        $contact=$_POST['contact'];
        $sql="select users.email,user_profiles.* from user_profiles,users where user_profiles.u_id=users.id and user_profiles.contact='$contact'";
        if($result=$conn->query($sql))
		{	
			if($result->num_rows>0)
			{
				$row=$result->fetch_assoc();
				echo json_encode($row);
			}
		}
        else{
            echo 'err';
        }
    }

    //Grabbing addresses of praticular customer and 
    if(isset($_POST['customer_address']))
    {
        $address=str_replace("'","&#039;",$_POST['customer_address']);
        $address=str_replace("<","&lt;",$address);
        $address=str_replace(">","&gt;",$address);
        $address=str_replace('"',"&quot;",$address);
        $sql="select * from address where u_id=".$address;
        $result=$conn->query($sql);
        if($result->num_rows>0){
            while($row=$result->fetch_assoc()){
                $addresses[]=$row;
            }
            echo json_encode($addresses);
        }
        else
        {
            echo "err";
        }
    }

    //Dynamic Page Data Load for SEO
	if(isset($_POST['meta_page_id']))
	{
		$dynamic_page_id=$_POST['meta_page_id'];
		$sql="select meta_title,meta_keyword,meta_description from dynamic_pages where id=$dynamic_page_id";
		if($result=$conn->query($sql))
		{
		    if($result->num_rows>0)
		    {
			    $row=$result->fetch_assoc();
			    echo json_encode($row);
		    }
		    else
		    {
		        echo "nothing";
		    }
			
		}
		else
		{
			echo 'error';
		}
	}

    //Return Cities Data On State Change Demand
	if(isset($_POST['state']))
	{
		$sql="select city from statesandcity where state='".$_POST['state']."' order by city";
		//echo "working";/*
		if($result=$conn->query($sql))
		{
			if($result->num_rows>0)
			{
				while($row=$result->fetch_assoc())
				{
					$cities[]=$row;
				}
				echo json_encode($cities);
			}
			else
			{
				echo "error";
			}
		}
		else
		{
			echo 'error';
		}
	}

    //DELETE PRODUCT UPLOADED IMAGES ON EDIT
    if(isset($_POST['id_image']) && isset($_POST['image_name']))
    {
        $d_id=test_input($_POST['id_image']);
        $image_name=$_POST['image_name'];
        unlink($image_name);
        $sql="delete from documents_upload where id=$d_id";
        if($conn->query($sql)){
            echo "success";
        }
        else{
            echo $conn->error;
        }
    }

	
?>