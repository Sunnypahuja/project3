<?php 



include_once 'lib/core.php'; 
if(isset($_POST['change_teachers_password']))
{
    $id=test_input($_POST['id']);
      $c=test_input($_POST['current_pswd']);
      $n=test_input($_POST['new_pswd']);
      $curpswd = md5($c);
      $data=[];
        
      $sql="select * from teachers where id =$id and password = $curpswd ";
      if($result=$conn->query($sql))
      {
          $data=[];
          if($result->num_rows)
          {
              
            $sql="update teachers set password = $n where id= $id";
            $result=$conn->query($sql);
         


          }
      }
      echo json_encode($data);
}








?>