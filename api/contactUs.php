<?php
    require_once 'lib/core.php';

    if(isset($_POST['contact_us']))
    {
        $result=[];
        $f_name=$conn -> real_escape_string($_POST['f_name']);
        $l_name=$conn -> real_escape_string($_POST['l_name']);
        $email=$conn -> real_escape_string($_POST['email']);
        $message=$conn -> real_escape_string($_POST['message']);
        $contact=$conn -> real_escape_string($_POST['contact_number']);
        $sql="insert into contact_us(f_name, l_name, m_num, message, email) values('$f_name', '$l_name', '$contact', '$message', '$email')";
        if($conn ->query($sql))
        {
            $result['msg']="success";
        }
        else
        {
            $result['msg']=$conn->error;
        }
        echo json_encode($result);
    }
?>