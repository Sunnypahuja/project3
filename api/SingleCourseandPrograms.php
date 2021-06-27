<?php

    require_once 'lib/core.php';

    if(isset($_POST['fetch_singlecourse']))
    {
        $id=$_POST['fetch_singlecourse'];
        $sql="select * from programs_and_courses where id='$id'";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                $row=$result->fetch_assoc();
                $data=$row;
            }
            $data['msg']="ok";
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }
?>