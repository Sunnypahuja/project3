<?php
    
    include_once 'lib/core.php'; 

    if(isset($_POST['fetch_all']))
    {
        
        $data=[];
        
        $sql="select u.* , up.* from users u ,user_profiles up  where u.id = up.u_id and u.type=2";
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
        }else{
            $data="err";
        }
        echo json_encode($data);
    }


    if(isset($_POST['fetch_course']))
    {
        
        $data=[];
        
        $sql="select upl.purchase_type,upl.item_id,upl.u_id ,u.email,  up.u_id,up.f_name,up.l_name,pac.id ,pac.name from user_purchase_lib upl, users u, user_profiles up,programs_and_courses pac  where (u.id=upl.u_id and u.type=2 and upl.u_id= up.u_id and upl.purchase_type = 'course' and upl.item_id = pac.id)";
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

    if(isset($_POST['fetch_program']))
    {
        
        $data=[];
        
       $sql="select upl.purchase_type,upl.item_id,upl.u_id ,u.email,  up.u_id,up.f_name,up.l_name,pac.id ,pac.name from user_purchase_lib upl, users u, user_profiles up,programs_and_courses pac  where u.id=upl.u_id and u.type=2 and upl.u_id= up.u_id and upl.purchase_type = 'program' and upl.item_id = pac.id";
        
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


    if(isset($_POST['delete_student']))
    {
        $eid=$_POST['delete_student'];
        
        $sql="delete from users where id='$eid'";
        if($conn->query($sql))
        {
            $data['msg']="ok";
        }
        else
        {
            $data['msg']="Something Went Wrong";
        }

        echo json_encode($data);
    }