<?php
    require_once 'lib/core.php';
    
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        //CHECK FOR USER EXISTENCE
        if(isset($_POST['contact']))
        {
            $contact=test_input($_POST['contact']);
            $sql="select up.u_id as id,up.status,concat(up.f_name,' ',up.l_name) as name,up.contact,a.zip, ";
            $sql.="concat(a.address,' - ',a.city,'(',a.landmark,') - ',a.state,' - ',a.zip) as address ";
            $sql.="from user_profiles up left outer join address a on up.u_id=a.u_id where up.contact='$contact'";
            $result=$conn->query($sql);
            if ($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $row['type']="online";
                $sql="select * from delivery_charges where pincode='".$row['zip']."'";
                $pin_check=$conn->query($sql);
                if($pin_check->num_rows)
                {
                    $row['pin']="allowed";
                    echo json_encode($row);
                }
                else
                {
                    $row['pin']="n.a.";
                    echo json_encode($row);
                }
            }
            else
            {
                $sql="select *, concat(address,' - ',city,'(',landmark,') - ',state,' - ',zipcode) as main_address  from local_customers where contact='$contact'";
                $result=$conn->query($sql);
                if ($result->num_rows > 0)
                {
                    $row = $result->fetch_assoc();
                    $row['type']="local";
                    echo json_encode($row);
                }
                else
                {
                    echo "err";
                }
            }
                
        }
        
        //CHECK PINCODE FOR DELIVERY
        if(isset($_POST['pincode_check']))
        {
            $sql="select * from delivery_charges where pincode='".$_POST['pincode_check']."'";
            $result=$conn->query($sql);
            if($result->num_rows)
            {
                echo "ok";
            }
            else
            {
                echo "no";
            }
        }
        
        //CHECK PINCODE FOR DELIVERY FOR HOME
        if(isset($_POST['pincode_check_for_home']))
        {
            if(isset($_POST['pincode_cart_items']))
            {
                $products=json_decode($_POST['pincode_cart_items']);
                
                $ids="";
                
                foreach($products as $p)
                {
                    if(isset($p->product_id))
                        $ids.=$p->product_id.",";
                }
                
                $ids=rtrim($ids,",");
                
                $categories='';
                $home_and_kitchen='';
                
                $sql="select distinct(m_id) as m_id from products where id in($ids) and m_id is not null";
                if($result=$conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        while($row=$result->fetch_assoc())
                        {
                            $categories.=$row['m_id'].",";
                        }
                        $categories=rtrim($categories,",");
                    }
                }
                
                $sql="select distinct(home_and_kitchen_id) as m_id from products where id in($ids) and home_and_kitchen_id is not null";
                if($result=$conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        while($row=$result->fetch_assoc())
                        {
                            $home_and_kitchen.=$row['m_id'].",";
                        }
                        $home_and_kitchen=rtrim($home_and_kitchen,",");
                    }
                }
                
                if($categories!='' || $home_and_kitchen!='')
                {
                    $sql="select * from delivery_charges where pincode='".$_POST['pincode_check_for_home']."' ";

                    if($result=$conn->query($sql))
                    {
                        if($result->num_rows)
                        {
                            $r=$result->fetch_assoc();
                            $get_one=false;
                            
                            if($categories!='')
                            {
                                $d_categories=explode(",",$r['categories']);
                                $cat=explode(",",$categories);
                                foreach($cat as $c)
                                {
                                    if(in_array($c,$d_categories))
                                    {
                                        $get_one=true;
                                        break;
                                    }
                                }
                            }
                            else if($home_and_kitchen!='')
                            {
                                $d_categories=explode(",",$r['home_and_kitchen']);
                                $cat=explode(",",$home_and_kitchen);
                                foreach($cat as $c)
                                {
                                    if(in_array($c,$d_categories))
                                    {
                                        $get_one=true;
                                        break;
                                    }
                                }
                            }
                            
                            if($get_one)
                            {   
                                if(isset($_POST['default_address_details']))
                                {
                                    $uid=test_input($_POST['default_address_details']);
                                    $sql="select * from address where u_id=$uid and is_default=1";
                                    if($result=$conn->query($sql))
                                    {
                                        if($result->num_rows)
                                        {
                                            $row=$result->fetch_assoc();
                                            $row['billing_address']=str_replace("'","&quot;",$row['address']).', '.$row['landmark'].', ';
                                            $row['billing_address'].=$row['city'].', '.$row['state'].' - '.$row['zip'];
                                            $row['billing_name']=$row['name'];
                                            $row['billing_contact']=$row['contact'];                                            
                                            echo json_encode($row);
                                        }
                                    }
                                }
                                else
                                {
                                    echo "ok";
                                }
                            }
                            else
                            {
                                echo "no";
                            }
                        }
                        else
                        {
                            echo "no";
                        }
                    }
                    else
                    {
                        echo $conn->error;
                    }
                }
                else
                {
                    echo "no";
                }
            }
            else
            {
                echo "no";
            }
        }
        
        //FETCH DELIVERY CHARGE DETAILS FOR PARTICULAR PINCODE
        if(isset($_POST['get_delivery_details']))
        {
            $data='';
            
            $pincode=test_input($_POST['get_delivery_details']);
            
            $sql="select * from delivery_charges where pincode='$pincode'";
            $result=$conn->query($sql);
            if($result->num_rows)
            {
                $row=$result->fetch_assoc();
                
                $data.="<option value='standard'>Standard - ".$row['standard_from']." - ".$row['standard_to']."</option>";
                if($row['slot1_from'] != "N.A.")
                {
                    $data.="<option value='slot1'>Slot1 - ".$row['slot1_from']." - ".$row['slot1_to']."</option>";
                }
                if($row['slot2_from'] != "N.A.")
                {
                    $data.="<option value='slot2'>Slot2 - ".$row['slot2_from']." - ".$row['slot2_to']."</option>";
                }
                if($row['slot3_from'] != "N.A.")
                {
                    $data.="<option value='slot3'>Slot3 - ".$row['slot3_from']." - ".$row['slot3_to']."</option>";
                }
            }
            
            echo $data;
        }
        
        //FETCH DELIVERY TIME SLOT DETAILS FOR PARTICULAR PINCODE
        if(isset($_POST['get_delivery_details_for_home']))
        {
            $data='';
            
            $pincode=test_input($_POST['get_delivery_details_for_home']);
			$total = test_input($_POST['final_price']);
            
            $sql="select * from delivery_charges where pincode='$pincode'";
            $result=$conn->query($sql);
            if($result->num_rows)
            {
                $row=$result->fetch_assoc();
                
				$delivery_charge=0;
                    
                $sql="select id,free_above from delivery_charges where pincode='$pincode'";
                if($result = $conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        $r=$result->fetch_assoc();
                        if(intval($r['free_above']) > intval($total))
                        {
                            $delivery_id=$r['id'];
                            $sql="select * from delivery_standard_rates where delivery_charge_id=$delivery_id";
                            if($result = $conn->query($sql))
                            {
                                if($result->num_rows)
                                {
                                    while($r=$result->fetch_assoc())
                                    {
                                        if($r['upto_amount'] >= $total)
                                        {
                                            $delivery_charge=$r['charge'];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
				
				$time_fee=0;
				$sql="select time_fee from delivery_charges where pincode='$pincode'";
                if($result = $conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        $r=$result->fetch_assoc();
                        $time_fee=$r['time_fee'];
                    }
                }
                
				
                $data.="<input type='radio' checked name='slot' slot_time='".$row['standard_from']." - ".$row['standard_to']."' id='slot' value='standard'/> Standard - ".$row['standard_from']." - ".$row['standard_to']." (₹$delivery_charge)<br/>";
                if($row['slot1_from'] != "N.A.")
                {
                    $data.="<input type='radio' name='slot' slot_time='".$row['slot1_from']." - ".$row['slot1_to']."' id='slot' value='slot1' /> Slot1 - ".$row['slot1_from']." - ".$row['slot1_to']."(₹$time_fee)<br/>";
                }
                if($row['slot2_from'] != "N.A.")
                {
                    $data.="<input type='radio' name='slot' slot_time='".$row['slot2_from']." - ".$row['slot2_to']."' id='slot' value='slot2'/> Slot2 - ".$row['slot2_from']." - ".$row['slot2_to']."(₹$time_fee)<br/>";
                }
                if($row['slot3_from'] != "N.A.")
                {
                    $data.="<input type='radio' name='slot' slot_time='".$row['slot3_from']." - ".$row['slot3_to']."' id='slot' value='slot3'/> Slot3 - ".$row['slot3_from']." - ".$row['slot3_to']."(₹$time_fee)<br/>";
                }
            }
            
            echo $data;
        }
        
        //DELIVERY CHARGES FOR PARTICULAR TIME SLOT AND PINCODE IN HOME
        if(isset($_POST['get_delivery_charges_for_home']))
        {
            $slot = test_input($_POST['get_delivery_charges_for_home']);
            $pincode = test_input($_POST['pincode_for_delivery']);
            $total = test_input($_POST['final_price']);
            
            if($slot == "standard")
            {
                $delivery_charge=0;
                    
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
                                            $delivery_charge=$row['charge'];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                echo $delivery_charge;
            }
            else
            {
                $sql="select time_fee from delivery_charges where pincode='$pincode'";
                if($result = $conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        $row=$result->fetch_assoc();
                        echo $row['time_fee'];
                    }
                }
            }
        }
        
        //DELIVERY CHARGES FOR PARTICULAR TIME SLOT AND PINCODE
        if(isset($_POST['get_delivery_charges']))
        {
            $slot = test_input($_POST['get_delivery_charges']);
            $pincode = test_input($_POST['pincode_for_delivery']);
            $cart = json_decode($_POST['cart_products']);
            
            if($slot == "standard")
            {
                $total=0;
                $delivery_charge=0;
                foreach($cart as $c)
                {
                    if(isset($c->final_price))
                    {
                        $total+=$c->final_price;
                    }
                }
                    
                $sql="select id,free_above from delivery_charges where pincode='$pincode'";
                if($result = $conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        $row=$result->fetch_assoc();
                        if($row['free_above'] > $total )
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
                                            $delivery_charge=$row['charge'];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                echo $delivery_charge;
            }
            else
            {
                $sql="select time_fee from delivery_charges where pincode='$pincode'";
                if($result = $conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        $row=$result->fetch_assoc();
                        echo $row['time_fee'];
                    }
                }
            }
        }
        
        // create new bill
        if(isset($_POST['place_order']))
        {
           
            $customer_id=test_input($_POST['order_user_id']);
            $customer_name=test_input($_POST['order_user_name']);
            $customer_contact=test_input($_POST['order_user_contact']);
            
            $address=test_input($_POST['order_user_address']);
			$address=str_replace("'","&#039;",$address);
			$address=str_replace("‘","&#039;",$address);
			$address=str_replace("’","&#039;",$address);
            $address=str_replace("<","&lt;",$address);
            $address=str_replace(">","&gt;",$address);
            $address=str_replace('"',"&quot;",$address);
            $address=str_replace('“',"&quot;",$address);
            $address=str_replace('”',"&quot;",$address);
            
            $type=test_input($_POST['order_user_type']);
            
            $delivery_slot=test_input($_POST['order_delivery_time_slot']);
            $delivery_slot=str_replace("Standard - ","",$delivery_slot);
            $delivery_slot=str_replace("Slot1 - ","",$delivery_slot);
            $delivery_slot=str_replace("Slot2 - ","",$delivery_slot);
            $delivery_slot=str_replace("Slot3 - ","",$delivery_slot);
            
            $delivery_slot_type=test_input($_POST['order_delivery_time_slot_type']);
            $delivery_charge=test_input($_POST['order_delivery_charge']);
            
            if(isset($_POST['order_agent']))
            {
                $agent_id=test_input($_POST['order_agent']);
            }
            
            $products=json_decode($_POST['order_cart']);
            
            $sum=$delivery_charge;
            foreach($products as $p)
            {
                if(isset($p->product_id))
                {
                    $sum+=$p->final_price;
                }
            }
            
            $order_id=uniqid().time();
            
            $sql="insert into orders(order_id, ";
            if(isset($agent_id))
            {
                $sql.=" agent_id, ";
            }
            
            if($type == "online")
            {
                $sql.=" u_id, ";
            }
            else
            {
                $sql.=" l_c_id, ";
            }
            
            $sql.="order_amount, order_status, payment_mode, shipping_address, shipping_charge, total_amount, discount, time_slot, time_slot_type) ";
            $sql.="values('$order_id', ";
            
            if(isset($agent_id))
            {
                $sql.=" $agent_id, ";
            }
            
            $sql.="$customer_id, '$sum', 'placed', 'cod', '$address', $delivery_charge, 0, 0, '$delivery_slot', '$delivery_slot_type')"; 
            
            if($conn->query($sql)===true)
            {
                $last_id = $conn->insert_id;
                
                $order_id="MB".$last_id;
                
                $sql="update orders set order_id='$order_id' where id=$last_id";
                $conn->query($sql);
                
                $success=true;
                
                $commission=0;
                
                foreach($products as $product)
                {
                    if(isset($product->product_id))
                    {
                        $p_id=$product->product_id;
                        $quantity=$product->product_quantity;
                        $quantity_type=$product->product_type;
                        $amount=$product->product_price;

                        $sql="insert into order_items(o_id, p_id, product_quantity, product_quantity_type, product_price, p_options, order_item_status) ";
                        $sql.="values($last_id, $p_id, $quantity, '$quantity_type', $amount,'','')";

                        if($conn->query($sql)===true)
                        {
                            if(isset($agent_id))
                            {
                                $sql="select COALESCE(m.commission_per, h.commission_per) c from products p ";
                                $sql.="left outer join menus m on p.m_id=m.id ";
                                $sql.="left outer join home_and_kitchen h on p.home_and_kitchen_id=h.id ";
                                $sql.="where p.id=$p_id";

                                if($r = $conn->query($sql))
                                {
                                    if($r->num_rows)
                                    {
                                        $row=$r->fetch_assoc();
                                        if($row['c'] > 0)
                                        {
                                            if(strtolower($quantity_type) == "kg" || strtolower($quantity_type) == "litre")
                                            {
                                                $commission+=($row['c']/100)*($amount/1000)*$quantity;
                                            }
                                            else
                                            {
                                                $commission+=($row['c']/100)*$amount;
                                            }
                                        }
                                    }
                                }
                            }
                            
                            $success=true;
                        }
                        else
                        {
                            $success=false;
                            $error=$conn->error;

                            $sql="delete from orders where id=$last_id";
                            $conn->query($sql);

                            break;
                        }
                    }
                }
                
                if($success)
                {
                    if(isset($agent_id) && $commission > 0)
                    {
                        $sql="insert into agent_commissions(agent_id, order_id, commission) ";
                        $sql.="values($agent_id, $last_id, $commission)";
                        $conn->query($sql);
                    }
                    echo "ok".$order_id;
                }
                else
                {
                    echo $error;
                }
            }
            else
            {
                echo $conn->error;
            }
        }
        
        // create new bill for home
        if(isset($_POST['place_order_for_home']))
        {
           
            $customer_id=test_input($_POST['order_user_id']);
            $customer_name=test_input($_POST['order_user_name']);
            $customer_contact=test_input($_POST['order_user_contact']);
            
            $address=test_input($_POST['order_user_address']);
			$address=str_replace("'","&#039;",$address);
			$address=str_replace("‘","&#039;",$address);
			$address=str_replace("’","&#039;",$address);
            $address=str_replace("<","&lt;",$address);
            $address=str_replace(">","&gt;",$address);
            $address=str_replace('"',"&quot;",$address);
            $address=str_replace('“',"&quot;",$address);
            $address=str_replace('”',"&quot;",$address);
            
            $type=test_input($_POST['order_user_type']);
            
            $delivery_slot=test_input($_POST['order_delivery_time_slot']);
            $delivery_slot=str_replace("Standard - ","",$delivery_slot);
            $delivery_slot=str_replace("Slot1 - ","",$delivery_slot);
            $delivery_slot=str_replace("Slot2 - ","",$delivery_slot);
            $delivery_slot=str_replace("Slot3 - ","",$delivery_slot);
            
            if($delivery_slot == "undefined")
            {
                $delivery_slot="07:00AM - 11:00AM";
            }
            
            
            $delivery_slot_type=test_input($_POST['order_delivery_time_slot_type']);
            
            if($delivery_slot_type == "undefined")
            {
                $delivery_slot_type="standard";
            }
            
            $delivery_charge=test_input($_POST['order_delivery_charge']);
            
            $payment_type=test_input($_POST['order_payment']);
			
            $status='placed';
            
			if($payment_type == "instamojo")
			{
				$payment_type="OG";
                $status='failed';
			}
            
            if(isset($_POST['order_agent']))
            {
                $agent_id=test_input($_POST['order_agent']);
            }
            
            $products=json_decode($_POST['order_cart']);
            
            $sum=$delivery_charge;
            foreach($products as $p)
            {
                if(isset($p->product_id))
                {
                    $sum+=$p->final_price;
                    
                    if(isset($p->cleaning))
                    {
                        $sum+=$p->cleaning+$p->cutting_charge;
                    }
                }
            }
            
            $order_id=uniqid().time();
            
            $sql="insert into orders(order_id, ";
            if(isset($agent_id))
            {
                $sql.=" agent_id, ";
            }
            
            if($type == "online")
            {
                $sql.=" u_id, ";
            }
            else
            {
                $sql.=" l_c_id, ";
            }
            
            $sql.="order_amount, order_status, payment_mode, shipping_address, shipping_charge, total_amount, discount, time_slot, time_slot_type) ";
            $sql.="values('$order_id', ";
            
            if(isset($agent_id))
            {
                $sql.=" $agent_id, ";
            }
            
            $sql.="$customer_id, '$sum', '$status', '$payment_type', '$address', $delivery_charge, 0, 0, '$delivery_slot', '$delivery_slot_type')"; 
            
            if($conn->query($sql)===true)
            {
                $last_id = $conn->insert_id;
                
                $order_id="MB".$last_id;
                
                $sql="update orders set order_id='$order_id' where id=$last_id";
                $conn->query($sql);
                
                $success=true;
                
                foreach($products as $product)
                {
                    if(isset($product->product_id))
                    {
                        $p_id=$product->product_id;
                        $quantity=$product->product_quantity;
                        $quantity_type=$product->product_type;
                        $amount=$product->product_price;
                        
                        if(isset($product->cleaning))
                        {
                            $sql="insert into order_items(o_id, p_id, product_quantity, product_quantity_type, product_price, ";
                            $sql.="p_options, order_item_status, cleaning_charge, cutting_charge) ";
                            $sql.="values($last_id, $p_id, $quantity, '$quantity_type', $amount,'','',".$product->cleaning.",".$product->cutting_charge.")";
                        }
                        else
                        {
                            $sql="insert into order_items(o_id, p_id, product_quantity, product_quantity_type, product_price, p_options, order_item_status) ";
                            $sql.="values($last_id, $p_id, $quantity, '$quantity_type', $amount,'','')";
                        }

                        if($conn->query($sql)===true)
                        {
                            $success=true;
                        }
                        else
                        {
                            $success=false;
                            $error=$conn->error." ".$sql;

//                            $sql="delete from orders where id=$last_id";
//                            $conn->query($sql);

                            break;
                        }
                    }
                }
                
                if($success)
                {
                    if($payment_type == "OG")
                    {
                        
                        $sql="select * from users where id=".$customer_id;
                        if($result = $conn->query($sql))
                        {
                            if($result->num_rows)
                            {
                                $user_data=$result->fetch_assoc();
                            }
                        }
                        
                        $ch = curl_init();

                        curl_setopt($ch, CURLOPT_URL, 'https://www.instamojo.com/api/1.1/payment-requests/');
                        curl_setopt($ch, CURLOPT_HEADER, FALSE);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
                        curl_setopt($ch, CURLOPT_HTTPHEADER,
                                    array("X-Api-Key:7fb35cdc833012d888057b9892d9baba",
                                          "X-Auth-Token:a5032ffb6d7399738c20d4549e5480ba"));
                        $payload = Array(
                            'purpose' => "Market Boi Order #".$order_id,
                            'amount' => $sum,
                            'phone' => $customer_contact,
                            'buyer_name' => $customer_name,
                            'send_email' => true,
                            'send_sms' => true,
                            'email' => $user_data['email'],
                            'allow_repeated_payments' => false,
                            'redirect_url' => 'https://marketboi.in/gateway-response'
                        );
                        curl_setopt($ch, CURLOPT_POST, true);
                        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
                        $response = curl_exec($ch);
                        curl_close($ch); 

                        $temp_res=json_decode($response);
                        
                        if($temp_res->success)
                        {
                            $sql="insert into payment_log(txn_id, o_id, amount, status) ";
                            $sql.="values('".$temp_res->payment_request->id."', $last_id, $sum, 'pending')";
                            if($conn->query($sql))
                            {
                                echo $response;
                            }
                            else
                            {
                                $sql="update orders set order_status='failed' where id=$last_id";
                                $conn->query($sql);
                                $sql="update order_items set order_item_status='failed' where o_id=$last_id";
                                $conn->query($sql);
                                
                                echo "error";
                            }
                        }
                        else
                        {
                            $sql="update orders set order_status='failed' where id=$last_id";
                            $conn->query($sql);
                            $sql="update order_items set order_item_status='failed' where o_id=$last_id";
                            $conn->query($sql);
                            echo "error";
                        }
                    }
                    else
                    {
                        echo "ok".$order_id;
                    }
                }
                else
                {
                    $sql="update orders set order_status='failed' where id=$last_id";
                    $conn->query($sql);
                    echo $error;
                }
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //MARK ORDER AS SUCCESS WHEN PAYMENT GATEWAY OPTED
        if(isset($_POST['mark_order_as_success']))
        {
            $order_id=test_input($_POST['mark_order_as_success']);
            
            $sql="update payment_log set status='success' where o_id=(select id from orders where order_id='$order_id')";
            if($conn->query($sql))
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //CHECK IF ALL CART ITEMS ARE AVAILABLE FOR PINCODE
        if(isset($_POST['check_all_cart_items_pincode']))
        {
            $data=[];
            $products=json_decode($_POST['check_all_cart_items']);

            $ids="";

            foreach($products as $p)
            {
                if(isset($p->product_id))
                    $ids.=$p->product_id.",";
            }

            $ids=rtrim($ids,",");

            
            $sql="select categories, home_and_kitchen from delivery_charges where pincode='".$_POST['check_all_cart_items_pincode']."' ";
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    if($row=$result->fetch_assoc())
                    {
                        $categories=$row['categories'];
                        $home_and_kitchen=$row['home_and_kitchen'];
                        
                        if(!empty($categories))
                        {
                            $sql="select id from products where id in($ids) and m_id is not null ";
                            $sql.="and m_id not in($categories)";
                            if($result=$conn->query($sql))
                            {
                                if($result->num_rows)
                                {
                                    while($row=$result->fetch_assoc())
                                    {
                                        $data[]=$row['id'];
                                    }
                                }
                            }
                        }

                        if(!empty($home_and_kitchen))
                        {
                            $sql="select id from products where id in($ids) and home_and_kitchen_id is not null ";
                            $sql.="and home_and_kitchen_id not in($home_and_kitchen)";
                            if($result=$conn->query($sql))
                            {
                                if($result->num_rows)
                                {
                                    while($row=$result->fetch_assoc())
                                    {
                                        $data[]=$row['id'];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            echo json_encode($data);
        }
        
        //CHNAGE STATUS OF ORDER AFTER RESPONSE
        if(isset($_POST['order_id_for_response']))
        {
            $order_id=test_input($_POST['order_id_for_response']);
            $status=test_input($_POST['order_status_for_response']);
                
            if($status == "success")
            {
                $sql="update orders set order_status='placed' where order_id='$order_id'";
            }
            else
            {
                $sql="update orders set order_status='failed' where order_id='$order_id'";
            }
            
            if($conn->query($sql))
            {
                echo "ok";
            }
            else
            {
                echo $conn->error;
            }
        }
        
        //GET PAYMENT DETAILS
        if(isset($_POST['payment_details_fid']) && isset($_POST['payment_details_sid']))
        {
            $fid=test_input($_POST['payment_details_fid']);
            $sid=test_input($_POST['payment_details_sid']);
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, 'https://www.instamojo.com/api/1.1/payment-requests/'.$fid.'/');
            curl_setopt($ch, CURLOPT_HEADER, FALSE);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($ch, CURLOPT_HTTPHEADER,
                        array("X-Api-Key:7fb35cdc833012d888057b9892d9baba",
                              "X-Auth-Token:a5032ffb6d7399738c20d4549e5480ba"));
            
            $response = curl_exec($ch);
            curl_close($ch); 

            echo $response;
        }
        
        //UPDATE GATEWAY ORDER STATUS
        if(isset($_POST['gateway_order_id']) && isset($_POST['gateway_order_amount']) && isset($_POST['gateway_order_email']))
        {
            $order_id=test_input($_POST['gateway_order_id']);
            $amount=test_input($_POST['gateway_order_amount']);
            $email=test_input($_POST['gateway_order_email']);
            
            $sql="select * from payment_log where o_id=(select id from orders where order_id='$order_id') and amount=$amount and status='pending'";
            if($res = $conn->query($sql))
            {
                if($res->num_rows)
                {
                    $sql="update payment_log set status='success' where o_id=(select id from orders where order_id='$order_id') and amount=$amount and status='pending'";
                    if($conn->query($sql))
                    {
                        $sql="update orders set order_status='placed' where order_id='$order_id'";
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
            }
        }
   }
?>