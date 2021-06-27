<?php
include_once 'lib/core.php'; 
if(isset($_POST['paticipateUser']))
{
    $type = $_POST['quiz_type'];
    $q_id = $_POST['quiz_id'];
    $u_id = $_POST['user_id'];
    $sql="insert into participated_quiz(q_id, u_id, quiz_type, status) values('$q_id', '$u_id','$type', 1)";
    if($conn->query($sql))
    {
        $data['msg']="ok";
    } 
    else
    {
        $data['msg']="Something Went Wrong";
    }
    
    echo json_encode($data);
}
if(isset($_POST['fetch_result']))
{
    $qid = $_POST['fetch_result'];
    $uid = $_POST['user_id'];
    $sql="select * from admin_quiz_ans where q_id=$qid and u_id=$uid";
    if($result=$conn->query($sql))
    {
        if($result->num_rows)
        {
            $row=$result->fetch_assoc();
            $data['data'][]=$row;
        }
        $data['msg']="ok";
    } 
    else
    {
        $data['msg']="Something Went Wrong";
    }
    
    echo json_encode($data);
}
?>