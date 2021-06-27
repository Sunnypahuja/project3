<?php
    require_once 'lib/core.php';
    
    //PENDING ORDERS - placed
    if(isset($_POST['pending']))
    {
        $data=[];
        if(isset($_POST['current_agent']))
        {
            $id=test_input($_POST['current_agent']);
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where o.order_status = 'placed' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        }
        else
        {
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where o.order_status = 'placed' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) order by o.id desc";
        }
        if(isset($sql))
        {
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    while($row=$result->fetch_assoc())
                    {
                        $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                        $data[]=$row;
                    }
                }
            }
        }
        echo json_encode($data);
    }

    //AUDIO ORDERS
    if(isset($_POST['audio_orders']))
    {
        $data=[];
        $sql="select ao.*,up.f_name, up.l_name,up.contact from audio_orders ao, user_profiles up where ao.user_id=up.u_id order by ao.status,ao.time_stamp desc";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $row['time_stamp']=date("d M, Y h:i A",strtotime($row['time_stamp']));
                    $data[]=$row;
                }
            }
        }
        echo json_encode($data);
    }

    //DELIVERED ORDERS - delivered
    if(isset($_POST['delivered']))
    {
        $data=[];
        if(isset($_POST['current_agent']))
        {
            $id=test_input($_POST['current_agent']);
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'delivered' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        }
        else
        {
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'delivered' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) order by o.id desc";
        }
        if(isset($sql))
        {
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    while($row=$result->fetch_assoc())
                    {
                        $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                        $data[]=$row;
                    }
                }
            }
        }
        echo json_encode($data);
    }

    //CANCELLED ORDERS - delivered
    if(isset($_POST['cancel']))
    {
        $data=[];
        if(isset($_POST['current_agent']))
        {
            $id=test_input($_POST['current_agent']);
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'cancel' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        }
        else
        {
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'cancel' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) order by o.id desc";
        }
        if(isset($sql))
        {
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    while($row=$result->fetch_assoc())
                    {
                        $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                        $data[]=$row;
                    }
                }
            }
        }
        echo json_encode($data);
    }

    //FAILED ORDERS -failed
    if(isset($_POST['failed']))
    {
        $data=[];
        if(isset($_POST['current_agent']))
        {
            $id=test_input($_POST['current_agent']);
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'failed' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        }
        else
        {
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'failed' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) order by o.id desc";
        }
        if(isset($sql))
        {
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    while($row=$result->fetch_assoc())
                    {
                        $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                        $data[]=$row;
                    }
                }
            }
        }
        echo json_encode($data);
    }

    //PACKED ORDERS - packed
    if(isset($_POST['packed']))
    {
        $data=[];
        if(isset($_POST['current_agent']))
        {
            $id=test_input($_POST['current_agent']);
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'packed' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        }
        else
        {
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'packed' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) order by o.id desc";
        }
        if(isset($sql))
        {
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    while($row=$result->fetch_assoc())
                    {
                        $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                        $data[]=$row;
                    }
                }
            }
        }
        echo json_encode($data);
    }

    //PROCESS ORDERS - process
    if(isset($_POST['process']))
    {
        $data=[];
        if(isset($_POST['current_agent']))
        {
            $id=test_input($_POST['current_agent']);
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'confirmed/in process' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        }
        else
        {
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'confirmed/in process' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) order by o.id desc";
        }
        if(isset($sql))
        {
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    while($row=$result->fetch_assoc())
                    {
                        $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                        $data[]=$row;
                    }
                }
            }
        }
        echo json_encode($data);
    }

    //SHIPPED ORDERS - shipped
    if(isset($_POST['shipped']))
    {
        $data=[];
        if(isset($_POST['current_agent']))
        {
            $id=test_input($_POST['current_agent']);
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'on the way' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        }
        else
        {
            $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
            $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
            $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
            $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
            $sql.=" where lower(o.order_status) = 'on the way' and (o.u_id is not null or o.l_c_id is not null) and ";
            $sql.=" o.id in(select o_id from order_items) and ";
            $sql.=" o.id not in(select order_id from return_orders) order by o.id desc";
        }
        if(isset($sql))
        {
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    while($row=$result->fetch_assoc())
                    {
                        $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                        $data[]=$row;
                    }
                }
            }
        }
        echo json_encode($data);
    }

    //ORDER STATUSES
    if(isset($_POST['order_status']))
    {
        $sql="select * from order_status";

        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows>0)
            {
                while($row=$result->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //PENDING ORDERS - placed
    if(isset($_POST['pending_agent']))
    {
        $id=test_input($_POST['pending_agent']);
        
        $sql="select o.*, COALESCE(lc.name, concat(up.f_name,' ',up.l_name)) as name, COALESCE(lc.contact, up.contact) as contact, ";
        $sql.=" COALESCE(a.name,'N.A.') as agent_name, COALESCE(ac.commission,'N.A.') as commission ";
        $sql.=" from orders o left outer join user_profiles up on o.u_id=up.u_id left outer join local_customers lc on o.l_c_id=lc.id ";
        $sql.="left outer join agents a on o.agent_id=a.id left outer join agent_commissions ac on  ac.order_id=o.id and ac.agent_id=a.id ";
        $sql.=" where o.order_status = 'placed' and (o.u_id is not null or o.l_c_id is not null) and ";
        $sql.=" o.id in(select o_id from order_items) and ";
        $sql.=" o.id not in(select order_id from return_orders) and o.agent_id=$id order by o.id desc";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $row['time_statmpts']=date("d M, Y",strtotime($row['time_statmpts']));
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //GET ALL STATES
    if(isset($_POST['get_states']))
    {
        $data=[];
        $sql="select distinct(state) from statesandcity order by state";
        if($result = $conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row = $result->fetch_assoc())
                {
                    $data['states'][]=$row;
                }
                $data['cities']=[];
                $sql="select distinct(city) from statesandcity where state='".$data['states'][0]['state']."' order by city";
                if($result = $conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        while($row = $result->fetch_assoc())
                        {
                            $data['cities'][]=$row;
                        }
                    }
                }
            }
        }
        
        echo json_encode($data);
    }

    //GET CITIES FOR PARTICULAR STATE
    if(isset($_POST['get_city']))
    {
        $data=[];
        $sql="select distinct(city) from statesandcity where state='".$_POST['get_city']."' order by city";
        if($result = $conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row = $result->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
        }
        
        echo json_encode($data);
    }
?>