<?php
    require_once 'lib/core.php';
    
    $data['new_products']=0;
    $data['active_products']=0;
    $data['blocked_products']=0;
    $data['returns']=0;
    
    $data['customers']=0;
    $data['active_customers']=0;
    $data['blocked_customers']=0;
    
    $data['coupons']=0;
    $data['notifications']=0;
    $data['sms_sent']=0;
    
    $data['orders']=0;
    $data['pending_orders']=0;
    $data['cancelled_orders']=0;
    $data['email_subscribers']=0;

    $sql="select count(id) as oc from email_subscribe ";
    if($conn->query($sql))
    {
      if($result=$conn->query($sql))
      {
          if($result->num_rows>0)
          {
              $row=$result->fetch_assoc();
              $data['email_subscribers']=$row['oc'];
          }
      }
     }

    //FOR TOTAL ORDERS
    $sql="select count(id) as oc from orders where lower(order_status) not in('unplaced','failed')";
    if($conn->query($sql))
    {
      if($result=$conn->query($sql))
      {
          if($result->num_rows>0)
          {
              $row=$result->fetch_assoc();
              $data['orders']=$row['oc'];
          }
      }
     }

    //FOR PENDING ORDERS
    $sql="select count(id) as pending from orders where id in(select o_id from order_items) and ";
    $sql.="lower(order_status) not in('unplaced', 'cancelled', 'cancel', 'delivered','failed')";
    if($conn->query($sql))
    {
      if($result=$conn->query($sql))
      {
          if($result->num_rows>0)
          {
              $row=$result->fetch_assoc();
              $data['pending_orders']=$row['pending'];
          }
      }
     }

    //FOR DELIVERED ORDERS
    $sql="select count(id) as pending from orders where id in(select o_id from order_items) and lower(order_status)='delivered'";
    if($conn->query($sql))
    {
      if($result=$conn->query($sql))
      {
          if($result->num_rows>0)
          {
              $row=$result->fetch_assoc();
              $data['delivered_orders']=$row['pending'];
          }
      }
     }

    //FOR CANCELLED ORDERS
    $sql="select count(id) as cancelled from orders where id in(select o_id from order_items) and lower(order_status) in ('cancelled', 'cancel')";
    if($conn->query($sql))
    {
      if($result=$conn->query($sql))
      {
          if($result->num_rows>0)
          {
              $row=$result->fetch_assoc();
              $data['cancelled_orders']=$row['cancelled'];
          }
      }
     }

    //FOR TOTAL RETURNS
    $sql="select count(id) as count from return_orders where order_id in(select id from orders where id in(select o_id from order_items))";
    if($conn->query($sql))
    {
      if($result=$conn->query($sql))
      {
          if($result->num_rows>0)
          {
              while($row=$result->fetch_assoc()){
                $data['returns']=$row['count'];
              }
          }
      }
     }

    //FOR TOTAL CUSTOMERS
    $sql="SELECT count(id) as customers, (select count(id) from local_customers) as lc from users where type=3 and id in(select u_id from user_profiles)";
    if($conn->query($sql))
    {
      if($result=$conn->query($sql))
      {
          if($result->num_rows>0)
          {
              if($row=$result->fetch_assoc()){
                 $data['customers']=$row['customers']+$row['lc'];
              }
          }
      }
     }

    //FOR ACTIVE CUSTOMERS
    $sql="SELECT count(id) as active_customers, (select count(id) from local_customers) as lc from users where type=3 and id in(select u_id from user_profiles where lower(status)='enabled')";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['active_customers']=$row['active_customers']+$row['lc'];
                  }
              }
          }
     }
    
    //FOR BLOCKED CUSTOMERS
    $sql="SELECT count(id) as blocked_customers from users where type=3 and id in(select u_id from user_profiles where lower(status)='block')";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['blocked_customers']=$row['blocked_customers'];
                  }
              }
          }
     }

    //FOR NEW PRODUCTS
    $sql="SELECT count(id) as new_products from products";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['new_products']=$row['new_products'];
                  }
              }
          }
     }

    //FOR ACTIVE PRODUCTS
    $sql="SELECT count(id) as active_products from products where lower(status)='active'";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['active_products']=$row['active_products'];
                  }
              }
          }
     }

    //FOR BLOCKED PRODUCTS
    $sql="SELECT count(id) as blocked_products from products where lower(status)='block'";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['blocked_products']=$row['blocked_products'];
                  }
              }
          }
     }

    //FOR COUPONS
    $sql="SELECT count(id) as c from coupons";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['coupons']=$row['c'];
                  }
              }
          }
     }

    //FOR SMS SENT
    $sql="SELECT COALESCE(sum(receivers),0) as s from sms_sent";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['sms_sent']=$row['s'];
                  }
              }
          }
     }

    //FOR NOTIFICATIONS SENT
    $sql="SELECT COALESCE(sum(receivers),0) as s from notifications_sent";
    if($conn->query($sql))
    {
          if($result=$conn->query($sql))
          {
              if($result->num_rows>0)
              {
                  if($row=$result->fetch_assoc()){
                     $data['notifications']=$row['s'];
                  }
              }
          }
     }

    echo json_encode($data);
?>