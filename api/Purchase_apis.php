<?php
header('Access-Control-Allow-Origin: *');
    require_once 'lib/core.php';
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if(isset($_POST['setPurchaseInfo']))
        {
            $purchase_type = $_POST['p_type'];
            $purchase_item_id = $_POST['p_item_id'];
            $purchase_user_id = $_POST['p_user_id'];
            $sql = "INSERT INTO user_purchase_lib(purchase_type,item_id,u_id) values('$purchase_type','$purchase_item_id','$purchase_user_id')";
            if($conn->query($sql))
            {
                echo "ok";
            }else
            {
                echo "error";
            }
        }
    }

?>