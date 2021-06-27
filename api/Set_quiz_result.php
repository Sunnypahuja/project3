<?php
header('Access-Control-Allow-Origin: *');
    require_once 'lib/core.php';
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if(isset($_POST['set_quiz_result']))
        {
            $quiz_id = $_POST['quiz_id']; 
            $user_id = $_POST['user_id']; 
            $points = $_POST['points']; 
            $question_data = json_decode($_POST['questionData']); 

            $sql = "INSERT into user_quiz_ans (quiz_id,user_id,q_id,user_option,status) values";
            foreach($question_data as $question)
            {
                $question_id = $question->question_id;
                $option_id = $question->option_id;
                $status = $question->status;
                $sql .="('$quiz_id','$user_id','$question_id','$option_id','$status'),";
            }
             $sql = rtrim($sql,",");

            if($conn->query($sql))
            {
                $sql="update participated_quiz set status=3, points_obtained=$points where q_id='$quiz_id' and u_id='$user_id'";
                if($conn->query($sql))
                {
                    $data['msg']= "ok";
                }
                else
                {
                    $data['msg']= "error";
                }
            }
            else
            {
                $data['msg']= $conn->error;
            }
             
        }
        echo json_encode($data);
    }

?>