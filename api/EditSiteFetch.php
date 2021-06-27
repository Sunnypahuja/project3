<?php
    require_once 'lib/core.php';
    
    //GET DYNAMIC PAGE DATA
    if(isset($_POST['dynamic_pages']))
    {
        $data=[];
        
        $sql="select * from dynamic_pages";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }
    //GET DYNAMIC PAGE DATA Blogs
    if(isset($_POST['fetch_recent_blogs']))
    {
        $data=[];
        
        $sql="select * from dynamic_pages where parent_id = 25 order by id desc limit 10";
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
            else
            {
                $data['msg']="No Data Available";
            }
            echo json_encode($data);
        }
    }

    //GET DYNAMIC PAGE DATA FOR HOME
    if(isset($_POST['dynamic_pages_home']))
    {
        $data=[];
        
        $sql="select id,page_name,title from dynamic_pages";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //GET A PARTICULAR PAGE DATA
    if(isset($_POST['get_page_data']))
    {
        $data=[];
         
        $sql="select * from dynamic_pages where id=".$_POST['get_page_data'];
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                $data=$result->fetch_assoc();
                $data['page_data']=html_entity_decode($data['page_data']);
            }
            echo json_encode($data);
        }
    }

    //GET A PARTICULAR PAGE DATA FROM LINK
    if(isset($_POST['get_page_data_link']))
    {
        $data=[];
        
        $sql="select * from dynamic_pages where page_name='".$_POST['get_page_data_link']."'";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                $data=$result->fetch_assoc();
                $data['page_data']=html_entity_decode($data['page_data']);
            }
            echo json_encode($data);
        }
    }

    //FETCH ALL SLIDER DATA
    if(isset($_POST['sliders']))
    {
        $data=[];
        
        $sql="select * from slider order by sort_order";
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

    //FETCH ALL SLIDER DATA FOR HOME
    if(isset($_POST['sliders_for_home']))
    {
        $data=[];
        
        $sql="select * from slider where status='active' order by sort_order";
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

    //FETCH ALL SOCIAL LINKS
    if(isset($_POST['social_media']))
    {
        $data=[];
        
        $sql="select * from social_links";
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

    if(isset($_POST['media_files']))
    {
        $data=[];
        
        $sql="select * from documents_upload order by id desc";
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

    //GET DYNAMIC PAGE DATA FOR QUIZ
    if(isset($_POST['dynamic_pages_for_quiz']))
    {
        $data=[];
        
        $sql="select * from dynamic_pages where status='active' and page_name='#'";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //GET DYNAMIC PAGE DATA FOR footer USEFUL Links
    if(isset($_POST['dynamic_pages_for_footer']))
    {
        $data=[];
        
        $sql="select * from dynamic_pages where status='active' and page_name<>'#' and id not in(select page_id from useful_links)";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //GET DYNAMIC PAGE DATA FOR footer USEFUL Links
    if(isset($_POST['imp_updates']))
    {
        $data=[];
        
        $sql="select * from dynamic_pages where status='active' and lower(parent_id)='imp'";
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
            echo json_encode($data);
        }
    }
    if(isset($_POST['study_m']))
    {
        $data=[];
        
        $sql="select pac.* , s.* from programs_and_courses pac ,study_material s where (pac.fees = 0 and pac.id =s.pc_id) ";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   // $c=$row['tags'];
                   // $row['tags']= explode(",",$c)
                   $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            echo json_encode($data);
        }
    }

    if(isset($_POST['tag']))
    {
        $data=[];
        
        $sql="select pac.* , s.* from programs_and_courses pac ,study_material s where (pac.fees = 0 and pac.id =s.pc_id) ";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $c=$row['tag'];
                   $row['tag']= explode(",",$c);
                   $data=$row['tag'];
                }
            }
            
        }
        echo json_encode($data);
    }


    if(isset($_POST['tagresult']))
    {
        $data=[];
        $t=test_input($_POST['tagresult']);
        $sql="select pac.* , s.* from programs_and_courses pac ,study_material s where (pac.fees = 0 and pac.id =s.pc_id and s.tag LIKE '%$t%')";
        if($result=$conn->query($sql))
        {
          if($result->num_rows)
          {
                while($row=$result->fetch_assoc())
                {
                   $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }
    
?>