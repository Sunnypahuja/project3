<?php
    require_once 'lib/core.php';

    //FETCH COUPONS
    if(isset($_POST['coupons']))
    {
        $sql="select * from coupons";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    if($row['coupon_type'] == "p")
                    {
                        $row['coupon_type']="Percentage";
                    }
                    else
                    {
                        $row['coupon_type']="Fixed Amount";
                    }
                    
                    $row['applied_to']=ucwords($row['applied_to']);
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //FETCH DETAILS OF PARTICULAR COUPON
    if(isset($_POST['edit_coupon']))
    {
        $sql="select * from coupons where id=".$_POST['edit_coupon'];
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                if($row=$result->fetch_assoc())
                {
                    $row['categories'] = null;
                    $row['brands'] = null;
                    $row['home_and_kitchen'] = null;
                    $row['products'] = null;
                    
                    if(isset($row['option_ids']))
                    {
                        if($row['applied_to'] == "category")
                        {
                            //FETCH SELECTED CATEGORIES FOR CURRENT COUPON
                            $sql="select id as value, name as label from menus where id in(".$row['option_ids'].")";
                            if($res=$conn->query($sql))
                            {
                                $categories=[];
                                if($res->num_rows)
                                {
                                    while($c = $res->fetch_assoc())
                                    {
                                        $categories[]=$c;
                                    }
                                    $row['categories'] = $categories;
                                }
                            }
                        }
                        else if($row['applied_to'] == "brand")
                        {
                            //FETCH SELECTED PRODUCTS FOR CURRENT COUPON
                            $sql="select id as value, name as label from brand_stores where id in(".$row['option_ids'].")";
                            if($res=$conn->query($sql))
                            {
                                $categories=[];
                                if($res->num_rows)
                                {
                                    while($c = $res->fetch_assoc())
                                    {
                                        $categories[]=$c;
                                    }
                                    $row['brands'] = $categories;
                                }
                            }
                        }
                        else if($row['applied_to'] == "home_and_kitchen")
                        {
                            //FETCH SELECTED PRODUCTS FOR CURRENT COUPON
                            $sql="select id as value, name as label from home_and_kitchen where id in(".$row['option_ids'].")";
                            if($res=$conn->query($sql))
                            {
                                $categories=[];
                                if($res->num_rows)
                                {
                                    while($c = $res->fetch_assoc())
                                    {
                                        $categories[]=$c;
                                    }
                                    $row['home_and_kitchen'] = $categories;
                                }
                            }
                        }
                        else if($row['applied_to'] == "product")
                        {
                            //FETCH SELECTED PRODUCTS FOR CURRENT COUPON
                            $sql="select id as value, name as label from products where id in(".$row['option_ids'].")";
                            if($res=$conn->query($sql))
                            {
                                $categories=[];
                                if($res->num_rows)
                                {
                                    while($c = $res->fetch_assoc())
                                    {
                                        $categories[]=$c;
                                    }
                                    $row['products'] = $categories;
                                }
                            }
                        }
                    }
                    
                    $data[]=$row;
                }
            }
            echo json_encode($data);
        }
    }

    //FETCH ALL EMAIL SUBSCRIBERS LIST
    if(isset($_POST['email_subscribers']))
    {
        $data=[];
        $sql="select * from email_subscribe order by id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
        }
        echo json_encode($data);
    }
?>