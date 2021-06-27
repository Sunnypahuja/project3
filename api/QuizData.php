<?php
    
    include_once 'lib/core.php'; 

    if(isset($_POST['fetch_quiz']))
    {
        $status = $_POST['status']; 

         $sql="select q.*, pq.u_id, pq.q_id, qa.user_option, qa.file, up.f_name, up.l_name, pq.quiz_type from quiz q, user_profiles up, participated_quiz pq, users u, user_quiz_ans qa where pq.q_id=q.id and pq.status='$status' and pq.u_id=u.id and qa.user_id=pq.u_id and qa.quiz_id=pq.q_id and u.id=up.u_id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
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
    
    if(isset($_POST['fetch_quiz_teacher']))
    {
        $status = $_POST['status']; 
        $t_id = $_POST['t_id']; 
        $sql="select q.*, a.u_id, a.id as aid, a.q_id, qa.user_option, qa.file, up.f_name, up.l_name, pq.quiz_type from quiz q, user_profiles up, participated_quiz pq, users u, user_quiz_ans qa, admin_quiz_ans a where a.q_id=q.id and pq.status='$status' and a.t_id=$t_id and a.u_id=u.id and qa.user_id=a.u_id and qa.quiz_id=a.q_id and u.id=up.u_id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
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
    
    if(isset($_POST['markAsEvaluated']))
    {
        $u_id = $_POST['u_id'];
        $q_id = $_POST['q_id'];
        $t_id = $_POST['t_id'];
       
        $sql="insert into admin_quiz_ans(q_id, u_id, t_id) values('$q_id','$u_id', '$t_id')";
        if($conn->query($sql))
        {
            $sql="update participated_quiz set status=4 where q_id='$q_id' and u_id='$u_id'";
            if($conn->query($sql))
            {
                $data['msg']="ok";
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }
    if(isset($_POST['markAsEvaluatedTeacher']))
    {
        $u_id = $_POST['u_id'];
        $q_id = $_POST['q_id'];
        $t_id = $_POST['t_id'];
        $a_id = $_POST['a_id'];
        $marks = $_POST['marks'];
        $description = $_POST['description'];
       
        $sql="update admin_quiz_ans set marks='$marks', description='$description' where q_id='$q_id' and u_id='$u_id' and t_id='$t_id' and id='$a_id'";
        if($conn->query($sql))
        {
            $insert_id=$conn->insert_id;
            $sql="update participated_quiz set status=5 where q_id='$q_id' and u_id='$u_id'";
            if($conn->query($sql))
            {
                if($_FILES)
                {
                    if(upload_files2($_FILES,$conn,"admin_quiz_ans","id","file",$a_id,"file","uploads"))
                    {
                        $data['msg']= "ok";
                    }
                    else
                    {
                        $data['msg'] = "File Not Uploaded";
                    }
                }
                else
                {
                    $data['msg']= "ok";
                }
            }
            else
            {
                $data['msg']=$conn->error;
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }

    if(isset($_POST['edit_quizresult']))
    {
        $marks=$_POST['marks'];
        $description=$_POST['description'];
        $id=$_POST['eid'];
        $sql="update admin_quiz_ans set marks='$marks', description='$description' where id=$id";
        if($conn->query($sql))
        {
            if($_FILES)
            {
                if(upload_files2($_FILES,$conn,"admin_quiz_ans","id","file",$id,"file","uploads"))
                {
                    $data['msg']= "ok";
                }
                else
                {
                    $data['msg'] = "File Not Uploaded";
                }
            }
            else
            {
                $data['msg']= "ok";
            }
        }
        echo json_encode($data);
    }

    if(isset($_POST['fetch_evaluatedquiz']))
    {
        $status = $_POST['status']; 

         $sql="select  aa.*, q.title, q.total_points, up.f_name, up.l_name, pq.points_obtained from participated_quiz pq, admin_quiz_ans aa, users u, user_profiles up, quiz q where aa.q_id=q.id and aa.u_id=u.id and up.u_id=u.id and pq.q_id=aa.q_id and pq.u_id=aa.u_id and pq.status=3";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
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
    if(isset($_POST['fetch_pendingquiz']))
    {
        $status = $_POST['status']; 

         $sql="select  aa.*, q.title, q.total_points, up.f_name, up.l_name, pq.points_obtained from participated_quiz pq, admin_quiz_ans aa, users u, user_profiles up, quiz q where aa.q_id=q.id and aa.u_id=u.id and up.u_id=u.id and pq.q_id=aa.q_id and pq.u_id=aa.u_id and pq.status=5";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
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

    if(isset($_POST['deleteFile']))
    {
        $id=$_POST['deleteFile'];
        $sql="update admin_quiz_ans set file='' where id=$id";
        if($conn->query($sql))
        {
            $data['msg']="ok";
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }

    if(isset($_POST['showToStudents']))
    {
        $qid=$_POST['qid'];
        $uid=$_POST['uid'];
        $sql="update participated_quiz set status=3 where q_id=$qid and u_id=$uid";
        if($conn->query($sql))
        {
            $data['msg']="ok";
        }
        else
        {
            $data['msg']="error";
        }
        
        echo json_encode($data);
    }


    if(isset($_POST['fetch_recentQuizes']))
    {
        

         $sql="select * from quiz where status='active' order by added_on desc limit 6";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
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
?>