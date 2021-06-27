<?php
    require_once 'lib/core.php';

    if(isset($_POST['callQuiz']))
    {
        $data=[];
        $type = $_POST['type'];
        $sql="SELECT * from quiz where type = '$type'";
        
        if($result=$conn->query($sql))
        {
            
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                    // $ext=pathinfo($data['data']['media_file'],PATHINFO_EXTENSION);
                    // if(strtolower($ext)=="pdf")
                    // {
                    //     ;
                    // }
                    // if($row['type'] == "prelims")
                    // {
                    //     $data['display'] = "98579-604851472b0ea-ies.jpg";
                    // }
                    // else if($row['type'] == "mains")
                    // {
                    //     $data['display'] = "24265-60bd10901fd05-x.jpg";
                    // }
                }
                $data['msg']="ok";
            }    
        }
        
        echo json_encode($data);
    }
?>