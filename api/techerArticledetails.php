<?php
    require_once 'lib/core.php';
    
    if(isset($_POST['articles']))
    {
        $tid=test_input($_POST['articles']);
        $data=[];
        
        $sql="select a.*, t.name from article a ,teachers t where (a.teacher_id = '$tid' and a.teacher_id = t.id and a.status= 1)";
      
        
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
            }    
        }
        
        echo json_encode($data);
    }


    if(isset($_POST['approvedteacher']))
    {
        $tid=test_input($_POST['teacher_id']);
        $data=[];
        
        $sql="select a.*, t.name from article a ,teachers t where (teacher_id = '$tid' and a.teacher_id = t.id and a.status= 2)";
      
        
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']='ok';
            }    
        }
        
        echo json_encode($data);
    }


    
    if(isset($_POST['pendingteacher']))
    {
        $tid=test_input($_POST['teacher_id']);
        $data=[];
        
        $sql="select a.*, t.name from article a ,teachers t where (teacher_id = '$tid' and a.teacher_id = t.id and a.status= 4)";
      
        
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']='ok';
            }    
        }
        
        echo json_encode($data);
    }



     
    if(isset($_POST['rejectedteacher']))
    {
        $tid=test_input($_POST['teacher_id']);
        $data=[];
        
        $sql="select a.*, t.name from article a ,teachers t where (a.teacher_id = '$tid' and a.teacher_id = t.id and a.status= 3)";
      
        
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']='ok';
            }    
        }
        
        echo json_encode($data);
    }


       
    if(isset($_POST['get_article']))
    {
        $tid=test_input($_POST['teacher_id']);
        $t=test_input($_POST['tok']);
        $data=[];
        
        $sql="select * from article where (teacher_id =$tid and id= $t)";
      
        
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']='ok';
            }    
        }
        
        echo json_encode($data);
    }

      
    if(isset($_POST['edit_article']))
    {
        
        $pid=test_input($_POST['edit_article']);
        $des=test_input($_POST['description']);
        $data=[];
        
        $sql="update article set t_desc = '$des' , status= 4  where id= $pid";
       
        if($result=$conn->query($sql))
        {
            $data['msg']='ok';
        }   
        else
        {
            $data['msg']=$conn->error;  
        }

       
        
        echo json_encode($data);
    }

    

?>