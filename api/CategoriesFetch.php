<?php
    require_once 'lib/core.php';

    //FETCH MENUS FOR HOME
    if(isset($_POST['get_categories_for_home']))
    {
        $sql="select  m1.* from menus m1,menus m2 where m2.id in(select m_id from products where m_id IS NOT NULL AND(quantity > 0 or stock_availability = 1)) and lower(m1.parent) = 'none' and lower(m1.status) = 'active' and (m1.id=m2.id or m1.name=m2.parent) ";
        
        if(isset($_COOKIE['default_pincode']) && !empty($_COOKIE['default_pincode']) && strlen($_COOKIE['default_pincode']) == 6)
        {
            $sql.=" and ((select find_in_set(m1.id, categories) from delivery_charges where pincode='".$_COOKIE['default_pincode']."') > 0 ";
            $sql.="or (select find_in_set(m2.id, categories) from delivery_charges where pincode='".$_COOKIE['default_pincode']."') > 0) ";
        }
        
        $sql.=" group by m1.id order by id desc";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {   
                    $row['is_parent']="no";
                    $sql="select id from menus where parent='".$row['name']."' and lower(status)='active'";
                    if($rs = $conn->query($sql))
                    {
                        if($rs->num_rows)
                        {
                            $row['is_parent']="yes";
                        }
                        else
                        {
                            $row['is_parent']="no";
                        }
                    }
                    else
                    {
                        $row['is_parent']="no";
                    }
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //FETCH SUB MENUS FOR A PARTICULAR CATEGORY
    else if(isset($_POST['get_subcategories']))
    {
        $data=[];
        
        $name=strtolower(test_input($_POST['get_subcategories']));
        
        $sql="select * from menus mm where id in(select m_id from products where m_id is not null) and lower(parent)='$name' and lower(status)='active' ";
        
        if(isset($_COOKIE['default_pincode']) && !empty($_COOKIE['default_pincode']) && strlen($_COOKIE['default_pincode']) == 6)
        {
            $sql.=" and ((select find_in_set(mm.id, categories) from delivery_charges where pincode='".$_COOKIE['default_pincode']."') > 0 ";
            $sql.="or (select find_in_set(m.id,categories) from menus m, delivery_charges dc where ";
            $sql.=" lower(m.name)='$name' and dc.pincode='".$_COOKIE['default_pincode']."') > 0) ";
        }
        
        $sql.="order by id desc";
        
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data[]=$row;
                }
                
                $data[0]['banners']=[];
                
                $sql="select * from category_banners where category_id=(select id from menus where lower(name)='".strtolower($name)."' and lower(status)='active') ";
                $sql.="and type='category' order by id";
                if($result=$conn->query($sql))
                {

                    if($result->num_rows)
                    {
                        while($row=$result->fetch_assoc())
                        {
                            $data[0]['banners'][]=$row;
                        }
                    }

                }
            }    
        }
        
        echo json_encode($data);
    }

    //FETCH STUDY MATERIAL
    else if(isset($_POST['study_material']))
    {
        $data=[];
        
        $sql="select * from study_material  order by id desc";
        
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
    else if(isset($_POST['study_material_student_program']))
    {
        $data=[];
        $uid=$_POST['user_id'];
        $sql="select id, fees from programs_and_courses where type='program'";
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $checkFees=$row['fees'];
                    $id=$row['id'];
                    if($checkFees==0)
                    {
                        $sql="SELECT * from study_material where pc_id=$id";
                        $res=$conn->query($sql);
                        if($res->num_rows)
                        {
                            while($row1=$res->fetch_assoc())
                            {
                                $data['data'][]=$row1;
                            }
                            $data['msg']="ok";
                        }
                        else
                        {
                            
                            $data['msg']=$conn->error;
                        }
                    }
                    else
                    {
                        $sql="SELECT * from user_purchase_lib where item_id='$id' and u_id=$uid";
                        if($res=$conn->query($sql))
                        {
                            if($res->num_rows)
                            {
                                $sql="SELECT * from study_material where pc_id=$id";
                                $r=$conn->query($sql);
                                if($r->num_rows)
                                {
                                    while($row2=$r->fetch_assoc())
                                    {
                                        $data['data'][]=$row2;
                                    }
                                }

                            }
                        }
                        else
                        {
                            
                            $data['msg']=$conn->error;
                        }
                    }

                }
                $data['msg']="ok";
            }    
        }
        else
        {
            $data['msg']=$conn->error;
        }    
        
        echo json_encode($data);
    }
    else if(isset($_POST['study_material_student_course']))
    {
        $data=[];
        $uid=$_POST['user_id'];
        $sql="select id, fees from programs_and_courses where type='course'";
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $checkFees=$row['fees'];
                    $id=$row['id'];
                    if($checkFees==0)
                    {
                        $sql="SELECT * from study_material where pc_id=$id";
                        $res=$conn->query($sql);
                        if($res->num_rows)
                        {
                            while($row1=$res->fetch_assoc())
                            {
                                $data['data'][]=$row1;
                            }
                            $data['msg']="ok";
                        }
                        else
                        {
                            
                            $data['msg']=$conn->error;
                        }
                    }
                    else
                    {
                        $sql="SELECT * from user_purchase_lib where item_id='$id' and u_id=$uid";
                        if($res=$conn->query($sql))
                        {
                            if($res->num_rows)
                            {
                                $sql="SELECT * from study_material where pc_id=$id";
                                $r=$conn->query($sql);
                                if($r->num_rows)
                                {
                                    while($row2=$r->fetch_assoc())
                                    {
                                        $data['data'][]=$row2;
                                    }
                                }

                            }
                        }
                        else
                        {
                            
                            $data['msg']=$conn->error;
                        }
                    }

                }
                $data['msg']="ok";
            }    
        }
        else
        {
            $data['msg']=$conn->error;
        }    
        
        echo json_encode($data);
    }
    else if(isset($_POST['study_material_student_coursefree']))
    {
        $data=[];
        
        $sql="select * from programs_and_courses pac , study_material s where ((s.type='free')||(pac.fees = 0 and pac.id= s.pc_id)) group by s.id";
        
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

    //FETCH MENUS
    else
    {
        $sql="select * from menus order by id desc";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    if(isset($_GET['multi']) && !empty($_GET['multi']))
                    {
                        $arr=[];
                        $arr['value']=$row['id'];
                        $arr['label']=$row['name'];
                        $data[]=$arr;
                        unset($arr);
                    }
                    else
                    {
                        $data[]=$row;
                    }
                }
            }
            echo json_encode($data);
        }
    }
?>