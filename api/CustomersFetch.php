<?php
    require_once 'lib/core.php';
    
    //LOCAL CUSTOMERS   
    if(isset($_POST['local']))
    {
        $sql="select lc.*, COALESCE(count(os.id), 0) as orders, COALESCE(sum(os.order_amount),0) as total_amount,'N.A.' as last_purchase from local_customers lc left outer join orders os on os.l_c_id=lc.id group by lc.id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    if($row['orders'] > 0)
                    {
                        $sql="select time_statmpts as time_stampt from orders where l_c_id=".$row['id']." order by id desc limit 1";
                        if($res=$conn->query($sql))
                        {
                            if($res->num_rows)
                            {
                                $st=$res->fetch_assoc();
                                $row['last_purchase']=date("d M, Y",strtotime($st['time_stampt']));
                            }
                        }
                    }
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //LOCAL CUSTOMERS FOR AGENT PANEL   
    if(isset($_POST['local_agent']))
    {
        $id=test_input($_POST['local_agent']);
            
        $sql="select lc.*, COALESCE(count(os.id), 0) as orders, COALESCE(sum(os.order_amount),0) as total_amount,'N.A.' as last_purchase from local_customers lc left outer join orders os on os.l_c_id=lc.id where lc.agent_id=$id group by lc.id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    if($row['orders'] > 0)
                    {
                        $sql="select time_statmpts as time_stampt from orders where l_c_id=".$row['id']." order by id desc limit 1";
                        if($res=$conn->query($sql))
                        {
                            if($res->num_rows)
                            {
                                $st=$res->fetch_assoc();
                                $row['last_purchase']=date("d M, Y",strtotime($st['time_stampt']));
                            }
                        }
                    }
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //ACTIVE CUSTOMERS
    if(isset($_POST['active']))
    {
        $sql="select p.id, p.u_id, p.f_name, p.l_name, p.contact, p.gender, p.w_money,p.status, u.email, COALESCE(count(o.id),0) as orders, COALESCE(sum(o.order_amount),0) as total_amount,'N.A.' as address,'N.A.' as last_purchase from user_profiles as p,users as u left outer join orders o on o.u_id=u.id where p.u_id=u.id and status='Enabled' and u.type=3 group by u.id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    if($row['orders'] > 0)
                    {
                        $sql="select shipping_address, time_statmpts from orders where u_id=".$row['u_id']." order by id desc limit 1";
                        if($res=$conn->query($sql))
                        {
                            if($res->num_rows)
                            {
                                $st=$res->fetch_assoc();
                                $row['address']=$st['shipping_address'];
                                $row['last_purchase']=date("d M, Y",strtotime($st['time_statmpts']));
                            }
                        }
                    }
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //BLOCK CUSTOMERS
    if(isset($_POST['block']))
    {
        $sql="select p.id, p.u_id, p.f_name, p.l_name, p.contact, p.gender, p.block_reason, p.w_money,p.status, u.email,  COALESCE(count(o.id),0) as orders, COALESCE(sum(o.order_amount),0) as total_amount,'N.A.' as address,'N.A.' as last_purchase from user_profiles as p,users as u left outer join orders o on o.u_id=u.id where p.u_id=u.id and status='Block' and u.type=3 group by u.id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    if($row['orders'] > 0)
                    {
                        $sql="select shipping_address, time_statmpts from orders where u_id=".$row['u_id']." order by id desc limit 1";
                        if($res=$conn->query($sql))
                        {
                            if($res->num_rows)
                            {
                                $st=$res->fetch_assoc();
                                $row['address']=$st['shipping_address'];
                                $row['last_purchase']=date("d M, Y",strtotime($st['time_statmpts']));
                            }
                        }
                    }
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //GET ADDRESSES OF A CUSTOMER
    if(isset($_POST['customer_addresses']))
    {
        $data=[];
        
        $id=test_input($_POST['customer_addresses']);
        $sql="select * from address where u_id=$id";
        if($result = $conn->query($sql))
        {
            while($row=$result->fetch_assoc())
            {
                $data[]=$row;
            }
        }
        
        echo json_encode($data);
    }

	//GIVE DEFAULT ADDRESS TYPE FOR USER
	if(isset($_POST['default_address']))
	{
		$user_id=test_input($_POST['default_address']);
		$sql="select address_type from address where u_id=$user_id and is_default=1";
		if($result = $conn->query($sql))
		{
			if($result->num_rows)
			{
				$row=$result->fetch_assoc();
				echo $row['address_type'];
			}
			else
			{
				echo '';
			}
		}
		else
		{
			echo $conn->error;
		}
	}

?>