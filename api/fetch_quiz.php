<?php
    
    include_once 'lib/core.php'; 

    if(isset($_POST['fetch_quiz']))
    {
        $type = $_POST['quiz_type'];
        $data=[];
        $date = date('Y-m-d');
        $sql="select q.*, COALESCE(dp.title, pc.name, q.free_under) comes_under from quiz q left outer join dynamic_pages dp on dp.id=q.free_under left outer join programs_and_courses pc on pc.id=q.paid_under where q.type='$type' and q.available_from <= '$date' and q.available_to >= '$date' order by q.id desc ";
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

    if(isset($_POST['participatedQuiz']))
    {
        $type = $_POST['quiz_type'];
        $u_id = $_POST['user_id'];
        $status = $_POST['status'];
        $data=[];
        $date = date('Y-m-d');
        $sql="select q.* from quiz q, participated_quiz pq where pq.q_id=q.id and pq.u_id='$u_id' and  q.type='$type' and q.available_from <= '$date' and q.available_to >= '$date' and pq.status='$status' order by q.id desc ";
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
    if(isset($_POST['evaluatedQuiz']))
    {
        $u_id = $_POST['user_id'];
        $q_id=3;
        $data=[];
        $date = date('Y-m-d');
        $sql="select q.*, pq.u_id, pq.points_obtained from quiz q, participated_quiz pq where pq.q_id=q.id and pq.u_id='$u_id' and pq.status=3 order by q.id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $q_id=$row['id'];
                    if($row['type']=="mains")
                    {
                        $sql2="select file, description, marks from admin_quiz_ans where q_id=$q_id and u_id=$u_id";
                        if($res=$conn->query($sql2))
                        {
                            if($res->num_rows)
                            {
                                $row2=$res->fetch_assoc();
                                $row['file']  =$row2['file'];
                                $row['admin_desc']=$row2['description'];
                                $row['marks']=$row2['marks'];
                            }
                        }
                        $data[]=$row;
                    }
                    else
                    {      
                       $data[]=$row;
                    }
                }
            }
            else
            {
                $data['msg']="No Data Available";
            }
        }
        echo json_encode($data);
    }

    if(isset($_POST['allparticipated']))
    {
        $sql="select q_id from participated_quiz";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row['q_id'];
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="No Data Available";
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }

    if(isset($_POST['fetch_previous_quiz_student']))
    {
        $type=$_POST['quiz_type'];
        $sql="select * from quiz where type='$type' and prev_year=1";
        if($res=$conn->query($sql))
        {
            if($res->num_rows)
            {
                while($row=$res->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
            }
            $data['msg']="ok";
        }
        echo json_encode($data);
    }
?>