<?php
    require_once 'lib/core.php';

    if(isset($_POST['fetch_teachers']))
    {
        $sql="select * from teachers";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while ($row=$result->fetch_assoc()) 
                {
                    $data[]=$row;
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="no_teachers";
            }
        }
        else
        {
            $data['msg']="error";
        }

        echo json_encode($data);
    }