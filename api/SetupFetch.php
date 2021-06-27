<?php
    require_once 'lib/core.php';

    //FETCH ALL DATA FOR PROFILE
    if(isset($_POST['profile']))
    {
        $data=[];
        $sql="select * from shop_details";
        if($res=$conn->query($sql))
        {
            if($res->num_rows)
            {
                while($row=$res->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }

    //FETCH ALL DATA FOR RETURN POLICY
    if(isset($_POST['return_policy']))
    {
        $data=[];
        $sql="select * from return_policy";
        $res=$conn->query($sql);
        if($res->num_rows){
        while($row=$res->fetch_assoc())
        {
            $row['policy_content']=html_entity_decode($row['policy_content']);
            $data[]=$row;
        }}
        
        echo json_encode($data);
    }

    //FETCH ALL DATA FOR SHIPPING CHARGES
    if(isset($_POST['shipping_charges']))
    {
        $data['shipping']=[];
        $data['local_delivery']=[];
        $sql="select shipping_min_amount,shipping_charge,shipping_scope,max_local_distance from shop_details";
        $res=$conn->query($sql);
        if($res->num_rows > 0)
        {while($row=$res->fetch_assoc())
        {
            $data['shipping'][]=$row;
        }}

        $sql="select * from local_delivery";
        $res=$conn->query($sql);
        if($res->num_rows > 0)
        {
            while($row=$res->fetch_assoc())
            {
                $data['local_delivery'][]=$row;
            }
        }
        
        echo json_encode($data);
    }

    //FETCH STAFF ACCOUNTS
    if(isset($_POST['staff_accounts']))
    {
        $data=[];
        $sql="select u.id,u.email,u.time_stampt,up.f_name,up.l_name,up.contact,up.gender from users u,user_profiles up where u.id=up.u_id and u.type=4";
        $res=$conn->query($sql);
        if($res->num_rows > 0){while($row=$res->fetch_assoc())
        {
            $data[]=$row;
        }}
        
        echo json_encode($data);
    }

    //FETCH ACTIVATED NAVBAR FOR STAFF ACCOUNT
    if(isset($_POST['staff_account_id']))
    {
        $s_id=$_POST['staff_account_id'];
        $sql="select u.id,u.email,u.time_stampt,up.f_name,up.l_name,up.contact from users u,user_profiles up where u.id=up.u_id and u.type=4 and u.id=$s_id";
        $result=$conn->query($sql);
        if($result->num_rows)
        {
            if($row=$result->fetch_assoc())
            {
                $name=$row['f_name']." ".$row['l_name'];
            }
        }
        $access[]="";
        $sql="select navbar_id from navbar_access where staff_id=$s_id and access=1";
        $result=$conn->query($sql);
        if($result->num_rows>0)
        {
            while($row=$result->fetch_assoc())
            {
                $access[]=$row['navbar_id'];
            }
        }

        $sql="select * from customer_navbar";
        $result=$conn_admin->query($sql);
        if($result->num_rows)
        {
            while($row=$result->fetch_assoc())
            {
                $navbar_data[]=$row;
            }
        }

        $sql="select id,head from customer_navbar where id in(select parent from customer_navbar)";
        $result=$conn_admin->query($sql);
        $parents[]="";
        if($result->num_rows>0)
        {
            while($row=$result->fetch_assoc())
            {
                $parents[$row['id']]=$row;
                $ids[]=$row['id'];
            }
        }
        
        //RESPOND BACK THE TBODY DATA
        $i=1;
        if(isset($navbar_data))
        {
            $checked="";
            foreach($navbar_data as $nd)
            {
                if(in_array($nd['id'],$ids))
                {
                    continue;
                }
                else if(isset($nd['parent']))
                {
                    $head=$parents[$nd['parent']]['head']. " -> " . $nd['head'];
                }
                else
                {
                    $head=$nd['head'];
                }
                if(in_array($nd['id'],$access))
                {
                    $checked="checked";
                }
?>
                    <tr>
                        <td><?=$i;?>.</td>
                        <td style="font-weight:500;"><?=$head;?></td>
                        <td>
                            <label class="switch">
                              <input id="<?=$nd['id']?>" value="<?=$s_id?>" onclick='check(this.id,this.value)' <?=$checked?> type="checkbox">
                              <span class="slider"></span>
                            </label>
                        </td>
                    </tr>
<?php
                $i++;
                $checked="";
            }
        }
        else
        {
            echo '';
        }
    }

    //FETCH TAXES
    if(isset($_POST['taxes']))
    {
        $data=[];
        $sql="SELECT * from taxes";
        $result=$conn->query($sql);

        if ($result->num_rows > 0)
        {
            while($row = $result->fetch_assoc()) 
            {
                $data[]=$row;
            }
        }
        
        echo json_encode($data);
    }

    //FETCH CLEANING AND CUTTNG CHARGES
    if(isset($_POST['cleaning_and_cutting']))
    {
        $data=[];
        $data['cleaning_charge']=0;
        $data['cutting_charges']=[];
            
        $sql="select cleaning_charges from shop_details";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                $row=$result->fetch_assoc();
                $data['cleaning_charge']=$row['cleaning_charges'];
            }
        }
        
        $sql="select * from cutting_charges";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['cutting_charges'][]=$row;
                }
            }
        }
        
        echo json_encode($data);
    }

    //FETCH CLEANING AND CUTTNG CHARGES
    if(isset($_POST['only_cutting']))
    {
        $data=[];
               
        $sql="select * from cutting_charges";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
        }
        
        $sql="select cleaning_charges from shop_details";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                $row=$result->fetch_assoc();
                $data[0]['cleaning']=$row['cleaning_charges'];
            }
        }
        
        echo json_encode($data);
    }

    //Fetch Banners for particular category
    if(isset($_POST['fetch_banners']) && isset($_POST['fetch_type']))
    {
        $id=test_input($_POST['fetch_banners']);
        $type=test_input($_POST['fetch_type']);
        
        $data=[];
        $sql="select id,banner from category_banners where category_id=$id and type='$type'";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row = $result->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
        }
        
        echo json_encode($data);
    }

    //CHECK IF CUTTING IS APPLICABLE ON THE CATEGORY OR NOT
    if(isset($_POST['if_cutting']))
    {
        $cut_id=test_input($_POST['if_cutting']);
        
        $cutting=0;
        
        $sql="select cleaning_and_cutting from menus where id=$cut_id";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                $row=$result->fetch_assoc();
                $cutting=$row['cleaning_and_cutting'];
            }
        }
        
        echo $cutting;
    }
	
	//CHECK IF CUTTING IS APPLICABLE ON THE PRODUCT OR NOT
    if(isset($_POST['if_cutting_for_product']))
    {
        $cut_id=test_input($_POST['if_cutting_for_product']);
        
        $cutting=0;
        
        $sql="select cleaning_and_cutting from menus where id=(select id from menus where id=(select m_id from products where id=$cut_id) or ";
		$sql.="lower(name)=(select lower(parent) from menus where id=(select m_id from products where id=$cut_id)))";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                $row=$result->fetch_assoc();
                $cutting=$row['cleaning_and_cutting'];
            }
        }
        
        echo $cutting;
    }

    //GET ALL FAQS
    if(isset($_POST['fetch_faq']))
    {
        $data=[];
        $sql="SELECT * from faq ";  
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {

                while($row=$result->fetch_assoc())
                {
                   $data[]=$row;
                }
            }
        }
        
        echo json_encode($data);
    }

    //FETCH ALL FEATURED COURSES
    if(isset($_POST['featuredCourses']))
    {
        $data=[];
        
        $sql="select * from programs_and_courses where status in('active') and fees = 0  order by id desc limit 6  ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
        }
        echo json_encode($data);
    }
    //FETCH ALL F COURSES
    if(isset($_POST['allCourses']))
    {
        $data=[];
        
        $sql="select * from programs_and_courses where status in('active')   and type='course'  order by id desc";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
        }
        echo json_encode($data);
    }
    //FETCH ALL  Programmes
    if(isset($_POST['allPrograms']))
    {
        $data=[];
        
        $sql="select * from programs_and_courses where status in('active') and type='program' order by id desc";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
        }
        echo json_encode($data);
    }

    //FETCH ALL REVIEWS
    if(isset($_POST['reviews']))
    {
        $data=[];
        
        $sql="select * from reviews order by id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
        }
        echo json_encode($data);
    }

    //GET DYNAMIC PAGE DATA FOR footer USEFUL Links
    if(isset($_POST['footer_links']))
    {
        $data=[];
        
       $sql="select * from dynamic_pages where status='active' and id in(select page_id from useful_links)";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            
        }
        echo json_encode($data);
    }

    //GET DETAILS FOR WHY US
    if(isset($_POST['why_us']))
    {
        $data=[];
        
        $sql="select * from why_us order by id";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
           
        }
        echo json_encode($data);
    }
?>