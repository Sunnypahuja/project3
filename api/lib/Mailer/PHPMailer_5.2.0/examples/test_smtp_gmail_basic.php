<html>
<head>
<title>PHPMailer - SMTP (Gmail) basic test</title>
</head>
<body>
<?php      
$to=$_POST["to"];
$subject=$_POST["subject"];
$message=$_POST["body"];
require_once('lib/Mailer/PHPMailer_5.2.0/class.phpmailer.php');
$mail = new PHPMailer(); // create a new object
$mail->IsSMTP(); // enable SMTP
$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "tariyalaman39@gmail.com";
$mail->Password = "fcupxqbx@5";
$mail->SetFrom("tariyalaman39@gmail.com");
$mail->Subject = $subject;
$mail->Body = $message;
$mail->AddAddress($to);

 if(!$mail->Send()) 
 {
    return false;
 }
  else
{
    echo true;
 }
?>

</body>
</html>
