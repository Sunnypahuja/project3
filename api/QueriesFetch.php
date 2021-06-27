<?php
    require_once 'lib/core.php';

    //PENDING QUERIES
    if(isset($_POST['pending_queries']))
    {
        $sql="SELECT * from queries where lower(status)='pending' order by id desc";

        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows>0)
            {
                while($row=$result->fetch_assoc())
                {
                    $row['time_stamp']=date("d M, Y",strtotime($row['time_stamp']));
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //RESPONDED QUERIES
    if(isset($_POST['responded_queries']))
    {
        $sql="SELECT * from queries where lower(status)='responded' order by id desc";

        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows>0)
            {
                while($row=$result->fetch_assoc())
                {
                    $row['time_stamp']=date("d M, Y",strtotime($row['time_stamp']));
                    $row['responded_on']=date("d M, Y",strtotime($row['responded_on']));
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }
?>