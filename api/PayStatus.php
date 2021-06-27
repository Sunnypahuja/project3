<?php
    require_once 'lib/core.php';
    require_once 'lib/razorpay/Razorpay.php';

    if(isset($_POST['pay_success']))
    {
       $order_id=$_POST['order_id'];
       $id=$_POST['id'];
       $item_id=$_POST['topic_id'];
       $u_id=$_POST['user_id'];
       $topic=$_POST['topic'];
       $obj=json_decode($_POST['payment_response'], true);
       $pid=$obj['razorpay_payment_id'];
       $data=[];
       $sig = hash_hmac('sha256', $order_id."|".$obj['razorpay_payment_id'], $keySecret);
        if ($sig == $obj['razorpay_signature'])
        {
            
           $sql="update transactions set status='success', payment_id='$pid' where order_id='$order_id' and id=$id";
            if($conn->query($sql))
            {
                
               $sql="insert into user_purchase_lib(purchase_type, item_id, u_id) values('$topic', '$item_id', '$u_id')";
                if($conn->query($sql))
                {
                    $data['p_id']=$item_id;
                    $data['msg']="ok";
                }
                else
                {
                    $data['msg']=$conn->error;
                }
            }
            else
            {
                $data['msg']=$conn->error;
            }
        }
        echo json_encode($data);
    }
?>