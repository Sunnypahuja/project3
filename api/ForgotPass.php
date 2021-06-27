<?php
    require_once 'lib/core.php';

    if(isset($_POST['checkOtp']))
    {
        $result=[];
        $newPass=$_POST['newPass'];
        $otp=$_POST['otp'];
        $confirmPass=$_POST['confirmPass'];
        $sql="select * from forgot_pass where token='$otp'";
        if($res=$conn->query($sql))
        {
            if($res->num_rows)
            {
                $row=$res->fetch_assoc();
                $email=$row['email'];
                $newPass=md5($newPass);
                $sql="update users set password='$newPass' where email='$email'";
                if($conn->query($sql))
                {
                    $result['msg']="success";
                }
                else
                {
                    $result['msg']=$conn->error;
                }
            }
            else
            {
                $result['msg']="Invalid Otp";
            }
        }
        else
        {
            $result['msg']=$conn->error;
        }

        echo json_encode($result);
    }


    if(isset($_POST['forgotPass']) && isset($_POST['email']))
    {
        $email = $conn->real_escape_string($_POST['email']);
        $result=[];
        $sql = "select * from users where email ='$email'";
        if($res=$conn->query($sql))
        {
            if($res->num_rows==1)
            {
                $sql = "delete from forgot_pass where email ='$email'";
                if($conn->query($sql))
                {
                    $sql = "select count(id) as count from forgot_pass";
                    if($res = $conn->query($sql))
                    {
                        if($res->num_rows)
                        {
                            $count = $res->fetch_assoc()['count'];
                        }else
                        {
                            $count = 0;
                        } 
                        $forgot_token = $count.genRandStr();
                        $md5Token = md5($forgot_token);
                        $sql = "insert into forgot_pass(email,token,md5Token) values('$email','$forgot_token','$md5Token')";
                        if($conn->query($sql))
                        {
                            $mail->AltBody = 'This is an auto generated email so please dont reply this';
                            $mail->AddAddress($email);   
                            $mail->Subject = "Password Reset Request"; 
                            $mail->isHtml(true);
                            
                            $mail->Body = '<!doctype html>
                                            <html lang="en-US">

                                            <head>
                                            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                                            <title>Reset Password Email Template</title>
                                            <meta name="description" content="Reset Password Email Template.">
                                            <style type="text/css">
                                                a:hover {text-decoration: underline !important;}
                                            </style>
                                            </head>

                                            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                                            <!--100% body table-->
                                            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                                                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open Sans", sans-serif;">
                                                <tr>
                                                    <td>
                                                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                                            align="center" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td style="height:80px;">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="height:20px;">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                                        <tr>
                                                                            <td style="height:40px;">&nbsp;</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding:0 35px;">
                                                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">You have
                                                                                    requested to reset your password</h1>
                                                                                <span
                                                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                                                    We cannot simply send you your old password. A unique OTP has been generated to reset your
                                                                                    password. Please enter this OTP in the app.
                                                                                </p>
                                                                                <a href="#"
                                                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">'.$forgot_token.'</a>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="height:40px;">&nbsp;</td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            <tr>
                                                                <td style="height:20px;">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="height:80px;">&nbsp;</td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--/100% body table-->
                                            </body>

                                            </html>';
                            $mail->send();
                            $result['msg']='success';
                        }
                    }
                }
                
            }
            else
            {
                $result['msg']='no_user'; 
                $result['query']=$sql;
            }
        }else
        {
            $result['msg']=$conn->error;
        }
        echo json_encode($result);
    }

    function genRandStr(  $length = 8,   $prefix = '',   $suffix = '')
    {
        for($i = 0; $i < $length; $i++)
        {
            $prefix .= random_int(0,1) ? chr(random_int(65, 90)) : random_int(0, 9);
        }
        return $prefix . $suffix;
    }

?>