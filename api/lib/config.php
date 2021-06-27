<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers *');
header( 'Content-Type: text/html; charset=utf-8' ); 
//opne server error
ini_set('display_errors', 1);
error_reporting(-1);

//select time zone
date_default_timezone_set('Asia/Kolkata');


$keyId="rzp_test_qSFtYz48z3YHeF";
$keySecret="zqQpj29AfVzA2sPxLCQK3Pfx";

$access_key="g99f0kW6HP8=";
$secretAcessKey="zXAEJyc3x3bEoDAlVaH4qQ==";
$webServiceUrl="http://classapi.wiziqxt.com/apimanager.ashx";

//for the database
//$servername = "103.76.231.95";
$servername = "localhost";
//$password = "develop@123";
$password = "";

//REMOVE WCART/ ONCE HOSTED ONLINE
// $website_link=(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]"."/";
$website_link="../";

$dbname = "react_lms";
$username = "root";
if(isset($_SESSION['domain']))
{
//	$dbname = "webix4me_".$_SESSION['domain'];  //SESSION domain value after webix4me_
	$dbname = "react_lms";  //SESSION domain value after webix4me_
//	$username = "webix4me_u".substr(hash('ripemd160', 'weazyisbest_'.$_SESSION['domain']),0,6);
	$username = "root";
}
else
{
//	header("location:404");
}

//page value;
$admin=1;
$vendor=2;
$user=3;
$staff=4;

//Session Variables
$session_login="kfgvufaj1";
$server_url = 'https://35.154.191.195:8013';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if($conn->connect_error)
{
    //die("Connection failed: " . $conn->connect_error);
    header("location:logout.php");
    
}

$conn->set_charset("utf8");

//payment gateway details
$merchant_id=178079;

//sms config
function send_sms($numbers,$message)
{
    $sms_username ='weazy';
    $sendername = 'iWEAZY';
    $smstype   = 'TRANS';
    $apikey   = 'dee73b3b-3bf8-4b91-b64c-9134859db502';
    $url="http://login.aquasms.com/sendSMS?username=$sms_username&message=".urlencode($message)."&sendername=$sendername&smstype=$smstype&numbers=$numbers&apikey=$apikey";
    $ret = file_get_contents($url);
    return $ret;
}

//one signal push notifications
function pushapi($title,$content,$link,$app_id,$key) 
{
    $content      = array(
        "en" => $content,
    );
     $heading      = array(
        "en" => $title,
    );
    $hashes_array = array();
    array_push($hashes_array, array(
        "id" => "like-button",
        "text" => "VIEW",
        "icon" => "$logo",
        "url" => "$link"
    ));
    $fields = array(
        'app_id' => "$app_id",
        'included_segments' => array(
            'All'
        ),
        'data' => array(
            "foo" => "bar"
        ),
        'contents' => $content,
        'headings' => $heading,
        'android_sound'=>'ss',
        'isAndroid'=>true,
        'priority'=>10,
        'isChromeWeb'=>true,
        'web_buttons' => $hashes_array
    );
//    $fields = array(
//        'app_id' => "$app_id",
//        'included_segments' => array(
//            'All'
//        ),
//        'data' => array(
//            "foo" => "bar"
//        ),
//        'contents' => $content,
//        'headings' => $heading,
//        'android_sound'=>'ss',
//        'large_icon'=>"$logo",
//        'isAndroid'=>true,
//        'priority'=>10,
//        'isChromeWeb'=>true,
//        'web_buttons' => $hashes_array
//    );
   
    $fields = json_encode($fields);
   
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json; charset=utf-8',
        'Authorization: Basic '.$key.''
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
   
    $response = curl_exec($ch);
    curl_close($ch);
   
    return $response;
}

$shopName = "MarketBoi";

$sql="select name from shop_details";
if($result=$conn->query($sql))
{
    if($result->num_rows > 0)
    {
        $detailsData=$result->fetch_assoc();
        $shopName=$detailsData['name'];
    }
}
//mail config
// $mMail = new PHPMailer;
// //$mMail->SMTPDebug = 3;                               // Enable verbose debug output
// $mMail->isSMTP();                                      // Set mailer to use SMTP
// $mMail->Host = 'smtp.gmail.com';                    // Specify main and backup SMTP servers
// $mMail->SMTPAuth = true;                               // Enable SMTP authentication
// $mMail->Username = 'iammarketboi@gmail.com';                 // SMTP username
// $mMail->Password = 'Sheriff89';                     // SMTP password
// $mMail->SMTPSecure = '';                               // Enable TLS encryption, `ssl` also accepted
// $mMail->Port = 587;                                    // TCP port to connect to

$shopName = "MarketBoi";

$sql="select name from shop_details";
if($result=$conn->query($sql)){
if($result->num_rows > 0)
{
    $detailsData=$result->fetch_assoc();
    $shopName=$detailsData['name'];
}}

// $mMail->setFrom('iammarketboi@gmail.com', "$shopName");
// $mMail->addReplyTo('No Reply Please', 'Information');

// // Optional name
// $mMail->isHTML(true);                                  // Set email format to HTML
// $mMail->AltBody = 'This is an auto generated email so please dont reply this';

// function send_mail($mMail,$subject,$msg,$email)
// {

//     $mMail->Subject =$subject;
//     $mMail->Body =$msg;
//     $mMail->addAddress($email);
//     if(!$mMail->Send()) 
//     {
//         return 'err';
//     }
//     else
//     {
//         $mMail->ClearAllRecipients( );
//         return 'success';
//     }
// }


 	 
$mail = new PHPMailer(); 
$mail->SMTPDebug = false;               // Enable verbose debug output
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mukta00verma@gmail.com';                 // SMTP username
$mail->Password = 'ortho@19';                            // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

$mail->setFrom('mukta00verma@gmail.com', 'React LMS');   

?>