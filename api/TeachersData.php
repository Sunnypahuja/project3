<?php
    require_once 'lib/core.php';

    if(isset($_POST['fetch_teachers']))
    {
        $sql="select * from teachers";
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
                $data['msg']="no_teachers";
            }
        }
        else
        {
            $data['msg']="Something Went Wrong";
        }

        echo json_encode($data);
    }

    if(isset($_POST['delete_teacher']))
    {
        $eid=$_POST['delete_teacher'];
        $sql="delete from teachers where id='$eid'";
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

    if(isset($_POST['add_teacher']))
    {
        $name=$_POST['name'];
        $email=$_POST['email'];
        $password=md5($_POST['password']);
        $sql="insert into teachers(name, email, password) values('$name', '$email', '$password')";
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
    
    
    if(isset($_POST['edit_teacher']))
    {
        $name=$_POST['ename'];
        $email=$_POST['eemail'];
        $password=md5($_POST['epassword']);
        $eid=$_POST['edit_teacher'];
        $sql="update teachers set name='$name', email='$email', password='$password' where id='$eid'";
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
?>