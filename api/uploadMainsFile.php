<?php
header('Access-Control-Allow-Origin: *');
    require_once 'lib/core.php';
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if(isset($_POST['uploadFile']))
        {
            $quiz_id = $_POST['quiz_id']; 
            $user_id = $_POST['user_id']; 
            $type = $_POST['quiz_type']; 
            // $sql="select * from user_quiz_ans where quiz_id='$quiz_id' and user_id='$user_id'";
            // if($result=$conn->query($sql))
            // {
            //     if($result->num_rows)
            //     {
            //         $data['msg']="You Have Already Participated";
            //     }
            //     else
            //     {
                    $sql = "INSERT into user_quiz_ans (quiz_id,user_id, quiz_type, status) values('$quiz_id','$user_id', '$type', 1)";
                    if($conn->query($sql))
                    {
                        $insert_id=$conn->insert_id;
                        $sql = "UPDATE participated_quiz set status=2 where q_id='$quiz_id' and u_id='$user_id'";
                        if($conn->query($sql))
                        {
                            if(upload_files2($_FILES,$conn,"user_quiz_ans","id","file",$insert_id,"file","uploads"))
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
                            $data['msg']= "Something Went Wrong";   
                        } 
                    }
                    else
                    {
                        $data['msg']= "Something Went Wrong";   
                    } 
                // }
            // else
            // {
            //     $data['msg']="error";
            // }  
        }
        echo json_encode($data);
    }

?>