<?php
//opne server error
ini_set('display_errors', 1);
error_reporting(1);

//select time zone
date_default_timezone_set('Asia/Kolkata');

//for the database
$servername = "103.76.231.95";
$password = "develop@123";

//REMOVE WCART/ ONCE HOSTED ONLINE
// $website_link=(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]"."/";
$website_link="../";

if(isset($_SESSION['domain']))
{
	$dbname = "webix4me_".$_SESSION['domain'];  //SESSION domain value after webix4me_
	$username = "webix4me_u".substr(hash('ripemd160', 'weazyisbest_'.$_SESSION['domain']),0,6);
}
else
{
	header("location:404");
}

//page value;
$admin=1;
$vendor=2;
$user=3;
$staff=4;

//Session Variables
$session_login="kfgvufaj1";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if($conn->connect_error)
{
    //die("Connection failed: " . $conn->connect_error);
    header("location:logout.php");
    
}


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
function pushapi($title,$content,$link,$app_id,$key,$logo) 
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
        'large_icon'=>"$logo",
        'isAndroid'=>true,
        'priority'=>10,
        'isChromeWeb'=>true,
        'web_buttons' => $hashes_array
    );
   
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

$shopName = "Weazy India";

$sql="select name from shop_details";
$result=$conn->query($sql);
if($result->num_rows > 0)
{
    $detailsData=$result->fetch_assoc();
    $shopName=$detailsData['name'];
}


    //mail config
	$mail = new PHPMailer;
	//$mail->SMTPDebug = 3;                               // Enable verbose debug output
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'mail.weazy.in';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'no-reply@weazy.in';                 // SMTP username
	$mail->Password = 'webixun123';                            // SMTP password
	$mail->SMTPSecure = '';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to

	$mail->setFrom('no-reply@weazy.in', "$shopName");
	$mail->addReplyTo('No Reply Please', 'Information');

    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML
    $mail->AltBody = 'This is an auto generated email so please dont reply this';
    
    
    //Admin Mail config
	$adminMail = new PHPMailer;
	//$mail->SMTPDebug = 3;                               // Enable verbose debug output
	$adminMail->isSMTP();                                      // Set mailer to use SMTP
	$adminMail->Host = 'mail.weazy.in';  // Specify main and backup SMTP servers
	$adminMail->SMTPAuth = true;                               // Enable SMTP authentication
	$adminMail->Username = 'inform@weazy.in';                 // SMTP username
	$adminMail->Password = 'weazy1234';                            // SMTP password
	$adminMail->SMTPSecure = '';                            // Enable TLS encryption, `ssl` also accepted
	$adminMail->Port = 587;                                    // TCP port to connect to

	$adminMail->setFrom('inform@weazy.in', "Weazy India");
	$adminMail->addReplyTo('No Reply Please', 'Information');

    // Optional name
	$adminMail->isHTML(true);                                  // Set email format to HTML
    $adminMail->AltBody = 'This is an auto generated email so please dont reply this';
	
	
	
	//Admin Mail Address
	$adminAddress="work.webixun@gmail.com";
?>
