<?php
require_once 'lib/core.php';
require_once 'lib/razorpay/Razorpay.php';

use Razorpay\Api\Api;
$api = new Api($keyId, $keySecret);
$orderData = [
    'receipt'         => 3456,
    'amount'          => $_POST['amount'] * 100,
    'currency'        => "INR",
    'payment_capture' => 1
];
$razorpayOrder = $api->order->create($orderData);
$razorpayOrderId = $razorpayOrder['id'];
$_SESSION['razorpay_order_id'] = $razorpayOrderId;
$displayAmount = $amount = $orderData['amount'];
$data = [
    "key"               => $keyId,
    "amount"            => $amount,
    "name"              => $_POST['topic_name'],
    "description"       => $_POST['topic'],
    "image"             => "",
    "prefill"           => [
    "email"             => $_POST['email'],
    ],
    "notes"             => [
    "address"           => 'India',
    "merchant_order_id" => "12312321",
    ],
    "theme"             => [
    "color"             => "#F37254"
    ],
    "order_id"          => $razorpayOrderId,
];
$order_id=$razorpayOrderId;
$email=$_POST['email'];
$user_id=$_POST['user_id'];
$amount=$_POST['amount'];
$topic=$_POST['topic'];
$topic_id=$_POST['topic_id'];
$topic_name=$_POST['topic_name'];

$sql="insert into transactions(user_email, user_id, amount, topic, topic_id, topic_name, order_id, status) values('$email', '$user_id', '$amount', '$topic', '$topic_id', '$topic_name','$order_id','pending')";
if($conn->query($sql))
{
    $insert_id = $conn->insert_id;
    $data['col_id']=$insert_id;
    $data['msg']="ok";
}
else
{
    $data['msg']=$conn->error;
}
echo json_encode($data);
?>