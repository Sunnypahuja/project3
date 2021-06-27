<?php
    require_once 'lib/core.php';

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {   
        //SEND MAIL
        if(isset($_POST['send_email']))
        {
            $msg=$conn->real_escape_string($_POST['message']);
            $subject= $conn->real_escape_string($_POST['subject']);
            $send_to=$conn->real_escape_string($_POST['send_to']);
            
            $receivers=0;
            
            if(isset($_POST['number']) && $send_to == "group")
            {
                $n=$_POST['number'];
                $sql="select email from users where type=3 order by id desc limit $n";
            }
            else
            {
                $sql="select email from email_subscribe";
            }

            $result=$conn->query($sql);
            if($result->num_rows>0)
            {
                while($row=$result->fetch_assoc())
                    $recipients[]=$row;
            }
            foreach($recipients as $email)
            {
                $status=send_mail($mail,$subject,$msg,$email['email']);
                if($status != 'success') 
                {
                    break;
                }
                else
                {
                    $receivers++;
                }
            }
            
            if($status=='success') 
            {
                $sql="insert into email_sent(subject, message, receivers) values('$subject','$msg',$receivers)";
                if($conn->query($sql))
                {
                    echo "ok";
                }
                else
                {
                    echo $conn->error;
                }
            }
            else
            {
                echo $status;
            }

        }
        
        //CREATE PUSH NOTIFICATION
        if(isset($_POST['send_notification']))
        {
            $content=$conn->real_escape_string(test_input($_POST['content']));
            
            $link=test_input($_POST['link']);
            $title=test_input($_POST['title']);
            
            //FETCH APP ID, KEY AND LOGO IN ABOVE OF THE PAGE            
            $app_id="11584308-d939-40d0-b294-4bf17a0ceb26";
            $key="NTBkNTcwNmEtOWQ4Mi00NjQ0LTg3NTAtZDNlYWM4NzYyOWZm";
            
            //$rec=pushapi($title,$content,$link,$app_id,$key,$logo);
            $rec=pushapi($title,$content,$link,$app_id,$key);
            
           $data = json_decode($rec, true);
            
           /*echo "<br/><br/>";
           print_r($data);
           
           if($data['recipients'] >= 0)
           {
               $sql="insert into notifications_sent(title, redirection_link, message, receivers) values('$title', '$link', '$content', ".$data['recipients'].")";
               if($conn->query($sql))
               {
                   echo "ok";
               }
               else
               {
                   echo $conn->error." ".$sql;
               }
           }
           else
           {
               echo "error";
           }*/
        }
        
    }
?>