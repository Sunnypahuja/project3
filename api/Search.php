<?php

require_once 'lib/core.php';

if(isset($_POST['search_testseries']))
{
    $result=[];
    $word=$_POST['search_for'];
    $sql="select * from programs_and_courses where name LIKE '%$word%'  and type='program'";
    if($res=$conn->query($sql))
    {
        if($res->num_rows)
        {
            while($row=$res->fetch_assoc())
            {
            $result['programs'][]=$row;
        }
        }

    }
    $sql="select * from programs_and_courses where name LIKE '%$word%' and type='course'";
    if($res=$conn->query($sql))
    {
        if($res->num_rows)
        {
            while($row=$res->fetch_assoc()){
            $result['courses'][]=$row;}
        }
    }

    echo json_encode($result);
}


if(isset($_POST['search_blog']))
{
    $result=[];
    $word=$_POST['search_for'];
    $sql="select * from dynamic_pages where page_name LIKE '%$word%'  and parent_id!=''";
    if($res=$conn->query($sql))
    {
        if($res->num_rows)
        {
            while($row=$res->fetch_assoc())
            {
                $result['data'][]=$row;
            }
        }

    }

    echo json_encode($result);
}