<?php

require_once 'lib/core.php';

if(isset($_POST['fetch_DashboardData']))
{
    $sql="select * from quiz where status='active' order by added_on desc LIMIT 1";
    if($result=$conn->query($sql))
    {
        if($result->num_rows)
        {
            $row=$result->fetch_assoc();
            $date = explode('-', $row['available_from']);
            $row['year'] = $date[0];
            $row['month'] = $date[1];
            $row['day'] = $date[2];
            $sql="select count(id) as count_quiz from quiz where status='active'";
            if($result=$conn->query($sql))
            {
                if($result->num_rows)
                {
                    $row2=$result->fetch_assoc();
                    $row['count_quiz']=$row2['count_quiz'];
                    $sql="select count(id) as count_prog from programs_and_courses where type='program' and status='active'";
                    if($result=$conn->query($sql))
                    {
                        if($result->num_rows)
                        {
                            $row3=$result->fetch_assoc();
                            $row['count_prog']=$row3['count_prog'];
                            $sql="select count(id) as count_course from programs_and_courses where type='course' and status='active'";
                            if($result=$conn->query($sql))
                            {
                                if($result->num_rows)
                                {
                                    $row4=$result->fetch_assoc();
                                    $row['count_course']=$row4['count_course'];
                                }
                            }
                        }
                    }
                }
            }
            $data['data'][]=$row;
        }
    }
    $sql="select * from programs_and_courses where type='course' and status='active' order by added_on desc LIMIT 3";
    if($result=$conn->query($sql))
    {
        if($result->num_rows)
        {
            while($row=$result->fetch_assoc())
            {
                $data['coursedata'][]=$row;
            }
        }
    }
    
    
    
    echo json_encode($data);
}
?>