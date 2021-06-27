<?php
header('Access-Control-Allow-Origin: *');
    require_once 'lib/core.php';
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if(isset($_POST['fetch_quiz_question']))
        {
            $quiz_id = $_POST['fetch_quiz_question'];
            $data=[];
            $sql ="SELECT qq.*, q.total_points, qo.option_value from quiz_questions qq , quiz q, quiz_options qo where qq.quiz_id=$quiz_id and qo.question_id=qq.id and q.id=qq.quiz_id";
            if($result = $conn->query($sql))
            {
                
                if($result->num_rows)
                {
                    
                    while($row = $result->fetch_assoc())
                    {
                        $data['quiz_points'] = $row['total_points'];
                        $data[$row['id']]['question_id'] = $row['id'];
                        $data[$row['id']]['question']=$row['question'];
                        $data[$row['id']]['correct_ans']=$row['correct_answer'];
                        $data[$row['id']]['options'][]=$row['option_value']; 
                        $data[$row['id']]['explanation']=$row['explanation']; 
                        
                    } 
                   
                }
            }
           
           echo json_encode($data);
        }
    }

    if(isset($_POST['fetch_pquiz']))
    {
        $qid=$_POST['fetch_pquiz'];
        $uid=$_POST['user_id'];
        $sql="select count(id) as count from participated_quiz where q_id='$qid' and u_id='$uid'";
        if($result = $conn->query($sql))
        {
            
            if($result->num_rows)
            {
                $row = $result->fetch_assoc();
                $data['msg']="participated";
                $data['count']=$row['count'];
                $sql = "select q_id as question_id,user_option as option_id,status from user_quiz_ans where quiz_id = $qid";
                if($result = $conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        while($row = $result->fetch_assoc())
                        {
                            $data['quiz_ans'][$row['question_id']]=$row;
                        }
                    }
                }
            }
            else
            {
                $data['msg']="not_participated";
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }

?>