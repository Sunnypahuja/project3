<?php
    require_once 'lib/core.php';

    //MARK QUERY RESPONDED
    if(isset($_POST['response_query']))
    {
        $cid=$_POST['response_query'];
        
        $response=test_input($_POST['response']);
        
        $send_via=test_input($_POST['send_via']);
        $contact=test_input($_POST['contact']);
        $email=test_input($_POST['email']);
        
        $subject=test_input($_POST['subject']);
        $subject=str_replace("'","&#039;",$subject);
        $subject=str_replace("’","&#039;",$subject);
        $subject=str_replace("‘","&#039;",$subject);
        $subject=str_replace("<","&lt;",$subject);
        $subject=str_replace(">","&gt;",$subject);
        $subject=str_replace('"',"&quot;",$subject);
        $subject=str_replace('“',"&quot;",$subject);
        $subject=str_replace('”',"&quot;",$subject);
        
        if($send_via == "email")
        {
            $response=str_replace("'","&#039;",$response);
            $response=str_replace("’","&#039;",$response);
            $response=str_replace("‘","&#039;",$response);
            $response=str_replace("<","&lt;",$response);
            $response=str_replace(">","&gt;",$response);
            $response=str_replace('"',"&quot;",$response);
            $response=str_replace('“',"&quot;",$response);
            $response=str_replace('”',"&quot;",$response);
            
            $status=send_mail($mMail,"Response For Your Query - $subject",$response,$email);
            if($status == 'success') 
            {
                $sql="UPDATE queries SET status='responded', response='$response', responded_on='".date("d/m/y")."' where id=$cid";
                if($result=$conn->query($sql))
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
                echo "error";
            }
        }
        else
        {
            $value=send_sms($contact,$response);
            $res="";
            foreach($value as $v)
            {
                $res=$v->responseCode;
            }
            if(strpos(strtolower($res),'message successfully submitted') !== false)
            {
                $response=str_replace("'","&#039;",$response);
                $response=str_replace("’","&#039;",$response);
                $response=str_replace("‘","&#039;",$response);
                $response=str_replace("<","&lt;",$response);
                $response=str_replace(">","&gt;",$response);
                $response=str_replace('"',"&quot;",$response);
                $response=str_replace('“',"&quot;",$response);
                $response=str_replace('”',"&quot;",$response);
                
                $sql="UPDATE queries SET status='responded', response='$response', responded_on='".date("d/m/y")."' where id=$cid"; 
                if($result=$conn->query($sql))
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
                echo "error";
            }
        }
    }
?>