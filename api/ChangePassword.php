<?php
    require_once 'lib/core.php';

    if(isset($_POST['changePassword']))
    {
        $id=$_POST['changePassword'];
        $newPass=md5($_POST['newPass']);
        $uoldPass=md5($_POST['oldPass']);
        $sql="select * from teachers where id='$id'";
        if($res = $conn->query($sql))
        {
            if($res->num_rows)
            {
                $row=$res->fetch_assoc();
                $oldPass=$row['password'];
            }
        }
        if($uoldPass==$oldPass)
        {
            $sql="update teachers set password='$newPass' where id='$id'";
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
            $data['msg']="Password Mismatched";
        }

        echo json_encode($data);
    }
?>