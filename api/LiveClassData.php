<?php
    require_once 'lib/core.php';
    require_once 'lib/WiZiQ/create.php';
    require_once 'lib/WiZiQ/ModifyClass.php';
    require_once 'lib/WiZiQ/AddAttendee.php';
    require_once 'lib/WiZiQ/CancelClass.php';

    if(isset($_POST['fetch_classData']))
    {
        $status=$_POST['class_status'];
        $sql="select c.*, t.name as t_name, pc.name as p_name from live_class c, teachers t, programs_and_courses pc where c.teacher=t.id and c.course_or_prg=pc.id and c.status='$status'";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while ($row=$result->fetch_assoc()) 
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="No Class Available";
            }
        }
        else
        {
            $data['msg']="Something Went Wrong";
        }

        echo json_encode($data);
    }
    
    if(isset($_POST['add_abcd']))
    {
        $type=$_POST['type'];
        $title=$_POST['class_title'];
        $tech=$_POST['teacher'];
        $teacher=explode("@",$tech);
        $teacher_id=$teacher[0];
        $teacher_name=$teacher[1];
        $date=$_POST['date'];
        $time=$_POST['time'];
        $choice=$_POST['choice'];

        $obj= ScheduleClass($secretAcessKey,$access_key,$webServiceUrl,$date, $time,$teacher_id,$teacher_name,$title);
        if($obj['status'])
        {
            $presenter_url=$obj['presenter_url'];
            $recording_url=$obj['recording_url'];
            $class_id=$obj['classid'];
            $sql="insert into live_class(type, course_or_prg, teacher, date, time, presenting_url, recording_url, class_id, class_title, status) values('$type', '$choice', '$teacher_id', '$date', '$time', '$presenter_url', '$recording_url', '$class_id', '$title', 1)";
            if($conn->query($sql))
            {
                $data['msg']="ok";   
            }
            else
            {
                $data['msg']=$conn->error;
            }
        }
        else
        {
            $data['msg']=$obj['error_msg'];
        }
        echo json_encode($data);
    }
    
    
    if(isset($_POST['edit_abcd']))
    {
        $type=$_POST['etype'];
        $title=$_POST['eclass_title'];
        $eid=$_POST['edit_abcd'];
        $tech=$_POST['eteacher'];
        $teacher=explode("@",$tech);
        $teacher_id=$teacher[0];
        $teacher_name=$teacher[1];
        $date=$_POST['edate'];
        $time=$_POST['etime'];
        $class_id=$_POST['eclass_id'];
        $class_title=$_POST['eclass_title'];
        $choice=$_POST['echoice'];
        $obj=ModifyClass($secretAcessKey,$access_key,$webServiceUrl, $class_id, $class_title, $teacher_id, $teacher_name, $date, $time);
        if($obj['status'])
        {
            $sql="update live_class set type='$type', course_or_prg='$choice', teacher='$teacher_id', date='$date', time='$time', class_title='$title' where id='$eid'";
            if($conn->query($sql))
            {
                $data['msg']="ok";   
            }
            else
            {
                $data['msg']=$conn->error;
            }
        }
        else
        {
            $data['msg']=$obj['error_msg'];
        }
        echo json_encode($data);
    }
    
    if(isset($_POST['delete_abcd']))
    {
        $eid=$_POST['delete_abcd'];
        $class_id=$_POST['class_id'];
        $obj=CancelClass($secretAcessKey,$access_key,$webServiceUrl,$class_id);
        if($obj['status'])
        {
            $sql="delete from live_class where id='$eid'";
            if($conn->query($sql))
            {
                $data['msg']="ok";   
            }
            else
            {
                $data['msg']=$conn->error;
            }
        } 
        else
        {
            $data['msg']=$obj['errormsg'];
        }   
        echo json_encode($data);
    }

    if(isset($_POST['fetch_classList']))
    {
        $c_id=$_POST['course_id'];
        $current=date("Y-m-d H:i:s");

        $sql="select c.*, t.name as t_name, pc.name as p_name from live_class c, teachers t, programs_and_courses pc where c.teacher=t.id and c.course_or_prg=$c_id and c.course_or_prg=pc.id and c.status=1";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while ($row=$result->fetch_assoc()) 
                {
                    $classtime=$row['date']." ".$row['time'].":00";
                    $nInterval = strtotime($classtime) - strtotime($current);
                    $row['timeleft']=$nInterval;
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="No Class Available";
            }
        }
        else
        {
            $data['msg']="Something Went Wrong";
        }
        echo json_encode($data);
    }

    if(isset($_POST['add_attendee']))
    {
        $cid=$_POST['add_attendee'];
        $uid=$_POST['user_id'];
        $obj=AddAttendee($secretAcessKey,$access_key,$webServiceUrl, $cid);
        $url=$obj['url'];
        $attendee_id=$obj['id'];
        $url=$obj['url'];
        $time=date('H:i:s');
        if($obj['status'])
        {
            $sql="insert into user_liveclass(url, join_time, attendee_id, class_id,status, u_id) values('$url', '$time', $attendee_id, $cid, 1, $uid)";
            if($conn->query($sql))
            {
                $data['msg']="ok";  
                $data['url']=$url;  
            }
            else
            {
                $data['msg']=$conn->error;
            } 
        }
        else
        {
            $data['msg']=$obj['errormsg'];
        }
        echo json_encode($data);
    }

    if(isset($_POST['ClassEnd']))
    {
        $class_id=$_POST['class_id'];
        $time=date('H:i:s');
        $sql="update live_class set status=2 and end_time=$time where class_id='$class_id'";
        if($conn->query($sql))
        {
            $data['msg']="ok";
        }
        else
        {
            $data['msg']=$conn->error;
        }
    }

    if(isset($_POST['fetch_userclassdata']))
    {
        $status=$_POST['class_status'];
        $uid=$_POST['user_id'];
        $sql="select c.*, t.name as t_name, pc.name as p_name from live_class c, teachers t, programs_and_courses pc where c.teacher=t.id and c.course_or_prg=pc.id and c.status='$status'";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while ($row=$result->fetch_assoc()) 
                {
                    $cid=$row['class_id'];
                    $sql2="select count(id) as count from user_liveclass where class_id='$cid' and u_id='$uid'";
                    if($res=$conn->query($sql2))
                    {
                        if($res->num_rows)
                        {
                            $row2=$res->fetch_assoc(); 
                            if($row2['count']==0)
                            {
                                $row['attend_status']="Not Attended";
                            }
                            else
                            {
                                $row['attend_status']="Attended";
                            }
                            $data['data'][]=$row;
                        } 
                    }
                    else
                    {
                        $data['msg']=$conn->error;
                    }

                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="No Class Available";
            }
        }
        else
        {
            $data['msg']="Something Went Wrong";
        }

        echo json_encode($data);
    }
    
    if(isset($_POST['fetch_teacherLiveClass']))
    {
        $id=$_POST['teacher_id'];
        $sql="select c.*, pc.name from live_class c, programs_and_courses pc where c.status=1 and c.teacher='$id' and c.course_or_prg=pc.id";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while ($row=$result->fetch_assoc()) 
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="No Class Available";
            }
        }
        else
        {
            $data['msg']="Something Went Wrong";
        }
        echo json_encode($data);
    }
    
    if(isset($_POST['fetch_teacherPastLiveClass']))
    {
        $id=$_POST['teacher_id'];
        $sql="select c.*, pc.name from live_class c, programs_and_courses pc where c.status=2 and c.teacher='$id' and c.course_or_prg=pc.id";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while ($row=$result->fetch_assoc()) 
                {
                    $cid=$row['class_id'];
                    $sql="select count(id) as count from user_liveclass where class_id=$cid group by u_id";
                    if($result=$conn->query($sql))
                    {
                        if($result->num_rows)
                        {
                            $row2=$result->fetch_assoc();
                            $row['count_user']=$row2['count'];
                        }
                    }
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="No Class Available";
            }
        }
        else
        {
            $data['msg']="Something Went Wrong";
        }
        echo json_encode($data);
    }

?>

