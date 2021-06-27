<?php
    require_once 'lib/core.php';
    if(isset($_POST['links_prelims']))
    {
        $data=[];
        
        $sql="SELECT title,page_name from dynamic_pages where parent_id='prelims'";
        
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
    if(isset($_POST['links_mains']))
    {
        $data=[];
        
        $sql="SELECT title,page_name from dynamic_pages where parent_id='24'";
        
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