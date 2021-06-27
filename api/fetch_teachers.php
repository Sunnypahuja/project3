<?php
    require_once 'lib/core.php';
if(isset($_POST['fetchallarticles']))
    {
        $data=[];
        
        $sql="select a.*, t.name from article a ,teachers t where (a.teacher_id = t.id)";
        
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





    if(isset($_POST['adddata']))
    {
        $data=[];
        $tid=test_input($_POST['tid']);
        $status=test_input($_POST['status']);
        $title=test_input($_POST['title']);
       
        
        $sql="insert into article (topic,teacher_id,status) values('$title','$tid','$status') ";
        
        if($result=$conn->query($sql))
        {
            
             
            $data['data'] = 'ok'; 
        }
        
        echo json_encode("ok");
    }

    
    if(isset($_POST['delete_article']))
    {
        $data=[];
        $qid=test_input($_POST['delete_article']);
       
       
        
        $sql="DELETE FROM article WHERE id=$qid";
        
        if($result=$conn->query($sql))
        {
            
             
            $data['msg'] = 'ok'; 
        }
        else
        {
            $data['msg'] = $conn->error;
        }
        
        echo json_encode($data);
    }
    if(isset($_POST['status_chng']))
    {
        $data=[];
        $id=test_input($_POST['status_chng']);
        $sid=test_input($_POST['status']);
       
        if($sid== '1'){
        
        $sql="update article set status = 2 where id = $id";
        }
        elseif($sid== '2'){
            $sql="update article set status = 1 where id = $id";

        }
        if($result=$conn->query($sql))
        {
            
             
            $data['data'] = 'ok'; 
        }
        
        echo json_encode("ok");
    }


    if(isset($_POST['fetch_approved']))
    {
        $data=[];
        
        $sql="select a.*, t.name from article a ,teachers t where (a.teacher_id = t.id and a.status = '2')";
        
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
                $data['msg']="no articles";
            }   
        }
        else
        {
            $data['msg']=$conn->error;
        } 
        echo json_encode($data);
    }
    

    if(isset($_POST['fetch_rejected']))
    {
        $data=[];
        
        $sql="select a.*, t.name from article a ,teachers t where (a.teacher_id = t.id and a.status = '3')";
        
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
                $data['msg']="no articles";
            }   
        }
        else
        {
            $data['msg']=$conn->error;
        }
        
        echo json_encode($data);
    }
    


 

    if(isset($_POST['fetchpendingarticles']))
    {
        $data=[];
        
        $sql="select a.* , t.name from article a, teachers t where (a.teacher_id = t.id and a.status = 4 )";
        
        
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
                $data['msg']="no artcles";
            }    
        }
        else
        {
            $data['msg']=$conn->error;
        }
        
        echo json_encode($data);
    }


    if(isset($_POST['approve_article']))
    {
        $data=[];
        $id=test_input($_POST['approve_article']);
      
       
        
        
        $sql="update article set status = 2 where id = $id";
        
        if($result=$conn->query($sql))
        {
            
             
            $data['msg'] = 'ok'; 
        }
        
        echo json_encode($data);
    }

    if(isset($_POST['reject_article']))
    {
        $data=[];
        $id=test_input($_POST['reject_article']);
        
        $sql="update article set status = 3 where id = $id";
        
        if($result=$conn->query($sql))
        {
            
             
            $data['msg'] = 'ok'; 
        }
        
        echo json_encode($data);
    }
   
    ?>
   

  