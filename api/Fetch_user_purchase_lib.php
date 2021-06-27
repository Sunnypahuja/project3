<?php
    header('Access-Control-Allow-Origin: *');
    require_once 'lib/core.php';

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if(isset($_POST['user_purchase_lib']))
        {
            $data=[];
            $user_id = $_POST['user_id'];
            $sql = "select * from user_purchase_lib where u_id = $user_id";
            if($result = $conn->query($sql))
            {
               if($result->num_rows)
               {
                   while($row = $result->fetch_assoc())
                   {
                        $data[] =$row;
                   }
               }
            }
            else
            {
                echo "error";
            }

            echo json_encode($data);
        }
    }
?>