<?php
    require_once 'lib/core.php';
    
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {  
		
		//ADD ORDER STATUS
        if(isset($_POST['add_status']))
        {
            $name=test_input($_POST['name']);
            $parent=test_input($_POST['parent']);
            $link=str_replace(" ", "-", $name);
			$sql="select id from order_status where status_name='$name'";
			$result=$conn->query($sql);
			if($result->num_rows>0)
			{
				$already=true;
			}
			else
			{
				$sql="insert into order_status(status_name) values('$name')";
				if($conn->query($sql)===true)
				{
					$success=true;
				}
				else
				{
					$error=true;
				}
			}
        }
        
		
		//DELETE ORDER STATUS
        if(isset($_POST['status_delete']))
        {
            $m_id=test_input($_POST['status_delete']);
            $sql="delete from order_status where id=$m_id ";
            if($conn->query($sql)===true)
            {
                $success=true;
            }
            else
            {
                $error1=true;
            }
            
        }
        
        //UPDATE ORDER STATUS
        if(isset($_POST['update_order_status']))
        {
            $order_id=test_input($_POST['update_order_id']);
            $status=strtolower(test_input($_POST['update_order_status']));
            if($status == "cancel")
            {
                $sql="update orders set order_status='$status' where order_id='$order_id'";
                if($conn->query($sql))
                {
                    $sql="insert into order_history(o_id, action, update_by, customer_notified) select id, '$status', 'Shop', 'Yes' from orders where order_id='$order_id'";
                    if($conn->query($sql))
                    {
                        if($status == "confirmed/in process")
                        {
                            $sql="select p.id, oi.product_quantity from products p, order_items oi where ";
                            $sql.="p.id=oi.p_id and oi.o_id=(select id from orders where order_id='$order_id') ";
                            $sql.="and lower(oi.order_item_status)<>'cancel' and p.home_and_kitchen_id is not null";
                            if($result = $conn->query($sql))
                            {
                                if($result->num_rows)
                                {
                                    while($row = $result->fetch_assoc())
                                    {
                                        $sql="select quantity from products where id=".$row['id'];
                                        if($res = $conn->query($sql))
                                        {
                                            if($res->num_rows)
                                            {
                                                $rs=$res->fetch_assoc();
                                                if($rs['quantity'] <= $row['product_quantity'])
                                                {
                                                    $sql="update products set quantity=0 where id=".$row['id'];
                                                    if($conn->query($sql)){}
                                                }
                                                else
                                                {
                                                    $sql="update products set quantity=(quantity-".$row['product_quantity'].") where id=".$row['id'];
                                                    if($conn->query($sql)){}    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        echo "ok";
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
                else
                {
                    echo $conn->error;
                }
            }
            else
            {
                $sql="update order_items set order_item_status='$status' where o_id=(select id from orders where order_id='$order_id')";
                if($conn->query($sql))
                {
                    $sql="update orders set order_status='$status' where order_id='$order_id'";
                    if($conn->query($sql))
                    {
                        $sql="insert into order_history(o_id, action, update_by, customer_notified) select id, '$status', 'Shop', 'Yes' from orders where order_id='$order_id'";
                        if($conn->query($sql))
                        {
                            if($status == "confirmed/in process")
                            {
                                $sql="select p.id, oi.product_quantity from products p, order_items oi where ";
                                $sql.="p.id=oi.p_id and oi.o_id=(select id from orders where order_id='$order_id') ";
                                $sql.="and lower(oi.order_item_status)<>'cancel' and p.home_and_kitchen_id is not null";
                                if($result = $conn->query($sql))
                                {
                                    if($result->num_rows)
                                    {
                                        while($row = $result->fetch_assoc())
                                        {
                                            $sql="select quantity from products where id=".$row['id'];
                                            if($res = $conn->query($sql))
                                            {
                                                if($res->num_rows)
                                                {
                                                    $rs=$res->fetch_assoc();
                                                    if($rs['quantity'] <= $row['product_quantity'])
                                                    {
                                                        $sql="update products set quantity=0 where id=".$row['id'];
                                                        if($conn->query($sql)){}
                                                    }
                                                    else
                                                    {
                                                        $sql="update products set quantity=(quantity-".$row['product_quantity'].") where id=".$row['id'];
                                                        if($conn->query($sql)){}    
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                
                                $sql="select agent_id from orders where order_id='$order_id'";
                                if($o = $conn->query($sql))
                                {
                                    if($o->num_rows)
                                    {
                                        $orow=$o->fetch_assoc();
                                        if(isset($orow['agent_id']) && !empty($orow['agent_id']))
                                        {
                                            $agent_id=$orow['agent_id'];
                                            $sql="select i.*, ip.incentive_id from incentives i left outer join ";
                                            $sql.="incentives_provided ip on i.id=ip.incentive_id and ip.agent_id=$agent_id and month(ip.time_stamp)=month(CURRENT_DATE) ";
                                            $sql.="where i.range_end <=(select sum(order_amount)-sum(shipping_charge) as t from orders where ";
                                            $sql.="agent_id=$agent_id and order_status not in('cancel', 'failed', 'placed') and month(time_statmpts)=month(CURRENT_DATE)) ";
                                            $sql.="order by range_end desc limit 1";
                                            if($r = $conn->query($sql))
                                            { 
                                                if($r->num_rows)
                                                {
                                                    $rw = $r->fetch_assoc();
                                                    if($rw['id'] != $rw['incentive_id'])
                                                    {
                                                        $sql="insert into incentives_provided(agent_id, incentive_id, incentive_range, amount) ";
                                                        $sql.="select $agent_id, id, range_end, amount from incentives where id=".$rw['id'];
                                                        $conn->query($sql);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            echo "ok";
                        }
                        else
                        {
                            echo $conn->error;
                        }
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
                else
                {
                    echo $conn->error;
                }
            }
        }
        
        //UPDATE ORDER DELIVERY DATE
        if(isset($_POST['update_delivery_date']))
        {
            $order_id=test_input($_POST['update_order_id']);
            $delivery_date=$_POST['update_delivery_date'];
            $sql="update orders set delivery_date='$delivery_date' where order_id='$order_id'";
            if($conn->query($sql))
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //UPDATE ORDER TIME SLOT
        if(isset($_POST['update_timeslot']))
        {
            $order_id=test_input($_POST['update_order_id']);
            $slot=$_POST['update_timeslot'];
            $delivery_pincode=$_POST['update_timeslot_pincode'];
            
            $final_charge=0;
            
            $sql="select * from orders where order_id='$order_id'";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row=$result->fetch_assoc();
                    $total=$row['order_amount'];
                    
                    if($slot == "standard")
                    {

                        $sql="select id,free_above from delivery_charges where pincode='$pincode'";
                        if($result = $conn->query($sql))
                        {
                            if($result->num_rows)
                            {
                                $row=$result->fetch_assoc();
                                if(intval($row['free_above']) > intval($total))
                                {
                                    $delivery_id=$row['id'];
                                    $sql="select * from delivery_standard_rates where delivery_charge_id=$delivery_id";
                                    if($result = $conn->query($sql))
                                    {
                                        if($result->num_rows)
                                        {
                                            while($row=$result->fetch_assoc())
                                            {
                                                if($row['upto_amount'] >= $total)
                                                {
                                                    $final_charge=$row['charge'];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                    else
                    {
                        $sql="select time_fee from delivery_charges where pincode='$pincode'";
                        if($result = $conn->query($sql))
                        {
                            if($result->num_rows)
                            {
                                $row=$result->fetch_assoc();
                                $final_charge=$row['time_fee'];
                            }
                        }
                    }
                    
                    $sql="update orders set order_amount=order_amount-shipping_charge+$final_charge where order_id='$order_id'";
                    if($conn->query($sql))
                    {
                        $sql="update orders set shipping_charge=$final_charge where order_id='$order_id'";
                        if($conn->query($sql))
                        {
                            echo "ok";
                        }
                        else
                        {
                            echo $conn->error;
                        }    
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
                else
                {
                    echo "error";
                }
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //REMOVE ITEM FROM ORDER
        if(isset($_POST['remove_order_item']))
        {
            $order_id=test_input($_POST['update_order_id']);
            $p_id=$_POST['remove_order_item'];
            $price=test_input($_POST['remove_order_price']);
            
            if(isset($_POST['admin_send']))
            {
                $sql="update order_items set order_item_status='cancel', cancel_description='admin' where o_id=(select id from orders where order_id='$order_id') and p_id=$p_id";
            }
            else
            {
                $sql="update order_items set order_item_status='cancel', cancel_description='user' where o_id=(select id from orders where order_id='$order_id') and p_id=$p_id";
            }
            if($conn->query($sql))
            {
                $sql="update orders set order_amount=order_amount-$price where order_id='$order_id'";
                if($conn->query($sql)){}
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //REMOVE ITEM FROM EVERY PENDING ORDER AND MARK IT NOT AVAILABLE FOR FURTHER ORDER
        if(isset($_POST['cancel_order_item']))
        {
            $order_id=test_input($_POST['update_order_id']);
            $p_id=$_POST['cancel_order_item'];
            $price=test_input($_POST['cancel_order_price']);
            
            $sql="select o.id from orders o, order_items oi where o.order_status='placed' and oi.order_item_status='' and oi.p_id=$p_id group by o.id";
            if($result = $conn->query($sql))
            {
                if($result->num_rows)
                {
                    $sql="update order_items set order_item_status='cancel', cancel_description='admin' where o_id in(select id from orders where order_status='placed') and p_id=$p_id and order_item_status=''";
                    if($conn->query($sql)){}
                    
                    while($row=$result->fetch_assoc())
                    {
                        $sql="update orders set order_amount=order_amount-$price where order_status='placed' and id=".$row['id'];
                        if($conn->query($sql)){}
                    }
                    
                    $sql="update products set status='Block' where id=$p_id";
                    if($conn->query($sql)){}
                    echo "ok";
                }
                else
                {
                    echo "invalid request";
                }
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //UPDATE A PARTICULAR ITEM FOR ORDER
        if(isset($_POST['edit_product']))
        {
            $order_id=test_input($_POST['update_order_id']);
            $product=json_decode($_POST['edit_product']);
            $sql="update order_items set product_quantity=".$product->product_quantity." where o_id=(select id from orders where order_id='$order_id') and p_id=".$product->product_id;
            if($conn->query($sql))
            {
                $sql="update orders set order_amount=(order_amount-".$product->last_price."+".$product->final_price.") where order_id='$order_id'";
                if($conn->query($sql))
                {
                    echo "ok";
                }
                else
                {
                    echo $conn->error;
                }
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //ADD A PARTICULAR ITEM FOR ORDER
        if(isset($_POST['add_product']))
        {
            $order_id=test_input($_POST['update_order_id']);
            $product=json_decode($_POST['add_product']);
            $sql="insert into order_items(o_id, p_id, product_quantity, product_quantity_type, product_price, order_item_status, p_options) ";
            $sql.="select id, ".$product->product_id.", ".$product->product_quantity.", '".$product->product_type."', ".$product->product_price.",'','' ";
            $sql.="from orders where order_id='$order_id'";
            if($conn->query($sql))
            {
                $sql="update orders set order_amount=(order_amount+".$product->final_price.") where order_id='$order_id'";
                if($conn->query($sql))
                {
                    echo "ok";
                }
                else
                {
                    echo $conn->error;
                }
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //CANCEL WHOLE ORDER
        if(isset($_POST['cancel_order']))
        {
            $id=test_input($_POST['cancel_order']);
            $sql="update orders set order_status='cancel' where order_id='$id'";
            if($conn->query($sql))
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        
        //SUBMIT AUDIO ORDER
        if(isset($_POST['customer_audio_order']))
        {
            $user_id=test_input($_POST['customer_audio_order']);
            
            $response = array();
            $upload_dir = '../audios/';
            if($_FILES['audio_order'])
            {
                $audio_order_name = $_FILES["audio_order"]["name"];
                $audio_order_tmp_name = $_FILES["audio_order"]["tmp_name"];
                $error = $_FILES["audio_order"]["error"];
                if($error > 0){
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "Error uploading the file!"
                    );
                }else 
                {
                    $random_name = strtolower(rand(1000,100000)."-".uniqid()."-".substr($audio_order_name, -7));
                    $upload_name = $upload_dir.strtolower($random_name);
                    $upload_name = preg_replace('/\s+/', '-', $upload_name);

                    if(move_uploaded_file($audio_order_tmp_name , $upload_name)) {
                        $response = array(
                            "status" => "success",
                            "error" => false,
                            "message" => "File uploaded successfully",
                            "url" => $server_url."/".$upload_name
                          );
                    }
                    else
                    {
                        $response = array(
                            "status" => "error",
                            "error" => true,
                            "message" => "Error uploading the file!"
                        );
                    }
                }

            }
            else{
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "No file was sent!"
                );
            }

            if($response['status'] == "success")
            {
                $sql="insert into audio_orders(audio, user_id) values('".strtolower($random_name)."',$user_id)";
                if($conn->query($sql)===true)
                {
                    echo "ok";
                }
                else
                {
                    echo $conn->error;
                }
            }
            else
            {
                echo $response['message'];
            }
        }
        
        //UPDATE AUDIO ORDER STATUS
        if(isset($_POST['audio_order']))
        {
            $sql="update audio_orders set status='Cancelled' where id=".$_POST['audio_order'];
            if($conn->query($sql))
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //UPDATE AUDIO ORDER STATUS
        if(isset($_POST['audio_order_process']))
        {
            $order_id=test_input($_POST['audio_order_process_order_id']);
            
            $sql="select id from orders where order_id='$order_id'";
            if($res=$conn->query($sql))
            {
                if($res->num_rows)
                {
                    $sql="update audio_orders set status='Processed', order_id='$order_id' where id=".$_POST['audio_order_process'];
                    if($conn->query($sql))
                    {
                        echo "ok";
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
                else
                {
                    echo "Invalid Order ID Passed!";
                }
            } 
        }
    }
?>