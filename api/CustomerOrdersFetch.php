<?php
    require_once 'lib/core.php';
    
    /*FETCHING FOR LOCAL USERS*/
    //FETCH ORDERS FOR THE LOCAL USER
    if(isset($_POST['local']))
    {
        $id=$_POST['local'];
        $sql="SELECT * from orders,local_customers lc where lc.id=$id and lc.id=orders.l_c_id order by orders.id DESC";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $row['time_statmpts']=date("d M, Y", strtotime($row['time_statmpts']));
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }


    //FETCH ORDERS FOR THE ONLINE USER
    if(isset($_POST['token']))
    {
        $id=$_POST['token'];
        $sql="SELECT * from orders,user_profiles where user_profiles.u_id=$id and user_profiles.u_id=orders.u_id order by orders.id DESC";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $row['time_statmpts']=date("d M, Y", strtotime($row['time_statmpts']));
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //FETCH ORDER DETAILS FOR BOTH LOCAL AND ONLINE USER
    if(isset($_POST['order_id']))
    {
        $order_id=$_POST['order_id'];
        
        $data=[];
        
        $sql="SELECT *,concat(user_profiles.f_name,' ',user_profiles.l_name) as name from user_profiles,orders,users where user_profiles.u_id=orders.u_id and users.id=user_profiles.u_id and orders.order_id='$order_id'";
        if($result=$conn->query($sql))
        {
            if($result->num_rows>0)
            {
                if ($row=$result->fetch_assoc()) 
                {
                    $data=$row;
                    $data['time_statmpts']=date("d M, Y", strtotime($row['time_statmpts']));
                    if($data['delivery_date'])
                    {
                        $data['delivery_date']=date("d M, Y", strtotime($row['delivery_date']));
                    }
                    $add=explode(" ",$row['shipping_address']);
                    $data['shipping_address']="";
                    foreach($add as $add)
                    {
                        $data['shipping_address'].=$add ." ";
                        if(substr($add, -1) == ",")
                            $data['shipping_address'].="<br/>";
                    }
                }
            }
            else
            {
                $sql="SELECT * from local_customers lc, orders where lc.id=orders.l_c_id and orders.order_id='$order_id'";
                if($result=$conn->query($sql))
                {
                    if($result->num_rows>0)
                    {
                        if ($row=$result->fetch_assoc()) 
                        {
                            $data=$row;
                            $data['time_statmpts']=date("d M, Y", strtotime($row['time_statmpts']));
                            
                            if($data['delivery_date'])
                            {
                                $data['delivery_date']=date("d M, Y", strtotime($row['delivery_date']));
                            }
                            
                            $add=explode(" ",$row['shipping_address']);
                            $data['shipping_address']="";
                            foreach($add as $add)
                            {
                                $data['shipping_address'].=$add ." ";
                                if(substr($add, -1) == ",")
                                    $data['shipping_address'].="<br/>";
                            }
                        }
                    }
                }
            }
          }
        echo json_encode($data);
    }

    //FETCH PRODUCTS FOR ORDER BASED ON ORDER ID
    if(isset($_POST['prod_id']))
    {
        $order_id=$_POST['prod_id'];
        
        $data=[];
        
        $sql="SELECT p.*, 'description' as detailed_description, oi.*, m.name as product_category from order_items oi, ";
        $sql.="products p left outer join menus m on m.id=p.m_id where oi.p_id=p.id and oi.o_id=(select id from orders where order_id='$order_id') ";
        $sql.="and oi.order_item_status!='cancel' group by p.id, oi.p_options order by p.name";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    if($row['order_item_status'] == "delivered")
                        $row['order_item_status']="Delivered";
                    $data[]=$row;
                }
                
                
                $sql="SELECT count(id) as total_item from order_items where o_id=(select id from orders where order_id='$order_id')";
                if($result=$conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        $row=$result->fetch_assoc();
                        $data[0]['final_total_items']=$row['total_item'];
                    }
                }
            }
        }
    
        echo json_encode($data);
    }

    //FETCH TAX DETAILS FOR ORDER BASED ON ORDER ID
    if(isset($_POST['tax_id']))
    {
        $order_id=$_POST['tax_id'];
        
        $taxes=[];
        
        
            $sql="select pt.product_id,t.name,t.charges,t.type from product_taxes as pt left outer join taxes as t on pt.tax_id=t.id having pt.product_id in (select p_id from order_items where o_id=(select id from orders where order_id='$order_id'))";
            if($result=$conn->query($sql)){
            if($result->num_rows>0){
              while ($row=$result->fetch_assoc()) {
               if (!in_array($row['name'], $taxes))
               {
                    $taxes[]=$row['name'];
               }
              }
            }
          }
        
        echo json_encode($taxes);
    }

    //FETCH COUPON DETAILS FOR ORDER BASED ON ORDER ID
    if(isset($_POST['coupon_id']))
    {
        $order_id=$_POST['coupon_id'];
        
        $coupon=[];
        
        
           $sql="select * from coupons where id=(select coupon_id from coupon_uses where o_id=(select id from orders where order_id='$order_id'))";
            $result=$conn->query($sql);
            if($result->num_rows > 0)
            {
                $coupon=$result->fetch_assoc();
            }

        echo json_encode($coupon);
    }
    
    //FETCH ORDER HISTORY BASED ON ORDER ID
    if(isset($_POST['history_id']))
    {
        $order_id=$_POST['history_id'];
        
        $order_history=[];
        
        
           $sql="SELECT * from order_history where o_id=(select id from orders where order_id='$order_id')";
          if($result=$conn->query($sql)){
            if($result->num_rows>0){
              while ($row=$result->fetch_assoc()) {
                  $row['timestamps']=date("d-M-Y",strtotime($row['timestamps']));
                  
                  $row['action']=ucwords($row['action']);
                    $order_history[]=$row;
              }
            }
          }

        echo json_encode($order_history);
    }
?>